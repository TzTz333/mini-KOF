import { AcGmaeObject } from '/static/js/ac_game_object/base.js';
import { controller } from '/static/js/controller/base.js';


export class GameMap extends AcGmaeObject {
    constructor(root) {
        super();//调用父类的构造函数

        this.root = root;
        //创建画布,数组
        this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');
        //获取画布的上下文
        this.ctx = this.$canvas[0].getContext('2d');
        //将画布添加到kof中
        this.root.$kof.append(this.$canvas);
        //获取焦点
        this.$canvas.focus();

        this.controller = new controller(this.$canvas);

        this.root.$kof.append($(
            `<div class="kof-head">
            <div class="kof-head-hp-0"><div><div></div></div></div>
            <div class="kof-head-timer">60</div>
            <div class="kof-head-hp-1"><div><div></div></div></div>
        </div>`));

        this.time_left = 60000;//60s
        this.$timer = this.root.$kof.find('.kof-head-timer');

    }
    start() {

    }
    update() {
        //把逻辑包装成函数
        this.time_left -= this.timedelta;
        if (this.time_left < 0) {
            this.time_left = 0;

            let [a, b] = this.root.players;
            if (a.status !== 6 && b.status !== 6) {
                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0;
            }
        }
        this.$timer.text(parseInt(this.time_left / 1000));
        this.render();
    }
    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // console.log(this.ctx.canvas.width);
        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}


