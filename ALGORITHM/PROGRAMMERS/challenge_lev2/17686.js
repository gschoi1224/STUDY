const solution = files =>
    files.sort((a, b) => {
        let headerA = '';
        let headerB = '';
        let numberA = '';
        let numberB = '';
        let finishA = false;
        let finishB = false;
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            if (!numberA && !/[0-9]/g.test(a[i])) headerA += a[i].toUpperCase();
            if (!numberB && !/[0-9]/g.test(b[i])) headerB += b[i].toUpperCase();
            if (!/[0-9]/g.test(a[i]) && numberA) finishA = true;
            if (!/[0-9]/g.test(b[i]) && numberB) finishB = true;
            if (/[0-9]/g.test(a[i]) && !finishA) numberA += a[i];
            if (/[0-9]/g.test(b[i]) && !finishB) numberB += b[i];
        }
        console.log(headerA, headerB, Number(numberA), Number(numberB));
        if (headerA !== headerB) {
            const arr = [headerA, headerB].sort();
            return arr.indexOf(headerA) - arr.indexOf(headerB);
        }
        if (Number(numberA) !== Number(numberB)) {
            return Number(numberA) - Number(numberB);
        }
        return 0;
    });

console.log(
    solution([
        'img12.pn44g',
        'img10.p3ng',
        'img02.pn45g',
        'img1.pn4g',
        'IMG01.5GIF',
        'img2.JP4G',
    ]),
); // ["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"]
console.log(
    solution([
        'F 5 Freedom Fighter',
        'B 50 Superfortress',
        'A 10 Thunderbolt II',
        'F.16 Tomcat',
        'F 14 Tomcat',
        'F-15 Tomcat',
        'F.15 Tomcat',
        'F 16 Tomcat',
        'F 13 Tomcat',
    ]),
); //  ["A-10 Thunderbolt II", "B-50 Superfortress", "F-5 Freedom Fighter", "F-14 Tomcat"]
