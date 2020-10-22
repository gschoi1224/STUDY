console.log('require가 가장 위에 오지 않아도 됩니다.');

module.exports = '저를 찾아보세요.';

require('./var');

console.log('require.cache입니다.');
console.log(require.cache);             // module.exports했던 부분이나 로딩 여부, 부모, 자식 모듈 관계를 볼 수 있음
console.log('require.main입니다.');     // 노드 실행 시 첫 모듈 현재 > node require 로 실행했으므로 require.js가 require.main이 됨
console.log(require.main === module);   // 현재 파일이 첫 모듈인지 알아보려면
console.log(require.main.filename);     // 첫 모듈의 이름을 알아보려면