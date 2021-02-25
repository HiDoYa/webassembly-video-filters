#!/usr/bin/python

import os
import sys

dirs = sys.argv[1:-1]

for dir in dirs:

    if os.path.isdir (dir):
        continue

    os.makedirs (dir)