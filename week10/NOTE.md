

## DOM

### Range API

[Range](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)表示一个文档片段。批量，精细操作DOM树。  
Range API是DOM API的一部分

* var range = new Range()
* range.setStart(elment, 9)
* range.setEnd(element, 4)
* var range = document.getSelection().getRangeAt(0)

* range.setStartBefore
* range.SetEndBeofore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents

* var fragment = range.extractContents()
* range.insertNode(document.createTextNode('abc'))

## CSSOM API

document.styleSheets

### Rules

* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule('p { color: pink; }', 0)
* document.styleSheets[0].removeRule(0)

### Rule

对应 at-rule

* CSSStyleRule
* CSSCharsetRule
* CSSImportRule
* CSSMdediaRule
* CSSFontFaceRule
* CSSPageRule
* CSSNamespaceRule
* CSSKeyframesRule
* CSSKeyframeRule
* CSSSupportsRule
* CSSStyleRule

### getComputedStyle

* window.getComputedStyle(elt, pseudoElt);
  * elt: 想要获取的元素
  * pseudoElt 可选，伪元素

## CSSOM views

### 窗口API

* moveBy(x, y)
* mobeTo(x, y) 
* resizeBy(x, y)
* resizeTo(x, y)
* window.open

### 视口滚动API

* window.scrollX
* window.scrollY

* window.scroll(x, y) 
* window.scrollBy(x, y) 

### 元素滚动API

* element.scrollLeft
* element.scrollTop 
* element.scrollWidth 
* element.scrollHeight 

* element.scrollBy(x, y)
* element.scrollTo(x, y)
* element.scrollIntoView(arg)

* scroll事件

### 布局API

* window.innerHeight, window.innerWidth 
* window.outerHeight, window.outerWidth
* window.devicePixelRatio 
* window.screen 
#### 元素的布局信息

计算盒的实际位置

element.getClientRects  
会返回一个列表，里面包含元素对应的每一个盒所占据的客户端矩形区域，这里每一个矩形区域可以用 x, y, width, height 来获取它的位置和尺寸。

element.getBoundingClientRects  
这个 API 的设计更接近我们脑海中的元素盒的概念，它返回元素对应的所有盒的包裹的矩形区域，需要注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域。

