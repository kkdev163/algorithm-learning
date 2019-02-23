/**
 * 二分查找的循环实现、递归实现、求平方根精确到小数点6位、二分查找的链表实现(思考时间复杂度)
 */
const { generateData, array2LinkList, addHook, abs} = require('../utils');
const { MILLION } = require('../utils/const');
const assert = require('assert');

function getMidInt(l, h) {
    return parseInt(getMid(l, h));
}

function getMid(l, h) {
    return (l + (h - l) / 2)
}

function binarySearch(array, x) {
    let l = 0;
    let h = array.length - 1;
    let m = getMidInt(l, h);

    while(l<=h) {
        if (array[m] === x) {
            return m;
        } else if (array[m] > x) {
            h = m - 1;
        } else {
            l = m + 1;
        }
        m = getMidInt(l, h);
    }
    return -1;
}

// Recursion 递归版本
function binarySearchR(array, x) {
    let l = 0;
    let h = array.length -1;
    
    const _binarySearch = function(array, l, h, x) {
        if (l > h) { return -1; }

        let m = getMidInt(l, h);
        if (array[m] === x) {
            return m
        } else if (array[m] < x) {
            return _binarySearch(array, m+1, h, x);
        } else {
            return _binarySearch(array, l, m-1, x);
        }
    }
    return _binarySearch(array, l, h, x)
}

function pow2(x) {
    return x * x
}
// 平方根精确到小数点radix位
function getSqrt(x, radix=6) {
    if (x < 0) {
        return undefined;
    } else if (x === 1) {
        return 1;
    }

    let l = 0;
    let h = x > 1 ? x: 1
    let m = getMid(l, h);
    let precision = Math.pow(0.1, radix);

    while (abs(pow2(m) - x) > precision) {
        if (pow2(m) > x) {
            h = m;
        } else {
            l = m;
        }
        m = getMid(l, h);
    }
    return m;
}

function numberEqual(x, y, radix=6) {
    return x.toFixed(radix) === y.toFixed(radix);
}

function getLinkListLength(linkList) {
    let pNode = linkList;
    let l = 0;
    while (pNode) {
        l++;
        pNode = pNode.getNext();
    }
    return l;
}

function getLinkNodeByIndex(linkList, i) {
    let l = 0;
    let pNode = linkList;
    while(l++ < i) {
        pNode = pNode.getNext();
    }
    return pNode;
}


/**
 *  链表的二分查找
 */
function binarySearchL(linkList, x) {
    let l = 0;
    let h = getLinkListLength(linkList) - 1;
    let m = getMidInt(l, h);
    
    while(l <= h ) {
        let mNode = getLinkNodeByIndex(linkList, m);
        if (mNode.getValue() === x) {
            return m ;
        } else if (mNode.getValue() > x) {
            h = m - 1;
        } else {
            l = m + 1;
        }
        m =  getMidInt(l, h);
    }
    return -1;
}

binarySearch = addHook(binarySearch);
binarySearchR = addHook(binarySearchR);
getSqrt = addHook(getSqrt);
binarySearchL = addHook(binarySearchL);

function main() {
    const array = [...new Set(generateData(MILLION, 10 * MILLION))];
    array.sort((a, b) => a - b);
    const randomIndex = parseInt(Math.random() * array.length);
    const target = array[randomIndex];

    assert.equal(binarySearch(array, target), randomIndex, 'binarySearch fail');
    assert.equal(binarySearchR(array, target), randomIndex, 'binarySearchR fail');

    const linkList =  array2LinkList(array);
    assert.equal(binarySearchL(linkList, target), randomIndex, 'binarySearchL fail');

    assert.ok(numberEqual(getSqrt(randomIndex), Math.sqrt(randomIndex)), 'getSqrt fail');
    console.log('passed');
}

main();