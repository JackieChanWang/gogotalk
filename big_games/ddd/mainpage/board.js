function mainpage(){
	G_faile=0;
	this.data_cfg={
		
	}
	
	/********************************* need config *********************************/
	this.bkg= new Image();
	this.bkg.src= 'mainpage/img/bkg.jpg';
	this.plmodel= new Image();
	this.plmodel.src= 'mainpage/img/plane.png';
	
	
	this.blmodel1= new Image();
	this.blmodel1.src= 'mainpage/img/bl1.png';
	this.boom= new Image();
	this.boom.src= 'mainpage/img/boom.png';
	this.sz=1;
	this.sy=1.2;
	this.plspeed= 0.07;
	
	this.bgs=[]
	var bg1= new Image();
	bg1.src= 'mainpage/img/1.png';
	this.bgs.push(bg1);
	var bg2= new Image();
	bg2.src= 'mainpage/img/2.png';
	this.bgs.push(bg2);
	var bg3= new Image();
	bg3.src= 'mainpage/img/3.png';
	this.bgs.push(bg3);
	var bg4= new Image();
	bg4.src= 'mainpage/img/4.png';
	this.bgs.push(bg4);
	var bg5= new Image();
	bg5.src= 'mainpage/img/5.png';
	this.bgs.push(bg5);
	/************************************  end  ************************************/
	this.key_w=0;
	this.key_s=0;
	this.key_a=0;
	this.key_d=0;
	
	this.maxbl= 5;
	this.bkgoffset= 0;
	this.speed= 1000;
	this.plane= new plane(this.plmodel,8,8,this.sz,this.sy,this.plspeed,this.boom);
	
	this.bullets=[];
	
	this.rend=function(){
		var osview= this.bkgoffset/1000000;
		//console.log(osview);
		/*
		while (osview>0){
			osview-=1.4
		}
		*/
		if(osview>0){
			osview=osview%1.4-1.4;
		}
		FrameDraw(this.bkg,0.5,0.5+osview,1.01,1.41);
		FrameDraw(this.bkg,0.5,1.9+osview,1.01,1.41);
		
		var sub=0;
		if(this.speed<3000){
			sub=0;
		}
		else if(this.speed<6000){
			sub=1;
		}
		else if(this.speed<11000){
			sub=2;
		}
		else if(this.speed<16000){
			sub=3;
		}
		else if(this.speed<20000){
			sub=4;
		}
		else{
			sub=2+parseInt(count/12)%3;
		}
		FrameDraw(this.bgs[sub],0.5,0.5,1.01,1.01);
		
		this.plane.show();
		for(var x in this.bullets){
			this.bullets[x].show();
		}
		FrameTxt(parseInt(this.bkgoffset/100)+' m',5,0.015,0.07,'white');
		if(G_faile>0){
			FrameTxt('Crash !!!',10,0.1,0.4,'red');
			FrameTxt('at '+parseInt(this.bkgoffset/100)/1000+' KM',15,0.3,0.55,'white');
		
		}
	}
	this.work=function(){
		if(G_faile>0){
			return;
		}
		if(count%100==0){
			this.maxbl++;
		}
		if(this.speed<=20000){
			this.speed+=1;
		}
		this.bkgoffset+=this.speed;
		this.plane.ang= [this.key_a+this.key_d,this.key_w+this.key_s];
		this.plane.work();
		for(var x in this.bullets){
			this.bullets[x].work();
			var dx=this.bullets[x].pos[0]-this.plane.pos[0];
			var dy=this.bullets[x].pos[1]-this.plane.pos[1];
			if(Math.abs(dx)<0.3&&Math.abs(dy)<0.4){
				G_faile=count;
			}
			if(this.bullets[x].pos[0]<0||
				this.bullets[x].pos[0]>16||
				this.bullets[x].pos[1]<0||
				this.bullets[x].pos[1]>9){
				this.bullets.splice(x,1);
			}
			//console.log(this.bullets[x]);
		}
		//console.log(this.bullets.length);
		if(this.bullets.length<this.maxbl){
			var rsin= Math.random();
			var tps=[0,0];
			var ang=parseInt(Math.random()*100000)%360;
			if(parseInt(rsin*1000)%4==0){
				tps=[0,9*rsin]
			}
			if(parseInt(rsin*1000)%4==1){
				tps=[16,9*rsin]
			}
			if(parseInt(rsin*1000)%4==2){
				tps=[16*rsin,0]
			}
			if(parseInt(rsin*1000)%4==3){
				tps=[16*rsin,9]
			}
			
			var blt= new enemy(this.blmodel1,tps[0],tps[1],1,0.88,[0,ang,80]);
			this.bullets.push(blt);
		}
	}
	this.exec= function(rx,ry){
		console.log(1);
		if(count-G_faile>100&&G_faile>0){
			G_faile=0;
			this.bullets=[];
			this.bkgoffset=0;
			this.maxbl= 5;
			this.speed= 1000;
		}
	}
	this.pagedown= function(){
	}
	
	this.keydown=function(x){
		console.log(x);
		if(x==87||x==38){
			this.key_w=-1;
		}
		if(x==83||x==40){
			this.key_s=1;
			
		}
		if(x==65||x==37){
			this.key_a=-1;
		}
		if(x==68||x==39){
			this.key_d=1;
		}
	}
	this.keyup=function(x){
		if(x==87||x==38){
			this.key_w=0;
		}
		if(x==83||x==40){
			this.key_s=0;
			
		}
		if(x==65||x==37){
			this.key_a=0;
		}
		if(x==68||x==39){
			this.key_d=0;
		}
	}
}

