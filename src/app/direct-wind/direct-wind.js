function DirectWind(position) {
    this.direction = new Vector(0, 0);
    this.slowDown = 1;
    this.position = position;
    this.power = 0;
    this.angle = 1;
    this.directionAngle = 1;
    this.isActive = true;
    this.inMove = true;
}

DirectWind.prototype = {
    update: function() {
        if (!this.inMove) {
            this.power -= this.slowDown;
            if (this.power <= 0) {
                this.isActive = false;
            }
        }
    },
    updateDirection: function(direction) {
        this.power = direction.mag();
        this.direction.apply(direction.normalize());
        this.directionAngle = this.direction.angle();
    },
    apply: function() {
        this.inMove = false;
        this.start = new Date().getTime();
    },
    getAcceleration: function(leafPosition) {
        var distance = leafPosition.distance(this.position),
            direction, acceleration = new Vector(0, 0), angle, power;
        if (distance < this.power * 2) {
            angle = this.position.angle(leafPosition);
            if (this.directionAngle - this.angle / 2 < angle && this.directionAngle + this.angle / 2 > angle ) {
                power = (1 - distance / (this.power * 2)) / 12;
                direction = new Vector(power * Math.cos(angle), power * Math.sin(angle));
                acceleration.add(direction);
            }
        }
        return acceleration;
    },
    render: function() {
        appOut.save();
        appOut.beginPath();
        appOut.arc(this.position.x, this.position.y, 3, 0, 2 * Math.PI);
        appOut.fillStyle = 'rgba(0, 0, 0, 0.05)';
        appOut.fill();
        appOut.beginPath();
        appOut.arc(this.position.x, this.position.y, this.power, this.directionAngle - this.angle / 2, this.directionAngle + this.angle / 2);
        appOut.fillStyle = 'rgba(0, 0, 0, 0.05)';
        appOut.fill();
        appOut.closePath();
        appOut.restore();
    }
};