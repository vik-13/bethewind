function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype = {
    get: function() {
        return new Vector(this.x, this.y);
    },
    apply: function(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    },
    add: function(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    },
    sub: function(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    },
    mult: function(num) {
        this.x *= num;
        this.y *= num;
        return this;
    },
    div: function(num) {
        this.x /= num;
        this.y /= num;
        return this;
    },
    normalize: function() {
        var length;
        if (this.x && this.y) {
            length = this.mag();
            this.x /= length;
            this.y /= length;
        }
        return this;
    },
    mag: function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    },
    distance: function(vector){
        return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
    },
    angle: function(vector) {
        var angle;
        if (typeof vector !== 'undefined') {
            angle = Math.atan2(vector.y - this.y, vector.x - this.x);
        } else {
            angle = Math.atan2(this.y, this.x);
        }
        return angle;
    },
    perpendicular: function() {
        var x = this.x;
        this.x = this.y;
        this.y = - x;
        return this;
    }
};