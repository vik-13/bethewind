function Hole() {
    this.position = new Vector(60, 300);
    this.power = 50;
    this.isFull = false;
    this.win = true;
    this.inside = {};
    this.holeParticles = new HoleParticles();
}

Hole.prototype = {
    reset: function() {
        this.isFull = false;
        this.win = true;
        this.inside = {};
    },
    apply: function(leafPosition) {
        var distance = leafPosition.distance(this.position),
            direction, acceleration = new Vector(0, 0), angle, power;
        if (distance < this.power) {
            angle = this.position.angle(leafPosition);
            power = (1 - distance / this.power) / 1.2;
            direction = new Vector(- power * Math.cos(angle), - power * Math.sin(angle));
            acceleration.add(direction);
        }
        return acceleration;
    },
    checkFull: function() {
        var isNotFull = false,
            config = app.levelsManager.getConfig();
        config.goals.forEach(function(goal) {
            if (goal.amount == 0) {
                if (this.inside[goal.type]) {
                    this.win = false;
                    this.isFull = true;
                }
            } else {
                if (this.inside[goal.type]) {
                    if (this.inside[goal.type] < goal.amount) {
                        isNotFull = true;
                    } else if (this.inside[goal.type] > goal.amount) {
                        this.win = false;
                        this.isFull = true;
                    }
                } else {
                    isNotFull = true;
                }
            }
        }.bind(this));
        if (!isNotFull) {
            this.isFull = true;
        }
    },
    isInside: function(leafPosition, type) {
        var distance = leafPosition.distance(this.position),
            inside = false;
        if (!this.isFull && distance < (this.power / 5)) {
            if (typeof this.inside[type] === 'undefined') {
                this.inside[type] = 0;
            }
            this.inside[type]++;
            inside = true;
            this.checkFull();
        }
        return inside;
    },
    update: function() {
        this.holeParticles.update();
    },
    render: function() {
        this.holeParticles.render();
    }
};