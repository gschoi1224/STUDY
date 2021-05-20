# 문제 : P.328
# 풀이 : P.522

n = int(input())
k = int(input())

dummy = [[0] * (n + 1) for _ in range(n + 1)]

for _ in range(k) :
    x, y = map(int, input().split())
    dummy[x][y] = 1

l = int(input())

rotate = []

for _ in range(l) :
    t, d = input().split()
    rotate.append((int(t), d)) # L : 왼쪽, D : 오른쪽 회전

def rotation(now, d) :
    return (now + d) % 4

def solution() :

    time = 0
    x, y = 1, 1
    dy = [1, 0, -1, 0]
    dx = [0, 1, 0, -1]
    d = 0
    r = 0
    body = [(x, y)]

    while True :
        time += 1

        nx = x + dx[d]
        ny = y + dy[d]
        if nx < 1 or nx > n or ny < 1 or ny > n or dummy[nx][ny] == 2:
            break
        if dummy[nx][ny] == 1 :
            dummy[nx][ny] = 2
            body.append((nx, ny))
        else :
            dummy[nx][ny] = 2
            body.append((nx, ny))
            px, py = body.pop(0)
            dummy[px][py] = 0
        x, y = nx, ny
        if r < len(rotate) and rotate[r][0] == time :
            if rotate[r][1] == 'D' :
                d = rotation(d, 1)
            elif rotate[r][1] == 'L' :
                d = rotation(d, -1)
            r += 1
    return time
print(solution())



