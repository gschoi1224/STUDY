# 그래프 알고리즘

## 서로소 집합

-   **서로소** : 공통 원소가 없는 두 집합
-   서로소 집합 자료구조란 **서로소 부분 집합들로 나누어진 원소들의 데이터를 처리하기 위한 자료구조**라고 할 수 있다.
-   union(2개의 원소가 포함된 집합을 하나씩 집합으로 합치는 연산), find(특정한 원소가 속한 집단이 어떤 집합인지 알려주는 연산)으로 조직할 수 있다.

### 서로소 집합 자료구조

-   트리 자료구조를 이용해 집합을 표현
    1. 합집합(union 연산)을 확인하여 서로 연결된 두 노드 A와 B를 확인한다.
    2. A와 B의 루트 노드 A', B'를 각각 찾는다.
    3. A'를 B'의 부모 노드로 설정한다.(B'가 A'를 가리키도록 한다)
    4. 모든 union 연산을 처리할 때까지 1번 위 과정을 반복한다.
-   union 연산을 통해 확인된 누 노드 중 더 번호가 작은 원소가 부모 노드가 되도록 구현하는 경우가 많다.
-   알고리즘의 동작 과정
    1. 노드의 개수(V) 크기의 부모 테이블을 초기화한다. 이때 모든 원소가 자기 자신을 부모로 가지도록 설정한다. 초기 단계에서는 총 V개의 트리가 존재하는 것과 같다. 우리가 실제로 루트를 확인하고자 할 때는 재귀적으로 부모를 거슬러 올라가서 최종적인 루트 노드를 찾아야 한다.
    2. 첫 번째 union 연산을 확인해서 나오는 A, B 중에 더 큰 원소의 부모를 더 작은 원소의 부모 노드로 설정한다.
    3. 루트 노드를 즉시 계산하지 않고 부모 테이블을 계속해서 확인하며 거슬러 올라가 최종 루트 노드를 찾아낸다.
-   기본적인 서로소 집합 일고리즘 소스코드

```py
# 특정 원소가 속한 집합을 찾기
def find_parent(parent, x) :
    # 루트 노드가 아니라면, 루트 노드를 찾을 때까지 재귀적으로 호출
    if parent[x] != x :
        return find_parent(parent, parent[x])
    return x

# 두 원소가 속한 집합을 합치기
def union_parent(parent, a, b) :
    a = find_parent(parent, a)
    b = find_parent(parent, b)
    if a < b :
        parent[b] = a
    else :
        parent[a] = b

# 노드의 개수와 간선(union 연산)의 개수 입력받기
v, e = map(int, input().split())
parent = [0] * (v + 1) # 부모 테이블 초기화

# 부모 테이블상에서, 부모를 자기 자신으로 초기화
for i in range(1, v + 1) :
    parent[i] = i

# union 연산을 각각 수행
for i in range(e) :
    a, b = map(int, input().split())
    union_parent(parent, a, b)

# 각 원소가 속한 집합 출력
print('각 원소가 속한 집합 : ', end=' ')
for i in range(1, v + 1) :
    print(find_parent(parent, i), end = ' ')

print()

# 부모 테이블 내용 출력
print('부모 테이블: ', end=' ')
for i in range(1, v + 1) :
    print(parent[i], end=' ')
```

-   경축 압축 기법(find 함수를 재귀적으로 호출한 뒤에 부모 테이블값을 갱신하는 기법)을 사용하면 시간 복잡도를 개선할 수 있다.

```py
def find_parent(parent, x) :
    if parent[x] != x :
        parent[x] = find_parent(parent, parent[x])
    return parent[x]
```

-   시간 복잡도 : 노드의 개수가 V개이고, 최대 V - 1개의 union 연산과 M개의 find 연산이 가능할 때 경로 압축 방법을 적용한 시간 복잡도는 O(V + M(1 + log(2-M/V)V))이다.

### 서로소 집합을 활용한 사이클 판별

-   무방향 그래프 내에서의 사이클을 판별할 때 사용할 수 있다.
    1. 각 간선을 확인하여 두 노드의 루트 노드를 확인한다.
    2. 루트 노드가 서로 다르다면 두 노드에 대하여 union 연산을 수행한다.
    3. 루트 노드가 서로 같다면 사이클이 발생한 것이다.
    4. 그래프에 포함되어 있는 모든 간선에 대하여 위 과정을 반복한다.
-   사이클 판별 소스코드

```py
cycle = False
for i in range(e) :
    a, b = map(int, input().split())
    # 사이클이 발생한 경우 종료
    if find_parent(parent, a) == find_parent(parent, b) :
        cycle = True
        break
    # 사이클이 발생하지 않았다면 합집합 수행
    else :
        union_parent(parent, a, b)
```

## 신장 트리

-   **하나의 그래프가 있을 때 모든 노드를 포함하면서 사이클이 존재하지 않는 부분 그래프**를 의미한다.
-   모든 노드가 포함되어 서로 연결되면서 사이클이 존재하지 않는다는 조건은 트리의 성립 조건이기도 하다.

### 크루스칼 알고리즘

