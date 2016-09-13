function HoleParticles() {
    this.amount = 30;
    this.particles = [];
}

HoleParticles.prototype = {
    add: function() {
        this.particles.push(new HoleParticle());
    },
    checkToAdd: function() {
        if (this.particles.length < this.amount) {
            this.add();
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
        this.checkToAdd();
    },
    render: function() {
        this.particles.forEach(function(particle) {
            if (particle.isActive) {
                particle.render();
            }
        });
    }
};