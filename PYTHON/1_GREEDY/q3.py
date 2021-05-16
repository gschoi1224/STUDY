# 문제 : P.313
# 풀이 : P.509

s = list(map(int, input()))

before = -1
ones = 0
zeros = 0

result = 0
for i in s :
    if before != i and i == 1 :
        ones += 1
    elif before != i and i == 0 :
        zeros += 1
    before = i

print(min(ones, zeros))

# 답과 거의 일치함