# 문제 : P.381
# 풀이 : P.569

# 가장 긴 증가하는 부분 수열(하나의 수열이 주어졌을 때 값들이 증가하는 형태의 가장 긴 부분을 찾는 수열)로 알려진 전형적인 다이나믹 프로그래밍 문제
# D[i] = array[i]를 마지막 원소로 가지는 부분 수열의 최대 길이라고 정의하면
# 모든 0 <= j < i에 대하여 D[i] = max(D[i], D[j] + 1) if array[j] < array[i]
n = int(input())
array = list(map(int, input().split()))
# 순서를 뒤집어 가장 긴 증가하는 부분 수열 문제로 변환
array.reverse()

# 다이나믹 프로그래밍을 위한 1차원 DP 테이블 초기화
dp = [1] * n

# 가장 긴 증가하는 부분 수열(LTS) 알고리즘 수행
for i in range(1, n) :
    for j in range(0, i) :
        if array[j] < array[i] :
            dp[i] = max(dp[i], dp[j] + 1)

# 열외시켜야 하는 병사의 최소 수를 출력
print(n - max(dp))
