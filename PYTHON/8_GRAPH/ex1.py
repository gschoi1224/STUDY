# <팀 결성>

# 학교에서 학생들에게 0번부터 N번까지의 번호를 부여했다. 처음에는 모든 학생이 서로 다른 팀으로 구분되어, 총 N + 1개의 팀이 존재한다.
# 이때 선생님은 "팁 합치기" 연산과 "같은 팀 여부 확인" 연산을 사용할 수 있다.
# 1. "팀 합치기" 연산은 두 팀을 합치는 연산이다.
# 2. "같은 팀 여부 확인" 연산은 특정한 두 학생이 같은 팀에 속하는지를 확인하는 연산이다.
# 선생님이 M개의 연산을 수행할 수 있을 때, "같은 팀 여부 확인" 연산에 대한 연산 결과를 출력하는 프로그램을 작성하시오.
# 입력 조건
# - 첫째 줄에 N, M이 주어진다. M은 입력으로 주어지는 연산의 개수이다. (1 <= N, M <= 100,000)
# - 다음 M개의 줄에는 각각의 연산이 주어진다.
# - "팀 합치기" 연산은 0 a b 형태로 주어진다. 이는 a번 학생이 속한 팀과 b번 학생이 속한 팀을 합치낟는 의미이다.
# - "같은 팀 여부 확인" 연산은 1 a b 형태로 주어진다. 이는 a번 학생이 b번 학생과 같은 팀에 속해 있는지를 확인하는 연산이다.
# - a와 b는 N 이하의 양의 정수이다.
# 출력 조건
# - "같은 팀 여부 확인" 연산에 대하여 한 줄에 하나씩 YES 혹은 NO로 결과를 출력한다.

# 내 답안
n, m = map(int, input().split())
parent = [i for i in range(n + 1)]

def find_parent(parent, x) :
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

array = []
for i in range(m) :
    array.append(list(map(int, input().split())))

for i in array :
    fx, a, b = i[0], i[1], i[2]
    if fx == 0 :
        union_parent(parent, a, b)
    elif fx == 1 :
        a = find_parent(parent, a)
        b = find_parent(parent, b)
        if a == b :
            print("YES")
        else :
            print("NO")
        

# 문제 해설
# 전형적인 서로소 집합 알고리즘 문제로 N과 M의 범위가 모두 최대 100,000이다. 
# 따라서 경로 압축 방식의 서로소 집합 자로구조를 이용하여 시간복잡도를 개선해야 한다. 

# 답안 예시
# 특정 원소가 속한 집합을 찾기
def find_parent(parent, x) :
    # 루트 노드가 아니라면, 루트 노드를 찾을 때까지 재귀적으로 호출
    if parent[x] != x :
        parent[x] = find_parent(parent, parent[x])
    return parent[x]

# 두 원소가 속한 집합 합치기
def union_parent(parent, a, b) :
    a = find_parent(parent, a)
    b = find_parent(parent, b)
    if a < b :
        parent[b] = a
    else :
        parent[a] = b

n, m = map(int, input().split())
parent = [0] * (n + 1) # 부모 테이블 초기화

# 부모 테이블상에서, 부모를 자기 자신으로 초기화
for i in range(0, n + 1) :
    parent[i] = i

# 각 연산을 하나씩 확인
for i in range(m) :
    oper, a, b = map(int, input().split())
    # 합집합(union) 연산인 경우
    if oper == 0 :
        union_parent(parent, a, b)
    # 찾기(find) 연산인 경우
    elif oper == 1 :
        if find_parent(parent, a) == find_parent(parent, b) :
            print("YES") 
        else :
            print("NO")