/*
* @Author: linshuling
* @Date:   2018-04-20 14:25:40
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-19 10:33:02
*/
/*柱图表组件对象*/
var H5ComponentBar = function(name, cfg){
    var component = new H5ComponentBase(name, cfg);

    $.each(cfg.data,function(index, item){
        var line = $('<div class="line">');
        var name = $('<div class="name">');
        var rate = $('<div class="rate">');
        var per  = $('<div class="per">');

        var width  = item[1]*100 + '%';

        //自定义颜色
        var bgStyle = '';
        if(item[2]){
            bgStyle = 'style="background-color:'+ item[2] +'"';
        }

        rate.html('<div class="bg" '+bgStyle+'></div>');

        rate.css('width', width);

        per.text(width);

        name.text(item[0]);

        line.append(name).append(rate).append(per);

        component.append(line);
    })

    return component;
}