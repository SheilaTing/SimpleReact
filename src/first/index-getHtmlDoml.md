//渲染普通 html 标签


import ReactDom from './reactDom';
import React from '../react';

// webpack config.js 中配置了 js 或者 jsx文件，会使用 babel 来加载
// babel 会把代码转换为 let div =  React.createElement(tag,attr,childrenNode)
// 如果 createElement 方法不返回，那么 consoel.log(div) 就是 undefined
// 所以 我们把 babel 帮我们生成的这个方法的三个参数，这三个参数分别对应我们 html 的 标签，属性，和内容（以及标签嵌套的字标签）
// 所以我们把这些内容返回出去，那么 div 就可以接收到这三个参数，做进一步处理
// 就变成 let div = { tag,attr,child }
// 那么很显然如果我们直接打开生成的 index.html 会报错找不到 React,所以，我们需要定义一个 React



// let div = <div>hello </div>;
// console.log(div);

// 测试普通字符串对象
// let div ="hello";
// console.log(div1);
// console.log(typeof(div))


//现在 这个 div 通过 babel 以及 react.createElment 方法已经成为了一个 携带 tag,attr,children 的对象
// 那么我们就可以通过这三个对象，将这个div 像html 一样展示在浏览器中
// 具体就是，我们定义一个方法，把这个div 以及document.body 传递进去，经过处理

let str = 'world';
let styleObj = {
  color: 'red',
  fontSize: '30px'
};


let div =  <div className="wrap">
Hello {str} 
<button className="btn" onClick={()=> console.log('click me')}> Click me!</button>
<p style={styleObj}>I have style</p>
</div>
//调用 ReactDom render  传递标签，和容器
ReactDom.render(div, document.body);