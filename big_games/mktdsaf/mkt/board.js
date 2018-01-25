function mkt(){
	this.bkg=new Image();
	this.bkg.src= 'mkt/img/bkg.png';
	
	this.board=new Image();
	this.board.src= 'mkt/img/board.png';
	
	this.rb=new robot(0);
	this.rb2=new robot(1);
	this.rb2.pos[0]=12;
	
	this.score1=0;
	this.score2=0;
	this.time=9600;
	
	this.adbgm = new Audio();
	this.adbgm.src= 'mkt/sound/bgm.mp3';
	this.adbgm.loop=true;
	this.bgmplayed= 0;
	
	this.adplus= new Audio();
	this.adplus.src= 'mkt/sound/plus.mp3';
	
	
	this.adget= new Audio();
	this.adget.src= 'mkt/sound/get.mp3';
	
	this.adwin= new Audio();
	this.adwin.src= 'mkt/sound/win.mp3';
	
	this.adno= new Audio();
	this.adno.src= 'mkt/sound/no.mp3';
	/*
	this.imgs=[];
	for(var x=0;x<20;x++){
		var tempimg= new Image();
		tempimg.src= 'mkt/img/'+(x+1)+'.png';
		this.imgs.push(tempimg);
	}
	*/
	
	
	this.goods=[];
	for(var x=0;x<20;x++){
		var para1= [4.5+6*parseInt((x%10)/5),3.5+3*parseInt(x/10)];
		var para2= (x%5)*20;
		var good= new dish(para1,para2,x+1);
		this.goods.push(good);
		
	}
	this.comm=['    apple   ','   grape    ','    pear    ','   orange   ','    peach   ',
			   'french fries','   cookie   ','   pizza    ','   sandwich ',' hamburger  ',
			   '   gloves   ','    coat    ','   scarf    ','    shirt   ','    shoes   ',
			   '    towel   ','  toothpast ','    soap    ','    comp    ',' toothbrush '
				];
	this.colors=['blue','red','green','yello','black'];
	
	
	this.status=[parseInt(Math.random()*1000)%20,parseInt(Math.random()*1000)%20,parseInt(Math.random()*1000)%20];
	
	this.mp=[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1, 
			0,0,0,0,3,3,3,0,4,4,4,0,5,5,5,0, 
			0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1, 
			0,0,0,1,2,2,2,2,2,1,2,2,2,2,2,1, 
			0,0,0,1,2,2,2,2,2,1,2,2,2,2,2,1, 
			0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1, 
			0,0,0,1,2,2,2,2,2,1,2,2,2,2,2,1, 
			0,0,0,1,2,2,2,2,2,1,2,2,2,2,2,1, 
			0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1];
	
	
	
	this.key_w=0;
	this.key_s=0;
	this.key_a=0;
	this.key_d=0;
	
	this.key_w2=0;
	this.key_s2=0;
	this.key_a2=0;
	this.key_d2=0;
	
	this.rend=function(){
		FrameDraw(this.bkg,0.5,0.5,1,1);
		
		for(var x in this.goods){
			this.goods[x].show();
		}
		this.rb.show();
		this.rb2.show();
		
		if(this.rb.bag.length!=0){
			if(count%60<=30){
				this.goods[this.rb.bag[this.rb.bag.length-1]-1].showen(this.rb.pos[0],this.rb.pos[1]-1);
			}	
		}
		
		
		if(this.rb2.bag.length!=0){
			if(count%60<=30){
				this.goods[this.rb2.bag[this.rb2.bag.length-1]-1].showen(this.rb2.pos[0],this.rb2.pos[1]-1);
			}	
		}
		for(var x in this.rb.bag){
			this.goods[this.rb.bag[x]-1].showen(0.8,this.rb.bag.length+0.5-parseInt(x),0);
			
		}
		for(var x in this.rb2.bag){
			this.goods[this.rb2.bag[x]-1].showen(1.9,this.rb2.bag.length+0.5-parseInt(x),0);
			
		}
		
		for(var x in this.status){
			FrameTxt(this.comm[this.status[x]],5,0.25+x*0.25,0.08,this.colors[parseInt(this.status[x]/5)]);
		}
		FrameTxt(this.score1,6,0.1,0.77,'blue');
		FrameTxt(this.score2,6,0.1,0.86,'blue');
		FrameTxt(Math.max(parseInt(this.time/10)/10,0),6,0.1,0.95,'blue');
		if(this.time<=0){
			if(this.time==0){
				this.adwin.play();
			}
			this.rb.pos=[5,4.5];
			this.rb2.pos=[12,4.5];
				
			var ret=this.score1+':'+this.score2
			FrameDraw(this.board,0.5,0.5,0.65,0.65,0);
			
			this.rb.show();
			this.rb2.show();
			FrameTxt(ret,10,(8.5-ret.length/5)/16,5/9,'blue');      
		}
		
	}
	this.work=function(){
		if(this.bgmplayed==0){
			this.adbgm.play();
			this.bgmplayed=1;
		}
		this.time-=2;
		if(this.time<0){
			return;
		}
		this.rb.ang= [this.key_a+this.key_d,this.key_w+this.key_s];
		this.rb.work(this,this.rb2);
		
		
		this.rb2.ang= [this.key_a2+this.key_d2,this.key_w2+this.key_s2];
		this.rb2.work(this,this.rb);
		
		for(var x in this.goods){
			this.goods[x].work();
		}
		
	}
	this.execmove=function(rx,ry){
		
	}
	this.exec= function(rx,ry){
		if(this.time<-200){
			this.time=9600;
			this.rb=new robot(0);
			this.rb2=new robot(1);
			this.rb2.pos[0]=12;
	
	this.score1=0;
	this.score2=0;
		}
		
	}
	this.pagedown= function(){
		
	}
	
	this.keydown=function(x){
		console.log(x)
		if(x==87){
			this.key_w=-1;
		}
		if(x==83){
			this.key_s=1;
			
		}
		if(x==65){
			this.key_a=-1;
		}
		if(x==68){
			this.key_d=1;
		}
		
		
		if(x==38){
			this.key_w2=-1;
		}
		if(x==40){
			this.key_s2=1;
			
		}
		if(x==37){
			this.key_a2=-1;
		}
		if(x==39){
			this.key_d2=1;
		}
		
		if(x==13){
			var target= this.rb2.tgt();
			var judge= this.mp[parseInt(target[1])*16+parseInt(target[0])];
			if( judge==3||judge==4||judge==5){
				console.log('jiaohuo'+judge);
				console.log(this.rb2.bag[this.rb2.bag.length-1],this.status[judge-3]);
				if(this.rb2.bag.length!=0){
					if(this.rb2.bag[this.rb2.bag.length-1]==this.status[judge-3]+1){
						this.rb2.koufen=[30,10];
						this.score2+=10;
						this.adplus.play();
					}
					else{
						this.rb2.koufen=[30,-5];
						this.score2-=5;
						this.adno.play();
					}
					this.rb2.bag.splice(this.rb2.bag.length-1,1);
					this.status[judge-3]=parseInt(Math.random()*1000)%20;
				}
			}
			else{
				if(this.rb2.bag.length<=4){
					for(var v in this.goods){
						var dx= this.goods[v].px-target[0];  
						var dy= this.goods[v].py-target[1];  
						if(Math.abs(dx)<0.5&&Math.abs(dy)<0.5&&this.goods[v].status== 1){
							this.goods[v].status= 0;
							this.rb2.bag.push(this.goods[v].kind);
							this.adget.play();
						}
					}
				}
				else{
					//
				}
				
			}
		}
		if(x==220){
			if(this.rb2.bag.length>1){
				this.rb2.bag.push(this.rb2.bag[0]);
				this.rb2.bag.splice(0,1);
			}
		}
		
		if(x==32){
			var target= this.rb.tgt();
			var judge= this.mp[parseInt(target[1])*16+parseInt(target[0])];
			if( judge==3||judge==4||judge==5){
				console.log('jiaohuo'+judge);
				console.log(this.rb.bag[this.rb.bag.length-1],this.status[judge-3]);
				if(this.rb.bag.length!=0){
					if(this.rb.bag[this.rb.bag.length-1]==this.status[judge-3]+1){
						this.rb.koufen=[30,10];
						this.score1+=10;
						this.adplus.play();
					}
					else{
						this.rb.koufen=[30,-5];
						this.score1-=5;
						this.adno.play();
					}
					this.rb.bag.splice(this.rb.bag.length-1,1);
					this.status[judge-3]=parseInt(Math.random()*1000)%20;
				}
					
					
				
			}
			else{
				if(this.rb.bag.length<=4){
					for(var v in this.goods){
						var dx= this.goods[v].px-target[0];  
						var dy= this.goods[v].py-target[1];  
						if(Math.abs(dx)<0.5&&Math.abs(dy)<0.5&&this.goods[v].status== 1){
							this.goods[v].status= 0;
							this.rb.bag.push(this.goods[v].kind);
							this.adget.play();
						}
					}
				}
				else{
					//
				}
				
			}
		}
		if(x==192){
			if(this.rb.bag.length>1){
				this.rb.bag.push(this.rb.bag[0]);
				this.rb.bag.splice(0,1);
			}
		}
	}
	
	this.keyup=function(x){
		if(x==87){
			this.key_w=0;
		}
		if(x==83){
			this.key_s=0;
			
		}
		if(x==65){
			this.key_a=0;
		}
		if(x==68){
			this.key_d=0;
		}
		
		
		if(x==38){
			this.key_w2=0;
		}
		if(x==40){
			this.key_s2=0;
			
		}
		if(x==37){
			this.key_a2=0;
		}
		if(x==39){
			this.key_d2=0;
		}
	}

}

