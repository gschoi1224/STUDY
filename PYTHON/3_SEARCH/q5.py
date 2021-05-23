# 문제 : P.350
# 풀이 : P.539

# 중복으로 계산하는게 많아서 시간초과뜸
from itertools import permutations
import sys
input = sys.stdin.readline

n = int(input())
number = list(map(int, input().split()))
operCount = list(map(int, input().split()))
oper = []
for o in range(len(operCount)) :
    for _ in range(operCount[o]) :
        oper.append(o)
oper = list(permutations(oper))

min_val = int(1e9)
max_val = int(-1e9)

def find_oper(a, b, o) :
    if o == 0 : 
        return a + b
    elif o == 1 :
        return a - b
    elif o == 2 :
        return a * b
    elif o == 3 and a < 0:
        val = -a // b
        return -val
    elif o == 3 and a >= 0 :
        return a // b

for o in oper :
    print(o)
    val = number[0]
    for i in range(n - 1) :
        val = find_oper(val, number[i+1], o[i])

    min_val = min(min_val, val)
    max_val = max(max_val, val)

print(max_val)
print(min_val)

# 결과식 최댓값
# 결과식 최솟값


# 풀이
# DFS를 사용해 풀기

n = int(input())
data = list(map(int, input().split()))
add, sub, mul, div = map(int, input().split())

min_value = 1e9
max_value = -1e9

def dfs(i, now) :
    global min_value, max_value, add, sub, mul,div 
    if i == n :
        min_value = min(min_value, now)
        max_value = max(max_value, now)
    else :
        if add > 0 :
            add -= 1
            dfs(i + 1, now + data[i])
            add += 1
        if sub > 0 : 
            sub -= 1
            dfs(i + 1, now - data[i])
            sub += 1
        if mul > 0 : 
            mul -= 1
            dfs(i + 1, now * data[i])
            mul += 1
        if div > 0 :
            div -= 1
            if now < 0 :
                dfs(i + 1, -(-now // data[i]))
            else :
                dfs(i + 1, now // data[i])
            div += 1

dfs(1, data[0])

print(max_value)
print(min_value)
        