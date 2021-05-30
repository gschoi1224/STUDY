# 문제 : P.356
# 풀이 : P.546

from collections import deque

answer = int(1e9)
visited = []

def solution(board) :
    global answer
    global visited
    n = len(board)
    visited = [[0] * n for _ in range(n)]
    d = 'h'
    positions = [(0, 0), (0, 1)]
    move(positions, board, d, 0)
    return answer

def move(positions, board, d, cnt) :
    a, b = positions
    print(a, b, d, cnt, visited)
    ax, ay = a
    bx, by = b
    visited[ax][ay] += 1
    visited[bx][by] += 1
    global answer
    n = len(board)
    if (ax == n - 1 and ay == n - 1) or (bx == n - 1 and by == n - 1) :
        answer = min(answer, cnt)
        return True
    dx = [-1, 0, 1, 0]
    dy = [0, -1, 0, 1]
    for i in range(4) :
        anx = ax + dx[i]
        bnx = bx + dx[i]
        any = ay + dy[i]
        bny = by + dy[i]
        if anx > -1 and anx < n and bnx > -1 and bnx < n and board[anx][any] == 0 and board[bnx][bny] == 0 and visited[anx][any] < 2 and visited[bnx][bny] < 2 :
            cnt += 1
            move([(anx, any), (bnx, bny)], board, d, cnt)
    if d == 'h' : # 가로 상태일 때
        # a를 축으로 회전
        # 위로 회전
        if bx - 1 > -1 and board[bx - 1][by] == 0 and by - 1 > -1 and board[bx - 1][by - 1] == 0 and visited[bx - 1][by - 1] < 2 :
            cnt += 1
            move([(bx - 1, by - 1), (ax, ay)], board, 'v', cnt)
        # 아래로 회전
        if bx + 1 < n and board[bx + 1][by] == 0 and by - 1 > -1 and board[bx + 1][by - 1] == 0 and visited[bx - 1][by - 1] < 2 :
            cnt += 1
            move([(ax, ay), (bx + 1, by - 1)], board, 'v', cnt)
        # b를 축으로 회전
        # 위로 회전
        if ax - 1 > -1 and board[ax - 1][ay] == 0 and ay + 1 < n and board[ax - 1][ay + 1] == 0 and visited[ax - 1][ay + 1] < 2 :
            cnt += 1
            move([(ax - 1, ay + 1), (bx, by)], board, 'v', cnt)
        if ax + 1 < n and board[ax + 1][ay] == 0 and ay + 1 < n and board[ax + 1][ay + 1] == 0 and visited[ax + 1][ay + 1] < 2 :
            cnt += 1
            move([(bx, by), (ax + 1, ay + 1)], board, 'v', cnt)
    if d == 'v' : # 세로 모드
        # a를 축으로 회전
        # 오른쪽으로 회전
        if by + 1 < n and board[bx][by + 1] == 0 and bx - 1 > -1 and board[bx - 1][by + 1] == 0 and visited[bx - 1][by + 1] < 2:
            cnt += 1
            move([(ax, ay), (bx - 1, by + 1)], board, 'v', cnt)
        # 왼쪽으로 회전
        if by - 1 > -1 and board[bx][by - 1] == 0 and bx - 1 > -1 and board[bx -1][by - 1] == 0 and visited[bx -1][by - 1] < 2 :
            cnt += 1
            move([(bx - 1, by - 1), (ax, ay)], board, 'v', cnt)
        # b를 축으로 회전
        # 오른쪽으로 회전
        if ay + 1 < n and board[ax][ay + 1] == 0 and ax + 1 < n and board[ax + 1][ay + 1] == 0 and visited[ax + 1][ay + 1] < 2 :
            cnt += 1
            move([(bx, by), (ax + 1, ay + 1)], board, 'v', cnt)
        if ay - 1 > -1 and board[ax][ay - 1] == 0 and ax + 1 < n and board[ax + 1][ay - 1] == 0 and visited[ax + 1][ay - 1] < 2 :
            cnt += 1
            move([(ax + 1, ay - 1), (bx, by)], board, 'v', cnt)
        


print(solution([[0, 0, 0, 1, 1], [0, 0, 0, 1, 0], [0, 1, 0, 1, 1], [1, 1, 0, 0, 1], [0, 0, 0, 0, 0]])) # 7