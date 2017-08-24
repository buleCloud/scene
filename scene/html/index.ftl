<!DOCTYPE html>
<html lang="zh-CN">
<head> 
{%widget name="global_head"%}      
<@global_head title="场景购物" keyword="场景购物" description="场景购物" canonical=""  alternate="" applicable="pc" dns=['img','img1','img3','img4','css','js','app']/>

<link rel="stylesheet" href="<!--#include virtual='/n/common/default/style.html'-->">
<link rel="stylesheet" href="/css/scene.css">
<!--#include virtual="/n/common/global/global.html"-->
</head>

<body>
<!--#include virtual="/n/common/default/head.html"-->
<div class="decorate-menu">
	<div class="decorate-nav">
		<ul class="cf clearfix" id="first-nav">
			<#list sceneInfo.sceneInfo as cat_item>
				<#if cat_item_index == 0>
					<li class="cf-first pink">
				<#else>
					<li class="cf-first">
				</#if>
					<a cid="c${cat_item.id!}" class="line">
						<p class="nav-name">${cat_item.sceneName!}</p>
					</a>
					<ul class="cf-second pink">
						<#list cat_item.anchors as item>
							<#if item_index == 0>
								<li class="second-name lightpink" id="${item.id!}"><p>${item.anchorName!}</p></li>
							<#else>
								<li class="second-name" id="${item.id!}"><p>${item.anchorName!}</li>
							</#if>
						</#list>
					</ul>
				</li>
			</#list>		
		</ul>	
	</div>
</div>
<#list sceneInfo.sceneInfo as cat_item>
	<div class="decorate-content clearfix" id="c${cat_item.id!}">
		<#if cat_item_index &gt; 0>
            <div class="room-title title${(cat_item_index)!}">${(cat_item.sceneName)!}</div>
        </#if>
		<div class="decorate-bg">
			<img src="//img.gomein.net.cn/images/grey.gif" data-src="${cat_item.imgUrl!}">
			<ul>
				<#list cat_item.anchors as item>
					<#if item_index == 0>
						<li class="room-area newicon" id="e${item.id!}" sid="${item.id!}" pid="${cat_item.id!}" recommendc="${item.recommendCondition!}" recommendm="${item.recommendMode!}" catid="${item.categoryId!}" style="left:${item.anchorPositionX!}px;top:${item.anchorPositionY!}px">
					<#else>
						<li class="room-area" id="e${item.id!}" sid="${item.id!}" pid="${cat_item.id!}" recommendc="${item.recommendCondition!}" recommendm="${item.recommendMode!}" catid="${item.categoryId!}" style="left:${item.anchorPositionX!}px;top:${item.anchorPositionY!}px">
					</#if>
						<div class="word">
							<span class="bg">
								<i>${item.anchorName!}</i>
							</span>
						</div>
						<div class="dot0"></div>
						<div class="dot1"></div>
						<div class="dot2"></div>
					</li>
				</#list>
			</ul>
		</div>
		<div class="decorate-tujian">	
		</div>
	</div>
</#list>
<div class="decorate-content clearfix">
	<div class="room1-title">特色服务</div>
	<!--#include virtual="/n/ads/cjgwtsfw/index.html"-->
</div>
<div class="decorate-content clearfix">
	<div class="room-title">品牌专区</div>
	<div class="brandBox">
		<!--#include virtual="/n/ads/cjgwppzq/index.html"-->
		<!--#include virtual="/n/ads/cjgwpptb/index.html"-->
	</div>
</div>
<!--#include virtual="/n/ads/cjgwdbgg/index.html"-->
<!--#include virtual="/n/common/default/foot.html"-->
<!--#include virtual="/n/common/default/aside.html"-->
<script type="text/javascript" inbottom>
    $(function(){
        setTimeout(function(){
            s.pageName="办公馆:首页";  
            s.channel="办公馆";         
            s.prop1="办公馆:首页";      
            s.prop2="办公馆:首页";    
            s.prop3="办公馆:首页";      
            s.prop4="服务商城";    
            s.eVar3="办公馆";
            s.eVar30="办公馆";
            var s_code = s.t();
            if (s_code)  {document.write(s_code);}
        },2000);
    })        
</script>
<script src="<!--#include virtual='/n/common/default/script.html'-->,gmlib/unit/scode/1.0.0/scode.min.js,gmlib/unit/bigdata/1.0.0/bigdata.min.js,gmlib/unit/scodecommon/1.0.0/scodecommon.min.js"></script>
<script src="/js/scene.js"></script>
</body>
</html>