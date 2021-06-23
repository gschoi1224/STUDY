# 문제 : P.386
# 풀이 : P.575

n = int(input())
m = int(input())
INF = int(1e9)
graph = [[INF] * (n + 1) for i in range(n + 1)]
for _ in range(m) :
    a, b, c = map(int, input().split())
    graph[a][b] = min(c, graph[a][b])

for k in range(1, n + 1) :
    for a in range(1, n + 1) : 
        for b in range(1, n + 1) :
            graph[a][b] = min(graph[a][b], graph[a][k] + graph[k][b])

for a in range(1, n + 1) :
    for b in range(1, n + 1) :
        if (INF == graph[a][b] or a == b) :
            print(0, end=' ')
        else :
            print(graph[a][b], end=' ')
    print()

# 풀이
# 최단 경로 문제. 가장 짧은 간선 정보만 저장하고, n이 100 이하이기 때문에 플로이드 워셜 알고리즘으로 푼다.