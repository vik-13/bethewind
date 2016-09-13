function Tree() {
    this.leaves = [];
    this.deadLeaves = [];
    this.isFinished = true;
}

Tree.prototype = {
    new: function(newLevel, levelIndex) {
        var i, config;

        this.isFinished = false;
        if (typeof levelIndex !== 'undefined') {
            app.levelsManager.open(levelIndex);
        } else {
            app.levelsManager.next(newLevel);
        }

        app.windManager.new();
        app.hole.reset();

        config = app.levelsManager.getConfig();
        this.leaves.length = 0;
        config.leaves.forEach(function(leaf) {
            for (i = 0; i < leaf.amount; i++) {
                this.leaves.push(new Leaf(leaf.type, config.timeToFall, leaf.livingTime, leaf.isDown));
            }
        }.bind(this));
    },
    checkLevelEnd: function() {
        if (!this.isFinished && (app.hole.isFull)) {
            if (app.hole.win) {
                if (app.levelsManager.isLast()) {
                    app.levelsManager.updateMax();
                    app.menu.showMenu(5);
                } else {
                    app.levelsManager.updateMax();
                    app.menu.showMenu(3);
                }
            } else {
                app.menu.showMenu(4);
            }
            this.isFinished = true;
        } else if (!this.isFinished && this.leaves.length == 0) {
            app.menu.showMenu(4);
            this.isFinished = true;
        }
    },
    update: function() {
        var leavesToRemove = [];
        this.leaves.forEach(function(leaf) {
            leaf.update(this.leaves);
            if (!leaf.isActive) {
                leavesToRemove.push(leaf);
            }
        }.bind(this));
        leavesToRemove.forEach(function(leaf) {
            var index = this.leaves.indexOf(leaf);
            if (index !== -1) {
                this.leaves.splice(index, 1);
            }
        }.bind(this));
        this.checkLevelEnd();
    },
    render: function() {
        this.renderTree();

        this.leaves.forEach(function(leaf) {
            if (leaf.isActive) {
                leaf.render();
            }
        });
    },
    renderTree: function() {
        appOut.save();
        appOut.scale(1.01, 1.01);
        app.treeConfig.vertices.fill.forEach(function(layout) {
            this.renderFillLayout(layout);
        }.bind(this));
        app.treeConfig.vertices.fill.forEach(function(layout) {
            this.renderStrokeLayout(layout);
        }.bind(this));
        app.treeConfig.vertices.stroke.forEach(function(layout) {
            this.renderStrokeLayout(layout);
        }.bind(this));
        appOut.restore();
    },
    renderStrokeLayout: function(layout) {
        appOut.beginPath();
        layout.forEach(function(dot, index) {
            if (!index) {
                appOut.moveTo(dot.x, dot.y);
            } else {
                appOut.lineTo(dot.x, dot.y);
                if (index == layout.length - 1) {
                    appOut.lineTo(layout[0].x, layout[0].y);
                }
            }
        }.bind(this));
        appOut.strokeStyle = 'black';
        appOut.stroke();
        appOut.closePath();
    },
    renderFillLayout: function(layout) {
        appOut.beginPath();
        layout.forEach(function(dot, index) {
            if (!index) {
                appOut.moveTo(dot.x, dot.y);
            } else {
                appOut.lineTo(dot.x, dot.y);
            }
        }.bind(this));
        appOut.fillStyle = '#8a8a5c';
        appOut.fill();
        appOut.closePath();
    }
};