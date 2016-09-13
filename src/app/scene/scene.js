function Scene() {
    this.tree = new Tree();
    this.mouse = new Vector(0, 0);
    this.paralax = new Vector(0, 0);

    app.canvas.addEventListener('mousemove', function(event) {
        this.mouse.apply(new Vector(event.clientX - event.target.offsetParent.offsetLeft, event.clientY - event.target.offsetParent.offsetTop));
        this.paralax.x = 10 - 20 * (this.mouse.x / app.size.x);
        this.paralax.y = 10 - 20 * (this.mouse.y / app.size.y);
    }.bind(this));
}

Scene.prototype = {
    update: function() {
        this.tree.update();
    },
    render: function() {
        // appOut.fillStyle = '#f5f6d4';
        appOut.fillStyle = '#e4e4ce';
        appOut.fillRect(0, 0, 320, 480);

        this.renderMountains();
        this.renderGround();

        this.tree.render();
    },
    renderGround: function() {
        appOut.save();
        appOut.translate(this.paralax.x - 10, this.paralax.y + 10);
        appOut.scale(1.1, 1.01);
        app.groundConfig.vertices.fill.forEach(function(layout) {
            this.renderFillLayout(layout, '#bbbb77');
        }.bind(this));
        app.groundConfig.vertices.fill.forEach(function(layout) {
            this.renderStrokeLayout(layout, 'black');
        }.bind(this));
        app.groundConfig.vertices.stroke.forEach(function(layout) {
            this.renderStrokeLayout(layout, 'black');
        }.bind(this));
        appOut.restore();
    },
    renderMountains: function() {
        var i, color;
        for (i = app.mountainsConfig.mountains.length - 1; i >= 0; i--) {
            appOut.save();
            appOut.translate(((4 - i) / 10) * this.paralax.x - 10, ((4 - i) / 10) * this.paralax.y);
            appOut.scale(1.1, 1.05);
            color = app.mountainsConfig.mountains[i].color;
            app.mountainsConfig.mountains[i].vertices.fill.forEach(function(layout) {
                this.renderFillLayout(layout, color);
            }.bind(this));
            app.mountainsConfig.mountains[i].vertices.fill.forEach(function(layout) {
                this.renderStrokeLayout(layout, 'black');
            }.bind(this));
            app.mountainsConfig.mountains[i].vertices.stroke.forEach(function(layout) {
                this.renderStrokeLayout(layout, 'black');
            }.bind(this));
            appOut.restore();
        }
    },
    renderStrokeLayout: function(layout, color) {
        appOut.beginPath();
        layout.forEach(function(dot, index) {
            if (!index) {
                appOut.moveTo(dot.x, dot.y);
            } else {
                appOut.lineTo(dot.x, dot.y);
            }
        }.bind(this));
        appOut.strokeStyle = color;
        appOut.stroke();
        appOut.closePath();
    },
    renderFillLayout: function(layout, color) {
        appOut.beginPath();
        layout.forEach(function(dot, index) {
            if (!index) {
                appOut.moveTo(dot.x, dot.y);
            } else {
                appOut.lineTo(dot.x, dot.y);
            }
        }.bind(this));
        appOut.fillStyle = color;
        appOut.fill();
        appOut.closePath();
    }
};