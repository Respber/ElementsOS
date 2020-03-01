var count=0;
var apps=new Array();
var zi=0,zii=0;

function setIconTab(idd,ico){
	var tab=document.getElementById("icon_tab");
	$(tab).css("left","200px");
	$(tab).css("width",(document.body.clientWidth-420)+"px");//(document.body.clientWidth-400)
	
	var span=document.createElement("img");
	span.id="img"+idd;
	span.setAttribute("class","test2");
	var m_span=tab.appendChild(span);
	m_span.src=db.app.system.icon[ico];
	
	
	m_span.onclick=function(){
		var tg=document.getElementById("div"+idd);
		//console.log(tg.getAttribute("isClosed"));
		if(tg.getAttribute("isClosed")=="0"){
			for(var i=0;i<apps.length;i++){
				if(apps[i]==tg){
					$(tg).css("opacity","1");
					$(apps[i]).fadeIn(200);
					$(apps[i]).css("z-index","99");
				}else{
					if(parseInt($(apps[i]).css("z-index"))-1<=0)$(apps[i]).css("z-index","99");
					$(apps[i]).css("z-index",($(apps[i]).css("z-index")-1));
				}
			}
			//tg.setAttribute("isClosed","1");
		}else{
			$(tg).css("opacity","1");
			$(tg).fadeIn(200);
			tg.setAttribute("isClosed","0");
		}
	};
	m_span.onmouseover=function(){
		var tg=document.getElementById("div"+idd);
		console.log(tg.getAttribute("isClosed"));
		if(tg.getAttribute("isClosed")=="1"){
			$(tg).css("opacity","0.8");
			$(tg).fadeIn(200);
		}
		for(var i=0;i<apps.length;i++){
			if(apps[i]!=tg){
				$(apps[i]).fadeOut(200)
			}
		}
		
	}
	m_span.onmouseout=function(){
		var tg=document.getElementById("div"+idd);
		if(tg.getAttribute("isClosed")=="1"){
			$(tg).fadeOut(200);
			$(tg).css("opacity","1");
		}
		for(var i=0;i<apps.length;i++){
			if(apps[i]!=void(0))
				if(apps[i]!=tg && apps[i].getAttribute("isClosed")!="1"){
					$(apps[i]).fadeIn(200)
				}
		}
	}
}
function deleteIconTab(idd){
	var target=document.getElementById("img"+idd);
	if (target != null)target.parentNode.removeChild(target);
}

