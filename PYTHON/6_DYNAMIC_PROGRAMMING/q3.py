# 문제 : P.378
# 풀이 : P.568

# 풀이
# 뒤에서부터 풀어야 함
# 현재 상담 일자의 이윤(p[i]) + 현재 상담을 마친 일자부터의 최대 이윤(dp[t[i] + i])을 계산하면 됨
# 점화식 : dp[i] = max(p[i] + dp[t[i] + i], max_value)

n = int(input()) # 전체 상담 개수
t = [] # 각 상담을 완료하는 데 걸리는 시간
p = [] # 각 상담을 완료했을 때 받을 수 있는 금액
dp = [0] * (n + 1) # 다이나믹 프로그래밍을 위한 1차원 dp 테이블 초기화
max_value = 0

for _ in range(n) :
    x, y = map(int, input().split())
    t.append(x)
    p.append(y)

# 리스트를 뒤에서부터 거꾸로 확인
for i in range(n - 1, -1, -1) :
    time = t[i] + i
    print(time)
    # 상담이 기간 안에 끝나는 경우
    if time <= n :
        # 점화식에 맞게, 현재까지의 최고 이익 계산
        dp[i] = max(p[i] + dp[time], max_value)
        max_value = dp[i]
    # 상담이 기간을 벗어나는 경우
    else :
        dp[i] = max_value
print(dp)
print(max_value)