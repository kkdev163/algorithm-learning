function LinkNode(x) {
    this._x = x;
}

LinkNode.prototype.getValue = function () {
    return this._x;
}

LinkNode.prototype.setNext = function (next) {
    this._next = next;
}

LinkNode.prototype.getNext = function () {
    return this._next;
}

LinkNode.prototype.toString = function () {
    const items = []
    let pNode = this;
    do {
        items.push(pNode._x);
        pNode = pNode.getNext();
    } while(pNode);
    return `[${items.join(',')}]`
}

module.exports = {
    addHook: function (fn) {
        return function (...args) {
            const start = Date.now();
            console.log(fn.name + ' cost:' + (Date.now() - start));
            return fn.apply(this, args);
        }
    },
    generateData: (n, radix) => {
        const items = [];
        while (n--) {
            items.push(parseInt(Math.random() * radix));
        }
        return items;
    },
    arrayDeepEqual: (array1, array2) => {
        if (array1.length !== array2.length) {
            return false
        }
        for (let i = 0, n = array1.length; i < n; i++) {
            if (array1[i] !== array2[i]) {
                return false
            }
        }
        return true;
    },
    swap: (array, i, j) => {
        const tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    },
    abs: (x) => {
        return x > 0 ? x : -x
    },
    array2LinkList: (array) => {
        const n = array.length - 1
        let q = 1;
        let head = new LinkNode(array[0]);
        let pNode = head;
        while( q <= n ) {
            let cNode = new LinkNode(array[q++]);
            pNode.setNext(cNode);
            pNode = cNode;
        }
        return head;
    }
}