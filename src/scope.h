#pragma once

#include "types.h"

namespace ZMO
{
enum SCOPES { LUMASCOPE, RGBPARADE, VECTORSCOPE, CVECTORSCOPE, CLUMASCOPE };
///
///	@name Scope
///
///	These functions perform image scopeing.
///
///	@{
///

///
///	@brief		Copies the video frame.
///
///	@param		selector    Selector to specify the Halide generator.
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u8_C1 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

ZMO_EXTERNAL error_t Scope_u8_C2 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

ZMO_EXTERNAL error_t Scope_u8_C3 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

ZMO_EXTERNAL error_t Scope_u8_C4 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@}
///
}
