const { createLogger, format, transports } = require('winston');

const logger = createLogger({ // logger 만들기
    level: 'info', // 로그의 심각도, error, warn, info, verbose, debug, silly(심각도순), info를 고른 경우 info 보다 심각한 단계의 로그도 함께 기록됨
    format: format.json(), // 로그의 형식 json, label, timestamp, printf, simple, combine 등의 다양한 형식이 있음. 로그 시간을 기록하려면 timestamp 쓰는 것이 좋음
    transports: [ // 로그 저장 방식 의미, new transports.File 파일로 저장한다는 뜻, new transports.Console은 콘솔에 출력한다는 뜻
        new transports.File({ filename: 'combined.log' }),
        new transports.File({ filename: 'error.log', level: 'error' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;