//Array.prototype.reduce
Array.prototype.Reduce = function(callback, initialVal) {
    let len = this.length;
    const checkType = Object.prototype.toString.call.bind(Object.prototype.toString);
    let i = 0;
    if (checkType(initialVal) === '[object Null]' || checkType(initialVal) === '[object Undefined]') {
        i = 1;
        initialVal = this[0];
    }
    while (i < len) {
        //index是从1开始的,并且如果数组中存在empty项目 [,<empty>,],依旧j++,但是不调用callback函数
        if (!this.hasOwnProperty(i)) {
            i++;
            continue;
        }
        initialVal = callback(initialVal, this[i], i++, this);
    }
    return initialVal;
};
//Array.prototype.flat
Array.prototype.Flat = function() {
    let temp = 0,
        i = 0;
    while (i < this.length) {
        if (Object.prototype.toString.call(this[i]) === '[object Array]') {
            temp = this[i].length; //后面的项目往后算打开后的数组len - 原来占用一个位置1
            this.splice(i, 1, ...this[i]); //Don't Worry,这里this[i]是splice在去除i项之前的
        } else {
            temp = 1;
        }
        i += temp;
    }
    return this;
}
//deepClone
function dpClone(o) {
    const checkType = Object.prototype.toString.call.bind(Object.prototype.toString);
    let result = checkType(o) === '[object Object]' ? {} : [];
    for (let index in o) {
        if (checkType(o[index]) === '[object Object]') {
            result[index] = dpClone(o[index]);
        } else if (checkType(o[index]) === '[object Array]') {
            result[index] = [];
            for (let i = 0; i < o[index].length; ++i) result[index][i] = o[index][i];
        } else {
            result[index] = o[index];
        }
    }
    return result;
}