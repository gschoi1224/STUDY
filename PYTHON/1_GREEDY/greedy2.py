# <큰 수의 법칙>

# 입력 조건
# - 첫째 줄에 N(2 <= N <= 1000),  M(1 <= M <= 10000), K(1 <= K <= 10000)의 자연수가 주어지며, 각 자연수는 공백으로 구분한다
# - 둘쨰 줄에 N개의 자연수가 주어진다. 각 자연수는 공백으로 구분한다. 단, 각각의 자연수는 1 이상 10000 이하의 수로 주어진다
# - 입력으로 주어지는 K는 항상 M 보다 작거나 같다
# 출력 조건
# -첫째 줄에 큰 수의 법칙에 따라 더해진 답을 출력한다
# 입력 예시
# - 5 8 3
# - 2 4 5 4 6
# 출력 예시
# - 46

N, M, K = map(int, input().split())
data = list(map(int, input().split()))
data.sort()

first = data[N - 1] # 가장 큰 수
second = data[N - 2] # 두 번째로 큰 수

result = 0

while True :
    for i in range(K) : # 가장 큰 수를 K번 더하기
        if M == 0 :     # m이 0이라면 반복문 탈출
            break
        result += first
        M -= 1          # 더할 때마다 1씩 빼기
    if (M == 0) :       # m이 0이라면 반복문 탈출
        break
    result += second    # 두 번째로 큰 수를 한 번 더하기
    M -= 1              # 더할 때마다 1씩 빼기

print(result)           # d최종 답안 출력


# 답변 2
n, m, k = map(int, input().split())
data = list(map(int, input().split()))

data.sort()
first = data[n - 1]
second = data[n - 2]

# 가장 큰 수가 더해지는 횟수 계산
count = int(m / (k + 1)) * k
count += m % (k + 1)

result = 0
result += (count) * first   # 가장 큰 수 더하기
result += (m - count) * second  # 두 번째로 큰 수 더하기

print(result) # 최종 답안 출력