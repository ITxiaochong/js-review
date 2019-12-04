    //闭包
    let res1 = [];
    let res2 = [];
    //两个for只有定义i这个变量时使用关键字不同
    for (var i = 0; i < 10; i++) {
        res1[i] = function() {
            return i;
        }
    }
    for (let i = 0; i < 10; i++) {
        res2[i] = function() {
            return i;
        }
    }

    for (let item in res1) {
        res1[item] = res1[item]();
    }
    for (let item in res2) {
        res2[item] = res2[item]();
    }
    console.log(res1); //[10,...,10]
    console.log(res2); //[0,1,...,9]
    //Instanceof
    function Instanceof(o, P) {
        if (!o || !P) return false;
        while (o.__proto__) {
            if (o.__proto__ === P.prototype) {
                return true;
            }
            o = o.__proto__;
        }
        return false;
    }
    //Typeof 可识别null/object
    function Typeof(o) {
        const checkType = Object.prototype.toString.call.bind(Object.prototype.toString);
        switch (checkType(o)) {
            case '[object Object]':
                return 'object';
            case '[object Function]':
                return 'function';
            case '[object Number]':
                return 'number';
            case '[object String]':
                return 'string';
            case '[object Null]':
                return 'null';
            case '[object Undefined]':
                return 'undefined';
            case '[object Boolean]':
                return 'boolean';
            case '[object BigInt]':
                return 'bigint';
            case '[object Symbol]':
                return 'symbol';
        }
    }

    //New的实现
    function New(constructor, ...args) {
        let o = {};
        constructor = typeof constructor === 'function' ? constructor : function() {};
        o.__proto__ = constructor.prototype; //这一步骤决定最后打印出来的o这个对象的类型
        console.log(args)
        constructor.Apply(o, args); //至于打印出来的对象标识 取决于 原型上的constructor属性指向的函数名字
        return o;
    }

    //Call的实现
    Function.prototype.Call = function(that) {
        //这里需要一个不会重复的键值作为{key:value}中的key
        const fn = Symbol('fn'); //如果不是用ES6中的Symbol 自己创建一个(Math.random() + new Date().getTime()).toString(32).slice(8)
        //这里将除that外的参数列表转换为数组,以为arguments中有Symbol.iterator所以可以使用of和...这两个操作
        //其实还可以使用 Array.prototype.slice.call(arguments).slice(1);
        const args = [...arguments].slice(1);
        //如果that 为 undefined/null 这时this指向window
        that = that || window;
        //将独一无二的key 配上 value:Call的调用函数
        that[fn] = this;
        //执行这个函数,并将结果在最后返回
        const res = that[fn](...args);
        //不要忘记删除这个属性
        delete that[fn];
        return res;
    };
    //Apply的实现
    Function.prototype.Apply = function(that) {
        let fn = Symbol('fn');
        let args = arguments[1];
        that = that || window; //undefined / null that ->window
        that[fn] = this;
        let res = that[fn](...args);
        delete that[fn];
        return res;
    };
    //Bind的实现依赖Apply/Call
    Function.prototype.Bind = function(that) {
        that = that && (typeof that === 'object' || typeof that === 'function') ? that : window;
        let args = Array.prototype.slice.call(arguments).slice(1);
        let self = this;

        let bound = function() {
            //判断是否通过new调用这个函数
            //如果是 new bound(),构造函数中的this被绑定到了一个被指定__proto__ == <constructor>.prototype
            //这时候使用 this instanceof pure
            return self.Apply(Instanceof(this, bound) ? this : that, args.concat(...arguments));
        }
        //箭头函数的prototype是undefined
        //这里吧bound.prototype 改变到了调用bind函数的self上
        if (self.prototype) {
            bound.prototype = self.prototype;
        }
        return bound;
    }