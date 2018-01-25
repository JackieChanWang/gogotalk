function rest(){
	
	/****************************** config *******************************/
	this.bkg=new Image();
	this.bkg.src='rest/img/bkg.png';
	
	this.pat1=new Image();
	this.pat1.src='rest/img/pat1.png';
	this.pat2=new Image();
	this.pat2.src='rest/img/pat2.png';
	this.pat3=new Image();
	this.pat3.src='rest/img/pat3.png';
	
	this.body=new Image();
	this.body.src='rest/img/body.png';
	
	this.wheel=new Image();
	this.wheel.src='rest/img/wheel.png';
	
	this.hook=new Image();
	this.hook.src='rest/img/hook.png';
	
	this.comm=new Image();
	this.comm.src='rest/img/comm.png';
	
	this.want1=new Image();
	this.want1.src='rest/img/want1.png';
	this.want2=new Image();
	this.want2.src='rest/img/want2.png';
	this.want3=new Image();
	this.want3.src='rest/img/want3.png';
	this.want4=new Image();
	this.want4.src='rest/img/want4.png';
	this.want5=new Image();
	this.want5.src='rest/img/want5.png';
	this.want6=new Image();
	this.want6.src='rest/img/want6.png';
	this.wants=[this.want1,this.want2,this.want3,this.want4,this.want5,this.want6];
	
	this.gap=50;
	
	this.px=8;
	this.py=4.5;
	this.sx=1.6;
	this.sy=1.4;
	
	this.rubo =new robot(this.body,this.px,this.py,this.sx,this.sy,this.wheel,this.hook);
	/******************************  end   ******************************/
	
	this.bullets='The guests were very angry!';
	this.bltime= 0;
	
	this.dishes=[];
	this.wantstatus= [parseInt(Math.random()*100)%6+1,parseInt(Math.random()*100)%6+1,parseInt(Math.random()*100)%6+1];
	
	this.time= 4800;
	this.score= 0;
	
	this.rend=function(){
		FrameDraw(this.bkg,0.5,0.5,1,1);
		FrameDraw(this.pat1,0.33,0.11,0.18,0.21);
		FrameDraw(this.pat2,0.55,0.11,0.18,0.21);
		FrameDraw(this.pat3,0.77,0.11,0.18,0.21);
		
		FrameDraw(this.comm,0.7,0.55,0.37,0.3);
		
		for(var x in this.wantstatus){
			if(this.wantstatus[x]!=0){
				var tempimg= this.wants[this.wantstatus[x]-1];
				FrameDraw(tempimg,0.27+0.22*x,0.26,0.13,0.15);
			}
		}
		
		
		FrameTxt('Time : '+Math.max(0,parseInt(this.time/48*10)/10),4.5,0.03,0.09,'black');
		FrameTxt('Score: '+this.score,4.5,0.03,0.16,'black');
		this.rubo.show();
		for(var x in this.dishes){
			this.dishes[x].show();
		}
		if(this.bltime>0){
			FrameTxt(this.bullets,4,0.1,0.4,'green');
		}
		
		if(this.time<=0){
			FrameTxt('Your score: '+this.score,15,0.2,0.5,'blue');
			
		}
	}
	this.work=function(){
		this.time--;
		this.bltime--;
		if(this.time<=0){
			return;
		}
		if(this.gap==0){
			
			var tds=new dish( parseInt(Math.random()*1000)%7);
			this.dishes.push(tds);
			this.gap=50+parseInt(Math.random()*1000)%30;
			
			
		}
		if(count%200==0){
			for(var x in this.wantstatus){
				if(this.wantstatus[x]==0){
					this.wantstatus[x]=parseInt(Math.random()*1000)%6+1;
				}
			}
		}
			
		else{
			this.gap--;
		}
	
		this.rubo.work();
		for(var x in this.dishes){
			this.dishes[x].work();
			if(this.dishes[x].pospara>120){
				this.dishes.splice(x,1);
			}
		}
		if(this.rubo.status==0&&this.rubo.dish!=0){
			if(this.rubo.pos[1]>0.7&&this.rubo.pos[1]<1.9){
					if(this.rubo.pos[0]>4.5 &&this.rubo.pos[0]<6 ){
						if( this.rubo.dish.kind==0){
							this.scorechange(-2);
						}
						else if(this.rubo.dish.kind==this.wantstatus[0]){
							this.scorechange(5);
						}
						else{
							this.scorechange(-5);
						}
						this.wantstatus[0]=0;
						this.rubo.dish=0;
					}	
					if(this.rubo.pos[0]>8 &&this.rubo.pos[0]<9.5 ){
						if( this.rubo.dish.kind==0){
							this.scorechange(-2);
						}
						else if(this.rubo.dish.kind==this.wantstatus[1]){
							this.scorechange(5);
						}
						else{
							this.scorechange(-5);
						}
						this.wantstatus[1]=0;
						this.rubo.dish=0;
					}
					if(this.rubo.pos[0]>11.5 &&this.rubo.pos[0]<13 ){
						if( this.rubo.dish.kind==0){
							this.scorechange(-2);
						}
						else if(this.rubo.dish.kind==this.wantstatus[2]){
							this.scorechange(5);
						}
						else{
							this.scorechange(-5);
						}
						this.wantstatus[2]=0;
						this.rubo.dish=0;
					}
				}
		}
		if(this.rubo.status==1){
			if(this.rubo.dish==0){
				for(var x in this.dishes){
					var dx= Math.abs(this.rubo.hookpos1*16- this.dishes[x].pos[0]);
					var dy= Math.abs(this.rubo.hookpos2*9- this.dishes[x].pos[1]);
					if(dx<0.5&&dy<0.5){
						this.rubo.status=2;
						this.rubo.dish=this.dishes[x];
						this.dishes.splice(x,1);
					}
				}
			}
			else{
				if(this.rubo.hookpos2*9>0.7&&this.rubo.hookpos2*9<1.9){
					if(this.rubo.hookpos1*16>4.5 &&this.rubo.hookpos1*16<6 ){
						if( this.rubo.dish.kind==0){
							this.scorechange(-2);
						}
						else if(this.rubo.dish.kind==this.wantstatus[0]){
							this.scorechange(5);
						}
						else{
							this.scorechange(-5);
						}
						this.wantstatus[0]=0;
						
						this.rubo.status=2;
						this.rubo.dish=0;
					}	
					if(this.rubo.hookpos1*16>8 &&this.rubo.hookpos1*16<9.5 ){
						if( this.rubo.dish.kind==0){
							this.scorechange(-2);
						}
						else if(this.rubo.dish.kind==this.wantstatus[1]){
							this.scorechange(5);
						}
						else{
							this.scorechange(-5);
						}
						this.wantstatus[1]=0;
						
						this.rubo.status=2;
						this.rubo.dish=0;
					}
					if(this.rubo.hookpos1*16>11.5 &&this.rubo.hookpos1*16<13 ){
						if( this.rubo.dish.kind==0){
							this.scorechange(-2);
						}
						else if(this.rubo.dish.kind==this.wantstatus[2]){
							this.scorechange(5);
						}
						else{
							this.scorechange(-5);
						}
						this.wantstatus[2]=0;
						
						this.rubo.status=2;
						this.rubo.dish=0;
					}
				}
			}
			
		}
	}
	this.exec= function(rx,ry){
		if(this.time<-100){
			this.time=4800;
			this.score=0;
			this.dishes=[];
			this.rubo.dish=0;
		}
		var vx= rx*16;
		var vy= ry*9;
		var dx= vx-this.rubo.pos[0];
		var dy= vy-this.rubo.pos[1];
		var dstag= Math.atan(dy/dx);
		if(dx>0){
			dstag-=Math.PI;
		}
		if(this.rubo.status!=1&&this.rubo.status!=2){
			this.rubo.ang=-dstag/Math.PI*180+90;
			this.rubo.dst=[vx,vy];
		}
		console.log(vx,vy);
		
	}
	this.pagedown= function(){
	}
	
	this.keydown=function(x){
		console.log(x);
		if(x==65){
			if(this.rubo.status==0){
				this.rubo.status= 1;
				this.rubo.dst=[-1,-1];
			}
		}
		if(x==83){
			this.rubo.dst=[-1,-1];
		}
		
		if(x==68){
			if(this.rubo.status==0){
				this.rubo.dish=0;
			}
		}
	}
	this.keyup=function(x){
	}
	
	this.scorechange=function(val){
		this.score+=val;
		if(val== 5){
			this.bullets='Great! Score +5!!';
		}
		if(val== -2){
			this.bullets='Empty dish?! Score -2!!!';
		}
		if(val== -5){
			this.bullets='Wrong dish!!! Score -5!!!';
		}
		this.bltime= 100;
	}
}

