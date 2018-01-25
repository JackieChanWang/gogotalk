//depends=["mainpage","sayhi","boom","default_","choice","jiangningbo_train_01","lilinFlop1","bookpage","lastpage"];
depends=["rest"];
//FrameDraw(this.p1,0.15,0.65,.23,.5,0);
//		FrameDraw(this.p2,0.85,0.69,.12*1.3,.361*1.3,0);
//FrameDraw(this.p3,0.32,0.65,.0975*1.2,.511*1.2,0);
//FrameDraw(this.p4,0.735,0.65,.0975*1.1,.54*1.1,0);
/*============================================================================================================*/
/*==============================================     ����     ==============================================*/
/*==============================================                ==============================================*/
window.onload = load_tempers_js();
function load_tempers_js()
{
	for( x in depends){
		var head = document.getElementsByTagName('head');
		var testScript = document.createElement('script');
		testScript.src = depends[x]+'/board.js';
		testScript.type = 'text/javascript';
		head[0].appendChild(testScript);
	}
	
	
	
}

window.onload = load_rend_js();
window.onload = load_logic_js();
window.onload = load_spirit_js();
window.onload = load_board_js();
window.onload = load_init_js();
function load_rend_js()
{
	var head = document.getElementsByTagName('head');
	var testScript = document.createElement('script');
	testScript.src = 'static/rend.js';
	testScript.type = 'text/javascript';
	head[0].appendChild(testScript);
	
}
function load_board_js()
{
	var head = document.getElementsByTagName('head');
	var testScript = document.createElement('script');
	testScript.src = 'static/board.js';
	testScript.type = 'text/javascript';
	head[0].appendChild(testScript);
	
	
}
function load_spirit_js()
{
	var head = document.getElementsByTagName('head');
	var testScript = document.createElement('script');
	testScript.src = 'static/spirit.js';
	testScript.type = 'text/javascript';
	head[0].appendChild(testScript);
}
function load_logic_js()
{
	var head = document.getElementsByTagName('head');
	var testScript = document.createElement('script');
	testScript.src = 'static/logic.js';
	testScript.type = 'text/javascript';
	head[0].appendChild(testScript);
}
function load_init_js()
{
	var head = document.getElementsByTagName('head');
	var testScript = document.createElement('script');
	testScript.src = 'static/init.js';
	testScript.type = 'text/javascript';
	head[0].appendChild(testScript);
} 
/*==============================================       END      ==============================================*/
/*============================================================================================================*/


/*============================================================================================================*/
/*==============================================   ���ű����   ==============================================*/
/*==============================================                ==============================================*/
window.onload = function(){
//window.addEventListener('devicemotion',deviceMotionHandler, false); 
	SizeInit();
	
	
	var a={"method":"onPagenum","totalPages":depends.length}
		console.log(a);
		a=JSON.stringify(a);
		window.parent.postMessage(a,'*');
		
	if((navigator.userAgent.indexOf('iPhone') != -1) || 
		(navigator.userAgent.indexOf('iPod') != -1) || 
		(navigator.userAgent.indexOf('iPad') != -1)|| 
		(navigator.userAgent.indexOf('Android') != -1)|| 
		(navigator.userAgent.indexOf('Linux') != -1)){		
		canvas.addEventListener('touchstart', doTouchStart, false);			
		canvas.addEventListener('touchmove', doTouchMove, false);			
		canvas.addEventListener('touchend', doTouchEnd, false);	
			

		evt = "onorientationchange" in window ? "orientationchange" : "resize";
		window.addEventListener(evt, SizeInit, false);
	}
	else{
		canvas.addEventListener('mousedown', doMouseDown, false);
		canvas.addEventListener('mousemove', doMouseMove, false);
		canvas.addEventListener('mouseup', doMouseUp, false);
		
		
		window.addEventListener('keydown', doKeydown, false);
		window.addEventListener('keyup', doKeyup, false);
		
		window.onresize = function () {SizeInit();}
	}

	
	
	window.addEventListener('message',execMessage,false);
			
			
			
	var a={"method":"onLoadComplete"}
		console.log(a);
		a=JSON.stringify(a);
		window.parent.postMessage(a,'*');
		
	started=1;
	document.addEventListener('touchstart', function(){ 
		if(started==0){
			started=1;
		}
	}, false);
	
	
	document.addEventListener('mousedown', function(){ 
		if(started==0){
			started=1;
		}
	}, false);

/*---------------------------------------��ʼ��------------------------------------------*/
	init();
	
	
	
	
/*-----------------------------------      end       ------------------------------------*/	
	window.setInterval(Work, 20);
	window.setInterval(Rending,12);
}
/*==============================================       END      ==============================================*/
/*============================================================================================================*/
function SizeInit(){
	
	//event_canvas.style=" height: 100%;width: 100%;margin: 0;padding: 0;display: block;"
	canvas = document.getElementById("event_canvas"); 
	if (!canvas.getContext) { 
		console.log("Canvas not supported. Please install a HTML5 compatible browser."); 
		return; 
	} 
	tempContext = canvas.getContext("2d"); 
	tempContext.canvas.height=  window.innerHeight;
	tempContext.canvas.width=  window.innerWidth;
	
	SizeX= tempContext.canvas.width;
	SizeY= tempContext.canvas.height;
	
	if(SizeX<SizeY){
		temps= SizeY;
		SizeY=SizeX;
		SizeX=temps;
		isrotate= 1;
		tempContext.rotate(90*Math.PI/180);
		tempContext.translate(0,-SizeY);
	}
	else{
		isrotate=0;
	}

	if(SizeY>SizeX*0.5625){
		framepx=0;
		framesx=SizeX;
		framepy=(SizeY-SizeX*0.5625)/2;
		framesy=SizeX*0.5625;
	}
	else{
		framepx=(SizeX-SizeY/0.5625)/2;
		framesx=SizeY/0.5625;
		framepy=0;
		framesy=SizeY;
	}
	
	//console.log(framesx,framesy);
	
}


