# 第九周总结

### CSS动画与绘制

- Animation

  - @keyframes定义
  - animation使用

  ```css
  @keyframes flash{
  	from{
  		background:red;
  	}
  	to{
  		background:yellow;
  	}
  }  

  div{
  	animation: flash 5s infinite;
  }
  
  ```
  
  - 属性
    - animation-name：时间曲线
    - animation-duration：动画时长
    - animation-timing-function：动画的时间曲线
    - animation-delay：动画开始前的延迟
    - animation-iteration-count：动画播放次数
    - animation-direction：动画方向
    
  ```css
    @keyframes transition{
    	0%{top:0;transition:top ease;}
    	50%{top:30px;transition:top ease-in;}
    	75%{top:10px;transition:top ease-out;}
    	100%{top:0;transition:top linear;}
    }
    ```


​    

- Transition
  - transition-property：要变换的属性
  - transition-duration：要变幻的时长
  - transition-timing-function：时间曲线
  - transition-delay：延迟


### CSS渲染与颜色

- 颜色
  - CMYK与RGB
  - HSL与HSV
- 形状
  - border
  - box-shadow
  - border-radius
  - data uri+svg


#### HTML

- HTML的定义：XML与SGML

  - DTD与XML namespace
    - https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
    - http://www.w3.org/1999/xhtml
- 合法元素
  - Element:< tagname></ tagname>
  - Text:text
  - Comment:< !-- comments-->
  - DocumentType:< !Doctype html>
  - ProcessingInstruction:< ?a 1?>
  - CDATA:< ![CDATA[ ]] >
- 字符引用
  - &3161；
  - &amp；
  - &lt；
  - &gt；



### DOM

##### Node

- Element：元素型节点，跟标签相对应
- Document：文档根节点
- CharacterData：
- DocumentFragment：文档片段
- DocumentType：文档类型

- ##### 导航类操作
  - parentNode
  - childNodes
  - firstChild
  - lastChild
  - nextSibling：返回某个元素之后紧跟的节点:
  - previousSibling

- ##### 修改操作
  
  - appendChild
  - insertBefore
  - removeChild
  - replaceChild
- ##### 高级操作
  
  - compareDocumentPosition：是一个用于比较两个节点中关系的函数
  - contains：检查一个节点是否包含另一个节点的函数
  - isEuqalNode：检查两个节点是否完全相同
  - isSameNode：检查两个节点是否是同一个节点，实际上在JavaScript中可以用“===”
  - cloneNode：复制一个节点，如果传入参数true，则会连同元素做深拷贝



##### Event

- 冒泡与捕获
- element.addEventListener(event, function, useCapture)
  - event:必须。字符串，指定事件名。
  - function: 必须。指定要事件触发时执行的函数。
  - useCapture:可选。布尔值，指定事件是否在捕获或冒泡阶段执行。
    - true：在捕获阶段执行
    - false：默认，在冒泡阶段执行
- 先捕获后冒泡





