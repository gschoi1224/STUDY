# 당신은 음식점의 계산을 도와주는 점원이다. 
# 카운터에는 거스름돈으로 사용할 500원, 100원, 10원짜리 동전이 무한히 존재한다고 가정한다.
# 손님에게 거슬러 줘야 할 돈이 N원일 때 거슬러줘야 할 동전의 최소 개수를 구하라.
# 단, 거슬러 줘야 할 돈 N은 항상 10의 배수이다.

# 내 풀이
N = int(input())
result = 0
result += N // 500
result += (N % 500) // 100
result += ((N % 500) % 100) // 50
result += (((N % 500) % 100) % 50) // 10
print(int(result))

#답안
n = 1260
count = 0

# 큰 단위의 화폐부터 차례대로 확인
coin_types = [500, 100, 50, 10]

for coin in coin_types :
    count += n // coin # 해당 화폐로 거슬러 줄 수 있는 동전의 개수 세기
    n %= coin

print(count)