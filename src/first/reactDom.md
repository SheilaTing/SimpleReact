//定义
const ReactDom = {
    render(vdom,container){
        container.innerHtml = '';
        renderHtml(vdom,container);
    },
}



function renderHtml(vdom,container){
    //拿到 dom 也就是我们这个 div对象后，我们取出里面的 tag
    let node;
    //判断dom 的类型,当这个对象没有被标签包裹时，它是一个 string 字符串，可以打印出来看看
    if(typeof(vdom) === 'string'){
        //如果是字符串，那么直接创建一个 textnode
        node = document.createTextNode(vdom);
    }
    //当有标签包裹时，它是一个 object
    if(typeof vdom === 'object'){
        //创建标签
        node = document.createElement(vdom.tag);
        //处理 属性  传递 节点 和 vdom 上的属性
        setAttributes(node,vdom.attr);
        //填充内容  遍历 children  如果有内容则再次执行这个 render 方法
        // console.log('vdom===='+vdom.children)
        Array.from(vdom.children).forEach(childVdom => { renderHtml(childVdom,node) });
    }
    container.appendChild(node);
}



//定义方法来处理属性的渲染
function setAttributes(node,attrs){
    if(!attrs) return;  // attr为空 返回
    //遍历属性
    for(let key in attrs){
        if(key.startsWith('on')){
            //jsx 中 onclick 会写成 onClick 驼峰，所以我们把它改为小写
            node[key.toLocaleLowerCase()] = attrs[key];

        }else if(key === 'style'){
            //如果是 stle 属性
            Object.assign(node.style,attrs[key]);
        }else{
            node[key] = attrs[key];
        }
    }
}

module.exports = ReactDom;