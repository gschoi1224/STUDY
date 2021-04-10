const gift_cards = [4, 5, 3, 2, 1];
const wants = [2, 4, 4, 5, 1];

let answer = 0; // 원하지 않는 상품을 가질 사람의 최솟값
gift_cards.sort();

let before = '';
for (let i in gift_cards) {
    if (before !== gift_cards[i]) {
        let cnt = 0;
        wants.map(w => gift_cards[i] === w && cnt++);
        let giftCnt = 0;
        gift_cards.map(g => gift_cards[i] === g && giftCnt++);
        const despair = giftCnt - cnt;
        if (despair > 0)
            answer += despair;// 원하는 사람 수에서 선물 수 빼기
    }
    before = gift_cards[i];
}
console.log(answer);