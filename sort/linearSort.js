const assert = require('assert');

/**
 *  线性排序算法实现练习
 *  桶排序、计数排序、基数排序
 */

 /**
  * 桶排序
  * 给100万个员工的年龄进行排序
  */
function bucketSort(array, getBucketfn) {
    let n = array.length;
    const bucketMap = {}
    for(let i=0; i<n; i++) {
        let bucket = getBucketfn ? getBucketfn(array[i]) : array[i];
        if (!bucketMap[bucket]) {
            bucketMap[bucket] = []
        }
        bucketMap[bucket].push(array[i])
    }
    const keys = Object.keys(bucketMap);
    let m = keys.length
    let p = 0;
    while(m>0) {
        let min = 0;
        for(let i=1; i<m; i++){
            if (keys[i] < keys[min]) {
                min = i
            }
        }
        let members = bucketMap[keys[min]];
        // 此处年龄相同，桶内无需再排序
        // 其他问题，可用并归排序对桶内元素进行排序
        for(let i=0,n=members.length; i<n;i++) {
            array[p++] = members[i];
        }
        keys.splice(min, 1);
        m--;
    }
 }

const MILLION = 1000000

function generateRandom(count, radix) {
    const items = [];
    for (let i = 0; i < count; i++) {
        items.push(radix + parseInt(Math.random() * radix))
    }
    return items;
}

function addHook(fn) {
    return function (...args) {
        const start = new Date();
        fn.apply(this, args)
        console.log(fn.name + ' cost:' + (Date.now() - start))
    }
}
Array.prototype.sort = addHook(Array.prototype.sort);
bucketSort = addHook(bucketSort);

function bucketTest() {
     const members = generateRandom(MILLION, 20)
     
     const tmp = members.slice();
     bucketSort(tmp);
     start = Date.now();
     members.sort();
     assert.deepEqual(tmp, members);
     console.log('bucketSort passed');
}

/**
 * 计数排序
 * 给100万个考生的分数排序
 */

function countingSort(array) {
    const n = array.length;
    let min = array[0];
    let max = array[0];

    for(let i=1; i<n; i++) {
        if (min > array[i]) {
            min = array[i];
        }
        if (max < array[i]) {
            max = array[i];
        }
    }

    const offset = min;
    const c = [];
    for(let i = 0; i <= max-offset; i++) {
        c[i]= 0
    }

    for(let i = 0; i < n; i++ ) {
        let score = array[i] - offset
        c[score]++
    }

    for(let i =1, m=c.length; i<m ; i++) {
        c[i] = c[i] + c[i-1];
    }

    const r = [];
    for(let i = n-1; i>=0; i--) {
        r[c[array[i] - offset] - 1] = array[i]
        c[array[i] - offset]--;
    }

    for(let i = 0; i<n; i++) {
        array[i] = r[i];
    }
}


countingSort = addHook(countingSort);
function countingTest() {
    const scores = generateRandom(MILLION, 200);
    const tmp = scores.slice();
    countingSort(tmp);
    scores.sort();
    assert.deepEqual(tmp, scores);
    console.log('countingSort passed') 
}


/**
 * 基数排序
 * 对100万个手机号码进行排序
 */
 function generateRandomPhone(count) {
    const items = [];
    for(let i=0; i< count; i++) {
        let phone = ['1', '5', '0']
        for(let j =0; j<9; j++) {
            phone.push(parseInt(Math.random() * 10))
        }
        items.push(phone.join(''))
    }
    return items;
 }

 function radixSort(array) {
    let radixIndex = array[0].length - 1;
    while(radixIndex>=0) {
        bucketSort(array, phone => phone[radixIndex])
        radixIndex--
    }
 }

 radixSort = addHook(radixSort);
 
 //fixme: 从测试结果来看基数排序未体现出时间复杂度更低。。
 function radixTest() {
    const phones = generateRandomPhone(MILLION);
    const tmp = phones.slice();
    radixSort(tmp);
    phones.sort();
    for(let i =0,n=phones.length; i<n; i++) {
        assert.equal(tmp[i], phones[i]);
    }
    console.log('radixTest passed');
 }

function main() {
    bucketTest();
    countingTest();
    radixTest();
}
main();