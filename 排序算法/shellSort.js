//希尔排序
function shellSort(arr) {
    let len = arr.length;
    let gap = 0;
    while (gap < len) {
        gap = gap * 3 + 1;
    }
    for (; gap; gap = Math.floor(gap / 3)) {
        //插入排序
        for (let i = gap; i < len; i += gap) {
            let t = arr[i];
            let j = i - gap;
            for (; arr[j] > t && j >= 0; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = t;
        }
    }
    return arr;
}
console.log(shellSort([0, 5, 6, 7, -1, 0, 2, 3, 2, 1, -9, 10, 99, 55, 22, 3, 33]))