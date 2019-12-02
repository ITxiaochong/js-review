//快排
function quickSort2(arr) {
    //取中间的数字作为基准,当arr数组只有0/1个元素时会取到arr[0]
    if (arr.length < 2) return arr;
    let t = arr.splice(arr.length >> 1, 1);
    let left = [],
        right = [];
    //将arr中剩下的数字按照这个基准划分左右
    while (arr.length) {
        //小于基准数放左
        if (arr[0] < t) {
            left.push(arr.shift());
        } else {
            //大于等于基准数放右
            right.push(arr.shift());
        }
    }
    return quickSort2(left).concat(t, quickSort2(right));
}
console.log(quickSort2([0, 5, 6, 7, -1, 0, 2, 3, 2, 1, -9, 10, 99, 55, 22, 3, 33]))