#include "Halide.h"

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
		
		RDom r = RDom (0, input.dim(0).extent(), 0, input.dim(1).extent());

		//Value computed in RGB format, assuming R:c==0, G:c==1, B:c==2
		Expr value = (0.2126f * input(r.x, r.y, 0) + 0.7152f * input(r.x, r.y, 1) + 0.0722f * input(r.x, r.y, 2));
		Expr bucket = clamp(cast<uint8_t>(value), 0, 255);

		output(r.x, 255 - bucket, 1) += cast<uint8_t>(50);

		output.dim(0).set_extent(input.dim(0).extent());
		output.dim(1).set_extent(255);
		output.dim(2).set_extent(input.dim(2).extent());
	}

	void schedule()
	{
		if (auto_schedule == true)
		{
			input.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });
			output.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });
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
			input.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });
			output.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });
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
			input.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });
			output.set_estimates ({ { 0, 1920 }, { 0, 1080 }, { 0, 3 } });
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

HALIDE_REGISTER_GENERATOR (LumaScope, lumascope);
HALIDE_REGISTER_GENERATOR (RGBParade, rgbparade);
HALIDE_REGISTER_GENERATOR (VectorScope, vectorscope);
