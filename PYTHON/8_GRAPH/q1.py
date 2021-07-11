# 문제 : P.394
# 풀이 : P.582

def find(parent, x) :
    if parent[x] != x :
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, a, b) :
    a = parent[a]
    b = parent[b]
    if a < b :
        parent[b] = a
    else :
        parent[a] = b

n, m = list(map(int, input().split()))
parent = [i for i in range(n + 1)]

for a in range(n) :
    data = list(map(int, input().split()))
    for b in range(len(data)) :
        if data[b] == 1 :
            union(parent, a + 1, b + 1)

route = list(map(int, input().split()))

msg = 'YES'
for i in range(1, m) :
    if parent[route[i] + 1] != parent[route[i - 1] + 1] :
        msg = 'NO'
print(msg)

## 해설
# 여행계획에 해당하는 모든 노드가 같은 집합에 속하기만 하면 가능한 여행 경로임
# 서로소 집합 자료구조를 이용하여 문제를 해결