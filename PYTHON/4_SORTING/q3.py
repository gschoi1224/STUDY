# 문제 : P.362
# 풀이 : P.553

def solution(n, stages) :
    stages.sort()
    answer = [0] * n
    for i in stages :
        if i > n : i = n
        for j in range(i) :
            answer[j] += 1
    for i in range(len(answer)) :
        answer[i] = (stages.count(i + 1) / answer[i], i + 1)
    answer.sort(key=lambda x:(-x[0], x[1]))
    for t in range(len(answer)) :
        answer[t] = answer[t][1]
    return answer

print(solution(5,[2,1,2,6,2,4,3,3])) # [3,4,2,1,5]
print(solution(4,[4,4,4,4,4])) # [4,1,2,3]

# 모범답안
def solution(N, stages) :
    answer = []
    length = len(stages)

    # 스테이지 번호를 1부터 N까지 증가시키며
    for i in range(1, N + 1) :
        # 해당 스테이지에 머물러 있는 사람의 수 계산
        count = stages.count(i)

        # 실패율 계싼
        if length == 0 :
            fail = 0
        else :
            fail = count / length
        
        # 리스트에 (스테이지 번호, 실패율) 원소 삽입
        answer.append((i, fail))
        length -= count
    
    # 실패율을 기준으로 각 스테이지를 내림차순으로 정렬
    answer = sorted(answer, key=lambda t : t[1], reverse=True)

    # 정렬된 스테이지 번호 출력
    answer = [i[0] for i in answer]
    return answer