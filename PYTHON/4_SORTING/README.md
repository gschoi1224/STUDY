# 정렬

- 데이터를 특정한 기준에 따라서 순서대로 나열하는 것
- 정렬 알고리즘으로 데이터를 정렬하면 이진 탐색이 가능해진다.
- 리스트를 뒤집는 연산은 O(N)의 복잡도로 간단히 수행할 수 있다.

## 선택 정렬(Selection Sort)

- 데이터가 무작위로 여러 개 있을 때, 이 중에서 가장 작은 데이터를 선택해 맨 앞에 있는 데이터와 바꾸고, 그 다음 작은 데이터를 선택해 앞에서 두 번째 데이터와 바꾸는 과정을 반복함

```py
array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8]

for i in range(len(array)) :
    min_index = i # 가장 작은 원소의 인덱스
    for j in range(i + 1, len(array[j])) :
        if array[min_index] > array[j] :
            min_index = j
    array[i], array[min_index] = array[min_index], array[i] # 스와프
print(array)
```

- 선택 정렬의 시간 복잡도 : O(N^2)
  - N - 1번 만큼 가장 작은 수를 찾아서 맨 앞으로 보내야 한다. 또한 매번 가장 작은 수를 찾기 위해서 비교 연산이 필요하다.
  - N + (N - 1) + (N - 2) + ... + 2로 볼 수 있다.
  - 간단히 O(N^2) 라고 표현할 수 있다.
  - 소스코드 상으로 간단한 형태의 2중 반복문이 사용되었기 때문
  - 선택 정렬은 기본 정렬 라이브러리를 포함해 다른 알고리즘과 비교했을 때 매우 비효율적이다.
  - 특정한 리스트에서 가장 작은 데이터를 찾는 일이 코딩 테스트에서 잦으므로 선택 정렬 소스코드 형태에 익숙해질 필요가 있다.

## 삽입 정렬(Insertion Sort)

- 데이터를 하나씩 확인하며, 각 데이터를 적절한 위치에 삽입하는 정렬
- 선택 정렬에 비해 시간 측면에서 더 효율적인 알고리즘
- 필요할 때만 위치를 바꾸므로 **데이터가 거의 정렬되어 있을 때** 훨씬 효율적임

```py
array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8]

for i in range(1, len(array)) :
    for j in range(i, 0, -1) :  # 인덱스 i부터 1까지 감소하며 반복하는 문법
        if array[j] < array[j -1] : # 한 칸씩 왼쪽으로 이동
            array[j], array[j - 1] = array[j - 1], array[j]
        else : # 자기보다 작은 데이터를 만나면 그 위치에서 멈춤
            break
print(array)
```

- 삽입 정렬의 시간 복잡도 : 최선 O(N)
  - 선택 정렬과 마찬가지로 반복문이 2번 중첩되어 사용되었다.
  - 삽입 정렬은 현재 리스트의 데이터가 거의 정렬되어 있는 상태라면 매우 빠르게 동작한다.
  - 최선의 경우 O(N)의 시간 복잡도를 가진다.
  - 거의 정렬되어 있는 상태로 입력이 주어지는 문제라면 퀵 정렬 등의 여타 정렬 알고리즘을 이용하는 것보다 삽입 정렬을 이용하는 것이 정답 확률을 높일 수 있다.

## 퀵 정렬 (Quick Sort)

- 가장 많이 사용되는 정렬 알고리즘
- 대부분의 프로그래밍 언어에서 정렬 라이브러리의 근간이 되는 알고리즘
- 기준을 설정한 다음 큰 수와 작은 수를 교환한 후 리스트를 반으로 나누는 방식으로 동작한다.
- 큰 숫자와 작은 숫자를 교환할 때, 교환하기 위한 '기준'을 바로 피벗이라고 표현한다.
- 퀵 정렬을 수행하기 전에는 피벗을 어떻게 설정할 것인지 미리 명시해야 한다.
- 호어 분할 방식
  1. 리스트에서 첫 번째 데이터를 피벗으로 정한다.
  2. 왼쪽에서부터 피벗보다 큰 데이터를 찾고, 오른쪽에서부터 피벗보다 작은 데이터를 찾는다.
  3. 큰 데이터와 작은 데이터의 위치를 서로 교환해준다.
  4. 왼쪽에서부터 찾는 값과 오른쪽에서부터 찾는 값의 위치가 엇갈리면 '작은 데이터'와 '피벗'의 위치를 서로 변경한다.
  5. 이렇게 피벗의 왼족에는 피벗보다 작은 데이터가 위치하고, 피벗의 오른족에는 피벗보다 큰 데이터가 위치하도록 하는 작업을 분할 혹은 파티션이라고 한다.
  6. 이러한 상태에서 왼쪽 리스트와 오른쪽 리스트를 개별적으로 다시 정렬시킨다.