function insertFrame(url,ico2,text){
	var m_mode=false;
	console.log("z-index:"+zi);
	var toppx=100;
	var leftpx=100;
	//位置变量
	
	count++;
	var div=document.createElement("div");
	div.setAttribute("class","test");
	div.setAttribute("isClosed","0");
	div.setAttribute("isMaxSize","0");
	var m_div=document.body.appendChild(div);
	m_div.id=("div"+(count-1));
	$(m_div).css("position","absolute");
	$(m_div).css("top",toppx+count*80+"px");
	$(m_div).css("left",leftpx+count*80+"px");
	$(m_div).css("z-index",zii);
	apps.push(m_div);
	console.log(apps);
	zii++;
	//创建iframe的div
	
	var ctrl_close=document.createElement("div");
	ctrl_close.setAttribute('class','ctrl');
	var m_ctrl_close=m_div.appendChild(ctrl_close);
	$(m_ctrl_close).css("position","absolute");
	$(m_ctrl_close).css("top","7px");
	$(m_ctrl_close).css("left","15px");
	$(m_ctrl_close).css("z-index","auto");
	$(m_ctrl_close).css("background-color","rgba(255,50,80,0.55)");//over:1
	$(m_ctrl_close).css("cursor","pointer");
	
	var ctrl_close_font=document.createElement("span");
	ctrl_close_font.setAttribute("class","fa fa-remove");
	var m_ctrl_close_font=m_ctrl_close.appendChild(ctrl_close_font);
	$(m_ctrl_close_font).css("position","absolute");
	$(m_ctrl_close_font).css("top","0px");
	$(m_ctrl_close_font).css("left","3px");
	$(m_ctrl_close_font).css("color","rgba(0,100,100,1)");
	$(m_ctrl_close_font).css("display","none");
	
	m_ctrl_close.onmouseover=function(){
		$(m_ctrl_close_font).fadeIn(200);
		setTimeout(function(){$(m_ctrl_close_font).fadeOut(200)},1000);
	}
	
	m_ctrl_close.onclick=function(){
		$(this.parentNode).fadeOut(200);
		deleteIconTab(parseInt(m_div.id.substring(1).substring(1).substring(1)));
		delete apps[parseInt(m_div.id.substring(1).substring(1).substring(1))];
		
		var flag=true;
		for(var i=0;i<apps.length;i++)if(apps[i]!==void(0))flag=false;
		if(flag){
			for(var i=0;i<apps.length;i++)apps.splice(i,1);
			count=0;
			var el=document.getElementsByClassName('test');
			for(var j=el.length-1;j>=0;j--){
				var childs = el[j].childNodes; 
				for(var i = childs.length - 1; i >= 0; i--)el[j].removeChild(childs[i]);
				el[j].parentNode.removeChild(el[j]);
			}
		}
	}
	//关闭键
	
	var ctrl_big=document.createElement("div");
	ctrl_big.setAttribute('class','ctrl');
	var m_ctrl_big=m_div.appendChild(ctrl_big);
	$(m_ctrl_big).css("position","absolute");
	$(m_ctrl_big).css("top","7px");
	$(m_ctrl_big).css("left","42px");
	$(m_ctrl_big).css("z-index","auto");
	$(m_ctrl_big).css("background-color","rgba(50,255,80,0.55)");//over:1
	$(m_ctrl_big).css("cursor","pointer");
	
	var ctrl_big_font=document.createElement("span");
	ctrl_big_font.setAttribute("class","fa fa-window-maximize");
	var m_ctrl_big_font=m_ctrl_big.appendChild(ctrl_big_font);
	$(m_ctrl_big_font).css("position","absolute");
	$(m_ctrl_big_font).css("top","3px");
	$(m_ctrl_big_font).css("left","2px");
	$(m_ctrl_big_font).css("color","rgba(100,0,100,1)");
	$(m_ctrl_big_font).css("font-size","8px");
	$(m_ctrl_big_font).css("display","none");
	
	var t0,l0,w0,h0,z0;
	m_ctrl_big.onmouseover=function(){
		if(m_div.getAttribute("isMaxSize")=="0"){
			t0=$(m_div).css("top");
			l0=$(m_div).css("left");
			w0=$(m_div).css("width");
			h0=$(m_div).css("height");
			z0=$(m_div).css("z-index");
		}
		$(m_ctrl_big_font).fadeIn(200);
		setTimeout(function(){$(m_ctrl_big_font).fadeOut(200)},1000);
	}
	m_ctrl_big.onclick=function(){
		if(m_div.getAttribute("isMaxSize")=="1"){
			m_div.setAttribute("isMaxSize","0");
		}else{
			m_div.setAttribute("isMaxSize","1");
		}
		
		if(m_div.getAttribute("isMaxSize")=="1"){
			console.log(t0,l0,w0,h0,z0);
			ctrl_big_font.setAttribute("class","fa fa-window-restore");
			$(m_div).css("position","absolute");
			$(m_div).css("top","0px");
			$(m_div).css("left","0px");
			$(m_div).css("z-index","99");
			$(m_div).css("width","100%");
			$(m_div).css("height","100%");
		}else{
			console.log("fff",t0,l0,w0,h0,z0);
			ctrl_big_font.setAttribute("class","fa fa-window-maximize");
			$(m_div).css("position","absolute");
			$(m_div).css("top",t0);
			$(m_div).css("left",l0);
			$(m_div).css("z-index",z0);
			$(m_div).css("width",w0);
			$(m_div).css("height",h0);
		}
	}
	//最大化键
	
	var ctrl_small=document.createElement("div");
	ctrl_small.setAttribute('class','ctrl');
	var m_ctrl_small=m_div.appendChild(ctrl_small);
	$(m_ctrl_small).css("position","absolute");
	$(m_ctrl_small).css("top","7px");
	$(m_ctrl_small).css("left","69px");
	$(m_ctrl_small).css("z-index","auto");
	$(m_ctrl_small).css("background-color","rgba(44,44,44,0.55)");//over:1
	$(m_ctrl_small).css("cursor","pointer");
	
	var ctrl_small_font=document.createElement("span");
	ctrl_small_font.setAttribute("class","fa fa-window-minimize");
	var m_ctrl_small_font=m_ctrl_small.appendChild(ctrl_small_font);
	$(m_ctrl_small_font).css("position","absolute");
	$(m_ctrl_small_font).css("top","0px");
	$(m_ctrl_small_font).css("left","3px");
	$(m_ctrl_small_font).css("color","rgba(200,200,200,1)");
	$(m_ctrl_small_font).css("font-size","8px");
	$(m_ctrl_small_font).css("display","none");
	
	m_ctrl_small.onmouseover=function(){
		$(m_ctrl_small_font).fadeIn(200);
		setTimeout(function(){$(m_ctrl_small_font).fadeOut(200)},1000);
	}
	m_ctrl_small.onclick=function(){
		m_div.setAttribute("isClosed","1");
		if(m_div.getAttribute("isMaxSize")=="1"){
			$(m_div).fadeOut(200);
			$(m_div).css("top","100px");
			$(m_div).css("left","100px");
			$(m_div).css("width","1280px");
			$(m_div).css("height","720px");
		}else{
			$(m_div).fadeOut(200);
		}
	}
	//最小化键
	
	var resize=document.createElement("div");
	resize.setAttribute('class','resize');
	var m_resize=m_div.appendChild(resize);
	$(m_resize).css("position","absolute");
	$(m_resize).css("bottom","-10px");
	$(m_resize).css("right","-10px");
	$(m_resize).css("z-index","auto");
	$(m_resize).css("background-color","rgba(0,0,0,0)");//over:1
	$(m_resize).css("cursor","se-resize");
	//右下角
	
	
	var title=document.createElement("p");
	title.setAttribute('class','title_text');
	var m_title=m_div.appendChild(title);
	m_title.innerHTML=text;
	//title
	
	var frame=document.createElement("iframe");
	var m_frame=m_div.appendChild(frame);
	m_frame.id=("frame"+(count-1));
	m_frame.src=url;
	//创建iframe
	
	$(m_div).draggable({ disabled:false });
	//设置div可拖动
	
	setIconTab(count-1,ico2);
	
	m_div.onclick=function(){
		console.log("id="+m_div.id);
		for(var i=0;i<apps.length;i++){
			if(apps[i]==this){
				setTimeout(function(){$(apps[i]).fadeIn(200)},200);
				$(apps[i]).css("z-index","99");
			}else{
				if(parseInt($(apps[i]).css("z-index"))-1<=0)$(apps[i]).css("z-index","99");
				$(apps[i]).css("z-index",($(apps[i]).css("z-index")-1));
			}
		}
	};
	//设置点击浮上
	zi=zi+2;
	
	
	m_resize.onmousedown=function(){
		$(m_div).draggable({ disabled:true });
		//初始化参数   
  		var el=m_resize;
  		var ell=el;
  		el=el.parentNode;
  		var els = el.style,
   	 	//鼠标的 X 和 Y 轴坐标   
    	x = y = 0;
  		//邪恶的食指   
  		$(ell).mousedown(function (e) {
    		//按下元素后，计算当前鼠标与对象计算后的坐标  
   			 x = e.clientX - el.offsetWidth, y = e.clientY - el.offsetHeight;
    		//在支持 setCapture 做些东东  
    		el.setCapture ? (
      			//捕捉焦点   
      			el.setCapture(),
      			//设置事件   
      			el.onmousemove = function (ev) {
       				mouseMove(ev || event)
      			},
     			el.onmouseup = mouseUp
    		):(
      			//绑定事件   
      			$(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp)
    		);
	 
    	//防止默认事件发生   
    	e.preventDefault()
 		});
  		//移动事件   
  		function mouseMove(e) {
    	//宇宙超级无敌运算中... 
   			els.width = e.clientX - x + 'px', //改变宽度
      		els.height = e.clientY - y + 'px' //改变高度 
  		}
  		//停止事件   
  		function mouseUp() {
    		//在支持 releaseCapture 做些东东   
    		el.releaseCapture ? (
      		//释放焦点   
      		el.releaseCapture(),
      		//移除事件   
      		el.onmousemove = el.onmouseup = null
    		) : (
      			//卸载事件   
      			$(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp)
    		)
  		}
	}
	m_resize.onmouseout=function(){
		$(m_div).draggable({ disabled:false });
	}
}
//app运行iframe

