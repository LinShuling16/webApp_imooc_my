/*
* @Author: linshuling
* @Date:   2018-04-20 14:25:40
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-25 16:21:42
*/
/*折线图表组件对象*/
var H5ComponentPolyline = function(name, cfg){
    var component = new H5ComponentBase(name, cfg);

    //绘制网格线
    var w = cfg.width;
    var h = cfg.height;

    //加入一个画布 - 网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;

    //水平网格线 等分100份 -> 10份
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth  = 1;
    ctx.strokeStyle = '#aaa';

    for(var i=0; i<step+1; i++){
        var y = (h/step) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }

    //垂直网格线(根据项目个数去分)
    step = cfg.data.length + 1;

    var text_w = w/step >> 0;

    for(var i=0; i<step+1; i++){
        var x = (w/step) *i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);

        //项目文本
        if(cfg.data[i]){
            var text = $('<div class="text">');
            text.text(cfg.data[i][0]);
            text.css('width', text_w/2).css('left',x/2+text_w/4);

            component.append(text);
        } 
        
    }
    ctx.stroke();
    component.append(cns);

    //加入一个画布 - 数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);
    /*
        绘制折线以及对应的数据和阴影
        per：float 0到1之间的数据
     */
    var draw = function(per){
        //清空当前画布
        ctx.clearRect(0,0,w,h);
        //绘制折线数据
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff8878';

        var x = 0;
        var y = 0;

        var row_w = (w/(cfg.data.length +1));
        //画点
        for(var i in cfg.data){
            var item = cfg.data[i];

            x = row_w * i + row_w;
            y = h-(item[1]*h*per);

            ctx.moveTo(x, y);
            ctx.arc(x,y,5,0,2*Math.PI);

            //修改数据颜色
            ctx.fillStyle = item[2] ? item[2] : '#595959';

            //写数据
            ctx.fillText(((item[1]*100)>>0)+'%', x-10, y-10);
        }
        //连线
        //将画笔移动到第一个数据的点位置
        ctx.moveTo(row_w, h-(cfg.data[0][1]*h*per));
        for(var i in cfg.data){
            var item = cfg.data[i];

            x = row_w * i + row_w;
            y = h-(item[1]*h*per);

            ctx.lineTo(x, y);     
        }


        ctx.stroke();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0)';
        //绘制阴影
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(255, 136, 120, 0.2)';
        ctx.fill();
        ctx.stroke();
    }
    draw(1);

    component.on('onLoad', function(){
        //折线生长动画
        var s = 0;
        for(var i=0; i<100; i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10 + 600);
        }
    })
    component.on('onLeave', function(){
        //折线退场动画
        var s = 1;
        for(var i=0; i<100; i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10);
        }
    })
    return component;
}