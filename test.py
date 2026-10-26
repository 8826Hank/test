# --- Part 1: Basic Functions (Problem 3-1 ~ 3-7) ---

def f1(n):
    X = [i for i in range(1, n) if i % 2 == 0]
    return (X)  
    # X = [2,4,6]
def f2(S):
    data = dict()
    for s in S:
        if s in data.keys():
            data[s] = data[s] + 1
        else:
            data[s] = 1
    return data

def f3(n): # n = 6
    f = lambda m, n: m * n + 1
    X = {i: f(i, i + 1) for i in range(1, n) if i % 3 == 0}
        # X is Dict[]
    return (X)

def f4():
    scores = [['John', 90, 80], ['Bob', 50, 70], ['Mary', 80, 70]]
    data = filter(lambda x: True if sum(x[1:3]) < 150 else False, scores)
    return list(data)

def f5(s1, s2, m, n):
    #NTUT good 2 4
    return s1[m:n] + s2[m:n]

def f6(A, B):
    return list(map(lambda x, y: x ** y, A, B))

def f7(data, n):
    if n == len(data): return [data]
    elif n == 0: return [""]
    s0 = f7(data[1:], n)
    s1 = [data[0] + s for s in f7(data[1:], n - 1)]
    return sorted(s0 + s1)

# --- Part 2: Matrix Compression (Problem 3-8 ~ 3-10) ---

def op(data, x, y, n):
    sum = 0
    for i in range(x, x + n):
        for j in range(y, y + n):
            sum = sum + __________            #(Problem 3-8)
    return sum // __________                  #(Problem 3-9)

def compress(data, m, n):
    size = __________                         #(Problem 3-10)
    target = []
    for x in range(size):
        row = []
        for y in range(size):
            row.append(op(data, x * n, y * n, n))
        target.append(row)
    return target

# --- Main Calls ---
print(f1(8)[2])                               #(Problem 3-1) =6
print(f2('ntut csie')['t'])                   #(Problem 3-2) =2
print(f3(6)[3])                               #(Problem 3-3) =13
print(f4())                                   #(Problem 3-4) = ['Bob', 50, 70]
print(f5('ntut', 'good', 2, 4))               #(Problem 3-5) = utod
print(f6([2, 4, 6], [3, 2, 1]))               #(Problem 3-6) = [8 , 16, 6]
print(f7('abc', 2))                           #(Problem 3-7) = []