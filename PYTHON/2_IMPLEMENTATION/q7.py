# 문제 : P.333
# 풀이 : P.528

from itertools import combinations

n, m = map(int, input().split())
data = []
for _ in range(n) :
    data.append(list(map(int, input().split())))

house = []
chicken = []
INF = int(1e9)

for i in range(n) :
    for j in range(n) :
        if data[i][j] == 1 :
            house.append((i,j))
        elif data[i][j] == 2 :
            chicken.append((i,j))

result = list(combinations(chicken, m))
print(result)
answer = []
for r in result :
    total = 0
    for h in range(len(house)) :
        min_val = INF
        for c in r :
            cx, cy = c
            hx, hy = house[h]
            d = abs(cx-hx) + abs(cy-hy)
            min_val = min(min_val, d)
        total += min_val
    answer.append(total)
    print(r, total)

print(min(answer))

# 답
# 기존에 존재하는 치킨집을 줄여서 최대 M개로 유지하면서, 일반 집들로부터 M개의 치킨집까지의 거리를 줄이는 것이 목표
# 치킨집 중에서 M개를 고르는 모든 경우에 대하여 치킨 거리의 합을 계산하기!

from itertools import combinations

n, m = map(int, input().split())
chicken, house = [], []

for r in range(n) :
    data = list(map(int,input().split()))
    for c in range(n) :
        if data[c] == 1 :
            house.append((r, c)) # 일반 집
        elif data[c] == 2 :
            chicken.append((r, c)) # 치킨집

# 모든 치킨집 중에서 m개의 치킨집을 뽑는 조합 계산
candidates = list(combinations(chicken, m))

# 치킨 거리의 합을 계산하는 함수
def get_sum(candidate) : 
    result = 0
    # 모든 집에 대하여
    for hx, hy in house :
        # 가장 가까운 치킨집을 찾기
        temp = 1e9
        for cx, cy in candidate : 
            temp = min(temp, abs(hx - cx) + abs(hy - cy))
        
        # 가장 가까운 치킨집까지의 거리를 더하기
        result += temp
    # 치킨 거리의 합 반환
    return result

# 치킨 거리의 합의 최소를 찾아 출력
result = 1e9
for candidate in candidates :
    result = min(result, get_sum(candidate))

print(result)