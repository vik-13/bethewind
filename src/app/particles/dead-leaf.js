function DeadLeaves() {
    this.deadLeaves = [];
}

DeadLeaves.prototype = {
    add: function(position) {
        this.deadLeaves.push(new LeafParticles(position));
    },
    update: function() {
        var deadLeavesToRemove = [];
        this.deadLeaves.forEach(function(deadLeaf) {
            deadLeaf.update();
            if (!deadLeaf.isActive) {
                deadLeavesToRemove.push(deadLeaf);
            }
        }.bind(this));
        deadLeavesToRemove.forEach(function(deadLeaf) {
            var index = this.deadLeaves.indexOf(deadLeaf);
            if (index !== -1) {
                this.deadLeaves.splice(index, 1);
            }
        }.bind(this));
    },
    render: function() {
        this.deadLeaves.forEach(function(deadLeaf) {
            deadLeaf.render();
        });
    }
};