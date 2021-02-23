#pragma once

#include "types.h"

namespace Telestream
{
namespace ZMO
{
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
ZMO_EXTERNAL error_t Scope_u8_C1 (const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u16_C1 (const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_f32_C1 (const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u8_C2 (const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u16_C2 (const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_f32_C2 (const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u8_C3 (const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u16_C3 (const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_f32_C3 (const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u8_C4 (const uint8_t *src, int32_t src_stride, uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_u16_C4 (const uint16_t *src, int32_t src_stride, uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

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
ZMO_EXTERNAL error_t Scope_f32_C4 (const float *src, int32_t src_stride, float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);



///
///	@brief		Copies the separate video planes into a single packed frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u8_P2C2 (const uint8_t *src[2], int32_t src_stride[2], uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the separate video planes into a single packed frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u16_P2C2 (const uint16_t *src[2], int32_t src_stride[2], uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the separate video planes into a single packed frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_f32_P2C2 (const float *src[2], int32_t src_stride[2], float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the separate video planes into a single packed frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u8_P3C3 (const uint8_t *src[3], int32_t src_stride[3], uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the separate video planes into a single packed frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u16_P3C3 (const uint16_t *src[3], int32_t src_stride[3], uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the separate video planes into a single packed frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_f32_P3C3 (const float *src[3], int32_t src_stride[3], float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the separate video planes into a single packed frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u8_P4C4 (const uint8_t *src[4], int32_t src_stride[4], uint8_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the separate video planes into a single packed frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u16_P4C4 (const uint16_t *src[4], int32_t src_stride[4], uint16_t *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the separate video planes into a single packed frame.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_f32_P4C4 (const float *src[4], int32_t src_stride[4], float *dst, int32_t dst_stride, Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);




///
///	@brief		Copies the single packed video frame to separate video planes.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u8_C2P2 (const uint8_t *src, int32_t src_stride, uint8_t *dst[2], int32_t dst_stride[2], Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the single packed video frame to separate video planes.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u16_C2P2 (const uint16_t *src, int32_t src_stride, uint16_t *dst[2], int32_t dst_stride[2], Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the single packed video frame to separate video planes.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_f32_C2P2 (const float *src, int32_t src_stride, float *dst[2], int32_t dst_stride[2], Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the single packed video frame to separate video planes.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u8_C3P3 (const uint8_t *src, int32_t src_stride, uint8_t *dst[3], int32_t dst_stride[3], Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the single packed video frame to separate video planes.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u16_C3P3 (const uint16_t *src, int32_t src_stride, uint16_t *dst[3], int32_t dst_stride[3], Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the single packed video frame to separate video planes.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_f32_C3P3 (const float *src, int32_t src_stride, float *dst[3], int32_t dst_stride[3], Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the single packed video frame to separate video planes.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u8_C4P4 (const uint8_t *src, int32_t src_stride, uint8_t *dst[4], int32_t dst_stride[4], Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the single packed video frame to separate video planes.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_u16_C4P4 (const uint16_t *src, int32_t src_stride, uint16_t *dst[4], int32_t dst_stride[4], Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);

///
///	@brief		Copies the single packed video frame to separate video planes.
///
///	@param		src         Pointer to the source image.
///	@param		src_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		dst         Pointer to the destination image.
///	@param		dst_stride  Distance (in bytes) between consecutive lines in the source image.
///	@param		roi         Desintaion region of interest.
///	@return		error_t
///
ZMO_EXTERNAL error_t Scope_f32_C4P4 (const float *src, int32_t src_stride, float *dst[4], int32_t dst_stride[4], Region<int32_t> roi, compute_t compute = cpu, void *context = nullptr);



///
///	@}
///
}
}
