//插入排序

function insertSort(arr) {
    let len = arr.length;
    for (let i = 1; i < len; ++i) {
        let t = arr[i];
        let j = i - 1;
        for (; arr[j] > t && j >= 0; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = t;
    }
    return arr;
}

console.log(insertSort([0, 5, 6, 7, -1, 0, 2, 3, 2, 1, -9, 10, 99, 55, 22, 3, 33]))