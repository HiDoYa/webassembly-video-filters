#!/usr/bin/python

import os
import sys
import shutil

src = sys.argv[1]
dst = sys.argv[2]

if os.path.isdir (src):
    shutil.rmtree (dst, True)
    shutil.copytree (src, dst, True)
else:
    shutil.copyfile (src, dst)