function robot(img,px,py,sx,sy,wheel,hook){
	this.status= 0;
	
	this.dish=0;
	
	this.dst=[-1,-1] ;
	
	this.ang=45;
	this.pos=[px,py];
	this.size=[sx,sy];
	this.body=img;
	this.wheel=wheel;
	this.hook=hook;
	this.hookpos1=0;
	this.hookpos2=0;
	
	this.hooklen=0.1;
	this.show=function(){
		FrameDraw( this.body,this.pos[0]/16,this.pos[1]/9,this.size[0]/14,this.size[1]/9,this.ang);
		
		var ox1=0*this.size[0]/42;
		var ox2=0*this.size[0]/125/16*9;
		
		var lx1= ox1 * Math.cos(-this.ang/180*Math.PI) - ox2 * Math.sin(-this.ang/180*Math.PI);
		var lx2= ox1 * Math.sin(-this.ang/180*Math.PI) + ox2 * Math.cos(-this.ang/180*Math.PI);
		lx2=lx2/9*16
		//FrameDraw( this.wheel,this.pos[0]/16+lx1,this.pos[1]/9+lx2,0.009,0.016,count*36);
		
		this.hookpos1=this.pos[0]/16+lx1+this.hooklen*Math.cos(-this.ang/180*Math.PI-Math.PI/2)/16;
		this.hookpos2=this.pos[1]/9+lx2+this.hooklen*Math.sin(-this.ang/180*Math.PI-Math.PI/2)/9;
		var dx=0.009;
		for(var x=0;x<this.hooklen-0.009;x+=0.13){
			FrameDraw( this.wheel,
			this.pos[0]/16+lx1+x*Math.cos(-this.ang/180*Math.PI-Math.PI/2)/16,
			this.pos[1]/9+lx2+x*Math.sin(-this.ang/180*Math.PI-Math.PI/2)/9,
			0.009,
			0.016,
			count*36);
		}
		FrameDraw( this.hook,this.hookpos1,this.hookpos2,0.045,0.055,this.ang);
		if(this.dish!=0){
			this.dish.showen(this.hookpos1,this.hookpos2);
		}
	}
	this.work=function(){
		if(this.status==0){
			if(this.dst[0]!=-1){
				var dx=this.dst[0]-this.pos[0];
				var dy=this.dst[1]-this.pos[1];
				var dz= Math.sqrt(dx*dx+dy*dy);
				if(Math.abs(dx)>0.03){
					this.pos[0]+=dx/dz*0.06;
					this.pos[1]+=dy/dz*0.06;
				}
			}
		}
		if(this.status== 1){
			if(this.hooklen<5.5){
				this.hooklen+=0.2;
				if(this.hooklen>5.5){
					this.status= 2;
				}
			}
			
		}
		if(this.status== 2){
			if(this.hooklen>0.1){
				this.hooklen-=0.2;
				if(this.hooklen<=0.1){
					this.hooklen=0.1;
					this.status= 0;
				}
			}
			
		}
	}
}

