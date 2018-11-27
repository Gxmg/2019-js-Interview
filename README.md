# 2019-js-Interview

2019年前端面试都聊啥？一起来看看

原文链接: [2019年前端面试都聊啥？一起来看看](https://juejin.im/post/5bf5610be51d452a1353b08d)

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

2. 以下代码在 JavaScript 中返回`false`。 请说明为什么：

    ```javascript
    //false
    0.1+0.2 === 0.3
    ```
    
    解决思路：首先这题考察的是js的Number数值类型采用的编码技术以及该技术的特点。
    这是这道题的详细链接知识。[点我跳转](https://www.cnblogs.com/fsjohnhuang/p/5115672.html)

    众所周知JS仅有Number这个数值类型，而Number采用的时IEEE 754 64位双精度浮点数编码。而浮点数表示方式具有以下特点：

      * 浮点数可表示的值范围比同等位数的整数表示方式的值范围要大得多；

      * 浮点数无法精确表示其值范围内的所有数值，而有符号和无符号整数则是精确表示其值范围内的每个数值；

      * 浮点数只能精确表示m*2e的数值；

      * 当biased-exponent为2e-1-1时，浮点数能精确表示该范围内的各整数值；

      * 当biased-exponent不为2e-1-1时，浮点数不能精确表示该范围内的各整数值。

    由于部分数值无法精确表示（存储），于是在运算统计后偏差会愈见明显。

    也就是说不仅是JavaScript会产生这种问题，只要是采用IEEE 754 Floating-point的浮点数编码方式来表示浮点数时，则会产生这类问题。下面我们来分析整个运算过程。

      * 0.1 的二进制表示为 1.1001100110011001100110011001100110011001100110011001 1(0011)+ * 2^-4；

      * 当64bit的存储空间无法存储完整的无限循环小数，而IEEE 754 Floating-point采用round to nearest, tie to even的舍入模式，因此0.1实际存储时的位模式是0-01111111011-1001100110011001100110011001100110011001100110011010；

      * 0.2 的二进制表示为 1.1001100110011001100110011001100110011001100110011001 1(0011)+ * 2^-3；

      * 当64bit的存储空间无法存储完整的无限循环小数，而IEEE 754 Floating-point采用round to nearest, tie to even的舍入模式，因此0.2实际存储时的位模式是0-01111111100-1001100110011001100110011001100110011001100110011010；

      * 实际存储的位模式作为操作数进行浮点数加法，得到 0-01111111101-0011001100110011001100110011001100110011001100110100。转换为十进制即为0.30000000000000004。


3. JavaScript 中有哪些不同的数据类型？

    最新的 ECMAScript 标准定义了 7 种数据类型:
    
      * 6种基本类型(原始类型):
           - Boolean
           - Null
           - Undefined
           - Number
           - String
           - Symbol (ECMAScript 6 新定义)
           
      * 和 引用类型(Object)    
      

4. 解决以下异步代码问题。

    获取并计算属于某个班级（假设 ID 为 75）的每个学生的平均分数。每个学生在一年内可以参加一门或多门课程。以下 API 可用于获取所需的数据。
    
    ```javascript
    // GET LIST OF ALL THE STUDENTS
    GET /api/students
    Response:
    [{
        "id": 1,
        "name": "John",
        "classroomId": 75
    }]
    // GET COURSES FOR GIVEN A STUDENT
    GET /api/courses?filter=studentId eq 1
    Response:
    [{
       "id": "history",
       "studentId": 1
    }, {
       "id": "algebra",
       "studentId": 1
    },]
    // GET EVALUATION FOR EACH COURSE
    GET /api/evaluation/history?filter=studentId eq 1
    Response:
    {
        "id": 200,
        "score": 50,
        "totalScore": 100
    }
    ```
    
    编写一个以班级 ID 作为参数的函数，你将使用这个函数计算该班级中每个学生的平均分数。这个函数的最终输出应该是带有平均分数的学生列表：
    
    ```javascript
    [
      { "id": 1, "name": "John", "average": 70.5 },
      { "id": 3, "name": "Lois", "average": 67 },
    ]
    ```
    
    使用普通回调、promises、observables、generator 或 async-await 编写所需的函数。尝试使用至少 3 种不同的技术解决这个问题。

    解决思路：emmmmm这道题我真的不是特别想解，因为如果要用普通回调和promises真的就要陷入了回调地狱了。心累，这边我就写一下async-await的方法吧。首先选择一个http请求库（`axios`，`ajax`，`fetch`都可以），我们这里选择用`axios`，在service目录下[getDate.js](https://github.com/se7en-1992/2019-js-Interview/blob/master/service/getDate.js)写好请求api等。

    ```javascript
    import { getStudents, getAllCourses, getEverylCourses } from '~/service/getData.js';

    const getAverage = async (classroomId) => {
      let temp = [];
      let score = {};
      let scoreList = [];
      let studentId = 0;
      let name = '';
      let total = 0;
      let result = [];
      try {
        const students = await getStudents();
        const filterClassroom = students.filter(x=>x.classroomId === classroomId);
        filterClassroom.map((item)=>{
          try {
            studentId = item.id;
            name = item.name;
            scoreList = [];
            temp = await getAllCourses(item.id);
            temp.map((v)=>{
              try {
                score = await getEverylCourses(v.id, v.studentId);
                scoreList.push(score);
                total = 0;
                scoreList.map((x)=>{
                  total+=x.score
                })
              } catch (e) {
                console.log('getEverylCourses接口出错，出错信息：'+e)
              }
            })
          } catch (e) {
            console.log('getAllCourses接口出错，出错信息：'+e)
          }
          result.push({id: studentId, name: name, average: total/scoreList.length})
        })
      } catch (e) {
        console.log('getStudents接口出错，出错信息：'+e)
      }
      return result;
    }

    getAverage(75) //[{ "id": 1, "name": "John", "average": 70.5 },{ "id": 3, "name": "Lois", "average": 67 }]

    ```
