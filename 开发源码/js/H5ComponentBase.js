/*
* @Author: linshuling
* @Date:   2018-04-20 14:25:40
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-25 15:27:08
*/
/*基本图文组件对象*/
var H5ComponentBase = function(name, cfg){
    var cfg = cfg || {};
    //为每一个component组件设置唯一的id
    var id = ('h5_c_' + Math.random()).replace('.','_');

    //把当前的组建类型添加到样式中进行标记
    var cls ='h5_component_' + cfg.type;
    var component = $('<div class="h5_component '+ cls +' h5_component_name_' + name +'" id='+ id +'>');

    cfg.text    && component.text(cfg.text);
    cfg.width   && component.width(cfg.width/2);
    cfg.height  && component.height(cfg.height/2);

    cfg.css     && component.css(cfg.css);
    cfg.bg      && component.css('backgroundImage','url('+ cfg.bg +')');

    if( cfg.center === true){
        component.css({
            left        : '50%',
            marginLeft  : (cfg.width/4 * -1) + 'px'
        })
    }

    //点击返回首页
    if(typeof cfg.onclick === 'function'){
        component.on('click', cfg.onclick);
    }
    
    //监听当前组价对象component事件
    component.on('onLoad',function(){
       
        setTimeout(function(){
            component.addClass(cls+'_load').removeClass(cls+'_leave');
            cfg.animateIn && component.animate( cfg.animateIn );
        },cfg.delay || 0)

        return false;
    })
    component.on('onLeave',function(){

        setTimeout(function(){
            component.addClass(cls+'_leave').removeClass(cls+'_load');
            cfg.animateOut && component.animate( cfg.animateOut );
         },cfg.delay || 0)
        return false;
    })

    return component;
}