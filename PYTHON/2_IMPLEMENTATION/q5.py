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

time = 0
apple = 0
x, y = 0, 0
dy = [1, 0, -1, 0]
dx = [0, 1, 0, -1]
d = 0
r = 0
body = []

def rotation(now, d) :
    if now + d > 3 :
        now = 0
    elif now + d < 0 :
        now = 3
    else :
        now += d
    return now

while True :
    time += 1
    if r < len(rotate) and rotate[r][0] == time :
        if rotate[r][1] == 'D' :
            d = rotation(d, 1)
        elif rotate[r][1] == 'L' :
            d = rotation(d, -1)
        print(rotate[r][1], 'rotate!')
        r += 1
    for i in range(len(body) - 1, -1, -1) :
        dummy[body[i][0]][body[i][1]] += 1
        if i == 0 :
            body[i] = (x, y)
        else :
            body[i] = (body[i - 1][0], body[i - 1][1])
        dummy[body[i][0]][body[i][1]] -= 1

    x += dx[d]
    y += dy[d]
    print(x, y)
    if x < 0 or x > n or y < 0 or y > n or apple == k or dummy[x][y] == -1:
        break
    if apple == k :
        break
    if dummy[x][y] == 1 :
        print('apple!')
        apple += 1
        body.append((x, y))
        dummy[x][y] = 0


print(time)