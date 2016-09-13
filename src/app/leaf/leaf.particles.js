function LeafParticles(position) {
    var i;
    this.amount = 50;
    this.particles = [];
    this.isActive = true;

    for (i = 0; i < this.amount; i++) {
        this.particles.push(new LeafParticle(position));
    }
}

LeafParticles.prototype = {
    checkToDie: function() {
        if (this.particles.length == 0) {
            this.isActive = false;
        }
    },
    update: function() {
        var particlesToRemove = [];
        this.particles.forEach(function(particle) {
            particle.update();
            if (!particle.isActive) {
                particlesToRemove.push(particle);
            }
        }.bind(this));
        particlesToRemove.forEach(function(particle) {
            var index = this.particles.indexOf(particle);
            if (index !== -1) {
                this.particles.splice(index, 1);
            }
        }.bind(this));
        this.checkToDie();
    },
    render: function() {
        this.particles.forEach(function(particle) {
            if (particle.isActive) {
                particle.render();
            }
        });
    }
};