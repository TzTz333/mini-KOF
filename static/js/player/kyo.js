import { Player } from "/static/js/player/base.js";
import { GIF } from "/static/js/utils/gif.js";

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);
        this.init_animation();
    }

    init_animation() {
        //外部this, 用于在回调函数中访问, 因为在回调函数中this指向的是gif对象
        let outer = this;
        let offsets = [0, -22, -22, -140, 0, 0, 0];
        for (let i = 0; i < 7; i++) {
            let gif = GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`);
            this.animation.set(i, {
                gif: gif,
                frame_cnt: 0,
                frame_rate: 5,
                offset_y: offsets[i],
                loaded: false,
                scale: 2,
            });

            // console.log(this.animation.offset_y);


            gif.onload = function () {
                let obj = outer.animation.get(i);
                obj.frame_cnt = gif.frames.length;//帧数
                obj.loaded = true;

                if (i === 3) {
                    obj.frame_rate = 4;
                }
            }
        }
    }
}