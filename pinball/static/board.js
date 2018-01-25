function World() {


    this.boards = [];
    this.page = 0;

    board = eval("new " + depends[0]);
    this.boards.push(board);
    for (x = 1; x < depends.length; x++) {
        this.boards.push(0);
    }


    /*
     board= new Board1();
     this.boards.push(board);

     board= new Board2();
     this.boards.push(board);

     board= new Board3();
     this.boards.push(board);

     board= new Board4();
     this.boards.push(board);

     board= new Board5();
     this.boards.push(board);

     board= new Board6();
     this.boards.push(board);

     board= new Board7();
     this.boards.push(board);

     board= new Board8();
     this.boards.push(board);
     */

    this.work = function () {
        this.boards[this.page].work();
    }
    this.rend = function () {
        this.boards[this.page].rend();
    }


    this.exec = function (rx, ry) {
        var a = {"method": "onFileMessage", "posx": rx, "posy": ry, "status": this.boards[this.page].status}
        // console.log(a.status);
        a = JSON.stringify(a);

        /*网络版*/
        window.parent.postMessage(a, '*');

        /*单机后门
         */
        if (rx > 0.9 && ry < 0.1) {
            try {
                this.boards[this.page].audio.pause();
            } catch (e) {
            }
            world.pagedown();
        }
        else {

        }
        //this.boards[this.page].exec(rx,ry);
    };
    this.execmove = function (rx, ry) {
        if (this.boards[this.page].execmove) {
            this.boards[this.page].execmove(rx, ry);
        }
    }

    this.pageup = function () {
        if (this.page > 0) {
            this.page--;
            if (this.boards[this.page] == 0) {
                this.boards[this.page] = eval("new " + depends[this.page]);
            }
        };
    };
    this.pagedown = function () {
        if (this.page < depends.length - 1) {
            this.page++;
            if (this.boards[this.page] == 0) {
                this.boards[this.page] = eval("new " + depends[this.page]);
            }
            if (this.boards[this.page - 1].pagedown) {
                this.boards[this.page - 1].pagedown();
            }
        }
    };

    this.topage = function (p) {
        this.page = p;
        if (this.boards[this.page] == 0) {
            this.boards[this.page] = eval("new " + depends[this.page]);
        }
        if (this.boards[this.page - 1].pagedown) {
            this.boards[this.page - 1].pagedown();
        }
    }
}


