let AC_GAME_OBJECT = [];

//游戏对象的基类,所有游戏对象都继承自这个类
class AcGmaeObject {
    constructor() {
        AC_GAME_OBJECT.push(this);

        this.timedelta = 0;//时间差
        this.has_call_start = false;//是否已经调用了start方法
    }

    start() {  //初始执行一次

    }

    update() {  //每帧执行一次

    }

    destroy() {  //销毁当前对象
        for (let i in AC_GAME_OBJECT) {
            if (AC_GAME_OBJECT[i] === this) {
                AC_GAME_OBJECT.splice(i, 1);
                break;
            }
        }
    }
}

//游戏循环,每帧执行一次,更新所有游戏对象
let last_timestemp;
let AC_GAME_OBJECTS_FRAME = function (timestep) {
    for (let obj of AC_GAME_OBJECT) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestep - last_timestemp;
            obj.update();
        }
    }
    last_timestemp = timestep;
    requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
}

requestAnimationFrame(AC_GAME_OBJECTS_FRAME);

export {
    AcGmaeObject,
}