$(function(){
	/*一级菜单点击事件*/
	$(".cf-first a").on("click",function(){
        $(this).removeClass("line").parent("li").siblings().find("a").addClass("line");
		$(this).siblings().show().parent("li").siblings().find("ul").hide();
		var kid = $(this).attr("cid");
		var toPos = $("#"+kid).offset().top-94;
		$('html,body').animate({scrollTop:toPos},300);
	})
	/*二级菜单点击事件*/
	$(".second-name").on("click",function(){
		$(this).addClass("lightpink prev").siblings().removeClass("lightpink prev");
		var _that = $(this);
		$("#e"+_that.attr("id")).addClass("newicon").siblings().removeClass("newicon");
        $("#e"+_that.attr("id")).trigger("click");
	})
    /*小图标悬停点击事件*/
    $(".room-area").on({
        mouseover:function(){
             $(this).addClass("newicon").siblings().removeClass("newicon");
        },
        click:function(){
            $(this).addClass("newicon").siblings().removeClass("newicon");
        var _that = $(this);
        $("#"+_that.attr("sid")).addClass("lightpink").siblings().removeClass("lightpink");
        if(!_that.attr("sign")){
            _that.attr("sign","true");

            var _time=new Date().getTime();
            var sceneId = $(this).attr("pid");
            var anchorId = $(this).attr("sid");
            var cateId = $(this).attr("catid");
            var recommendCondition = $(this).attr("recommendc")||"1";
            var recommendMode = $(this).attr("recommendm")||"2";
            var atgregion = $.cookie("atgregion").split("|")[0];
            function bigRecommend(){
                $.ajax({
                        type:"get",
                        dataType:"jsonp",
                        url:"//bigd.gome.com.cn/gome/rec",
                        data:{
                            boxid:recommendCondition==="1"?"box65":"box67",
                            area:atgregion,
                            cid:$.cookie("__clickidc"),
                            imagesize:130,
                            c3id:cateId,
                            callback:"dsptuijian"
                        }
                    }).done(function(data){
                            var resu = data.lst;
                            if (data.isSuccess==="Y"&&resu.length>0) {
                                var htm = '<div class="cLists" id="k'+_that.attr("sid")+'"><ul>';
                                for(var i= 0,j=resu.length;i<j && i<4;i++){
                                    htm += '<li><a target="_blank" href="'+resu[i].purl+'"><img src="'+resu[i].iurl+'"></a><div class="message"><p class="name"><a target="_blank" href="'+resu[i].purl+'">'+resu[i].pn+'</a></p><p class="price"><span>¥</span>'+resu[i].price+'</p></div></li>'
                                }
                                var html = htm+'</ul><a target="_blank" class="btn-more" href="//list.gome.com.cn/'+cateId+'.html">查看更多></a></div>';
                                _that.parents(".decorate-content").find(".decorate-tujian").append(html);
                                $("#k"+_that.attr("sid")).show().siblings().hide();
                            
                            }
                        }).fail(function(){
                            _that.attr("sign","");
                        });  
                }
            if(recommendMode==="1"){
                $.ajax({
                    type:"get",
                    dataType:"jsonp",
                    url:"//ss"+cookieDomain+"/item/v1/d/scene/skulist/"+sceneId+"/"+anchorId+"/flag/item/tuijian"+_time,
                    jsonpName:"tuijian"+_time,
                }).done(function(data){
                        var result = data.result;
                        if(data.success&&result.length>0){
                            var htm = '<div class="cLists" id="k'+_that.attr("sid")+'"><ul>';
                            for(var i=0,j=data.result.length;i<j && i<4;i++){
                                htm+='<li><a target="_blank" href="'+result[i].url+'"><img src="'+result[i].imgUrl+'"></a><div class="message"><p class="name"><a target="_blank" href="'+result[i].url+'">'+result[i].display+'</a></p><p class="price"><span>¥</span>'+result[i].price+'</p></div></li>'
                            }
                            _that.parents(".decorate-content").find(".decorate-tujian").append(htm+'</ul><a target="_blank" class="btn-more" href="//list.gome.com.cn/'+cateId+'.html">查看更多></a></div>');
                            $("#k"+_that.attr("sid")).show().siblings().hide();
                        }
                    }).fail(function(){
                        _that.attr("sign","");
                    });    
            }else if(recommendMode==="2"){
                bigRecommend();
            }
        }
        $("#k"+_that.attr("sid")).show().siblings().hide();
        }
    })

	/*菜单栏滚动固定*/
	var navTop = 0;
	$(window).scroll(function(){
        navTop = $(".decorate-nav").offset().top;
		var documentTop = $(document).scrollTop();
		if(documentTop>=navTop){
			$(".decorate-nav .cf").addClass("fixed");
		}else{
			$(".decorate-nav .cf").removeClass("fixed");
		}
        var cfirst = $(".cf-first").eq(getCurrentDom(".decorate-content",documentTop));
        cfirst.addClass("pink").siblings().removeClass("pink");
        cfirst.find("a").siblings().show().parent("li").siblings().find("ul").hide();

		
	})

	$(".cf-first").eq(0).addClass("pink").siblings().removeClass("pink");

	/*返回当前在屏幕可视区域内的指定节点的index*/
	function getCurrentDom(focusDom,screenAreaTop){
		if(($(focusDom).first().offset().top-95)>screenAreaTop){
			return 0;
		}else if($(focusDom).last().offset().top-95+$(focusDom).last().height()<screenAreaTop){
			return $(focusDom).length-1;
		}else{
			return $(focusDom).filter(function(){
				var _t = $(this).offset().top-345;
				var _h = $(this).height();
				if(_t <= screenAreaTop && _t+_h >= screenAreaTop ){
                        return true;
                    }
                return false;
			}).index(focusDom);
		}
	}


	/*图片延时加载*/
	function getScreenDom(focusDom,screenAreaTop,screenAreaBottom){ //获取当前屏幕区域内的指定节点
		return $(focusDom).filter(function(){
			var _h = $(this).offset().top;  //获取当前元素到文档顶端的距离
			if(_h >= screenAreaTop-540 && _h<=screenAreaBottom && !$(this).attr("isget")){
				$(this).attr("isget",true);
				return true;
			}
			return false;
		})
	}

	var timer = setInterval(function(){
		var screenAreaTop = $(document).scrollTop();
		var screenAreaBottom = $(document).scrollTop()+$(window).height();
		var domObj = getScreenDom(".decorate-content",screenAreaTop,screenAreaBottom); 
		if(domObj.length > 0){
            $.each(domObj,function(){
            	var dataSrc = $(this).find(".decorate-bg img").attr("data-src");
            	$(this).find(".decorate-bg img").attr("src",dataSrc);
                $(this).find(".room-area").eq(0).trigger("click");  //默认触发当前可见区域里的第一个 .room-area的点击事件
                })
            }
	},100)


})