- 재귀함수와 동작 원리가 같으며 현재 리스트의 원소가 1개라면 이미 정렬이 되어 있다고 간주해 재귀함수를 종료한다.

```py
array = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8]

def quick_sort(array, start, end) :
    if start >= end : # 원소가 1개인 경우 종료
        return
    pivot = start   # 피벗은 첫 번째 원소
    left = start + 1
    right = end
    while left <= right :
        # 피벗보다 큰 데이터를 찾을 때까지 반복
        while left <= end and array[left] <= array[pivot] :
            left += 1
        # 피벗보다 작은 데이터를 찾을 때까지 반복
        while right > start and array[right] >= array[pivot] :
            right -= 1
        if left > right : # 엇갈렸다면 작은 데이터와 피벗을 교체
            array[right], array[pivot] = array[pivot], array[right]
        else : # 엇갈리지 않았다면 작은 데이터와 큰 데이터를 교체
            array[left], array[right] = array[right], array[left]
    # 분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬 수행
    quick_sort(array, start, right - 1)
    quick_sort(array, right + 1, end)
quick_sort(array, 0, len(array) - 1)
print(array) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

- 파이썬의 장점을 살린 퀵 정렬 소스코드

```py
def quick_sort(array) :
    # 리스트가 하나 이하의 원소만을 담고 있따면 종료
    if len(array) <= 1 :
        return array

    pivot = array[0] # 피벗은 첫 번째 원소
    tail = array[1:] # 피벗을 제외한 리스트

    left_side = [x for x in tail if x <= pivot] # 분할된 왼쪽 부분
    right_side = [x for x in tail if x > pivot] # 분할된 오른쪽 부분

    # 분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬을 수행하고, 전체 리스트를 반환
    return quick_sort(left_side) + [pivot] + quick_sort(right_side)

```

- 퀵 정렬의 시간 복잡도 : 평균 O(NlogN), 최악 O(N^2)
  - 리스트의 가장 왼쪽 데이터를 피벗으로 삼을 때, '이미 데이터가 정렬되어 있는 경우'에는 느리게 동작한다.
- 퀵 정렬은 일반적인 경우에서 평균적으로 빠르게 동작하기 때문에 데이터의 특성을 파악하기 어렵다면 퀵 정렬을 이용하는 것이 유리하다.

## 계수 정렬

- 특정한 조건이 부합할 때만 사용할 수 있지만 매우 빠른 정렬 알고리즘
- 일반적으로 가장 큰 데이터와 가장 작은 데이터의 차이가 1,000,000을 넘지 않을 때 효과적으로 사용할 수 있다. (모든 범위를 담을 수 있는 크기의 리스트(배열)를 선언해야 하기 때문)
- 정렬 방법
  1. 가장 큰 데이터와 가장 작은 데이터의 범위가 모두 담길 수 있도록 하나의 리스트를 생성한다.
  2. 리스트의 모든 데이터가 0이 되도록 초기화한다.
  3. 데이터를 하나씩 확인하며 데이터의 값과 동일한 인덱스의 데이터를 1씩 증가시킨다.
  4. 정렬된 결과를 눈으로 확인하고 싶다면, 리스트의 첫 번째 데이터부터 하나씩 그 값만큼 인덱스를 출력하면 된다.

```py
# 모든 원소의 값이 0보다 크거나 같다고 가정
array = [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2]
# 모든 범위를 포함하는 리스트 선언(모든 값은 0으로 초기화)
count = [0] * (max(array) + 1)

