# mini-KOF
该项目旨在使用原生前端技术模仿经典格斗游戏，实现了一个迷你版本且功能完备的拳皇。
![效果图](/images/rendering.png "拳皇")
## 项目结构
- static文件夹：存放静态文件
    - css文件夹
    - images文件夹
    - js文件夹
        - ac_game_object
        - controller
        - game_map
        - player
        - utils
        - base.js
- template文件夹
    - index.html

![效果图](/images/KOF-structure.png "拳皇")

## 项目逻辑
1. index.html：
id号是KOF类中构造函数的参数。

2. js/base.js：
KOF类主要生成地图和角色，用jquery的语法，使得我们能够操控某一个id号的div。

3.  js/ac_game_object/base.js：
这是一个基类，是做出动画的关键，所有需要每帧渲染一次的组件都要继承这个类（例如：地图、角色等）。主要利用了`requestAnimationFrame()`函数，该函数让浏览器在下一次重绘之前调用指定的回调函数，执行里面的代码。通过向这个函数传递一个在每一帧中都需要执行的函数`AC_GAME_OBJECTS_FRAME`，并在该函数的结尾处通过递归方式再次调用`requestAnimationFrame(AC_GAME_OBJECTS_FRAME)`，我们可以创建出动画效果。

4.  js/game_map/base.js：
游戏的运行并非直接在div容器上进行，而是在canvas画布上展开，因此，该文件中的`GameMap`类扮演着至关重要的角色。
首先在构造函数中创建了一个canvas元素，代码如下：
    ```javascript
    this.$canvas = $(`<canvas width="1280" height="720" tabindex=0></canvas>`);
    ```
    接着，获取我们将要操作的canvas元素的上下文（context），代码如下：
    ```javascript
    this.ctx = this.$canvas[0].getContext('2d');
    ```
    然后，将这个canvas元素添加（append）到div容器中，代码如下：
    ```javascript
    this.root.$kof.append(this.$canvas);
    ```
    之后，让canvas元素获得焦点，以便接收键盘事件，代码如下：
    ```javascript
    this.$canvas.focus();
    ```
    最后，创建一个新的`Controller`对象，用于接收各种输入（如键盘操作），代码如下：
    ```javascript
    this.controller = new Controller(this.$canvas);
    ```
    通过以上步骤，成功地在页面上设置了一个可操作的canvas画布，并准备好了接收用户输入的环境。

5. js/player/base.js文件
这个文件的内容构成了项目的核心部分，即角色部分。它定义了许多关于角色的属性，例如血量、位置、速度等等。

6.  js/player/kyo.js文件
这些文件代表了特定角色的实现，它们需要继承自`Player`类。由于每个角色都拥有其独特的动画，因此，需要通过单独创建一个类来展示各自独有的效果。

7.  js/utils/gif.js文件
这个`utils`文件夹中存放的都是项目中需要使用到的辅助工具，例如在canvas上添加gif动图的方法。这部分的具体实现代码位于`gif.js`文件中，这里不再详细展示。

8.  js/controller/base.js文件<!--  -->
这里存放的都是用户的按键输入信息，我们需要根据这些输入来进行相应的处理。


