function sokoban() {
    this.map = new Map();
    this.block = new Image();
    this.block.src = "sokoban/img/block.png";
    this.three = new Image();
    this.three.src = "sokoban/img/wall.png";
    this.box = new Image();
    this.box.src = "sokoban/img/box.png";
    this.xx = new Image();
    this.xx.src = "sokoban/img/box1.png";
    this.player = [];
    this.playerPos = 3;
    this.player[0] = new Image();
    this.player[0].src = "sokoban/img/left.png";
    this.player[1] = new Image();
    this.player[1].src = "sokoban/img/up.png";
    this.player[2] = new Image();
    this.player[2].src = "sokoban/img/right.png";
    this.player[3] = new Image();
    this.player[3].src = "sokoban/img/down.png";
    this.moveCount = 0;
    this.isMoveOver = false;
    this.rend = function () {
        for (var i = 0; i < this.map.board.length; i++) {
            for (var j = 0; j < this.map.board[i].length; j++) {
                //70*70
                FrameDraw(this.block, .06 + j * .044, .13 + i * .078, .044, .078, 0);
                if (this.map.board[i][j] == 0) {
                } else if (this.map.board[i][j] == 1) {
                    FrameDraw(this.three, .06 + j * .044, .116 + i * .078, .044, .102, 0);
                } else if (this.map.board[i][j] == 2) {
                    //目标点
                    FrameDraw(this.xx, .06 + j * .044, .13 + i * .078, .044, .078, 0);
                } else if (this.map.board[i][j] == 3) {
                    //箱子
                    FrameDraw(this.box, .06 + j * .044, .116 + i * .078, .044, .1, 0);
                } else if (this.map.board[i][j] == 4) {
                    //用户
                    this.map.playerPonit.x = i;
                    this.map.playerPonit.y = j;
                    FrameDraw(this.player[this.playerPos], .06 + j * .044, .09 + i * .078, .0625, .138, 0);
                }
            }
        }
    };
    this.work = function () {
        if (this.isMoveOver) {
            this.isMoveOver = false;
            //如果移动完成了
            if (this.map.checkFinish()) {
                alert('game over');
            }
        }
    };
    this.exec = function (rx, ry) { };
    this.keyevent = function (x) {
        var p1, p2;
        if (x == 37 || x == 65) {
            // console.log('left');
            this.playerPos = 0;
            p1 = new Point(this.map.playerPonit.x, this.map.playerPonit.y - 1);
            p2 = new Point(this.map.playerPonit.x, this.map.playerPonit.y - 2);
        }
        if (x == 38 || x == 87) {
            // console.log('top');
            this.playerPos = 1;
            p1 = new Point(this.map.playerPonit.x - 1, this.map.playerPonit.y);
            p2 = new Point(this.map.playerPonit.x - 2, this.map.playerPonit.y);
        }
        if (x == 39 || x == 68) {
            // console.log('right');
            this.playerPos = 2;
            p1 = new Point(this.map.playerPonit.x, this.map.playerPonit.y + 1);
            p2 = new Point(this.map.playerPonit.x, this.map.playerPonit.y + 2);
        }
        if (x == 40 || x == 83) {
            // console.log('down');
            this.playerPos = 3;
            p1 = new Point(this.map.playerPonit.x + 1, this.map.playerPonit.y);
            p2 = new Point(this.map.playerPonit.x + 2, this.map.playerPonit.y);
        }
        if (this.map.tryGo(p1, p2)) {
            this.moveCount++;
            this.isMoveOver = true;
        }
    }
}

function Map() {
    this.col = 12; //列>宽 j>x
    this.row = 11; //行>高 i>y
    this.board = [];
    this.levels = [];
    this.levelIndex = 0;
    this.levels[0] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 3, 0, 3, 2, 1, 0, 0],
        [0, 0, 1, 2, 0, 3, 4, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 3, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.board = this.levels[this.levelIndex];
    this.playerPonit = new Point(5, 5);
    this.tryGo = function (p1, p2) {
        if (!p1 || !p2) return false;
        if (p1.x < 0) return false; //如果超出地图的上边，不通过
        if (p1.y < 0) return false; //如果超出地图的左边，不通过
        if (p1.x > this.board.length) return false; //如果超出地图的下边，不通过
        if (p1.y > this.board[0].length) return false; //如果超出地图的右边，不通过
        if (this.board[p1.x][p1.y] == 1) return false; //如果前面是墙，不通过
        if (this.board[p1.x][p1.y] == 3 || this.board[p1.x][p1.y] == 5) {
            //如果小人前面是箱子那就还需要判断箱子前面有没有障碍物(箱子/墙)
            if (this.board[p2.x][p2.y] == 1 || this.board[p2.x][p2.y] == 3) {
                return false;
            }
            //如果判断不成功小人前面的箱子前进一步
            this.board[p2.x][p2.y] = 3; //更改地图对应坐标点的值
            //console.log(this.board[p2.x][p2.y]);
        }
        //如果都没判断成功小人前进一步
        this.board[p1.x][p1.y] = 4; //更改地图对应坐标点的值
        //如果小人前进了一步，小人原来的位置如何显示
        var v = this.levels[this.levelIndex][this.playerPonit.x][this.playerPonit.y];
        //如果刚开始小人位置不是陷进的话
        if (v != 2) {
            //可能是5 既有箱子又陷进
            if (v == 5) {
                //如果小人本身就在陷进里面的话移开之后还是显示陷进
                v = 2;
            } else {
                //小人移开之后之前小人的位置改为地板
                v = 0;
            }
        }
        //重置小人位置的地图参数
        this.board[this.playerPonit.x][this.playerPonit.y] = v;
        //如果判断小人前进了一步，更新坐标值
        this.playerPonit = p1;
        //如果小动了 返回true 指代能够移动小人
        return true;
    }
    this.checkFinish = function () {
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                //当前移动过的地图和初始地图进行比较，若果初始地图上的陷进参数在移动之后不是箱子的话就指代没推成功
                if (this.levels[this.levelIndex][i][j] == 2 && this.board[i][j] != 3 || this.levels[this.levelIndex][i][j] == 5 && this.board[i][j] != 3) {
                    return false;
                }
            }
        }
        return true;
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}