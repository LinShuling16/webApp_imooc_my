/*
* @Author: linshuling
* @Date:   2018-04-20 14:25:40
* @Last Modified by:   linshuling
* @Last Modified time: 2018-05-18 14:52:19
*/
/*内容管理对象*/
var H5 = function(){
    this.id = ('h5_' + Math.random()).replace('.','_');
    this.el = $('<div class="h5" id="'+ this.id +'">').hide();
    this.page = [];
    $('body').append(this.el);

    /**
     * 新增一页
     * @param {string} name 组件的 名称，会加入到ClassName中
     * @param {string} text 页内的默认文本
     * @return {H5} H5对象，可以重复使用H5对象支持的方法
     */
    this.addPage = function(name, text){
        var page = $('<div class="h5_page section">');
        if(name !== undefined){
            page.addClass('h5_page_' + name);
        }
        if(text !== undefined){
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);
        return this;
    }

    /*新增一个组件*/
    this.addComponent = function(name, cfg){
        var cfg = cfg || {};
        cfg = $.extend({
            type : 'base'
        },cfg);

        var component; //定义一个变量，存储组件元素
        var page = this.page.slice(-1)[0];
        console.log(page);
        switch( cfg.type ){
            case 'base':
                component = new H5ComponentBase(name,cfg);
            break;
            default:
        }
        page.append(component);
        return this;
    }

    /* H5对象初始化呈现 */
    this.loader = function(){
        this.el.fullpage({
            /*注意这里的index是从 1 开始的*/
            onLeave : function(index, nextIndex, direction){
                $(this).find('.h5_component').eq(index-1).trigger('onLeave');
            },
            afterLoad : function(anchorLink, index){
                $(this).find('.h5_component').eq(index-1).trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
    }
}