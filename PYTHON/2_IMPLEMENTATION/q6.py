# 문제 : P.330
# 풀이 : P.526

def solution(n, build_frame):
    answer = []
    for x, y, a, b in build_frame :
        if a == 0 and b == 1: # 기둥 설치 : 기둥이면 바닥에 있거나 보의 한쪽 끝부분 위에 있거나 다른 기둥 위에 있는지 확인
            if y == 0 or answer.count([x,y-1,0]) > 0 or answer.count([x-1,y,1]) > 0 or answer.count([x,y,1]) > 0 :
                answer.append([x,y,a])
        elif a == 1 and b == 1: # 보 설치 : 한쪽 끝부분이 기둥 위에 있거나, 양쪽 끝부분이 다른 보와 동시에 연결되어 있어야 함
            if answer.count([x,y-1,0]) > 0 or answer.count([x+1,y-1,0]) > 0 or (answer.count([x-1,y,1]) > 0 and answer.count([x+1,y,1]) > 0):
                answer.append([x,y,a])
        elif a == 0 and b == 0 : # 기둥 삭제 위에 보나 기둥이 있는 경우 삭제안됨 보가 있을 때는 그 보의 양쪽이 연결되어 있거나 아래에 기둥이 있는지
            possible = True
            if [x,y+1,0] in answer : # 위에 기둥이 있으면 안 됨
                possible = False
            if [x-1,y+1,1] in answer and ([x-2,y,0] not in answer and ([x-2,y+1,1] not in answer or [x,y+1,1] not in answer)) : # 왼쪽 위에 보 있음
                possible = False
            if [x,y+1,1] in answer and ([x+1,y+1,0] not in answer and ([x-1,y+1,1] not in answer or [x+1,y+1,1] not in answer)) : #오른쪽 위에 보 있음
                possible = False
            if possible:answer.remove([x,y,a])
        elif a == 1 and b == 0 : # 보 삭제 : 위에 기둥이 있거나, 양 옆에 보가 있으면 안 됨
            possible = True
            if [x,y+1,0] in answer or [x-1,y+1,0] : # 위에 기둥 있으면 무조건 안됨
                possible = False
            if [x-1,y,1] in answer and ([x-1,y-1,0] not in answer and [x-2,y-1,0] not in answer) : # 왼쪽에 연결된 보가 있는 경우
                possible = False
            if [x+1,y,1] in answer and ([x,y-1,0] not in answer and [x+2,y-1,0] not in answer) : # 오른쪽에 연결된 보가 있는 경우
                possible = False
            if possible:answer.remove([x,y,a])
    # 정렬
    answer.sort(key=lambda x : (x[0], x[1], x[2])) 
    return answer
# print(solution(5, [[1,0,0,1],[1,1,1,1],[2,1,0,1],[2,2,1,1],[5,0,0,1],[5,1,0,1],[4,2,1,1],[3,2,1,1]])) 
# [[1,0,0],[1,1,1],[2,1,0],[2,2,1],[3,2,1],[4,2,1],[5,0,0],[5,1,0]]
print(solution(5, [[0,0,0,1],[2,0,0,1],[4,0,0,1],[0,1,1,1],[1,1,1,1],[2,1,1,1],[3,1,1,1],[2,0,0,0],[1,1,1,0],[2,2,0,1]]))
# [[0,0,0],[0,1,1],[1,1,1],[2,1,1],[3,1,1],[4,0,0]]


# 답안 예시
def possible(answer) :
    for x, y, stuff in answer :
        if stuff == 0 : # 설치된 것이 '기둥'인 경우
            # '바닥 위' 혹은 '보의 한쪽 끝 부분 위' 혹은 '다른 기둥 위'라면 정상
            if y == 0 or [x - 1, y, 1] in answer or [x, y, 1] in answer or [x, y - 1, 0] in answer :
                continue
            return False # 아니라면 거짓 반환
        elif stuff == 1 : # 설치된 것이 '보'인 경우
            # 한쪽 끝부분이 기둥 위 혹은 양족 끝부분이 다른 보와 동시에 연결 이라면 정상
            if [x, y - 1, 0] in answer or [x + 1, y - 1, 0] in answer or ([x - 1, y, 1] in answer and [x + 1, y, 1] in answer) :
                continue
            return False
    return True

def solution2(n, build_frame) :
    answer = []
    for frame in build_frame: # 작업(frame)의 개수는 최대 1,000개
        x,y,stuff,operate = frame
        if operate == 0 :
            answer.remove([x, y, stuff]) # 일단 삭제를 해본 뒤에
            if not possible(answer) : #가능한 구조물인지 확인
                answer.append([x,y,stuff])
        if operate == 1 : # 설치하는 경우
            answer.append([x, y, stuff]) # 일단 설치를 해본 뒤에
            if not possible(answer) :
                answer.remove([x,y,stuff])
    return sorted(answer)