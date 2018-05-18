/*
* @Author: linshuling
* @Date:   2018-04-20 14:25:40
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-18 16:35:15
*/
/*散点图表组件对象*/
var H5ComponentPoint = function(name, cfg){
    var component = new H5ComponentBase(name, cfg);
    //以第一个数据的比例大小的100%
    var base = cfg.data[0][1];//data[0]:['A项', .4, 'green']

    //输出每一个 Point
    $.each(cfg.data, function(index, item){
        var point = $('<div class="point point_'+ index +'">');

        //point.text(item[0]+'-'+item[1]);
        
        //显示项目名和百分比
        var name = $('<div class="name">'+item[0]+'</div>');
        var rate = $('<div class="per">'+(item[1]*100)+'%</div>');
        name.append(rate);
        point.append(name);

        //计算相对大小
        var per = (item[1]/base*100)+'%';
        point.width(per).height(per);
        //设置颜色
        if(item[2]){
            point.css('background-color',item[2]);
        }
        //设置相对位置
        if(item[3] !== undefined && item[4] !== undefined){
            point.css('left', item[3]).css('top',item[4]);
        }
        component.append(point);
    })
    return component;
}