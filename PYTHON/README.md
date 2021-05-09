# PYTHON

## 자료형

### 리스트

- 리스트 선언

```py
# 빈 리스트 선언 방법
a = list() # []
a = [] # []

# 크기가 N이고 모든 값이 0인 1차원 리스트 초기화
a = [0] * n # [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

- 리스트 인덱싱과 슬라이싱

```py
# 뒤에서 첫 번째 원소 출력
a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
print(a[-1])    #9
# 두 번째 원소부터 네 번째 원소까지
print(a[1 : 4]) // [2, 3, 4]
```

- 리스트 컴프리헨션

```py
# 0부터 19까지의 수 중에서 홀수만 포함하는 리스트
array = [i for i in range(20) if i % 2 == 1]    # [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
# 1부터 9까지의 수의 제곱 값을 포함하는 리스트
array = [i * i for i in range(1, 10)]       # [1, 4, 9, 16, 25, 36, 49, 64, 81]
# N X M 크기의 2차원 리스트 초기화
array = [[0] * 4 for _ in range(3)]     # [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
# _는 i를 이용하지 않고 반복을 원할 때

# 잘못된 방법
array = [[0] * 4] * 3
array[1][1] = 5     # [[0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0]]
```

- 리스트 관련 기타 메서드

  - **list.append(삽입할 값) : 리스트에 원소를 하나 삽입**
  - list.sort() : 오름차순 정렬
  - list.sort(reverse=True) : 내림차순 정렬
  - **list.insert(삽입할 위치 인덱스, 삽입할 값) : 특정한 인덱스 위치에 원소를 삽입**
  - list.count(특정 값) : 리스트에서 특정한 값을 가지는 데이터의 개수를 셀 때 사용
  - **list.remove(특정 값) : 특정한 값을 갖는 원소를 제거. 특정한 값을 갖는 원소가 여러 개면 하나만 제거됨**
  - list.reverse()

- remove()의 시간복잡도 해결법

```py
a = [1, 2, 3, 4, 5, 5, 5]
remove_set = [3, 5]
# remove_set에 포함되지 않은 값만을 저장
result = [i for i in a if i not in remove_set]  # [1, 2, 4]
```

### 튜플

- 튜플을 한 번 선언된 값을 변경할 수 없음.
- 리스트는 대괄호를 이용하지만 튜플은 소괄호를 이용함.
- 대입 연산자를 사용하여 값을 변경할 수 없음
- 우선순위 큐를 이용할 때 한 번 들어간 값은 변경되지 않는데 알고리즘을 잘못 작섬해서 변경하면 안 되는 값이 변경되고 있지는 않은지 체크할 수 있음
- 다익스트라 최단 경로 알고리즘에서는 (비용, 노드 번호)의 형태로 함께 튜플로 묶어서 관리하는 것이 관례

```py
a = {1, 2, 3, 4}
```

### 사전

- key와 value의 쌍을 데이터로 가지는 자료형

```py
data = dict()
data['사과'] = 'Apple'
data['바나나'] = 'Banana'
data['코코넛'] = 'Coconut'
# { '사과' : 'Apple', '바나나' : 'Banana', '코코넛' : 'Coconut' }

if '사과' in data : print("'사과'를 키로 가지는 데이터가 존재합니다.")
# 키 데이터만 담은 리스트
key_list = data.keys()
# 값 데이터만 담은 리스트
value_list = data.values()
# 각 키에 따른 값을 하나씩 출력
for key in key_list
print(data[key])
```

### 집합

- 중복을 허용하지 않는다.
- 순서가 없다.
- 특정한 데이터가 이미 등장한 적이 있는지 여부를 체크할 때 매우 효과적
- 집합 자료형 초기화 방법

```py
data = set([ 1, 1, 2, 3, 4, 4, 5 ]) # {1, 2, 3, 4, 5}
data = {1, 1, 2, 3, 4, 4, 5}    # {1, 2, 3, 4, 5}
```

- 집합 자료형의 연산

```py
a = set([1, 2, 3, 4, 5])
b = set([3, 4, 5, 6, 7])
print(a | b)    # 합집합 {1, 2, 3, 4, 5, 6, 7}
print(a & b)    # 교집합 {3, 4, 5}
print(a - b)    # 차집합 {1, 2}
```

- 집합 자료형 관련 함수 (시간 복잡도 모두 O(1))

```py
data = set([1, 2, 3])

