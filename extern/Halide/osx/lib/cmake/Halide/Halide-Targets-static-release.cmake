#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "Halide::Halide" for configuration "Release"
set_property(TARGET Halide::Halide APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Halide::Halide PROPERTIES
  IMPORTED_LINK_INTERFACE_LANGUAGES_RELEASE "C;CXX"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/libHalide.a"
  )

list(APPEND _IMPORT_CHECK_TARGETS Halide::Halide )
list(APPEND _IMPORT_CHECK_FILES_FOR_Halide::Halide "${_IMPORT_PREFIX}/lib/libHalide.a" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
