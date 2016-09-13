function LevelMenu() {
    this.currentLevel = app.levelsManager.getConfig();
}

LevelMenu.prototype = {
    change: function() {
        this.currentLevel = app.levelsManager.getConfig();
    },
    update: function () {

    },
    render: function () {
        if (this.currentLevel) {
            this.currentLevel.goals.forEach(function(goal, index) {
                var leaf = app.leaves[goal.type];
                var inside = (app.hole.inside[goal.type]) ? app.hole.inside[goal.type] : 0;

                this.renderLeaf(leaf, 20, 110 + index * 30);
                this.renderText(20, 110 + index * 30, goal, inside);

            }.bind(this));
        }
    },
    renderLeaf: function(leaf, x, y) {
        appOut.save();
        appOut.translate(x, y);
        appOut.scale(0.13, 0.13);
        leaf.vertices.fill.forEach(function(layout) {
            this.renderFillLayout(layout);
        }.bind(this));
        leaf.vertices.fill.forEach(function(layout) {
            this.renderStrokeLayout(layout);
        }.bind(this));
        leaf.vertices.stroke.forEach(function(layout) {
            this.renderStrokeLayout(layout);
        }.bind(this));

        appOut.restore();
    },
    renderText: function(x, y, goal, inside) {
        appOut.save();

        appOut.font = '13px';
        appOut.textBaseline = 'middle';
        appOut.fillStyle = (inside == goal.amount) ? 'green' :
            (inside < goal.amount) ? 'black' : 'red';
        appOut.fillText(((goal.amount == 0) ? 'X' : inside + '/' + goal.amount), x + 15, y);

        appOut.restore();
    },
    renderStrokeLayout: function(layout) {
        appOut.beginPath();
        layout.forEach(function(dot, index) {
            if (!index) {
                appOut.moveTo(dot.x - 100, dot.y - 100);
            } else {
                appOut.lineTo(dot.x - 100, dot.y - 100);
                if (index == layout.length - 1) {
                    appOut.lineTo(layout[0].x - 100, layout[0].y - 100);
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
                appOut.moveTo(dot.x - 100, dot.y - 100);
            } else {
                appOut.lineTo(dot.x - 100, dot.y - 100);
            }
        }.bind(this));
        appOut.fillStyle = 'hsl(120, 40%, 41%)';
        appOut.fill();
        appOut.closePath();
    }
};