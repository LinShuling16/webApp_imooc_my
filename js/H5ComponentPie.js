/*
* @Author: linshuling
* @Date:   2018-04-20 14:25:40
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-21 17:45:00
*/
/*雷达图表组件对象*/
var H5ComponentPei = function(name, cfg){
    var component = new H5ComponentBase(name, cfg);

    var w = cfg.width;
    var h = cfg.height;

    //加入一个画布 - 雷达图背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    

    var draw = function(per){ 
       
    }

    draw(0);
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