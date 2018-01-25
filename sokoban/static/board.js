function World(){
	
	
	this.boards=[];
	this.page= 0;
	for(x in depends){
		board= eval("new " +depends[x]);
		this.boards.push(board);	
	}
	
	this.work= function(){
		this.boards[this.page].work();
	}
	this.rend=function(){
		this.boards[this.page].rend();
	}
	this.exec= function(rx,ry){
		var a={"method":"onFileMessage","posx":rx,"posy":ry}
		console.log(a);
		a=JSON.stringify(a);
		
		/*网络版*/
		//window.parent.postMessage(a,'*');
		
		/*单机后门*/
		this.boards[this.page].exec(rx,ry);
		if(rx>0.9&&ry<0.1){
			this.pagedown();
		}
	}
	this.keyevent = function(x){
		this.boards[this.page].keyevent(x);
	}
	
	this.pageup=function(){
		if(this.page>0){
			this.page--;
		}
	}
	this.pagedown=function(){
		if(this.page<depends.length-1){
			this.page++;
		}
	}
	
	this.topage=function(p){
		this.page=p;
	}
}


