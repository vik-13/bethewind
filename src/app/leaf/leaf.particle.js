function LeafParticle(position) {
    this.isActive = true;
    this.mass = 0.1 + 0.05 * Math.random();
    this.position = position.get();
    this.velocity = new Vector(0.3 * Math.cos(2 * Math.PI * Math.random()), 0.3 * Math.sin(2 * Math.PI * Math.random()));
    this.acceleration = new Vector(0, 0);
    this.startTime = (new Date()).getTime();
    this.livingTime = 5000;
}

LeafParticle.prototype = {
    check: function() {
        if ((new Date()).getTime() - this.startTime >= this.livingTime) {
            this.isActive = false;
        }
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
    update: function() {
        this.acceleration.add(this.calculateFriction());
        this.acceleration.add(app.gravity.get().mult(this.mass));
        this.acceleration.add(app.wind);

        this.acceleration.add(app.directWindManager.apply(this.position));
        this.acceleration.add(app.hole.apply(this.position));

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.check();
    },
    render: function() {
        var opacity = 1 - (((new Date()).getTime() - this.startTime) / this.livingTime);
        appOut.save();
        appOut.beginPath();
        appOut.arc(this.position.x, this.position.y, 1, 0, 2 * Math.PI);
        appOut.fillStyle = 'rgba(70, 0, 0, ' + opacity + ')';
        appOut.fill();
        appOut.closePath();
        appOut.restore();
    }
};