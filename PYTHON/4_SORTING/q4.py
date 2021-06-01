# 문제 : P.364
# 풀이 : P.555
import heapq
n = int(input())
data = []
for _ in range(n) :
    heapq.heappush(data, int(input()))

result = 0
while data :
    if (len(data) == 1) :
        break
    a = heapq.heappop(data)
    b = heapq.heappop(data)
    result += a + b
    heapq.heappush(data, a + b)

print(result)
