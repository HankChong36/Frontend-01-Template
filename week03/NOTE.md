# 每周总结可以写在这里# 每周总结可以写在这里
## 课程总结
+ JavaScript
- Atom
- Expression
- Statement
- Structure
- Program/Module

+ Atom
- Grammar
- 简单语句
- 组合语句
- 声明
  - FunctionDeclaration
  - GeneratorDeclaration
  - AsyncFunctionDeclaration
  - AsyncGeneratorDeclaration
  - VariableStatement
  - ClassDeclaration
  - LexicalDeclaration

+ Runtime
- Completion Record
- Lexical Environment

+ Completion Record
```
[[type]]:normal,break,continue,return,throw
[[value]]:types
[[target]]:label
```

+ 简单语句
- ExpressionStatement
- EmptyStatement
- DebuggerStatement
- ThrowStatement
- ContinueStatement
- BreakStatement
- ReturnStatement

+ 复合语句
- BlockStatement
- IfStatement
- SwitchStatement
- IterationStatement
  - while()
  - do...while();
  - for(;;){}
  - for( in ){}
  - for( of ){}
- WithStatement
- LabelStatement
- TryStatement
  ```
  try{

  }catch(){

  }finally{

  }
  ```
- 预处理
- 作用域