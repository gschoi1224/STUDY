# 문제 : P.352
# 풀이 : P.540
from itertools import combinations
import copy 

# n = int(input())
n = 4
data = []
teachers = []
positions = []

for x in range(n) :
    # d = list(input().split())
    d = list([4,4,4,4])
    for y in range(n) :
        if d[y] == 'T' : teachers.append((x, y))
        positions.append((x, y))
    data.append(d)

positions = list(combinations(positions, 3))

dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]
def search(graph, x, y) :
    if x >= 0 and y >= 0 and x < n and y < n and graph[x][y] != 'O' and graph[x][y] != 'T' :
        if graph[x][y] == 'S' :
            return False
        graph[x][y] = 'T'
        if not search(graph, x-1,y) or not search(graph, x+1,y) or not search(graph, x, y-1) or search(graph, x, y+1) :
            return False
    return True


result = 'NO'
for p in positions :
    graph = copy.deepcopy(data)
    a, b, c = p
    if graph[a[0]][a[1]] != 'X' or graph[b[0]][b[1]] != 'X' or graph[c[0]][c[1]] != 'X' :
        continue
    for x,y in p :
        graph[x][y] = 'O'
    
    ok_count = 0
    for x, y in teachers :
        if not search(graph, x-1,y) or not search(graph, x+1,y) or not search(graph, x, y-1) or search(graph, x, y+1) :
            break
        else :
            ok_count += 1
        if ok_count == len(teachers) :
            result = 'YES'
            break
    if a == (0,3) and b == (1,1) and c == (2,2) :
        break
        


print(result)


# 풀이
# 장애물을 정확히 3개 설치하는 모든 경우를 확인하여 매 경우마다 모든 학생을 감시로부터 피하도록 할 수 있는지 여부 출력

# 답안 예시
from itertools import combinations

n = int(input()) # 복도의 크기
board = [] # 복도 정보(N X N)
teachers = [] # 모든 선생님 정보
spaces = [] # 모든 빈 공간 위치 정보

for i in range(n) :
    board.append(list(input().split()))
    for j in range(n) :
        # 선생님이 존재하는 위치 저장
        if board[i][j] == 'T' : teachers.append((i, j))
        # 장애물을 설치할 수 있는 빈 공간 위치 저장
        if board[i][j] == 'X' : spaces.append((i, j))

# 특정 방향으로 감시를 진행(학생 발견 : True, 학생 미발견 : False)
def watch (x, y, direction) :
    # 왼쪽 방향으로 감시
    if direction == 0 : 
        while y >= 0 :
            if board[x][y] == 'S' : # 학생이 있는 경우
                return True
            if board[x][y] == 'O' : # 장애물이 있는 경우
                return False
            y -= 1
        return False
    # 오른쪽 방향으로 감시
    if direction == 1 :
        while y < n :
            if board[x][y] == 'S' : # 학생이 있는 경우
                return True
            if board[x][y] == 'O' : 
                return False
            y += 1
        return False
    if direction == 2 :
        while x >= 0 :
            if board[x][y] == 'S' :
                return True
            if board[x][y] == 'O' : 
                return False
            x -= 1
        return False
    if direction == 3 :
        while x < n :
            if board[x][y] == 'S' :
                return True
            if board[x][y] == 'O' :
                return False
            x += 1
        return False
# 장애물을 설치 이후에, 한 명이라도 학생이 감지되는지 검사
def process() :
    # 모든 선생님의 위치를 하나씩 확인
    for x, y in teachers :
        # 4가지 방향으로 학생을 감지할 수 있는지 확인
        for i in range(4) :
            if watch(x,y,i) :
                return True
    return False

find = False # 학생이 한 명도 감지되지 않도록 설치할 수 있는지의 여부

# 빈 공간에서 3개를 뽑는 모든 조합을 확인
for data in list(combinations(spaces, 3)) :
    # 장애물 설치해보기
    for x, y in data :
        board[x][y] = 'O'
    # 학생이 한 명도 감지되지 않는 경우
    result = process()
    if not result :
        # 원하는 경우를 발견한 것임
        find = True
        break
    # 설치된 장애물을 다시 없애기
    for x, y in data :
        board[x][y] = 'X'
    if data[0] == (0,3) and data[1] == (1,1) and data[2] == (2,2) :
        break

if find :
    print('YES')
else :
    print('NO')
