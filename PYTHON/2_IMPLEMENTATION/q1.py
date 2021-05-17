# 문제 : P.322
# 풀이 : P.516

n = list(map(int, input()))
before = 0
after = 0
for i in range(len(n)) :
    if i >= len(n) // 2 :
        after += n[i]
    else :
        before += n[i]

if after == before :
    print('LUCKY')
else :
    print('READY')


# 답
n = input()
length = len(n) # 정수값의 총 자릿수
summary = 0

# 왼쪽 부분의 자릿수의 합 더하기
for i in range(length // 2) :
    summary += int(n[i])
# 오른쪽 부분의 자릿수의 합 빼기
for i in range(length // 2, length) :
    summary -= int(n[i])

# 왼쪽 부분과 오른쪽 부분의 자릿수의 합이 동일한지 검사
if summary == 0 :
    print("LUCKY")
else :
    print("READY")