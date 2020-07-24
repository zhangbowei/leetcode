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

function debounce(fn, delay) {
    let time = Date.now();
    let handler;

    return function () {
        let args = Array.from(arguments);
        let now = Date.now();

        clearTimeout(handler);

        handler = setTimeout(() => fn.apply(this, args), delay);
    }
}

function throttle(fn, delay) {
    let time = Date.now();
    let handler;

    return function e() {
        let now = Date.now();

        if (now - time > delay) {
            setTimeout(() => fn.apply(this, args));
            time = now;
        } else {

        }
    }
}

var Yideng = (function() {
    var foo = 0;

    function Yideng() {}
    Yideng.prototype.bar = function bar() {
        return foo;
    };
    return Yideng;
}());
// 防止变量被污染
// 作用域 外部函数 内部变量

function get(source, path, defaultValue = undefined) {
    const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let result = source;

    for (let i = 0; i < paths.length; ++i) {
        result = result[paths[i]];
    }

    return result;
}

function curryIt(fn) {
    let len = fn.length;
    let args = [];

    const choiceFn = function () {
        let data = Array.from(arguments);
        args = args.concat(data);

        if (args.length > len) {
            return fn.apply(this, args);
        } else {
            return choiceFn;
        }
    }

    return choiceFn;
}

function Class1() {
    console.log('初始化');
}

Class1.prototype.method = function (param) {
    console.log(param)
    return this;
}

var a = new Class1();

var obj = {
    a: function() {
        console.log('a');
        return this;
    },
    b: function() {
        console.log('b');
        return this;
    }
}

obj.a().b().b();

let arrayLike = {
    length: 10
}

console.log(arrayLike instanceof Array);
console.log(arrayLike.toString());
console.log(arrayLike.valueOf());

var p = new myPromise(function(res, rej) {res()});
    p.then((x) => {console.log(x);})

function myPromise(constructor) {
    let self = this;

    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;

    function resolve(value) {
        if (self.status === 'pending') {
            self.value = value;
            self.status = 'res';
        }
    }

    function reject(value) {
        if (self.status === 'pending') {
            self.value = value;
            self.status = 'rej';
        }
    }
    try {
        constructor(resolve, reject);
    } catch(e) {
        reject(e);
    }

    this.then = function(onFullfilled, onRejected) {
        let self = this;

        switch(self.status) {
            case 'resolved': onFullfilled(self.value);
            case 'reject': onRejected(self.value);
            default:
        }
    }
}

function promiseAll(promises) {
    let len = promises.length;
    let resNum = 0, res = [];

    return new Promise(function (resolve, reject) {
        for(let i=0; i < len; ++i) {
            promises[i].then(val => {
                res.push(val);
                if (res.length === len) {
                    return resolve(res);
                }
            }, error => {
                return reject(error);
            })
        }
    });
}

class EventListener {
    listener = {};

    on(name, fn) {
        (this.listener[name] || (this.listeners[name] = [])).push(fn);
    }

    once(name, fn) {
        let tem = (...args) => {
            this.removeListener(name, fn)
        }
    }

    removeListener(name, fn) {
        if (this.listener[name]) {
            this.listener[name] = this.listener[name].filter((listener) => listener !== fn);
        }
    }

    removeListenerAll(name) {
        if (this.listener[name]) {
            this.listener[name] = [];
        }
    }

    emit(name, args) {
        if (this.listener[name]) {
            this.listener[name].forEach(fn => fn.apply(this, args));
        }
    }
}

let input = [
    {
        id: 1, val: '学校', parentId: null
    },
    {
        id: 2, val: '班级1', parentId: 1
    },
    {
        id: 2, val: '班级2', parentId: 1
    },
    {
        id: 2, val: '学生1', parentId: 2
    },
    {
        id: 2, val: '学生2', parentId: 3
    },
    {
        id: 2, val: '学生3', parentId: 4
    }
];

function arrayToTree(array) {
    let root = array[0];
    array.shift();
    let tree = {
        id: root.id,
        val: root.val,
        children: array.length > 0 ? toTree(root.id, array) : []
    }

    return tree;
}

function toTree(parentId, array) {
    let children = [];
    let len = array.length;

    for(let i = 0; i < len; ++i) {
        let node = array[i];

        if (node.parentId === parentId) {
            children.push({
                id: node.id,
                val: node.val,
                children: toTree(node.id, array)
            });
        }
    }

    return children;
}

var a = [[1, 2, 3], [[1, 2], 2]];

function flat(arr) {
    let res = [];

    arr.map(item => {
        Array.isArray(item) ? res = res.concat(flat(item)) : res.push(item)
    })

    return res;
}

function inherit(Child, Parent) {
    let F = function() {}

    F.prototype = Parent;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}

