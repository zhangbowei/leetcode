let re = /(\w)\1+/g;
let num = 0;
let char = '';
let str = 'abcabcabcbbcccccc';

str = str.split('').sort().join('');

str.replace(re, ($0, $1) => {

    if (num < $0.length) {
        num = $0.length;
        char = $1;
    }
});

console.log(`字符最多的是${char}, 出现了${num}次`);