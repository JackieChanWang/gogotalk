function huaji() {
    this.dict = new Image();
    this.dict.src = 'huaji/img/dict.png';

    this.papa = [];
    this.boom = new Image();
    this.boom.src = 'huaji/img/boom.png';

    this.bkg = new Image();
    this.bkg.src = 'huaji/img/bkg.png';

    this.ball = new Ball();

    this.hit = 0;

    this.fists = [];
    for (var x = 0; x < 3; x++) {
        f = new Fist(0.2, 3.5 + x * 2, -45);
        this.fists.push(f);
        f = new Fist(5.8, 3.5 + x * 2, 45);
        this.fists.push(f);
        f = new Fist(1.3 + x * 1.7, 9.2, 0);
        this.fists.push(f);
    }


    this.rend = function () {
        FrameDraw(this.bkg, 0.5, 0.5, 5.12, 1.62);
        FrameDraw(this.dict, 0.8, 0.05, 0.4, 0.1);
        FrameTxt('Restart', 5, 0.67, 0.08, 'green');



        this.ball.show();
        for (var x in this.fists) {
            this.fists[x].show();
        }
        for (var x in this.papa) {
            FrameDraw(this.boom, this.papa[x][0][0] / 6, this.papa[x][0][1] / 10, 2 / 6, 2 / 10, );
        }

        if (this.ball.pos[0] < -1 || this.ball.pos[0] > 11 || this.ball.pos[1] > 20) {
            FrameTxt('Your point:', 9, 0.037, 0.36, 'black');
            FrameTxt(this.hit, 9, 0.37, 0.56, 'red');
        }
        else {
            FrameTxt(this.hit + ' HIT', 5, 0.07, 0.08, 'yellow');
        }
    }
    this.work = function () {
        for (var x in this.papa) {
            if (this.papa[x][1] >= 0) {
                this.papa[x][1]--;
            }
            if (this.papa[x][1] < 0) {
                this.papa.splice(x, 1);
            }
        }
        //console.log(JSON.stringify(this.papa));
        this.ball.work();
        for (var x in this.fists) {
            this.fists[x].work();
        }

        for (var x in this.fists) {
            var dx = Math.abs(this.fists[x].pos[0] - this.ball.pos[0]);
            var dy = Math.abs(this.fists[x].pos[1] - this.ball.pos[1]);
            if (dx < 1 && dy < 1 && this.fists[x].status == 1) {

                var ppx = (this.fists[x].pos[0] + this.ball.pos[0]) / 2;
                var ppy = (this.fists[x].pos[1] + this.ball.pos[1]) / 2;
                this.papa.push([[ppx, ppy], 20]);

                this.fists[x].status = 3;
                dz = Math.sqrt(dx * dx + dy * dy);

                if (this.ball.speedy < 0) {
                    this.ball.speedy = 0;
                }

                this.ball.speedy -= dy / dz * 0.003;
                this.ball.speedx -= dx / dz * 0.003;

                if (this.fists[x].ang == 0) {
                    this.ball.speedy += -0.2;
                    this.ball.ms = 3;
                }
                if (this.fists[x].ang == 45) {
                    this.ball.speedy -= 0.08;
                    this.ball.speedx -= 0.04;
                    this.ball.ms = 1;
                }
                if (this.fists[x].ang == -45) {
                    this.ball.speedy -= 0.08;
                    this.ball.speedx += 0.04;
                    this.ball.ms = 2;
                }
                this.ball.hitcd = 0;
                this.hit++;

            }
        }

    }
    this.execmove = function (rx, ry) {


    }
    this.execend = function (rx, ry) {


    }
    this.exec = function (rx, ry) {
        if (rx > 0.6 && ry < 0.1) {
            this.ball = new Ball();
            this.hit = 0;
        }
        for (var x in this.fists) {
            var lx = rx * 6;
            var ly = ry * 10;
            var dx = Math.abs(this.fists[x].pos[0] - lx);
            var dy = Math.abs(this.fists[x].pos[1] - ly);
            console.log(dx, dy);
            if (dy < 0.8 && dx < 0.8) {
                if (this.fists[x].status == 0) {
                    this.fists[x].status = 1;
                }
            }

        }

    }
    this.keydown = function (x) {


    }
    this.keyup = function (x) {


    }
}
function Ball() {
    this.ms = 0;
    this.hitcd = 0;
    this.common = new Image();
    this.common.src = 'huaji/img/common.png';
    this.left = new Image();
    this.left.src = 'huaji/img/left.png';
    this.right = new Image();
    this.right.src = 'huaji/img/right.png';
    this.safe = new Image();
    this.safe.src = 'huaji/img/safe.png';

    this.speedx = 0;
    this.speedy = 0;

    this.pos = [2.5, 1];
    this.show = function () {
        var imgtemp = this.common;
        if (this.ms == 1) {
            imgtemp = this.left;
        }
        if (this.ms == 2) {
            imgtemp = this.right;
        }
        if (this.ms == 3) {
            imgtemp = this.safe;
        }
        FrameDraw(imgtemp, this.pos[0] / 6, this.pos[1] / 10, 1.5 / 6, 1.5 / 10);
    }
    this.work = function () {
        this.hitcd--;
        if (this.hitcd < -50) {
            this.ms = 0;
        }
        this.speedy += 0.001;
        this.pos[0] += this.speedx;
        this.pos[1] += this.speedy;
    }
}

function Fist(px, py, ang) {
    this.img = new Image();
    this.img.src = 'huaji/img/fist.png';


    this.status = 0;//1出击 2返回 0待命

    this.dict = new Image();
    this.dict.src = 'huaji/img/dict.png';
    this.ang = ang;

    this.pos = [];
    this.pos[0] = px;
    this.pos[1] = py;

    this.bps = [];
    this.bps[0] = px;
    this.bps[1] = py;

    this.show = function () {
        FrameRotale(this.img, this.pos[0] / 6, this.pos[1] / 10, 1.72 / 6, 3 / 10, this.ang - 8, 0.86 / 6, 1 / 10);
        //FrameDraw(this.dict,this.pos[0]/6,this.pos[1]/10,0.1/6,0.1/10,this.ang-8);
    }
    this.work = function () {
        //console.log(this.bps);
        if (this.status == 1 || this.status == 3) {
            this.pos[0] -= Math.sin(this.ang / 180 * Math.PI) * 0.2;
            this.pos[1] -= Math.cos(this.ang / 180 * Math.PI) * 0.2;
            var dx = this.pos[0] - this.bps[0];
            var dy = this.pos[1] - this.bps[1];
            var dz = dx * dx + dy * dy;
            //console.log(dx,dy,dz);
            if (dz > 4) {
                this.status = 2;
            }
        }
        if (this.status == 2) {
            this.pos[0] += Math.sin(this.ang / 180 * Math.PI) * 0.2;
            this.pos[1] += Math.cos(this.ang / 180 * Math.PI) * 0.2;
            var dx = this.pos[0] - this.bps[0];
            var dy = this.pos[1] - this.bps[1];
            var dz = dx * dx + dy * dy;
            if (dz < 0.0001) {
                this.status = 0;
                this.pos[0] = this.bps[0];
                this.pos[1] = this.bps[1];
            }
        }
    }

}