function plane(img,px,py,sx,sy,speed,boom){
	this.pos=[px,py];
	this.size=[sx,sy];
	this.model= img;
	this.speed= speed;
	this.boom= boom;
	
	this.ang=[-1,-1];
	this.crtwt=1;
	this.dstwt=1;
	
	this.crtag=0;
	this.dstag=0;
	
	this.show=function(){
		var tmpwt= this.crtwt+(Math.abs(count/6%11-5)-5)/60;
		FrameDraw(this.model,this.pos[0]/16,this.pos[1]/9,this.size[0]/16*tmpwt,this.size[1]/9,this.crtag);
		if(G_faile>0){
			FrameDraw(this.boom,this.pos[0]/16,this.pos[1]/9,0.1*(1+count%6/20),0.2*(1+count%6/20),0);
		}
	}
	this.work=function(){
		if(this.ang[0]!=0){
			this.dstwt=0.7;
			if(this.ang[0]==-1){
				this.dstag= 20;
			}
			if(this.ang[0]==1){
				this.dstag= -20;
			}
		}
		else{
			this.dstwt=1;
			this.dstag=0;
		}
		if(this.dstwt==1){
			if(this.crtwt<1){
				this.crtwt+=0.012;
				if(this.crtwt>1){
					this.crtwt=1;
				}
			}
		}
		else if(this.dstwt<1){
			if(this.crtwt>this.dstwt){
				this.crtwt-=0.012;
				if(this.crtwt<this.dstwt){
					this.crtwt=this.dstwt;
				}
			}
		}
		if(this.crtag<this.dstag){
			this.crtag+=2;
		}
		else if(this.crtag>this.dstag){
			this.crtag-=2;
		}
		
		var movestatus= Math.abs(this.ang[0])+Math.abs(this.ang[1]);
		if(movestatus==1){
			this.pos[0]+=this.ang[0]*this.speed;
			this.pos[1]+=this.ang[1]*this.speed;
			
		}
		if(movestatus==2){
			this.pos[0]+=this.ang[0]*this.speed*0.72;
			this.pos[1]+=this.ang[1]*this.speed*0.72;
			
		}
		if(this.pos[0]>16){
			this.pos[0]=16;
		}
		if(this.pos[0]<0){
			this.pos[0]=0;
		}
		if(this.pos[1]>9){
			this.pos[1]=9;
		}
		if(this.pos[1]<0){
			this.pos[1]=0;
		}
	}
	
}

function enemy(img,px,py,sx,sy,movepara){
	this.pos=[px,py];
	this.size=[sx,sy];
	this.model= img;
	this.movepara= movepara;
	
	this.ang=0;
	this.work= function(){
		if(this.movepara[0]==0){
			this.pos[0]+= movepara[2]*Math.cos(movepara[1]*Math.PI/180)/1000;
			this.pos[1]+= movepara[2]*Math.sin(movepara[1]*Math.PI/180)/1000;
			this.ang= movepara[1];
		}
	}
	this.show=function(){
		FrameDraw(this.model,this.pos[0]/16,this.pos[1]/9,this.size[0]/16,this.size[1]/9,-this.ang);
	}
}

