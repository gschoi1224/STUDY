# <부품 찾기>

# 부품이 N개 있다. 각 부품은 정수 형태의 고유한 번호가 있다. 어느 날 손님이 M개 종류의 부품을 대량으로 구매하겠다며 당일 날 견적서를 요청했다.
# 손님이 문의한 부품 M개 종류를 모두 확인해서 견적서를 작성해야 한다. 이때 가게 안에 부품이 모두 있는지 확인하는 프로그램을 작성해보자.
# 예를 들어 가게의 부품이 총 5개일 때 부품 번호가 다음과 같다고 하자.
# N = 5
# [8, 3, 7, 9, 2]
# 손님은 총 3개의 부품이 있는지 확인 요청했는데 부품 번호는 다음과 같다.
# M = 3
# [5, 7, 9]
# 이때 손님이 요청한 부품 번호의 순서대로 부품을 확인해 부품이 있으면 yes를, 없으면 no를 출력한다. 구분은 공백으로 한다.
# 입력 조건
# - 첫재 줄에 정수 N이 주어진다. (1 <= N <= 1,000,000)
# - 둘째 줄에는 공백으로 구분하여 N개의 정수가 주어진다. 이때 정수는 1도다 크고 1,000,000 이하이다.
# - 셋째 줄에는 정수 M이 주어진다. (1 <= M <= 100,000)
# - 넷째 줄에는 공백으로 구분하여 M개의 정수가 주어진다. 이때 정수는 1보다 크고 1,000,000 이하이다.
# 출력 조건
# - 첫재 줄에 공백으로 구분하여 각 부품이 존재하면 yes를 없으면 no를 출력한다.
# 입력 예시
# 5
# 8 3 7 9 2
# 3 
# 5 7 9
# 출력 예시
# no yes yes

# 내 풀이
n = int(input())
all_list = list(map(int, input().split()))
m = int(input())
req_list = list(map(int, input().split()))
all_list.sort()

def binary_search(array, target, start, end) :
    if (start > end) :
        return 'no'
    mid = (start + end) // 2
    if array[mid] == target :
        return 'yes'
    elif array[mid] > target : # 피벗이 타겟보다 클 때
        return binary_search(array, target, start, mid - 1)
    else :
        return binary_search(array, target, mid + 1, end)

for req in range(m) :
    result = binary_search(all_list, req_list[req], 0, n - 1)
    print(result, end=' ')


# 문제 해설
# 이 문제는 여러 방법으로 해결할 수 있다. 먼저 이진 탐색 알고리즘으로 풀이는 다량의 데이터 검색에 효과적이기 때문이다.
# 먼저 매장 내 N개의 부품을 번호를 기준으로 정렬하고, 그 이후에 M개의 찾고자 하는 부품이 각각 매장에 존재하는지 검사한다.
# 이렇게 문제를 풀면 부품을 찾는 과정에서 최악의 경우 시간 복잡도 O(M X LogN)의 연산이 필요하므로 이론상 최대 약 200만 번의 연산이 이루어진다고 분석할 수 있다.
# 오히려 N개의 부품을 정렬하기 위해서 요구되는 시간 복잡도 O(N X logN)이 이론적으로 최대 약 2,000만으로 더욱더 많은 연산이 필요한 것을 알 수 있다.
# 결과적으로 이진 탐색을 사용하는 문제 풀이 방법의 경우 시간 복잡도는 O((M + N) X logN)이다.

# 답안 예시(이진 탐색)
def binary_search(array, target, start, end) : 
    while start <= end :
        mid = (start + end) // 2
        if array[mid] == target :
            return mid
        elif array[mid] > target :
            end = mid - 1
        else :
            start = mid + 1
    return None

n = int(input())
array = list(map(int, input().split()))
array.sort()

m = int(input())
x = list(map(int, input().split()))

for i in x :
    result = binary_search(array, i, 0, n - 1)
    if result != None :
        print('yes', end=' ')
    else :
        print('no', end=' ')

# 계수 정렬의 개념을 이용한 풀이 
# 모든 원소의번호를 포함할 수 있는 크기의 리스트를 만든 뒤에, 리스트의 인덱스에 직접 접근하여 특정한 번호와 부품이 매장에 존재하는지 확인
n = int(input())
array = [0] * 1000001

for i in input().split() :
    array[int(i)] = 1

m = int(input())
x = list(map(int, input().split()))

for i in x :
    if array[i] == 1 :
        print('yes', end=' ')
    else :
        print('no', end=' ')

# 집합 자료형을 이용한 풀이
# 단순히 특정한 수가 한 번이라도 등장했는지를 검사하면 되므로 집합 자료형을 이용해서 문제를 해결할 수 있다.
# set() 함수는 집합 자료형을 초기화할 대 사용한다. 집합 자ㅛ형은 단순히 특정한 데이터가 존재하는지 검사할 대에 매우 효과적으로 사용할 수 있다.

n = int(input())
array = set(map(int, input().split()))

m = int(input())
x = list(map(int, input().split()))

for i in x :
    if i in array :
        print('yes', end=' ')
    else :
        print('no', end=' ')

