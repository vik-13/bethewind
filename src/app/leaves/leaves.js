function Leaves() {

}

Leaves.prototype = {
    getLeaf: function(type) {
        return app.leaves[type];
    }
};