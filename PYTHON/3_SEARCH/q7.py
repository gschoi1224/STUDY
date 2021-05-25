# 문제 : P.354
# 풀이 : P.543

import sys
from collections import deque
input = sys.stdin.readline

n, l, r = map(int, input().split())
data = []
for _ in range(n) :
    data.append(list(map(int, input().split())))

result = 0
visited = []
def unionCheck(x, y, num) :
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]
    q = deque()
    q.append((x, y))
    count = 1
    summary = data[x][y]
    united = []
    while q :
        x, y = q.popleft()
        for i in range(4) :
            nx = x + dx[i]
            ny = y + dy[i]
            if nx >= 0 and ny >= 0 and nx < n and ny < n and visited[nx][ny] == -1 and l <= abs(data[x][y] - data[nx][ny]) <= r:
                visited[nx][ny] = num
                q.append((nx, ny))
                count += 1
                summary += data[nx][ny]
                united.append((nx, ny))
    for x, y in united :
        data[x][y] = summary // count
while True :
    visited = [[-1] * n for _ in range(n)]
    num = 0
    for x in range(n) :
        for y in range(n) :
            if visited[x][y] == -1 :
                unionCheck(x, y, num)
                num += 1
    if num == n * n :
        break
    result += 1
print(result)


