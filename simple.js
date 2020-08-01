function myInstanceOf(left, right) {
    let proto = left.prototype;

    while(true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        proto = proto.__proto__;
    }
}