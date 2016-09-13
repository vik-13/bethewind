function Menu() {
    this.currentMenuType = -1;
    this.buttonScale = [0.8, 0.8];
    this.hoverLevelButtonIndex = -1;

    app.canvas.addEventListener('touchstart', function(event) {
        if (event.button == 0) {
            down.call(this, new Vector(event.touches[0].clientX - event.target.offsetParent.offsetLeft, event.touches[0].clientY - event.target.offsetParent.offsetTop));
        }
    }.bind(this));
    app.canvas.addEventListener('touchmove', function(event) {
        hover.call(this, new Vector(event.touches[0].clientX - event.target.offsetParent.offsetLeft, event.touches[0].clientY - event.target.offsetParent.offsetTop));
    }.bind(this));

    app.canvas.addEventListener('mousedown', function(event) {
        if (event.button == 0) {
            down.call(this, new Vector(event.clientX - event.target.offsetParent.offsetLeft, event.clientY - event.target.offsetParent.offsetTop));
        }
    }.bind(this));
    app.canvas.addEventListener('mousemove', function(event) {
        hover.call(this, new Vector(event.clientX - event.target.offsetParent.offsetLeft, event.clientY - event.target.offsetParent.offsetTop));
    }.bind(this));

    function down(mouse) {
        var i;
        if (this.currentMenuType == 0) {
            if (checkHover(mouse, new Vector(160, 320))) {
                app.scene.tree.new(true);
                this.currentMenuType = -1;
                app.canvas.style.cursor = 'default';
            }
        } else if (this.currentMenuType == 1) {
            if (checkHover(mouse, new Vector(160, 240))) {
                this.currentMenuType = 2;
                app.canvas.style.cursor = 'default';
            } else if (checkHover(mouse, new Vector(160, 330))) {
                app.scene.tree.new(false);
                this.currentMenuType = -1;
                app.canvas.style.cursor = 'default';
            }
        }  else if (this.currentMenuType == 2) {
            for (i = 0; i <= app.levelsManager.maxIndex; i++) {
                if (checkHover(mouse, new Vector(90 + 50 * (i % 4), 200 + 50 * parseInt(i / 4)), new Vector(30, 30))) {
                    app.scene.tree.new(true, i);
                    this.currentMenuType = -1;
                    app.canvas.style.cursor = 'default';
                }
            }
        }else if (this.currentMenuType == 3) {
            if (checkHover(mouse, new Vector(160, 240))) {
                this.currentMenuType = 2;
                app.canvas.style.cursor = 'default';
            } else if (checkHover(mouse, new Vector(160, 330))) {
                app.scene.tree.new(true);
                this.currentMenuType = -1;
                app.canvas.style.cursor = 'default';
            }
        } else if (this.currentMenuType == 4) {
            if (checkHover(mouse, new Vector(160, 240))) {
                this.currentMenuType = 2;
                app.canvas.style.cursor = 'default';
            } else if (checkHover(mouse, new Vector(160, 330))) {
                app.scene.tree.new(false);
                this.currentMenuType = -1;
                app.canvas.style.cursor = 'default';
            }
        } else if (this.currentMenuType == 5) {
            if (checkHover(mouse, new Vector(160, 320))) {
                this.currentMenuType = 2;
                app.canvas.style.cursor = 'default';
            }
        }
    }

    function hover(mouse) {
        var i;
        if (this.currentMenuType != -1) {
            if (this.currentMenuType == 0 || this.currentMenuType == 5) {
                if (checkHover(mouse, new Vector(160, 320))) {
                    this.buttonScale[0] = 0.9;
                    app.canvas.style.cursor = 'pointer';
                } else {
                    this.buttonScale[0] = 0.8;
                    app.canvas.style.cursor = 'default';
                }
            } else if (this.currentMenuType == 2) {
                this.hoverLevelButtonIndex = -1;
                app.canvas.style.cursor = 'default';
                for (i = 0; i <= app.levelsManager.maxIndex; i++) {
                    if (checkHover(mouse, new Vector(90 + 50 * (i % 4), 200 + 50 * parseInt(i / 4, 10)), new Vector(30, 30))) {
                        this.hoverLevelButtonIndex = i;
                        app.canvas.style.cursor = 'pointer';
                    }
                }
            } else {
                if (checkHover(mouse, new Vector(160, 240))) {
                    this.buttonScale[0] = 0.9;
                    app.canvas.style.cursor = 'pointer';
                } else if (checkHover(mouse, new Vector(160, 330))) {
                    this.buttonScale[1] = 0.9;
                    app.canvas.style.cursor = 'pointer';
                } else {
                    this.buttonScale[0] = 0.8;
                    this.buttonScale[1] = 0.8;
                    app.canvas.style.cursor = 'default';
                }
            }
        }
    }

    function checkHover(mouse, position, size) {
        var isHover = false;
            size = (typeof size !== 'undefined') ? size : new Vector(180, 70);
        position.mult(app.size.diff);
        size.mult(app.size.diff);
        if (mouse.x > position.x - size.x / 2 &&
            mouse.x < position.x + size.x / 2 &&
            mouse.y > position.y - size.y / 2 &&
            mouse.y < position.y + size.y / 2) {
            isHover = true;
        }
        return isHover;
    }
}

