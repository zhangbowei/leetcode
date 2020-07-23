function mySetInterVal (fn, aN, bN) {
    let a = aN;
    let b = bN;
    let handler = -1;
    let times = 0;
    let start = () => {
        handler = setTimeout(() => {
            fn();
            ++times;
            start();
            console.log(a + times * b);
        }, a + b * times);
    }

    let end = () => {
        clearTimeout(handler);
    }

    return {
        start,
        end
    }
}

var obj = mySetInterVal(() => {console.log('1123')}, 1000, 2000);

// obj.start();
// obj.stop();

