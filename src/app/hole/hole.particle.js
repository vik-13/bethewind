function HoleParticle() {
    var angle = 2 * Math.PI * Math.random();
    this.isActive = true;
    this.position = new Vector(app.hole.position.x + app.hole.power * Math.cos(angle), app.hole.position.y + app.hole.power * Math.sin(angle));
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
}

HoleParticle.prototype = {
    check: function() {
        if (this.position.distance(app.hole.position) <= 10) {
            this.isActive = false;
        }
    },
    force: function() {
        var force = app.hole.position.get().sub(this.position);
        //force.normalize();
        force.div(200);
        return force;
    },
    update: function() {
        this.acceleration.add(this.force());
        this.acceleration.add(this.force().get().perpendicular().div(4));

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.check();
    },
    render: function() {
        appOut.save();
        appOut.beginPath();
        appOut.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI);
        appOut.fillStyle = 'rgba(0, 0, 0, 0.1)';
        appOut.fill();
        appOut.closePath();
        appOut.restore();
    }
};