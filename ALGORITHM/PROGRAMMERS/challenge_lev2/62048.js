function solution(w, h) {
    const gcd = (a, b) => {
        // 유클리드 호제법을 이용한 최대공약수 구하기 greatest common divisor
        const mod = a % b;
        if (mod === 0) return b;
        return gcd(b, mod);
    };
    return w * h - (w + h - gcd(w, h));
}

console.log(solution(8, 12)); // 80
