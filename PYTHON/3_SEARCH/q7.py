# 문제 : P.354
# 풀이 : P.543

import sys
input = sys.stdin.readline

n, l, r = map(int, input().split())
data = []
for _ in range(n) :
    data.append(list(map(int, input().split())))

result = 0
visited = [[0] * n for _ in range(n)]
def unionCheck(x, y, direction, num) :
    if direction == 0 : # 왼쪽 탐색
        while y > 0 :
            if l <= abs(data[x][y] - data[x][y-1]) <= r and visited[x][y-1] != 0:
                y -= 1
                visited[x][y] = num
            else :
                return False
    elif direction == 1 : # 오른쪽 탐색
        while y < n - 1 :
            if l <= abs(data[x][y] - data[x][y+1]) <= r and visited[x][y-1] != 0:
                y += 1
                visited[x][y] = num
            else :
                return False
    elif direction == 2 : # 위쪽 탐색
        while x > 0 :
            if l <= abs(data[x][y] - data[x-1][y]) <= r and visited[x-1][y] != 0:
                x -= 1
                visited[x][y] = num
            else :
                return False
    elif direction == 3 : # 아래쪽 탐색
        while x < n - 1 :
            if l <= abs(data[x][y] - data[x+1][y]) <= r and visited[x+1][y] != 0 :
                x += 1
                visited[x][y] = num
            else :
                return False

while True :
    visited