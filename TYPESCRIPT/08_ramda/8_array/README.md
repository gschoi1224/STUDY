# 배열 다루기

## R.prepend, R.append

-   기존 배열의 앞뒤에 새 아이템을 삽입한 새 배열을 만들어 줌
-   순수 함수 관점에서 기존 배열에 아이템을 직접 삽입하면 기존 배열의 내용을 훼손하게 되므로 만들어짐
-   R.prepend: 배열의 맨 앞에 아이템을 삽입[(예)](./src/prepend-test.ts)
-   R.append: 배열의 맨 뒤에 아이템을 삽입[(예)](./src/append-test.ts)

## R.flatten

-   복잡한 배열을 1차원의 평평한 배열로 바꿔줌
-   [예시](./src/flatten-test.ts)

## R.unnest

-   R.flatten 보다 조금 정교하게 배열을 가공해줌
-   한 번 적용했을 때와 두 번 적용했을 때의 차이가 있음
-   한 번 적용할 때마다 한 껍데기 씩 벗겨냄
-   [예시](./src/unnest-test.ts)

## R.sort

-   배열의 타입이 number[] 라면 배열을 내림차순이나 오름차순으로 정렬할 수 있음
-   정렬된 배열 = R.sort(콜백 함수)(배열)
-   콜백 함수는 (a: number, b: number): number => a - b // 마이너스 값이면 오름차순, 0이나 플러스 값이면 내림차순
-   [랜덤하게 생성된 수들의 배열을 오름차순한 예](./src/sort-test.ts)

## R.sortBy

-   배열에 담긴 아이템이 객체일 때 특정 속성에 따라 정렬할 수 있게 해 주는 함수
-   정렬된 배열 = R.sortBy(객체의 속성을 얻는 함수)(배열)
-   [예시](./src/sortBy-test.ts)

## R.sortWith

-   sortBy 함수는 항상 오름차순으로 정렬하지만 R.sortWith 함수는 R.ascend, R.descend 함수와 함께 사용되어 오름차순, 내림차순이 가능
-   [내림차순 예](./src/sortWith-test.ts)
