/**
 * c语言qSort函数的js实现
 * 算法思路:
 *  - 数据量小于1M时选用并归排序, 反之使用快排。
 *  - TODO 快排为了避免栈溢出, 在堆上模拟函数栈。
 *  - 快排为了避免分布不均, 采用三数对比法优化。
 *  - 快排区间段数量小于4时, 为了减少调用栈，使用插入排序。
 *  - TODO 插入排序使用哨兵优化移动次数。
 * 
 * 练习总结:
 * quickSort:
 * 当数据很大，然后数据变化的范围很小时, 不适宜用快排。如用基数改为100时，即generateData(MILLION, 100)进行测试:
 * 实测来看，在一个范围内的数据很可能都是相同的。造成分割的不均，时间复杂度退化成O(n^2),并且很快达到栈溢出。
 * 解决方法可以在遍历取中法中，判断数组是否已经有序，若有序则返回-1，结束继续递归操作。
 * 传统的三数取中法：即对比区间首、中、尾三元素，取出值居中的元素值，作为分割哨兵。
 * 
 * mergeSort:
 * 在合并操作中，原本是想用shift来节省copy数组的下标记录。。但没想到反而造成了极大的性能退化。。
 * 因为shift操作，会移动整个数组。整体算法效率退化成O(n^2 * Logn)
 * 
 * 另外要注意下标的范围，几次调试来看，都是下标出错导致花费了较多调试时间
 * */

const { K, M , MILLION } = require('../utils/const');
const { addHook, generateData, arrayDeepEqual, swap, abs} = require('../utils');

function qSort(array) {
    // Fixme: 此处将数据类型当作 int 判断
    const n = array.length;
    const memoryCost = 4 * n;

    if (memoryCost < M ){
        mergeSort(array, 0, n-1);
        console.log('qSort use merge')
        return;
    }
    quickSort(array, 0, n-1);
    console.log('qSort use quick')
}

function mergeSort(array, p, q) {
    if (p >= q) { return; }
    const m = parseInt((p + q) / 2);
    mergeSort(array, p, m);
    mergeSort(array, m+1, q);
    merge(array, p, m, q);
}

function merge(array, p, m, q) {
    const array1 = array.slice(p, m+1);
    const array2 = array.slice(m+1, q+1);
    let n1 = array1.length;
    let n2 = array2.length;
    let r1 = 0;
    let r2 = 0;
    while(r1<n1 && r2<n2) {
        if (array1[r1] < array2[r2]) {
            // 刚开始直接shift元素来代替游标的记录，但出现性能问题后，才发现这是移动全量数组的操作，开销很昂贵。
            array[p++] = array1[r1++];
        } else {
            array[p++] = array2[r2++];
        }
    }
    while(r1 < n1) {
        array[p++] = array1[r1++]
    }
    while(r2 < n2) {
        array[p++] = array2[r2++]
    }
}

function quickSort(array, p, q) {
    if (p >= q) { return ;}
    if (q - p <= 4) {
        insertSort(array, p, q)
        return
    }
    const m = portion(array, p, q);
    if (m===-1) {return}
    quickSort(array, p, m-1);
    quickSort(array, m+1, q);
}

// 三数比较法，找到数组的中间元素下标
function findMiddle(array, p, q) {
    let min = p, max = p;
    for (let k = p; k < q; k++) {
        if (array[k] < array[min]) {
            min = k;
        }
        if (array[k] > array[max]) {
            max = k;
        }
    }
    if (min === max) {
        return -1;
    }
    let avg = (array[max] + array[min]) / 2;
    let avgIndex = p;
    for (let k = p; k < q; k++) {
        if (abs(array[k] - avg) < abs(array[avgIndex] - avg)) {
            avgIndex = k;
        }
    }
    return avgIndex;
}

function portion(array, p, q) {
    let i = p, j = p;
    let avgIndex = findMiddle(array, p, q);
    if (avgIndex === -1) { return -1; }
    swap(array, avgIndex, q)

    for (; j < q; j++) {
        if (array[j] < array[q]) {
            swap(array, i, j);
            i++;
        }
    }
    swap(array, i, q)
    return i;
}

function insertSort(array, p, q) {
    for (let i = p+1; i<=q; i++) {
        let j = i;
        while (j-1>=p && array[j] < array[j-1]) {
            swap(array, j, j-1);
            j--;
        }
    }
}

function mainTest() {
    const data = generateData(MILLION, 100);
    const tmp = data.slice();
    const hookQSort = addHook(qSort);
    const hookSort = addHook(Array.prototype.sort);
    hookQSort(tmp);
    hookSort.call(data, (a, b) => a - b)
    console.log('passed: ' + arrayDeepEqual(tmp, data));
}

mainTest();
