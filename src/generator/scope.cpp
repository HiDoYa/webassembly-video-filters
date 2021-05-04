#include "Halide.h"
// #include "clock.h" // for benchmarks

using namespace Halide;

//
//	Scope generator
//
class LumaScope : public Halide::Generator<LumaScope>
{
public:
	Input<Buffer<>>  input { "input", 3 };
	Output<Buffer<>> output { "output", 3 };

	// Common Vars
	Var x, y, c;

	void generate()
	{
		output(x, y, c) = cast<uint8_t>(0);
		output(x, y, 3) = cast<uint8_t>(255);
		
		RDom r = RDom(0, input.dim(0).extent(), 0, input.dim(1).extent());

		//Value computed in RGB format, assuming R:c==0, G:c==1, B:c==2
		Expr value0 = input(r.x, r.y, 0);
		Expr value1 = input(r.x, r.y, 1);
		Expr value2 = input(r.x, r.y, 2);
		
		Expr bucket0 = clamp(cast<uint8_t>(value0), 0, 255);
		Expr bucket1 = clamp(cast<uint8_t>(value1), 0, 255);
		Expr bucket2 = clamp(cast<uint8_t>(value2), 0, 255);

		output(r.x + (input.dim(0).extent() * 0), 255 - bucket0, 0) += cast<uint8_t>(50);
		output(r.x + (input.dim(0).extent() * 1), 255 - bucket1, 1) += cast<uint8_t>(50);
		output(r.x + (input.dim(0).extent() * 2), 255 - bucket2, 2) += cast<uint8_t>(50);
		
		output.dim(0).set_extent(input.dim(0).extent() * 3);
		output.dim(1).set_extent(255);
		output.dim(2).set_extent(input.dim(2).extent());

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
			// // Schedule: None
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

// this is rgb parade
class RGBParade : public Halide::Generator<RGBParade>
{
public:
	Input<Buffer<>>  input { "input", 3 };
	Output<Buffer<>> output { "output", 3 };

	// Common Vars
	Var x, y, c;

	void generate()
	{
		output(x, y, c) = cast<uint8_t>(0);
		output(x, y, 3) = cast<uint8_t>(255);
		
		RDom r = RDom(0, input.dim(0).extent(), 0, input.dim(1).extent());

		//Value computed in RGB format, assuming R:c==0, G:c==1, B:c==2
		Expr value0 = input(r.x, r.y, 0);
		Expr value1 = input(r.x, r.y, 1);
		Expr value2 = input(r.x, r.y, 2);
		
		Expr bucket0 = clamp(cast<uint8_t>(value0), 0, 255);
		Expr bucket1 = clamp(cast<uint8_t>(value1), 0, 255);
		Expr bucket2 = clamp(cast<uint8_t>(value2), 0, 255);

		output(r.x + (input.dim(0).extent() * 0), 255 - bucket0, 0) += cast<uint8_t>(50);
		output(r.x + (input.dim(0).extent() * 1), 255 - bucket1, 1) += cast<uint8_t>(50);
		output(r.x + (input.dim(0).extent() * 2), 255 - bucket2, 2) += cast<uint8_t>(50);
		
		output.dim(0).set_extent(input.dim(0).extent() * 3);
		output.dim(1).set_extent(255);
		output.dim(2).set_extent(input.dim(2).extent());
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
			// Schedule: Vectorize X 
			const int vec = natural_vector_size (input.type());

			// Var xi, yi, t;

			// const Expr width  = input.dim (0).extent();
			// const Expr height = input.dim (1).extent();

			output
			// .tile (x, y, xi, yi, min (width, vec * 12), min (height, 30 * 8))
			// .fuse (x, y, t)
			// .parallel (xi)
			.vectorize (x, vec); //xi

			// Allow the input and output to have arbitrary memory layout,
			// and add some specializations for a few common cases. If
			// your case is not covered (e.g. planar input, packed rgb
			// output), you could add a new specialization here.

			output.dim (0).set_stride (Expr());
			input.dim (0).set_stride (Expr());

			// Expr planar = (output.dim (0).stride() == 1 && input.dim (0).stride() == 1);

			// Expr packed_uv = (output.dim (0).stride() == 2
			// 				  && output.dim (2).stride() == 1
			// 				  && output.dim (2).min() == 0
			// 				  && output.dim (2).extent() == 2
			// 				  && input.dim (0).stride() == 2
			// 				  && input.dim (2).stride() == 1
			// 				  && input.dim (2).min() == 0
			// 				  && input.dim (2).extent() == 2);

			// Expr packed_rgb = (output.dim (0).stride() == 3
			// 				   && output.dim (2).stride() == 1
			// 				   && output.dim (2).min() == 0
			// 				   && output.dim (2).extent() == 3
			// 				   && input.dim (0).stride() == 3
			// 				   && input.dim (2).stride() == 1
			// 				   && input.dim (2).min() == 0
			// 				   && input.dim (2).extent() == 3);

			// Expr packed_rgba = (output.dim (0).stride() == 4
			// 					&& output.dim (2).stride() == 1
			// 					&& output.dim (2).min() == 0
			// 					&& output.dim (2).extent() == 4
			// 					&& input.dim (0).stride() == 4
			// 					&& input.dim (2).stride() == 1
			// 					&& input.dim (2).min() == 0
			// 					&& input.dim (2).extent() == 4);

			// output.specialize (planar);

			// output.specialize (packed_uv)
			// .reorder (c, xi, yi, t)
			// .unroll (c);

			// output.specialize (packed_rgb)
			// .reorder (c, xi, yi, t)
			// .unroll (c);

			// output.specialize (packed_rgba)
			// .reorder (c, xi, yi, t)
			// .unroll (c);
		}
	}
};

class VectorScope : public Halide::Generator<VectorScope>
{
public:

