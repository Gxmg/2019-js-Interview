# 2019-js-Interview

2019年前端面试都聊啥？一起来看看

原文链接 [2019年前端面试都聊啥？一起来看看](https://juejin.im/post/5bf5610be51d452a1353b08d)

### 基本的JavaScript问题

1. 使以下代码正常运行:
```javascript
const a = [1, 2, 3, 4, 5];

a.multiply();

console.log(a); // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]
```

解决思路：首先分析这道题目，初始化一个数组,然后调用**数组的一个方法** 然后**原数组改变**并且后面增加的长度是原数组长度且每个元素是原来每个元素的平方。

所以说重点就是这两个:首先是要**给数组添加一个方法**，然后是**使原数组改变**。至于循环什么我相信大家有一百种方法去实现。下面给出两种解法:

```javascript
//第一种
Array.prototype.multiply = function () {  //给数组原型上添加一个方法
    this.push(...this.map(x => x * x)); //改变原数组
    return this;
};

const a = [1, 2, 3, 4, 5];

a.multiply();

console.log(a); // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]

//第二种
Array.prototype.multiply = function() {
  Object.assign(this, [...this, ...this.map(n => n * n)]);
}

const a = [1, 2, 3, 4, 5];

a.multiply()

console.log(a);
```

