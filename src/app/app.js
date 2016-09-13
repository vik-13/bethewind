;(function() {
    var canvas = document.getElementById('app'),
        gravity;

    app.canvas = canvas;
    app.size = {x: 480, y: 320, diff: 1};
    window.appOut = canvas.getContext('2d');

    window.onload = init;
    window.onresize = resize;
    resize();

    function init() {
        gravity = new Gravity();
        app.windManager = new Wind();
        app.directWindManager = new DirectWindManager();
        app.hole = new Hole();
        app.deadLeaves = new DeadLeaves();
        app.levelsManager = new Levels();
        app.leavesManager = new Leaves();
        app.levelMenu = new LevelMenu();
        app.menu = new Menu();

        app.scene = new Scene();

        app.menu.showMenu(0);

        lifeCycle();
    }

    function resize() {
        var vDiff = window.innerHeight / 480,
            hDiff = window.innerWidth / 320;
        if (vDiff < hDiff) {
            app.size.diff = window.innerHeight / 480;
            app.size.y = window.innerHeight;
            app.size.x = window.innerHeight * (320 / 480);
        } else {
            app.size.diff = window.innerWidth / 320;
            app.size.y = window.innerWidth * (480 / 320);
            app.size.x = window.innerWidth;
        }
        canvas.setAttribute('width', app.size.x + 'px');
        canvas.setAttribute('height', app.size.y + 'px');
        appOut.scale(app.size.diff, app.size.diff);
    }

    function lifeCycle() {
        update();
        render();
        window.requestAnimationFrame(arguments.callee);
    }

    function update() {
        app.scene.update();
        app.windManager.update();
        app.hole.update();
        app.directWindManager.update();
        app.deadLeaves.update();
    }

    function render() {
        app.scene.render();
        app.hole.render();
        app.directWindManager.render();
        app.deadLeaves.render();
        app.levelMenu.render();
        app.menu.render();
    }
})();