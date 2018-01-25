function fruit(){
	this.names=['apple','watermelon','grapes','pear','orange','peach','pineapple','cherry'];
	this.bonus=[8,15,10,8,8,8,12,20];
	this.time=4800;
	this.status=0;
	this.score= 0;
	shoot1=new Audio();
	shoot1.src='fruit/sound/shoot.wav';
	shoot2=new Audio();
	shoot2.src='fruit/sound/shoot.wav';
	shoot3=new Audio();
	shoot3.src='fruit/sound/shoot.wav';
	shoot4=new Audio();
	shoot4.src='fruit/sound/shoot.wav';
	shoot5=new Audio();
	shoot5.src='fruit/sound/shoot.wav';
	shoot6=new Audio();
	shoot6.src='fruit/sound/shoot.wav';
	this.shootsounds=[shoot1,shoot2,shoot3,shoot4,shoot5,shoot6];
	this.shootnum=0;
	
	
	this.shake=0;
	this.bkg=new Image();
	this.bkg.src= 'fruit/img/bkg.png';
	
	this.aim=new Image();
	this.aim.src= 'fruit/img/aim.png';
	
	this.hole=new Image();
	this.hole.src= 'fruit/img/hole.png';
	
	this.holes=[];
	this.tips=[];
	
	this.aimpos=[-1,-1];
	
	this.ufos=[];
	this.rend=function(){
		rotalepara= 0;
		if(this.shake> 0){
			rotalepara= count*2%8;
		}

		if(rotalepara!=0){
			tempContext.translate(-SizeX*0.001*rotalepara,-SizeY*0.001*rotalepara);
		}
		
		FrameDraw(this.bkg,0.5,0.5,1.05,1.05)
		
		for(var x in this.holes){
			FrameDraw(this.hole,this.holes[x][1],this.holes[x][2],0.09,0.16)
		}
		for(var x in this.ufos){
			this.ufos[x].show();
		}
		FrameDraw(this.aim,this.aimpos[0],this.aimpos[1],0.18,0.32)
		
		if(rotalepara!=0){
			tempContext.translate(SizeX*0.001*rotalepara,SizeY*0.001*rotalepara);
		}
		
		for(var x in this.tips){
			this.tips[x][1]--;
			if(this.tips[x][0]>0){
				FrameTxt('+'+this.tips[x][0],12,this.tips[x][2],this.tips[x][3]-0.5+this.tips[x][1]/240,'green');
			}
			else{
				FrameTxt(this.tips[x][0],12,this.tips[x][2],this.tips[x][3]-0.5+this.tips[x][1]/240,'red');
			}
			if(this.tips[x][1]<=0){
				this.tips.splice(x,1);
			}
		}
		
		if(this.status!=-1){
			FrameTxt('Find',6,0.02,0.1,'green');
			FrameTxt(this.names[this.status],8,0.12,0.1,'yellow');
			FrameTxt('And shoot!',6,0.02,0.22,'green');
		}
		FrameTxt('Time  : '+Math.max(0,this.time/48),7,0.75,0.1,'blue');
		FrameTxt('Score : ' + this.score,7,0.75,0.2,'blue');
		if(this.time<=0){
			FrameTxt('Your score: '+this.score,15,0.2,0.5,'blue');
			
		}
	}
	this.work=function(){
		this.time--;
		if(this.time<=0){
			return;
		}
		if(count%500==0){
			this.status=parseInt(Math.random()*1000)%8;
		}
		this.shake--;
		if(count%15==0){
			var ufoobj= new ufo();
			this.ufos.push(ufoobj);
		}
		for(var x in this.holes){
			this.holes[x][0]--;
			if(this.holes[x][0]<0){
				this.holes.splice(x,1);
			}
		}
		for(var x in this.ufos){
			this.ufos[x].work()
			if(this.ufos[x].py>10){
				this.ufos.splice(x,1);
			}
		};
	}
	this.execmove=function(rx,ry){
		this.aimpos=[rx,ry];
	}
	this.exec= function(rx,ry){
		if(this.time>0){
			this.shake= 20;
			this.holes.push([30,rx,ry]);
			
			this.shootnum++;
			this.shootsounds[this.shootnum%6].play();
			for(var x in this.ufos){
				if(this.ufos[x].status!=0){
					continue;
				}
				var dx= Math.abs(rx- this.ufos[x].px/16);
				var dy= Math.abs(ry- this.ufos[x].py/9);
				console.log(dx,dy);
				if(dx<this.ufos[x].sx/16*0.25&&dy<this.ufos[x].sy/9*0.25){
					if(this.ufos[x].kind== this.status){
						this.score+=this.bonus[this.status];
						this.tips.push([this.bonus[this.status],120,rx,ry]);
					}
					else{
						this.score-=5;
						this.tips.push([-5,120,rx,ry]);
					}
					this.ufos[x].status=1;
				}
			}
		}
		else if(this.time<-200){
			this.ufos=[];
			this.time= 4800;
			this.score= 0;
			this.status= parseInt(Math.random()*1000)%8;
		}
		
	}
	this.pagedown= function(){
		
	}
	
	this.keydown=function(x){
		
	}
	this.keyup=function(x){
		
	}
}

function ufo(){
	this.status=0;
	this.kind=parseInt(Math.random()*1000)%8;
	this.body=new Image();
	this.sx=2;
	this.sy=2;
	this.agspd= 1+3*Math.random();
	this.boom=new Image();
	this.boom.src= 'fruit/img/fruitboom.png';
	if(this.kind==0){
		this.body.src= 'fruit/img/0.png';
		this.sx=2;
		this.sy=1.5;
	}
	if(this.kind==1){
		this.body.src= 'fruit/img/1.png';
		this.sx=3.5;
		this.sy=3.5;
	}
	if(this.kind==2){
		this.body.src= 'fruit/img/2.png';
		this.sx=2.5;
		this.sy=2.5;
	}
	if(this.kind==3){
		this.body.src= 'fruit/img/3.png';
		this.sx=2;
		this.sy=2;
		
	}
	if(this.kind==4){
		this.body.src= 'fruit/img/4.png';
		this.sx=2;
		this.sy=2;
	}
	if(this.kind==5){
		this.body.src= 'fruit/img/5.png';
		this.sx=2;
		this.sy=2;
	}
	if(this.kind==6){
		this.body.src= 'fruit/img/6.png';
		this.sx=4;
		this.sy=3;
		
	}
	if(this.kind==7){
		this.body.src= 'fruit/img/7.png';
		this.sx=2;
		this.sy=2;
	}
	
	
	this.py=10;
	if(Math.random()<0.7){
		this.px=-1+9*Math.random();
		this.speedx=0.05+0.01*Math.random();
		this.speedy=-0.25-0.05*Math.random();
	}
	else{
		this.px=17-9*Math.random();
		this.speedx=-0.05-0.01*Math.random();
		this.speedy=-0.25-0.05*Math.random();
	}
	this.work=function(){
		this.px+=this.speedx;
		this.py+=this.speedy;
		this.speedy+=0.005;
	}
	this.show=function(){
		if(this.status==0){
			FrameDraw(this.body,this.px/16,this.py/9,this.sx/16,this.sy/9,count*this.agspd);
		}
		else{
			FrameDraw(this.boom,this.px/16,this.py/9,this.sx/16*(1-count%6/30),this.sy/9*(1-count%6/30),count*this.agspd);
		}
	}
}