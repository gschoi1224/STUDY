// Run by Node.js
const readline = require('readline');

let N;  // 총 인원수 1 <= N <= 20
let input = [];   
let startTime;  // 시작 시간
let endTime;    // 끝 시간

(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	for await (const line of rl) 
    {
        input = N ? input.concat(line) : [];
        N = N || parseInt(line);
        if (input.length === N) {
            input.map(item => {
                const myStart = item.split(' ~ ')[0];
                const myEnd = item.split(' ~ ')[1];
                const myStartHH = parseInt(myStart.split(':')[0]);
                const myStartMM = parseInt(myStart.split(':')[1]);
                const myEndHH = parseInt(myEnd.split(':')[0]);
                const myEndMM = parseInt(myEnd.split(':')[1]);
                if (!startTime && !endTime) {
                    startTime = myStart;
                    endTime = myEnd;
                } else {
                    const cmStartHH = parseInt(startTime.split(':')[0]);
                    const cmStartMM = parseInt(startTime.split(':')[1]);
                    const cmEndHH = parseInt(endTime.split(':')[0]);
                    const cmEndMM = parseInt(endTime.split(':')[1]);
                    if (myStartHH > cmStartHH || (myStartHH === cmStartHH && myStartMM > cmStartMM))
                        startTime = myStart;
                    if (myEndHH < cmEndHH || (myEndHH === cmEndHH && myEndMM < cmEndMM)) 
                        endTime = myEnd;
                }
             });
            
            let output = `${startTime} ~ ${endTime}`;
            if (startTime && endTime) {
                const cmStartHH = parseInt(startTime.split(':')[0]);
                const cmStartMM = parseInt(startTime.split(':')[1]);
                const cmEndHH = parseInt(endTime.split(':')[0]);
                const cmEndMM = parseInt(endTime.split(':')[1]);
                if (cmStartHH > cmEndHH || (cmStartHH === cmEndHH && cmStartMM > cmEndMM)) {
                    output = -1;
                }
            } else {
                output = -1;
            }
            console.log(output);
            rl.close();
        }
	}
	
	process.exit();
})();
