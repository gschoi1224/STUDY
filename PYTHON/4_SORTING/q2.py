# 문제 : P.361
# 풀이 : P.552

n = int(input())
house = list(map(int, input().split()))
result = 200001
min_val = 200001
for h in house :
    sum = 0
    for o in house :
        sum += abs(h - o)
    if min_val > sum:
        min_val = min(min_val, sum)
        result = h
print(result)

# 그냥 중간값 출력하면 정답
n = int(input())
data = list(map(int, input().split()))
data.sort()
print(data[(n - 1) // 2])