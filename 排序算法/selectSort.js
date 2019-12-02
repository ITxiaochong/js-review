//直接选择排序
function selectSort(arr) {
    let len = arr.length;
    let t;
    for (let i = 0; i < len; ++i) {
        let min = i;
        for (let j = i + 1; j < len; ++j) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        t = arr[i];
        arr[i] = arr[min];
        arr[min] = t;
    }
    return arr;
}
console.log(selectSort([0, 5, 6, 7, -1, 0, 2, 3, 2, 1, -9, 10, 99, 55, 22, 3, 33]))