# 새로운 원소 추가
data.add(4)     # {1, 2, 3, 4}

# 새로운 원소 여러 개 추가
data.update({5, 6})     # {1, 2, 3, 4, 5, 6}

# 특정한 값을 갖는 원소 삭제
data.remove(3)          # {1, 2, 4, 5, 6}
```

## 조건문

### if

```py
if 조건문1 :
    조건문 1이 True일 때 실행되는 코드
elif 조건문 2 :
    조건문 1에 해당하지 않고 조건문 2가 True일 때 실행되는 코드
else
    위의 모든 조건문이 모두 True 값이 아닐 때 실행되는 코드
```

- 들여쓰기가 같은 부분이 함께 실행됨
- 들여쓰기는 스페이스 4번이 표준이지만 탭을 사용해도 되긴 함
- 논리 연산자 : and, or, not
- 기타 연산자 : in, not in
- 기타

```py
score = 85
if score > 80 :
    pass # 나중에 작성할 소스코드 # 조건문의 값이 참이라고 해도 아무것도 처리하고 싶지 않을 때
# 한 줄 작성도 가능
if score >= 80 result = "Success"
else result = "Fail"
# 조건부 표현식
result = "Success" if score >= 80 else "fail"
```

## 반복문

### while

```py
i = 1
result = 0
# i가 9보다 작거나 같을 때 아래 코드를 반복적으로 실행
while i <= 9 :
    if i % 2 == 1 : # i가 홀수일 때만
        result += i
    i += 1
print(result)   # 45
```

### for

- in 뒤에 오는 데이터에 포함되어 있는 모든 원소를 첫 번째 인덱스부터 차례대로 하나씩 방문

```py
for 변수 in 리스트 :
    실행할 소스 코드
```

- range(시작 값, 끝 값 + 1) 사용

```py
for i in range(1, 10) :
    result += i # 45
```

- range()의 값을 하나만 넣으면 자동으로 시작 값이 0이 됨
- continue를 만나면 반복문의 처음으로 돌아감

```py
scores = [90, 85, 77, 65, 97]
cheating_list = {2, 4}
for i in range(5) :
    if i + 1 in cheating_list :
        continue
    if scores[i] >= 80 :
        print(i + 1, "번 학생은 합격입니다.")
```

## 함수

- 형태

```py
def 함수명(매개변수) :
    실행할 소스코드
    return 반환 값
```

- 함수를 호출하는 과정에서 파라미터의 변수를 직접 지정해서 값을 넣을 수 있음

```py
def add(a, b) :
    print('함수의 결과 :', a + b)

add(b = 3, a = 7)
```

- 함수 안에서 함수 밖의 변수를 변경하는 경우

```py
a = 0
def func() :
    global a
    a += 1
for i in range(10) :
    func()
