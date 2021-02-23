#!/usr/bin/python

import sys
import glob

pattern = sys.argv[1]

for file in glob.glob (pattern):
    print (file)