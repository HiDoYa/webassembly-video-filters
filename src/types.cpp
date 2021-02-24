#include "types.h"

namespace Telestream
{
namespace ZMO
{

///
///	@brief		Gets the message for the specified error.
///
///	@param		err			the error
///	@return		const char*
///
const char *GetErrorMessage (error_t err)
{
	switch (err)
	{
		case Success:

        return "no error";

		case ArgOutOfRange:

        return "arguement out of range";

		case NullPointer:

        return "null pointer";

		case UnexpectedError:

        return "unexpected error";

		case UnsupportedComputeMode:

        return "unsupported compute mode";

		default:

		return "unrecognized error";
	}
}
}
}
