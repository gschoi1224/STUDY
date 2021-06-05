# 문제 : P.370
# 풀이 : P.560
n, c = list(map(int, input().split(' ')))
array = []
for _ in range(n) :
    array.append(int(input()))
array.sort()

# start = array[1] - array[0] # 집의 좌표 중에 가장 작은 값
# end = array[-1] - array[0] # 집의 좌표 중에 가장 큰 값
# result = 0

# while(start <= end) :
#     mid = (start + end) // 2 # mid는 가장 인접한 두 공유기 사이의 거리를 의미
#     value = array[0]
#     count = 1
#     print(start, end, mid, value)
#     # 현재의 mid값을 이용해 공유기 설치
#     for i in range(1, n) : # 앞에서부터 차근차근 설치
#         print('array[i]', array[i], value, mid)
#         if array[i] >= value + mid :
#             value = array[i]
#             count += 1
#     if count >= c : # c개 이상의 공유기를 설치할 수 있는 경우, 거리를 증가
#         result = mid # 최적의 결과를 저장
#     if abs(start - mid) > abs(end - mid) :
#         end = mid - 1
#     else :
#         start = mid + 1

# print(result)

gap = (array[-1] - array[0]) // (c - 1)

while True:
    # array의 n개의 주소에 공유기를 gap 이상의 거리를 두고 최대 몇 개를 설치할 수 있는지 확인
    x = 0
    count = 1
    for i in range(1, n):
        if array[i] - array[x] >= gap:
            count += 1
            x = i
    
    # c개 이상의 공유기를 설치할 수 없는 경우 gap을 1 줄인 후 반복
    if count >= c:
        break
    else:
        gap -= 1

print(gap)
