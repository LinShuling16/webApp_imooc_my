/*
* @Author: linshuling
* @Date:   2018-04-20 14:25:40
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-21 16:07:22
*/
/*雷达图表组件对象*/
var H5ComponentRadar = function(name, cfg){
    var component = new H5ComponentBase(name, cfg);

    var w = cfg.width;
    var h = cfg.height;

    //加入一个画布 - 雷达图背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var r = w/2;
    var step = cfg.data.length;

    ctx.beginPath();
    ctx.arc(r, r, 5, 0, 2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(r, r, r, 0, 2*Math.PI);
    ctx.stroke();

    // 计算一个圆周上的坐标(计算多边形的顶点坐标)
    // 已知：圆心坐标(a, b),半径 r; 角度deg。
    // rad = ( 2 * Math.PI / 360) * (360 / step) * i;
    // x = a + Math.sin(rad) * r;
    // y = b + Math.cos(rad) * r;
    
    //绘制多边形
    ctx.beginPath();

    for(var i=0; i<step; i++){
        var rad = ( 2 * Math.PI / 360) * (360 / step) * i;
        var x = r + Math.sin(rad) * r;
        var y = r + Math.cos(rad) * r;

        // ctx.beginPath();
        //绘制散骨图
        // ctx.moveTo(r,r);
        // ctx.lineTo(x,y);
        
        // 在圆上绘制多边形的坐标点
        // ctx.arc(x, y, 5, 0, 2*Math.PI);
        
        ctx.lineTo(x, y);
        
    }
    //绘制多边形
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    var draw = function(per){
   
    }

    component.on('onLoad', function(){
        //折线生长动画
        var s = 0;
        for(var i=0; i<100; i++){
            setTimeout(function(){
                s+=.01;
                // draw(s);
            },i*10 + 600);
        }
    })
    component.on('onLeave', function(){
        //折线退场动画
        var s = 1;
        for(var i=0; i<100; i++){
            setTimeout(function(){
                s-=.01;
                // draw(s);
            },i*10);
        }
    })

   
    return component;
}