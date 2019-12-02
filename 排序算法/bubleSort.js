//冒泡排序
function bubleSort(arr) {
    let len = arr.length;
    let t;
    //需要len-2次循环
    for (let i = 1; i < len; ++i) {
        //每次循环选出一个最大的数,放到最后面
        for (let j = 0; j < len - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                //注意这里不能使用等号，否者前者和后者相等就交换了位置，算法失去了稳定性
                t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
        }
    }
    return arr;
}
console.log(bubleSort([0, 5, 6, 7, -1, 0, 2, 3, 2, 1, -9, 10, 99, 55, 22, 3, 33]))