function robot(kind){
	if(kind==0){
		
		this.body =new Image();
		this.body.src= 'mkt/img/robo.png';
		this.wheel =new Image();
		this.wheel.src= 'mkt/img/wheel.png';
	}
	else{
		
		this.body =new Image();
		this.body.src= 'mkt/img/robo2.png';
		this.wheel =new Image();
		this.wheel.src= 'mkt/img/wheel2.png';
	}
	
	
	this.koufen=[0,0];
	
	this.bag=[];
	this.pos= [5,5];
	
	this.sx= 1.04;
	this.sy= 1.5;
	
	this.wsx=1.0;
	this.wsy=0.97;
	
	this.speed= 0.08;
	
	this.ang=[0,0];
	this.op=0;
	this.show= function(){
		this.koufen[0]--;
		var wheelspeed= 9;
		if(this.ang[0]==0&&this.ang[1]==0){
			wheelspeed= 3;
		}
		FrameDraw(this.wheel,this.pos[0]/16,this.pos[1]/9,this.wsx/16,this.wsy/9,count*wheelspeed);
		FrameDraw(this.body,this.pos[0]/16,this.pos[1]/9,this.sx/16,this.sy/9,this.op);
		
		if(this.koufen[0]>0){
			var cl= 'red';
			var plus='';
			if(this.koufen[1]>0){
				cl= 'green';
				plus= '+';
			}
			FrameTxt(plus+this.koufen[1],10,this.pos[0]/16,this.pos[1]/9-0.2+this.koufen[0]/150,cl);
		}
		
	}
	
	this.tgt=function(){
		var oparow=[0,0];
		if(this.op==0){
			oparow=[0.5,0];
		}
		if(this.op==45){
			oparow=[0.5,-0.5];
		}
		if(this.op==90){
			oparow=[0,-0.5];
		}
		if(this.op==135){
			oparow=[-0.5,-0.5];
		}
		if(this.op==180){
			oparow=[-0.5,0];
		}
		if(this.op==225){
			oparow=[-0.5,0.5];
		}
		if(this.op==270){
			oparow=[0,0.5];
		}
		if(this.op==315){
			oparow=[0.5,0.5];
		}
		var retpos= [this.pos[0]+oparow[0],this.pos[1]+oparow[1]];
		return retpos;
		
	}
	this.work=function(scene,rb){
		var movestatus= Math.abs(this.ang[0])+Math.abs(this.ang[1]);
		if(movestatus!=0){
			var destx=0;
			var desty=0;
			if(movestatus==1){
				if(this.ang[0]>0){this.op=0}
				if(this.ang[0]<0){this.op=180}
				if(this.ang[1]>0){this.op=270}
				if(this.ang[1]<0){this.op=90}
				var destx= this.pos[0]+this.ang[0]*this.speed;
				var desty= this.pos[1]+this.ang[1]*this.speed;
				
			}
			if(movestatus==2){
				if(this.ang[0]>0){
					if(this.ang[1]>0){this.op=315}
					if(this.ang[1]<0){this.op=45}
				}
				if(this.ang[0]<0){
					if(this.ang[1]>0){this.op=225}
					if(this.ang[1]<0){this.op=135}
				}
				var destx= this.pos[0]+this.ang[0]*this.speed*0.72;
				var desty= this.pos[1]+this.ang[1]*this.speed*0.72;
				
			}
			var dx=Math.abs(destx-rb.pos[0]);
			var dy=Math.abs(desty-rb.pos[1]);
			if(dx<0.5&&dy<0.5){
				return;
			}
			
			if(scene.mp[parseInt(desty)*16+parseInt(destx)]==1){
				this.pos[0]=destx;
				this.pos[1]=desty;
			}
			else if(scene.mp[parseInt(this.pos[1])*16+parseInt(destx)]==1){
				this.pos[0]=destx;
			}
			else if(scene.mp[parseInt(desty)*16+parseInt(this.pos[0])]==1){
				this.pos[1]=desty;
			}
		}
	}
}

