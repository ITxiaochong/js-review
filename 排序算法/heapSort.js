function swap(tree, n, m) {
    let t = tree[n];
    tree[n] = tree[m];
    tree[m] = t;
}

function heapify(tree, n, i) {
    if (i >= n) return;
    let c1 = 2 * i + 1;
    let c2 = 2 * i + 2;
    let max = i; //默认max是根节点
    if (c1 < n && tree[c1] > tree[max]) max = c1;
    if (c2 < n && tree[c2] > tree[max]) max = c2;
    if (max != i) {
        swap(tree, max, i);
        heapify(tree, n, max);
    }
}

function build_heap(tree) {
    let last_node = tree.length - 1;
    let parent = (last_node - 1) >> 1;
    for (let i = parent; i >= 0; --i) {
        heapify(tree, tree.length, i);
    }
}

function heapSort(tree) {
    let len = tree.length;
    build_heap(tree);
    let res = [];
    for (let i = len - 1; i >= 0; --i) {
        swap(tree, i, 0); //交换最后一个和root
        res.unshift(tree.pop());
        heapify(tree, tree.length, 0); //重新对树进行heapify操作
    }
    return res;
}

console.log(heapSort([0, 5, 6, 7, -1, 0, 2, 3, 2, 1, -9, 10, 99, 55, 22, 3, 33]))