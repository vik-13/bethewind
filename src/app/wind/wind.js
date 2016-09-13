function Wind() {
    app.wind = new Vector(0.005 - 0.01 * Math.random(), 0.001 - 0.002 * Math.random());
}

Wind.prototype = {
    new: function() {
        app.wind.apply(new Vector(0.005 - 0.01 * Math.random(), 0.001 - 0.002 * Math.random()));
    },
    update: function() {

    },
    render: function() {

    }
};