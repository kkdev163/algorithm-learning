/**
 * 对binarySearch2.js中四个问题的优化解法
 * 在一个有序可能有重复数字的数组中
 * 1. 找到首个等于某值的元素
 * 2. 找到最后一个等于某值的元素
 * 3. 找到首个大于等于某值的元素
 * 4. 找到最后一个小于等于某值的元素
 */

const assert = require('assert');

function getMidInt(l, h) {
    return parseInt((l + (h - l) / 2));
}

// 找到首个等于某值的元素
function findFirstEle(array, x) {
    let l = 0;
    let h = array.length - 1;
    let m = getMidInt(l, h)
    while(l <=h ) {
        if (array[m] > x) {
            h = m - 1;
        } else if (array[m] < x) {
            l = m + 1;
        } else {
            if (m === 0 || array[m-1] !== x) { return m }
            h = m;
        }
        m = getMidInt(l, h);
    }
    return -1;
}

// 找到最后一个等于某值的元素
function findlastEle(array, x) {
    let l = 0;
    let h = array.length - 1;
    let m = getMidInt(l, h);

    while(l <= h) {
        if (array[m] > x) {
            h = m -1;
        } else if (array[m] < x) {
            l = m + 1;
        } else {
            if (m === array.length-1 || array[m+1]!== x) {return m;}
            l = m;
        }
        m = getMidInt(l, h);
    }
    return -1;
}

// 找到首个大于等于某值的元素
function findFirstNotLessEle(array, x) {
    let l = 0;
    let h = array.length - 1;
    let m = getMidInt(l, h);

    while(l <= h) {
        if (array[m] < x) {
            l = m + 1;
        } else {
            if (m === 0 || array[m-1] < x) {return m }
            h = m - 1;
        }
        m = getMidInt(l, h);
    }
    return -1;
}

// 找到最后一个小于等于某值的元素
function findLastNotGreatEle(array, x) {
    let l = 0;
    let h = array.length - 1;
    let m = getMidInt(l, h);
    while(l <= h) {
        if (array[m] > x) {
            h = m - 1;
        } else {
            if (m === array.length -1 || array[m+1] > x ) {return m;}
            l = m + 1;
        }
        m = getMidInt(l, h);
    }
    return -1;
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
    console.log('passed')
}
test()