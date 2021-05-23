# 문제 : P.345
# 풀이 : P.536

# (X, Y)에 존재하는 바이러스의 종류 출력
import sys
from collections import deque

input = sys.stdin.readline
n, k = map(int, input().split())
data = []
graph = []

for i in range(n) :
    graph.append(list(map(int, input().split())))
    for j in range(n) :
        if graph[i][j] != 0 :
            data.append((graph[i][j], 0, i, j))

ts, tx, ty = map(int, input().split())
data.sort()
q = deque(data)

dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]

while q :
    virus, s, x, y = q.popleft()
    if s == ts :
        break
    for i in range(4) : 
        nx = x + dx[i]
        ny = y + dy[i]
        if 0 <= nx and nx < n and 0 <= ny and ny < n :
            if graph[nx][ny] == 0 :
                graph[nx][ny] = virus
                q.append((virus, s + 1, nx, ny))

print(graph[tx-1][ty-1])

        

                