# 문제 : P.313
# 풀이 : P.508

s = list(map(int, input()))

result = s[0]

for i in range(1, len(s)) :
    if s[i] < 2 or result < 2 :
        result += s[i]
    else :
        result *= s[i]

print(result)

# 답과 거의 일치함