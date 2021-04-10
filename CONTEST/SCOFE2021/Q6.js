// Run by Node.js
const readline = require('readline');
let N; 
let input;
let cnt = 0;
(async () => {
	let rl = readline.createInterface({ input: process.stdin });
	for await (const line of rl) {
        input = N && line;
        N = N || line;
        if (input) {
            for (let i = 0 ; i < input.length ;i++) {
                input[i] = patseInt(input[i].split(''));
            }
            
            
            
            console.log(cnt);
            rl.close();
        }
	}
	
	process.exit();
})();
