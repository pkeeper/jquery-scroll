/*!
jquery scroll - a custom stylable scrollbar
Version 0.4
https://github.com/thomd/jquery-scroll
Copyright (c) 2011 Thomas Duerr (me-at-thomd-dot-net)
Licensed under the MIT license (https://raw.github.com/thomd/jquery-scroll/master/MIT-LICENSE)
*/
//(function(a,b){var c={init:function(b,c){var d=a.extend({},a.fn.scrollbar.defaults,c);return this.each(function(){var c=a(this),e={arrows:d.arrows};d.containerHeight!="auto"&&c.height(d.containerHeight),e.containerHeight=c.height(),e.contentHeight=a.fn.scrollbar.contentHeight(c);if(e.contentHeight<=e.containerHeight)return!0;this.scrollbar=new a.fn.scrollbar.Scrollbar(c,e,d),this.scrollbar.buildHtml().setHandle().appendEvents(),typeof b=="function"&&b(c.find(".scrollbar-pane"),this.scrollbar)})},repaint:function(){return this.each(function(){this.scrollbar&&this.scrollbar.repaint()})},scrollto:function(a){return this.each(function(){this.scrollbar.scrollto(a)})},unscrollbar:function(){return this.each(function(){this.scrollbar&&this.scrollbar.unscrollbar()})}};a.fn.scrollbar=function(b){if(c[b])return c[b].apply(this,Array.prototype.slice.call(arguments,1));if(typeof b=="function"||b===undefined)return c.init.apply(this,arguments);if(typeof b=="object")return c.init.apply(this,[null,b]);a.error("method '"+b+"' does not exist for $.fn.scrollbar")},a.fn.scrollbar.defaults={containerHeight:"auto",arrows:!0,handleHeight:"auto",handleMinHeight:30,scrollTimeout:50,scrollStep:20,scrollTimeoutArrows:40,scrollStepArrows:3},a.fn.scrollbar.Scrollbar=function(a,b,c){this.container=a,this.props=b,this.opts=c,this.mouse={},this.props.arrows=this.container.hasClass("no-arrows")?!1:this.props.arrows},a.fn.scrollbar.Scrollbar.prototype={buildHtml:function(){this.container.wrapInner('<div class="scrollbar-pane"/>'),this.container.append('<div class="scrollbar-handle-container"><div class="scrollbar-handle"/></div>'),this.props.arrows&&this.container.append('<div class="scrollbar-handle-up"/>').append('<div class="scrollbar-handle-down"/>');var a=this.container.height();return this.pane=this.container.find(".scrollbar-pane"),this.handle=this.container.find(".scrollbar-handle"),this.handleContainer=this.container.find(".scrollbar-handle-container"),this.handleArrows=this.container.find(".scrollbar-handle-up, .scrollbar-handle-down"),this.handleArrowUp=this.container.find(".scrollbar-handle-up"),this.handleArrowDown=this.container.find(".scrollbar-handle-down"),this.pane.defaultCss({top:0,left:0}),this.handleContainer.defaultCss({right:0}),this.handle.defaultCss({top:0,right:0}),this.handleArrows.defaultCss({right:0}),this.handleArrowUp.defaultCss({top:0}),this.handleArrowDown.defaultCss({bottom:0}),this.container.css({position:this.container.css("position")==="absolute"?"absolute":"relative",overflow:"hidden",height:a}),this.pane.css({position:"absolute",overflow:"visible",height:"auto"}),this.handleContainer.css({position:"absolute",top:this.handleArrowUp.outerHeight(!0),height:this.props.containerHeight-this.handleArrowUp.outerHeight(!0)-this.handleArrowDown.outerHeight(!0)+"px"}),this.handle.css({position:"absolute",cursor:"pointer"}),this.handleArrows.css({position:"absolute",cursor:"pointer"}),this.pane.top=0,this},setHandle:function(){return this.props.handleContainerHeight=this.handleContainer.height(),this.props.contentHeight=this.pane.height(),this.props.handleHeight=this.opts.handleHeight=="auto"?Math.max(Math.ceil(this.props.containerHeight*this.props.handleContainerHeight/this.props.contentHeight),this.opts.handleMinHeight):this.opts.handleHeight,this.handle.height(this.props.handleHeight),this.handle.height(2*this.handle.height()-this.handle.outerHeight(!0)),this.props.handlePosition={min:0,max:this.props.handleContainerHeight-this.props.handleHeight},this.props.handleContentRatio=(this.props.contentHeight-this.props.containerHeight)/(this.props.handleContainerHeight-this.props.handleHeight),this.handle.top==undefined?this.handle.top=0:this.handle.top=-1*this.pane.top/this.props.handleContentRatio,this},appendEvents:function(){var c=this;return this.handle.bind("mousedown.handle",a.proxy(this,"startOfHandleMove")),this.handleContainer.bind("mousedown.handle",a.proxy(this,"onHandleContainerMousedown")),this.handleContainer.bind("mouseenter.container mouseleave.container",a.proxy(this,"onHandleContainerHover")),this.handleArrows.bind("mousedown.arrows",a.proxy(this,"onArrowsMousedown")),this.container.bind("mousewheel.container",a.proxy(this,"onMouseWheel")),this.container.bind("mouseenter.container mouseleave.container",a.proxy(this,"onContentHover")),this.container.bind("click",function(a){return c.container.addClass("focused"),!1}),a(b).live("click",function(a){c.container.removeClass("focused")}),a(b).bind("keydown",function(b){if(c.container.hasClass("focused")){var d=!1;switch(b.keyCode){case 38:c.handle.direction=-1,c.handle.step=c.opts.scrollStepArrows,d=setTimeout(a.proxy(c.moveHandle,c),c.opts.scrollTimeoutArrows);break;case 40:c.handle.direction=1,c.handle.step=c.opts.scrollStepArrows,d=setTimeout(a.proxy(c.moveHandle,c),c.opts.scrollTimeoutArrows);break;case 33:c.handle.direction=-1,c.handle.step=c.opts.scrollStepArrows*15,d=setTimeout(a.proxy(c.moveHandle,c),c.opts.scrollTimeoutArrows);break;case 34:c.handle.direction=1,c.handle.step=c.opts.scrollStepArrows*15,d=setTimeout(a.proxy(c.moveHandle,c),c.opts.scrollTimeoutArrows)}}}),this.handle.bind("click.scrollbar",this.preventClickBubbling),this.handleContainer.bind("click.scrollbar",this.preventClickBubbling),this.handleArrows.bind("click.scrollbar",this.preventClickBubbling),this},mousePosition:function(a){return a.pageY||a.clientY+(b.documentElement.scrollTop||b.body.scrollTop)||0},repaint:function(){this.setHandle(),this.setHandlePosition()},scrollto:function(b){var c=0;typeof b=="number"?c=(b<0?0:b)/this.props.handleContentRatio:typeof b=="string"?(b=="bottom"&&(c=this.props.handlePosition.max),b=="middle"&&(c=Math.ceil(this.props.handlePosition.max/2))):typeof b=="object"&&!a.isPlainObject(b)&&(c=Math.ceil(b.position().top/this.props.handleContentRatio)),this.handle.top=c,this.setHandlePosition(),this.setContentPosition()},unscrollbar:function(){var a=this.container.find(".scrollbar-pane").find("*");this.container.empty(),this.container.append(a),this.container.attr("style","")},startOfHandleMove:function(c){c.preventDefault(),c.stopPropagation(),this.mouse.start=this.mousePosition(c),this.handle.start=this.handle.top,a(b).bind("mousemove.handle",a.proxy(this,"onHandleMove")).bind("mouseup.handle",a.proxy(this,"endOfHandleMove")),this.handle.addClass("move"),this.handleContainer.addClass("move")},onHandleMove:function(a){a.preventDefault();var b=this.mousePosition(a)-this.mouse.start;this.handle.top=this.handle.start+b,this.setHandlePosition(),this.setContentPosition()},endOfHandleMove:function(c){a(b).unbind(".handle"),this.handle.removeClass("move"),this.handleContainer.removeClass("move")},setHandlePosition:function(){this.handle.top=this.handle.top>this.props.handlePosition.max?this.props.handlePosition.max:this.handle.top,this.handle.top=this.handle.top<this.props.handlePosition.min?this.props.handlePosition.min:this.handle.top,this.handle[0].style.top=this.handle.top+"px"},setContentPosition:function(){this.pane.top=-1*this.props.handleContentRatio*this.handle.top,this.pane[0].style.top=this.pane.top+"px"},onMouseWheel:function(a,b){this.handle.top-=b,this.setHandlePosition(),this.setContentPosition(),this.handle.top>this.props.handlePosition.min&&this.handle.top<this.props.handlePosition.max&&a.preventDefault()},onHandleContainerMousedown:function(c){c.preventDefault();if(!a(c.target).hasClass("scrollbar-handle-container"))return!1;this.handle.direction=this.handle.offset().top<this.mousePosition(c)?1:-1,this.handle.step=this.opts.scrollStep;var d=this;a(b).bind("mouseup.handlecontainer",function(){clearInterval(e),d.handle.unbind("mouseenter.handlecontainer"),a(b).unbind("mouseup.handlecontainer")}),this.handle.bind("mouseenter.handlecontainer",function(){clearInterval(e)});var e=setInterval(a.proxy(this.moveHandle,this),this.opts.scrollTimeout)},onArrowsMousedown:function(c){c.preventDefault(),this.handle.direction=a(c.target).hasClass("scrollbar-handle-up")?-1:1,this.handle.step=this.opts.scrollStepArrows,a(c.target).addClass("move");var d=setInterval(a.proxy(this.moveHandle,this),this.opts.scrollTimeoutArrows);a(b).one("mouseup.arrows",function(){clearInterval(d),a(c.target).removeClass("move")})},moveHandle:function(){this.handle.top=this.handle.direction===1?Math.min(this.handle.top+this.handle.step,this.props.handlePosition.max):Math.max(this.handle.top-this.handle.step,this.props.handlePosition.min),this.handle[0].style.top=this.handle.top+"px",this.setContentPosition()},onContentHover:function(a){a.type==="mouseenter"?(this.container.addClass("hover"),this.handleContainer.addClass("hover")):(this.container.removeClass("hover"),this.handleContainer.removeClass("hover"))},onHandleContainerHover:function(a){a.type==="mouseenter"?this.handleArrows.addClass("hover"):this.handleArrows.removeClass("hover")},preventClickBubbling:function(a){a.stopPropagation()}},a.fn.scrollbar.contentHeight=function(a){var b=a.wrapInner('<div style="zoom:1"/>').find(":first"),c=b.css({overflow:"hidden"}).height();return b.replaceWith(b.contents()),c},a.fn.defaultCss=function(b){var c={right:"auto",left:"auto",top:"auto",bottom:"auto",position:"static"};return this.each(function(){var d=a(this);for(var e in b)d.css(e)===c[e]&&d.css(e,b[e])})},a.event.special.mousewheel={setup:function(){this.addEventListener?(this.addEventListener("mousewheel",a.fn.scrollbar.mouseWheelHandler,!1),this.addEventListener("DOMMouseScroll",a.fn.scrollbar.mouseWheelHandler,!1)):this.onmousewheel=a.fn.scrollbar.mouseWheelHandler},teardown:function(){this.removeEventListener?(this.removeEventListener("mousewheel",a.fn.scrollbar.mouseWheelHandler,!1),this.removeEventListener("DOMMouseScroll",a.fn.scrollbar.mouseWheelHandler,!1)):this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}}),a.fn.scrollbar.mouseWheelHandler=function(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",b.wheelDelta&&(e=b.wheelDelta/120),b.detail&&(e=-b.detail/3),c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),a.event.handle.apply(this,d)}})(jQuery,document);
/*!
jquery scroll - a custom stylable scrollbar
Version 0.4
https://github.com/thomd/jquery-scroll
Copyright (c) 2011 Thomas Duerr (me-at-thomd-dot-net)
Licensed under the MIT license (https://raw.github.com/thomd/jquery-scroll/master/MIT-LICENSE)
*/

