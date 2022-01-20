
import sys,json

def f(var):
    res = var + 'modified'
    print(res)
    sys.stdout.flush()
    return res

f(sys.argv[1])