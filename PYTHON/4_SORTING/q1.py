# 문제 : P.360
# 풀이 : P.551

n = int(input())
d = []
for _ in range(n) :
    d.append(list(input().split()))
d.sort(key=lambda x: (-int(x[1]), int(x[2]), -int(x[3]), x[0]))
for s in d:
    print(s[0])