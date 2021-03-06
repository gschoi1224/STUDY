# 이진 탐색 알고리즘

## 순차 탐색

- 리스트 안에 있는 특정한 데이터를 찾기 위해 앞에서부터 데이터를 하나씩 차례대로 확인하는 방법
- 보통 정렬되지 않은 리스트에서 데이터를 찾아야 할 때 사용
- 리스트 내에 데이터가 아무리 많아도 시간만 충분하다면 항상 원하는 원소(데이터)를 찾을 수 있다는 장점이 있다
- 원소의 개수를 세는 **count()**메서드를 이용할 때도 내부에서는 순차 탐색이 수행된다.

```py
# 순차 탐색 소스코드 구현
def sequential_search(n, target,array) :
    # 각 원소를 하나씩 확인하며
    for i in range(n) :
        # 현재의 원소가 찾고자 하는 원소와 동일한 경우
        if array[i] == target :
            return i + 1 # 현재의 위치 반환(인덱스는 0부터 시작하므로 1 더하기)

print('생성할 원소 개수를 입력한 다음 한 칸 띄고 찾을 문자열을 입력하세요.')
input_data = input().split()
n = int(input_data[0]) # 원소의 개수
target = input_data[1]  # 찾고자 하는 문자열

print('앞서 적은 원소 개수만큼 문자열을 입력하세요. 구분은 띄어쓰기 한 칸으로 합니다.')
array = input().split()

# 순차 탐색 수행 결과 출력
print(sequential_search(n, target,array))
```

- 최악의 경우 시간 복잡도는 O(N)이다.

## 이진탐색 : 반으로 쪼개면서 탐색하기

- 위치를 나타내는 변수 3개를 사용하는데 탐색하고자 하는 범위의 시작점, 끝점, 그리고 중간점이다.
- **찾으려는 데이터와 중간점 위치에 있는 데이터를 반복적으로 비교**해서 원하는 데이터를 찾는 게 이진 탐색 과정이다.
  1. 시작점과 끝점을 확인한 다음 둘 사이에 중간점을 정한다. 중간점이 실수일 때는 소수점 이하를 버린다.
  2. 중간점의 데이터와 찾으려는 데이터를 비교한다.
  3. 중간점의 데이터가 찾으려는 데이터보다 크면 끝점을 중간점 - 1로 바꾸고 작으면 시작점을 중간점 + 1로 바꾼다
  4. 이 과정을 반복하다보면 중간점의 데이터가 찾으려는 데이터와 일치하게 된다.
- 이진 탐색은 한 번 확인할 때마다 확인하는 원소의 개수가 절반씩 줄어든다는 점에서 시간 복잡도가 O(logN)이다.
- 재귀 함수로 구현한 이진 탐색 소스코드

```py
def binary_search(array, target, start, end) :
    if start > end :
        return None
    mid = (start + end) // 2
    # 찾은 경우 중간점 인덱스 반환
    if array[mid] == target :
        return mid
    # 중간점의 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
    elif array[mid] > target :
        return binary_search(array, target, start, mid - 1)
    # 중간점의 값보다 찾고자 하는 값이 큰 경우 오른쪽 확인
    else :
        return binary_search(array, target, mid + 1, end)

# n(원소의 개수)과 target(찾고자 하는 문자열)을 입력받기
n, target = list(map(int, input().split()))
# 전체 원소 입력받기
array = list(map(int, input().split()))

# 이진 탐색 수행 결과 출력
result = binary_search(array, target, 0, n - 1)
if result == None :
    print('원소가 존재하지 않습니다.')
else :
    print(result + 1) # 몇 번째 자리에 있는지
```

- 반복문으로 구현한 이진 탐색 소스코드

```py
def binary_search(array, target, start, end) :
    while start <= end :
        mid = (start + end) // 2
        # 찾은 경우 중간점 인덱스 반환
        if array[mid] == target :
            return mid
        # 중간점의 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
        elif array[mid] > target :
            end = mid - 1
        # 중간점의 값보다 찾고자 하는 값이 큰 경우 오른쪽 확인
        else :
            start = mid + 1
    return None
# n(원소의 개수)과 target(찾고자 하는 문자열)을 입력받기
n, target = list(map(int, input().split()))
# 전체 원소 입력받기
array = list(map(int, input().split()))

# 이진 탐색 수행 결과 출력
result = binary_search(array, target, 0, n - 1)
if result == None :
    print('원소가 존재하지 않습니다')
else
    print(result + 1)
```

### 코딩 테스트에서의 이진 탐색

- 코딩 테스트에서의 이진 탐색 문제는 탐색 범위가 큰 상황에서의 탐색을 가정하는 문제가 많다.
- 탐색 범위가 2,000만을 넘어가면 이진 탐색으로 문제에 접근하길 추천
- 처리해야 할 데이터의 개수나 값이 1,000만 단위 이상으로 넘어가면 이진 탐색과 같이 O(logN)의 속도를 내야 하는 알고리즘을 떠올려야 문제를 풀 수 있는 경우가 많다.

## 트리 자료구조

- 노드와 노드의 연결로 표현하며 여기에서 노드는 정보의 단위로서 어떠한 정보를 가지고 있는 개체
- 트리는 부모 노드와 자식 노드의 관계로 표현된다.
- 트리의 최상단 노드를 루트 노드라고 한다.
- 트리의 최하단 노드를 단말 노드라고 한다.
- 트리에서 일부를 떼어내도 트리 구조이며 이를 서브 트리라 한다.
- 트리는 파일 시스템과 같이 계층적이고 정렬된 데이터를 다루기에 적합하다.

## 이진 탐색 트리

- 트리 자료구조 중에서 가장 간단한 형태가 이진 탐색 트리이다.
- 이진 탐색 트리란 이진 탐색이 동작할 수 있도록 고안된, 효율적인 탐색이 가능한 자료구조이다.
- 이진 탐색 트리의 특징
  - 부모 노드보다 왼족 자식 노드가 작다.
  - 부모 노드보다 오른쪽 자식 노드가 크다.
  - 왼쪽 자식 노드 < 부모 노드 < 오른쪽 자식 노드가 성립해야지 이진 탐색 트리라 할 수 있다.
- 이진 탐색 트리에서 데이터를 조회하는 과정
  1. 부모 노드와 찾는 원소값을 비교한다.
  2. 부모 노드가 찾는 값보다 크면 왼쪽 노드를, 작으면 오른쪽 노드를 방문한다.
  3. 위 과정을 반복하다보면 찾는 원소값을 찾을 수 있다.

### 빠르게 입력받기

- 이진 탐색 문제는 입력 데이터가 만헉나, 탐색 범위가 매우 넓은 편이다.
- 입력 데이터의 개수가 많은 문제에 input() 함수를 사용하면 동작 속도가 느려서 시간 초과로 오답 판정을 받을 수 있다.
- 입력 데이터가 많은 문제는 sys 라이브러리의 readline() 함수를 이용하면 시간 초과를 피할 수 있다.

```py
import sys
# 하나의 문자열 데이터 입력받기
input_data = sys.stdin.readline().rstrip()
```

- sys 라이브러리를 사용할 때는 한줄 입력받고 나서 **rstrip()** 함수를 꼭 호출해야 한다.
- 소스코드에 readline()으로 입력하면 입력 후 엔터가 줄바꿈 기호로 입력되는데, 이 공백 문자를 제거하려면 rstrip() 함수를 사용해야 한다.
