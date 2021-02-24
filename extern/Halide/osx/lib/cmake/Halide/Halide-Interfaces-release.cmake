#----------------------------------------------------------------
# Generated CMake target import file for configuration "Release".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "Halide::retrain_cost_model" for configuration "Release"
set_property(TARGET Halide::retrain_cost_model APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Halide::retrain_cost_model PROPERTIES
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/retrain_cost_model"
  )

list(APPEND _IMPORT_CHECK_TARGETS Halide::retrain_cost_model )
list(APPEND _IMPORT_CHECK_FILES_FOR_Halide::retrain_cost_model "${_IMPORT_PREFIX}/bin/retrain_cost_model" )

# Import target "Halide::featurization_to_sample" for configuration "Release"
set_property(TARGET Halide::featurization_to_sample APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Halide::featurization_to_sample PROPERTIES
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/featurization_to_sample"
  )

list(APPEND _IMPORT_CHECK_TARGETS Halide::featurization_to_sample )
list(APPEND _IMPORT_CHECK_FILES_FOR_Halide::featurization_to_sample "${_IMPORT_PREFIX}/bin/featurization_to_sample" )

# Import target "Halide::get_host_target" for configuration "Release"
set_property(TARGET Halide::get_host_target APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Halide::get_host_target PROPERTIES
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/get_host_target"
  )

list(APPEND _IMPORT_CHECK_TARGETS Halide::get_host_target )
list(APPEND _IMPORT_CHECK_FILES_FOR_Halide::get_host_target "${_IMPORT_PREFIX}/bin/get_host_target" )

# Import target "Halide::weightsdir_to_weightsfile" for configuration "Release"
set_property(TARGET Halide::weightsdir_to_weightsfile APPEND PROPERTY IMPORTED_CONFIGURATIONS RELEASE)
set_target_properties(Halide::weightsdir_to_weightsfile PROPERTIES
  IMPORTED_LOCATION_RELEASE "${_IMPORT_PREFIX}/bin/weightsdir_to_weightsfile"
  )

list(APPEND _IMPORT_CHECK_TARGETS Halide::weightsdir_to_weightsfile )
list(APPEND _IMPORT_CHECK_FILES_FOR_Halide::weightsdir_to_weightsfile "${_IMPORT_PREFIX}/bin/weightsdir_to_weightsfile" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
