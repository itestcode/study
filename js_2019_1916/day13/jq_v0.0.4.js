//  1 . 获取元素的css属性值  
function getStyleValue(dom,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(dom,null)[attr]; // width height
    }else {
        return dom.currentStyle[attr];
    }
}

//  2. 匀速运动
function move(dom,target){
    // 先清除定时器
    clearInterval(dom.timer);
    // 步长
    var speed = 10;
    // 定时器
    dom.timer = setInterval(function(){
            // 判断是否达到目标位置
            if(dom.offsetLeft >=target){
                clearInterval(dom.timer);
                return ;
            }
            // 盒子将去的地方 = 盒子当前的地方 + 步长
            dom.style.marginLeft = dom.offsetLeft + speed + "px";
    },30)
}




// 3.0 缓动运动
function changeStyle(dom,obj,callback){
    // 用定时器先干掉定时器
    clearInterval(dom.timer);
    // 定时器
    dom.timer = setInterval(function(){
        // 布尔值
        var isChange = true;
        // 循环传递进来的对象
        for(var k in obj ){
            // 步长 : (目标位置（属性值） - 盒子当前的位置（属性值:parseInt(getStyleValue(dom,k))）)/ 10 
            var speed = (obj[k] -parseInt(getStyleValue(dom,k))) / 10;
            // 处理小数点
            speed = speed <0 ?Math.floor(speed) : Math.ceil(speed);

            // 判断是否达到了目标位置（属性值）
            if(obj[k] != parseInt(getStyleValue(dom,k))){
                    isChange = false;
            }
            // 设置dom的位置(属性值)
            dom.style[k] = parseInt(getStyleValue(dom,k))+speed+"px";
        }

        // 判断是否达到了目标位置（属性值）
        if(isChange){
            clearInterval(dom.timer); //清除定时器函数

            // 回调函数
            if(callback){
                callback();
            }
            return;
        }
    },20)

}


// 封装scroll方法 获取页面被浏览器卷掉的高度
function scroll(){
    //  如果浏览器支持  window.pageYOffset 获取页面被卷去的高度 
    if(window.pageYOffset !=undefined){
            return {
                top: window.pageYOffset,
                left:window.pageXOffset
            }
    }else if (document.documentMode == 'BackCompat'){ //  没声明dtd
            return {
                top:document.body.scrollTop,
                left:document.body.scrollLeft
            }
    }else {
        return {
            top:document.documentElement.scrollTop,
            left:document.documentElement.scrollLeft
        }
    }
}