function PaperSets(srcs){//简单帧动画
    this.imgs=[];
    for(x in srcs){
        this.imgs[x]=new Image();
        this.imgs[x].src= srcs[x];
    }
    this.papernum= this.imgs.length;
    this.show= function(speed,px,py,sx,sy,angle){//动画速度，坐标x，坐标y，尺寸x，尺寸y，旋转角度
        FrameDraw(this.imgs[parseInt(count*speed)%this.papernum],px,py,sx,sy,angle);
    }
}

function bone(img,px,py){
    this.headid= 4;
    this.live= 1;
    this.img=img;
    this.zoom= 1
    this.ang=0;
    this.myxuestep=1;

    this.px=px;
    this.py=py;

    this.ox=0.15;
    this.oy=0.1;
    this.sx= 0.3;
    this.sy= 0.2;

    this.keng= [];
    this.branch= [];

    this.actstatus=[0]

    this.loadact= function(actss){
        this.myxuestep=1;
        this.actstatus= actss;
    }

    this.sad=function(){
        //console.log(this.branch[0][0].branch[this.headid][0].img);
        if(this.head2){
            this.branch[0][0].branch[this.headid][0].img=this.head2;
        }
    }
    this.endsad=function(){
        if(this.head1){
            this.branch[0][0].branch[this.headid][0].img=this.head1;
        }
    }

    this.taunt=function(){
        if(this.act9){
            this.myxuestep=1;
            this.actstatus= this.act9;
            if(this.head3){
                this.branch[0][0].branch[this.headid][0].img=this.head3;
            }
        }
    }
    this.endtaunt= function(){

        if(this.head1){
            this.branch[0][0].branch[this.headid][0].img=this.head1;
        }
    }

    this.loopact=function(){

        //console.log(myxuestep);
        if(this.actstatus[0]==0){
            return;
        }
        if(this.actstatus[0]==1){//loop [0,0,[[a,10],[b,20],[c,20]]];
            this.toact(this.actstatus[2][this.actstatus[1]][0],this.myxuestep);
            this.myxuestep--;
            if(this.myxuestep==0){
                this.myxuestep=this.actstatus[2][this.actstatus[1]][1];
                this.actstatus[1]++;
            }
            if(this.actstatus[1]>=this.actstatus[2].length){
                this.actstatus[1]=0;
            }

        }

        if(this.actstatus[0]==2){//loop [0,0,[[a,10],[b,20],[c,20]]];
            this.toact(this.actstatus[2][this.actstatus[1]][0],this.myxuestep);
            this.myxuestep--;
            if(this.myxuestep==0){
                this.myxuestep=this.actstatus[2][this.actstatus[1]][1];
                this.actstatus[1]++;
            }
            if(this.actstatus[1]>=this.actstatus[2].length){
                this.actstatus[0]=0;
                this.actstatus[1]=0;
            }
        }
    }

    this.toact= function(act,myxuestep){
        this.ang+=(act[0]-this.ang)/myxuestep;
        for(var x=1;x<act.length;x++){
            this.branch[x-1][0].toact(act[x],myxuestep);
        }
    }

    this.recact=function(){
        var act=[];
        act.push(this.ang);
        for(var x in this.branch){
            //console.log(this.branch[x][0].recact());
            act.push(this.branch[x][0].recact());
        }
        return act;

    }

    this.retdef=function(str){
        var js= JSON.parse(str);
        this.impo(js);
    }

    this.bear=function(b,x,y){
        this.branch.push([b,x,y]);
    }

    this.impo=function(boneobj){
        this.px= boneobj.px;
        this.py= boneobj.py;
        this.sx= boneobj.sx;
        this.sy= boneobj.sy;
        this.ox= boneobj.ox;
        this.oy= boneobj.oy;
        this.ang= boneobj.ang;
        var timg=new Image();
        timg.src= boneobj.img;
        this.img= timg;
        this.branch=[];
        for(var x in boneobj.branch){
            var b= new bone;
            b.impo(boneobj.branch[x][0]);
            this.branch.push([b,boneobj.branch[x][1],boneobj.branch[x][2]]);
        }

    }
    this.expo=function(){
        var js= {};
        js["px"]=this.px;
        js["py"]=this.py;
        js["ox"]=this.ox;
        js["oy"]=this.oy;
        js["sx"]=this.sx;
        js["sy"]=this.sy;
        js["ang"]=this.ang;
        js["img"]=this.img.src;
        js["branch"]=[];
        for(var x in this.branch){
            if(this.branch[x][0].live==1){
                console.log(this.branch[x][0]);
                a=this.branch[x][0];
                js["branch"].push([this.branch[x][0].expo(),this.branch[x][1],this.branch[x][2]]);
            }
        }
        return js;

    }
    this.show=function(ang,zoom){

        this.zoom=zoom;

        this.loopact();
        if(this.live==0){
            return;
        }
        //console.log(this.px,this.py,this.sx*this.zoom,this.sy*this.zoom, (ang+this.ang),this.ox*this.zoom,this.oy*this.zoom);
        FrameRotale(this.img,this.px,this.py,this.sx*this.zoom,this.sy*this.zoom, (ang+this.ang),this.ox*this.zoom,this.oy*this.zoom);
        for(x in this.branch){
            dy= this.branch[x][1];
            dx= this.branch[x][2];
            dy=dy/9*16;
            x0= dx*Math.cos((ang+this.ang)/180*Math.PI)-dy*Math.sin((ang+this.ang)/180*Math.PI);
            y0= dx*Math.sin((ang+this.ang)/180*Math.PI)+dy*Math.cos((ang+this.ang)/180*Math.PI);
            y0=this.zoom*y0*9/16;
            x0=this.zoom*x0;
            var bpx= this.px+y0;
            var bpy= this.py+x0;
            this.branch[x][0].px=bpx;
            this.branch[x][0].py=bpy;

            this.branch[x][0].show((ang+this.ang),this.zoom);
        }
    }
}

