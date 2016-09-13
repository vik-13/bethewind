function DirectWindManager() {
    this.winds = [];
    this.activeWind = false;


    app.canvas.addEventListener('touchstart', function(event) {
        addWind.call(this, new Vector(event.touches[0].clientX - event.target.offsetParent.offsetLeft, event.touches[0].clientY - event.target.offsetParent.offsetTop));
    }.bind(this));
    app.canvas.addEventListener('touchmove', function(event) {
        updateWind.call(this, new Vector(event.touches[0].clientX - event.target.offsetParent.offsetLeft, event.touches[0].clientY - event.target.offsetParent.offsetTop));
    }.bind(this));
    document.addEventListener('touchend', function() {
        finishWind.call(this);
    }.bind(this));

    app.canvas.addEventListener('mousedown', function(event) {
        if (event.button == 0) {
            addWind.call(this, new Vector(event.clientX - event.target.offsetParent.offsetLeft, event.clientY - event.target.offsetParent.offsetTop));
        }
    }.bind(this));
    app.canvas.addEventListener('mousemove', function(event) {
        updateWind.call(this, new Vector(event.clientX - event.target.offsetParent.offsetLeft, event.clientY - event.target.offsetParent.offsetTop));
    }.bind(this));
    document.addEventListener('mouseup', function() {
        finishWind.call(this);
    }.bind(this));

    function addWind(position) {
        var wind = new DirectWind(position.div(app.size.diff));
        this.activeWind = wind;
        this.winds.push(wind);
    }

    function updateWind(position) {
        if (this.activeWind !== false) {
            position.div(app.size.diff).sub(this.activeWind.position);
            this.activeWind.updateDirection(position);
        }
    }

    function finishWind() {
        if (this.activeWind !== false) {
            this.activeWind.apply();
            this.activeWind = false;
        }
    }
}

DirectWindManager.prototype = {
    apply: function(leafPosition) {
        var directWind = new Vector(0, 0);
        this.winds.forEach(function(wind) {
            directWind.add(wind.getAcceleration(leafPosition));
        });
        return directWind;
    },
    update: function() {
        var windsToRemove = [];
        this.winds.forEach(function(wind) {
            wind.update();
            if (!wind.isActive) {
                windsToRemove.push(wind);
            }
        }.bind(this));
        windsToRemove.forEach(function(wind) {
            var index = this.winds.indexOf(wind);
            if (index !== -1) {
                this.winds.splice(index, 1);
            }
        }.bind(this));
    },
    render: function() {
        this.winds.forEach(function(wind) {
            wind.render();
        });
    }
};