function dish(kind){
	this.pospara=0;
	this.pos=[-1,-1];
	this.plate=new Image();
	this.plate.src= 'rest/img/dish.png';
	this.kind=kind;
	if(kind==0){
		this.food=new Image();
	}
	if(kind== 1){
		this.food=new Image();
		this.food.src= 'rest/img/food1.png';
	}
	if(kind== 2){
		this.food=new Image();
		this.food.src= 'rest/img/food2.png';
	}
	if(kind== 3){
		this.food=new Image();
		this.food.src= 'rest/img/food3.png';
	}
	if(kind== 4){
		this.food=new Image();
		this.food.src= 'rest/img/food4.png';
	}
	if(kind== 5){
		this.food=new Image();
		this.food.src= 'rest/img/food5.png';
	}
	if(kind== 6){
		this.food=new Image();
		this.food.src= 'rest/img/food6.png';
	}
	this.show=function(){
		FrameDraw(this.plate,this.pos[0]/16,this.pos[1]/9,0.054,0.096,0);
		if(this.kind!=0){
			FrameDraw(this.food,this.pos[0]/16,this.pos[1]/9-0.005,0.045,0.06,0);
		}
	}
	this.showen=function(rx,ry){
		FrameDraw(this.plate,rx,ry,0.054,0.096,0);
		if(this.kind!=0){
			FrameDraw(this.food,rx,ry-0.005,0.045,0.06,0);
		}
	}
	this.work=function(){
		this.pospara+=0.15;
		if(this.pospara<25){
			this.pos=[0.93,2.5+this.pospara*5.6/25]
		}
		else if(this.pospara<88){
			this.pos=[0.93+(this.pospara-25)*14.3/63,8.1];
		}
		else{
			this.pos=[15.23,8.1-(this.pospara-88)*6.5/27];
		}
	}
}
