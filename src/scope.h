#pragma once

#include "types.h"

namespace Telestream
{
namespace ZMO
{
enum SCOPES { SCOPE_0, SCOPE_1, SCOPE_2 };
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
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u8_C1 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u16_C1 (const int selector, const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_f32_C1 (const int selector, const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u8_C2 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u16_C2 (const int selector, const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_f32_C2 (const int selector, const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u8_C3 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u16_C3 (const int selector, const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_f32_C3 (const int selector, const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u8_C4 (const int selector, const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u16_C4 (const int selector, const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_f32_C4 (const int selector, const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);


///
///	@}
///
}
}