	Input<Buffer<>>  input { "input", 3 };
	Output<Buffer<>> output { "output", 3 };

	// Common Vars
	Var x, y, c;

	void generate()
	{
		output(x, y, c) = cast<uint8_t>(0);

		output(x, y, 3) = cast<uint8_t>(0);
		
		RDom r;
		r = RDom (0, input.dim (0).extent(), 0, input.dim(1).extent());

		//UV value computation
		Expr U = (input(r.x, r.y, 0) * -.168736f) + (input(r.x, r.y, 1) * -.331264f) + (input(r.x, r.y, 2) *  .5f) + 128.0f;
		Expr V = (input(r.x, r.y, 0) *  .5f) + (input(r.x, r.y, 1) * -.418688f) + (input(r.x, r.y, 2) * -.081312f) + 128.0f;
		
		Expr Xloc = clamp(cast<uint8_t>(U), 0, 255);
		Expr Yloc = clamp(cast<uint8_t>(V), 0, 255);

		output(Xloc, 255-Yloc, 3) = cast<uint8_t>(255);
		output(Xloc, 255-Yloc, 0) += cast<uint8_t>(255/10);
		
		output.dim(0).set_extent (255);
		output.dim(1).set_extent (255);
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
			// Schedule: Vectorize X
			const int vec = natural_vector_size (input.type());

			// Var xi, yi, t;

			// const Expr width  = input.dim (0).extent();
			// const Expr height = input.dim (1).extent();

			output
			// .tile (x, y, xi, yi, min (width, vec * 12), min (height, 30 * 8))
			// .fuse (x, y, t)
			// .parallel (t);
			.vectorize (x, vec); // xi

			// Allow the input and output to have arbitrary memory layout,
			// and add some specializations for a few common cases. If
			// your case is not covered (e.g. planar input, packed rgb
			// output), you could add a new specialization here.

			output.dim (0).set_stride (Expr());
			input.dim (0).set_stride (Expr());

			// Expr planar = (output.dim (0).stride() == 1 && input.dim (0).stride() == 1);

			// Expr packed_uv = (output.dim (0).stride() == 2
			// 				  && output.dim (2).stride() == 1
			// 				  && output.dim (2).min() == 0
			// 				  && output.dim (2).extent() == 2
			// 				  && input.dim (0).stride() == 2
			// 				  && input.dim (2).stride() == 1
			// 				  && input.dim (2).min() == 0
			// 				  && input.dim (2).extent() == 2);

			// Expr packed_rgb = (output.dim (0).stride() == 3
			// 				   && output.dim (2).stride() == 1
			// 				   && output.dim (2).min() == 0
			// 				   && output.dim (2).extent() == 3
			// 				   && input.dim (0).stride() == 3
			// 				   && input.dim (2).stride() == 1
			// 				   && input.dim (2).min() == 0
			// 				   && input.dim (2).extent() == 3);

			// Expr packed_rgba = (output.dim (0).stride() == 4
			// 					&& output.dim (2).stride() == 1
			// 					&& output.dim (2).min() == 0
			// 					&& output.dim (2).extent() == 4
			// 					&& input.dim (0).stride() == 4
			// 					&& input.dim (2).stride() == 1
			// 					&& input.dim (2).min() == 0
			// 					&& input.dim (2).extent() == 4);

			// output.specialize (planar);

			// output.specialize (packed_uv)
			// .reorder (c, xi, yi, t)
			// .unroll (c);

			// output.specialize (packed_rgb)
			// .reorder (c, xi, yi, t)
			// .unroll (c);

			// output.specialize (packed_rgba)
			// .reorder (c, xi, yi, t)
			// .unroll (c);
		}
	}
};

class CVectorScope : public Halide::Generator<CVectorScope>
{
public:

	Input<Buffer<>>  input { "input", 3 };
	Output<Buffer<>> output { "output", 3 };

	// Common Vars
	Var x, y, c;