for i in range(len(array)) :
    count[array[i]] += 1    # 각 데이터에 해당하는 인덱스의 값 증가

for i in range(len(count)) :    # 리스트에 기록된 정렬 정보 확인
    for j in range(count[i]) :
        print(i, end=' ')   # 띄어쓰기를 구분으로 등장한 횟수만큼 인덱스 출력
```

- 계수 정렬의 시간 복잡도 : O(N + K)

  - 모든 데이터가 양의 정수인 상황에서 데이터의 개수를 N, 데이터 중 최댓값의 크기를 K라고 할 때, 계수 정렬의 시간 복잡도는 O(N + K)이다.
  - 앞에서부터 데이터를 하나씩 확인하면서 리스트에서 적절한 익덱스의 값을 1씩 증가시킬 뿐만 아니라, 추후에 리스트의 각 인덱스에 해당하는 값들을 확인할 때 데이터 중 최댓값의 크기만큼 반복을 수행해야 하기 때문이다.

- 계수 정렬의 공간 복잡도 : O(N + K)
  - 계수 정렬은 때에 따라서 심각한 비효율성을 초래할 수 있다. 따라서 항상 사용할 수 있는 정렬 알고리즘은 아니며, 동일한 값을 가지는 데이터가 여러 개 등장할 때 적합하다.
  - 예를 들어 성적의 경우 100점을 맞은 학생이 여러 명일 수 있기 때문에 계수 정렬이 효과적이다.
  - 데이터의 크기가 한정되 있고, 데이터의 크기가 많이 중복되어 있을수록 유리하며 항상 사용할 수는 없다.

## 파이썬의 정렬 라이브러리

### sorted() 함수

- 파이썬은 기본 정렬 라이브러리인 sorted() 함수를 제공한다. sorted()는 퀵 정렬과 동작 방식이 비슷한 병합 정렬을 기반으로 만들어졌는데, 병합 정렬은 일반적으로 퀵 정렬보다 느리지만 최악의 경우에도 시간 복잡도 O(NlogN)을 보장한다는 특징이 있다.
- sorted() 함수는 리스트, 딕셔너리 자료형 등을 입력받아서 정렬된 결과를 리스트 자료형으로 출력한다.

```py
array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8]

result = sorted(array)
print(result) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### sort() 메서드

- 리스트 변수가 하나 있을 때 내부 원소를 바로 정렬할 수 있다.
- 별도의 정렬된 리스트가 반환되지 않고 내부 원소가 바로 정렬된다.

```py
array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8]

array.sort()
print(array)    # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 매개변수 key

- sorted()나 sort()를 이용할 때는 key 매개변수를 입력으로 받을 수 있다.
- key 값으로는 하나의 함수가 들어가야 하며 이는 정렬 기준이 된다.
- 람다 함수를 사용할 수도 있다.

```py
# 데이터가 튜플로 구성되어 있을 때 각 데이터의 두 번째 원소를 기준으로 설정하는 경우
array = [('바나나', 2), ('사과', 5), ('당근', 3)]
def setting(data) :
    return data[1]
result = sorted(array, key=setting)
print(result)   # [('바나나', 2), ('당근', 3), ('사과', 5)]
```

### 정렬 라이브러리의 시간 복잡도 : 최악의 경우에도 O(NlogN) 보장

### 세 가지 문제 유형

1. **정렬 라이브러리로 풀 수 있는 문제** : 단순히 정렬 기법을 알고 있는지 물어보는 문제로 기본 정렬 라이브러리의 사용 방법을 숙지하고 있으면 어렵지 않게 풀 수 있다.
2. **정렬 알고리즘의 원리에 대해서 물어보는 문제** : 선택 정렬, 삽입 정렬, 퀵 정렬 등의 원리를 알고 있어야 문제를 풀 수 있다.
3. **더 빠른 정렬이 필요한 문제** : 퀵 정렬 기반의 정렬 기법으로는 풀 수 없으며 계수 정렬 등의 다른 정렬 알고리즘을 이용하거나 문제에서 기존에 알려진 알고리즘의 구조적인 개선을 거쳐야 풀 수 있다.
