import ReactDom from './reactDom';
// return 一个对象出来
function createElement(tag, attr, ...children) {
    return {
        tag, attr, children
    }
}

//可以用 class,也可以用 function,接收属性变量，提供 setState 方法
class Component{
    constructor(props){
        this.props = props;
        this.state = {};
    }
    setState(newState){
        Object.assign(this.state,newState)
        //setState 后 我们需要重新渲染dom 才能够达到更改dom 的效果
        //因为 渲染 dom 的行为都是 reactDom 做的，所以我们在 reactDom 中定义这个方法
        //调用时传递当前对象进去，this 就是谁调用这个 setState 方法就是谁,这个例子中就是 App 组件
        ReactDom.renderComponent(this);
    }
}

const React = {
    createElement,
    Component
}

// module.exports = React;  因为我上面使用了 import es6 或者 comoonjs 规范只能使用一种
export default React;  

// 这里同理也可以拆分为 export 变量的方法