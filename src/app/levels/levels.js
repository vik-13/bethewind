function Levels() {
    this.maxIndex = -1;
    this.currentIndex = -1;
}

Levels.prototype = {
    next: function(newLevel) {
        this.currentIndex = newLevel ? this.currentIndex + 1 : this.currentIndex;
        app.levelMenu.change();
        this.maxIndex = this.currentIndex > this.maxIndex ? this.currentIndex : this.maxIndex;
        return this.getConfig();
    },
    open: function(number){
        this.currentIndex = number;
        app.levelMenu.change();
        this.maxIndex = this.currentIndex > this.maxIndex ? this.currentIndex : this.maxIndex;
        return this.getConfig();
    },
    updateMax: function() {
        this.maxIndex++;
    },
    getConfig: function() {
        return app.levels[this.currentIndex];
    },
    isLast: function() {
        return (this.currentIndex == app.levels.length - 1);
    }
};