# 문제 : P.356
# 풀이 : P.546

from collections import deque

def solution(board) :
    answer = 0
    d = 'h'
    positions = [(1, 1), (1, 2)]
    move(positions, board, d, 0)
    return answer

def move(positions, board, d, cnt) :
    a, b = positions
    ax, ay = a
    bx, by = b
    if d == 'h' : # 가로 상태일 때
        # 아래로 이동
        anx = ax + 1
        bnx = bx + 1
        if (anx >= 0 and bnx >= 0 and anx < len(board) and bnx < len(board) and 0 == board[anx][ay] and 0 == board[bnx][by]) :
            cnt += 1
            move([(anx, ay), (bnx, by)], board, d, cnt)
        else : 
            return False
        
        


print(solution([[0, 0, 0, 1, 1], [0, 0, 0, 1, 0], [0, 1, 0, 1, 1], [1, 1, 0, 0, 1], [0, 0, 0, 0, 0]])) # 7