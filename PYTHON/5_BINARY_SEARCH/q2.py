# 문제 : P.369
# 풀이 : P.559

n = int(input())
data = list(map(int, input().split()))

result = 0

def fixedPoint(start, end) :
    pivot = (start + end) // 2
    if start > end :
        return -1
    if pivot == data[pivot] :
        return pivot
    elif pivot > data[pivot] :
        return fixedPoint(pivot + 1, end)
    elif pivot < data[pivot] :
        return fixedPoint(start, end - 1)
    return -1

print(fixedPoint(0, n - 1))