# 每周总结可以写在这里

##  浏览器排版

Main (主轴)：元素排布方向  
Cross (交叉轴):与主轴垂直

```css
  flex-direction: row;
  flex-direction: column;
```

### 步骤

1. 处理属性
2. 收集元素入行

- 根据主轴尺寸，把元素分行
- 若设置了 no-wrap, 则强行分配进第一行

3. 计算主轴

- 找出所有 Flex 元素
- 把主轴方向的剩余尺寸按比例分配给这些元素
- 若剩余空间为负数，所有 flex 元素 flex 为 0，等比压缩剩余元素

4. 计算交叉轴

- 根据每一行中最大元素尺寸计算行高
- 根据行高 flex-align 和 item-align，确定元素具体位置  





### 作业：
- [crawer-css](./../crawer-css)    
- [easy-browser](./../easy-browser)