	void generate()
	{
		output(x, y, c) = cast<uint8_t>(0);
		output(x, y, 3) = cast<uint8_t>(255);
		
		RDom r = RDom (0, input.dim(0).extent(), 0, input.dim(1).extent());

		Expr U = (input(r.x, r.y, 0) * -.168736f) + (input(r.x, r.y, 1) * -.331264f) + (input(r.x, r.y, 2) *  .5f) + 128.0f;
		Expr V = (input(r.x, r.y, 0) *  .5f) + (input(r.x, r.y, 1) * -.418688f) + (input(r.x, r.y, 2) * -.081312f) + 128.0f;
		
		Expr Xloc = clamp(cast<uint8_t>(U), 0, 255);
		Expr Yloc = clamp(cast<uint8_t>(V), 0, 255);

		output(Xloc, 255-Yloc, 0) += cast<uint8_t>(input(r.x, r.y, 0));
		output(Xloc, 255-Yloc, 1) += cast<uint8_t>(input(r.x, r.y, 1));
		output(Xloc, 255-Yloc, 2) += cast<uint8_t>(input(r.x, r.y, 2));

		output(r.x, r.y, 0) = min(output(r.x, r.y, 0),cast<uint8_t>(255));
		output(r.x, r.y, 1) = min(output(r.x, r.y, 1),cast<uint8_t>(255));
		output(r.x, r.y, 2) = min(output(r.x, r.y, 2),cast<uint8_t>(255));
		output(r.x, r.y, 3) = cast<uint8_t>(255);
		
		output.dim(0).set_extent (255);
		output.dim(1).set_extent(255);
		output.dim(2).set_extent(input.dim(2).extent());
		
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
			// Schedule: Vectorize X
			const int vec = natural_vector_size (input.type());

			// Var xi, yi, t;

			// const Expr width  = input.dim (0).extent();
			// const Expr height = input.dim (1).extent();

			output
			// .tile (x, y, xi, yi, min (width, vec * 12), min (height, 30 * 8))
			// .fuse (x, y, t)
			// .parallel (t)
			.vectorize (x, vec); // xi

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

class CLumaScope : public Halide::Generator<CLumaScope>
{
public:
	Input<Buffer<>>  input { "input", 3 };
	Output<Buffer<>> output { "output", 3 };

	// Common Vars
	Var x, y, c;

	void generate()
	{
		output(x, y, c) = cast<uint8_t>(0);
		output(x, y, 3) = cast<uint8_t>(255);
		
		RDom r = RDom (0, input.dim(0).extent(), 0, input.dim(1).extent());

		//Value computed in RGB format, assuming R:c==0, G:c==1, B:c==2
		Expr Y = (output(r.x, r.y, 0) *  .299f) + (output(r.x, r.y, 1) *  .587f) + (output(r.x, r.y, 2) *  .114f);
		//input(r.x, clamp(cast<uint8_t>(255 - Y), 0, 255),3) += cast<uint8_t>(10);
		//output(r.x, clamp(cast<uint8_t>(255 - Y), 0, 255),3) += cast<uint8_t>(10);

		output(r.x,clamp(cast<uint8_t>(255 - Y), 0, 255),0) += cast<uint8_t>(input(r.x, r.y, 0));
		output(r.x,clamp(cast<uint8_t>(255 - Y), 0, 255),1) += cast<uint8_t>(input(r.x, r.y, 1));
		output(r.x,clamp(cast<uint8_t>(255 - Y), 0, 255),2) += cast<uint8_t>(input(r.x, r.y, 2));
		output(r.x,clamp(cast<uint8_t>(255 - Y), 0, 255),3) += cast<uint8_t>(1);
		
		Expr R = output(r.x, r.y, 0)/(clamp(output(r.x, r.y, 3),1,255));
		Expr G = output(r.x, r.y, 1)/(clamp(output(r.x, r.y, 3),1,255));
		Expr B = output(r.x, r.y, 2)/(clamp(output(r.x, r.y, 3),1,255));

		Expr U = (R * -.168736f) + (G * -.331264f) + (B *  .5f) + 128.0f;
		Expr V = (R *  .5f) + (G * -.418688f) + (B * -.081312f) + 128.0f;

		Expr YUVtoR = Y + 1.4075f * (V - 128.0f);
		Expr YUVtoG = Y - 0.3455f * (U - 128.0f) - (0.7169f * (V - 128.0f));
		Expr YUVtoB = Y + 1.7790f * (U - 128.0f);

		output(r.x,r.y, 0) = clamp(cast<uint8_t>(255 - YUVtoR), 0, 255);
		output(r.x,r.y, 1) = clamp(cast<uint8_t>(255 - YUVtoG), 0, 255);
		output(r.x,r.y, 2) = clamp(cast<uint8_t>(255 - YUVtoB), 0, 255);
		output(x, y, 3) = cast<uint8_t>(255);

		output.dim(0).set_extent(input.dim(0).extent());
		output.dim(1).set_extent(255);
		output.dim(2).set_extent(input.dim(2).extent());
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
			// Schedule: None
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

HALIDE_REGISTER_GENERATOR (LumaScope, lumascope);
HALIDE_REGISTER_GENERATOR (RGBParade, rgbparade);
HALIDE_REGISTER_GENERATOR (VectorScope, vectorscope);
HALIDE_REGISTER_GENERATOR (CVectorScope, cvectorscope);
HALIDE_REGISTER_GENERATOR (CLumaScope, clumascope);
