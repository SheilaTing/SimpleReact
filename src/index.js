// 为了练习方便，我把之前渲染 普通 html 标签的代码拷贝了一份，
// 渲染 自定义 标签模块
import ReactDom from './reactDom';
import React from './react';


function Title(){
    return (<h3>这个使用function 方法写的自定义组件</h3>)
}

class Menue extends React.Component{
    render(){
        return (<h3>这里是menue 菜单呀</h3>)
    }
}
//babel 会把我们的代码 转换为 React.createElement(App,attr,children)
//组建中可能会有一些 变量来存储一些内容，例如 state,所以 我们 为了简化 
//这个 标签模块，让它继承一个 我们定义好的带有这些变量的对象
//然后 页面去渲染这个 jsx 如果遇到这个标签是一个 函数，那么进行处理
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'world'
        }

        // this.handleClick = this.handleClick.bind(this);  这样绑定 this 也可以

    }

    handleClick() {
        this.setState({ title: 'Hello world' })
        console.log('====click me=====')
    }
    render() {
        return (<div>
            <Title/>
            <Menue/>
            <h1>{this.state.title}</h1>
            {/* 因为我们在new 这个组件的时候把 attr传递过来了，所以就有属性 */}
            <p>id属性：{this.props.id}</p> 
            <span onClick={this.handleClick.bind(this)}>hello</span>
        </div>)
    }
}


let div = <App id="app">
</App>

//调用 ReactDom render  传递标签，和容器
ReactDom.render(div, document.body);