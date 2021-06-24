# 문제 : P.389
# 풀이 : P.578
import heapq
dx = [-1 ,1, 0, 0]
dy = [0, 0, -1, 1]
INF = int(1e9)
for _ in range(int(input())) :
    n = int(input())
    data = []
    dp = [[INF] * n for _ in range(n)]
    for _ in range(n) :
        data.append(list(map(int, input().split())))
    q = []
    dp[0][0] = data[0][0]
    heapq.heappush(q, (data[0][0], (0, 0)))
    while q :
        dist, (x, y) = heapq.heappop(q)
        for i in range(4) :
            tx = x + dx[i]
            ty = y + dy[i]
            if tx >= 0 and tx < n and ty >= 0 and ty < n and dp[tx][ty] >= data[tx][ty] + dist :
                dp[tx][ty] = (data[tx][ty] + dist)
                heapq.heappush(q, (dp[tx][ty], (tx,ty)))
    print(dp[n-1][n-1])

# 문제 해설
# 문제에서 입력 자체가 2차원 배열로 들어오기 때문에 N X N의 인접 행렬을 이용해 맵 정보를 저장하면 그래프를 간단히 표현할 수 있다.
# 2차원 공간이기 때문에 전체 노드의 개수가 N^2로 10,000을 넘길 수 있기 때문에 플로이드 워셜 알고리즘 보다는 다익스트라 최단 경로 알고리즘을 이용해야함

# 답안 예시
import heapq
import sys
input = sys.stdin.readline
INF = int(1e9)

dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]

#  전체 테스트 케이스 만큼 반복
for tc in range(int(input())) :
    # 노드의 개수를 입력받기
    n = int(input())
    #  전체 맵 정보를 입력받기
    graph = []
    for i in range(n) :
        graph.append(list(map(int, input().split())))
    
    # 최단 거리 테이블을 모두 무한으로 초기화
    distance = [[INF] * n for _ in range(n)]

    x, y = 0, 0 # 시작 위치는 (0, 0)
    # 시작 노드로 가기 위한 비용은 (0, 0) 위치의 값으로 설정하여, 큐에 삽입
    q = [(graph[x][y], x, y)]
    distance[x][y] = graph[x][y]

    # 다익스트라 알고리즘 수행
    while q :
        # 가장 최단 거리가 짧은 노드에 대한 정보를 꺼내기
        dist, x, y = heapq.heappop(q)
        # 현재 노드가 이미 처리된 적이 있는 노드라면 무시
        if distance[x][y] < dist :
            continue
        # 현재 노드와 연결된 다른 인접한 노드들을 확인
        for i in range(4) :
            nx = x + dx[i]
            ny = y + dy[i]
            # 맵의 범위를 벗어나는 경우 무시
            if nx < 0 or nx >= n or ny < 0 or ny >= n :
                continue
            cost = dist + graph[nx][ny]
            # 현재 노드를 거쳐서, 다른 노드로 이동하는 거리가 더 짧은 경우
            if cost < distance[nx][ny] :
                distance[nx][ny] = cost
                heapq.heappush(q, (cost, nx, ny))
    print(distance[n-1][n-1])