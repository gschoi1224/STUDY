/*
// ES5
function calculateCircleArea(r) {
    //const radius = r || 1;
    return Math.PI * r * r;
}
*/
// ES6
function calculateCircleArea(r = 1) {
    return Math.PI * r * r;
}
// or 
const calculateCirclaArea2 = (r = 1) => Math.PI * r * r;

const area = calculateCircleArea(4);
console.log(area); // 50.26548245743669