function dish(bps,offset,kind){
	this.status= 1;
	this.kind=kind;
	this.img=new Image();
	this.img.src= 'mkt/img/'+kind+'.png';
	
	this.plate =new Image();
	this.plate.src= 'mkt/img/plate.png';
	
	this.offset= offset;
	
	
	this.sx=0.75;
	this.sy=0.75;
	if(kind==1){
		this.sx=1;
		this.sy=0.75;
	}
	if(kind==2){
		this.sx=1.25;
		this.sy=1.25;
	}
	
	if(kind==3){
		this.sx=1;
		this.sy=1;
	}
	
	if(kind==4){
		this.sx=1;
		this.sy=1;
	}
	if(kind==5){
		this.sx=1;
		this.sy=1;
	}
	
	
	if(kind==6){
		this.sx=0.75;
		this.sy=0.65;
	}
	if(kind==7){
		this.sx=0.75;
		this.sy=0.55;
	}
	if(kind==8){
		this.sx=0.75;
		this.sy=0.65;
	}
	if(kind==9){
		this.sx=0.75;
		this.sy=0.65;
	}
	if(kind==10){
		this.sx=0.75;
		this.sy=0.65;
	}
	this.bps=bps;
	this.px=bps[0];
	this.py=bps[1];
	this.work=function(){
		if(this.offset<100){
			this.offset+=0.25;
			if(this.offset>=100){
				this.offset= 0;
				if(this.status== 0&&Math.random()<0.5){
					this.status= 1;
				}
			}
		}
		if(this.offset<=40){
			this.px=this.bps[0]+this.offset/10;
			this.py=this.bps[1];
		}
		else if(this.offset<=50){
			this.px=this.bps[0]+4;
			this.py=this.bps[1]+(this.offset-40)/10;
			
		}
		else if(this.offset<=90){
			this.px=this.bps[0]+4-(this.offset-50)/10;
			this.py=this.bps[1]+1;
			
		}
		else if(this.offset<=100){
			this.px= this.bps[0];
			this.py=this.bps[1]+1-(this.offset-90)/10;
		}
		
	}						
	this.show=function(){
		FrameDraw(this.plate,this.px/16,this.py/9,1.1/16,1.1/9);
		if(this.status==1){	
			FrameDraw(this.img,this.px/16,this.py/9,this.sx/16,this.sy/9);
		}
	}
	this.showen=function(rx,ry,type){
		if(type==0){
			FrameDraw(this.img,rx/16,ry/9,this.sx*1.1/16,this.sy*1.1/9,0);
		}
		else{
			FrameDraw(this.img,rx/16,ry/9,this.sx*1.4/16,this.sy*1.3/9,count*3);
		}
	}
}


