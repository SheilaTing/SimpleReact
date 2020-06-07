import React from './react';
//定义
// const ReactDom = {
//     render(vdom, container) {
//         container.innerHtml = '';
//         renderHtml(vdom, container);
//     },
//     renderComponent
// }

//拆开Reactdom 分别定义
function render(vdom, container) {
    container.innerHtml = '';
    renderHtml(vdom, container);
}

// 执行 setState 后重新渲染dom  参数就是传递来的组件对象 App
 function renderComponent(component) {
    //调用组件的 render方法 获取到 jsx
    let vdom = component.render(); // 这个 render() 使我们自己在组件中写的 return html 的render
    //创建真正的 dom
    let dom = createDomfromVdom(vdom);
    // 把旧的 dom 替换为这个，那旧的从哪里来呢？
    // console.log(component.$root.parentNode)
    if (component.$root.parentNode !== null) {
        component.$root.parentNode.replaceChild(dom, component.$root);
    }
    // console.log("after----"+JSON.stringify(component.$root))
}


function renderHtml(vdom, container) {
    //拿到 dom 也就是我们这个 div对象后，我们取出里面的 tag
    let node = createDomfromVdom(vdom);
    container.appendChild(node);
}

//抽离出方法( 将虚拟dom解析返回一个 真是 dom 对象 )
function createDomfromVdom(vdom) {
    let node;
    //判断dom 的类型,当这个对象没有被标签包裹时，它是一个 string 字符串，可以打印出来看看
    if (typeof (vdom) === 'string') {
        //如果是字符串，那么直接创建一个 textnode
        node = document.createTextNode(vdom);
        return node;
    }
    //当有标签包裹时，它是一个 object
    if (typeof vdom === 'object') {
        //在这里，如果 vdom 是一个对象，并且vdom的标签是一个函数的话
        if (typeof vdom.tag === 'function') {
            // old 逻辑 new 一个 我们自定义的这个标签名称的对象,并把 vdom 属性 传递过去
            // let component = new vdom.tag(vdom.attr);
            //新逻辑兼容 function 创建一个方法返回一个 class 对象
            let component = getComponent(vdom.tag, vdom.attr);
            let newDom = component.render(); // 获取到虚拟dom jsx
            // 再次执行我们抽离出来的渲染的方法 得到可以在 浏览器中渲染的node
            node = createDomfromVdom(newDom);
            //在 new 这个组件是 将 node(也就是这个html节点) 绑定到这个 component 组件上
            // 方便后面刷新 state 状态使用
            component.$root = node;
        } else {
            //创建标签
            node = document.createElement(vdom.tag);
            //处理 属性  传递 节点 和 vdom 上的属性
            setAttributes(node, vdom.attr);
            //填充内容  遍历 children  如果有内容则再次执行这个 render 方法
            // console.log('vdom===='+vdom.children)
            vdom.children.forEach(childVdom => { renderHtml(childVdom, node) });
        }
        return node;
    }
}

//统一处理 不同方式写的标签对象方法 function,class
function getComponent(tag, attr) {
    if (tag.prototype instanceof React.Component) {
        return new tag(attr);
    } else {
        // function 写法  创建一个 class 对象写一个 render 方法，render 方法的内容就是 function 
        // 方法写的内容
        let App = class extends React.Component {
            render() {
                return tag(attr);
            }
        }
        // es6 在原型上加方法可以写在 class 里面使用 方法名(){},也可以使用es3的写法 函数对象.prototype
        // console.log(App)
        return new App(attr);
    }
}


//定义方法来处理属性的渲染
function setAttributes(node, attrs) {
    if (!attrs) return;  // attr为空 返回
    //遍历属性
    for (let key in attrs) {
        if (key.startsWith('on')) {
            //jsx 中 onclick 会写成 onClick 驼峰，所以我们把它改为小写
            node[key.toLocaleLowerCase()] = attrs[key];

        } else if (key === 'style') {
            //如果是 stle 属性
            Object.assign(node.style, attrs[key]);
        } else {
            node[key] = attrs[key];
        }
    }
}

// module.exports = ReactDom;
// export default ReactDom;



// 改造引入方式 ReactDom 中有两个对象，component 和 render 之前我们是统一exportdefault 一个对象
// 然后调用这个对象的属性，现在分别导出这两个对象,分别导出时,需要带上函数的声明；
export {render,renderComponent}; //这样写可以直接在需要的地方引入 render renderComponent
export default {render,renderComponent}; //这样写还可以使用 ReactDom.render来调用