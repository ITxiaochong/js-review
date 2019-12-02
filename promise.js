const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function Promise(excutor) {
    let that = this;
    this.status = PENDING;
    that.access = [];
    that.defend = [];

    function resolve(value) {
        that.value = value;
        try {
            if (value instanceof Promise && value.status === PENDING) {
                resolvePromise(that, value, resolve, reject);
            } else {
                that.status = FULFILLED;
                that.access.forEach(item => item());
            }
        } catch (e) {
            reject(e);
        }
    }

    function reject(reason) {
        that.value = reason;
        try {
            if (reason instanceof Promise && reason.status === PENDING) {
                resolvePromise(that, reason, resolve, reject);
            } else {
                that.status = REJECTED;
                that.defend.forEach(item => item());
            }
        } catch (e) {
            reject(e);
        }
    }
    try {
        excutor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}
Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    let that = this;
    let promise = new Promise(function(resolve, reject) {
        if (that.status === FULFILLED) {
            try {
                let x = onFulfilled(that.value);
                resolvePromise(promise, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        } else if (that.status === REJECTED) {
            try {
                let x = onRejected(that.value);
                resolvePromise(promise, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        } else {
            that.access.push(() => {
                try {
                    let x = onFulfilled(that.value);
                    resolvePromise(promise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            that.defend.push(() => {
                try {
                    let x = onRejected(that.value);
                    resolvePromise(promise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }
    });
    return promise;
};

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) { reject(new Error('Chaining cycle')); }
    if (x && typeof x === 'object' || typeof x === 'function') {
        try {
            if (typeof x.then === 'function') {
                x.then(r => {
                    resolvePromise(promise2, r, resolve, reject);
                }, v => {
                    resolvePromise(promise2, v, resolve, reject);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            reject(e);
        }
    } else {
        resolve(x);
    }
}

//测试
let promise2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(new Promise((resolve, reject) => {
                    resolve('ok1');
                }));
            })
        }));
    });
}).then(function(e) { console.log(e, 'ok2'); return e; }).then(function(e) { console.log(e) });