function checkTime(i) {
	  if (i < 10) {
   		 i = '0' + i;
  		}
  		return i;
}
function showTime() {
 		var myDate = new Date();
  		var year = myDate.getFullYear();
  		var month = myDate.getMonth() + 1;
  		var date = myDate.getDate();
  		var h = myDate.getHours();
  		var m = myDate.getMinutes();
  		var s = myDate.getSeconds();
  		m = checkTime(m);
  		s = checkTime(s);
  		h = checkTime(h);

  		var d = myDate.getDay();
  		var weekday = ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  		document.getElementById('time').innerHTML = h + ":" + m;
		document.getElementById('date').innerHTML = year+'/'+month+'/'+date;
		
		document.getElementById('day').innerHTML = weekday[d];
		document.getElementById('dat').innerHTML = date;
		setTimeout(showTime, 1000);
}//时间更新

function showHeaderBorder(){
	var header=document.getElementsByClassName("header")[0];
	var icons=document.getElementsByClassName("btn");
	header.onmouseover=function(){
		$(header).css("border-bottom","1px rgba(250,250,250,0.85) solid");
		for(var i=0;i<icons.length;i++){
			$(icons[i]).css("box-shadow","2px 0px rgba(250,250,250,0.25)");
		}
	}
	header.onmouseout=function(){
		$(header).css("border-bottom","none");
		for(var i=0;i<icons.length;i++){
			$(icons[i]).css("box-shadow","none");
		}
	}
}//任务栏白框


