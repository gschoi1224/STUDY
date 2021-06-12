# 문제 : P.377
# 풀이 : P.567

import sys
input = sys.stdin.readline
n = int(input())
data = []
dp = [[] for _ in range(n)]
for i in range(n) :
    data.append(list(map(int, input().split())))

dp[0].append(data[0][0])
for i in range(1, n) :
    for j in range(len(data[i])) :
        a, b = 0, 0
        if j > 0 : 
            above = dp[i - 1][j - 1]
            a = data[i][j] + above
        if j < i : 
            above = dp[i - 1][j]
            b = data[i][j] + above
        dp[i].append(max(a, b))

print(max(dp[n - 1]))

# 해설
# 왼쪽 위 혹은 바로 위에서만 내려올 수 있음
# 점화식 : dp[i][j] = array[i][j] + max(dp[i-1][j-1], dp[i-1][j])

# 답안 예시
n = int(input())
dp = []

for _ in range(n) :
    dp.append(list(map(int, input().split())))

for i in range(1, n) :
    for j in range(1 + n) :
        # 왼쪽 위에서 내려오는 경우
        if j == 0 :
            up_left = 0
        else :
            up_left = dp[i-1][j-1]
        # 바로 위에서 내려오는 경우
        if j == i :
            up = 0
        else :
            up = dp[i-1][j]
        # 최대 합을 저장
        dp[i][j] = dp[i][j] + max(up_left, up)

print(max(dp[n-1]))