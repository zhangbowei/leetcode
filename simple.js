class Singleton {
    constructor() {
        console.log('test')
    }
}

function Singleton() {
    this.a = 'test'
}

Singleton.getInstance = (function() {
    let instance;
            instance = new Singleton()
            console.log('123');


    return function() {
        if(!instance) {
        }

        return instance;
    }
})()

Singleton.getInstance();