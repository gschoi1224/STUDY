# 위에서 아래로

# 하나의 수열에는 다양한 수가 존재한다. 이러한 수는 크기에 상관없이 나열되어 있다. 이 수를 큰 수부터 작은 수의 순서로 정렬해야 한다.
# 수열을 내림차순으로 정렬하는 프로그램을 만드시오.
# 입력 조건
# - 첫째 줄에 수열에 속해 있는 수의 개수 N이 주어진다. (1 <= N <= 500)
# - 둘째 줄부터 N + 1 번재 줄까지 N개의 수가 입력된다. 수의 범위는 1 이상 100,000 이하의 자연수이다.
# 출력 조건
# - 입력으로 주어진 수열이 내림차순으로 정렬된 결과를 공백으로 구분하여 출력한다. 동일한 수의 순서는 자유롭게 출력해도 괜찮다.
# 입력 예시
# 3
# 15
# 27
# 12
# 출력 예시
# 27 15 12

n = int(input())
input_data = []

for i in range(n) :
    input_data.append(int(input()))

input_data = sorted(input_data, reverse=True)

# 정렬이 수행된 결과를 출력
for i in input_data :
    print(i, end=' ')


# 문제 해설
# 이 문제는 가장 기본적인 정렬을 할 수 있는지 물어보는 문제이다.
# 수의 개수가 500개 이하로 매우 적으며, 모든 수는 1 이상 100,000 이하이므로 어떠한 정렬 알고리즘을 사용해도 문제를 해결할 수 있다.
# 아무  정렬이나 사용해도 상관 없지만 가장 코드가 간결해지는 파이썬의 기본 정렬 라이브러리를 사용하는 것이 효과적이다.
