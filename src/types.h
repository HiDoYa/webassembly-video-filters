#pragma once

#include <stdint.h>

#ifdef ZMO_EXPORT
 #define ZMO_EXTERNAL __attribute__ ((visibility ("default")))
#else
 #define ZMO_EXTERNAL
#endif

namespace ZMO
{
///
/// @brief		Defines a 2-D region.
///
template<typename T> struct Region
{
	Region (T x, T y, T width, T height)
	{
		this->x = x;

		this->y = y;

		this->width = width;

		this->height = height;
	}

	Region (T width, T height)
	{
		this->x = 0;

		this->y = 0;

		this->width = width;

		this->height = height;
	}

	T x, y, width, height;
};

///
/// @brief		Defines a 2-D point within a 2-D region.
///
template<typename T> struct Point
{
	T x, y;
};

///
///	@brief		Compute type.
///
enum compute_t { cpu, opencl, cuda, metal };

///
///	@brief		Error type.
///
enum error_t
{
	Success                = 0,
	ArgOutOfRange          = -1,
	NullPointer            = -2,
	UnexpectedError        = -3,
	UnsupportedComputeMode = -4,
};

///
///	@brief		Gets the message for the specified error.
///
///	@param		err			the error
///	@return		const char*
///
const char *GetErrorMessage (error_t err);
}
