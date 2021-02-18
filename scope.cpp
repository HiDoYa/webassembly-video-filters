#include "types.h"
#include "scope.h"

#include "scope_float32_cpu.h"
#include "scope_uint16_cpu.h"
#include "scope_uint8_cpu.h"

#include "HalideRuntime.h"

#include <assert.h>
#include <type_traits>

namespace Telestream
{
namespace ZMO
{
///
///	@brief		Copies the video frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
template<int components, typename T> static error_t scope (const T *src, int32_t src_stride, T *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	if (src == nullptr || dst == nullptr) return NullPointer;

	halide_dimension_t src_dim[] =
	{
		{ 0, roi.width,  components              },
		{ 0, roi.height, src_stride / sizeof (T) },
		{ 0, components, 1                       },
	};

	halide_buffer_t src_buffer =
	{
		.device     = (uint64_t)src,
		.host       = (uint8_t *)src,
		.type = halide_type_of<T>(),
		.dimensions = 3,
		.dim        = src_dim
	};



	halide_dimension_t dst_dim[] =
	{
		{ 0, roi.width,  components              },
		{ 0, roi.height, dst_stride / sizeof (T) },
		{ 0, components, 1                       },
	};

	halide_buffer_t dst_buffer =
	{
		.device     = (uint64_t)dst,
		.host       = (uint8_t *)dst,
		.type = halide_type_of<T>(),
		.dimensions = 3,
		.dim        = dst_dim
	};

	switch (compute)
	{
		case cpu:

		if constexpr (std::is_same_v<T, uint8_t> == true) return scope_uint8_cpu (nullptr, &src_buffer, &dst_buffer), Success;

		if constexpr (std::is_same_v<T, uint16_t> == true) return scope_uint16_cpu (nullptr, &src_buffer, &dst_buffer), Success;

		if constexpr (std::is_same_v<T, float> == true) return scope_float32_cpu (nullptr, &src_buffer, &dst_buffer), Success;

		default:

		return UnsupportedComputeMode;
	}
}

ZMO_EXTERNAL error_t Scope_u8_C1 (const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<1> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C1 (const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<1> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C1 (const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<1> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_C2 (const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C2 (const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C2 (const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_C3 (const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C3 (const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C3 (const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_C4 (const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C4 (const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C4 (const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (src, src_stride, dst, dst_stride, roi, compute, context);
}

///
///	@brief		Interleaves the video frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
template<int components, typename T> static error_t scope (const T *src[components], int32_t src_stride[components], T *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	if (src == nullptr || dst == nullptr) return NullPointer;

	static_assert (components > 1);

	//	if all planes have the same stride

	bool uniform_stride = true;

	int32_t stride = static_cast<int32_t> (src[1] - src[0]);

	for (int32_t i = 2; i < components; ++i)
	{
		if (src[i] - src[i - i] == stride) continue;

		uniform_stride = false;

		break;
	}

	if (uniform_stride == true)
	{
		halide_dimension_t src_dim[] =
		{
			{ 0, roi.width,  1                          },
			{ 0, roi.height, src_stride[0] / sizeof (T) },
			{ 0, components, stride                     },
		};

		halide_buffer_t src_buffer =
		{
			.device     = (uint64_t)src[0],
			.host       = (uint8_t *)src[0],
			.type       = halide_type_of<T>(),
			.dimensions = 3,
			.dim        = src_dim
		};

		halide_dimension_t dst_dim[] =
		{
			{ 0, roi.width,  components              },
			{ 0, roi.height, dst_stride / sizeof (T) },
			{ 0, components, 1                       },
		};

		halide_buffer_t dst_buffer =
		{
			.device     = (uint64_t)dst,
			.host       = (uint8_t *)dst,
			.type       = halide_type_of<T>(),
			.dimensions = 3,
			.dim        = dst_dim
		};

		switch (compute)
		{
			case cpu:

			if constexpr (std::is_same_v<T, uint8_t> == true) return scope_uint8_cpu (nullptr, &src_buffer, &dst_buffer), Success;

			if constexpr (std::is_same_v<T, uint16_t> == true) return scope_uint16_cpu (nullptr, &src_buffer, &dst_buffer), Success;

			if constexpr (std::is_same_v<T, float> == true) return scope_float32_cpu (nullptr, &src_buffer, &dst_buffer), Success;

			default:

			return UnsupportedComputeMode;
		}
	}
	else
	{
		for (int32_t i = 0; i < components; ++i)
		{
			halide_dimension_t src_dim[] =
			{
				{ 0, roi.width,  1                          },
				{ 0, roi.height, src_stride[i] / sizeof (T) },
				{ 0, 1,          stride                     },
			};

			halide_buffer_t src_buffer =
			{
				.device     = (uint64_t)src[i],
				.host       = (uint8_t *)src[i],
				.type       = halide_type_of<T>(),
				.dimensions = 3,
				.dim        = src_dim
			};

			halide_dimension_t dst_dim[] =
			{
				{ 0, roi.width,  components              },
				{ 0, roi.height, dst_stride / sizeof (T) },
				{ 0, 1,          1                       },
			};

			halide_buffer_t dst_buffer =
			{
				.device     = (uint64_t)(dst + i),
				.host       = (uint8_t *)(dst + i),
				.type       = halide_type_of<T>(),
				.dimensions = 3,
				.dim        = dst_dim
			};

			switch (compute)
			{
				case cpu:

				if constexpr (std::is_same_v<T, uint8_t> == true) return scope_uint8_cpu (nullptr, &src_buffer, &dst_buffer), Success;

				if constexpr (std::is_same_v<T, uint16_t> == true) return scope_uint16_cpu (nullptr, &src_buffer, &dst_buffer), Success;

				if constexpr (std::is_same_v<T, float> == true) return scope_float32_cpu (nullptr, &src_buffer, &dst_buffer), Success;

				default:

				return UnsupportedComputeMode;
			}
		}

		return Success;
	}
}

ZMO_EXTERNAL error_t Scope_u8_P2C2 (const uint8_t *src[2], int32_t src_stride[2], uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_P2C2 (const uint16_t *src[2], int32_t src_stride[2], uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_P2C2 (const float *src[2], int32_t src_stride[2], float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_P3C3 (const uint8_t *src[3], int32_t src_stride[3], uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_P3C3 (const uint16_t *src[3], int32_t src_stride[3], uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_P3C3 (const float *src[3], int32_t src_stride[3], float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_P4C4 (const uint8_t *src[4], int32_t src_stride[4], uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_P4C4 (const uint16_t *src[4], int32_t src_stride[4], uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_P4C4 (const float *src[4], int32_t src_stride[4], float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (src, src_stride, dst, dst_stride, roi, compute, context);
}

///
///	@brief		Deinterleaves the video frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
template<int components, typename T> static error_t scope (const T *src, int32_t src_stride, T *dst[components], int32_t dst_stride[components], Region<int32_t> roi, compute_t compute, void *context)
{
	if (src == nullptr || dst == nullptr) return NullPointer;

	static_assert (components > 1);

	//	if all planes have the same stride

	bool uniform_stride = true;

	int32_t stride = static_cast<int32_t> (dst[1] - dst[0]);

	for (int32_t i = 2; i < components; ++i)
	{
		if (dst[i - 1] - dst[i] == stride) continue;

		uniform_stride = false;

		break;
	}

	if (uniform_stride == true)
	{
		halide_dimension_t src_dim[] =
		{
			{ 0, roi.width,  components              },
			{ 0, roi.height, src_stride / sizeof (T) },
			{ 0, components, 1                       },
		};

		halide_buffer_t src_buffer =
		{
			.device     = (uint64_t)src,
			.host       = (uint8_t *)src,
			.type       = halide_type_of<T>(),
			.dimensions = 3,
			.dim        = src_dim
		};

		halide_dimension_t dst_dim[] =
		{
			{ 0, roi.width,  1                          },
			{ 0, roi.height, dst_stride[0] / sizeof (T) },
			{ 0, components, stride                     },
		};

		halide_buffer_t dst_buffer =
		{
			.device     = (uint64_t)dst[0],
			.host       = (uint8_t *)dst[0],
			.type       = halide_type_of<T>(),
			.dimensions = 3,
			.dim        = dst_dim
		};

		if constexpr (std::is_same_v<T, uint8_t> == true) return scope_uint8_cpu (nullptr, &src_buffer, &dst_buffer), Success;

		if constexpr (std::is_same_v<T, uint16_t> == true) return scope_uint16_cpu (nullptr, &src_buffer, &dst_buffer), Success;

		if constexpr (std::is_same_v<T, float> == true) return scope_float32_cpu (nullptr, &src_buffer, &dst_buffer), Success;
	}
	else
	{
		for (int32_t i = 0; i < components; ++i)
		{
			halide_dimension_t src_dim[] =
			{
				{ 0, roi.width,  components              },
				{ 0, roi.height, src_stride / sizeof (T) },
				{ 0, 1,          1                       },
			};

			halide_buffer_t src_buffer =
			{
				.device     = (uint64_t)(src + i),
				.host       = (uint8_t *)(src + i),
				.type       = halide_type_of<T>(),
				.dimensions = 3,
				.dim        = src_dim
			};

			halide_dimension_t dst_dim[] =
			{
				{ 0, roi.width,  1                          },
				{ 0, roi.height, dst_stride[i] / sizeof (T) },
				{ 0, 1,          stride                     },
			};

			halide_buffer_t dst_buffer =
			{
				.device     = (uint64_t)dst[i],
				.host       = (uint8_t *)dst[i],
				.type       = halide_type_of<T>(),
				.dimensions = 3,
				.dim        = dst_dim
			};

			if constexpr (std::is_same_v<T, uint8_t> == true) scope_uint8_cpu (nullptr, &src_buffer, &dst_buffer);

			if constexpr (std::is_same_v<T, uint16_t> == true) scope_uint16_cpu (nullptr, &src_buffer, &dst_buffer);

			if constexpr (std::is_same_v<T, float> == true) scope_float32_cpu (nullptr, &src_buffer, &dst_buffer);
		}

		return Success;
	}
}

ZMO_EXTERNAL error_t Scope_u8_C2P2 (const uint8_t *src, int32_t src_stride, uint8_t *dst[2], int32_t dst_stride[2], Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C2P2 (const uint16_t *src, int32_t src_stride, uint16_t *dst[2], int32_t dst_stride[2], Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C2P2 (const float *src, int32_t src_stride, float *dst[2], int32_t dst_stride[2], Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_C3P3 (const uint8_t *src, int32_t src_stride, uint8_t *dst[3], int32_t dst_stride[3], Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C3P3 (const uint16_t *src, int32_t src_stride, uint16_t *dst[3], int32_t dst_stride[3], Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C3P3 (const float *src, int32_t src_stride, float *dst[3], int32_t dst_stride[3], Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_C4P4 (const uint8_t *src, int32_t src_stride, uint8_t *dst[4], int32_t dst_stride[4], Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C4P4 (const uint16_t *src, int32_t src_stride, uint16_t *dst[4], int32_t dst_stride[4], Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C4P4 (const float *src, int32_t src_stride, float *dst[4], int32_t dst_stride[4], Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (src, src_stride, dst, dst_stride, roi, compute, context);
}
}
}
