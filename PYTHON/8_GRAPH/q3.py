# 문제 : P.398
# 풀이 : P.586
def find(parent, x) :
    if parent[x] != x :
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, a, b) :
    a = find(parent, a)
    b = find(parent, b)
    if a < b :
        parent[b] = a
    else :
        parent[a] = b

n, m = map(int, input().split()) # 집의 수, 도로의 수
parent = [i for i in range(n)]
result = 0
q = []
for i in range(m) :
    a, b, cost = map(int, input().split())
    q.append((cost, a, b))
    
q.sort()
total = 0
for cost, a, b in q :
    total += cost
    if find(parent, a) != find(parent, b) :
        union(parent, a, b)
        result += cost

print(total - result)

# 풀이
# 최소 신장 트리
# 크루스칼 알고리즘
# heapq 말고 그냥 sort 사용
