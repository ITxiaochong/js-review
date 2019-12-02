//归并排序
function merge(arr) {
    function mergeSort(arr) {
        if (arr.length < 2) return arr;
        let mid = arr.length >> 1;
        return devide(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
    }

    function devide(left, right) {
        let result = [];
        while (left.length && right.length) {
            if (left[0] <= right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        if (left.length) result = [...result, ...left];
        if (right.length) result = [...result, ...right];
        return result;
    }
    return mergeSort(arr);
}

console.log(merge([0, 5, 6, 7, -1, 0, 2, 3, 2, 1, -9, 10, 99, 55, 22, 3, 33]))