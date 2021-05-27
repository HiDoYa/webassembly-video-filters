import json
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

with open('benchmark_data.json') as f:
    data = json.load(f)

fig = plt.figure(figsize=(8, 8))
ax = fig.add_axes([0.1, 0.15, 0.8, 0.7])

scope_name = []
cpp_scope_name = []
js_scope_name = []

scope_time = []
cpp_scope_time = []
js_scope_time = []

for scope in data:
    if 'C++' in scope['name']:
        cpp_scope_name.append(scope['name'])
        cpp_scope_time.append(scope['time'])
    elif 'JS' in scope['name']:
        js_scope_name.append(scope['name'])
        js_scope_time.append(scope['time'])
    else:
        scope_name.append(scope['name'])
        scope_time.append(scope['time'])


plt.title("Average Time for Scope (1000 iterations)")
plt.xlabel("Scope")
plt.ylabel("Time (ms)")

X = np.arange(len(scope_name))
ax.bar(X - 0.2, scope_time, color = 'b', width = 0.2)
ax.bar(X + 0.0, cpp_scope_time, color = 'r', width = 0.2)
ax.bar(X + 0.2, js_scope_time, color = 'g', width = 0.2)

plt.xticks(ticks=X, labels=scope_name)
plt.setp(ax.get_xticklabels(), rotation=40, horizontalalignment='right')

blue_patch = mpatches.Patch(color='blue', label='Halide')
red_patch = mpatches.Patch(color='red', label='C++')
green_patch = mpatches.Patch(color='green', label='JS')

plt.legend(handles=[blue_patch, red_patch, green_patch])

plt.text(x=4.55, y=41.66, s='24 fps')
plt.text(x=4.55, y=33.33, s='30 fps')
plt.text(x=4.55, y=16.66, s='60 fps')
plt.axhline(y=41.66, color='black', linestyle =":")
plt.axhline(y=33.33, color='black', linestyle =":")
plt.axhline(y=16.66, color='black', linestyle =":")

plt.savefig('graph.png')
plt.close()
