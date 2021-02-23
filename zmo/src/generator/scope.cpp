#include "Halide.h"

using namespace Halide;

//
//	Scope generator
//
class Scope : public Halide::Generator<Scope>
{
public:

	Input<Buffer<>>  input { "input", 3 };
	Output<Buffer<>> output { "output", 3 };

	// Common Vars
	Var x, y, c;

	void generate()
	{
		//COPY
		//output(x, y, c) = input(x, y, c);
		//BRIGHTEN
		//output (x, y, c) = cast<uint8_t>(min(input(x, y, c) * 1.5f, 255));

		output(x, y, c) = cast<uint8_t>(0);

		output(x, y, 3) = cast<uint8_t>(255);
		
		RDom r;
		r = RDom (0, input.dim (0).extent(), 0, input.dim(1).extent());

		//Value computed in RGB format, assuming R:c==0, G:c==1, B:c==2
		Expr value = input.dim(1).extent() / 256.0f * (0.2126f*input(r.x, r.y, 0)/*R*/ + 0.7152f*input(r.x, r.y, 1)/*G*/ + 0.0722f*input(r.x, r.y, 2))/*B*/;

		Expr bucket = clamp(cast<uint8_t>(value), 0, 95);

		output(r.x, 95-bucket, 1) += cast<uint8_t>(10);

		output.dim(0).set_extent (input.dim(0).extent());
		output.dim(1).set_extent (input.dim(1).extent());
		output.dim(2).set_extent (input.dim(2).extent());
	}

	void schedule()
	{
		if (auto_schedule == true)
		{
			// The auto-scheduler requires estimates on all the input/output
			// sizes and parameter values in order to compare different
			// alternatives and decide on a good schedule.

			input.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });

			output.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });

			// Technically, the estimate values can be anything, but the closer
			// they are to the actual use-case values, the better the generated
			// schedule will be.

			// To auto-schedule the the pipeline, we don't have to do anything else:
			// every Generator implicitly has a GeneratorParam named "auto_schedule";
			// if this is set to true, Halide will call auto_schedule() on all of
			// our pipeline's outputs automatically.

			// Every Generator also implicitly has a GeneratorParams named "machine_params",
			// which allows you to specify characteristics of the machine architecture
			// for the auto-scheduler; it's generally specified in your Makefile.
			// If none is specified, the default machine parameters for a generic CPU
			// architecture will be used by the auto-scheduler.

			// Let's see some arbitrary but plausible values for the machine parameters.
			//
			//      const int kParallelism = 32;
			//      const int kLastLevelCacheSize = 16 * 1024 * 1024;
			//      const int kBalance = 40;
			//      MachineParams machine_params(kParallelism, kLastLevelCacheSize, kBalance);
			//
			// The arguments to MachineParams are the maximum level of parallelism
			// available, the size of the last-level cache (in KB), and the ratio
			// between the cost of a miss at the last level cache and the cost
			// of arithmetic on the target architecture, in that order.

			// Note that when using the auto-scheduler, no schedule should have
			// been applied to the pipeline; otherwise, the auto-scheduler will
			// throw an error. The current auto-scheduler cannot handle a
			// partially-scheduled pipeline.

			// If HL_DEBUG_CODEGEN is set to 3 or greater, the schedule will be dumped
			// to stdout (along with much other information); a more useful way is
			// to add "schedule" to the -e flag to the Generator. (In CMake and Bazel,
			// this is done using the "extra_outputs" flag.)

			// The generated schedule that is dumped to file is an actual
			// Halide C++ source, which is readily scope-pasteable back into
			// this very same source file with few modifications. Programmers
			// can use this as a starting schedule and iteratively improve the
			// schedule. Note that the current auto-scheduler is only able to
			// generate CPU schedules and only does tiling, simple vectorization
			// and parallelization. It doesn't deal with line buffering, storage
			// reordering, or factoring reductions.
		}
		else
		{
			const int vec = natural_vector_size (input.type());

			Var xi, yi, t;

			const Expr width  = input.dim (0).extent();
			const Expr height = input.dim (1).extent();

			output
			.tile (x, y, xi, yi, min (width, vec * 12), min (height, 30 * 8))
			.fuse (x, y, t)
			.parallel (t)
			.vectorize (xi, vec);

			// Allow the input and output to have arbitrary memory layout,
			// and add some specializations for a few common cases. If
			// your case is not covered (e.g. planar input, packed rgb
			// output), you could add a new specialization here.

			output.dim (0).set_stride (Expr());
			input.dim (0).set_stride (Expr());

			Expr planar = (output.dim (0).stride() == 1 && input.dim (0).stride() == 1);

			Expr packed_uv = (output.dim (0).stride() == 2
							  && output.dim (2).stride() == 1
							  && output.dim (2).min() == 0
							  && output.dim (2).extent() == 2
							  && input.dim (0).stride() == 2
							  && input.dim (2).stride() == 1
							  && input.dim (2).min() == 0
							  && input.dim (2).extent() == 2);

			Expr packed_rgb = (output.dim (0).stride() == 3
							   && output.dim (2).stride() == 1
							   && output.dim (2).min() == 0
							   && output.dim (2).extent() == 3
							   && input.dim (0).stride() == 3
							   && input.dim (2).stride() == 1
							   && input.dim (2).min() == 0
							   && input.dim (2).extent() == 3);

			Expr packed_rgba = (output.dim (0).stride() == 4
								&& output.dim (2).stride() == 1
								&& output.dim (2).min() == 0
								&& output.dim (2).extent() == 4
								&& input.dim (0).stride() == 4
								&& input.dim (2).stride() == 1
								&& input.dim (2).min() == 0
								&& input.dim (2).extent() == 4);

			output.specialize (planar);

			output.specialize (packed_uv)
			.reorder (c, xi, yi, t)
			.unroll (c);

			output.specialize (packed_rgb)
			.reorder (c, xi, yi, t)
			.unroll (c);

			output.specialize (packed_rgba)
			.reorder (c, xi, yi, t)
			.unroll (c);
		}
	}
};