Menu.prototype = {
    showMenu: function(type) {
        if (type == 0) {
            this.currentMenuType = type;
        } else {
            window.setTimeout(function() {
                this.currentMenuType = type;
            }.bind(this),2000);
        }
    },
    update: function() {

    },
    render: function() {
        switch (this.currentMenuType) {
            case 0:
                this.renderBackground();
                this.renderWelcome();
                return;
            case 1:
                this.renderBackground();
                this.renderGameMenu();
                return;
            case 2:
                this.renderBackground();
                this.renderLevels();
                return;
            case 3:
                this.renderBackground();
                this.renderEndLevelWin();
                return;
            case 4:
                this.renderBackground();
                this.renderEndLevelLose();
                return;
            case 5:
                this.renderBackground();
                this.renderEndWin();
                return;
            default:
                return;
        }
    },
    renderBackground: function() {
        appOut.save();
        app.menuConfig.back.vertices.fill.forEach(function(layout) {
            this.renderFillLayout(layout, '#476b6b');
        }.bind(this));
        appOut.restore();
    },
    renderWelcome: function() {
        this.renderLogo();

        this.renderText('Just be the wind!', new Vector(160, 180), '13px');
        this.renderText('Touch the screen and move to choose', new Vector(160, 200), '13px');
        this.renderText('wind direction and catch the leaves...', new Vector(160, 220), '13px');
        this.renderText('Glitch of the nature', new Vector(160, 240), '13px');
        this.renderText('is waiting for these leaves :)', new Vector(160, 260), '13px');

        this.renderButton(new Vector(160, 320), 'Start', this.buttonScale[0]);
    },
    renderGameMenu: function() {
        this.renderLogo();

        this.renderButton(new Vector(160, 240), 'Levels', this.buttonScale[0]);
        this.renderButton(new Vector(160, 330), 'Restart', this.buttonScale[1]);
    },
    renderLevels: function() {
        var i;
        this.renderLogo();

        for (i = 0; i < app.levels.length; i++) {
            this.renderLevelBox(new Vector(90 + 50 * (i % 4), 200 + 50 * parseInt(i / 4, 10)), i, (i <= app.levelsManager.maxIndex), i == this.hoverLevelButtonIndex);
        }
    },
    renderEndLevelWin: function() {
        this.renderLogo();

        this.renderText('Awesome!', new Vector(160, 185), '26px');

        this.renderButton(new Vector(160, 240), 'Levels', this.buttonScale[0]);
        this.renderButton(new Vector(160, 330), 'Next', this.buttonScale[1]);
    },
    renderEndLevelLose: function() {
        this.renderLogo();

        this.renderText('Maybe later...', new Vector(160, 185), '26px');

        this.renderButton(new Vector(160, 240), 'Levels', this.buttonScale[0]);
        this.renderButton(new Vector(160, 330), 'Try again', this.buttonScale[1]);
    },
    renderEndWin: function() {
        this.renderLogo();

        this.renderText('Congratulations!!!', new Vector(160, 190), '26px');

        this.renderButton(new Vector(160, 320), 'Levels', this.buttonScale[0]);
    },
    renderButton: function(position, text, scale) {
        appOut.save();
        appOut.translate(position.x, position.y);
        appOut.scale(scale, scale);
        app.menuConfig.button.vertices.fill.forEach(function(layout) {
            this.renderFillLayout(layout, '#b38600', new Vector(-100, -50));
        }.bind(this));

        appOut.font = '24px Arial';
        appOut.textBaseline = 'middle';
        appOut.textAlign = 'center';
        appOut.fillStyle = '#141f1f';
        appOut.fillText(text, 0, 0);

        appOut.restore();
    },
    renderLogo: function() {
        appOut.save();

        appOut.translate(160, 120);
        appOut.scale(0.5, 0.5);
        app.menuConfig.logo.vertices.fill.forEach(function(layout) {
            this.renderFillLayout(layout, '#b38600', new Vector(-220, -75));
        }.bind(this));

        appOut.restore();
    },
    renderText: function(text, position, size, color) {
        appOut.save();

        appOut.font = ((size) ? size : '32px') + ' Arial';
        appOut.textBaseline = 'middle';
        appOut.textAlign = 'center';
        appOut.fillStyle = color ? color : 'white';
        appOut.fillText(text, position.x, position.y);

        appOut.restore();
    },
    renderLevelBox: function(position, text, active, isHover) {
        appOut.save();
        appOut.translate(position.x, position.y);
        appOut.scale(isHover ? 0.44 : 0.4, isHover ? 0.44 : 0.4);
        app.menuConfig.levelBox.vertices.fill.forEach(function(layout) {
            this.renderFillLayout(layout, (active) ? '#b38600' : '#3e5b5b', new Vector(-50, -50));
        }.bind(this));

        appOut.font = '24px Arial';
        appOut.textBaseline = 'middle';
        appOut.textAlign = 'center';
        appOut.fillStyle = 'white';
        appOut.fillText(text, 0, 0);

        appOut.restore();
    },
    renderStrokeLayout: function(layout, color) {
        appOut.beginPath();
        layout.forEach(function(dot, index) {
            if (!index) {
                appOut.moveTo(dot.x, dot.y);
            } else {
                appOut.lineTo(dot.x, dot.y);
                if (index == layout.length - 1) {
                    appOut.lineTo(layout[0].x, layout[0].y);
                }
            }
        }.bind(this));
        appOut.strokeStyle = color;
        appOut.stroke();
        appOut.closePath();
    },
    renderFillLayout: function(layout, color, shift) {
        if (typeof shift === 'undefined') {
            shift = new Vector(0, 0);
        }
        appOut.beginPath();
        layout.forEach(function(dot, index) {
            if (!index) {
                appOut.moveTo(dot.x + shift.x, dot.y + shift.y);
            } else {
                appOut.lineTo(dot.x + shift.x, dot.y + shift.y);
            }
        }.bind(this));
        appOut.fillStyle = color;
        appOut.fill();
        appOut.closePath();
    }
};