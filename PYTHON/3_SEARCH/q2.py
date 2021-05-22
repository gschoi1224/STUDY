# 문제 : P.342
# 풀이 : P.532

from itertools import combinations
import copy

n, m = map(int, input().split())
array = []
for _ in range(n) :
  array.append(list(map(int, input().split())))
# n, m = 7, 7
# array = [[2, 0, 0, 0, 1, 1, 0], [0, 0, 1, 0, 1, 2, 0], [0, 1, 1, 0, 1, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1], [0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0]]

# n, m = 4, 6
# array = [[0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 2], [1, 1, 1, 0, 0, 2], [0, 0, 0, 0, 0, 2]]

def dfsVirus(array,x,y) :
    # 0 빈칸, 1 벽, 2 바이러스
    if x < 0 or y < 0 or x >= n or y >= m or array[x][y] == 1 :
        return False
    elif array[x][y] == 0 or array[x][y] == 2 :
        array[x][y] = 3
        dfsVirus(array,x+1,y)
        dfsVirus(array,x-1,y)
        dfsVirus(array,x,y+1)
        dfsVirus(array,x,y-1)
        return True

data = []
for i in range(n) :
    for j in range(m) :
        data.append((i,j))
max_val = 0
for a,b,c in list(combinations(data, 3)) :
    arr = copy.deepcopy(array)
    if arr[a[0]][a[1]] != 0 or arr[b[0]][b[1]] != 0 or arr[c[0]][c[1]] != 0 :
        continue
    arr[a[0]][a[1]] = 1
    arr[b[0]][b[1]] = 1
    arr[c[0]][c[1]] = 1
    safety = 0
    for x in range(n) :
        for y in range(m) :
            if arr[x][y] == 2 :
                dfsVirus(arr,x,y)
    
    for x in range(n) :
        safety += arr[x].count(0)
    max_val = max(safety, max_val)

print(max_val)
    
    
# 풀이
# 벽의 개수가 3개가 되는 모든 조합을 찾은 뒤에 그러한 조합에 대해서 안전 영역의 크기를 계산
# 안전 영역의 크기를 구하는 것은 DFS 또는 BFS를 이용

# 답안 예시
temp = [[0] * m for _ in range(n)] # 벽을 설치한 뒤의 맵 리스트

# 4가지 이동 방향에 대한 리스트
dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]

result = 0

# 깊이 우선 탐색(DFS)을 이용해 각 바이러스가 사방으로 퍼지도록 하기
def virus(x,y) :
    for i in range(4) :
        nx = x + dx[i]
        ny = y + dy[i]
        # 상, 하, 좌, 우 중에서 바이러스가 퍼질 수 있는 경우
        if nx >= 0 and nx < n and ny >= 0 and ny < m :
            if temp[nx][ny] == 0 :
                # 해당 위치에 바이러스 배치하고, 다시 재귀적으로 수행
                temp[nx][ny] = 2
                virus(nx, ny)

# 현재 맵에서 안전 영역의 크기 계산하는 메서드
def get_score() :
    score = 0
    for i in range(n) :
        for j in range(m) :
            if temp[i][j] == 0 : 
                score += 1
    return score

# 깊이 우선 탐색(DFS)을 이용해 울타리를 설치하면서, 매번 안전 영역의 크기 계산
def dfs(count) :
    global result
    # 울타리가 3개 설치된 경우
    if count == 3 :
        for i in range(n) :
            for j in range(m) :
                temp[i][j] = data[i][j]
        # 각 바이러스의 위치에서 전파 진행
        for i in range(n) :
            for j in range(m) :
                if temp[i][j] == 2 :
                    virus(i, j)
        # 안전 영역의 최댓값 계산
        result = max(result, get_score())
        return
    # 빈 공간에 울타리 설치
    for i in range(n) :
        for j in range(m) :
            if data[i][j] == 0 :
                data[i][j] = 1
                count += 1
                dfs(count)
                data[i][j] = 0
                count -= 1

dfs(0)
print(result)
        