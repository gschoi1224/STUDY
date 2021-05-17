# 문제 : P.323
# 풀이 : P.517

s = list(input())

list = []
result = 0
for i in s :
    if str.isalpha(i) :
        list.append(i)
    else :
        result += int(i)

list.sort(reverse=True)

for i in list :
    result = str(i) + str(result)

print(result)

# 답
# 숫자가 0이면 출력 안하는거 빼먹음