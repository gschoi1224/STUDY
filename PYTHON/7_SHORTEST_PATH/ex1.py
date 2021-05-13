# <미래 도시>

# 방문 판매원 A는 많은 회사가 모여 있는 공중 미래 도시에 있다. 공중 미래 도시에는 1번부터 N번까지의 회사가 있는데 특정 회사끼리는 서로 도로를 통해 연결되어 있다.
# 방문 판매원 A는 현재 1번 회사에 위치해 있으며, X번 회사에 방문해 물건을 판매하고자 한다.
# 공중 미래 도시에서 특정 회사에 도착하기 위한 방법은 회사끼리 연결되어 있는 도로를 이용하는 방법이 유일하다. 또한 연결된 2개의 회사는 양방향으로 이동할 수 있다.
# 공중 미래 도시에서 도로는 마하의 속도로 사람을 이동시켜주기 때문에 특정 회사와 다른 회사가 도로로 연결되어 있다면, 정확히 1만큼의 시간으로 이동할 수 있다.
# 또한 오늘 방문 판매원 A는 기대하던 소개팅에도 참석하고자 한다. 소개팅의 상대는 K번 회사에 존재한다.
# 방문 판매원 A는 X번 회사에 가서 물건을 판매하기 전에 먼저 소개팅 상대의 회사에 찾아가서 함께 커피를 마실 예정이다.
# 따라서 방문 판매원 A는 1번 회사에서 출발하여 K번 회사를 방문한 뒤에 X번 회사로 가는 것이 목표다. 이때 방문판매원 A는 가능한 한 빠르게 이동하고자 한다.
# 방문 판매원이 회사 사이를 이동하게 되는 최소 시간을 계산하는 프로그램을 작성하시오.
# 이때 소개팅의 상대방과 커피를 마시는 시간 등은 고려하지 않는다고 가정한다.
# 예를 들어 N = 5, X = 4, K = 5이고 회사 간 도로가 7개면서 각 도로가 다음과 같이 연결되어 있을 때를 가장할 수 있다.
# (1번, 2번), (1번, 3번), (1번, 4번), (2번, 4번), (3번, 4번), (3번, 5번), (4번, 5번)
# 이때 방문 판매원 A가 최종적으로 4번 회사에 가는 경로를 (1번 - 3번 - 5번 - 4번)으로 설정하면,
# 소개팅에도 참석할 수 있으면서 총 3만큼의 시간으로 이동할 수 있다. 따라서 이 경우 초소 이동 시간은 3이다.
# 입력 조건
# - 첫째 줄에 전체 회사의 개수 N과 경로의 개수 M이 공백으로 구분되어 차례대로 주어진다. (1 <= N, M <= 100)
# - 둘째 줄부터 M + 1번째 줄에는 연결된 두 회사의 번호가 공백으로 구분되어 주어진다.
# - M + 2번째 줄에는 X와 K가 공백으로 구분되어 차례대로 주어진다. (1 <= K <= 100)
# 출력 조건
# - 첫째 줄에 방문 판매원 A가 K번 회사를 거쳐 X번 회사로 가는 최소 이동 시간을 출력한다.
# - 만약 X번 회사에 도달할 수 없다면 -1을 출력한다.
# 입력 예시 1
# 5 7
# 1 2
# 1 3
# 1 4
# 2 4
# 3 4
# 3 5
# 4 5
# 4 5
# 출력 예시 1
# 3
# 입력 예시 2
# 4 2
# 1 3
# 2 4
# 3 4
# 출력 예시 2
# -1

# 내 답안
import sys
import heapq
input = sys.stdin.readline

n, m = map(int, input().split())
graph = [[] for i in range(n + 1)]
for _ in range(m) :
    a, b = (map(int, input().split()))
    graph[a].append((b, 1))
    graph[b].append((a, 1))
x, k = map(int, input().split())
INF = int(1e9)

def dijkstra(start) :
    d = [INF] * (n + 1)
    q = []
    d[start] = 0
    heapq.heappush(q, (0, start))
    while q :
        dist, now = heapq.heappop(q)
        if d[now] < dist :
            continue
        for i in graph[now] :
            cost = d[now] + i[1]
            if cost < d[i[0]] :
                d[i[0]] = cost
                heapq.heappush(q, (cost, i[0]))
    return d

d = dijkstra(1)
startToK = d[k]
d = dijkstra(k)
kToX = d[x]

result = startToK + kToX
if result >= INF :
    print(-1)
else :
    print(result)

# 문제 해설
# 이 문제는 전형적인 플로이드 워셜 알고리즘 문제이다. 현재 문제에서 N의 범위가 100 이하로 매우 한정적이다. 
# 따라서 플로이드 워셜 알고리즘을 이용해도 빠르게 풀 수 있기 때문에, 구현이 간단한 플로이드 워셜 알고리즘을 이용하는 것이 유리하다.
# 이 문제의 핵심 아이디어는 1번 노드에서 X를 거쳐 K로 가는 최단 거리는 (번 노드에서 X까지의 최단 거리 + X에서 K까지의 최단 거리)라는 점이다.

# 답안 예시
INF = int(ie9)

n, m = map(int, input().split())
graph = [[INF] * (n + 1) for _ in range(n + 1)]

# 자기 자신에서 자기 자신으로 가는 비용은 0으로 초기화
for a in range(1, n + 1) :
    for b in range(1, n + 1) :
        if a == b :
            graph[a][b] = 0

# 각 간선에 대한 정보를 입력받아, 그 값으로 초기화
for _ in range(m) :
    # A와 B가 서로에게 가는 비용은 1이라고 설정
    a, b = map(int, input().split())
    graph[a][b] = 1
    graph[a][b] = 1

# 거쳐 갈 노드 X와 최종 목적지 노드 K를 입력받기
x, k = map(int, input().split())

# 점화식에 따라 플로이드 위셜 알고리즘을 수행
for k in range(1, n + 1) :
    for a in range(1, n + 1) :
        for b in range(1, n + 1) :
            graph[a][b] = min(graph[a][b], graph[a][k] + graph[k][b])

# 수행된 결과를 출력
distance = graph[1][k] + graph[k][x]

# 도달할 수 없는 경우, -1을 출력
if distance >= INF :
    print('-1')
else :
    print(distance)