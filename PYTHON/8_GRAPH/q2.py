# 문제 : P.396
# 풀이 : P.584

# 풀이
# 서로소 알고리즘 사용
# 가장 높은 번호의 탑승구에 도킹한다고 가정하고 도킹할때마다 합집합함

def find_parent(parent,x) :
    if parent[x] != x :
        parent[x] = find_parent(parent, parent[x])
    return parent[x]

def union_parent(parent, a, b) :
    a = find_parent(parent, a)
    b = find_parent(parent, b)
    if a > b :
        parent[a] = b
    else :
        parent[b] = a

g = int(input()) # 탑승구의 수
p = int(input()) # 비행기의 수

parent = [i for i in range(g + 2)] # 부모 테이블 초기화
# 부모 테이블상에서, 부모를 자기 자신으로 초기화

result = 0
for _ in range(p) :
    data = find_parent(parent, int(input()))    # 현재 비행기 탑승구의 루트 확인
    if data == 0 : # 현재 루트가 0이라면, 종료
        break
    union_parent(parent, data, data - 1)    # 그렇지 않다면 바로 왼쪽의 집합과 합치기
    result += 1

print(result)

