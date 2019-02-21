const assert = require('assert');

/**
 *  基础排序算法实现练习
 *  冒泡、插入、选择
 *  并归、快排
 */

function swap(array, i, j) {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

function popoSort(array) {
    for(let i = 0, n = array.length; i < n; i++) {
        let sorted = true;
        for(let j = 0; j < n-i-1; j++) {
            if (array[j] > array[j+1]) {
                swap(array, j, j+1)
                sorted = false;
            }
        }
        if (sorted) break;
    }
}

function insertSort(array) {
    for(let i = 1, n = array.length; i<n; i++) {
        let j = i;
        while(array[j] < array[j-1] && j-1>=0) {
            swap(array, j , j-1)
            j--;
        }
    }
}

function selectSort(array) {
    for(let i = 0, n = array.length; i < n -1 ; i ++) {
        let min = i;
        for (let j = i+1; j < n; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        swap(array, i, min);
    }
}

function mergeSort(array) {
    let p = 0;
    let r = array.length - 1;
    _mergeSort(array, p, r);
}

function _mergeSort(array, p, r) {
    let q = parseInt((p + r) / 2);
    
    if (p >= r) {
        return
    }
    _mergeSort(array, p, q);
    _mergeSort(array, q+1, r);
    return _merge(array, p, q, r);
}

function _merge(array, p, q, r) {
    // 标志位有点多，能不能再优化下？
    const array1 = array.slice(p, q+1);
    const array2 = array.slice(q+1, r+1);
    let i = 0, j = 0;
    let n1 = array1.length;
    let n2 = array2.length;

    while(i < n1  && j < n2) {
        if (array1[i] < array2[j]) {
            array[p++] = array1[i++]; 
        } else {
            array[p++] = array2[j++];
        }
    }
    if (i === n1) {
        while(j < n2) {
            array[p++] = array2[j++];
        }
    }

    if (j === n2) {
        while(i < n1) {
            array[p++] = array1[i++]; 
        }
    }
}

function quickSort(array) {
    // 递推公式 quickSort(array, p, r) = quickSort(array, p, q) quickSort(array, q+1, r)
    let p = 0;
    let r = array.length - 1;
    _quickSort(array, p, r);  
}

function _quickSort(array, p, r) {
    if (p >=r ) {
        return
    }
    const q = _divide(array, p, r);
    _quickSort(array, p, q-1);
    _quickSort(array, q+1, r);
}

function _divide(array, p, r) {
    const sentry = array[r];
    let i = p;
    for (let j = p; j < r; j ++) {
        if (array[j] < sentry) {
            swap(array, i, j);
            i++;
        }
    }
    swap(array, i, r);
    return i;
}

function findKth(array, k) {
    let p = 0, r = array.length-1; 
    return _findKth(array, p, r, k);
}

function _findKth(array, p, r, k) {
    const t = _divide(array, p, r);
    if (t < k) {
        return _findKth(array, t+1, r, k);
    } else if (t > k) {
        return _findKth(array, p, t-1, k);
    }
    return array[t];
}


function test() {
    const testCases = [
        [1, 2, 3, 4],
        [4, 3, 2, 1],
        [3, 3, 1, 2],
        [3, 1, 2, 4]
    ]

    testCases.forEach((testcase, i) => {
        console.log(`case: ${i+1}`);
        [popoSort, insertSort, selectSort, mergeSort, quickSort].forEach(fn => {
            let tmp = [].concat(testcase);
            let sorted = [].concat(testcase).sort();
            fn(tmp);
            assert.deepEqual(tmp, sorted);
            console.log(`${fn.name} passed`)
        })
    })
    
    // 0~10 乱序，找到排序后的在k位的元素， k从0开始。
    const array = [7, 8, 9, 2, 4, 5, 6, 3, 0, 1, 10];
    const Kth = findKth(array, 5);
    assert.equal(Kth, 5);
    console.log('findKth passed ')
}

test()

