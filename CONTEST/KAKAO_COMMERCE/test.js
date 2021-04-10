const participant = ["mislav", "stanko", "mislav", "ana"];
const completion = ["stanko", "ana", "mislav"];

var answer = '';
const ps = participant.sort();
const cs = completion.sort();
for(let key in ps){
    console.log(key);
    if(ps[key] !== cs[key]){
        answer = ps[key]
        break;
    }
}
console.log(answer);