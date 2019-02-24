/**
 * depressed 更优解法见 binarySearch3.js
 * 在一个有序可能有重复数字的数组中
 * 1. 找到首个等于某值的元素
 * 2. 找到最后一个等于某值的元素
 * 3. 找到首个大于等于某值的元素
 * 4. 找到最后一个小于等于某值的元素
 */
const assert = require('assert');

function getMidInt (l, h) {
    return parseInt((l + (h - l) / 2));
}

function _binarySearch(array, l, h, x) {
    let mid = getMidInt(l, h);
    while (l <= h) {
        if (array[mid] === x) {
            return mid;
        } else if (array[mid] > x) {
            h = mid - 1;
        } else {
            l = mid + 1;
        }
        mid = getMidInt(l, h);
    }
    return -1;
}

// 找到首个等于某值的元素
function findFirstEle(array, x){
    let l = 0;
    let h = array.length - 1;
    let last = -1;
    while(h !== -1) {
        h = _binarySearch(array, l, h, x);
        if (last === h) {
            return last;
        }
        if (h !== -1) {
            last = h
        }
    }
}

// 找到最后一个等于某值的元素
function findlastEle(array, x) {
    let l = 0;
    let h = array.length -1;
    let last = -1;
    while(l !== -1) {
        l = _binarySearch(array, l, h, x);
        if (last === l) {
            return last;
        }
        if (l !== -1) {
            last = l
        }
    }
}

// 找到首个大于等于某值的元素
function findFirstNotLessEle(array, x) {
    let l = 0;
    let h = array.length -1;
    let last = -1;

    const _binarySearchNotLess = function (array, l, h, x) {
        let mid = getMidInt(l, h);
        while(l<=h) {
            if (array[mid] >= x) {
                return mid;
            }
            l = mid + 1;
            mid = getMidInt(l, h);
        }
        return -1;
    }
    while(h !== -1) {
        h = _binarySearchNotLess(array, l, h, x);
        if (h !== -1) {
            last = h;
            h = h - 1
        }
    }
    return last;
}

// 找到最后一个小于等于某值的元素
function findLastNotGreatEle(array, x) {
    let l = 0;
    let h = array.length - 1;
    let last = -1;

    const _binarySearchNotGreat = function (array, l, h, x) {
        let mid = getMidInt(l, h);
        
        while (l <= h) {
            if (array[mid] <= x) {
                return mid;
            }
            h = mid - 1;
            mid = getMidInt(l, h);
        }
        return -1;
    }
    while (l !== -1) {
        l = _binarySearchNotGreat(array, l, h, x);
        if (l !== -1) {
            last = l;
            l = l + 1;
        }
    }
    return last
}

function test() {
    var data = [1, 3, 3, 3, 3, 3, 3, 3, 4, 4];
    assert.equal(findFirstEle(data, 3), 1);
    assert.equal(findlastEle(data, 3), 7);

    data = [1, 2, 4, 4, 5]
    assert.equal(findFirstNotLessEle(data, 3), 2);
    assert.equal(findFirstNotLessEle(data, 1.1), 1);

    assert.equal(findLastNotGreatEle(data, 3), 1);
    assert.equal(findLastNotGreatEle(data, 4.1), 3);

}
test()