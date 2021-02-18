const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

// 1. handler 함수가 람다 호출시 실행되는 함수
exports.handler = async(event, context, callback) => { // event는 호출 상황에 대한 정보, context는 실행되는 함수 환경에 대한 정보, callback은 함수가 완료되었는지를 람다에게 알림
    // 2. event 객체로부터 버킷 이름(Bucket)과 파일 경로(Key)를 받아옴
    const Bucket = event.Records[0].s3.bucket.name;
    const Key = decodeURIComponent(event.Records[0].s3.object.key);
    const filename = Key.split('/')[Key.split('/').length - 1];
    const ext = Key.split('.')[Key.split('.').length].toLowerCase();
    const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // sharp 에서는 jpg 대신 jpeg를 사용
    console.log('name', filename, 'ext', ext);

    // 3. s3.getObject ㅔㅁ서드로 버킷으로부터 파일을 불러옴. s3Object.Body에 파일 버퍼가 담겨 있음.
    try {
        const s3Object = await s3.getObject({ Bucket, Key }).promise(); // 버퍼로 가져오기
        console.log('original', s3Object.Body.length);

        // 4. sharp 함수에 파일 버퍼를 넣고, resize 메서드로 크기를 지정
        const resizedImage = await sharp(s3Object.Body) // 리사이징
            .resize(200, 200, { fit: 'inside' }) // fit:inside는 주어진 가로 세로 사이즈 안에 딱 맞게 이미지를 조정하라는 뜻
            .toFormat(requiredFormat)
            .toBuffer(); // 리사이징된 이미지 결과를 버퍼로 출력

        await s3.putObject({ // thumb 폴더에 저장
            Bucket,
            Key: `thumb/${filename}`,
            Body: resizedImage,
        }).promise();
        console.log('put', resizedImage.length);
        return callback(null, `thumb${filename}`); // 정상적으로 완료되었다면 
    } catch (error) {
        console.error(error);
        return callback(error);
    }
};