print(a)    # 10
```

- 람다 표현식

```py
print((lambda a, b : a + b)(3, 7)) # 10
```

## 입출력

- 데이터를 입력받을 때는 input()을 이용
- 정수형 데이터로 처리하기 위해서는 int() 사용
- 여러 개의 공백으로 구분된 정수형 데이터를 띄어쓰기로 구분하여 입력 받는 경우

```py
# 데이터의 개수 입력
n = int(input())
# 각 데이터를 공백으로 구분하여 입력
data = list(map(int, input().split()))
# 첫쨰 줄에 n, m, k가 공백으로 구분되어 입력되는 경우
n, m, k = map(int, input().split())
# 입력의 개수가 많은 경우
import sys
sys.stdin.readline().rstrip() # rstrip은 줄 바꿈 제거
```

- 문자열과 수를 함께 출력해야 될 때 단순히 더하기 연산자를 이용하여 문자열과 수를 더하면 오류가 발생

```py
# str 으로 수를 문자로 변환 후 출력
answer = 7
print('정답은' + str(answer) + '입니다.')
# 콤마로 구분하여 출력
print("정답은", str(answer), "입니다.") # 의도치 않은 공백이 삽입될 수 있음
# f-string 문법 사용
print(f"정답은 {answer}입니다.") # 중괄호 안에 변수를 넣으면 자료형의 변환 없이도 출력 가능
```

## 주요 라이브러리

### 내장 함수

- 별도의 import 명령어 없이 바로 사용할 수 있는 내장 함수
- sum() : 리스트와 같은 interable 객체가 입력으로 주어졌을 때 모든 원소의 합을 반환
- min() : 파라미터가 2개 이상 들어왔을 때 가장 작은 값을 반환
- max() : 파라미터가 2개 이상 들어왔을 대 가장 큰 값을 반환
- eval() : 수학 수식이 문자열 형식으로 들어오면 해당 수식을 계산한 결과를 반환

```py
print(eval("(3 + 5) * 7"))  # 56
```

- sorted() : iterable 객체가 들어왔을 때 정렬된 결과를 반환. key 속성으로 정렬 기준을 명시할 수 있으며, reverse 속성으로 정렬된 결과 리스트를 뒤집을지의 여부를 설정할 수 있음. iterable 객체는 기본적으로 sort() 함수를 내장하고 있어서 굳이 sorted() 함수를 사용하지 않고도 정렬 가능

```py
sorted([9, 1, 8, 5, 4])     # 오름차순 정렬 [1, 4, 5, 8, 9]
sorted([9, 1, 8, 5, 4], reverse = True)     # 내림차순으로 정렬 [9, 8, 5, 4, 1]
# 튜플 정렬
sorted([('홍길동', 35), ('이순신', 75), ('아무개', 50)], key = lambda x : x[1], reverse = True) # [('이순신', 75), ('아무개', 50), ('홍길동', 35)]
```

### itertools

- 반복되는 데이터를 처리하는 기능을 포함하고 있는 라이브러리
- **permutations** : iterable 객체에서 r개의 데이터를 뽑아 일렬로 나열하는 모든 경우를 계산해줌

```py
from itertools import permutations
data ['A', 'B', 'C']
print(list(permutations(data, 3))) # 모든 순열 구하기
# [('A', 'B', 'C'), ('A', 'C', 'B'), ('B', 'A', 'C'), ('B', 'C', 'A'), ('C', 'A', 'B'), ('C', 'B', 'A')]
```

- **combinations** : iterable 객체에서 r개의 데이터를 뽑아 순서를 고려하지 않고 나열하는 모든 경우를 계산

```py
from itertools import combinations
data = ['A', 'B', 'C']
print(list(combinations(data, 2))) # 2개를 뽑는 모든 조합 구하기
# [('A', 'B'), ('A', 'C'), ('B', 'C')]
```

- **product** : permutations와 같이 interable 객체에서 r개의 데이터를 뽑아 일렬로 나열하는 모든 경우를 계산. 다만 원소를 중복하여 뽑음

```py
from itertools import product
data = ['A', 'B', 'C']
print(list(product(data, repeat=2)))    # 뽑고자 하는 데이터의 수 repeat 값
# [('A', 'A'), ('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'B'), ('B', 'C'), ('C', 'A'), ('C', 'B'), ('C', 'C')]
```

### heapq

- 우선 순위 큐를 위하여 만들어진 자료 구조로 배열을 이용하여 구현할 수 있음
- 여러 개의 값들 중에서 최댓값이나 최솟값을 빠르게 찾아내도록 만들어진 자료구조
- 일종의 반정렬 상태(느슨한 정렬 상태)를 유지(부모 노드의 키 값이 자식 노드의 키 값보다 항상 큰(작은) 이진 트리)

```py
import heapq
def heapsort(iterable) :
    h = []
    result = []
    # 모든 원소를 차례대로 힙에 삽입
    for value in iterable :
        heapq.heappush(h, value)
    # 힙에 삽입된 모든 원소를 차례대로 꺼내어 담기
    for i in range(len(h)) :
        result.append(heapq.heappop(h))
    return result
