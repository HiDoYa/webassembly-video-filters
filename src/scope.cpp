#include "types.h"
#include "scope.h"

#include "lumascope_uint8_cpu.h"
#include "scope1_uint8_cpu.h"

#include "HalideRuntime.h"

#include <assert.h>
#include <type_traits>

namespace Telestream
{
namespace ZMO
{

typedef int (*scope_func)(void const *__user_context, struct halide_buffer_t *_input_buffer, struct halide_buffer_t *_output_buffer);
scope_func select_scope(const int selector)
{
	switch (selector) {
		case LUMASCOPE:
			return lumascope_uint8_cpu;
		case SCOPE_1:
			return scope1_uint8_cpu;
		default:
			return lumascope_uint8_cpu;
	}
}
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
template<int components, typename T> static error_t scope (const int selector, const T *src, int32_t src_stride, T *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
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

		if constexpr (std::is_same_v<T, uint8_t> == true) return select_scope(selector)(nullptr, &src_buffer, &dst_buffer), Success;

		// These aren't necessary for our use case
		// if constexpr (std::is_same_v<T, uint16_t> == true) return scope1_uint16_cpu (nullptr, &src_buffer, &dst_buffer), Success;
		// if constexpr (std::is_same_v<T, float> == true) return scope1_float32_cpu (nullptr, &src_buffer, &dst_buffer), Success;

		default:

		return UnsupportedComputeMode;
	}
}

ZMO_EXTERNAL error_t Scope_u8_C1 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<1> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C1 (const int selector, const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<1> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C1 (const int selector, const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<1> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_C2 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C2 (const int selector, const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C2 (const int selector, const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<2> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_C3 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C3 (const int selector, const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C3 (const int selector, const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<3> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u8_C4 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_u16_C4 (const int selector, const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

ZMO_EXTERNAL error_t Scope_f32_C4 (const int selector, const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute, void *context)
{
	return scope<4> (selector, src, src_stride, dst, dst_stride, roi, compute, context);
}

}
}
