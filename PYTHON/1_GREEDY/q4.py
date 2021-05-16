# 문제 : P.315
# 풀이 : P.510

from itertools import combinations

n = int(input())
array = list(map(int, input().split()))

result = [False] * (sum(array) + 1)

for i in range(1, n + 1) :
    data = list(combinations(array, i))
    for j in data :
        result[sum(j)] = True

for i in range(1, len(result)) :
    if result[i] == False : 
        print(i)

# 답
n = int(input())
data = list(map(int, input().split()))
data.sort()

target = 1
for x in data :
    # 만들 수 없는 금액을 찾았을 때 반복 종료
    if target < x : 
        break
    target += x

print(target)