print(heapsort([1, 3, 5, 7, 9, 2, 4, 6, 8, 0])) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

- 최대힙을 제공하지 않으므로 heappush할 때 부호를 바꿔 삽입한 후 heappop 할 때 부호를 바꿔 꺼내기

### bisect

- 이진 탐색을 쉽게 구현할 수 있도록 해주는 라이브러리. **정렬된 배열**에서 특정한 원소를 찾아야 할 때 매우 효과적으로 사용됨.
- bisect_left(a, x) : 정렬된 순서를 유지하면서 리스트 a에 데이터 x를 삽입할 가장 왼쪽 인덱스를 찾는 메서드
- bisect_right(a, x) : 정렬된 순서를 유지하면서 리스트 a에 데이터 x를 삽입할 가장 오른쪽 인덱스를 찾는 메서드

```py
from bisect import bisect_left, bisect_right
a = [1, 2, 4, 4, 8]
x = 4
print(bisect_left(a, x)) # 2
print(bisect_right(a, x)) # 4
```

- **정렬된 리스트**에서 값이 특정 범위에 속하는 원소의 개수를 구하고자 할 때 효과적으로 사용됨
- count_by_range(a, left_value, right_value) : 정렬된 리스트에서 값이 [left_value, right_value]에 속하는 데이터의 개수를 반환. 즉 left_value <= x <= right_value의 원소의 개수

```py
from bisect import bisect_left, bisect_right

# 값이 [left_valu,e right_value]인 데이터의 개수를 반환하는 함수
def (count_by_range(a, left_value, right_value)) :
    right_index = bisect_right(a, right_value)
    left_index = bisect_left(a, left_value)
    return right_index - left_index

# 리스트 선언
a = [1, 2, 3, 3, 3, 3, 4, 4, 8, 9]

# 값이 4인 데이터 개수 출력
print(count_by_range(a, 4, 4)) # 2

# 값이 [-1, 3] 범위에 있는 데이터 개수 출력
print(count_by_range(a, -1, 3)) # 6
```

### collections

- deque : 리스트 자료형과 다르게 인덱싱, 슬라이싱 등의 기능은 사용할 수 없지만 시작 부분이나 끝부분에 데이터를 삽입하거나 삭제할 때 매우 효과적으로 사용됨

```py
from collections import deque

data = deque([2, 3, 4])
data.appendleft(1)
data.append(5)

print(data) # deque([1, 2, 3, 4, 5])
print(list(data))   # 리스트 자료형으로 변환 [1, 2, 3, 4, 5]
```

- Counter : 등장 횟수를 세는 기능을 제공

```py
from collections import Counter
counter = Counter(['red', 'blue', 'red', 'green', 'blue', 'blue'])
print(counter(['blue']))    # 'blue'가 등장한 횟수 출력 # 3
print(counter(['green']))   # 'green'이 등장한 횟수 출력 # 1
print(dict(counter))        # 사전 자료형으로 변환 # {'red' : 2, 'blue' : 3, 'green' : 1}
```

### math

- 자주 사용되는 수학적인 기능을 포함하고 있는 라이브러리
- 팩토리얼, 제곱근, 최대공양수 등을 계산해주는 기능을 포함

```py
# 팩토리얼
import math
print(math.factorial(5)) # 5! 120
# 제곱근
print(math.sqrt(7)) # 7의 제곱근을 출력 2.6457513110645907
# 최대 공약수
print(math.gcd(21, 14)) # 7
# 파이
print(math.pi) # 3.141592...
# 자연상수 e
print(math.e)   # 2.7182818...
```