;
/*
Usage Examples:

    Create a custom scrollbar to an arbitrary container with overflowed content:

         $('selector').scrollbar();


    Create a custom scrollbar without arrows on top/bottom:

         $('selector').scrollbar({
            arrows: false
         });


    Create a custom scrollbar and call a function once the rendering is complete:

          $('selector').scrollbar(function(){});


    Repaint scrollbar to reflect dynamically added content in the hight ans position of the scrollbar

          $('selector').scrollbar('repaint');


    Scroll to a specific item within the container:

          $('selector').scrollbar('scrollto', $('item'));


    Scroll to bottom of content

          $('selector').scrollbar('scrollto', 'bottom');



Dependency:

    jQuery version 1.4.3+
    (older verisons may also work)



Support:

    Firefox 3+
    Safari 4+
    Chrome 6+
    (other browser may also work, these are also the browsers I tested)



Changelog:

    v0.4
          new:  added plugin methods 'repaint' and 'scrollto'.
          fix:  the content height for plain text nodes is now calculated correctly.

    v0.3
          fix:  removed obsolete div while meassuring content height.
          fix:  take care of borders on the container. (thanks bennyschudel)

    v0.2
          fix:  fixed bug when setting container height by an option.
          fix:  fixed margin-collapsing related bug in calculation of content height.
          new:  moved initialization code to object creation to make things more object oriented.
          new:  options added to set hight of the scrollbar handle explicitly.

    v0.1
          initial version.





*/
(function($, document){

    // due to possible conflicts in jQuery’s namespace with lots of namespace-polluting methods, we use this method-delegation pattern (well known from jquery-UI):
    //
    // Rather than naming methods like this:
    //
    //      container.scrollbarRepaint();
    //
    // the following method-command should be used:
    //
    //      container.scrollbar('repaint');
    //
    var methods = {
        init: function(fn, opts){

            // Extend default options
            var options = $.extend({}, $.fn.scrollbar.defaults, opts);

            //
            // append scrollbar to selected overflowed containers and return jquery object for chainability
            //
            return this.each(function(){

                var container = $(this)

                    // properties
                  , props = {
                        arrows: options.arrows
                    };

                // set container height explicitly if given by an option
                if(options.containerHeight != 'auto'){
                    container.height(options.containerHeight);
                }

                // save container height in properties
                props.containerHeight = container.height();

                // save content height in properties
                props.contentHeight = $.fn.scrollbar.contentHeight(container);

                // if the content height is lower than the container height, do nothing and return.
                if(props.contentHeight <= props.containerHeight){
                    return true;
                }

                // create a new scrollbar object and append to DOM node for later use
                this.scrollbar = new $.fn.scrollbar.Scrollbar(container, props, options);

                // build HTML, initialize Handle and append Events
                this.scrollbar.buildHtml().setHandle().appendEvents();

                // callback function after creation of scrollbar
                if(typeof fn === "function"){
                    fn(container.find(".scrollbar-pane"), this.scrollbar);
                }
            });
        },


        // repaint the height and position of the scroll handle
        //
        // this method must be called in case content is added or reoved from the container.
        //
        // usage:
        //   $('selector').scrollbar("repaint");
        //
        repaint: function(){
            return this.each(function(){
                if(this.scrollbar) {
                  this.scrollbar.repaint();
                }
            });
        },


        // scroll to a specific item within the container or to a specific distance of the content from top
        //
        // usage:
        //   $('selector').scrollbar("scrollto");                    // scroll to top of content
        //   $('selector').scrollbar("scrollto", 20);                // scroll to content 20px from top
        //   $('selector').scrollbar("scrollto", "top");             // scroll to top of content
        //   $('selector').scrollbar("scrollto", "middle");          // scroll to vertically middle of content
        //   $('selector').scrollbar("scrollto", "bottom");          // scroll to bottom of content
        //   $('selector').scrollbar("scrollto", $('item'));         // scroll to first content item identified by selector $('item')
        //
        scrollto: function(to){
            return this.each(function(){
                this.scrollbar.scrollto(to);
            });
        },
        
        // Remove the scrollbar (and the generated HTML elements).
        //
        // usage:
        //   $('selector').scrollbar("unscrollbar");
        //
        unscrollbar: function() {
          return this.each(function() {
            if(this.scrollbar) {
              this.scrollbar.unscrollbar();
            }
          });
        }
    }

    $.fn.scrollbar = function(method){
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if(typeof method === "function" || method === undefined){
            return methods.init.apply(this, arguments);
        }
        else if(typeof method === "object"){
            return methods.init.apply(this, [null, method]);
        }
        else {
            $.error("method '" + method + "' does not exist for $.fn.scrollbar");
        }
    }



    //
    // default options
    //
    $.fn.scrollbar.defaults = {
        containerHeight     : 'auto', // height of content container [Number in px || 'auto']. If set to 'auto', the naturally rendered height is used.
        arrows              : true,   // render up- and down-arrows [true || false].
        handleHeight        : 'auto', // height of handle [Number in px || 'auto']. If set to 'auto', the height will be calculated proportionally to the container-content height.
        handleMinHeight     : 30,     // minimum height of handle [Number in px]. This property will only be used if handleHeight-option is set to 'auto'.
        scrollTimeout       : 50,     // timeout of handle speed while mousedown on arrows [Number in milli sec].
        scrollStep          : 20,     // increment of handle position between two mousedowns on arrows [Number in px].
        scrollTimeoutArrows : 40,     // timeout of handle speed while mousedown in the handle container [Number in milli sec].
        scrollStepArrows    : 3       // increment of handle position between two mousedowns in the handle container [px].
    };



    //
    // Scrollbar constructor
    //
    $.fn.scrollbar.Scrollbar = function(container, props, options){

        // set object properties
        this.container = container;
        this.props =     props;
        this.opts =      options;
        this.mouse =     {};

        // disable arrows via class attribute 'no-arrows' on a container
        this.props.arrows = this.container.hasClass('no-arrows') ? false : this.props.arrows;
    };

    //
    // Scrollbar methods
    //
    $.fn.scrollbar.Scrollbar.prototype = {

        //
        // build DOM nodes for pane and scroll-handle based on the following box model:
        //
        //        +----------------------------------+
        //        |            <----------------------------- content container
        //        |  +-----------------+  +------+   |
        //        |  |                 |  |   <-------------- handle arrow up
        //        |  |                 |  |      |   |
        //        |  |                 |  +------+   |
        //        |  |                 |  | +--+ |   |
        //        |  |                 |  | |  | |   |
        //        |  |                 |  | | <-------------- handle
        //        |  |                 |  | |  | |   |
        //        |  |                 |  | |  | |   |
        //        |  |                 |  | |  | |   |
        //        |  |                 |  | +--+ |   |
        //        |  |                 |  |      |   |
        //        |  |                 |  |   <-------------- handle container
        //        |  |                 |  |      |   |
        //        |  |         <----------------------------- pane
        //        |  |                 |  |      |   |
        //        |  |                 |  |      |   |
        //        |  |                 |  +------+   |
        //        |  |                 |  |      |   |
        //        |  |                 |  |   <-------------- handle arrow down
        //        |  +-----------------+  +------+   |
        //        |                                  |
        //        +----------------------------------+
        //
        //
        //
        //   DOM before:
        //
        //         <div class="foo" id="content_container">                       --> arbitrary element with a fixed height or a max-height lower that its containing elements
        //             [...content...]
        //         </div>
        //
        //
        //   DOM after applying plugin:
        //
        //         <div class="foo">                                              --> this.container
        //             <div class="scrollbar-pane" id="content_container">        --> this.pane
        //                 [...content...]
        //             </div>
        //             <div class="scrollbar-handle-container">                   --> this.handleContainer
        //                 <div class="scrollbar-handle"></div>                   --> this.handle
        //             </div>
        //             <div class="scrollbar-handle-up"></div>                    --> this.handleArrows
        //             <div class="scrollbar-handle-down"></div>                  --> this.handleArrows
        //         </div>
        //
        //
        //   If the option moveContainerId is set to true, an id attribute on the container is moved to it's
        //   child node 'pane' which holds the content after applying the plugin. This may be useful when dynamic
        //   content is added via $('#content_container').load().
        //
        //   The above class-attribute values can be used for styling the scrollbar with CSS.
        //
        //
        //
        // TODO: use detach-transform-attach or DOMfragment
        //
        buildHtml: function(){

            // build new DOM nodes
            this.container.wrapInner('<div class="scrollbar-pane"/>');
            this.container.append('<div class="scrollbar-handle-container"><div class="scrollbar-handle"/></div>');
            if(this.props.arrows){
                this.container.append('<div class="scrollbar-handle-up"/>').append('<div class="scrollbar-handle-down"/>');
            }

            // save height of container to re-set it after some DOM manipulations
            var height = this.container.height();

            // set scrollbar-object properties
            this.pane =            this.container.find('.scrollbar-pane');
            this.handle =          this.container.find('.scrollbar-handle');
            this.handleContainer = this.container.find('.scrollbar-handle-container');
            this.handleArrows =    this.container.find('.scrollbar-handle-up, .scrollbar-handle-down');
            this.handleArrowUp =   this.container.find('.scrollbar-handle-up');
            this.handleArrowDown = this.container.find('.scrollbar-handle-down');

            // set some default CSS attributes (may be overwritten by CSS definitions in an external CSS file)
            this.pane.defaultCss({
                'top':      0,
                'left':     0
            });
            this.handleContainer.defaultCss({
                'right':    0
            });
            this.handle.defaultCss({
                'top':      0,
                'right':    0
            });
            this.handleArrows.defaultCss({
                'right':    0
            });
            this.handleArrowUp.defaultCss({
                'top':      0
            });
            this.handleArrowDown.defaultCss({
                'bottom':   0
            });

            // set some necessary CSS attributes (can NOT be overwritten by CSS definitions)
            this.container.css({
                'position': this.container.css('position') === 'absolute' ? 'absolute' : 'relative',
                'overflow': 'hidden',
                'height':   height
            });
            this.pane.css({
                'position': 'absolute',
                'overflow': 'visible',
                'height':   'auto'
            });
            this.handleContainer.css({
                'position': 'absolute',
                'top':      this.handleArrowUp.outerHeight(true),
                'height':   (this.props.containerHeight - this.handleArrowUp.outerHeight(true) - this.handleArrowDown.outerHeight(true)) + 'px'
            });
            this.handle.css({
                'position': 'absolute',
                'cursor':   'pointer'
            });
            this.handleArrows.css({
                'position': 'absolute',
                'cursor':   'pointer'
            });

            // set initial position of pane to 'top'
            this.pane.top = 0;

            return this;
        },


        //
        // calculate dimensions of handle
        //
        setHandle: function(){
            this.props.handleContainerHeight = this.handleContainer.height();
            this.props.contentHeight = this.pane.height();

            // height of handle
            this.props.handleHeight = this.opts.handleHeight == 'auto' ? Math.max(Math.ceil(this.props.containerHeight * this.props.handleContainerHeight / this.props.contentHeight), this.opts.handleMinHeight) : this.opts.handleHeight;
            this.handle.height(this.props.handleHeight);

            // if handle has a border (always be aware of the css box-model), we need to correct the handle height.
            this.handle.height(2 * this.handle.height() - this.handle.outerHeight(true));

            // min- and max-position for handle
            this.props.handlePosition = {
                min: 0,
                max: this.props.handleContainerHeight - this.props.handleHeight
            };

            // ratio of handle-container-height to content-container-height (to calculate position of content related to position of handle)
            this.props.handleContentRatio = (this.props.contentHeight - this.props.containerHeight) / (this.props.handleContainerHeight - this.props.handleHeight);

            // set initial position of handle to 'top'
            // if new content is added into the container, handle.top needs to be recalculated
            if(this.handle.top == undefined){
                this.handle.top = 0;
            } else {
                this.handle.top = -1 * this.pane.top / this.props.handleContentRatio;
            }

            return this;
        },


        //
        // append events on handle and handle-container
        //
        appendEvents: function(){

            //need this for added event listeners
            var self = this;

            // append drag-drop event on scrollbar-handle
            // the events 'mousemove.handle' and 'mouseup.handle' are dynamically appended in the startOfHandleMove-function
            this.handle.bind('mousedown.handle', $.proxy(this, 'startOfHandleMove'));

            // append mousedown event on handle-container
            this.handleContainer.bind('mousedown.handle', $.proxy(this, 'onHandleContainerMousedown'));

            // append hover event on handle-container
            this.handleContainer.bind('mouseenter.container mouseleave.container', $.proxy(this, 'onHandleContainerHover'));

            // append click event on scrollbar-up- and scrollbar-down-handles
            this.handleArrows.bind('mousedown.arrows', $.proxy(this, 'onArrowsMousedown'));

            // append mousewheel event on content container
            this.container.bind('mousewheel.container', $.proxy(this, 'onMouseWheel'));

            // append hover event on content container
            this.container.bind('mouseenter.container mouseleave.container', $.proxy(this, 'onContentHover'));

            //there's definitely a better way to do this, but the following handles 
            //pgup/dn and up and down arrow key events after the container element has been 'focused';
            
            	//add a class of focused and prevent the event from bubbling any further
    		this.container.bind('click',function(e) {
			self.container.addClass('focused');
			return false;
		});
            
            	//remove focused class if the event bubbles all the way up to the document
    		$(document).live('click',function(e) {
			self.container.removeClass('focused');
		});
			
            	//handle the key events
		$(document).bind('keydown',function(e) {
			if(self.container.hasClass('focused') || self.container.hasClass('hover')) {
				var timer = false;
				//bind the arrow keys
				switch(e.keyCode) {
					case 38 : 	//up arrow
						e.preventDefault();
						self.handle.direction = -1;
						self.handle.step = self.opts.scrollStepArrows;
						timer = setTimeout($.proxy(self.moveHandle, self), self.opts.scrollTimeoutArrows);
						break;
					case 40 :	//down arrow
						e.preventDefault();
						self.handle.direction = 1;
						self.handle.step = self.opts.scrollStepArrows;
						timer = setTimeout($.proxy(self.moveHandle, self), self.opts.scrollTimeoutArrows);
						break;
					case 33 :	//pgup
						e.preventDefault();
						self.handle.direction = -1;
						self.handle.step = self.opts.scrollStepArrows*15;
						timer = setTimeout($.proxy(self.moveHandle, self), self.opts.scrollTimeoutArrows);
						break;
					case	34 : //pgdn
						e.preventDefault();
						self.handle.direction = 1;
						self.handle.step = self.opts.scrollStepArrows*15;
						timer = setTimeout($.proxy(self.moveHandle, self), self.opts.scrollTimeoutArrows);
						break;
				}
				
			}
			
		});

            // do not bubble down click events into content container
            this.handle.bind('click.scrollbar', this.preventClickBubbling);
            this.handleContainer.bind('click.scrollbar', this.preventClickBubbling);
            this.handleArrows.bind('click.scrollbar', this.preventClickBubbling);

            return this;
        },


        //
        // get mouse position helper
        //
        mousePosition: function(ev){
            return ev.pageY || (ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop)) || 0;
        },


        //
        // repaint scrollbar height and position
        //
        repaint: function(){
            this.setHandle();
            this.setHandlePosition();
        },


        //
        // scroll to a specific distance from the top
        //
        scrollto: function(to){

            var distance = 0;

            if(typeof to == "number"){
                distance = (to < 0 ? 0 : to) / this.props.handleContentRatio;
            }
            else if(typeof to == "string"){
                if(to == "bottom"){
                    distance = this.props.handlePosition.max;
                }
                if(to == "middle"){
                    distance = Math.ceil(this.props.handlePosition.max / 2);
                }
            }
            else if(typeof to == "object" && !$.isPlainObject(to)) {
                distance = Math.ceil(to.position().top / this.props.handleContentRatio);
            }

            this.handle.top = distance;
            this.setHandlePosition();
            this.setContentPosition();
        },
        
        //
        // Remove scrollbar dom elements
        //
        unscrollbar: function() {
          var holder = this.container.find('.scrollbar-pane').find('*');
          this.container.empty();
          this.container.append(holder);
          this.container.attr('style','');
        },


        // ---------- event handler ---------------------------------------------------------------

        //
        // start moving of handle
        //
        startOfHandleMove: function(ev){
            ev.preventDefault();
            ev.stopPropagation();

            // set start position of mouse
            this.mouse.start = this.mousePosition(ev);

            // set start position of handle
            this.handle.start = this.handle.top;

            // bind mousemove- and mouseout-event on document (binding it to document allows having a mousepointer outside handle while moving)
            $(document).bind('mousemove.handle', $.proxy(this, 'onHandleMove')).bind('mouseup.handle', $.proxy(this, 'endOfHandleMove'));

            // add CSS classes for visual change while moving handle
            this.handle.addClass('move');
            this.handleContainer.addClass('move');
        },


        //
        // on moving of handle
        //
        onHandleMove: function(ev){
            ev.preventDefault();

            // calculate distance since last fireing of this handler
            var distance = this.mousePosition(ev) - this.mouse.start;

            // calculate new handle position
            this.handle.top = this.handle.start + distance;

            // update positions
            this.setHandlePosition();
            this.setContentPosition();
        },


        //
        // end moving of handle
        //
        endOfHandleMove: function(ev){

            // remove handle events (which were attached in the startOfHandleMove-method)
            $(document).unbind('.handle');

            // remove class for visual change
            this.handle.removeClass('move');
            this.handleContainer.removeClass('move');
        },


        //
        // set position of handle
        //
        setHandlePosition: function(){

            // stay within range [handlePosition.min, handlePosition.max]
            this.handle.top = (this.handle.top > this.props.handlePosition.max) ? this.props.handlePosition.max : this.handle.top;
            this.handle.top = (this.handle.top < this.props.handlePosition.min) ? this.props.handlePosition.min : this.handle.top;

            this.handle[0].style.top = this.handle.top + 'px';
        },


        //
        // set position of content
        //
        setContentPosition: function(){

            // derive position of content from position of handle
            this.pane.top = -1 * this.props.handleContentRatio * this.handle.top;

            this.pane[0].style.top = this.pane.top + 'px';
        },


        //
        // mouse wheel movement
        //
        onMouseWheel: function(ev, delta){

            // calculate new handle position
            this.handle.top -= delta;

            this.setHandlePosition();
            this.setContentPosition();

            // prevent default scrolling of the entire document if handle is within [min, max]-range
            if(this.handle.top > this.props.handlePosition.min && this.handle.top < this.props.handlePosition.max){
                ev.preventDefault();
            }
        },


        //
        // append click handler on handle-container (outside of handle itself) to click up and down the handle
        //
        onHandleContainerMousedown: function(ev){
            ev.preventDefault();

            // do nothing if clicked on handle
            if(!$(ev.target).hasClass('scrollbar-handle-container')){
                return false;
            }

            // determine direction for handle movement (clicked above or below the handler?)
            this.handle.direction = (this.handle.offset().top < this.mousePosition(ev)) ? 1 : -1;

            // set incremental step of handle
            this.handle.step = this.opts.scrollStep;

            // stop handle movement on mouseup
            var that = this;
            $(document).bind('mouseup.handlecontainer', function(){
                clearInterval(timer);
                that.handle.unbind('mouseenter.handlecontainer');
                $(document).unbind('mouseup.handlecontainer');
            });

            // stop handle movement when mouse is over handle
            //
            // TODO: this event is fired by Firefox only. Damn!
            //       Right now, I do not know any workaround for this. Mayby I should solve this by collision-calculation of mousepointer and handle
            this.handle.bind('mouseenter.handlecontainer', function(){
                clearInterval(timer);
            });

            // repeat handle movement while mousedown
            var timer = setInterval($.proxy(this.moveHandle, this), this.opts.scrollTimeout);
        },


        //
        // append mousedown handler on handle-arrows
        //
        onArrowsMousedown: function(ev){
            ev.preventDefault();

            // determine direction for handle movement
            this.handle.direction = $(ev.target).hasClass('scrollbar-handle-up') ? -1 : 1;

            // set incremental step of handle
            this.handle.step = this.opts.scrollStepArrows;

            // add class for visual change while moving handle
            $(ev.target).addClass('move');

            // repeat handle movement while mousedown
            var timer = setInterval($.proxy(this.moveHandle, this), this.opts.scrollTimeoutArrows);

            // stop handle movement on mouseup
            $(document).one('mouseup.arrows', function(){
                clearInterval(timer);
                $(ev.target).removeClass('move');
            });
        },


        //
        // move handle by a distinct step while click on arrows or handle-container
        //
        moveHandle: function(){
            this.handle.top = (this.handle.direction === 1) ? Math.min(this.handle.top + this.handle.step, this.props.handlePosition.max) : Math.max(this.handle.top - this.handle.step, this.props.handlePosition.min);
            this.handle[0].style.top = this.handle.top + 'px';

            this.setContentPosition();
        },


        //
        // add class attribute on content while interacting with content
        //
        onContentHover: function(ev){
            if(ev.type === 'mouseenter'){
                this.container.addClass('hover');
                this.handleContainer.addClass('hover');
            } else {
                this.container.removeClass('hover');
                this.handleContainer.removeClass('hover');
            }
        },


        //
        // add class attribute on handle-container while hovering it
        //
        onHandleContainerHover: function(ev){
            if(ev.type === 'mouseenter'){
                this.handleArrows.addClass('hover');
            } else {
                this.handleArrows.removeClass('hover');
            }
        },


        //
        // do not bubble down to avoid triggering click events attached within the container
        //
        preventClickBubbling: function(ev){
            ev.stopPropagation();
        }
    };


    // ----- helpers ------------------------------------------------------------------------------

    //
    // determine content height
    //
    $.fn.scrollbar.contentHeight = function(container){

      // inner-wrap content temporarily and meassure content height.
      // wrapper container need to have an overflow set to 'hidden' to respect margin collapsing
      
      //add style="zoom:1" to fix IE7 bug where the scrollbar doesn't work if the content has floated elements
      var wrapper = container.wrapInner('<div style="zoom:1"/>').find(':first');
      var height = wrapper.css({overflow:'hidden'}).height();
	  
	  console.log(height);
	  
      wrapper.replaceWith(wrapper.contents());
      return height;
    };


    //
    // ----- default css ---------------------------------------------------------------------
    //
    $.fn.defaultCss = function(styles){

        // 'not-defined'-values
        var notdef = {
            'right':    'auto',
            'left':     'auto',
            'top':      'auto',
            'bottom':   'auto',
            'position': 'static'
        };

        // loop through all style definitions and check for a definition already set by css.
        // if no definition is found, apply the default css definition
        return this.each(function(){
            var elem = $(this);
            for(var style in styles){
                if(elem.css(style) === notdef[style]){
                    elem.css(style, styles[style]);
                }
            }
        });
    };


    //
    // ----- mousewheel event ---------------------------------------------------------------------
    // based on jquery.mousewheel.js from Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
    //
    $.event.special.mousewheel = {

        setup: function(){
            if (this.addEventListener){
                this.addEventListener('mousewheel', $.fn.scrollbar.mouseWheelHandler, false);
                this.addEventListener('DOMMouseScroll', $.fn.scrollbar.mouseWheelHandler, false);
            } else {
                this.onmousewheel = $.fn.scrollbar.mouseWheelHandler;
            }
        },

        teardown: function(){
            if (this.removeEventListener){
                this.removeEventListener('mousewheel', $.fn.scrollbar.mouseWheelHandler, false);
                this.removeEventListener('DOMMouseScroll', $.fn.scrollbar.mouseWheelHandler, false);
            } else {
                this.onmousewheel = null;
            }
        }
    };


    $.fn.extend({
        mousewheel: function(fn){
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn){
            return this.unbind("mousewheel", fn);
        }
    });


    $.fn.scrollbar.mouseWheelHandler = function(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            returnValue = true,
            deltaX = 0,
            deltaY = 0;

        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if(event.wheelDelta){
            delta = event.wheelDelta / 120;
        }
        if(event.detail){
            delta = -event.detail / 3;
        }

        // Gecko
        if(orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS){
            deltaY = 0;
            deltaX = -1 * delta;
        }

        // Webkit
        if(orgEvent.wheelDeltaY !== undefined){
            deltaY = orgEvent.wheelDeltaY / 120;
        }
        if(orgEvent.wheelDeltaX !== undefined){
            deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return $.event.handle.apply(this, args);
    };

})(jQuery, document);  // inject global jQuery object