class Scope1 : public Halide::Generator<Scope1>
{
public:

	Input<Buffer<>>  input { "input", 3 };
	Output<Buffer<>> output { "output", 3 };

	// Common Vars
	Var x, y, c;

	void generate()
	{
		output (x, y, c) = input (x, y, c) - 10;
	}

	void schedule()
	{
		if (auto_schedule == true)
		{
			// The auto-scheduler requires estimates on all the input/output
			// sizes and parameter values in order to compare different
			// alternatives and decide on a good schedule.

			input.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });

			output.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });

			// Technically, the estimate values can be anything, but the closer
			// they are to the actual use-case values, the better the generated
			// schedule will be.

			// To auto-schedule the the pipeline, we don't have to do anything else:
			// every Generator implicitly has a GeneratorParam named "auto_schedule";
			// if this is set to true, Halide will call auto_schedule() on all of
			// our pipeline's outputs automatically.

			// Every Generator also implicitly has a GeneratorParams named "machine_params",
			// which allows you to specify characteristics of the machine architecture
			// for the auto-scheduler; it's generally specified in your Makefile.
			// If none is specified, the default machine parameters for a generic CPU
			// architecture will be used by the auto-scheduler.

			// Let's see some arbitrary but plausible values for the machine parameters.
			//
			//      const int kParallelism = 32;
			//      const int kLastLevelCacheSize = 16 * 1024 * 1024;
			//      const int kBalance = 40;
			//      MachineParams machine_params(kParallelism, kLastLevelCacheSize, kBalance);
			//
			// The arguments to MachineParams are the maximum level of parallelism
			// available, the size of the last-level cache (in KB), and the ratio
			// between the cost of a miss at the last level cache and the cost
			// of arithmetic on the target architecture, in that order.

			// Note that when using the auto-scheduler, no schedule should have
			// been applied to the pipeline; otherwise, the auto-scheduler will
			// throw an error. The current auto-scheduler cannot handle a
			// partially-scheduled pipeline.

			// If HL_DEBUG_CODEGEN is set to 3 or greater, the schedule will be dumped
			// to stdout (along with much other information); a more useful way is
			// to add "schedule" to the -e flag to the Generator. (In CMake and Bazel,
			// this is done using the "extra_outputs" flag.)

			// The generated schedule that is dumped to file is an actual
			// Halide C++ source, which is readily scope-pasteable back into
			// this very same source file with few modifications. Programmers
			// can use this as a starting schedule and iteratively improve the
			// schedule. Note that the current auto-scheduler is only able to
			// generate CPU schedules and only does tiling, simple vectorization
			// and parallelization. It doesn't deal with line buffering, storage
			// reordering, or factoring reductions.
		}
		else
		{
			const int vec = natural_vector_size (input.type());

			Var xi, yi, t;

			const Expr width  = input.dim (0).extent();
			const Expr height = input.dim (1).extent();

			output
			.tile (x, y, xi, yi, min (width, vec * 12), min (height, 30 * 8))
			.fuse (x, y, t)
			.parallel (t)
			.vectorize (xi, vec);

			// Allow the input and output to have arbitrary memory layout,
			// and add some specializations for a few common cases. If
			// your case is not covered (e.g. planar input, packed rgb
			// output), you could add a new specialization here.

			output.dim (0).set_stride (Expr());
			input.dim (0).set_stride (Expr());

			Expr planar = (output.dim (0).stride() == 1 && input.dim (0).stride() == 1);

			Expr packed_uv = (output.dim (0).stride() == 2
							  && output.dim (2).stride() == 1
							  && output.dim (2).min() == 0
							  && output.dim (2).extent() == 2
							  && input.dim (0).stride() == 2
							  && input.dim (2).stride() == 1
							  && input.dim (2).min() == 0
							  && input.dim (2).extent() == 2);

			Expr packed_rgb = (output.dim (0).stride() == 3
							   && output.dim (2).stride() == 1
							   && output.dim (2).min() == 0
							   && output.dim (2).extent() == 3
							   && input.dim (0).stride() == 3
							   && input.dim (2).stride() == 1
							   && input.dim (2).min() == 0
							   && input.dim (2).extent() == 3);

			Expr packed_rgba = (output.dim (0).stride() == 4
								&& output.dim (2).stride() == 1
								&& output.dim (2).min() == 0
								&& output.dim (2).extent() == 4
								&& input.dim (0).stride() == 4
								&& input.dim (2).stride() == 1
								&& input.dim (2).min() == 0
								&& input.dim (2).extent() == 4);

			output.specialize (planar);

			output.specialize (packed_uv)
			.reorder (c, xi, yi, t)
			.unroll (c);

			output.specialize (packed_rgb)
			.reorder (c, xi, yi, t)
			.unroll (c);

			output.specialize (packed_rgba)
			.reorder (c, xi, yi, t)
			.unroll (c);
		}
	}
};

HALIDE_REGISTER_GENERATOR (Scope, scope);
HALIDE_REGISTER_GENERATOR (Scope1, scope1);
