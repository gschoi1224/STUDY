# 문제 : P.324
# 풀이 : P.517

def solution(s):
    answer = len(s)
    for i in range(1, len(s)) : # N / 2 까지만 고려하고 나눌 수 없는 경우는 고려 안 해도 됨
        array = []
        index = 0
        while len(s) >= index :
            if s[index:index+i] != '' :
                array.append(s[index:index+i])
            index += i
        before = array[0]
        split = 1
        string = ''
        for k in range(1, len(array)) : 
            if before != array[k] :
                if split > 1 :
                    string += str(split)
                string += before
                before = array[k]
                split = 1
                if k == len(array) - 1 :
                    string += array[k]
            else :
                split += 1
                if k == len(array) - 1 :
                    string += str(split) + before
                
        answer = min(len(string), answer)

    print(answer)
    return answer

solution("aabbacc") # 7
solution("ababcdcdababcdcd") # 9
solution("abcabcdede") # 8
solution("abcabcabcabcdededededede") # 14
solution("xababcdcdababcdcd") # 17
solution("a") # 1

# 답
def solutions(s) :
    answer = len(s)
    # 1개 단위(step)부터 압축 단위를 늘려가며 확인
    for step in range(1, len(s) // 2 + 1) :
        compressed = ""
        prev = s[0:step] # 앞에서부터 step만큼의 문자열 추출
        count = 1
        # 단위(step) 크기만큼 증가시키며 이전 문자열과 비교
        for j in range(step, len(s), step) :
            # 이전 상태와 동일하다면 압축 횟수(count) 증가
            if prev == s[j : j + step] :
                count += 1
            # 다른 문자열이 나왔다면(더 이상 압축하지 못하는 경우라면)
            else :
                compressed += str(count) + prev if count >= 2 else prev 
                prev = s[j:j + step] # 다시 상태 초기화
                count = 1
        # 남아 있는 문자열에 대해서 처리
        compressed += str(count) + prev if count >= 2 else prev
        # 만들어지는 압축 문자열이 짧은 것이 정답
        answer = min(answer, len(compressed))
    return answer
