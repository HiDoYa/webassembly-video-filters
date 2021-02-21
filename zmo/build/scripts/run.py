#!/usr/bin/python

import sys
from subprocess import check_call

for command in sys.argv[1:]:

#    print (command)

    check_call (list (filter (None, command.split (' '))))