# 문제 : P.340
# 풀이 : P.531
from collections import deque
import sys
input = sys.stdin.readline

n, m, k, x = map(int, input().split())
data = [[] * i for i in range(n + 1)]
for _ in range(m) :
    a, b = map(int, input().split())
    data[a].append((b))

dp = [-1] * (n + 1)
def bfs(start) :
    q = deque()
    dp[start] = 0
    q.append(start)
    while q : 
        now = q.popleft()
        for i in data[now] :
            if dp[i] == -1 :
                # 비용 계산
                dp[i] = (dp[now] + 1)
                q.append(i)

bfs(x)
flag = False
for i in range(1, len(dp)) :
    if dp[i] == k : 
        print(i)
        flag = True
if not flag :
    print(-1)


# 풀이
# 문제에서 모든 도로의 거리는 1이고 그래프에서 모든 간선의 비용이 동일할 때는 너비 우선 탐색(BFS)을 이용하여 최단 거리를 찾을 수 있다.

# 예시
distance = [-1] * (n + 1)
q = deque([x])
while q :
    now = q.popleft()
    for next_node in data[now] :
        if distance[next_node] == -1 :
            distance[next_node] = distance[now] + 1
            q.append(next_node)


    