-   대표적인 최소 비용으로 만들 수 있는 신장 트리를 찾는 알고리즘
-   그리디 알고리즘으로 분류
-   간선에 대하여 정렬을 수행한 뒤에 가장 거리가 짧은 간선부터 집합에 포함시키고, 사이클을 발생시킬 수 있는 간선의 경우 집합에 포함시키지 않는다.
-   구체적인 알고리즘
    1. 간선 데이터를 비용에 따라 오름차순으로 정렬한다.
    2. 간선을 하나씩 확인하며 현재의 간선이 사이클을 발생시키는지 확인한다.
    3. 사이클이 발생하지 않는 경우 최소 신장 트리에 포함시킨다.
    4. 사이클이 발생하는 경우 최소 신장 트리에 포함시키지 않는다.
    5. 모든 간선에 대하여 위 과정을 반복한다.
-   최소 신장 트리는 일종의 트리 자료구조이므로, 최종적으로 신장 트리에 포함되는 간선의 개수가 '노드의 개수 - 1'과 같다는 특징이 있다.
-   크루스칼 알고리즘의 핵심 원리는 가장 거리가 짧은 간선부터 사이클을 발생시키는 간선을 제외하고 차례대로 집합에 추가하면 된다.
-   크루스칼 알고리즘 소스 코드

```py
# 특정 원소가 속한 집합을 찾기
def find_parent(parent, x) :
    # 루트 노드가 아니라면, 루트 노드를 찾을 때까지 재귀적으로 호출
    if parent[x] != x :
        parent[x] = find_parent(parent, parent[x])
    return parent[x]

# 두 원소가 속한 집합을 합치기
def union_parent(parent, a, b) :
    a = find_parent(parent, a)
    b = find_parent(parent, b)
    if a < b :
        parent[b] = a
    else :
        parent[a] = b

# 노드의 개수와 간선(union 연산)의 개수 입력받기
v, e = map(int, input().split())
parent = [0] * (v + 1) # 부모 테이블 초기화

# 모든 간선을 담을 리스트와 최종 비용을 담을 변수
edges = []
result = 0

# 부모 테이블상에서, 부모를 자기 자신으로 초기화
for i in range(1, v + 1) :
    parent[i] = i

# 모든 간선에 대한 정보를 입력받기
for _ in range(e) :
    a, b, cost = map(int, input().split())
    # 비용순으로 정렬하기 위해서 튜플의 첫 번째 원소를 비용으로 설정
    edges.append((cost, a, b))

# 간선을 비용순으로 정렬
edges.sort()

# 간선을 하나씩 확인하며
for edge in edges :
    cost, a, b = edge
    # 사이클이 발생하지 않는 경우에만 집합에 포함
    if find_parent(parent, a) != find_parent(parent, b) :
        union_parent(parent, a, b)
        result += cost

print(result)
```

-   시간복잡도는 간선의 개수가 E개일 때, O(ElogE)이다.

### 위상 정렬

-   순서가 정해져 있는 일련의 작업을 차례대로 수행해야 할 때 사용할 수 있는 알고리즘
-   **방향 그래프의 모든 노드를 방향에 거스르지 않도록 순서대로 나열하는 것**
-   그래프상에서 선후관계가 있다면, 위상 정렬을 수행하여 모든 선후 관계를 지키는 전체 순서를 계산할 수 있다.
-   진입차수 : 특정한 노드로 들어오는 간선의 개수
-   위상 정렬 알고리즘
    1. 진입차수가 0인 노드를 큐에 넣는다.
    2. 큐가 빌 때까지 다음의 과정을 반복한다.
        1. 큐에서 원소를 꺼내 해당 노드에서 출발하는 간선을 그래프에서 제거한다.
        2. 새롭게 진입차수가 0이 된 노드를 큐에 넣는다.
-   위상 정렬 소스코드

```py
from collections import deque

# 노드의 개수와 간선의 개수를 입력받기
v, e = map(int, input().split())
# 모든 노드에 대한 진입차수는 0으로 초기화
indegree = [0] * (v + 1)
# 각 노드에 연결된 간선 정보를 담기 위한 연결 리스트(그래프) 초기화
graph = [[] for i in range(v + 1)]

# 방향 그래프의 모든 간선 정보를 입력받기
for _ in range(e) :
    a, b = map(int, input().split())
    graph[a].append(b) # 접점 A에서 B로 이동 가능
    # 진입 차수를 1 증가
    indegree[b] += 1

# 위상 정렬 함수
def topology_sort() :
    result = [] # 알고리즘 수행 결과를 담을 리스트
    q = deque() # 큐 기능을 위한 deque 라이브러리 사용

    # 처음 시작할 때는 진입차수가 0인 노드를 큐에 삽입
    for i in range(1, v + 1) :
        if indegree[i] == 0 :
            q.append(i)

    # 큐가 빌 때까지 반복
    while q :
        # 큐에서 원소 꺼내기
        now = q.popleft()
        result.append(now)
        # 해당 원소와 연결된 노드들의 진입차수에서 1 빼기
        for i in graph[now] :
            # 새롭게 진입차수가 0이 되는 노드를 큐에 삽입
            if indegree[i] == 0 :
                q.append(i)

    # 위상 정렬을 수행한 결과 출력
    for i in result :
        print(i, end=' ')

topology_sort()
```

-   노드와 간선을 모두 확인하기 때문에 위상 정렬의 시간 복잡도는 O(V + E)이다.
