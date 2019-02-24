项目难点
fetch区别
跨域
webpack基本配置
webpack优化配置
元素透明的方法
redux数据流
container作用
移动端适配
项目优化点
pureComponent
async await 解决那些痛点
tree-shaking
redux中间件


项目难点
手写深拷贝
Promise 用法，promise都有哪些方法
图片懒加载工具函数 
继承都有哪些方式  手写一个


项目的业务
平时的喜好
自我感觉怎么样的人



# 记一次百度面试

大家都说前端应该每年都出去面试面试，了解一下最新的面试情况，所以本着试试的心态，安排上了一次百度的面试（社招）。写这篇文章，把面试的问题分享出来，每道题都会把我的回答贴出来，然后再给大家找一下资料，一起探讨一下。

### 一面（技术面）

#### fetch和传统Ajax有什么区别？
> fetch基于Promise实现，语法相对简洁。
> fetch请求默认不携带cookie，需要设置参数
> 返回状态码为400，500的时候也不会认作失败
> fetch请求无法中断
> fetch无法判断获取上传文件的进度

我觉得大家现在基本上除了用axios的，基本上都在用fetch吧，所以这个问题如果常用的话，应该是相对较简单的一道题。
**相关资料**
[传统Ajax已死，Fetch永生](https://segmentfault.com/a/1190000003810652)

#### 跨域如何解决
> 最常用的当然是jsonp了，利用script标签不受同源策略约束的特点。
> CORS
> webpack开发配置（但是我忘了具体配置的那个属性名叫什么了~~~）

老生常谈，面试必问，二面中也问了，所以之后的就不再重复了，跨域的解决方案很多，但是面试官想听也就这两种了，其他的太不常用了，所以就不提了。
**相关资料**
- [前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)
- [webpack官方文档 dev-server配置](https://webpack.docschina.org/configuration/dev-server/#devserver-proxy)

#### webpack基本配置及优化配置
> 就是常用的那些loader，devserver，resolve，entry，output啊，没法全说下来啊
> DLLPlugin 开发用来提升构建速度，提前打包静态资源
> happyPack 多线程构建
> uglifyJSPlugin  压缩代码
> optimization  代码拆分

webpack的配置实在是太多了，也没法全说下来，说了几个常用的，主要也就是看你对webpack了解不
**相关资料**
- [webpack中文文档](https://webpack.docschina.org)

#### 元素透明的方法（注意不是消失）
> opacity: 0
> filter: opacity(0%)

这里我觉得面试官的问题有问题，我说了这两种，他说还有一种，我没想出来，他说还有一种在做弹窗的时候必须要用，不能用opacity，我说设置背景颜色rgba，但是这也只是背景透明啊，可能我理解错误？？？

#### 画一下redux数据流
> 这里是要让画图，但是我画图实在是太差了，大概画了几下，然后讲了一下源码是怎么运行的

可以看下我之前写的源码分析
```javascript
// 首先定义了一个action，这两个只是为了保证不被外界滥用
let ActionTypes = {
	INIT: //随机数
	REPLACE: //随机数
}

function createStore(reducer,preloadState,enhancer){
	//  第一个是reducer，每次dispatch执行的其实都是他  
	//  第二个参数，初始值，reducer的参数第一个state不写默认值的话，写成这个也一样
	let listener = [];
	// 事件池
	let currentReducer = reducer;
	let currentState = preloadState;
	function getState(){
		// 返回当前状态
	}
	function subscribe(){
		// 向事件池追加方法
	}
	function dispatch(action){
		currentState = currentReducer(currentState, action);
		// 根据action的type，返回新的状态来替代之前的状态
		for (var i = 0; i < listeners.length; i++) {
	        var listener = listeners[i];
	        listener();
	    }
	}
	function replace(nextReducer){
		// 切换操控数据的方法
		dispatch({type:Actions.REPLACE})
	}

	// 重点   
	//  最开始初始化的时候，先让dispatch执行了一下，传入的这个action的type，在reducer内部匹配不到，所以看上面，返回的值就变成初始的状态。 而以后每次再dispatch的时候，都是一样，执行一遍reducer，然后把更新状态
	dispatch({type:ActionType.INIT})
	return {
		// 把这些方法暴露出去
		dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	}
}
```

**相关资料**
- [直接看源码](https://github.com/reduxjs/redux/blob/master/src/createStore.js)

#### redux中的container作用是什么
> 讲store中的state和更新state的方法派发给组件
> 同时container默认会做一层浅比较，避免重复渲染

如上。
**相关资料**
- [react-redux源码](https://github.com/reduxjs/react-redux/)

#### 移动端适配
> 面试官问的是你项目中用的是什么适配方法，如实回答，媒体查询

**相关资料**
- [移动端Web页面适配方案](https://blog.csdn.net/ws379374000/article/details/78686101)


#### react中的pureComponent的作用
> 对props进行浅比较，避免无用的渲染
> 直接从react包中就可以引入

**相关资料**
- [react文档](http://react.html.cn/docs/react-api.html#reactpurecomponent)

#### async await 解决了哪些痛点
> 语法糖，显式异步

这里回答的不是很好，实在想不出来怎么回答，也没想到哪些场景下必须要用async await而且promise无法胜任，希望能得到大家的回答。

#### tree-shaking 