#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "Halide::shared::Halide" for configuration "Release"
set_property(TARGET Halide::shared::Halide APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Halide::shared::Halide PROPERTIES
  IMPORTED_IMPLIB_RELEASE "${_IMPORT_PREFIX}/lib/Release/Halide.lib"
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/Release/Halide.dll"
  )

list(APPEND _IMPORT_CHECK_TARGETS Halide::shared::Halide )
list(APPEND _IMPORT_CHECK_FILES_FOR_Halide::shared::Halide "${_IMPORT_PREFIX}/lib/Release/Halide.lib" "${_IMPORT_PREFIX}/bin/Release/Halide.dll" )

# Import target "Halide::shared::Adams2019" for configuration "Release"
set_property(TARGET Halide::shared::Adams2019 APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Halide::shared::Adams2019 PROPERTIES
  IMPORTED_COMMON_LANGUAGE_RUNTIME_RELEASE ""
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/Release/autoschedule_adams2019.dll"
  )

list(APPEND _IMPORT_CHECK_TARGETS Halide::shared::Adams2019 )
list(APPEND _IMPORT_CHECK_FILES_FOR_Halide::shared::Adams2019 "${_IMPORT_PREFIX}/lib/Release/autoschedule_adams2019.dll" )

# Import target "Halide::shared::Li2018" for configuration "Release"
set_property(TARGET Halide::shared::Li2018 APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Halide::shared::Li2018 PROPERTIES
  IMPORTED_COMMON_LANGUAGE_RUNTIME_RELEASE ""
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/Release/autoschedule_li2018.dll"
  )

list(APPEND _IMPORT_CHECK_TARGETS Halide::shared::Li2018 )
list(APPEND _IMPORT_CHECK_FILES_FOR_Halide::shared::Li2018 "${_IMPORT_PREFIX}/lib/Release/autoschedule_li2018.dll" )

# Import target "Halide::shared::Mullapudi2016" for configuration "Release"
set_property(TARGET Halide::shared::Mullapudi2016 APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Halide::shared::Mullapudi2016 PROPERTIES
  IMPORTED_COMMON_LANGUAGE_RUNTIME_RELEASE ""
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/lib/Release/autoschedule_mullapudi2016.dll"
  )

list(APPEND _IMPORT_CHECK_TARGETS Halide::shared::Mullapudi2016 )
list(APPEND _IMPORT_CHECK_FILES_FOR_Halide::shared::Mullapudi2016 "${_IMPORT_PREFIX}/lib/Release/autoschedule_mullapudi2016.dll" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
