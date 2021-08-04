import math
def solution(progresses, speeds) :
    answer = []
    day = 0
    cnt = 0
    for i in range(len(progresses)) :
        remain = 100 - progresses[i]
        days = math.ceil(remain / speeds[i])
        if cnt == 0 :
            cnt += 1
            day = days
        elif days <= day :
            cnt += 1
        elif days > day :
            answer.append(cnt)
            day = days
            cnt = 1
        if i == len(progresses) - 1 :
            answer.append(cnt)
    return answer


print(solution([93, 30, 55], [1, 30, 5]))  # [2, 1]
print(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])) # [1, 3, 2]