var m_time=document.getElementById("time");
var m_date=document.getElementById("date");
var main_time=document.getElementById("ttime");
//function timeIconAnimate(){
	main_time.onmouseover=function(){
		$(m_time).animate({'top':'-3px','font-size':'15px','letter-spacing':'0px'},500);
		$(m_date).css("display","inline");
		$(m_date).animate({'top':'15px','font-size':'13px','right':'7px'},500);
		setTimeout(closeTimeIcon,2500);
	}
//}
function closeTimeIcon(){
		$(m_time).animate({'top':'0px','font-size':'20px'},500);
		$(m_date).animate({'top':'-50px','font-size':'20px','right':'7px'},500);
		$(m_date).css("display","none");
}

function application(){
	var bt=document.getElementById("app_bt");
	var tab=document.getElementById("app_tab");
	
	bt.onclick=function(){
		if(tab.getAttribute('isClosed')=="0"){
			tab.setAttribute('isClosed',"1");
		}else{
			tab.setAttribute('isClosed',"0");
		}
		if(tab.getAttribute('isClosed')=="1"){
			$(tab).fadeOut(200);
			$(".header").eq(0).animate({opacity:"1"},100);
			$(".header").eq(0).fadeIn(50);
			for(var i=0;i<apps.length;i++){
				if(apps[i].getAttribute("isClosed")=="0")$(apps[i]).fadeIn(200);
			}
		}else{
			setTimeout(function(){$(tab).fadeIn(200);},500);
			$(".header").eq(0).animate({opacity:"0"},100);
			$(".header").eq(0).fadeOut(50);
			for(var i=0;i<apps.length;i++){
				$(apps[i]).fadeOut(200);
			}
		}
	}
}
function appTabs(){

}
window.onload=function(){
	showTime();
	showHeaderBorder();
	setIconTab(-1);
	//alert("test");
	deleteIconTab(-1);
	//timeIconAnimate();
	application();
	appTabs();
	
	insertFrame(db.app.system.url[0],0,'123');
	insertFrame(db.app.system.url[0],0,'123')
	
	document.getElementById("main_bg").onclick=function(){
		var tab=document.getElementById("app_tab");
		$(".header").eq(0).fadeIn(50);
		$(tab).fadeOut(200);
		$(".header").eq(0).animate({opacity:"1"},100);
		if(tab.getAttribute("isClosed")=="0"){
			setTimeout(function(){for(var i=0;i<apps.length;i++)if(apps[i].getAttribute("isClosed")=="0")$(apps[i]).fadeIn(200);},300);
		}
		if(tab.getAttribute('isClosed')=="0"){
			tab.setAttribute('isClosed',"1");
		}else{
			tab.setAttribute('isClosed',"0");
		}
	}
}


