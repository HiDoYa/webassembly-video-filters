#!/usr/bin/python

import sys
import re
import ast

from subprocess import check_call

variables = sys.argv[1:-1]
command = sys.argv[-1]

is_variable = re.compile(r"(.+)=(\[.+(?:, ?.+)*\])")

#   create dictionary of all variable parameters

params = {}

for variable in variables:

    match = is_variable.match (variable)

    if not match:

        raise Exception

    params[match.group(1)] = { "index" : 0, "values" : ast.literal_eval (match.group(2)) }

#   replace parameter tokens

def replace_tokens (param):

    matches = re.findall (r"{([^}]+)}", param)

    for match in matches:

        index = params[match]["index"]

        value = params[match]["values"][index]

        param = param.replace ('{' + match + '}', value)

    return param

#   increases the current state by 1

def next (params):

    for item in params:

        index = params[item]["index"]

        count = len (params[item]["values"])

        if index < count - 1:

            params[item]["index"] = index + 1

            return True

        params[item]["index"] = 0

    return False

#   call all variations of our command

while True:

    command_line = replace_tokens (command)

    print (command_line)

    if next (params) == False:
        break