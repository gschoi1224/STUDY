const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET); // 요청 헤더에 저장된 토큰을 사용
        // 사용자가 쿠키처럼 헤더에 토큰을 넣어 보내면 jwt.verify 메서드로 토큰을 검증함
        // 메서드의 첫 번째 인수로 토큰을, 두 번째 인수로 토큰의 비밀 키를 넣음
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') { // 유효 기간 초과
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.',
        });
    }
};

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

exports.apiLimiter = (req, res, next) => {
    return new RateLimit({
        windowMs: 60 * 1000, // 1분 기준시간
        max: 1, // 허용 횟수
        delayMs: 0, // 호출 간격
        handler(req, res) { // 제한 시간 초과 시 콜백 함수
            res.status(this.statusCode).json({
                code: this.statusCode, // 기본값 429
                message: `1분에 한 번만 요청할 수 있습니다.`,
            });
        },
    });
}

exports.apipremiumLimiter = new RateLimit({
    windowMs: 10 * 1000, // 1분 기준시간
    max: 1, // 허용 횟수
    delayMs: 0, // 호출 간격
    handler(req, res) { // 제한 시간 초과 시 콜백 함수
        res.status(this.statusCode).json({
            code: this.statusCode, // 기본값 429
            message: `10초에 한 번만 요청할 수 있습니다.`,
        });
    },
});


exports.deprecated = (req, res) => {
    res.status(410).json({
        code: 410,
        message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.',
    });
};