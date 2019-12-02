//快排
function quickSort1(arr, left, right) {
    if (left >= right) return;
    let i = left + 1, //左哨兵从left + 1开始记起
        j = right - 1; //右边哨兵从right开始记起
    let t = arr[left]; //记录基准数 并且作为交换变量使用
    while (i < j) {
        //右侧哨兵找一个小于基准的数字
        while (i < j && arr[j] >= t) --j;
        //左侧哨兵找一个大于基准的数字
        while (i < j && arr[i] <= t) ++i;
        //如果满足条件二者没有相遇,
        if (i < j) {
            let t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
    //基准归位(基准数与带归位数字交换)
    t = arr[left];
    arr[left] = arr[i];
    arr[i] = t;
    //从基准归位后的下标分割子任务
    quickSort1(arr, left, i - 1);
    quickSort1(arr, i + 1, right);
}
let test = [0, 5, 6, 7, -1, 0, 2, 3, 2, 1, -9, 10, 99, 55, 22, 3, 33];
quickSort1(test, 0, test.length);
console.log(test)