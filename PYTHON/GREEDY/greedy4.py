# 입력 조건
# - 첫째 줄에 N(2 <= N <= 100,000)과 K(2 <= K <= 100,000)가 공백으로 구분되며 각각 자연수로 주어진다.
# - 이 때 입력으로 주어지는 N은 항상 K보다 크거나 같다.
# 출력 조건
# - 첫째 줄에 N이 1이 될 때까지 1번 혹은 2번의 과정을 수행하는 횟수의 최솟값을 출력한다.
# 입력 예시
# 25 5
# 출력 예시
# 2

# 내 답변
n, k = map(int, input().split())
result = 0
while True :
    if n == 1 :
        break
    elif n % k == 0 :
        n = n // k
    else :
        n -= 1
    result += 1

print(result)