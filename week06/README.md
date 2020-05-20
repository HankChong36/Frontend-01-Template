# 每周总结可以写在这里
###  有限状态机处理字符串
- 每一个状态都是一个机器
  - 每一个机器都可以计算、输、出存储。。。
  - 所有的机器接受一直输入
  - 每个机器本身没有状态
- 每一个机器都知道下一个状态
  - 每个机器都有确定的下一个状态 (Moore)
  - 每个机器根据输入决定下一个状态 (Mealy)


``` Javascript
// 找到 a
function match(string) {
  for (let c of string) {
    if (c === "a") return true;
  }
  return false;
}
console.log(match("I am good"));
```  

``` Javascript
// 找到 ab
function match(string) {
  let foundA = false;
  for (let c of string) {
    if (c === "a") {
      foundA = true;
    } else if (foundA && c === "b") {
      return true;
    } else {
      foundA = false;
    }
  }
  return false;
}
console.log(match("ab"));
```  

``` Javascript
// 找到 abcdef
function match(string) {
  let foundA = false;
  let foundB = false;
  let foundC = false;
  let foundD = false;
  let foundE = false;
  for (let c of string) {
    if (c === "a") {
      foundA = true;
    } else if (foundA && c === "b") {
      foundB = true;
    } else if (foundB && c === "c") {
      foundC = true;
    } else if (foundC && c === "d") {
      foundD = true;
    } else if (foundD && c === "e") {
      foundE = true;
    } else if (foundE && c === "f") {
      return true;
    } else {
      foundA = false;
      foundB = false;
      foundC = false;
      foundD = false;
      foundE = false;
    }
  }
  return false;
}
console.log(match("abcdef"));
````  

### JS 中的有限状态机(Mealy)
``` JavaScript
// 每个函数是一个状态
function state(input){
  return next
}
while(input){
  state = state(input)
}
```  

- [找到 abcdef (Mealy 状态机)](./mealy-status-meachine.js)




#### 作业：
- [状态机处理 abababx](./mealy-status-meachine.js)    
- [easy-browser](./../easy-browser)


## [winter HTML 解析 DEMO](../assets/index.html)



