function Leaf(type, timeToFall, livingTime, isDown) {
    this.isActive = true;
    this.type = type;
    this.timeOut = parseInt((timeToFall * Math.random()) * 1000);
    this.startTime = (new Date()).getTime();
    this.description = app.leaves[this.type];
    this.livingTime = (typeof livingTime !== 'undefined') ? livingTime : this.description.livingTime;
    this.mass = this.description.weight + 0.05 * Math.random();
    if (isDown) {
        this.timeOut = 0;
        this.position = new Vector(25 + parseInt(281 * Math.random()), 420 + parseInt(41 * Math.random()));
    } else {
        this.position = new Vector(25 + parseInt(281 * Math.random()), 15 + parseInt(41 * Math.random()));
    }
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);

    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0.00001 - ((2 * Math.random()) / 100000);
}

Leaf.prototype = {
    check: function() {
        if (this.position.y > 450) {
            this.position.y = 450;
            this.velocity.y *= -0.2;
        } else if (this.position.y < 10) {
            this.position.y = 10;
            this.velocity.y *= -0.2;
        }
        if (this.position.x > 300) {
            this.position.x = 300;
            this.velocity.x *= -0.2;
        } else if (this.position.x < 20) {
            this.position.x = 20;
            this.velocity.x *= -0.2;
        }
    },
    checkToDie: function() {
        if ((new Date()).getTime() - this.startTime >= this.livingTime) {
            this.isActive = false;
            app.deadLeaves.add(this.position);
        }
    },
    calculateAirFriction: function() {
        var speed = this.velocity.mag(),
            forceMagnitude = 0.1 * Math.pow(speed, 2) * this.mass,
            force = this.velocity.get();

        force.mult(-1);
        force.normalize();
        force.mult(forceMagnitude);
        return force;
    },
    calculateFriction: function() {
        var c = 0.01,
            normal = 1,
            frictionMag = c * normal,
            friction = this.velocity.get();
        friction.mult(-1);
        friction.normalize();
        friction.mult(frictionMag);

        return friction;
    },
    update: function(leaves) {
        var friction, collisionForce, a1, a2, v1, v2;
        if (app.hole.isInside(this.position, this.type)) {
            this.isActive = false;
        }

        collisionForce = this.collisionDetection(leaves);

        if (this.timeOut !== false) {
            if ((new Date()).getTime() - this.startTime >= this.timeOut) {
                this.timeOut = false;
                this.startTime = (new Date()).getTime();
            }
        }

        if (this.isActive && this.timeOut === false) {
            friction = this.calculateFriction();

            this.acceleration.add(friction);
            this.acceleration.add(app.gravity.get().mult(this.mass));
            this.acceleration.add(app.wind);

            this.acceleration.add(app.directWindManager.apply(this.position));
            this.acceleration.add(app.hole.apply(this.position));

            this.acceleration.add(collisionForce);

            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);

            this.updateAngular();

            this.acceleration.mult(0);

            this.check();
            this.checkToDie();
        }

    },
    calculateSecondaryPosition: function() {
        return new Vector(this.position.x + 30 * Math.cos(this.angle), this.position.y + 30 * Math.sin(this.angle));
    },
    updateAngular: function() {
        if (this.acceleration.mag() > 0.2) {
            this.aVelocity = 0;
        }
        this.aVelocity += this.aAcceleration;
        if (this.velocity.mag() < 0.02) {
            this.aVelocity = 0;
        }

        this.angle += this.aVelocity;
    },
    collisionDetection: function(leaves) {
        var collisionForce = new Vector(0, 0);
        leaves.forEach(function(leaf) {
            if (this !== leaf) {
                if (this.position.distance(leaf.position) <= 10) {
                    var positionCopy = this.position.get();
                    positionCopy.sub(leaf.position);
                    positionCopy.normalize();
                    positionCopy.div(100);
                    collisionForce.apply(positionCopy);
                }
            }
        }.bind(this));
        return collisionForce;
    },
    calculateColor: function() {
        var currentTime = (new Date()).getTime() - this.startTime,
            hue = 1 - (currentTime / this.livingTime),
            color = 'hsl(120, 40%, 41%)';
        if (this.timeOut === false) {
            color = 'hsl(' + parseInt(hue * 120) + ', 50%, 41%)';
        }
        return color;
    },
    render: function() {
        appOut.save();
        appOut.translate(this.position.x, this.position.y);
        appOut.rotate(this.angle);
        appOut.scale(0.17, 0.17);
        this.description.vertices.fill.forEach(function(layout) {
            this.renderFillLayout(layout);
        }.bind(this));
        this.description.vertices.fill.forEach(function(layout) {
            this.renderStrokeLayout(layout);
        }.bind(this));
        this.description.vertices.stroke.forEach(function(layout) {
            this.renderStrokeLayout(layout);
        }.bind(this));
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
        appOut.fillStyle = this.calculateColor();
        appOut.fill();
        appOut.closePath();
    }
};