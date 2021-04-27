var pixilapp = function (a) {
    "use strict";
    var b = function (b, c, d, e, f, g, h) {
        this.that = h, this.name = d, this.canvas = document.createElement("canvas"), this.canvas.name = d, this.canvas.id = "canvas_" + d, f && "Canvas" == this.that.zoom.type && (b *= f, c *= f), this.canvas.width = b, this.canvas.height = c, "CSS" == this.that.zoom.type && "force" != f && (f && (this.canvas.style.width = "100%", this.canvas.style.height = "100%"), b *= f, c *= f, a("#canvas-layers-container").width(b), a("#canvas-layers-container").height(c), a("#drawing-canvas-conatiner").addClass("css-zoom")), this.setDefault(b, c), this.ctx = !1, g ? document.getElementById("canvas-layers-appened").appendChild(this.canvas) : document.getElementById("drawing-canvas-conatiner").appendChild(this.canvas), e && (this.canvas.className = "hidden-canvas")
    };
    b.prototype.setDefault = function (a, b) {
        this.defaultData = {
            width: a,
            height: b
        }
    }, b.prototype.setSmoothing = function () {
        this.ctx.mozImageSmoothingEnabled = !1, this.ctx.imageSmoothingEnabled = !1, this.ctx.msImageSmoothingEnabled = !1, this.ctx.webkitImageSmoothingEnabled = !1
    }, b.prototype.setAlpha = function (a) {
        this.ctx.globalAlpha = a
    }, b.prototype.restoreAlpha = function () {
        this.ctx.globalAlpha = 1
    }, b.prototype.getCanvas = function () {
        return document.getElementById(this.canvas.id)
    }, b.prototype.clear = function (a) {
        if (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), a) return this.dataURL()
    }, b.prototype.dataURL = function () {
        return this.canvas.toDataURL("image/png")
    }, b.prototype.image = function () {
        var a = new Image;
        return a.src = this.dataURL(), a
    }, b.prototype.context = function () {
        return this.canvas.getContext("2d")
    }, b.prototype.putSimple = function (a, b, c) {
        b = b ? b : 0, c = c ? c : 0, this.ctx.drawImage(a, b, c)
    }, b.prototype.putImageData = function (a, b, c, d) {
        var b = b ? b : 1,
            e = {
                left: 0,
                top: 0,
                ratio: 1
            };
        c && (e = c), 1 != b && (this.ctx.globalAlpha = b), "CSS" == this.that.zoom.type ? this.ctx.drawImage(a, 0, 0) : this.ctx.drawImage(a, e.left, e.top, this.canvas.width * e.ratio, this.canvas.height * e.ratio), this.ctx.globalAlpha = 1
    }, b.prototype["default"] = function () {
        this.clear(), this.canvas.width = this.defaultData.width, this.canvas.height = this.defaultData.height
    };
    var c = function (a, b, c) {
        this.id = a, this.src = c ? c : "", this.name = b, this.opacity = parseInt(1), this.active = !0, this.unqid = ""
    };
    c.prototype["import"] = function (a) {
        var b = this;
        b = a
    }, c.prototype.init = function () {
        this.unqid = Math.random().toString(36).substring(7)
    }, c.prototype.setUnqid = function () {
        this.unqid = Math.random().toString(36).substring(7)
    }, c.prototype.rename = function (a) {
        this.name = a
    }, c.prototype.update = function (a) {
        this.src = a
    }, c.prototype["delete"] = function () {
        delete this
    }, c.prototype.clone = function () {
        return jQuery.extend(!0, {}, this)
    };
    var d = function () {
        this.name = "", this.speed = 100, this.layers = [], this.active = !0, this.selectedLayer = 0, this.unqid = "", this.preview = "pixel.png", this.width = 0, this.height = 0
    };
    d.prototype.init = function (a, b) {
        this.setUnqid(), this.width = a, this.height = b
    }, d.prototype.setUnqid = function () {
        this.unqid = Math.random().toString(36).substring(7)
    }, d.prototype.rename = function (a) {
        this.name = a
    }, d.prototype.speed = function (a) {
        this.speed = a
    }, d.prototype["delete"] = function () {
        delete this
    }, d.prototype.clone = function () {
        return jQuery.extend(!0, {}, this)
    };
    var e = function () {
        this.id, this.type, this.category, this.data
    };
    e.prototype["delete"] = function () {
        delete this
    };
    var f = function (a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.initClick = !1, this.hasOptions = !0
    };
    f.prototype.load = function () {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function () {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, f.prototype.getCurrent = function () {
        this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()
    }, f.prototype.active = function (a) {
        this.currentImage || this.getCurrent(), !this.that.mouse.active || this.initClick || this.that.keyEvent || (this.that.layPixel(!1, !1, !1, !1, "rendering"), this.that.mirrorDrawing(!1, "rendering"), this.initClick = !0);
        for (var b = this.that.maxHeight, c = 0; this.that.mouse.active && this.imageLoaded && (this.that.keyEvent && this.that.keyEvent.ctrlKey ? (this.colorPicker(), this.that.mouse.active = !1) : (this.that.renderPixel(), this.that.mirrorDrawing(!1, "rendering")), !(this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height)) && (this.that.mouse.x_0 != this.that.mouse.x_1 || this.that.mouse.y_0 != this.that.mouse.y_1) && (c++, !(c > b));) {
            this.that.mouseDistance()
        }
        this.that.mouse.active && this.imageLoaded && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas))
    }, f.prototype.colorPicker = function () {
        this.that.ColorController.color = "#" + this.that.mouse.getPixel(this.that.mouse.x1, this.that.mouse.y1), this.that.ColorController.select()
    }, f.prototype.off = function (a) {
        this.that.pixelPerfect.set = 0, this.that.pixelPerfect.direction = "", this.that.pixelPerfect.history = [], this.that.pixelPerfect.preHistory = [], this.initClick = !1, this.currentImage = !1, this.imageLoaded = !1, this.that.isApp && this.getCurrent()
    }, f.prototype.restore = function (a) {
        this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1
    };
    var g = function (a) {
        this.that = a
    };
    g.prototype.active = function (a) {
        for (var b = 500, c = 0; this.that.mouse.active && (this.that.clearPixel(), this.that.mirrorDrawing(!1, "layer", !0), !(this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height)) && (this.that.mouse.x_0 != this.that.mouse.x_1 || this.that.mouse.y_0 != this.that.mouse.y_1) && (c++, !(c > b));) {
            this.that.mouseDistance()
        }
    };
    var h = function (a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.hasOptions = !0
    };
    h.prototype.load = function () {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function () {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, h.prototype.active = function (a) {
        this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.load()), this.that.mouse.active && this.imageLoaded && (this.that.canvas.rendering.clear(), this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage));
        for (var b = this.that.maxWidth, c = 0; this.that.mouse.active && this.imageLoaded && (this.that.layPixel(!1, !1, !1, !1, "layer"), this.that.mirrorDrawing(!1, "layer"), this.that.mouse.x_0 != this.that.mouse.x_1 || this.that.mouse.y_0 != this.that.mouse.y_1) && (c++, !(c > b));) {
            this.that.mouseDistance()
        }
    }, h.prototype.shft = function (a) {
        a ? this.that.settings.isoLines = !0 : this.that.settings.isoLines = !1, this.that.SettingsController.toggleISOLines()
    }, h.prototype.off = function () {
        this.currentImage = !1, this.imageLoaded = !1
    }, h.prototype.restore = function () {
        this.currentImage = !1, this.imageLoaded = !1
    };
    var i = function (a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1
    };
    i.prototype.load = function () {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function () {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, i.prototype.active = function (a) {
        if (this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.load()), this.that.mouse.active && this.imageLoaded) {
            this.that.canvas.rendering.clear(), this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage);
            var b = this.that.mouse.start_x.toString(),
                c = this.that.mouse.start_y.toString(),
                d = parseInt(this.that.mouse.x1) - parseInt(b),
                e = parseInt(this.that.mouse.y1) - parseInt(c),
                f = parseInt(this.that.mouse.start_x) + d,
                g = parseInt(this.that.mouse.start_y) + e
        }
        for (var h = this.that.maxWidth, i = 0; this.that.mouse.active && this.imageLoaded && (this.that.layPixel(b, !1, !1, !1, "layer"), this.that.layPixel(!1, c, !1, !1, "layer"), this.that.layPixel(f.toString(), !1, !1, !1, "layer"), this.that.layPixel(!1, g.toString(), !1, !1, "layer"), this.that.mouse.x_0 != this.that.mouse.x_1 || this.that.mouse.y_0 != this.that.mouse.y_1) && (i++, !(i > h));) {
            this.that.mouseDistance()
        }
    }, i.prototype.off = function () {
        this.currentImage = !1, this.imageLoaded = !1
    }, i.prototype.restore = function () {
        this.currentImage = !1, this.imageLoaded = !1
    };
    var j = function (a) {
        this.that = a, this.filled = [], this.used = [], this.clickedColor = !1, this.renderImageData = [], this.callStackLimit = 4e3, this.called = 0, this.hasOptions = !0
    };
    j.prototype.active = function (a) {
        if (this.that.mouse.active)
            if (this.that.settings.bucket.allColors) this.byColor();
            else {
                for (var b = this.that.mouse.start_x, c = this.that.mouse.start_y, d = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height), e = 0; e < d.data.length; e += 4) {
                    var f = ("000000" + this.that.rgbaToHex(d.data[e], d.data[e + 1], d.data[e + 2])).slice(-6);
                    f = f + "" + d.data[e + 3], this.renderImageData.push(f)
                }
                if (this.clickedColor = this.that.mouse.getPixel(b, c, !0), "#" + this.clickedColor == this.that.ColorController.color + "255" && !this.that.settings.bucket.clear) return;
                this.that.settings.bucket.clear ? this.that.clearPixel(b, c, 1) : this.that.layPixel(b, c, !0, !1, !1, 1), this.fill(b, c, !0), this.loopFill(), this.that.FrameController.updateFramePreview()
            } this.finish()
    }, j.prototype.byColor = function () {
        var a = this.that.mouse.start_x,
            b = this.that.mouse.start_y;
        this.clickedColor = this.that.mouse.getPixel(a, b, !0);
        for (var c = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height), d = 0, e = 0, f = 0; f < c.data.length; f += 4) {
            d >= this.that.width && (d = 0, e++);
            var g = ("000000" + this.that.rgbaToHex(c.data[f], c.data[f + 1], c.data[f + 2])).slice(-6);
            g = g + "" + c.data[f + 3], g == this.clickedColor && (this.that.settings.bucket.clear ? this.that.clearPixel(d, e, 1) : this.that.layPixel(d, e, !0, !1, !1, 1)), d++
        }
        this.that.FrameController.updateFramePreview()
    }, j.prototype.fill = function (a, b) {
        var c = a,
            d = b,
            e = a + 1,
            f = b + 1,
            g = a - 1,
            h = b - 1;
        this.check(e, d), this.check(c, f), this.check(g, d), this.check(c, h)
    }, j.prototype.loopFill = function () {
        if (!(this.called >= this.callStackLimit)) {
            this.called++;
            var a = this.filled.slice(0);
            this.filled = [];
            for (var b = a.length - 1; b >= 0; b--) {
                var c = a[b];
                this.fill(c[0], c[1])
            }
            this.loopFill()
        }
    }, j.prototype.check = function (a, b) {
        var c = this.that.width,
            d = this.that.height;
        a = parseInt(a), b = parseInt(b);
        var e = c * b + a;
        a <= c - 1 && a >= 0 && b <= d - 1 && b >= 0 && this.renderImageData[e] == this.clickedColor && (this.that.settings.bucket.clear ? this.that.clearPixel(a, b, 1) : this.that.layPixel(a, b, !0, !1, !1, 1), this.filled.push([a, b]), this.renderImageData[e] = this.that.ColorController.color)
    }, j.prototype.finish = function () {
        this.that.mouse.active = !1, this.filled = [], this.renderImageData = [], this.called = 0
    };
    var k = function (a) {
        this.that = a, this.clickedColor = !1
    };
    k.prototype.active = function (a) {
        if (this.that.mouse.active) {
            var b = this.that.mouse.start_x,
                c = this.that.mouse.start_y;
            this.clickedColor = this.that.mouse.getPixel(b, c, !0);
            for (var d = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height), e = 0, f = 0, g = 0; g < d.data.length; g += 4) {
                e >= this.that.width && (e = 0, f++);
                var h = ("000000" + this.that.rgbaToHex(d.data[g], d.data[g + 1], d.data[g + 2])).slice(-6);
                h = h + "" + d.data[g + 3], h == this.clickedColor && this.that.layPixel(e, f, !0, !1, !1, 1), e++
            }
            this.that.FrameController.updateFramePreview()
        }
        this.finish()
    }, k.prototype.finish = function () {
        this.that.mouse.active = !1, this.clickedColor = !1
    };
    var m = function (a) {
        this.that = a, this.flatten = !1
    };
    m.prototype.flattenLayers = function () {
        var a = this,
            b = this.that.LayerController.layers,
            c = this.that.LayerController.flatten(b),
            d = new Image;
        d.onload = function () {
            a.that.canvas.data.putSimple(this), a.flatten = !0, a.select()
        }, d.src = c
    }, m.prototype.active = function (a) {
        this.that.mouse.active && (this.flatten || this.flattenLayers(), this.flatten && this.select())
    }, m.prototype.select = function () {
        var a = this.that.mouse.x1,
            b = this.that.mouse.y1,
            c = this.that.mouse.getPixel(a, b, !1, "data");
        this.that.ColorController.color = "#" + c, this.that.ColorController.select(c)
    }, m.prototype.off = function (a) {
        this.flatten = !1
    }, m.prototype.restore = function (a) {
        this.that.canvas.data["default"](), this.flatten = !1
    };
    var n = function (a) {
        this.that = a, this.currentImage = !1
    };
    n.prototype.active = function (a) {
        if (this.currentImage || (this.currentImage = a ? a : this.that.canvas.layer.image()), this.that.mouse.active) {
            var b = this.that.mouse.x1 - this.that.mouse.start_x,
                c = this.that.mouse.y1 - this.that.mouse.start_y;
            this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage, b, c)
        }
    }, n.prototype.off = function () {
        this.currentImage = !1
    }, n.prototype.restore = function () {
        this.currentImage = !1
    };
    var o = function (a) {
        this.that = a, this.moving = !1, this.activeSelecting = !1, this.undo = !1, this.selectionActive = !1, this.hasOptions = !0, this.that.selectImageData = !1, this.that.currentImage = !1, this.moved = !1, this.selectColor = "rgba(255,255,255,0.3)", this.selectColorPrimary = "rgba(0,0,0,0.3)", this.selectCanvasLocation = {
            active: !1,
            image: !1,
            default_x: -999999,
            default_y: -999999,
            x: -99999,
            y: -99999,
            width: 0,
            height: 0
        }
    };
    o.prototype.active = function (a) {
        if (this.that.SelectController.currentImage || (this.that.SelectController.currentImage = this.that.canvas.layer.image(), this.that.currentImage = this.that.canvas.layer.image()), this.that.mouse.active) {
            if (this.that.SelectController.hideSelectTools(), this.that.SelectController.status && (this.that.mouse.start_x > this.that.SelectController.start_x && this.that.mouse.start_x < this.that.SelectController.start_x + this.that.SelectController.width && this.that.mouse.start_y > this.that.SelectController.start_y && this.that.mouse.start_y < this.that.SelectController.start_y + this.that.SelectController.height ? this.move() : this.moveOff()), !this.moving) {
                this.doHistory(), this.that.SelectController.transform = !1;
                var b = this.that.mouse.x1,
                    c = this.that.mouse.y1;
                this.that.mouse.start_x < b && b++, this.that.mouse.start_y < c && c++, this.that.mouse.start_x == b && this.that.mouse.start_y == c || (this.activeSelecting = !0, this.selectCanvasLocation.active = !1), this.that.canvas.select.clear();
                var d = b - this.that.mouse.start_x,
                    e = c - this.that.mouse.start_y,
                    f = this.that.mouse.start_x > b ? b : this.that.mouse.start_x,
                    g = this.that.mouse.start_y > c ? c : this.that.mouse.start_y;
                this.that.SelectController.start_x = f, this.that.SelectController.start_y = g, this.that.SelectController.start_width = Math.abs(d), this.that.SelectController.start_height = Math.abs(e), this.that.SelectController.width = Math.abs(d), this.that.SelectController.height = Math.abs(e), this.showHideStampButton(), this.drawSelectArea(this.that.mouse.start_x, this.that.mouse.start_y, d, e), this.selectCanvasLocation = {
                    default_x: f,
                    default_y: g,
                    x: f,
                    y: g,
                    width: Math.abs(d),
                    height: Math.abs(e)
                }
            }
        } else this.that.SelectController.showSelectTools(), this.that.SelectController.addSelectToolsReady();
        this.that.renderAfter.push(this.that.canvas.select.canvas)
    }, o.prototype.showHideStampButton = function () {
        this.that.SelectController.width > 1 && this.that.SelectController.height > 1 ? this.that.SelectController.showStampButton() : this.that.SelectController.hideStampButton()
    }, o.prototype.drawSelectArea = function (a, b, c, d) {
        this.that.canvas.select.ctx.fillStyle = this.selectColor, this.that.canvas.select.ctx.fillRect(a, b, c, d), this.that.canvas.select.ctx.fillStyle = this.selectColorPrimary, this.that.canvas.select.ctx.fillRect(a, b, c, d)
    }, o.prototype.renderSelectedArea = function () {
        this.that.canvas.select.clear(), 0 == this.that.SelectController.start_x && 0 == this.that.SelectController.start_y && (this.that.SelectController.status = !1), this.that.SelectController.start_x = this.selectCanvasLocation.x, this.that.SelectController.start_y = this.selectCanvasLocation.y, this.that.SelectController.width = this.selectCanvasLocation.width, this.that.SelectController.height = this.selectCanvasLocation.height, this.drawSelectArea(this.selectCanvasLocation.x, this.selectCanvasLocation.y, this.selectCanvasLocation.width, this.selectCanvasLocation.height)
    }, o.prototype.updateSelectCanvasArea = function (a, b) {
        this.that.canvas.select.clear(), this.selectCanvasLocation.width = a, this.selectCanvasLocation.height = b, this.that.SelectController.width = a, this.that.SelectController.height = b, this.drawSelectArea(this.selectCanvasLocation.x, this.selectCanvasLocation.y, this.selectCanvasLocation.width, this.selectCanvasLocation.height)
    }, o.prototype.move = function () {
        this.moved = !0, this.that.SelectController.showAcceptButton(), this.that.SelectController.hideSelectTools(), this.moving = !0, this.selectCanvasLocation.active = !0, this.that.SelectController.transform = !1, this.that.canvas.select.clear(), this.that.canvas.rendering.clear(), this.that.canvas.rendering.putSimple(this.selectCanvasLocation.image), this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.that.SelectController.currentImage, 0, 0), this.that.canvas.layer.ctx.clearRect(this.selectCanvasLocation.default_x, this.selectCanvasLocation.default_y, this.that.SelectController.start_width, this.that.SelectController.start_height);
        var a = this.that.mouse.x1 - this.that.mouse.start_x + this.that.SelectController.start_x,
            b = this.that.mouse.y1 - this.that.mouse.start_y + this.that.SelectController.start_y;
        this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas, a, b);
        this.selectCanvasLocation;
        this.selectCanvasLocation.x = a, this.selectCanvasLocation.y = b
    }, o.prototype.updateSelection = function () {
        var a = this.that.canvas.rendering.image(),
            b = this;
        a.onload = function () {
            b.that.SelectController.showAcceptButton(), b.that.canvas.layer.clear(), b.that.canvas.layer.putSimple(b.that.currentImage, 0, 0), b.that.canvas.layer.ctx.clearRect(b.selectCanvasLocation.default_x, b.selectCanvasLocation.default_y, b.that.SelectController.start_width, b.that.SelectController.start_height), b.that.canvas.layer.putSimple(a, b.selectCanvasLocation.x, b.selectCanvasLocation.y), b.selectCanvasLocation.image = a, b.that.render()
        }
    }, o.prototype.off = function () {
        if (this.selectionActive = !1, this.activeSelecting && (this.that.SelectController.status = !0), !this.selectCanvasLocation.active) {
            var a = this.that.SelectController.start_x,
                b = this.that.SelectController.start_y,
                c = this.that.SelectController.width,
                d = this.that.SelectController.height;
            if (this.that.canvas.rendering.canvas.width = this.that.width, this.that.canvas.rendering.canvas.height = this.that.height, this.that.canvas.rendering.putSimple(this.that.canvas.layer.canvas), this.that.SelectController.currentImage = !1, Math.abs(c) > 0 && Math.abs(d) > 0) {
                var e = this.that.canvas.rendering.ctx.getImageData(a, b, c, d);
                this.that.canvas.rendering.canvas.width = Math.abs(c), this.that.canvas.rendering.canvas.height = Math.abs(d), this.that.canvas.rendering.ctx.putImageData(e, 0, 0), this.selectCanvasLocation.image = this.that.canvas.rendering.image()
            }
        }
        this.selectCanvasLocation.active && (this.renderSelectedArea(), this.that.isMobile && !this.that.isApp && this.restore()), this.activeSelecting = !1, this.that.render()
    }, o.prototype.history = function () {
        this.undo || this.that.SelectController.transform || (this.undo = !0, this.that.HistoryController.create())
    }, o.prototype.moveOff = function () {
        this.restore(!0)
    }, o.prototype.hideButtons = function () {
        this.that.SelectController.hideToggleButtons()
    }, o.prototype.restore = function (a, b) {
        this.that.SelectController.hideAccept(), this.that.SelectController.hideSelectTools(), this.that.SelectController.hideStampButton(), this.doHistory(b), this.moving = !1, this.moved = !1, this.undo = !1, this.that.canvas.select.clear(), this.that.canvas.rendering["default"](), this.that.SelectController.currentImage = !1, this.that.SelectController.status = !1, this.that.SelectController.width = 0, this.that.SelectController.height = 0, this.selectCanvasLocation.width = 0, this.selectCanvasLocation.height = 0, this.that.currentImage = !1, a || this.that.render()
    }, o.prototype.doHistory = function (a) {
        (this.that.SelectController.transform || a || this.moved) && (this.that.HistoryController.create(), this.that.SelectController.transform = !1, this.moved = !1)
    };
    var p = function (a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1
    };
    p.prototype.load = function () {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function () {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, p.prototype.active = function (a) {
        if (this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.load()), this.that.mouse.active && this.imageLoaded) {
            var b = Math.abs(this.that.mouse.start_x - this.that.mouse.x1),
                c = (Math.abs(this.that.mouse.start_y - this.that.mouse.y1), 0);
            if (b = Math.floor(b / 2), this.that.mouse.start_x > this.that.mouse.x1) var d = this.that.mouse.start_x - b;
            else var d = this.that.mouse.start_x + b;
            if (this.that.mouse.start_y > this.that.mouse.y1) var e = this.that.mouse.start_y - b;
            else var e = this.that.mouse.start_y + b;
            var f = (this.that.mouse.x1 + b, this.that.mouse.y1 + b, 1 - b);
            for (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage); b >= c;) this.that.layPixel(b + d, c + e), this.that.layPixel(c + d, b + e), this.that.layPixel(-b + d, c + e), this.that.layPixel(-c + d, b + e), this.that.layPixel(-b + d, -c + e), this.that.layPixel(-c + d, -b + e), this.that.layPixel(b + d, -c + e), this.that.layPixel(c + d, -b + e), c++, f <= 0 ? f += 2 * c + 1 : (b--, f += 2 * (c - b) + 1)
        }
    }, p.prototype.off = function () {
        this.currentImage = !1, this.imageLoaded = !1
    }, p.prototype.restore = function () {
        this.currentImage = !1, this.imageLoaded = !1
    };
    var q = function (a) {
        this.that = a, this.used = [], this.hasOptions = !0, this.listeners()
    };
    q.prototype.listeners = function () {
        var b = this;
        a("#lightendarken-range-size").on("input", function () {
            b.that.settings.lightendarken.strengh = a(this).val(), a(".ligtendarken-level").text(a(this).val())
        })
    }, q.prototype.active = function (a) {
        for (var b = 500, c = 0, d = parseInt(this.that.settings.lightendarken.strengh) / 10; this.that.mouse.active;) {
            var e = "rgba(0, 0, 0, " + d + ")";
            if ((3 == this.that.mouseEvent.which || this.that.settings.lightendarken.light) && (e = "rgba(255, 255, 255, " + d + ")"), this.that.keyEvent && this.that.keyEvent.ctrlKey && (this.used = []), this.used.indexOf(this.that.mouse.x_0 + "-" + this.that.mouse.y_0) === -1 && (this.used.push(this.that.mouse.x_0 + "-" + this.that.mouse.y_0), this.that.layPixel(this.that.mouse.x_0, this.that.mouse.y_0, !1, e, !1, !0), this.that.mirrorDrawing(e)), this.that.mouse.x_0 == this.that.mouse.x_1 && this.that.mouse.y_0 == this.that.mouse.y_1) break;
            if (c++, c > b) break;
            this.that.mouseDistance()
        }
    }, q.prototype.off = function () {
        this.used = []
    };
    var r = function (a) {
        this.that = a, this.position = !1, this.currentImage = !1, this.spacing_left = 0, this.spacing_top = 0, this.cursorShown = !1, this.history = [], this.setIntTime = !1, this.hasOptions = !0, this.font_size = 1, this.size = 1, this.init()
    };
    r.prototype.setSizeText = function (b) {
        var c = b ? b : this.size,
            d = this.that.textData[this.that.textData.current].height * c;
        a(".text-size-level").text(d)
    }, r.prototype.init = function () {
        this.listeners()
    }, r.prototype.listeners = function () {
        var b = this;
        a("#text-size").on("input", function () {
            b.setSizeText(a(this).val())
        }), a("#text-size").on("change", function () {
            b.size = a(this).val()
        })
    }, r.prototype.active = function (a) {
        if (this.that.mouse.active) {
            if (this.that.mouse.active = !1, this.currentImage) {
                this.drawToLayer(!1, !0)
            }
            this.start()
        }
    }, r.prototype.begin = function () {
        this.currentImage = this.that.canvas.layer.image(), this.that.canvas.rendering["default"](), this.history = [], this.createHistory(), this.position = {
            default_x: this.that.mouse.start_x,
            default_y: this.that.mouse.start_y,
            x: this.that.mouse.start_x,
            y: this.that.mouse.start_y
        }, this.cursor()
    }, r.prototype.start = function () {
        var a = this;
        this.checkSettingHistoryController(function () {
            a.begin()
        })
    }, r.prototype.beforeHistory = function () {
        this.currentImage && (this.that.canvas.select.clear(), clearInterval(this.setIntTime), this.setIntTime = !1, this.drawToLayer(!1, !0))
    }, r.prototype.cursor = function () {
        function a(a) {
            var c = b.that.textData[b.that.textData.current].height;
            c *= b.size, b.cursorShown ? (b.cursorShown = !1, b.that.canvas.select.clear()) : (b.cursorShown = !0, b.that.canvas.select.ctx.fillStyle = "rgba(255,255,255,0.3)", b.that.canvas.select.ctx.fillRect(b.position.x, b.position.y, 1, c), b.that.canvas.select.ctx.fillStyle = "rgba(0,0,0,0.3)", b.that.canvas.select.ctx.fillRect(b.position.x, b.position.y, 1, c)), b.position && b.drawToLayer(!0)
        }
        if (this.position) {
            var b = this;
            this.setIntTime || (this.setIntTime = setInterval(function () {
                a(!0)
            }, 250))
        }
    }, r.prototype.createHistory = function () {
        var a = {
            image: this.that.canvas.rendering.image(),
            x: this.position.x,
            y: this.position.y
        };
        this.history.push(a)
    }, r.prototype.doHistory = function () {
        this.checkSettingHistoryController()
    }, r.prototype.checkSettingHistoryController = function (a) {
        if (this.position && this.history.length >= 2) this.that.HistoryController.create(!1, function () {
            if (a) return a(!0)
        });
        else if (a) return a(!0)
    }, r.prototype.restore = function () {
        this.drawToLayer(), this.that.canvas.select.clear(), this.position = !1, this.history = [], this.currentImage = !1, this.cursorShown = !1, clearInterval(this.setIntTime), this.setIntTime = !1
    }, r.prototype.use = function (a) {
        if (this.position) {
            if (8 == a.which) return void this.backSpace();
            var b = this.that.textData.current,
                c = a.which;
            a.shiftKey && (c = "s" + c);
            var d = this.that.textData[b][c];
            if ("string" == typeof d || "object" == typeof d || [13, 32].indexOf(c) !== -1) {
                this.createHistory();
                var e = this,
                    f = this.that.textData[b][c];
                if (this.spacing_left = this.that.textData[b].spacing_left, this.spacing_top = this.that.textData[b].spacing_top, "object" == typeof this.that.textData[b][c] && (f = this.that.textData[b][c].image, this.spacing_left = this.that.textData[b][c].spacing_left, this.spacing_top = this.that.textData[b][c].spacing_top), this.spacing_left *= this.size, 32 == a.which) return void this.updatePosition(parseInt(this.position.x) + parseInt(this.spacing_left), this.position.y);
                if (13 == c) return void this.returnKey();
                if ("#000000" != e.that.ColorController.color) {
                    var g = new Image;
                    g.onload = function () {
                        e.that.canvasToSolid(this, !1, !1, !0, function (a) {
                            e.renderData(a, !0)
                        })
                    }, g.src = f
                } else this.renderData(f, !0)
            }
        }
    }, r.prototype.renderData = function (a, b, c) {
        var d = this,
            e = new Image;
        e.onload = function () {
            var a = this.width * d.size,
                c = this.height * d.size;
            d.that.canvas.data.canvas.width = a, d.that.canvas.data.canvas.height = c, d.that.canvas.data.setSmoothing(), d.that.canvas.data.ctx.drawImage(this, 0, 0, a, c), b && d.callback()
        }, e.src = a
    }, r.prototype.callback = function () {
        this.that.canvas.rendering.putSimple(this.that.canvas.data.canvas, this.position.x, this.position.y), this.updatePosition(parseInt(this.position.x) + parseInt(this.spacing_left), this.position.y), this.drawToLayer()
    }, r.prototype.drawToLayer = function (a, b, c) {
        if (this.currentImage) return this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas), a ? this.that.renderAfter.push(this.that.canvas.select.canvas) : this.that.canvas.select.clear(), b || this.that.render(), c ? c(!0) : void 0
    }, r.prototype.updatePosition = function (a, b) {
        this.position.x = a, this.position.y = b
    }, r.prototype.backSpace = function () {
        if (this.history.length >= 2) {
            var a = this.history[this.history.length - 1],
                b = a.x,
                c = a.y,
                d = a.image;
            this.that.canvas.rendering.clear(), this.that.canvas.rendering.putSimple(d), this.updatePosition(b, c), this.drawToLayer(), this.history.pop()
        }
    }, r.prototype.returnKey = function () {
        this.position.y = this.position.y + parseInt(this.spacing_top) * this.size, this.position.x = this.position.default_x
    }, r.prototype.on = function () {
        this.setSizeText()
    };
    var s = function (a) {
        this.that = a, this.currentImage = !1, this.imageData = !1
    };
    s.prototype.active = function (a) {
        this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.imageData = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height)), this.changeColor(a)
    }, s.prototype.changeColor = function (a) {
        for (var b, c, d, e = 0, f = this.imageData.length; e < f; e += 4) {
            b = this.imageData.length[e], c = this.imageData.length[e + 1], d = this.imageData.length[e + 2];
            var g = that.that.RGBtoHSV(b, c, d);
            g.h += a;
            var h = that.that.HSVtoRGB(g.h, g.s, g.v);
            this.imageData.length[e] = h.r, this.imageData.length[e + 1] = h.g, this.imageData.length[e + 2] = h.b
        }
        this.that.canvas.layer.ctx.putImageData(map, 0, 0)
    }, s.prototype.off = function (a) {
        this.currentImage = !1, this.imageData = !1
    }, s.prototype.restore = function (a) {
        this.currentImage = !1, this.imageData = !1
    };
    var t = function (a) {
        this.that = a, this.isOdd = !1, this.status = !1, this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1
    };
    t.prototype.load = function () {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function () {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, t.prototype.active = function (a) {
        this.currentImage || (this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()), this.that.mouse.active && this.imageLoaded && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage));
        for (var b = 500, c = 0; this.that.mouse.active && this.imageLoaded && (this.that.ditheringLayPixel(!1, !1, !1, "rendering"), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas), !(this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height)) && (this.that.mouse.x_0 != this.that.mouse.x_1 || this.that.mouse.y_0 != this.that.mouse.y_1) && (c++, !(c > b));) {
            this.that.mouseDistance()
        }
    }, t.prototype.off = function () {
        this.status = !1, this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1
    }, t.prototype.restore = function () {
        this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1
    };
    var u = function (a) {
        this.that = a, this.restore()
    };
    u.prototype.active = function (a) {
        this.that.mouse.active && this.that.StampController.showStampContainer()
    }, u.prototype.restore = function (a) {
        this.that.StampController.hideStampContainer()
    };
    var v = function (a) {
        this.that = a, this.that.selectImageData = !1, this.that.currentImage = !1, this.selectColor = "rgba(255,255,255,0.3)", this.selectColorPrimary = "rgba(0,0,0,0.3)"
    };
    v.prototype.active = function (a) {
        this.that.SelectController.currentImage || (this.that.SelectController.currentImage = this.that.canvas.layer.image(), this.that.currentImage = this.that.canvas.layer.image()), this.that.mouse.active
    };
    var w = function (a) {
        this.that = a, this.filled = [], this.used = [], this.clickedColor = !1, this.renderImageData = [], this.callStackLimit = 1e3, this.called = 0
    };
    w.prototype.active = function (a) {
        if (this.that.mouse.active) {
            for (var b = this.that.mouse.start_x, c = this.that.mouse.start_y, d = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height), e = 0; e < d.data.length; e += 4) {
                var f = ("000000" + this.that.rgbaToHex(d.data[e], d.data[e + 1], d.data[e + 2])).slice(-6);
                f = f + "" + d.data[e + 3], this.renderImageData.push(f)
            }
            this.clickedColor = this.that.mouse.getPixel(b, c, !0), this.that.clearPixel(!1, !1, !0), this.fill(b, c, !0), this.loopFill(), this.that.FrameController.updateFramePreview()
        }
        this.finish()
    }, w.prototype.fill = function (a, b) {
        var c = a,
            d = b,
            e = a + 1,
            f = b + 1,
            g = a - 1,
            h = b - 1;
        this.check(e, d), this.check(c, f), this.check(g, d), this.check(c, h)
    }, w.prototype.loopFill = function () {
        if (!(this.called >= this.callStackLimit)) {
            this.called++;
            var a = this.filled.slice(0);
            this.filled = [];
            for (var b = a.length - 1; b >= 0; b--) {
                var c = a[b];
                this.fill(c[0], c[1])
            }
            this.loopFill()
        }
    }, w.prototype.check = function (a, b) {
        var c = this.that.width,
            d = this.that.height;
        a = parseInt(a), b = parseInt(b);
        var e = c * b + a;
        a || (a = a.toString()), b || (b = b.toString()), a <= c - 1 && a >= 0 && b <= d - 1 && b >= 0 && this.renderImageData[e] == this.clickedColor && (this.that.clearPixel(a, b, 1), this.filled.push([a, b]), this.renderImageData[e] = this.that.ColorController.color)
    }, w.prototype.finish = function () {
        this.that.mouse.active = !1, this.filled = [], this.renderImageData = [], this.called = 0
    };
    var x = function (a) {
        this.that = a, this.currentImage = !1, this.imageLoaded = !1, this.initClick = !1, this.hasOptions = !0, this.size = !1, this.currentBrushImage = !1, this.init()
    };
    x.prototype.init = function () {
        this.that.settings.brush.image || this["new"](), this.listeners()
    }, x.prototype.listeners = function () {
        var b = this;
        a(document).on("click", ".br-image", function () {
            var c = a(this).find("img").attr("data-image");
            b.fromSrc(c), b.that.hidePopup()
        }), a("#brush-spacing").on("input", function () {
            b.that.settings.brush.spacing = a(this).val(), a(".brush-spacing-level").text(a(this).val())
        }), a("#brush-alpha").on("input", function () {
            b.that.settings.brush.alpha = a(this).val(), a(".brush-alpha-level").text(a(this).val())
        }), a("#brush-size").on("input", function () {
            a(".brush-size-level").text(a(this).val())
        }), a("#brush-size").on("change", function () {
            b.size = a(this).val(), b.changeSize()
        })
    }, x.prototype.changeSize = function () {
        if (this.currentBrushImage || (this.currentBrushImage = jQuery.extend(!0, {}, this.that.settings.brush)), this.currentBrushImage.width > this.currentBrushImage.height) var a = this.currentBrushImage.width / this.currentBrushImage.height;
        else var a = this.currentBrushImage.height / this.currentBrushImage.width;
        var b = a * this.size;
        b <= 0 && (b = 1), this.that.canvas.rendering.canvas.width = this.size, this.that.canvas.rendering.canvas.height = Math.abs(b), this.that.canvas.rendering.setSmoothing(), this.that.canvas.rendering.ctx.drawImage(this.currentBrushImage.image, 0, 0, this.size, b), this.fromSrc(this.that.canvas.rendering.dataURL(), !0)
    }, x.prototype.fromSrc = function (a, b) {
        var c = this,
            d = new Image,
            e = !b;
        d.onload = function () {
            c.set(this, e)
        }, d.src = a
    }, x.prototype["new"] = function (a) {
        this.fromSrc(this.that.ToolController.brushes[0]);
    }, x.prototype.set = function (a, b) {
        b && (this.currentBrushImage = !1), this.that.settings.brush.image = a, this.that.settings.brush.width = a.width, this.that.settings.brush.height = a.height, this.that.settings.brush.solid = this.that.canvasToSolid(this.that.settings.brush.image, !1, !1, !0), this.that.settings.brush.mouse = this.that.canvasToSolid(this.that.settings.brush.image, "#000000", .25, !0), this.that.ToolController.setBrushImage(), this.setOptions()
    }, x.prototype.load = function () {
        if (!this.imageLoaded) {
            var a = this;
            this.currentImage.onload = function () {
                a.imageLoaded = !0, a.currentImage = this
            }
        }
    }, x.prototype.getCurrent = function () {
        this.that.canvas.rendering["default"](), this.currentImage = this.that.canvas.layer.image(), this.load()
    }, x.prototype.active = function (a) {
        var b = 500,
            c = 0;
        if (this.currentImage || this.getCurrent(), this.that.settings.brush.track)
            for (!this.that.mouse.active || this.initClick || this.that.keyEvent || (this.initClick = !0); this.that.mouse.active && this.imageLoaded && (this.that.layPixel(!1, !1, !1, !1, "rendering", 1), !(this.that.mouse.x_0 > this.that.width || this.that.mouse.x_1 > this.that.width || this.that.mouse.y_1 > this.that.height || this.that.mouse.y_0 > this.that.height)) && (this.that.mouse.x_0 != this.that.mouse.x_1 || this.that.mouse.y_0 != this.that.mouse.y_1) && (c++, !(c > b));) {
                this.that.mouseDistance()
            } else this.that.mouse.active && (this.that.layPixel(!1, !1, !1, !1, "rendering", 1), this.initClick = !0);
        this.that.mouse.active && this.imageLoaded && (this.that.canvas.layer.clear(), this.that.canvas.layer.putSimple(this.currentImage), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas))
    }, x.prototype.colorPicker = function () {
        this.that.ColorController.color = "#" + this.that.mouse.getPixel(this.that.mouse.x1, this.that.mouse.y1), this.that.ColorController.select()
    }, x.prototype.on = function () {
        this.setOptions()
    }, x.prototype.setOptions = function () {
        a(".brush-size-level").text(this.that.settings.brush.width), a("#brush-size").val(this.that.settings.brush.width)
    }, x.prototype.off = function (a) {
        this.that.pixelPerfect.set = 0, this.that.pixelPerfect.direction = "", this.that.pixelPerfect.history = [], this.that.pixelPerfect.preHistory = [], this.initClick = !1, this.currentImage = !1, this.imageLoaded = !1, this.that.isApp && this.getCurrent()
    }, x.prototype.restore = function (a) {
        this.currentImage = !1, this.initClick = !1, this.imageLoaded = !1, this.currentBrushImage = !1
    };
    var y = function (a) {
        this.that = a, this.tools = {}, this.tool = !1, this.createHistory = !0, this.brushes = this.brushData()
    };
    y.prototype.init = function () {
        this.listeners(), this.tools.PencilTool = new f(this.that), this.tool = this.tools.PencilTool, this.loadCustomBrushes(), this.setIcon()
    }, y.prototype.listeners = function () {
        var b = this;
        a(".tool-selection").on("click", function () {
            var c = a(this).attr("data-type");
            b.selectTool(a(this), c)
        }), a(".set-brush").click(function () {
            b.that.SelectController.setBrush()
        }), a(".mirror-tool").click(function () {
            b.mirrorToggle(a(this))
        }), a(".close-extras").click(function () {
            b.hideExtras(a(this))
        }), a(".close-extras-tools").click(function () {
            b.hideToolsExtras(a(this))
        }), a(".show-app-tools").click(function () {
            b.toggleAppToolDraw()
        }), a(".tool-toggle").click(function () {
            b.toolToggle(a(this))
        }), a(".brush-canvas-wrapper").click(function () {
            b.that.showPopup("brushes", b.brushPopupHtml)
        }), a(".brush-canvas-wrapper").click(function () {
            b.that.showPopup("brushes", b.brushPopupHtml)
        }), a(document).on("mousedown", ".bru-d", function (c) {
            if (c.preventDefault(), 3 == c.which) {
                var d = a(this).attr("data-id");
                b.subBrushData(d)
            }
        })
    }, y.prototype.loadCustomBrushes = function () {
        a(".brush-settings-display").html(""), a.each(this.brushes, function (b, c) {
            var d = '<div class="col m2"><div data-id="' + b + '"  class="cs-k-w bru-d"><div class="cs-k-image br-image"><img class="pp" data-image="' + c + '" src="' + c + '"></div></div>';
            a(".brush-settings-display").append(d)
        }), this.brushPopupHtml = a(".brush-presets-wrapper").html()
    }, y.prototype.setBrushColor = function (a) {
        this.that.settings.brush.image && "Brush" == this.that.tool && (this.that.settings.brush.solid = this.that.canvasToSolid(this.that.settings.brush.image, a, !1, !0))
    }, y.prototype.setBrushImage = function () {
        a(".brush-canvas-wrapper img").attr("src", this.that.settings.brush.image.src)
    }, y.prototype.toolToggle = function (a) {
        var b = this.that.tool.toLowerCase(),
            c = this.that.settings[b][a.attr("data-set")];
        "undefined" != typeof c && (c ? this.that.settings[b][a.attr("data-set")] = !1 : this.that.settings[b][a.attr("data-set")] = !0)
    }, y.prototype.toggleAppToolDraw = function (b) {
        if (a(".mobile-header-tools").hasClass("active") || b) a(".mobile-header-tools").removeClass("active");
        else {
            a(".mobile-header-tools").addClass("active");
            var c = a(".show-app-tools").position().top - (a(".mobile-header-tools").height() + 36);
            a(".mobile-header-tools").css({
                top: c
            })
        }
    }, y.prototype.hideExtras = function (b) {
        this.that.settings.extras = !1, a(".options-panel").addClass("hidden"), a(".extras-toggle").prop("checked", !1).removeAttr("checked")
    }, y.prototype.hideToolsExtras = function (b) {
        a(".tool-extra").addClass("hidden")
    }, y.prototype.showExtras = function () {
        a(".options-panel").removeClass("hidden")
    }, y.prototype.selectTool = function (b, c, d) {
        a(".tool-selection").removeClass("active"), b.addClass("active"), this.restore(), this.hideButtons(), this.showButtons(c), this.that.tool = c, this.toggleMirrorWrapper(), this.hideISO(), this.activate(d), this.use(), this.showOptions(), this.setIcon(), "function" == typeof this.tool.on && this.tool.on()
    }, y.prototype.activate = function (b) {
        "Stamp" == this.that.tool && ("object" != typeof this.tools.StampTool && (this.tools.StampTool = new u(this.that), this.tools.StampTool.active()), this.tool = this.tools.StampTool), "Select" == this.that.tool && ("object" != typeof this.tools.SelectTool && (this.tools.SelectTool = new o(this.that), this.tools.SelectTool.active()), this.tool = this.tools.SelectTool), "Text" == this.that.tool && (this.that.TextController.loadCustom(), a(".dropdown-tool-container").addClass("active")), "Line" == this.that.tool && this.showISO()
    }, y.prototype.setIcon = function () {
        if (this.that.isApp) {
            a(".mobile-header-tools").removeClass("active");
            var b = this.that.tool.toLowerCase(),
                c = a("#" + b + "-tool").html();
            a(".current-tool").html(c)
        }
    }, y.prototype.use = function () {
        this.that.finished && (this.that.mouse.active && this.makeHistory(), "Pencil" == this.that.tool && ("object" != typeof this.tools.PencilTool && (this.tools.PencilTool = new f(this.that)), this.tool = this.tools.PencilTool), "Brush" == this.that.tool && ("object" != typeof this.tools.BrushTool && (this.tools.BrushTool = new x(this.that)), this.tool = this.tools.BrushTool), "Eraser" == this.that.tool && ("object" != typeof this.tools.EraserTool && (this.tools.EraserTool = new g(this.that)), this.tool = this.tools.EraserTool), "Line" == this.that.tool && ("object" != typeof this.tools.LineTool && (this.tools.LineTool = new h(this.that)), this.tool = this.tools.LineTool), "Square" == this.that.tool && ("object" != typeof this.tools.SquareTool && (this.tools.SquareTool = new i(this.that)), this.tool = this.tools.SquareTool), "Circle" == this.that.tool && ("object" != typeof this.tools.CircleTool && (this.tools.CircleTool = new p(this.that)), this.tool = this.tools.CircleTool), "Bucket" == this.that.tool && ("object" != typeof this.tools.BucketTool && (this.tools.BucketTool = new j(this.that)), this.tool = this.tools.BucketTool), "ColorPicker" == this.that.tool && ("object" != typeof this.tools.ColorPickerTool && (this.tools.ColorPickerTool = new m(this.that)), this.tool = this.tools.ColorPickerTool), "Move" == this.that.tool && ("object" != typeof this.tools.MoveTool && (this.tools.MoveTool = new n(this.that)), this.tool = this.tools.MoveTool), "Select" == this.that.tool && ("object" != typeof this.tools.SelectTool && (this.tools.SelectTool = new o(this.that)), this.tool = this.tools.SelectTool), "LightenDarken" == this.that.tool && ("object" != typeof this.tools.LightenDarkenTool && (this.tools.LightenDarkenTool = new q(this.that)), this.tool = this.tools.LightenDarkenTool), "BucketColor" == this.that.tool && ("object" != typeof this.tools.BucketColorTool && (this.tools.BucketColorTool = new k(this.that)), this.tool = this.tools.BucketColorTool), "Text" == this.that.tool && ("object" != typeof this.tools.TextTool && (this.tools.TextTool = new r(this.that)), this.tool = this.tools.TextTool), "Dithering" == this.that.tool && ("object" != typeof this.tools.DitheringTool && (this.tools.DitheringTool = new t(this.that)), this.tool = this.tools.DitheringTool), "Lasso" == this.that.tool && ("object" != typeof this.tools.LassoTool && (this.tools.LassoTool = new v(this.that)), this.tool = this.tools.LassoTool), "BucketClear" == this.that.tool && ("object" != typeof this.tools.BucketClearTool && (this.tools.BucketClearTool = new w(this.that)), this.tool = this.tools.BucketClearTool), this.tool.active())
    }, y.prototype.off = function () {
        "function" == typeof this.tool.off && this.tool.off(), this.turnOffButtons(), this.resetRainbowColor(), this.that.online.status && this.that.online.send && (this.that.OnlineController.writeLayer(), this.that.online.send = !1)
    }, y.prototype.turnOffButtons = function () {
        "Text" != this.that.tool && a(".dropdown-tool-container").removeClass("active")
    }, y.prototype["do"] = function (a, b) {
        this.tool[a](b)
    }, y.prototype.doHistory = function () {
        "function" == typeof this.tool.doHistory && this.tool.doHistory()
    }, y.prototype.restore = function () {
        "function" == typeof this.tool.restore && this.tool.restore(), this.turnOffButtons(), this.resetRainbowColor()
    }, y.prototype.shft = function (a) {
        "function" == typeof this.tool.shft && this.tool.shft(a)
    }, y.prototype.resetRainbowColor = function () {
        this.that.rainbow.color = !1
    }, y.prototype.showButtons = function (b) {
        a("." + b + "-tool-toggle").css("display", "inline-block")
    }, y.prototype.hideButtons = function () {
        "function" == typeof this.tool.hideButtons && this.tool.hideButtons()
    }, y.prototype.makeHistory = function (a, b) {
        ["ColorPicker", "Select", "Text"].indexOf(this.that.tool) === -1 || a || (this.that.mouse.createHistory = !1)
    }, y.prototype.history = function (a, b) {
        var c = a.data.currentLayer,
            d = a.data.frame;
        a.data.layer;
        0 == this.that.FrameController.selectByUnqid(d.unqid) && this.that.FrameController.newFromData(d), this.that.FrameController.frames[a.data.currentFrame].layers = [], this.that.FrameController.frames[a.data.currentFrame].layers = a.data.layers, this.that.FrameController.frames[a.data.currentFrame].selectedLayer = c, this.that.FrameController.select(a.data.currentFrame), this.that.LayerController.selectLayer(c), this.that.LayerController.updateList(), this.that.LayerController.select(), this.restore()
    }, y.prototype.showOptions = function () {
        var b = this;
        b.that.tool.toLowerCase();
        this.tool.hasOptions ? (a("#tool-options-title").text(this.that.tool), a(".extra-panel-content").show().removeClass("hidden"), a(".tool-sidebar-tab").hasClass("active") || a(".sidebar-tab-notification").addClass("active"), a(".check-tool").each(function () {
            var c = b.that.tool.toLowerCase(),
                d = a(this).attr("data-tool");
            a(this).hide(), c == d && a(this).show()
        })) : (a("#tool-options-title").text("No"), a(".extra-panel-content").hide(), a(".sidebar-tab-notification").removeClass("active"))
    }, y.prototype.toggleMirrorWrapper = function () {
        this.that.mirror.tools.indexOf(this.that.tool) !== -1 ? a(".mirror-effect-toggle").slideDown(250) : a(".mirror-effect-toggle").slideUp(250)
    }, y.prototype.showISO = function () {
        a(".iso-option").show()
    }, y.prototype.hideISO = function () {
        a(".iso-option").hide()
    }, y.prototype.mirrorToggle = function (b) {
        var c = b.attr("data-type"),
            d = this;
        this.that.mirror[c] ? this.that.mirror[c] = !1 : this.that.mirror[c] = !0, a(".mirror-tool").removeClass("active"), a(".mirror-tool").each(function () {
            var b = a(this).attr("data-type");
            d.that.mirror[b] && a(this).addClass("active")
        })
    }, y.prototype.brushData = function () {
        if (this.that.isApp) return [];
        var b = this,
            c = this.that.getStorage("pix_brush_data"),
            d = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAYAAACdKY9CAAAAfklEQVQoU41SwRGAMAhLF3ADd3MCh9ERHUQvnukFpJ78Cgkh0IY6ZgBHVWopOQQK5wSCGey8AVifd2iSFRxYDusEB58AWFOuq2QFdiXYRw6qmeBgkXbzc8sqJJsVghcRsll5eK252hI7TgCWP4fL41GZoZsED4NfEtPVWj+JF5wiFg47GqAYAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABP0lEQVQ4T6WTwUqFQBiFv+kJpILA1d0Iblq1u5sIhALfRDf6JLpy2S5C8AXqAS4tghZFXHIjCEWg0Ma18cvMZbKkIDc6858z//nPHBX/eNQC9+SH/Tfg1d63ye68ODvgW92QpWAeOV06+3qjAx6BI+BhqfM5IMALAURRhOd5TV3Xq6IoGl27mZNN16ljlmW+EAQk5DRN5fPKIu3ki+xpEcdxPI6j0/e9W5blpQYb6bLcAofArvvcsDMNErCfJAl5nk8qgHs9u3HcNZ3FjD096zSzSJZ313XrYRg2bds6VVXdKaUOgCepCVmM2geuzcxJkmyVUn4QBGsBhWG4SdPUAWrg1sxvX5XIiYEPQKQ2URStLNOegXc7C/OZT4EX647FJDFN3F4MiVFih+VYG2SH50volrL9p99lifxbzqfDPwEIFl1E73cCTwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAZCAYAAADAHFVeAAACfklEQVRIS7WWsWsiURDGJ2AhbCEXlGPTeCCshWnsXnUISpotUrjINbL29xdY2fpnaKorXicWprxCUmULY2FxhXAEgqCkUrvjW97Ic91133m5abJZdt9v5ptvZr2if4sbIno1PeLK9MGY5wBC/HeYDjKu7pLKGMTFfiaiwEShS2BVInojIkAQuGY5z1b5t7A0EBIAPLaPJjDO9o6IVkRUUJXgGgEJkQQH/38ibRqM+3MbAV0T0ZqIHhUICQAeeJ53J6XE/ZM4BzsHWii5vipoeLDneSSlfFEysuSH8YiD6W5jE+CFskpVB+HWTyK69X2fhsMhQAjunW6i1ygsztaQCLIhAGLwFyJ6EELct1qtzXQ6XUspV57nFaSUeAay6k6lJBhnxGYALFrRWghRKhaLueVy+W5Z1qbdbq87nQ4/y+bB37CIJBisG+c+wEtE9FSv18v5fB7VUTabfbZtezWZTEQQBBvNPEcrLQ4GEJrLDuNewX1h1kIIsd/vc47jhKBms0m9Xq+kQFAAttdbEs6dDosag184SOq67vVutyNUZNv2+2w22zQajcVoNCpvt9tPQRA8aXN31K8kGDvpyFW+7xcGg8FLrVa7z2QykIoA6na75Wq1CtAvIoIbjxyoDxtXFt3iPBs3vu9joGHrR9d1v43H4wXA6FG/3xeVSiU3n8+f1aEnDkyC8T7Tl2kIA0j1kRfwm+M43y3L+q0qQi8xbxwX7UY4kqU5gJRUMA6b5odmiMSPqcm60rNF1egJO5VnyeirnQTTpcQY8AbX9x16CXmNQHFDrfeTrxmsH6onEPdO7L20T4wOPDhU3TT+ocOHmMCMf9CklZgG+zAQEvkDxMbWNEsdOrEAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAAaUlEQVQoU62QwQ2AMAwDr1MgsQX7D8EWSGyBHDVVagR86C/1JXbSeH9rl4/EmvEbcAIDAKY/NWhKBZ48g8uGBdg7KUG1O4WckRLKJsXQq0MiRd3Bo3kdu/jSH0ebHSrsEYf2m0NOvJ38Av6bEiUJRyoZAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAALklEQVQYV2NkQABjBgaGsyAuI1QMJAATPAsSBHGcGBgYPkIVgAVBAEMlzFS4mQCIDAg5uYtuwAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAH0lEQVQYV2NkYGCQYmBgeMYAAShsRqggVgokOah0AgBbJAhwwO+YBAAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAWCAYAAAC7ZX7KAAAC5ElEQVRYR7WXrY4VQRCFa18ARUIwGHA4DFl4AjxIEDg0PAY4EhwC5D4ATwAEQzA4MBiCRaDJd9Pf5ty6PTPLZmkzM/1TferUqeqeo/q/7WZVfb3ILY7OYQwQtH8B8rCq3p5hr+Mx5+PS3DXAM3YEe2lieIlN+m81wGtOA/pCAGPodzALa9+acYFkBGRN0m4M8LO5zlkEvcWwzADu8wD7rKrejXcN00d7Pp4ZCdjKcW0JTmkxh/WsnUVwN38G+NWw9GQsxqAAcOBKVV2vqu9j3vvBMhvyTstI8C0Ynler6mnYxum7Y512talTp3JLwHTeawt/jW9CL4jcHMP3q+rnBDxsJRi+WQuoD8PxnEM/JL2oqi9DNkZwEbDhcaK61VNCZUIYZuQh88l2gqFfh7WNNGhIjfZ4OH67qn5U1esgUKlNJWEI1aSs4H1PoNSnDOUcQKpH30k68yET1whj5/IAfa2qHsjWkoZngGFInekIwNj8Thj8M1hCSjLHMJE7GZv3BGScvKDpdCa2EtxN6BrWuEmmpg1vMpoJBos4RDhphJTEkkHZZY5aNswkOQlsfxKaTvB+vAYYVjSWRjQMiyZjjrNOfcJcAlQuOECTEKPG0yr1ckSGb+Q4ZTiTrpeaZJnFHreEDGY/DXBZ9AWYciJJTTBxIIU3IbtZkh4w7OIEYtjdULbsfzTCSW2ltBnm1GlqMKsP8tIh7AhY8OBRglafnSRm53qvn3kp8YDQWCZKZ0bNJtOdBImy3++e5AeScKJFOo/dTIistSaFp15uzoZ5ImZ0spZjz0jJbo6f1uBeJfhOsG7eK4Oh7DW4Zzqb0+jvwDOC7pOkJMi9e8ra5SfvBhidhagnlYmZ8+2TxawICSYPnJ4zmyedXvck2WVqy2bDlxtmXyZXajrvvP22t3dYCGYmiRzbel8y2v8aZmVu6YLubc7L1J5+twBv/QqdZXztN+pc/3vn+afr1WQrEmvjW04frP0L3cTywnBXYBcAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAPCAYAAAAoAdW+AAAAm0lEQVQoU22PsQ3CQBAEx60gMkJKwBW4CKACIiqgAnDoiIgK7JwEiQIQASkUgda6tQ70n71Gs3tbUX4z4FkVmEANtP/QYA7sDBvgHobAClhmcw0YqG2CituGITAAV5uy9sA7DjwBH8GSdfQUWZs0SVarv8wOWARU12gZ3hJ4hKVpF5mvOERxvS2bgucc536ZB+AnLkNd67ixy/AL8qUktIH4kb4AAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAVCAYAAABLy77vAAABuklEQVQ4T52UTSuEURTHf/MVlIViobzsFKLIzp7dlJJSNpqyFD6Al1lJyYZYKLEQs5OUhSgfQIlYWFgo5Rvo/3TOdOaZ+0xya5qne8/53XP+95xT4m9rFHhsZVoqOCwDZ3YmiFYeFG2IoC7gIwFeAK4KzurmDnJICrYHrAdQKs1yjGgZOMndrL02YAVwwDEwm4s8AykKrVRaN8AOcGl2a8CPgRtYDuowMQUdMkcZfgHtwUNgRb0f9rJI86+mzSULfRPoBG6D4z3wBqyGDKZ1cR6kiE6BccC10L8cFfW8pfYaXlI6Vh2kmtBS7ehgAngyLXRjP9ANHJoEekl9D1j6TREJpqiugYsgquAzwKBdKPiYpZ69YKqypZPS00/PriXHbYvKdZaGI8BkEUiVPAz0mTZqDTlJF+0vGkl2PcCuhE9FJKcH4BPYMJhEVnVXgHM7U6pVk6IO8gaUPjLObgFqdvtdcFJRvgPfVhayrxVp5J0u8AvQm6ubLWAuToQUKDauvo8sFe8vaaMopuzlsnFTNI/8ZbwPleqBtU6DyG7YCtQwuAAfJ4rGy6JpHiXmWXJLhfkcmvrfoMLZ/QsgUGbf7uaiQAAAAABJRU5ErkJggg=="];
        if (c) {
            var e = JSON.parse(c);
            a.each(e, function (a, c) {
                var e = b.that.decodeImage(c);
                d.push(e)
            })
        }
        return d
    }, y.prototype.addBrushData = function (a) {
        var b = this.that.getStorage("pix_brush_data");
        if (b) var c = JSON.parse(b);
        else c = [];
        c.push(a), this.brushes.push(a), this.that.putStorage("pix_brush_data", JSON.stringify(c))
    }, y.prototype.subBrushData = function (a) {
        if (!(a <= 8)) {
            this.brushes.splice(a, 1);
            var b = this.brushes.slice(9);
            this.that.putStorage("pix_brush_data", JSON.stringify(b)), this.loadCustomBrushes()
        }
    };
    var z = function (b) {
        this.that = b, this.cookieName = "ad-002", this.adEl = a("#ad-popup-content")
    };
    z.prototype.init = function () {
        this.listeners(), this.set()
    }, z.prototype.listeners = function () {
        var b = this;
        a(".ad-close-set").click(function () {
            b.close()
        })
    }, z.prototype.set = function () {
        a("#ad-popup-content") && (this.that.readCookie(this.cookieName) ? this.removeAd() : this.adEl.removeClass("hidden"))
    }, z.prototype.close = function () {
        this.removeAd(), this.that.createCookie(this.cookieName, "true", 30)
    }, z.prototype.removeAd = function () {
        this.adEl.remove()
    };
    var A = function (a) {
        this.that = a, this.undo = [], this.redo = [], this.limit = 21, this.lastActionFrame = ""
    };
    A.prototype.init = function () {
        this.listeners()
    }, A.prototype.newCanvas = function () {
        this.create()
    }, A.prototype.add = function (a, b, c, d) {
        this.create()
    }, A.prototype.autoRedo = function (a) {
        this.redo.push(a), this.undo.pop()
    }, A.prototype.autoUndo = function (a, b) {
        var c = !1;
        a && (c = a), this.undo.push(b), c ? this.redo.splice(a, 1) : this.redo.pop()
    }, A.prototype.listeners = function () {
        var b = this;
        a(".undo").click(function (a) {
            a.preventDefault(), b.doUndo()
        }), a(".redo").click(function (a) {
            a.preventDefault(), b.doRedo()
        })
    }, A.prototype.doUndo = function () {
        if (this.undo.length >= 1) {
            this.that.ToolController.doHistory();
            var a = this.undo[this.undo.length - 2];
            this.initRedo(), this.call(a, "undo", !1)
        }
    }, A.prototype.doRedo = function () {
        var a = (this.redo[this.redo.length - 1], this.redo[this.redo.length - 2]);
        this.redo.length >= 1 && this.call(a, "redo", !1), this.redo.length <= 1 && (this.redo = [])
    }, A.prototype.initRedo = function (a, b) {
        if (0 == this.redo.length) {
            this.create(!0)
        }
    }, A.prototype.call = function (a, b, c) {
        if ("undefined" != typeof a) {
            var d = a + "";
            this.work(a), "undo" == b ? this.autoRedo(d) : c || this.autoUndo(!1, d)
        }
    }, A.prototype.move = function (a, b) {
        this.redo = this.redo.splice(b, 0, this.redo.splice(a, 1)[0])
    }, A.prototype.create = function (a, b) {
        var c = this.that.FrameController.currentFrame,
            d = this;
        this.that.startHistory(function (e) {
            var f = {
                frames: e,
                currentFrame: c
            };
            return f = JSON.stringify(f), a ? void d.redo.push(f) : (d.undo.push(f), d.redo = [], d.checkLimit(), b ? b(!0) : void 0)
        })
    }, A.prototype.checkLimit = function () {
        this.undo.length > this.limit && this.undo.shift()
    }, A.prototype.work = function (a) {
        a = JSON.parse(a), this.that.loading = !0;
        var b = this;
        this.that.loadHistoryData(a, function (c) {
            b.loadFrames(c, a.currentFrame)
        })
    }, A.prototype.loadFrames = function (a, b) {
        this.that.FrameController.frames = [], this.that.LayerController.layers = [], this.that.canvas.top["default"](), this.that.canvas.bottom["default"](), this.that.FrameController.frames = a, this.that.FrameController.select(b), this.that.FrameController.updateList();
        var c = this.that.FrameController.frame();
        this.that.updateDisplayCanvas(this.that.LayerController.layers, c.selectedLayer), this.that.render(), this.that.loading = !1, this.that.online.status && this.that.OnlineController.writeLayer(), this.that.updateImageStorage()
    };
    var B = function (b) {
        this.that = b, this.jElement = a("#" + b.element.id), this.active = !1, this.renderMouse = !0, this.start_x = !1, this.start_y = !1, this.x = 0, this.y = 0, this.x1 = 0, this.x2 = 0, this.x_0 = 0, this.x_1 = null, this.y_0 = 0, this.y_1 = null, this.last_x = 0, this.last_y = 0, this.lx = 0, this.lcx = 0, this.ly = 0, this.lcy = 0, this.last_abs_pos, this.dx = 0, this.dy = 0, this.sx = 0, this.sy = 0, this.err = null, this.createHistory = !1, this.closeHook = !1, this.appX = !1, this.appY = !1, this.app_x_last = !1, this.app_y_last = !1, this.app_use = !1, this.app_touch_index = 9, this.app_touch_active = !1, this.app_button_down = !1, this.removeTips = !1, this.doubleTapTimer = !1, this.doubleTapSet = 0, this.doubleTapActive = !1, this.pixelTrace = !!this.that.isApp && a(".pixel-trace"), this.mouseXEl = a(".mouse-x"), this.mouseYEl = a(".mouse-y")
    };
    B.prototype.desktopListeners = function (b) {
        var c = this;
        a(b).on("mousemove", function (a) {
            c.that.isMobile && !c.isTablet || c.move(a)
        }), a(b).on("mouseout", function (a) {
            c.that.isMobile && !c.isTablet || c.out(a)
        }), a(b).bind("mousedown", function (a) {
            c.that.isMobile && !c.isTablet || c.that.isApp || (c.createHistory = !0, c.down(a))
        }), a(document).on("mouseup", function (a) {
            c.that.isMobile && !c.isTablet || c.finish(a)
        })
    }, B.prototype.mobileListeners = function (b) {
        var c, d = this;
        a(b).bind("touchstart", function (a) {
            if (a.originalEvent.touches.length > 1);
            else {
                clearTimeout(c), a.preventDefault(), d.removeTips || d.doRemoveTips();
                var b = a.originalEvent.touches[0];
                d.createHistory = !0, d.setClickMobile(b), d.position(b), d.down(b), c = setTimeout(function () {
                    d.move(b)
                }, 1)
            }
        }), a(b).bind("touchmove", function (a) {
            a.preventDefault(), d.move(a.originalEvent.touches[0])
        }), a(b).bind("touchend", function (a) {
            a.preventDefault(), d.finish(a.originalEvent.touches[0])
        })
    }, B.prototype.doRemoveTips = function () {
        this.that.removeTips(), this.removeTips = !0
    }, B.prototype.appListeners = function (b) {
        var c = this,
            d = a(b),
            e = a(".mouse-down-function"),
            f = (a("#drawing-wrapper"), 0),
            g = document.getElementById("canvas-layers-appened");
        g.addEventListener("pinchout", function (a) {
            var b = a.gesture;
            b.scale > f && (f = b.scale, c.ZoomController["in"](!0))
        }), d.bind("touchstart", function (a) {
            c.that.ToolController.toggleAppToolDraw(!0), a.originalEvent.touches[1] ? c.app_touch_index = 1 : c.app_touch_index = 0;
            var b = a.originalEvent.touches[c.app_touch_index];
            c.that.app.fingerToDraw && (c.setClickMobile(b), c.position(b)), c.app_touch_active = !0, c.app_use = !0, c.down(b), c.that.app.fingerToDraw && (c.createHistory = !0, c.active = !0, c.move(b))
        }), d.bind("touchend", function (a) {
            var b = a.originalEvent.touches[c.app_touch_index];
            (c.doubleTapActive || c.that.app.fingerToDraw) && (c.doubleTapActive = !1, c.active = !1), c.app_button_down && (c.app_touch_index = 1), c.app_touch_active = !1, c.app_use = !1, c.finish(b)
        }), d.bind("doubletap", function (a) {
            c.createHistory = !0, c.doubleTap(!0)
        }), d.bind("touchmove", function (a) {
            for (var b = a.originalEvent.touches, d = a.originalEvent.touches[0], e = 0; e < a.originalEvent.touches.length; e++) "canvas_display" == b[e].target.id && (d = a.originalEvent.touches[e]);
            c.app_touch_active && (a.preventDefault(), c.move(d))
        }), e.bind("touchstart", function (b) {
            a(".mouse-down-function").addClass("set"), c.app_button_down = !0, c.createHistory = !0, c.active = !0, c.app_use = !0, c.down(b)
        }), e.bind("touchend", function (b) {
            c.app_button_down && (a(".mouse-down-function").removeClass("set"), c.app_button_down = !1, c.app_touch_index = 0, c.active = !1, c.finish())
        })
    }, B.prototype.listeners = function () {
        var b = this,
            c = "#canvas-layers-appened";
        this.that.isApp || (this.desktopListeners(c), this.mobileListeners(c)), this.that.isApp && this.appListeners(c), window.onbeforeunload = function () {
            if (b.closeHook && !b.that.isApp) return "Did you save your stuff?"
        }, a("#pixel-range-size").on("input", function () {
            b.changePixelSize(a(this))
        })
    }, B.prototype.doubleTap = function (a) {
        if (this.that.isApp) {
            var b = this;
            a || (this.doubleTapTimer = setTimeout(function () {
                b.doubleTapSet = 0
            }, 500)), this.doubleTapSet++, (this.doubleTapSet >= 2 || a) && (this.active = !0, this.doubleTapActive = !0, this.doubleTapSet = 0, clearTimeout(this.doubleTapTimer), this.doubleTapTimer = !1)
        }
    }, B.prototype.changePixelSize = function (b) {
        var c = parseInt(b.val());
        c > 16 && (c = 16), c < 1 && (c = 1), this.that.isOdd(c) && 1 !== c && (c += 1, a("#pixel-range-size").val(c)), this.that.pixelPerfect.status && c > 1 && (this.that.pixelPerfect.status = !1, a(".perfect-toggle").prop("checked", !1).removeAttr("checked")), a(".pixel-size-drawing").text(c), this.that.pixelDrawingSize = c
    }, B.prototype.mouseEnd = function () {
        this.that.HistoryController.create(), this.createHistory = !1, this.that.loading = !1
    }, B.prototype.setClickMobile = function (a) {
        var b = this.position(a, !0);
        this.x1 = b[0], this.y1 = b[1]
    }, B.prototype.move = function (a) {
        this.position(a), this.that.loading || this.checkPosition() && (this.lcx = this.x_1, this.lcy = this.y_1, this.init(), this.renderMouse = !0, this.render(a))
    }, B.prototype.checkPosition = function () {
        if (0 !== this.that.settings.brush.spacing && "Brush" == this.that.tool) {
            var a = parseInt(this.that.settings.brush.spacing);
            if (this.lcx - a < this.x_1 && this.x_1 < this.lcx + a && this.lcy - a < this.y_1 && this.y_1 < this.lcy + a && this.active && "Brush" == this.that.tool) return !1
        } else if (this.lcx == this.x_1 && this.lcy == this.y_1 && this.active && "Pencil" != this.that.tool) return !1;
        return !0
    }, B.prototype.out = function (a) {
        this.position(a), this.init(a), this.renderMouse = !1, this.render(a)
    }, B.prototype.appFinish = function () {
        this.appX = !1, this.appY = !1, this.setLastClicks()
    }, B.prototype.finish = function (a) {
        this.active && (this.that.FrameController.updateFramePreview(), this.that.loading = !0), this.setLastClicks(), this.that.isApp || (this.active = !1), this.that.LayerController.updateLayer(), this.that.ColorController.restoreSetColor(), this.that.ToolController.off(), this.that.ToolController.createHistory = !0, this.start_x = !1, this.start_y = !1, this.appX = !1, this.appY = !1, ["Line", "Square", "Circle"].indexOf(this.that.tool) === -1 || this.that.isApp || (this.x_0 = null, this.y_0 = null), this.that.isApp && (this.x_0 = this.x_1, this.y_0 = this.y_1), this.that.isApp || this.that.NavigationController.update(), this.createHistory ? this.mouseEnd() : this.that.loading = !1, this.that.mouseEnded()
    }, B.prototype.removeMobile = function () {
        this.that.isMobile && (a(".ui-tooltip").remove(), a("#left-sidebar").removeClass("active"), a("#right-sidebar").removeClass("active"))
    }, B.prototype.down = function (a) {
        var b = this.that.LayerController.currentLayer;
        if (this.that.online.status && this.that.LayerController.layers[b].name != this.that.online.layer_id) return void this.that.showAlert("You can only edit your layer while online drawing");
        if (this.that.online.send = !0, !this.that.loading) {
            switch (this.that.isApp || this.removeMobile(), a.which) {
                case 3:
                    this.that.ColorController.setColor(!0);
                    break;
                default:
                    this.that.ColorController.setColor()
            }
            this.that.isApp || (this.closeHook = !0), this.that.isApp || (this.active = !0), this.that.mouseEvent = a, this.setFirstClicks(), this.that.clickCount = !0, this.init(), this.render(a)
        }
    }, B.prototype.init = function () {
        this.that.render()
    }, B.prototype.setFirstClicks = function () {
        this.start_x = null != this.lx ? this.lx : this.x_1, this.start_y = null != this.ly ? this.ly : this.y_1
    }, B.prototype.setLastClicks = function () {
        this.active && (this.last_x = this.lx, this.last_y = this.ly, this.that.ZoomController.last_x = this.last_x, this.that.ZoomController.last_y = this.last_y), this.that.isApp && (this.app_x_last = this.lx, this.app_y_last = this.ly)
    }, B.prototype.setLastLocation = function () {
        this.lx = this.x_1, this.ly = this.y_1
    }, B.prototype.checkSamePosition = function (a) {}, B.prototype.exactPos = function () {
        return this.that.width * this.y_0 + this.x_0
    }, B.prototype.position = function (a, b) {
        if (this.that.finished) {
            var c = this.jElement.offset();
            "CSS" == this.that.zoom.type && this.that.zoom_step > 2 && (this.that.zoom_step = this.that.zoom_ratio + 1);
            var d = a.pageX - c.left,
                e = a.pageY - c.top,
                f = this.that.pixel_size;
            this.that.isApp && !this.that.app.fingerToDraw;
            var g = Math.floor(d / (f * this.that.zoom_step)),
                h = Math.floor(e / (f * this.that.zoom_step));
            this.appX || (this.appX = g, this.appY = h);
            var i = this.appX - g,
                j = this.appY - h;
            !this.that.isApp || this.that.isApp && this.that.app.fingerToDraw ? (this.x_1 = Math.floor(d / (f * this.that.zoom_step)), this.y_1 = Math.floor(e / (f * this.that.zoom_step))) : (this.x_1 = this.app_x_last - i, this.y_1 = this.app_y_last - j, this.x_1 <= 0 && (this.x_1 = 0), this.y_1 <= 0 && (this.y_1 = 0), this.x_1 >= this.that.width - 1 && (this.x_1 = this.that.width - 1), this.y_1 >= this.that.height - 1 && (this.y_1 = this.that.height - 1));
            var k = this.that.ZoomController.previousTranslate.length;
            if (k >= 1 && (this.x_1 += Math.floor(Math.abs(this.that.zoom.left / this.that.zoom.pixel_size)), this.y_1 += Math.floor(Math.abs(this.that.zoom.top / this.that.zoom.pixel_size))), b) return [this.x_1, this.y_1];
            this.x_0 = null == this.x1 ? this.x_1 : this.x1, this.y_0 = null == this.y1 ? this.y_1 : this.y1, ["Line", "Square", "Circle"].indexOf(this.that.tool) !== -1 && this.active && (this.x_0 = this.start_x, this.y_0 = this.start_y, "Line" == this.that.tool && this.that.settings.isoLines && this.doISOSetup()), "Line" != this.that.tool && (this.x_1 >= this.that.width && (this.x_1 = this.that.width), this.y_1 >= this.that.height && (this.y_1 = this.that.height), this.x_1 <= 0 && (this.x_1 = 0), this.y_1 <= 0 && (this.y_1 = 0));
            var l = this.x_1 >= this.that.width ? this.that.width - 1 : this.x_1,
                m = this.y_1 >= this.that.height ? this.that.height - 1 : this.y_1;
            return this.that.isWindowsIE || (this.mouseXEl.text(l + 1), this.mouseYEl.text(m + 1)), this.x0 = this.x_0, this.y0 = this.y_0, this.dx = Math.abs(this.x_1 - this.x_0), this.dy = Math.abs(this.y_1 - this.y_0), this.sx = this.x_0 < this.x_1 ? 1 : -1, this.sy = this.y_0 < this.y_1 ? 1 : -1, this.err = this.dx - this.dy, this.x1 = this.x_1, this.y1 = this.y_1, this.last_abs_pos = this.absPosition(), this.setLastLocation(), {
                x: this.x_1,
                y: this.y_1
            }
        }
    }, B.prototype.doISOSetup = function () {
        var a = Math.abs(this.start_x - this.x_1),
            b = Math.abs(this.start_y - this.y_1),
            c = a / b * 100;
        a > b && (c = b / a * 100);
        var d = 0;
        c > 25 && (d = .5 * b, a > b && (d = .5 * a)), c > 75 && (d = 1 * b, a > b && (d = 1 * a)), d = d < 0 ? 0 : d, d = Math.floor(d), a > b ? this.start_y < this.y_1 ? this.y_1 = this.start_y + d : this.y_1 = this.start_y - d : this.start_x < this.x_1 ? this.x_1 = this.start_x + d : this.x_1 = this.start_x - d
    }, B.prototype.absPosition = function (a, b) {
        return a = a ? a : this.x_0, b = b ? b : this.y_0, this.that.width * b + a + 1
    }, B.prototype.drawingPosition = function (a) {}, B.prototype.render = function (a, b, c) {
        var d = this.that.displayCanvasLocation(),
            e = d.pixelSize;
        if (a = c ? a : d.x, b = c ? b : d.y, this.that.isApp && this.pixelTrace && !this.that.app.fingerToDraw) {
            var f = this.that.pixel_size * (this.that.ZoomController.phase + 1),
                g = a * f,
                h = b * f,
                i = f - 1,
                j = f - 1;
            this.pixelTrace.css({
                left: g,
                top: h,
                height: j,
                width: i
            })
        }
        if (!(this.active && !this.that.isApp || !this.renderMouse && !this.that.isApp || this.that.isMobile && !this.that.isApp || this.that.isApp && this.that.app.fingerToDraw))
            if ("Brush" == this.that.tool && this.that.settings.brush.image) {
                var k = Math.floor(a - this.that.settings.brush.width / 2),
                    l = Math.floor(b - this.that.settings.brush.height / 2);
                this.that.canvas.display.putSimple(this.that.settings.brush.mouse, k, l)
            } else this.that.canvas.display.ctx.fillStyle = "rgba(255,255,255,0.3)", this.that.canvas.display.ctx.fillRect(a, b, e, e), this.that.canvas.display.ctx.fillStyle = "rgba(0,0,0,0.3)", this.that.canvas.display.ctx.fillRect(a, b, e, e)
    }, B.prototype.getPixel = function (a, b, c, d) {
        d = d ? d : "layer";
        var e = this.that.canvas[d].ctx.getImageData(a, b, 1, 1).data,
            f = ("000000" + this.that.rgbaToHex(e[0], e[1], e[2])).slice(-6);
        return c ? f + "" + e[3] : f
    };
    var C = function (a) {
        this.currentLayer = 0, this.that = a, this.frame = a.FrameController.frames[0], this.layers = this.frame.layers, this.beforeHistory = {}, this.layerFocus = !1, this.initLoaded = !1, this.opacityChanging = !1
    };
    C.prototype.init = function (a) {
        this.listeners(), this.addLayer(a), this.initLoaded = !0
    }, C.prototype.selectFrame = function (b) {
        if (this.frame = b, this.layers = this.frame.layers, this.currentLayer = this.frame.selectedLayer, "object" == typeof this.layers) {
            var c = [];
            a.each(this.layers, function (a, b) {
                c.push(b)
            }), this.layers = c
        }
        this.updateList(), this.select()
    }, C.prototype.cloneLayers = function (b, c, d) {
        var e = [],
            f = b ? b : this.that.FrameController.currentFrame,
            g = this.that.FrameController.frames[f];
        c = c ? c : g.layers;
        for (var h = c.length, i = 0; i < h; i++) {
            var j = a.extend(!0, [], c[i]);
            if (e.push(j), e.length == h) return d ? d(e) : e
        }
    }, C.prototype.cloneSingleLayer = function (b) {
        return a.extend(!0, {}, b)
    }, C.prototype.selectByUnqid = function (a) {
        for (var b = 0; b < this.layers.length; b++)
            if (l = this.layers[b], l.unqid == a) return !0
    }, C.prototype.addLayer = function (a, b, d, e) {
        var f = this.that.FrameController.currentFrame;
        e = e ? e : 1, a = a ? a : new c(this.layers.length, b), this.layers = this.that.FrameController.frames[f].layers, b && a.init(), d ? a.src = d : this.initLoaded && (a.src = this.blankLayer()), a.opacity = e;
        this.that.canvas.layer;
        this.layers.push(a), this.updateOpacityElement(a), this.updateList()
    }, C.prototype.newFromData = function (a) {
        this.layers.push(a), this.updateList()
    }, C.prototype.limitCheck = function () {
        return this.layers.length >= this.that.maxLayers && (alert("Max layers exceeded."), !0)
    }, C.prototype.promptAddlayer = function () {
        var b = "Layer " + this.layers.length;
        this.addLayer(!1, b);
        var c = this.currentLayer;
        this.currentLayer = this.layers.length - 1, a(".layer-list").removeClass("active"), a(".layer-" + this.currentLayer).parent().addClass("active");
        var d = this.that.canvas.layer;
        d.clear(), this.move(parseInt(this.layers.length) - 1, parseInt(c) + 1), this.makeHistory("Layer", "Add", "Undo")
    }, C.prototype.promptRenameLayer = function (a) {
        var b = this.layers[this.currentLayer],
            c = prompt("Layer name", b.name);
        c && (b.name = c, this.updateList(), this.makeHistory("Layer", "Rename", "Undo"))
    }, C.prototype.listeners = function () {
        var b = this;
        document.getElementById("layers-container") || (this.container = a('<div id="layer_container" class="panel"><div class="append-layers"></div><a href="#" id="add-layer">Add Layer</a></div>'), a(".drawing-wrapper").append(this.container)), a("#add-layer").click(function () {
            b.promptAddlayer()
        }), a("#rename-layer").click(function () {
            b.promptRenameLayer(a(this))
        }), a("#layer-focus").click(function () {
            this.layerFocus ? this.layerFocus = !1 : this.layerFocus = !0, b.select()
        }), a("#delete-layer").click(function () {
            b.deleteLayer(a(this))
        }), a("#opacity-layer").on("input", function () {
            b.opacityLayer(a(this))
        }), a("#duplicate-layer").click(function () {
            b.duplicate()
        }), a(document).on("click", ".download-layer", function (a) {
            a.preventDefault(), b.download()
        }), a(document).on("click", ".layer-outline", function (c) {
            c.preventDefault(), b.outlineLayer(a(this).attr("data-id"))
        }), a(document).on("mouseup", function (a) {
            b.opacityChanging && b.opacityLayerUpdate()
        }), a(document).on("click", ".download-all-layers", function (a) {
            a.preventDefault(), b.downloadAll()
        }), a(".move-layer").click(function () {
            "up" == a(this).attr("data-direction") ? b.move(b.currentLayer, parseInt(b.currentLayer) + 1) : b.move(b.currentLayer, parseInt(b.currentLayer) - 1), b.that.FrameController.frame().layers = b.layers, b.makeHistory("Layer", "Move", "Undo")
        }), a(document).on("click", ".layer-viewable", function () {
            b.layerVisability(a(this))
        }), a(document).on("click", ".layer-name", function () {
            b.select(a(this))
        }), a(document).on("click", ".merge", function () {
            b.margeLayer(a(this))
        })
    }, C.prototype.outlineLayer = function (a) {
        this.that.ToolController.restore(), this.that.render();
        var b = this.layers[a];
        this.that.canvas.rendering["default"](), this.that.canvas.rendering.putSimple(b.src);
        var c = this.that.canvas.rendering.ctx.getImageData(0, 0, this.that.width, this.that.height),
            d = 0,
            e = 0,
            f = [];
        this.that.ToolController.restore();
        for (var g = 0; g < c.data.length; g += 4) {
            var h = [c.data[g], c.data[g + 1], c.data[g + 2], c.data[g + 3]];
            if (d >= this.that.width && (d = 0, e++), 0 != h[3]) {
                var i = g + 7,
                    j = g - 1,
                    k = g - 4 * this.that.width + 3,
                    l = g + 4 * this.that.width + 3;
                0 == c.data[j] && this.that.layPixel(d - 1, e, !0, !1, !1, 1), 0 == c.data[i] && f.indexOf(i) == -1 && (f.push(i), this.that.layPixel(d + 1, e, !0, !1, !1, 1)), 0 == c.data[k] && this.that.layPixel(d, e - 1, !0, !1, !1, 1), 0 == c.data[l] && f.indexOf(l) == -1 && (f.push(l), this.that.layPixel(d, e + 1, !0, !1, !1, 1))
            }
            d++
        }
        this.updateLayer(), this.that.render(), this.that.FrameController.updateFramePreview(), this.that.OnlineController.writeLayer(), this.makeHistory("Layer", "Outline", "Undo")
    }, C.prototype.deleteLayer = function (a, b) {
        var c = this.layers[this.currentLayer];
        if (0 != c.id || b) {
            this.del(c.id);
            var d = 0 == this.currentLayer ? 0 : this.currentLayer - 1;
            this.currentLayer = d, this.selectLayer(d), this.updateList(), this.that.render(), this.makeHistory("Layer", "Delete", "Redo")
        }
    }, C.prototype.del = function (a) {
        var b = this.layers[a];
        "object" == typeof b && (this.frame.layers.splice(a, 1), this.layers = this.frame.layers)
    }, C.prototype.margeLayer = function (a) {
        this.that.loading = !0;
        var b = this,
            d = this.layers[this.currentLayer],
            e = !1,
            f = this.that.canvas.data,
            g = d.id;
        if (f.canvas.height = this.that.canvas.layer.canvas.height, f.canvas.width = this.that.canvas.layer.canvas.width, e = "down" == a.attr("data-direction") ? this.layers[parseInt(this.currentLayer) - 1] : this.layers[parseInt(this.currentLayer) + 1], "object" == typeof e) {
            f.clear(), "down" == a.attr("data-direction") ? (f.putImageData(e.src, e.opacity), f.putImageData(d.src, d.opacity), g = parseInt(this.currentLayer) - 1) : (f.putImageData(d.src, d.opacity), f.putImageData(e.src, e.opacity));
            var h = f.image();
            h.onload = function () {
                var a = new c(b.layers.length, d.name);
                a.src = this, b.currentLayer = g, b.del(e.id), b.del(g), b.layers.push(a), b.move(parseInt(b.layers.length) - 1, parseInt(b.currentLayer)), b.updateList(), b.select(), b.that.FrameController.frame().layers = b.layers, b.makeHistory("Layer", "Merge", "Undo"), b.that.loading = !1
            }
        }
    }, C.prototype.opacityLayer = function (b) {
        var c = this.layers[this.currentLayer];
        this.opacityChanging || (this.opacityChanging = c.opacity);
        var d = b.val();
        c.opacity = d, a("#opacity-layer-number").text(Math.floor(100 * c.opacity) + "%"), this.that.updateDisplayCanvas(this.layers, this.currentLayer), this.that.FrameController.updateFramePreview(), this.updateLayer(), this.that.render()
    }, C.prototype.opacityLayerUpdate = function () {
        var a = this.layers[this.currentLayer];
        this.opacityChanging && this.opacityChanging != a.opacity && this.makeHistory("Layer", "Layer Opacity", "Undo"), this.opacityChanging = !1, this.that.online.status && this.that.OnlineController.writeLayer()
    }, C.prototype.updateOpacityElement = function (b) {
        return "object" != typeof b ? (alert("There was an error. Please save your image before making any new changes. If the error continues, please contact support."), this.that.ExportImportController["export"]()) : (a("#opacity-layer").val(b.opacity), void a("#opacity-layer-number").text(Math.floor(100 * b.opacity) + "%"))
    }, C.prototype.layerActiveTemplate = function (a) {
        return this.currentLayer == a ? "active" : ""
    }, C.prototype.iconActive = function (a) {
        return a ? '<i class="fa fa-circle" aria-hidden="true"></i>' : '<i class="fa fa-circle-o" aria-hidden="true"></i>'
    }, C.prototype.template = function (a, b) {
        return '<div title="Layer Status" class="layer-list layer-' + a + " " + this.layerActiveTemplate(a) + '" data-id="' + a + '"><div class="layer-viewable" title="Visable" data-id="' + a + '">' + this.iconActive(b.active) + '</div><div class="layer-name layer-' + a + '" title="' + b.name + '" data-id="' + a + '">' + b.name + '</div><div class="layer-outline layer-' + a + '" title="Outline Layer" data-id="' + a + '"><i class="fa fa-square-o" aria-hidden="true"></i></div></div>'
    }, C.prototype.layerVisability = function (a) {
        var b = (a.parent().attr("data-id"), this.layers[a.parent().attr("data-id")]);
        b.active ? (b.active = !1, a.html('<i class="fa fa-circle-o" aria-hidden="true"></i>')) : (b.active = !0, a.html('<i class="fa fa-circle" aria-hidden="true"></i>')), this.that.updateDisplayCanvas(this.layers, this.currentLayer), this.that.FrameController.updateFramePreview(), this.that.render(), this.makeHistory("Layer", "Layer Visability", "Undo")
    }, C.prototype.layerVisabilitySwitch = function (b) {
        var c = [];
        a.each(b, function (a, b) {
            c.push(parseInt(b))
        }), a.each(this.layers, function (a, b) {
            c.indexOf(b.id) ? b.active = !0 : b.active = !1
        })
    }, C.prototype.select = function (b) {
        this.that.ToolController.restore(), b && (this.currentLayer = b.parent().attr("data-id")), this.selectLayer(this.currentLayer), a(".layer-list").removeClass("active"), a(".layer-" + this.currentLayer).addClass("active")
    }, C.prototype.selectLayer = function (a) {
        a = a ? a : this.currentLayer, this.that.isApp && (a = 0);
        var b = this.layers[a];
        this.currentLayer = a, this.frame.selectedLayer = this.currentLayer, this.updateOpacityElement(b), this.updateLayerCanvas(b.src), this.that.updateDisplayCanvas(this.layers, this.currentLayer), this.that.render()
    }, C.prototype.updateLayerCanvas = function (a) {
        var b = this.that.canvas.layer;
        b.clear(), b.putImageData(a)
    }, C.prototype.updateList = function () {
        var b = this,
            c = a("#layers-container");
        c.html(""), a.each(this.layers, function (a, d) {
            b.layers[a].id = a, c.prepend(b.template(a, d))
        }), this.that.updateDisplayCanvas(this.layers, this.currentLayer)
    }, C.prototype.render = function () {
        var a = this.that.canvas.layer.canvas,
            b = this.that.canvas.display,
            c = (this.that.canvas.display.canvas.width, this.that.canvas.display.canvas.height, this.layers[this.currentLayer]);
        if ("undefined" == typeof c || null == c) return void console.info("There is an error rendering the canvas " + this.currentLayer + ". Please save locally and reload page and re-open the .pixil file");
        var d = c.opacity;
        c.active && b.putImageData(a, d, this.that.zoom)
    }, C.prototype.blankLayer = function () {
        var a = this.that.canvas.rendering;
        a["default"]();
        var b = new Image;
        return b.src = a.canvas.toDataURL(), b
    }, C.prototype.updateLayer = function (a, b) {
        var c = this.layers[this.currentLayer],
            d = this.that.canvas.layer,
            e = new Image;
        return e.src = d.canvas.toDataURL(), "undefined" == typeof c || null == c ? (this.currentLayer = 0, this.updateList(), this.select(), void console.info("The app has ran into an error. Enable AutoSave or Save locally and re-open to save data.")) : a ? e : (c.src = e, b ? b(e) : void 0)
    }, C.prototype.move = function (a, b) {
        b >= this.layers.length || b < 0 || (this.layers.splice(b, 0, this.layers.splice(a, 1)[0]), this.currentLayer = b, this.updateList(), this.select())
    }, C.prototype.duplicate = function () {
        var a = this,
            b = this.layers[this.currentLayer];
        if (!this.limitCheck()) {
            var c = jQuery.extend(!0, {}, b);
            c.name = c.name + " Copy", c.src = c.src.src;
            var d = JSON.stringify(c),
                e = JSON.parse(d),
                f = new Image;
            f.src = e.src, f.onload = function () {
                e.src = this, a.layers.push(e), a.move(parseInt(a.layers.length) - 1, parseInt(b.id) + 1), a.updateList(), a.select(), a.that.FrameController.frame().layers = a.layers, a.makeHistory("Layer", "Add Duplicate", "Undo")
            }
        }
    }, C.prototype.makeHistory = function (a, b, c) {
        this.that.HistoryController.add("undo")
    }, C.prototype.flatten = function (a, b, c, d) {
        var e = b ? this.that.previewSize : 1;
        c && (e = c);
        var f = this.that.width * e,
            g = this.that.height * e;
        this.that.canvas.data.canvas.width = f, this.that.canvas.data.canvas.height = g, this.that.canvas.data.setSmoothing(), this.that.canvas.data.clear();
        for (var h = a.length, i = [], j = 0; j < h; j++) {
            var k = a[j],
                l = k.src;
            k.active || (l = this.that.canvas.data.image()), 1 != k.opacity && k.active && this.that.canvas.data.setAlpha(k.opacity), "string" != typeof l && "" != l && l || (l = this.that.canvas.layer.image());
            var m = l.width * e,
                n = l.height * e;
            if (this.that.canvas.data.ctx.drawImage(l, 0, 0, m, n), this.that.canvas.data.restoreAlpha(), i.push(k), i.length == h) {
                var o = this.that.canvas.data.dataURL();
                return this.that.isApp || this.that.canvas.data["default"](), d ? d(o) : o
            }
        }
    }, C.prototype.download = function (a) {
        a = a || this.currentLayer;
        var b = this.layers[a],
            c = this.that.width * this.that.downloadSizes.layer,
            d = this.that.height * this.that.downloadSizes.layer;
        this.that.canvas.rendering.clear(), this.that.canvas.rendering.canvas.width = c, this.that.canvas.rendering.canvas.height = d, this.that.canvas.rendering.ctx.mozImageSmoothingEnabled = !1, this.that.canvas.rendering.ctx.imageSmoothingEnabled = !1, this.that.canvas.rendering.ctx.drawImage(b.src, 0, 0, c, d), saveAs(this.that.canvas.rendering.dataURL(), "pixil-layer-" + b.name + ".png"), this.that.canvas.rendering["default"]()
    }, C.prototype.downloadAll = function () {
        for (var a = 0; a < this.layers.length; a++) this.download(a.toString())
    };
    var D = function (a) {
        this.currentFrame = 0, this.that = a, this.speeds = [50, 100, 250, 500, 1e3, 2500, 5e3], this.frames = [], this.template = function (a) {
            var b = this.frames[a],
                c = "";
            return a == this.currentFrame && (c = "active"), '<div class="frame-select frame-id-' + a + " " + c + '" data-id="' + a + '"><div class="id-image select-frame" data-id="' + a + '">' + this.getPreview(a) + '</div><div class="frame-controllers"><div class="buttons-container"><div class="speed-container"><select class="frame-speed select-back ttip" title="Frame Speed" data-id="' + a + '">' + this.speedOptions(b.speed) + '</select></div><!--<div class="frame-button frame-move ttip" title="Move Left" data-direction="left" data-id="' + a + '"><i class="fa fa-arrow-left" aria-hidden="true"></i></div><div class="frame-button frame-move ttip" title="Move Right" data-direction="right" data-id="' + a + '"><i class="fa fa-arrow-right" aria-hidden="true"></i></div><div class="frame-button frame-delete ttip" title="Remove Frame" data-id="' + a + '"><i class="fa fa-trash" aria-hidden="true"></i></div>--></div></div></div>'
        }
    };
    D.prototype.getPreview = function (a) {
        this.frames[a];
        return '<span class="frame-tag">' + (parseInt(a) + 1) + '</span><img src="' + this.frames[a].preview + '" class="preview-image-frame preview-img-' + a + '" alt="preview-image"/>'
    }, D.prototype.updateFrameCount = function () {
        this.frames.length > 1 ? a(".frames-counter-wrapper").show(0) : a(".frames-counter-wrapper").hide(), a(".frame-count").text(this.frames.length)
    }, D.prototype.updateCurrentFrame = function () {
        var b = parseInt(this.currentFrame) + 1;
        a(".current-frame").text(b)
    }, D.prototype.updateFramePreview = function (b, c) {
        b = b ? b : this.currentFrame;
        var d = this.frames[b],
            e = this;
        this.that.LayerController.updateLayer(!1, function (c) {
            c.onload = function () {
                "object" == typeof d && (d.preview = e.that.LayerController.flatten(d.layers, !0, 1), a(".preview-img-" + b).attr("src", d.preview), e.that.NavigationController.update(d.preview), e.that.setProgressImage(d.preview))
            }
        })
    }, D.prototype.speedOptions = function (a) {
        if (!a) var a = 100;
        for (var b = "", c = 0; c < this.speeds.length; c++) {
            var d = this.speeds[c];
            b += '<option value="' + d + '" ', d == a && (b += 'selected="selected" '), b += ">" + d + " ms</option>"
        }
        return b
    }, D.prototype.init = function () {
        this.listeners(), this["new"](!0)
    }, D.prototype.frame = function (a) {
        var a = a ? a : this.currentFrame;
        return this.frames[a]
    }, D.prototype.listeners = function () {
        var b = this;
        a(document).on("click", ".select-frame", function () {
            var c = a(this).attr("data-id");
            b.select(c)
        }), a(document).on("mousedown", ".add-frame", function () {
            b.add()
        }), a(document).on("mousedown", ".duplicate-frame", function () {
            var a = b.currentFrame;
            b.duplicate(parseInt(a))
        }), a(document).on("change", ".frame-speed", function () {
            var c = a(this).val(),
                d = a(this).attr("data-id");
            c > parseInt(5e3) && (c = 5e3), c < parseInt(10) && (c = 10), b.speed(d, parseInt(c))
        }), a(document).on("click", ".frame-delete", function () {
            var c = a(this).attr("data-id");
            c || (c = b.currentFrame), b["delete"](c)
        }), a(document).on("click", ".download-frame", function (a) {
            a.preventDefault(), b.download()
        }), a(document).on("click", ".download-all-frames", function (a) {
            a.preventDefault(), b.downloadAll()
        }), a(".all-frames-speed").change(function () {
            var c = a(this).val();
            b.updateAllSpeed(c)
        }), a(document).on("click", ".frame-move", function () {
            var c = a(this).attr("data-id");
            c || (c = b.currentFrame);
            var d = a(this).attr("data-direction"),
                e = parseInt(c) + 1;
            "left" == d && (e = parseInt(c) - 1), b.move(c, e)
        })
    }, D.prototype.select = function (b, c) {
        this.that.ToolController.restore();
        this.frames[b];
        this.currentFrame = b, a(".frame-select").removeClass("active"), a(".frame-id-" + b).addClass("active"), c || (this.that.setOnionSkin(), this.that.showOnionSkin(!0)), this.updateCurrentFrame(), this.that.LayerController.selectFrame(this.frame()), this.updateFramePreview()
    }, D.prototype["new"] = function (a, b, e, f, g) {
        this.frames.push(new d);
        var h = parseInt(this.currentFrame),
            i = this.frames.length - 1;
        if (this.currentFrame = i, !a || f) {
            var j = new c(0, "Background - Frame" + i, this.newCanvas());
            e && (j.src = e), j.init(), this.frame().layers.push(j), this.move(this.frames.length - 1, h + 1, !0), g ? this.select(0, !0) : this.select(h + 1, !0)
        }
        this.frame().init(this.that.width, this.that.height), b && (this.frame().speed = b), e && (this.frame().preview = e.src), this.updateList(), this.that.updateAppFrames(), a || this.that.LayerController.makeHistory("Layer", "Add Frame", "Undo")
    }, D.prototype.newFromData = function (a) {
        this.frames.push(a), this.updateList()
    }, D.prototype.newCanvas = function () {
        var a = new Image;
        return a.src = this.that.canvas.layer.empty, a
    }, D.prototype.updateList = function () {
        this.updateFrameCount(), a("#frames-appended").html("");
        var b = this;
        a.each(this.frames, function (c, d) {
            a("#frames-appended").append(b.template(c))
        })
    }, D.prototype.selectByUnqid = function (b) {
        var c = !1;
        return a.each(this.frames, function (a, d) {
            d.unqid == b && (c = !0)
        }), c
    }, D.prototype.duplicate = function (a) {
        a = a ? a : this.currentFrame;
        for (var b = this.frames[a], c = jQuery.extend(!0, {}, b), d = [], e = 0; e < b.layers.length; e++) {
            var f = jQuery.extend(!0, {}, b.layers[e]);
            d.push(f), d.length == b.layers.length && (c.layers = d, c.unqid = Math.random().toString(36).substring(7), this.frames.push(c), this.move(this.frames.length - 1, a + 1, !0), this.select(a + 1), this.that.setOnionSkin(), this.that.showOnionSkin(!0), this.that.LayerController.makeHistory("Layer", "Duplicate Frame", "Redo"))
        }
    }, D.prototype.speed = function (a, b) {
        var c = this.frames[a];
        c.speed = b, this.that.HistoryController.create()
    }, D.prototype.updateAllSpeed = function (b) {
        if ("" != b.trim() && " " != b && "n" != b) {
            for (var c = 0; c < this.frames.length; c++) {
                var d = this.frames[c];
                d.speed = b
            }
            a(".all-frames-speed").val("n"), this.updateList(), this.that.HistoryController.create()
        }
    }, D.prototype.move = function (a, b, c, d) {
        if (!(b >= this.frames.length || b < 0)) {
            var e = this.frames[this.currentFrame].unqid;
            c || this.that.LayerController.makeHistory("Layer", "Move Frame", "Undo"), this.frames.splice(b, 0, this.frames.splice(a, 1)[0]);
            for (var f = 0; f < this.frames.length; f++) {
                var g = this.frames[f];
                if (g.unqid == e) {
                    this.currentFrame = f;
                    break
                }
            }
            for (var f = 0; f < this.that.layers.length; f++) this.that.layers[f].frames.splice(b, 0, this.that.layers[f].frames.splice(a, 1)[0]);
            this.that.setOnionSkin(), this.that.showOnionSkin(!0), this.that.render(), this.updateList(), c || this.that.LayerController.makeHistory("Layer", "Move Frame", "Redo")
        }
    }, D.prototype["delete"] = function (b) {
        if (1 != this.frames.length) {
            this.that.LayerController.makeHistory("Layer", "Delete Frame", "Undo");
            this.frames[b];
            this.frames.splice(b, 1), a.each(this.that.layers, function (a, c) {
                c.frames.splice(b, 1)
            }), this.currentFrame == b ? (b = parseInt(b), this.currentFrame = b - 1 <= 0 ? 0 : b - 1) : this.currentFrame > b && (this.currentFrame = parseInt(this.currentFrame) - 1), this.select(this.currentFrame), this.updateList(), this.that.updateAppFrames(), this.that.setOnionSkin(), this.that.showOnionSkin(!0), this.that.LayerController.makeHistory("Layer", "Delete Frame", "Redo")
        }
    }, D.prototype.add = function (a) {
        if (this.that.isApp && this.frames.length > 9) return this.that.ons.notification.alert("Max frames reached.");
        var b = this.that.canvas.layer;
        b.clear();
        var a = !!a && a;
        this["new"](a)
    }, D.prototype.cloneFrames = function () {
        for (var a = [], b = this.frames.length, c = 0; c < b; c++) {
            var d = jQuery.extend(!0, {}, this.frames[c]);
            if (a.push(d), a.length == b) return a
        }
    }, D.prototype.cloneSingleFrame = function (a, b) {
        var c = a ? a : this.currentFrame,
            d = this.frames[c];
        "0" == a && (c = 0), c = c.toString();
        var e = jQuery.extend(!0, {}, d);
        this.that.LayerController.cloneLayers(c, !1, function (a) {
            return e.layers = a, b ? b(e) : e
        })
    }, D.prototype.makeHistory = function (a, b) {
        var c = this.cloneFrames(),
            d = {
                currentFrame: this.currentFrame,
                frames: c
            };
        this.that.HistoryController.add("undo", b, a, d)
    }, D.prototype.history = function (a, b) {
        this.currentFrame = a.data.currentFrame, this.frames = a.data.frames, this.select(this.currentFrame), his.updateList()
    }, D.prototype.flattenAll = function (a, b, c) {
        for (var d = this, e = [], f = this.frames.length - 1; f >= 0; f--) {
            var g = this.frames[f];
            g.data_id = f, g.active && this.that.LayerController.flatten(g.layers, a, b, function (a) {
                e.push({
                    src: a,
                    speed: g.speed,
                    data_id: g.data_id
                }), e.length == d.frames.length && d.that.arrangeImages(e, function (a) {
                    return c ? c(a) : e
                })
            })
        }
    }, D.prototype.download = function (a, b, c) {
        a = a || this.currentFrame;
        var d = this,
            e = this.frames[a];
        c = c ? c : this.that.downloadSizes.frame;
        var f = this.that.LayerController.flatten(e.layers, !0, c),
            g = "pixil-frame-" + a + ".png";
        b && (g = b), this.that.isApp && (d.that.ons.platform.isAndroid() && d.that.ons.permissions.hasPermission(d.that.ons.permissions.WRITE_EXTERNAL_STORAGE, function (a) {
            a.hasPermission || d.that.ons.permissions.requestPermission(d.that.ons.permissions.WRITE_EXTERNAL_STORAGE, function () {}, function () {})
        }), cordova.base64ToGallery(f, {
            prefix: "img_",
            mediaScanner: !0
        }, function (a) {
            d.that.ons.notification.toast("Download successful", {
                buttonLabel: "Dismiss",
                timeout: 1500
            })
        }, function (a) {
            d.that.ons.notification.toast("Error: " + a, {
                buttonLabel: "Dismiss",
                timeout: 5e3
            })
        }), this.that.canvas.data["default"]()), saveAs(f, g), this.that.canvas.rendering["default"]()
    }, D.prototype.downloadAll = function () {
        for (var a = 0; a < this.frames.length; a++) this.download(a.toString())
    };
    var E = function (a) {
        var b = ["000000", "ffffff", "f44336", "E91E63", "9C27B0", "808000", "00FF00", "008000", "00FFFF", "008080", "0000FF", "000080", "FF00FF", "800080", "C0C0C0", "808080"],
            c = ["000000", "ffffff", "f44336", "E91E63", "9C27B0", "673AB7", "3F51B5", "2196F3", "03A9F4", "00BCD4", "009688", "4CAF50", "8BC34A", "CDDC39", "FFEB3B", "FFC107", "FF9800", "FF5722", "795548", "9E9E9E", "607D8B"],
            d = ["ffe0bd", "ffcd94", "eac086", "ffad60", "ffe39f", "8d5524", "c68642", "e0ac69", "f1c27d", "ffdbac"],
            e = ["d11141", "00b159", "00aedb", "f37735", "ffc425"],
            f = ["ee4035", "f37736", "fdf498", "7bc043", "0392cf"];
        this.that = a, this.currentSelection = "default colors", this.colorArray = [], this.color = "#000000", this.colorReverse = !1, this.secondary = "#ffffff", this.mobileColorsAll = ["ffebee", "ffcdd2", "ef9a9a", "e57373", "ef5350", "f44336", "e53935", "d32f2f", "c62828", "b71c1c", "ff8a80", "ff5252", "ff1744", "d50000", "fce4ec", "f8bbd0", "f48fb1", "f06292", "ec407a", "e91e63", "d81b60", "c2185b", "ad1457", "880e4f", "ff80ab", "ff4081", "f50057", "c51162", "f3e5f5", "e1bee7", "ce93d8", "ba68c8", "ab47bc", "9c27b0", "8e24aa", "7b1fa2", "6a1b9a", "4a148c", "ea80fc", "e040fb", "d500f9", "aa00ff", "ede7f6", "d1c4e9", "b39ddb", "9575cd", "7e57c2", "673ab7", "5e35b1", "512da8", "4527a0", "311b92", "b388ff", "7c4dff", "651fff", "6200ea", "e8eaf6", "c5cae9", "9fa8da", "7986cb", "5c6bc0", "3f51b5", "3949ab", "303f9f", "283593", "1a237e", "8c9eff", "536dfe", "3d5afe", "304ffe", "e3f2fd", "bbdefb", "90caf9", "64b5f6", "42a5f5", "2196f3", "1e88e5", "1976d2", "1565c0", "0d47a1", "82b1ff", "448aff", "2979ff", "2962ff", "e1f5fe", "b3e5fc", "81d4fa", "4fc3f7", "29b6f6", "03a9f4", "039be5", "0288d1", "0277bd", "01579b", "80d8ff", "40c4ff", "00b0ff", "0091ea", "e0f7fa", "b2ebf2", "80deea", "4dd0e1", "26c6da", "00bcd4", "00acc1", "0097a7", "00838f", "006064", "84ffff", "18ffff", "00e5ff", "00b8d4", "e0f2f1", "b2dfdb", "80cbc4", "4db6ac", "26a69a", "009688", "00897b", "00796b", "00695c", "004d40", "a7ffeb", "64ffda", "1de9b6", "00bfa5", "e8f5e9", "c8e6c9", "a5d6a7", "81c784", "66bb6a", "4caf50", "43a047", "388e3c", "2e7d32", "1b5e20", "b9f6ca", "69f0ae", "00e676", "00c853", "f1f8e9", "dcedc8", "c5e1a5", "aed581", "9ccc65", "8bc34a", "7cb342", "689f38", "558b2f", "33691e", "ccff90", "b2ff59", "76ff03", "64dd17", "f9fbe7", "f0f4c3", "e6ee9c", "dce775", "d4e157", "cddc39", "c0ca33", "afb42b", "9e9d24", "827717", "f4ff81", "eeff41", "c6ff00", "aeea00", "fffde7", "fff9c4", "fff59d", "fff176", "ffee58", "ffeb3b", "fdd835", "fbc02d", "f9a825", "f57f17", "ffff8d", "ffff00", "ffea00", "ffd600", "fff8e1", "ffecb3", "ffe082", "ffd54f", "ffca28", "ffc107", "ffb300", "ffa000", "ff8f00", "ff6f00", "ffe57f", "ffd740", "ffc400", "ffab00", "fff3e0", "ffe0b2", "ffcc80", "ffb74d", "ffa726", "ff9800", "fb8c00", "f57c00", "ef6c00", "e65100", "ffd180", "ffab40", "ff9100", "ff6d00", "fbe9e7", "ffccbc", "ffab91", "ff8a65", "ff7043", "ff5722", "f4511e", "e64a19", "d84315", "bf360c", "ff9e80", "ff6e40", "ff3d00", "dd2c00", "efebe9", "d7ccc8", "bcaaa4", "a1887f", "8d6e63", "795548", "6d4c41", "5d4037", "4e342e", "3e2723", "fafafa", "f5f5f5", "eeeeee", "e0e0e0", "bdbdbd", "9e9e9e", "757575", "616161", "424242", "212121", "eceff1", "cfd8dc", "b0bec5", "90a4ae", "78909c", "607d8b", "546e7a", "455a64", "37474f", "263238"], this.importNameCount = 1;
        var g = c.concat(this.mobileColorsAll);
        this.colorPresets = {
            "default colors": g,
            common: b,
            "skin tones": d,
            "metro ui": e,
            "rainbow dash": f
        }
    };
    E.prototype.setAppColorButton = function () {
        !this.that.isApp
    }, E.prototype["switch"] = function () {
        var a = this.color,
            b = this.secondary;
        this.secondary = a, this.color = b, this.setToolColors()
    }, E.prototype.init = function () {
        this.initColors(), this.color = "#000000", this.elementSelect(a(".color-000000")), this.listeners(), this.updateOptions(), this.setToolColors(), this.importColorPallet(), this.that.isMobile && this.mobileColors()
    }, E.prototype.initColors = function () {
        this.load(this.colorPresets[this.currentSelection], !0)
    }, E.prototype.setColor = function (a) {
        var b = this.color,
            c = this.secondary;
        a && !this.colorReverse && (this.secondary = b, this.color = c, this.colorReverse = !0)
    }, E.prototype.restoreSetColor = function () {
        var a = this.color,
            b = this.secondary;
        this.colorReverse && (this.secondary = a, this.color = b, this.colorReverse = !1)
    }, E.prototype.load = function (b, c) {
        c = c || !1, b = b ? b : this.colorPresets[this.currentSelection];
        var d = this;
        this.colorArray = [], this.that.isMobile || this.that.isApp || a(".color-container").html(""), a.each(b, function (b, e) {
            d["new"](e, c), a(".color-container").append(d.template(e))
        })
    }, E.prototype.setToolColors = function () {
        a("#primary-color").css({
            backgroundColor: this.color
        }), a("#secondary-color").css({
            backgroundColor: this.secondary
        })
    }, E.prototype.listeners = function () {
        var b, c = this;
        a("#add-color").click(function () {
            b = a(this)
        }), this.that.isApp || a("#add-color, #primary-color, #secondary-color").ColorPicker({
            color: c.color,
            onBeforeShow: function () {
                a(this).ColorPickerSetColor(c.color)
            },
            onSubmit: function (b, d, e, f) {
                c["new"](d, a(f)), a(f).ColorPickerHide()
            }
        }), a(".color-switchable").click(function () {
            c["switch"]()
        }), a(".color-popup").click(function () {
            c.that.showPopup("colors", a("#colors-popup").html())
        }), a(".color-presets").change(function () {
            c.updateColors(a(this).val())
        }), a(".new-preset-color").click(function () {
            c.newPreset()
        }), a(".import-colors").click(function () {
            c["import"]()
        }), a(".export-colors").click(function () {
            c["export"]()
        }), a(".get-layer-colors").click(function () {
            c.getColorsFromCanvas()
        }), a(document).on("change", ".color-option-shown", function () {
            var b = a(this).val();
            b = b.replace("/#(S*)/g", "", b), c.select(b), c.color = b
        }), a(document).on("click", ".color-select", function (b) {
            var d = a(this).attr("data-color");
            c.select(d)
        }), a(document).on("mousedown", ".color-select", function (b) {
            switch (event.which) {
                case 3:
                    c.removeColor(a(this))
            }
        })
    }, E.prototype.newPreset = function (a) {
        var b = a ? a : prompt("Preset Name", "");
        null != b && (b = b.trim(), this.colorPresets[b] = [], this.currentSelection = b, this.updateOptions(), this.updateColors(b))
    }, E.prototype.check = function (a) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test("#" + a)
    }, E.prototype["import"] = function () {
        var a = prompt("Paste valid color data here", ""),
            b = !0;
        if (null != a) {
            try {
                var c = JSON.parse(a)
            } catch (d) {
                b = !1, console.info("Not valid data.")
            }
            if (b && "object" == typeof c) {
                for (var e = [], f = 0; f < c.length; f++) {
                    var g = c[f];
                    this.check(g) && e.push(g)
                }
                var h = "custom-" + this.importNameCount;
                this.colorPresets[h] = e, this.updateOptions(), this.updateColors(h), this.importNameCount++
            }
        }
    }, E.prototype["export"] = function () {
        var a = JSON.stringify(this.colorPresets[this.currentSelection]);
        a = a.replace(/,/g, ", ");
        prompt("Copy and Save this to use later.", a)
    }, E.prototype.updateColors = function (b) {
        "object" == typeof this.colorPresets[b] && (a(".color-presets").val(b), a(".color-container").html(""), this.currentSelection = b, this.load())
    }, E.prototype.showExtras = function () {
        a(".extras-color").removeClass("soft-hidden")
    }, E.prototype.hideExtras = function () {
        a(".extras-color").addClass("soft-hidden")
    }, E.prototype.updateOptions = function () {
        var b = this,
            c = "";
        a(".color-presets").html(""), a.each(this.colorPresets, function (a, d) {
            c = c + '<option value="' + a + '"', a == b.currentSelection && (c += ' selected="selected"'), c = c + ">" + a + "</option>"
        }), a(".color-presets").append(c)
    }, E.prototype.template = function (a) {
        return '<div class="color color-select ttip color-' + a + " col-" + a + '" data-color="' + a + '" title="' + a + '"><div class="color-block" style="background-color:#' + a + '"></div></div>'
    }, E.prototype.mobileColors = function () {
        var b = this;
        a.each(this.mobileColorsAll, function (c, d) {
            a(".mobile-color-container").append(b.template(d))
        })
    }, E.prototype["new"] = function (b, c) {
        var d = "primary";
        if (c) try {
            d = c.attr("data-type")
        } catch (e) {}
        if (this.check(b)) {
            if (this.colorPresets[this.currentSelection].indexOf(b) === -1) return this.colorPresets[this.currentSelection].push(b), a(".color-container").append(this.template(b)), void this.select(b, d);
            this.select(b, d), "primary" == d ? this.color == "#" + b && this.select(b, d) : this.secondary == "#" + b && this.select(b, d)
        }
    }, E.prototype.importColorPallet = function () {
        var b = a("#color-import").text(),
            c = b.split(",");
        if (c.length >= 1) {
            for (var d = [], e = 0; e < c.length; e++) {
                var f = c[e];
                this.check(f) && d.push(f)
            }
            if (d.length >= 1) {
                var g = "custom-" + this.importNameCount;
                this.colorPresets[g] = d, this.updateOptions(), this.updateColors(g), a(".color-presets").val(g)
            }
        }
    }, E.prototype.getColorsFromCanvas = function () {
        var a = [],
            b = this.that.LayerController.layers,
            c = this.that.LayerController.flatten(b),
            d = new Image,
            e = this;
        d.onload = function () {
            e.that.canvas.data.putSimple(this);
            for (var b = e.that.canvas.data.ctx.getImageData(0, 0, e.that.width, e.that.height), c = 0; c < b.data.length; c += 4) {
                var d = ("000000" + e.that.rgbaToHex(b.data[c], b.data[c + 1], b.data[c + 2])).slice(-6);
                a.indexOf(d) == -1 && (a.push(d), e["new"](d))
            }
        }, d.src = c
    }, E.prototype.elementSelect = function (b, c) {
        var d = b.attr("data-color");
        a(".color-" + d).length >= 1 && (!c || c && "primary" == c ? this.color = "#" + d : this.secondary = "#" + d, a(".color-select").removeClass("active"), b.addClass("active"), this.setToolColors(), this.end())
    }, E.prototype.end = function () {
        this.that.finished && this.that.ToolController.setBrushColor()
    }, E.prototype.removeColor = function (b) {
        var c = b.attr("data-color");
        if (a(".color-" + c).length >= 1) {
            var d = this.colorPresets[this.currentSelection].indexOf(c);
            d > -1 && (this.colorPresets[this.currentSelection].splice(d, 1), this.updateColors(this.currentSelection))
        }
    }, E.prototype.select = function (b, c) {
        b = b ? b : this.color, this.colorPresets[this.currentSelection].indexOf(b) === -1 && this["new"](b), this.elementSelect(a(".color-" + b), c), this.setAppColorButton()
    };
    var F = function (b, c, d) {
        this.that = b, this.canvas = c, this.zoomPosition = 1, this.type = d, this.last_x = !1, this.last_y = !1, this.reset(), this.canvas = a("#canvas_display"), "CSS" == this.type && (this.canvas = a("#canvas-layers-container"), a("#canvas-layers-appened").addClass("css"))
    };
    F.prototype.reset = function (a) {
        this.zoom = 1, this.previous = 1, this.previousTranslate = [], this.phase = 0, this.zoom_count = 1, this.limit = 5, "CSS" != this.type && (this.limit = 4), (this.that.width > 200 || this.that.height > 200) && (this.limit = 8, "CSS" != this.type && (this.limit = 6)), (this.that.width > 400 || this.that.height > 400) && (this.limit = 14, "CSS" != this.type && (this.limit = 8)), this.out = !1, a && this.use()
    }, F.prototype.init = function (b) {
        var c = this,
            d = a("#canvas-layers-container");
        this.that.isApp || d.bind("wheel mousewheel", function (a) {
            c.that.isMobile || c.that.settings.disableScrollZoom || (a.preventDefault(), a.originalEvent.wheelDelta > 0 || a.originalEvent.deltaY < 0 ? c["in"](!1, a) : c.minus(!1, a))
        }), a(".zoom-in-btn").click(function (a) {
            c["in"](!0)
        }), a(".zoom-out-btn").click(function (a) {
            c.minus(!0)
        }), this.align()
    }, F.prototype["in"] = function (a, b) {
        if (this.zoom = 2, this.phase++, this.zoom_count *= 2, this.phase > this.limit) return this.phase = this.limit, this.zoom_count /= 2, void(this.zoom = 1);
        var c = !1,
            d = !1;
        a && (c = this.that.mouse.last_x, d = this.that.mouse.last_y, this.that.isApp && (c = this.that.mouse.app_x_last, d = this.that.mouse.app_y_last)), this.render(c, d, b), this.that.zoom_ratio = this.phase, this.that.zoom_step = this.zoom_count, this.that.isApp && this.that.mouse.render()
    }, F.prototype.minus = function (a, b) {
        if (this.that.NavigationController.updatePlacement(), this.zoom = .5, this.phase--, this.zoom_count /= 2, this.zoomPosition--, this.phase <= 0 && (this.last_x = !1, this.last_y = !1), this.phase < 0) return this.phase = 0, this.zoom_count = 1, this.zoom = 1, void("CSS" == this.that.zoom.type && this.align());
        var c = !1,
            d = !1;
        this.out = !0, a && (c = this.that.mouse.last_x, d = this.that.mouse.last_y, this.that.isApp && (c = this.that.mouse.app_x_last, d = this.that.mouse.app_y_last)), this.render(c, d, b), this.that.zoom_ratio = this.phase, this.that.zoom_step = this.zoom_count, this.that.isApp && this.that.mouse.render()
    }, F.prototype.render = function (a, b, c) {
        var d = a ? a : this.that.mouse.x_0,
            e = b ? b : this.that.mouse.y_0;
        this.used = !0, this.use(d, e, c), this.that.render(), this.that.NavigationController.placement()
    }, F.prototype.align = function (b, c, d, e) {
        if ("CSS" == this.that.zoom.type) {
            if (d = d ? d : a("#drawing-canvas-conatiner").width(), e = e ? e : a("#drawing-canvas-conatiner").height(), b || (b = this.canvas.width()), c || (c = this.canvas.height()), this.canvas.css({
                    left: 0,
                    top: 0
                }), b < d) {
                var f = d / 2 - b / 2;
                this.canvas.css({
                    left: f
                })
            }
            if (c < e) {
                var g = e / 2 - c / 2;
                this.canvas.css({
                    top: g
                })
            }
        }
    }, F.prototype.position = function (b, c) {
        b = b ? b : this.that.mouse.x_0, c = c ? c : this.that.mouse.y_0, this.last_x = b, this.last_y = c;
        var d = b * this.that.pixel_size * (this.phase + 1),
            e = c * this.that.pixel_size * (this.phase + 1);
        d -= a("#drawing-canvas-conatiner").width() / 2, e -= a("#drawing-canvas-conatiner").height() / 2, a("#drawing-canvas-conatiner").scrollLeft(d), a("#drawing-canvas-conatiner").scrollTop(e)
    }, F.prototype.zoomUse = function (a, b, c) {
        var d = (this.canvas.width(), this.canvas.height(), this.that.width * this.that.pixel_size * (this.phase + 1)),
            e = this.that.height * this.that.pixel_size * (this.phase + 1);
        this.canvas.width(d).height(e), this.align(d, e), this.position(a, b), this.out = !1, this.that.mouse.render()
    }, F.prototype.use = function (b, c, d) {
        if ("CSS" == this.that.zoom.type) return this.zoomUse(b, c, d);
        var e = a("#canvas_display").width(),
            f = a("#canvas_display").height();
        a("#display-container").height(), a("#display-container").width();
        if (b = b ? b : this.that.mouse.x_0, c = c ? c : this.that.mouse.y_0, this.out) {
            if (this.previousTranslate.length >= 2) {
                var g = this.previousTranslate[this.previousTranslate.length - 2];
                this.that.zoom = g
            } else this.that.zoom.left = 0, this.that.zoom.top = 0, this.that.zoom.ratio = 1;
            this.previousTranslate.pop()
        } else {
            var h = this.that.pixel_size * this.zoom_count,
                i = -b * h,
                j = -c * h,
                k = {},
                l = i + e / 2,
                m = j + f / 2;
            l /= h, l = Math.floor(l), l *= h, m /= h, m = Math.floor(m), m *= h;
            var n = e * this.zoom_count,
                o = f * this.zoom_count;
            l > 0 && (l = 0), m > 0 && (m = 0), n = -(n / this.zoom_count / h - this.that.width), o = -(o / this.zoom_count / h - this.that.height), l / h < -n && (l = -(n * h)), m / h < -o && (m = -(o * h)), k.offSetLeft = (Math.abs(l / h % 1) - 1) * h, k.offSetTop = (Math.abs(m / h % 1) - 1) * h, Math.abs(k.offSetLeft) == h && (k.offSetLeft = 0), Math.abs(k.offSetTop) == h && (k.offSetTop = 0), k.left = l, k.top = m, k.x = b, k.y = c, k.ratio = this.zoom_count, k.pixel_size = this.that.pixel_size * this.zoom_count, this.previousTranslate.push(k), this.that.zoom = k
        }
        this.out = !1, this.that.mouse.render()
    }, F.prototype.zoomOut = function (a) {
        var b = this.previousTranslate[this.previousTranslate.length - 1];
        this.canvas.ctx.scale(.5, .5), this.canvas.ctx.translate(Math.abs(b.left), Math.abs(b.top)), a && this.previousTranslate.pop()
    };
    var G = function (a) {
        this.that = a, this.active = !1, this.loopTimer, this.imagePosition = 0, this.downloadActive = !1, this.downloadButtonText = "", this.downloadButtonLoadingtext = 'Loading.. <span class="loading-percent-preview-gif"></span>'
    };
    G.prototype.init = function () {
        this.listeners(), this.close(), this.downloadButtonText = a("#download-preview").html()
    }, G.prototype.reset = function () {
        this.that.previewSize = this.that.pixel_size, a("#preview-size-change").val("default")
    }, G.prototype.listeners = function () {
        var b = this;
        a(".close-preview-button, .popup-close-button, .close-btn").click(function () {
            b.close()
        }), a(document).on("click", "#preview", function () {
            b.previewFrames()
        }), a(document).on("click", ".download-preview", function (c) {
            c.preventDefault(), b.download(a(this))
        }), a(".preview-select").change(function () {
            var c = a(this).val(),
                d = "default" == a(this).val() ? b.that.pixel_size : parseInt(a(this).val());
            a(".preview-select").val(c), b.that.previewSize = d
        }), a(document).keydown(function (a) {
            27 == a.keyCode && b.close()
        })
    }, G.prototype.previewFrames = function () {
        var a = this;
        this.show(), this.that.FrameController.flattenAll(!0, !1, function (b) {
            b.length >= 1 && a.loop(b)
        })
    }, G.prototype.close = function () {
        this.that.finished && (this.active = !1, clearTimeout(this.loopTimer), a(".preview-container").removeClass("active"), a(".close-preview-button").hasClass("hidden") && a(".close-preview-button").removeClass("hidden"))
    }, G.prototype.showLoading = function () {
        a(".preview-container").addClass("active"), a(".preview-loading").show(), a(".close-preview-button").addClass("hidden"), a(".preview-content").hide()
    }, G.prototype.hideLoading = function () {
        a(".preview-container").removeClass("active"), a(".close-preview-button").removeClass("hidden"), a(".preview-content").show()
    }, G.prototype.show = function () {
        return this.active = !0, a(".preview-container").hasClass("active") ? void this.close() : (this.that.FrameController.frames.length > 1 ? a("#download-preview").addClass("active") : a("#download-preview").removeClass("active"), a(".preview-container").removeAttr("style"), a(".preview-container").addClass("active"), a(".preview-loading").show(), void a(".preview-content-append").html(""))
    }, G.prototype.image = function (b) {
        var c = a('<img src="' + b + '">');
        a(".preview-loading").hide(), a(".preview-content-append").html(c)
    }, G.prototype.doLoop = function (a) {
        var b = !1,
            c = this;
        this.active && (b = a[this.imagePosition], this.imagePosition >= a.length && (this.imagePosition = 0, b = a[this.imagePosition]), this.imagePosition++, b && (this.image(b.src), this.loopTimer = setTimeout(function () {
            c.doLoop(a)
        }, b.speed)))
    }, G.prototype.loop = function (a) {
        this.imagePosition = 0, clearTimeout(this.loopTimer), this.doLoop(a)
    }, G.prototype.download = function (b) {
        var c = this,
            d = this.that.previewSize;
        a("#download-preview").html(this.downloadButtonLoadingtext), b.attr("data-select-size") && (d = parseInt(this.that.downloadSizes.gif)), this.downloadActive || (this.downloadActive = !0, this.that.GifController.download(d, !0, function (b) {
            var d = URL.createObjectURL(b);
            saveAs(d, "pixil-gif-drawing.gif"), a("#download-preview").html(c.downloadButtonText), a(".loading-gif-restart").text(""), c.downloadActive = !1
        }))
    };
    var H = function (b) {
        this.that = b, this.status = !1, this.start_x = !1, this.start_y = !1, this.width = !1, this.height = !1, this.copyData = !1, this.currentImage = !1, this.transform = !1, this.developerData = [], this.informationHTML = a(".select-information").html(), a(".select-information").remove()
    };
    H.prototype.init = function () {
        this.listeners()
    }, H.prototype.listeners = function () {
        var b = this;
        a("#copy-selection").click(function () {
            b.copySection()
        }), a("#paste-selection").click(function () {
            b.pasteSelection()
        }), a(".accept-selection").click(function () {
            b.accept()
        }), a(".rotate-right").mousedown(function () {
            b.rotate("right")
        }), a(".rotate-left").mousedown(function () {
            b.rotate("left")
        }), a(".flip-right").mousedown(function () {
            b.flipRight()
        }), a(".flip-top").mousedown(function () {
            b.flipTop()
        }), a("#cut-selection").mousedown(function () {
            b.cutSelection()
        }), a("#select-info").mousedown(function () {
            b.that.showPopup("select-information", b.informationHTML)
        }), a(document).keydown(function (a) {
            if (46 == a.keyCode && b.deleteSelection(), a.ctrlKey && 67 == a.keyCode && b.copySection(), a.ctrlKey && 86 == a.keyCode && b.pasteSelection(), a.ctrlKey && 88 == a.keyCode && b.cutSelection(), b.that.developer) {
                if (192 == a.keyCode) {
                    var c = JSON.stringify(b.developerData);
                    b.that.showPopup("developer", c)
                }
                b.developerInformation(a.keyCode)
            }
        })
    }, H.prototype.cutSelection = function () {
        this.copySection(!1, !0), this.deleteSelection()
    }, H.prototype.developerInformation = function (a) {
        var b = this.that.canvas.rendering.canvas.width + 1,
            c = this.that.canvas.rendering.dataURL(),
            d = {};
        d[a] = {
            image: c,
            spacing_left: b
        }, this.developerData.push(d), console.log(d)
    }, H.prototype.showAcceptButton = function () {
        a(".accept-selection").css("display", "inline-block")
    }, H.prototype.hideSelectTools = function () {
        a(".select-helpers").removeClass("active")
    }, H.prototype.showSelectTools = function (b, c) {
        if (this.that.fileDrawing && a(".save-text-selection").length >= 1 && a(".save-text-selection").remove(), this.that.SelectController.height > 1 && this.that.SelectController.width > 1) {
            a(".select-helpers").addClass("active");
            var d = this.that.SelectController.start_x * (this.that.pixel_size * (this.that.ZoomController.phase + 1)),
                e = (this.that.SelectController.start_y + this.that.SelectController.height) * (this.that.pixel_size * (this.that.ZoomController.phase + 1));
            a(".select-helpers").css({
                left: d,
                top: e
            })
        } else this.hideSelectTools()
    }, H.prototype.addSelectToolsReady = function () {
        a(".select-helpers").addClass("ready")
    }, H.prototype.removeSelectToolsReady = function () {
        a(".select-helpers").removeClass("ready")
    }, H.prototype.showStampButton = function () {
        return this.that.fileDrawing ? this.hideStampButton() : (a(".save-stamp-selection").parent().css("display", "inline-block"), void a(".save-stamp-selection-set").css("display", "inline-block"))
    }, H.prototype.hideStampButton = function () {
        a(".save-stamp-selection").parent().hide(), a(".save-stamp-selection-set").hide()
    }, H.prototype.hideToggleButtons = function () {
        a(".Select-tool-toggle").hide()
    }, H.prototype.deleteSelection = function () {
        this.status && (this.that.canvas.layer.ctx.clearRect(this.start_x, this.start_y, this.width, this.height), this.that.ToolController.restore(), this.that.LayerController.updateLayer(), this.that.FrameController.updateFramePreview(), this.that.HistoryController.create())
    }, H.prototype.clearCopy = function () {
        this.copyData = {}
    }, H.prototype.copySection = function (a, b) {
        if (this.status || a) {
            if (this.copyData = {}, this.copyData.image = a ? a : this.that.canvas.rendering.image(), this.copyData.width = a ? a.width : this.that.canvas.rendering.canvas.width, this.copyData.height = a ? a.height : this.that.canvas.rendering.canvas.height, b) return;
            this.that.ToolController.restore()
        }
    }, H.prototype.setBrush = function () {
        this.that.settings.brush.status = !0, this.that.settings.brush.image = this.that.canvas.rendering.image(), this.that.settings.brush.width = this.that.canvas.rendering.canvas.width, this.that.settings.brush.height = this.that.canvas.rendering.canvas.height, this.that.settings.brush.solid = this.that.canvasToSolid(this.that.settings.brush.image), this.that.settings.brush.mouse = this.that.canvasToSolid(this.that.settings.brush.image, "#000000", .25), this.that.ToolController.setBrushImage(), this.that.ToolController.restore(), this.that.settings.brush.width <= 50 && this.that.settings.brush.height <= 50 && (this.that.ToolController.addBrushData(this.that.settings.brush.image.src), this.that.ToolController.loadCustomBrushes()), this.that.debug && console.log(this.that.settings.brush.image.src)
    }, H.prototype.pasteSelection = function () {
        if (this.that.online.status && this.that.LayerController.layers[this.that.LayerController.currentLayer].name != this.that.online.layer_id) return void this.that.showAlert("You can only edit your layer while online drawing");
        if (this.copyData && "Select" == this.that.tool) {
            this.showAcceptButton(), this.that.ToolController.restore(), this.that.ToolController.tool.currentImage = !1, this.that.canvas.rendering.canvas.width = this.copyData.width, this.that.canvas.rendering.canvas.height = this.copyData.height;
            var a = Math.abs(this.that.canvas.layer.canvas.width / 2 - this.copyData.width / 2),
                b = Math.abs(this.that.canvas.layer.canvas.height / 2 - this.copyData.height / 2);
            a = Math.floor(a), b = Math.floor(b), this.copyData.width > this.that.width && (a = 0), this.copyData.height > this.that.height && (b = 0), this.that.canvas.rendering.putSimple(this.copyData.image, 0, 0);
            var c = this.that.ToolController.tool;
            c.selectCanvasLocation.default_x = -99999999, c.selectCanvasLocation.default_y = -99999999, c.selectCanvasLocation.x = a, c.selectCanvasLocation.y = b, c.selectCanvasLocation.width = this.copyData.width, c.selectCanvasLocation.height = this.copyData.height, this.status = !0, c.selectCanvasLocation.active = !1, c.currentImage = this.that.canvas.layer.image(), c.renderSelectedArea(), this.status = !0, c.selectCanvasLocation.image = this.that.canvas.rendering.image(), this.that.canvas.layer.putSimple(this.that.canvas.rendering.canvas, a, b), this.that.render(), this.that.HistoryController.create()
        }
    }, H.prototype.hideAccept = function () {
        a(".accept-selection").hide()
    }, H.prototype.accept = function () {
        this.that.ToolController.tool.restore(!1, !0)
    }, H.prototype.flipTop = function () {
        if (this.status) {
            var a = this.that.canvas.rendering.image(),
                b = this;
            this.transform = !0, a.onload = function () {
                var c = b.that.canvas.rendering.canvas,
                    d = c.height;
                c.width;
                b.that.canvas.rendering.clear(), b.that.canvas.rendering.ctx.save(), b.that.canvas.rendering.ctx.scale(1, -1), b.that.canvas.rendering.ctx.drawImage(a, 0, -d), b.that.canvas.rendering.ctx.restore(), b.that.ToolController.tool.selectCanvasLocation.active = !0, b.that.ToolController.tool.updateSelection(), b.that.render()
            }
        }
    }, H.prototype.flipRight = function () {
        if ("Select" == this.that.tool && this.status) {
            var a = this.that.canvas.rendering.image(),
                b = this;
            this.transform = !0, a.onload = function () {
                var a = b.that.canvas.rendering.canvas,
                    c = (a.height, a.width);
                b.that.canvas.rendering.clear(), b.that.canvas.rendering.ctx.save(), b.that.canvas.rendering.ctx.scale(-1, 1), b.that.canvas.rendering.ctx.drawImage(this, -c, 0), b.that.canvas.rendering.ctx.restore(), b.that.ToolController.tool.selectCanvasLocation.active = !0, b.that.ToolController.tool.updateSelection(), b.that.render()
            }
        }
    }, H.prototype.rotate = function (a) {
        if ("Select" == this.that.tool && this.status) {
            var b = this.that.canvas.rendering.image(),
                c = this;
            this.transform = !0, b.onload = function () {
                var b = c.that.canvas.rendering.canvas.height,
                    d = c.that.canvas.rendering.canvas.width,
                    e = [];
                c.that.canvas.rendering.clear(), c.that.canvas.rendering.ctx.translate(d, 0), c.that.canvas.rendering.ctx.scale(-1, 1), c.that.canvas.rendering.ctx.drawImage(this, 0, 0);
                for (var f = c.that.canvas.rendering.ctx.getImageData(0, 0, this.width, this.height), g = 0, h = 0, i = 0; i < f.data.length; i += 4) {
                    g >= this.width && (g = 0, h++);
                    var j = [f.data[i], f.data[i + 1], f.data[i + 2], f.data[i + 3]];
                    f.data[i + 3] > 0 && m && (j[0] = rgbaColor.r, j[1] = rgbaColor.g, j[2] = rgbaColor.b);
                    var k = {
                        x: g,
                        y: h,
                        data: j
                    };
                    e.push(k), g++
                }
                if (c.that.canvas.rendering.clear(), c.that.canvas.rendering.canvas.height = d, c.that.canvas.rendering.canvas.width = b, "left" == a)
                    for (var g = 0; g < e.length; g++) {
                        var l = e[g],
                            m = "rgba(" + l.data[0] + "," + l.data[1] + "," + l.data[2] + "," + l.data[3] + ")";
                        c.that.layPixel(l.y, l.x, !0, m, "rendering", 1)
                    } else
                        for (var g = 0; g < e.length; g++) {
                            var l = e[g],
                                m = "rgba(" + l.data[0] + "," + l.data[1] + "," + l.data[2] + "," + l.data[3] + ")",
                                n = c.that.canvas.rendering.canvas.width - 1 - l.y,
                                o = c.that.canvas.rendering.canvas.height - 1 - l.x;
                            c.that.layPixel(n, o, !0, m, "rendering", 1)
                        }
                c.that.ToolController.tool.selectCanvasLocation.active = !0, c.that.ToolController.tool.updateSelection(), c.that.ToolController.tool.updateSelectCanvasArea(c.that.canvas.rendering.canvas.width, c.that.canvas.rendering.canvas.height), c.that.render()
            }
        }
    };
    var I = function (a) {
        this.that = a
    };
    I.prototype.init = function () {
        this.listeners()
    }, I.prototype.listeners = function () {
        var b = this;
        a(document).on("focus", "input, textarea", function (a) {
            b.that.preventShortcut = !0
        }), a(document).on("blur", "input, textarea", function (a) {
            b.that.preventShortcut = !1
        }), a(document).keydown(function (a) {
            b.that.preventShortcut || a.preventDefault(), b.that.keyEvent = a, a.ctrlKey && 90 == a.keyCode && b.that.HistoryController.doUndo(), a.ctrlKey && 89 == a.keyCode && b.that.HistoryController.doRedo(), a.ctrlKey && a.shiftKey && 83 == a.keyCode && b.that.ExportImportController["export"](), a.ctrlKey && 79 == a.keyCode && b.that.ExportImportController.open()
        }), a(document).keyup(function (a) {
            b.that.keyEvent = !1
        })
    };
    var J = function (b) {
        this.that = b, this.status = !1, this.customTextName = "ptx", this.customTextSettingsName = "ptxs", this.customTextData = {}, this.canAssignLetter = !1, this.fontsSelectionCache = a(".fonts-selection"), this.customTextSettings = {
            height: 10,
            spacing: 2
        }, this.popupHtmlData = !1, this.customFont = !1, this.currentImageData = {
            image: "",
            height: 10,
            spacing: 10
        }
    };
    J.prototype.init = function () {
        this.listeners(), this.loadFonts(), this.loadCustomTextInfo(), this.popupHtmlData = a(".custom-text-information").html(), a(".custom-text-information").remove(), this.popupTextHtmlData = a(".select-text-information").html(), a(".select-text-information").remove(), this.loadCustomData()
    }, J.prototype.loadCustom = function () {
        this.loadCustomData(), this.that.textData.custom = this.customFont
    }, J.prototype.showPopup = function (a, b) {
        this.that.showPopup(a, b), this.loadPopupData()
    }, J.prototype.getImageFromCanvas = function () {
        var a = this.that.canvas.rendering.image();
        this.currentImageData.image = a.src, this.currentImageData.height = a.height, this.currentImageData.spacing = parseInt(a.width) + 1
    }, J.prototype.listeners = function () {
        var b = this;
        a(".show-font-settings").click(function () {
            b.showPopup("custom-text", b.popupHtmlData)
        }), a(".save-text-selection").click(function () {
            b.canAssignLetter = !0, b.showPopup("new-letter", b.popupTextHtmlData), b.getImageFromCanvas()
        }), a(document).on("click", ".assign-key", function () {
            var c = a(this).attr("data-key");
            b.updateKey(c)
        }), a(document).on("click", ".export-font", function () {
            b["export"]()
        }), a(document).on("keydown", function (a) {
            "Text" == b.that.tool && (32 == a.keyCode && a.target == document.body && a.preventDefault(), 8 === a.which && a.preventDefault(), b.that.ToolController["do"]("use", a))
        }), a(document).on("click", ".text-settings-update", function () {
            b.updateSettings()
        }), this.fontsSelectionCache.change(function () {
            b.selection(a(this).val())
        })
    }, J.prototype.selection = function (a) {
        this.that.textData.current = a, this.that.ToolController.tool.on()
    }, J.prototype.loadFonts = function () {
        a.each(this.that.textData, function (b, c) {
            "current" != b && "default" != b && a(".fonts-selection").append('<option value="' + b + '">' + b + "</option>")
        })
    }, J.prototype.loadPopupData = function () {
        var b = this;
        a(".text-settings-height").val(this.customTextSettings.height), a(".text-settings-spacing").val(this.customTextSettings.spacing);
        var c = "";
        a.each(this.customTextData, function (a, d) {
            c += '<div class="col m2 assign-key" data-key="' + a + '"><div class="cs-k-w"><div class="cs-k-image kimg-' + a + '">' + b.getImage(d.image) + '</div><div class="cs-k">' + d.key + "</div></div></div>"
        }), a(".text-settings-display").html(c)
    }, J.prototype.getImage = function (a) {
        return "" == a ? "" : '<img src="' + a + '" />'
    }, J.prototype.loadCustomTextInfo = function () {
        this.fetchKeys(), this.loadSettings()
    }, J.prototype.fetchKeys = function () {
        this.loadKeys() || (this.customTextData = this.createKeys(), this.that.putStorage(this.customTextName, this.customTextData))
    }, J.prototype.loadKeys = function () {
        var a = this.that.getStorage(this.customTextName);
        return !(!a || "" == a.trim()) && (a = this.that.replaceAll(a, "--.--", ";"), this.customTextData = JSON.parse(a), !0)
    }, J.prototype.loadSettings = function () {
        var a = this.that.getStorage(this.customTextSettingsName);
        a ? (a = this.that.replaceAll(a, "--.--", ";"), this.customTextSettings = JSON.parse(a)) : this.that.putStorage(this.customTextSettingsName, this.customTextSettings)
    }, J.prototype.updateSettings = function () {
        this.customTextSettings.height = a(".text-settings-height").val(), this.customTextSettings.spacing = a(".text-settings-spacing").val(), this.that.textData.custom.height = this.customTextSettings.height, this.that.putStorage(this.customTextSettingsName, this.customTextSettings)
    }, J.prototype.updateKey = function (b) {
        this.canAssignLetter && (this.saveKey(b, this.currentImageData), a(".kimg-" + b).html(this.getImage(this.currentImageData.image)))
    }, J.prototype.saveKey = function (a, b) {
        this.that.fileDrawing || ("undefined" == typeof this.that.textData.custom[a] && this.loadCustomData(), this.that.textData.custom[a].image = b.image, this.that.textData.custom[a].spacing = b.spacing, this.customTextData[a].image = b.image, this.customTextData[a].spacing = b.spacing, this.that.putStorage(this.customTextName, this.customTextData))
    }, J.prototype.getKey = function (a) {
        return this.customTextData[a]
    }, J.prototype.createKeys = function () {
        return {
            81: {
                key: "q",
                image: "",
                spacing: 0
            },
            87: {
                key: "w",
                image: "",
                spacing: 0
            },
            69: {
                key: "e",
                image: "",
                spacing: 0
            },
            82: {
                key: "r",
                image: "",
                spacing: 0
            },
            84: {
                key: "t",
                image: "",
                spacing: 0
            },
            89: {
                key: "y",
                image: "",
                spacing: 0
            },
            85: {
                key: "u",
                image: "",
                spacing: 0
            },
            73: {
                key: "i",
                image: "",
                spacing: 0
            },
            79: {
                key: "o",
                image: "",
                spacing: 0
            },
            80: {
                key: "p",
                image: "",
                spacing: 0
            },
            65: {
                key: "a",
                image: "",
                spacing: 0
            },
            83: {
                key: "s",
                image: "",
                spacing: 0
            },
            68: {
                key: "d",
                image: "",
                spacing: 0
            },
            70: {
                key: "f",
                image: "",
                spacing: 0
            },
            71: {
                key: "g",
                image: "",
                spacing: 0
            },
            72: {
                key: "h",
                image: "",
                spacing: 0
            },
            74: {
                key: "j",
                image: "",
                spacing: 0
            },
            75: {
                key: "k",
                image: "",
                spacing: 0
            },
            76: {
                key: "l",
                image: "",
                spacing: 0
            },
            90: {
                key: "z",
                image: "",
                spacing: 0
            },
            88: {
                key: "x",
                image: "",
                spacing: 0
            },
            67: {
                key: "c",
                image: "",
                spacing: 0
            },
            86: {
                key: "v",
                image: "",
                spacing: 0
            },
            66: {
                key: "b",
                image: "",
                spacing: 0
            },
            78: {
                key: "n",
                image: "",
                spacing: 0
            },
            77: {
                key: "m",
                image: "",
                spacing: 0
            },
            49: {
                key: "1",
                image: "",
                spacing: 0
            },
            50: {
                key: "2",
                image: "",
                spacing: 0
            },
            51: {
                key: "3",
                image: "",
                spacing: 0
            },
            52: {
                key: "4",
                image: "",
                spacing: 0
            },
            53: {
                key: "5",
                image: "",
                spacing: 0
            },
            54: {
                key: "6",
                image: "",
                spacing: 0
            },
            55: {
                key: "7",
                image: "",
                spacing: 0
            },
            56: {
                key: "8",
                image: "",
                spacing: 0
            },
            57: {
                key: "9",
                image: "",
                spacing: 0
            },
            48: {
                key: "0",
                image: "",
                spacing: 0
            }
        }
    }, J.prototype.loadCustomData = function (b) {
        var c = (this.customTextData, this.customTextSettings.height),
            d = this.customTextSettings.spacing,
            e = {
                resize: !1,
                height: c,
                spacing_top: parseInt(c) + 1,
                spacing_left: d
            };
        if (a.each(this.customTextData, function (a, b) {
                e[a] = {
                    image: b.image,
                    spacing_left: b.spacing
                }
            }), this.customFont = e, this.that.textData.custom = this.customFont, b) return e
    }, J.prototype["export"] = function () {
        var a = JSON.stringify(this.loadCustomData(!0));
        this.that.downloadFile("new-font.json", a)
    };
    var K = function (a) {
        this.that = a, this.loaded = !1, this.html = "", this.cookieName = "pa_app_settings", this.iconSelection = "vinzenzius", this.iconSets = {
            "default": {
                name: "Default",
                src: "/img/application/icons/set_default.png",
                size: 16
            },
            username: {
                name: "Set by Username",
                src: "/img/application/icons/set_username.png",
                size: 16
            },
            peppermint: {
                name: "Set by Peppermint",
                src: "/img/application/icons/set_peppermint.png",
                size: 32
            },
            wolf: {
                name: "Set by Wolf",
                src: "/img/application/icons/set_wolf.png",
                size: 32
            },
            autumnfire: {
                name: "Set by Autumnfire",
                src: "/img/application/icons/set_autumnfire.png",
                size: 32
            },
            vinzenzius: {
                name: "Set by Vinzenzius",
                src: "/img/application/icons/set_vinzenzius.png",
                size: 32
            },
            isometric: {
                name: "Set by Isometric",
                src: "/img/application/icons/set_isometric.png",
                size: 32
            },
            detectiveevolve: {
                name: "Set by DetectiveEvolve",
                src: "/img/application/icons/set_detectiveevolve.png",
                size: 24
            },
            slinky_16: {
                name: "Set by Slinky 16",
                src: "/img/application/icons/set_slinky_16.png",
                size: 16
            },
            slinky_32: {
                name: "Set by Slinky 32",
                src: "/img/application/icons/set_slinky_32.png",
                size: 32
            },
            limethelime_32: {
                name: "Set by LimeTheLime 32",
                src: "/img/application/icons/set_limethelime.png",
                size: 32
            }
        }
    };
    K.prototype.init = function () {
        this.listeners(), this.createIconSelects(), this.html = a(".settings-information").html(), a(".settings-information").remove(), this.checkCurrentSettings()
    }, K.prototype.createIconSelects = function () {
        a.each(this.iconSets, function (b, c) {
            a(".select-icon-set").append('<option value="' + b + '">' + c.name + "</option>")
        })
    }, K.prototype.checkCurrentSettings = function () {
        var a = this.that.getCookie(this.cookieName);
        a && a.iconSet && this.loadIconSet(a.iconSet)
    }, K.prototype.loadIconSet = function (b) {
        var c = this.iconSets[b];
        c && (a(".icon-tool").css("background-image", "url(" + c.src + ")"), a(".icon-set").removeClass("s").removeClass("ml"), 32 == c.size && a(".icon-set").addClass("s"), 24 == c.size && a(".icon-set").addClass("ml"), this.iconSelection = b)
    }, K.prototype.updateSettingsCookie = function (a, b) {
        var c = this.that.getCookie(this.cookieName);
        "object" != typeof c && (c = {}), c[a] = b, this.that.createCookie(this.cookieName, c, !1, !0)
    }, K.prototype.changeIconSet = function (a) {
        this.loadIconSet(a), this.updateSettingsCookie("iconSet", a)
    }, K.prototype.load = function () {
        this.that.isApp && a(".ons-switch").removeAttr("checked"), this.that.grid.status && (a("#grid-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-grid").attr("checked", !0)), this.that.checker.status && (a("#checker-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-checker").attr("checked", !0)), this.that.autosave.status && a("#autosave-toggle").prop("checked", !0), this.that.pixelPerfect.status && (a("#perfect-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-pixel").attr("checked", !0)), this.that.onionSkin.status && a("#onion-toggle").prop("checked", !0), this.that.randomColor.status && (a("#random-color-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-random").attr("checked", !0)), this.that.rainbow.status && (a("#rainbow-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-rainbow").attr("checked", !0)), this.that.settings.showHue && a("#hue-toggle").prop("checked", !0), this.that.settings.dithering && a("#dithering-toggle").prop("checked", !0), this.that.settings.extras && a(".extras-toggle").prop("checked", !0), this.that.settings.isoLines && (a("#iso-lines-toggle").prop("checked", !0), this.that.isApp && a(".ons-switch-iso").attr("checked", !0)), this.that.theme.white && a("#lighter-toggle").prop("checked", !0), this.that.settings.canvasZoomDefault && a("#canvas-zoom-toggle").prop("checked", !0), this.that.settings.disableDownloadSubmit && a("#download-submit-toggle").prop("checked", !0), this.that.settings.disableScrollZoom && a("#disable-scroll-zoom-toggle").prop("checked", !0), this.that.settings.lockFrames && a(".frames-lock-toggle").prop("checked", !0), this.that.backgroundImage.status && (a(".background-image-input").val(this.that.backgroundImage.image), a("#background-toggle").prop("checked", !0)), this.loadSettings(), this.loadDownloadSelect(), this.loaded = !0
    }, K.prototype.loadSettings = function () {
        a(".select-icon-set").val(this.iconSelection)
    }, K.prototype.listeners = function () {
        var b = this;
        a(".settings-toggle").click(function (a) {
            a.preventDefault(), b.showPopup("settings"), b.load()
        }), a(".download-toggle").click(function (c) {
            c.preventDefault(), b.that.showPopup("download", a("#download-information").html()), b.that.PopupController.updateElements(), b.load()
        }), a(".popup-close, .popup-close-button").click(function () {
            b.closePopup()
        }), a(".p-header").click(function () {
            b.that.isApp && b.closePopup()
        }), this.that.isApp ? (a(document).on("click", ".app-mouse-toggle", function (a) {
            b.hideAppMouse()
        }), a(document).on("change", ".app-speed-dropdown", function (c) {
            b.that.updateFrameSpeed(a(this).val())
        }), a(document).on("click", ".app-type-toggle", function (c) {
            b.that.app.hideMouse = !1, b.hideAppMouse(), b.that.app.fingerToDraw ? a(".pixel-trace").hide() : (a(".pixel-trace").show(), b.that.mouse.render())
        })) : (a(document).on("change", ".select-icon-set", function () {
            b.changeIconSet(a(this).val())
        }), a(".section-extend").click(function () {
            var b = a(this).attr("data-for");
            a("." + b).addClass("dragable fixed"), a("." + b).css({
                position: "fixed"
            }), a("." + b + "-tab").hide(), a(".dragable").draggable({
                handle: ".drag-handle"
            });
            var c = a("." + b).position();
            (c.left < 0 || c.top < 50) && a("." + b).css({
                top: 55,
                right: 245,
                left: "inherit"
            }), a("." + b + "-content").addClass("force"), a(".sidebar-layers-tab")[0].click()
        }), a(".section-close").click(function () {
            var b = a(this).attr("data-for");
            a("." + b).removeClass("dragable").removeClass("fixed"), a("." + b).css({
                position: "static"
            }), a("." + b + "-tab").show(), a("." + b + "-content").removeClass("force")
        })), a(document).on("click", ".close-btn", function () {
            b.closePopup()
        }), a(document).on("keyup", ".background-image-input", function () {
            b.loaded && b.showBackround(a(this))
        }), a(document).on("blur", ".background-image-input", function () {
            b.loaded && b.showBackround(a(this))
        }), a(document).on("click", ".background-toggle", function () {
            b.loaded && (b.that.backgroundImage.status = !1, a(this).is(":checked") ? (b.that.backgroundImage.status = !0, b.that.tracing(), a(".background-toggle").prop("checked", !0)) : (b.that.tracing(), a(".background-toggle").prop("checked", !1).removeAttr("checked")))
        }), a(document).on("click", ".checker-toggle", function () {
            b.loaded && (b.that.checker.status = !1, a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.checker.status = !0, a(".checker-toggle").prop("checked", !0)) : a(".checker-toggle").prop("checked", !1).removeAttr("checked"), b.that.render())
        }), a(document).on("click", ".grid-toggle", function () {
            (b.loaded || b.that.isApp) && (b.that.grid.status = !1, a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.grid.status = !0, a(".grid-toggle").prop("checked", !0)) : a(".grid-toggle").prop("checked", !1).removeAttr("checked"), "CSS" == b.that.zoom.type && b.loadCssGrid(b.that.grid.status), b.that.render(!0))
        }), a(document).on("click", ".autosave-toggle", function () {
            b.loaded && !b.that.fileDrawing && (b.that.autosave.status = !1, a(this).is(":checked") ? (b.that.autosave.status = !0, a(".autosave-toggle").prop("checked", !0), b.that.startAutoSave()) : (a(".autosave-toggle").prop("checked", !1).removeAttr("checked"), b.that.stopAutoSave()))
        }), a(document).on("click", ".onion-toggle", function () {
            b.loaded && (b.that.onionSkin.status = !1, a(this).is(":checked") ? (b.that.onionSkin.status = !0, a(".onion-toggle").prop("checked", !0)) : a(".onion-toggle").prop("checked", !1).removeAttr("checked"), b.that.render())
        }), a(document).on("click", ".perfect-toggle", function () {
            (b.loaded || a(this).attr("data-force")) && (b.that.pixelPerfect.status = !1, a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.pixelPerfect.status = !0, a(".perfect-toggle").prop("checked", !0)) : a(".perfect-toggle").prop("checked", !1).removeAttr("checked"), b.that.render())
        }), a(document).on("click", ".random-color-toggle", function () {
            (b.loaded || a(this).attr("data-force")) && (b.that.randomColor.status = !1, a(".random-toggle-option").removeClass("active"), a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.randomColor.status = !0, a(".random-color-toggle").prop("checked", !0), a(".random-toggle-option").addClass("active")) : a(".random-color-toggle").prop("checked", !1).removeAttr("checked"))
        }), a(document).on("click", ".canvas-zoom-toggle", function () {
            (b.loaded || a(this).attr("data-force")) && (b.that.settings.canvasZoomDefault = !1, a(this).is(":checked") ? (b.that.settings.canvasZoomDefault = !0, a(".canvas-zoom-toggle").prop("checked", !0)) : a(".canvas-zoom-toggle").prop("checked", !1).removeAttr("checked"), b.toggleCanvasZoom())
        }), a(document).on("click", ".rainbow-toggle", function () {
            (b.loaded || a(this).attr("data-force")) && (b.that.rainbow.status = !1, a(".rainbow-toggle-option").removeClass("active"), a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.rainbow.status = !0, a(".rainbow-toggle").prop("checked", !0), a(".rainbow-toggle-option").addClass("active")) : a(".rainbow-toggle").prop("checked", !1).removeAttr("checked"))
        }), a(document).on("click", ".dithering-toggle", function () {
            (b.loaded || a(this).attr("data-force")) && (b.that.settings.dithering = !1, a(".dithering-toggle-option").removeClass("active"), a(this).is(":checked") ? (b.that.settings.dithering = !0, a(".dithering-toggle").prop("checked", !0), a(".dithering-toggle-option").addClass("active")) : a(".dithering-toggle").prop("checked", !1).removeAttr("checked"))
        }), a(document).on("click", ".extras-toggle", function () {
            b.that.settings.extras = !1, a(this).is(":checked") && (b.that.settings.extras = !0), b.toggleOptions()
        }), a(document).on("click", ".download-submit-toggle", function () {
            b.that.settings.disableDownloadSubmit = !1, a(this).is(":checked") ? b.that.settings.disableDownloadSubmit = !0 : a(".download-submit-toggle").prop("checked", !1).removeAttr("checked"), b.toggleDisableDownload()
        }), a(document).on("click", ".disable-scroll-zoom-toggle", function () {
            b.that.settings.disableScrollZoom = !1, a(this).is(":checked") ? b.that.settings.disableScrollZoom = !0 : a(".disable-scroll-zoom-toggle").prop("checked", !1).removeAttr("checked"), b.toggleDisableScroll()
        }), a(document).on("click", ".extras-colors-toggle", function () {
            b.that.settings.extrasColors = !1, a(this).is(":checked") ? (b.that.settings.extrasColors = !0, b.that.ColorController.showExtras(), a(".extras-colors-toggle").prop("checked", !0)) : (b.that.ColorController.hideExtras(), a(".extras-colors-toggle").prop("checked", !1).removeAttr("checked"))
        }), a(document).on("click", ".iso-lines-toggle", function () {
            b.that.settings.isoLines = !1, a(this).is(":checked") || a(this).find(".switch__input").is(":checked") ? (b.that.settings.isoLines = !0, a(".iso-lines-toggle").prop("checked", !0)) : a(".iso-lines-toggle").prop("checked", !1).removeAttr("checked")
        }), a(document).on("click", ".frames-lock-toggle", function () {
            b.that.settings.lockFrames = !1, a(this).is(":checked") ? (b.that.settings.lockFrames = !0, a(".frames-lock-toggle").prop("checked", !0)) : a(".frames-lock-toggle").prop("checked", !1).removeAttr("checked"), b.toggleLockedFrames()
        }), a(document).on("click", ".lighter-toggle", function () {
            b.that.theme.white = !1, a(this).is(":checked") ? (b.that.theme.white = !0, a(".lighter-toggle").prop("checked", !0)) : a(".lighter-toggle").prop("checked", !1).removeAttr("checked"), b.toggleLighterTheme()
        }), a(document).on("click", ".hue-toggle", function () {
            b.loaded && (b.that.settings.showHue = !1, a("#hue-extrude").removeClass("active"), a(this).is(":checked") ? (b.that.settings.showHue = !0, a(".hue-toggle").prop("checked", !0), a("#hue-extrude").addClass("active")) : a(".hue-toggle").prop("checked", !1).removeAttr("checked"))
        }), a(document).on("change", ".layer-download-size", function () {
            b.that.downloadSizes.layer = b.downloadSizeLimit(a(this).val()), b.changeRation(a(this).attr("data-alt"), b.that.downloadSizes.layer)
        }), a(document).on("change", ".frame-download-size", function () {
            b.that.downloadSizes.frame = b.downloadSizeLimit(a(this).val()), b.changeRation(a(this).attr("data-alt"), b.that.downloadSizes.frame)
        }), a(document).on("change", ".gif-download-size", function () {
            b.that.downloadSizes.gif = b.downloadSizeLimit(a(this).val()), b.changeRation(a(this).attr("data-alt"), b.that.downloadSizes.gif)
        }), a(document).keydown(function (a) {
            27 == a.keyCode && b.closePopup()
        }), a(document).on("click", ".text-pattern-prompt", function () {
            b.promptPattern()
        })
    }, K.prototype.hideAppMouse = function () {
        this.that.app.hideMouse ? a(".pixel-trace").addClass("hide-mouse") : a(".pixel-trace").removeClass("hide-mouse")
    }, K.prototype.loadCssGrid = function (b) {
        !this.that.grid.canvas && b && this.that.createCssDisplayGrid(), b ? a("#canvas_grid").show() : a("#canvas_grid").hide()
    }, K.prototype.toggleOptions = function () {
        this.that.settings.extras ? (this.that.ToolController.showExtras(), a(".extras-toggle").prop("checked", !0)) : (this.that.ToolController.hideExtras(), a(".extras-toggle").prop("checked", !1).removeAttr("checked"))
    }, K.prototype.toggleISOLines = function () {
        this.that.settings.isoLines ? a(".iso-lines-toggle").prop("checked", !0) : a(".iso-lines-toggle").prop("checked", !1).removeAttr("checked")
    }, K.prototype.toggleLockedFrames = function (b) {
        var c = !1;
        if (this.that.settings.lockFrames) {
            c = 25, a("#frames-placement").addClass("locked");
            var d = "calc(100% - " + a("#frames-placement").height() + "px)";
            a("#drawing-canvas-conatiner").height(d)
        } else a("#frames-placement").removeClass("locked"), a("#drawing-canvas-conatiner").removeAttr("style");
        this.that.repositionScreen(c)
    }, K.prototype.toggleCanvasZoom = function () {
        this.that.createCookie("pixil-canvas-zoom", this.that.settings.canvasZoomDefault), location.reload()
    }, K.prototype.toggleLighterTheme = function () {
        this.that.createCookie("pixil-theme", this.that.theme.white), this.that.changeTheme()
    }, K.prototype.toggleDisableDownload = function () {
        this.that.createCookie("pixil-prevent-download-submit", this.that.settings.disableDownloadSubmit)
    }, K.prototype.toggleDisableScroll = function () {
        this.that.createCookie("pixil-disable-scroll-zoom", this.that.settings.disableScrollZoom)
    }, K.prototype.toggleDithering = function (b) {
        this.that.settings.dithering ? (this.that.settings.dithering = !1, a(".dithering-toggle").prop("checked", !1).removeAttr("checked")) : (this.that.settings.dithering = !0, a(".dithering-toggle").prop("checked", !0))
    }, K.prototype.promptPattern = function () {
        var a = prompt("Background Generator", "");
        a && (this.that.runGenerator(a), this.that.HistoryController.create())
    }, K.prototype.loadDownloadSelect = function () {
        var b = this;
        a(".populate-numbers").each(function () {
            var c = a(this).attr("data-alt");
            c && (b.changeRation(c, b.that.downloadSizes[c]), b.loadSelectOnInput(c))
        })
    }, K.prototype.loadSelectOnInput = function (b) {
        var c = a("." + b + "-download-size"),
            d = this;
        1 == c.length && a("." + b + "-download-size option").each(function () {
            a(this).attr("value") == d.that.downloadSizes[b] && a(this).attr("selected", "selected")
        })
    }, K.prototype.downloadSizeLimit = function (a) {
        return parseInt(a) > 100 ? 100 : parseInt(a) <= 0 ? 1 : parseInt(a)
    }, K.prototype.changeRation = function (b, c) {
        var d = this.that.width * parseInt(c),
            e = this.that.height * parseInt(c);
        a(".ration-" + b).text("Width:" + d + " Height:" + e)
    }, K.prototype.closePopup = function () {
        this.that.hidePopup()
    }, K.prototype.showPopup = function (a) {
        this.that.showPopup(a, this.html), this.that.PopupController.updateElements(), this.that.online.status && this.that.OnlineController.removeElements()
    }, K.prototype.showBackround = function (a) {
        this.that.backgroundImage.image = a.val(), this.that.backgroundImage.init = !0, this.that.tracing()
    };
    var L = function (a) {
        this.that = a, this.currentImage = !1, this.imageData = !1
    };
    L.prototype.init = function () {
        this.listeners()
    }, L.prototype.listeners = function () {
        var b = this;
        a("#hue-changer").on("input", function () {
            var c = a(this).val();
            b.active(c)
        }), a("#hue-changer").on("mouseup", function () {
            b.restore()
        }), a("#hue-changer").bind("touchend", function () {
            b.restore()
        })
    }, L.prototype.active = function (b) {
        this.currentImage || (this.currentImage = this.that.canvas.layer.image(), this.imageData = this.that.canvas.layer.ctx.getImageData(0, 0, this.that.width, this.that.height), this.that.canvas.data["default"](), this.that.ToolController.restore()), a(".hue-update").text(b), this.changeColor(b)
    }, L.prototype.changeColor = function (a) {
        var b, c, d, e, f;
        this.that.canvas.data.ctx.putImageData(this.imageData, 0, 0);
        for (var g = this.that.canvas.data.ctx.getImageData(0, 0, this.that.width, this.that.height), h = 0; h < g.data.length; h += 4) {
            b = g.data[h], c = g.data[h + 1], d = g.data[h + 2], e = this.that.RGBtoHSV(b, c, d);
            var i = 360 * e.h;
            i = parseInt(i) + parseInt(a), parseInt(i) > 360 && (i -= 360), parseInt(i) < 0 && (i = Math.abs(i)), e.h = i / 360, f = this.that.HSVtoRGB(e.h, e.s, e.v), g.data[h] = f.r, g.data[h + 1] = f.g, g.data[h + 2] = f.b
        }
        this.that.canvas.layer.ctx.putImageData(g, 0, 0), this.that.render()
    }, L.prototype.restore = function (b) {
        a("#hue-changer").val(0), this.currentImage = !1, this.imageData = !1, this.that.LayerController.updateLayer(), this.that.FrameController.updateFramePreview(), this.that.HistoryController.create(), this.that.ToolController.restore(), a(".hue-update").text("0")
    };
    var M = function (a) {
        this.that = a, this.html = "", this.start = !1, this.filters = ["popular", "new", "yours", "approve", "favorite", "private"], this.filter = "popular", this.page = 1, this.search = "", this.processingNewStamp = !1, this.processingFetchStamp = !1
    };
    M.prototype.init = function () {
        this.that.isApp || (this.listerners(), this.html = a(".save-stamp").html(), a(".save-stamp").remove())
    }, M.prototype.listerners = function () {
        var b = this;
        a(".save-stamp-selection").click(function () {
            b.showPopup()
        }), a(document).on("submit", ".stamp-form-data", function (c) {
            c.preventDefault(), b.newStamp(a(this))
        }), a(".stamp-select").click(function () {
            b.showStampContainer()
        }), a(".stamp-show-more").click(function () {
            b.getStamps()
        }), a(".stamp-filter-btn").click(function (c) {
            c.preventDefault(), b.selectFilter(a(this))
        }), a("#stamp-search-input").keyup(function () {
            b.searchInput(a(this).val())
        }), a(document).on("click", ".stamp-pre-image", function () {
            b.preRenderData(a(this))
        }), a(document).on("click", ".delete-stamp-btn", function () {
            var c = a(this).attr("data-id");
            b["delete"](c)
        }), a(document).on("click", ".approve-stamp-btn", function () {
            var c = a(this).attr("data-id");
            b.approve(c, a(this))
        }), a(document).on("click", ".favorite-stamp-btn", function () {
            b.favoriteStamp(a(this))
        }), a(".close-stamps-container").click(function () {
            b.closeStampContainer()
        }), a(document).keyup(function (a) {
            "Stamp" == b.that.tool && 27 === a.keyCode && b.closeStampContainer()
        })
    }, M.prototype.renderData = function (a, b) {
        this.that.canvas.rendering.canvas.width = a.width, this.that.canvas.rendering.canvas.height = a.height, this.that.canvas.rendering.putSimple(a);
        var c = b.attr("data-resize"),
            d = a,
            e = this;
        "1" == c ? this.that.resizeImage(a.src, 4, function (a) {
            e.appendCopyData(a)
        }) : this.appendCopyData(d, !0)
    }, M.prototype.appendCopyData = function (a, b) {
        var c = this;
        b ? (this.that.SelectController.copySection(a), this.useSelectTool()) : a.onload = function () {
            c.that.SelectController.copySection(this), c.useSelectTool()
        }
    }, M.prototype.useSelectTool = function () {
        this.that.ToolController.selectTool(a("#select-tool"), "Select", !0), this.that.SelectController.pasteSelection()
    }, M.prototype.preRenderData = function (b) {
        if (this.that.online.status && this.that.LayerController.layers[this.that.LayerController.currentLayer].name != this.that.online.layer_id) return void this.that.showAlert("You can only edit your layer while online drawing");
        var c = b.attr("data-image"),
            d = this.that.validateImageData(c, !0),
            e = new Image,
            f = this;
        d ? (c = d, e.onload = function () {
            f.renderData(this, b)
        }, e.src = c, b.attr("data-id") && a.ajax({
            type: "PUT",
            url: "/stamp/" + b.attr("data-id"),
            data: "_token=" + a("#_token").val()
        })) : console.info("Image is not valid.")
    }, M.prototype.searchInput = function (a) {
        this.search = a.trim();
        var b = this,
            c = function () {
                var a = 0;
                return function (b, c) {
                    clearTimeout(a), a = setTimeout(b, c)
                }
            }();
        c(function () {
            b.clearStampWrapper(), b.getStamps()
        }, 300)
    }, M.prototype.selectFilter = function (b) {
        var c = b.attr("data-filter");
        if (c = c.trim().toLowerCase(), this.filters.indexOf(c) !== -1) {
            if (a(".stamp-filter-btn").removeClass("active"), b.addClass("active"), "favorite" == c && !this.that.isAuth || "yours" == c && !this.that.isAuth) return this.clearStampWrapper(), a(".stamp-show-more").hide(), a(".append-stamps-preview").html("<div style='color:white;text-align:center' class='mgbtm'>You need to be logged in.</div>");
            a(".stamp-show-more").show(), this.filter = c, this.page = 1, this.clearStampWrapper(), this.getStamps()
        }
    }, M.prototype.showStampContainer = function () {
        this.start || (this.start = !0, this.getStamps()), a(".stamp-container").show(), this.that.isMobile && !this.that.isTablet
    }, M.prototype.hideStampContainer = function () {
        a(".stamp-container").hide()
    }, M.prototype.showShowMoreStampsButton = function () {
        a(".stamp-show-more").show()
    }, M.prototype.hideShowMoreStampsButton = function () {
        a(".stamp-show-more").hide()
    }, M.prototype.showPopup = function (b) {
        this.that.showPopup("stamp", this.html), this.putRenderingCanvasData(), a("form .title-stamp").val("")
    }, M.prototype.closePopup = function () {
        this.that.hidePopup()
    }, M.prototype.putRenderingCanvasData = function () {
        var b = this.that.canvas.rendering.image();
        this.that.sizeUp(b, 5, function (b) {
            a(".stamp-data-preview").attr("src", b.src)
        }), a(".hidden-base-image").val(b.src)
    }, M.prototype.clearStampWrapper = function () {
        a(".append-stamps-preview").html("")
    }, M.prototype.showAppendLoader = function () {
        a(".loading-container").show()
    }, M.prototype.hideAppendLoader = function () {
        a(".loading-container").hide()
    }, M.prototype.closeStampContainer = function () {
        this.that.ToolController.selectTool(a("#pencil-tool"), "Pencil")
    }, M.prototype.appendStamps = function (b, c) {
        this.page++, this.processingFetchStamp = !1;
        var d = this,
            e = "";
        a.each(b, function (a, b) {
            e += d.that.stampsTemplate(b, c)
        }), a(".append-stamps-preview").append(e)
    }, M.prototype.showError = function (b) {
        a(".error-submitting").show(), a(".error-message-stamp").text(b)
    }, M.prototype.hideError = function () {
        a(".error-submitting").hide(), a(".error-message-stamp").text("")
    }, M.prototype.favoriteStamp = function (b) {
        var c = b.attr("data-id"),
            d = this;
        if (b.hasClass("active") ? b.removeClass("active") : b.addClass("active"), !this.favoriteStampRequest) {
            this.favoriteStampRequest = !0;
            var e = "stamp_id=" + c;
            a.ajax({
                type: "POST",
                url: "/stamp/favorite/" + c,
                data: e,
                cache: !1,
                processData: !1,
                contentType: !1,
                headers: {
                    "X-CSRF-TOKEN": a('meta[name="csrf-token"]').attr("content")
                },
                success: function (a) {
                    d.favoriteStampRequest = !1
                },
                fail: function () {
                    d.favoriteStampRequest = !1
                },
                error: function () {
                    d.favoriteStampRequest = !1
                }
            })
        }
    }, M.prototype.getStamps = function () {
        var b = a(".append-stamps-preview .selectable-stamp:last .stamp-pre-image").attr("data-id"),
            c = a(".append-stamps-preview .selectable-stamp:last .stamp-pre-image").attr("data-favorite-id"),
            d = "search_term=" + this.search + "&type=" + this.filter + "&page=1&is_new=true&after_id=" + b + "&last_f_id=" + c,
            e = this;
        if (!this.processingFetchStamp) return this.processingFetchStamp = !0, this.showAppendLoader(), this.hideShowMoreStampsButton(), a.ajax({
            type: "GET",
            url: "/stamp",
            data: d,
            cache: !1,
            processData: !1,
            contentType: !1,
            success: function (a) {
                e.appendStamps(a.data, a.permission), e.hideAppendLoader(), a.data.length >= 1 && e.showShowMoreStampsButton()
            },
            fail: function () {
                a(".loading-container").html("Error fetching stamps.")
            },
            error: function () {
                a(".loading-container").html("Error fetching stamps.")
            }
        }), !1
    }, M.prototype.newStamp = function (b) {
        var c = this,
            d = new FormData(b[0]),
            e = a(".hidden-base-image").val(),
            f = new Blob([e], {
                type: "text/plain"
            });
        return d.append("fname", "stamp.txt"), d.append("is_new", "1"), d.append("file", f), this.that.fileDrawing ? (this.that.FileController.showFileAlert(), !1) : this.that.validateImageData(e) && d && !this.processingNewStamp ? (this.hideError(), this.disableSubmit(), this.processingNewStamp = !0, a.ajax({
            type: "POST",
            url: "/stamp",
            data: d,
            cache: !1,
            processData: !1,
            contentType: !1,
            success: function (a) {
                c.successNewStamp()
            },
            fail: function (a) {
                c.finishNewStamp(), c.showError(a.responseJSON.message)
            },
            error: function (a) {
                c.finishNewStamp(), console.log(a.responseJSON.message), c.showError(a.responseJSON.message)
            }
        }), !1) : void 0
    }, M.prototype["delete"] = function (b, c) {
        var d = b,
            c = a("#_token").val(),
            e = "_token=" + c + "&delete_stamp=true";
        a(".stamp-id-" + d).hide(), a.ajax({
            type: "PUT",
            url: "/stamp/" + d,
            data: e,
            success: function (b) {
                a(".smp-" + d).hide()
            },
            fail: function () {
                a(".smp-" + d).show()
            },
            error: function () {
                a(".smp-" + d).show()
            }
        })
    }, M.prototype.approve = function (b, c) {
        var d = b,
            e = a("#_token").val(),
            f = "_token=" + e + "&approve_stamp=true";
        a.ajax({
            type: "GET",
            url: "/stamp/" + d + "/edit",
            data: f,
            success: function (a) {
                console.log(a), c.remove()
            },
            error: function () {
                alert("There was an error.")
            }
        })
    }, M.prototype.disableSubmit = function () {
        a(".stamp-submit-button").prop("disabled", !0)
    }, M.prototype.enableSubmit = function () {
        a(".stamp-submit-button").removeAttr("disabled")
    }, M.prototype.finishNewStamp = function () {
        this.processingNewStamp = !1, this.enableSubmit()
    }, M.prototype.successNewStamp = function () {
        this.processingNewStamp = !1, this.enableSubmit(), this.closePopup()
    };
    var N = function (a) {
        this.that = a, this.selectPopulate = 30
    };
    N.prototype.init = function () {
        this.listeners()
    }, N.prototype.listeners = function () {
        a(document).on("click", ".tab-header", function (b) {
            b.preventDefault();
            var c = a(this).attr("data-for");
            a(this).parent().find(".tab-header").removeClass("active"), a(this).parent().parent().find(".tab-content").removeClass("active"), a(this).addClass("active"), a(c).addClass("active")
        })
    }, N.prototype.tab = function (a, b) {}, N.prototype.updateElements = function () {
        var b = this;
        a(".populate-numbers").each(function () {
            a(this).html("");
            for (var c = '<option value="1">Size</option>', d = 1; d < b.selectPopulate + 1; d++) {
                var e = b.that.width * d,
                    f = b.that.height * d;
                c = c + '<option value="' + d + '">' + e + "x" + f + "</option>"
            }
            a(this).append(c)
        })
    };
    var O = function (a) {
        this.that = a, this.gif = !1, this.callback = !1
    };
    O.prototype.init = function () {
        this.listeners()
    }, O.prototype.listeners = function () {}, O.prototype.finishedLoad = function () {
        this.that.canvas.rendering["default"](), this.callback ? (this.callback(), this.callback = !1) : this.that.ready()
    }, O.prototype.load = function (b, c) {
        a("#image-preset").attr("src", b);
        var d = new SuperGif({
                gif: a("#image-preset")[0]
            }),
            e = this;
        this.callback = !!c && c, d.load(function () {
            var a = d.get_current_frame(0).data,
                b = [];
            e.that.canvas.rendering.canvas.width = a.width, e.that.canvas.rendering.canvas.height = a.height, e.that.FrameController.frames = [];
            for (var c = 0; c < d.get_length(); c++) b.push(d.get_current_frame(c)), d.get_length() == b.length && e.processData(b)
        })
    }, O.prototype.loadAppDrawing = function () {
        var a = this,
            b = [],
            c = this.that.app.frames;
        this.that.FrameController.frames = [];
        for (var d = 0; d < c.length; d++) {
            var e = new Image;
            e.data_id = d, e.onload = function () {
                b.push({
                    delay: 10,
                    data: this,
                    data_id: this.data_id
                }), b.length == c.length && a.that.arrangeImages(b, function (b) {
                    a.processData(b, !0)
                })
            }, e.src = this.that.decodeImage(c[d])
        }
    }, O.prototype.processData = function (a, b) {
        for (var c = this, d = 100, e = null, f = !1, g = !0, h = [], i = 0; i < a.length; i++) {
            if (d = 10 * a[i].delay, e = a[i].data, "object" != typeof e) return;
            b ? (c.that.canvas.rendering.clear(), c.that.canvas.rendering.putImageData(e)) : c.that.canvas.rendering.ctx.putImageData(e, 0, 0), f = {
                image: c.that.canvas.rendering.dataURL(),
                speed: d
            }, c.that.resizeImage(f, c.that.edit.resize, function (b, d) {
                h.push(i), b.speed = d.speed, b.onload = function () {
                    g ? (c.that.FrameController["new"](!0, this.speed, b, !0, !0), g = !1) : c.that.FrameController["new"](!0, this.speed, b, !0), c.that.canvas.layer.putSimple(b), a.length == h.length && c.finishedLoad()
                }
            })
        }
    }, O.prototype.download = function (a, b, c) {
        var d = this;
        this.getFrames(b, a, function (a) {
            var b = [],
                e = !1;
            if (a.length >= 1)
                for (var f = 0; f < a.length; f++) {
                    var g = a[f],
                        h = new Image;
                    h.speed = g.speed, h.data_id = f, h.onload = function () {
                        b.push({
                            src: this,
                            speed: this.speed,
                            data_id: this.data_id
                        }), b.length !== a.length || e || d.that.arrangeImages(b, function (a) {
                            d.useGif(a, c)
                        })
                    }, h.src = g.src
                }
        })
    }, O.prototype.getFrames = function (a, b, c) {
        this.that.FrameController.flattenAll(a, b, function (a) {
            c(a)
        })
    }, O.prototype.useGif = function (b, c) {
        var d = "/js/dist/gif.worker.js";
        a(".gif-loader").show(), this.that.isApp && (d = "/static/js/gif.worker.js");
        var e = new GIF({
            workers: 2,
            quality: 1,
            workerScript: d
        });
        a.each(b, function (a, b) {
            e.addFrame(b.src, {
                delay: parseInt(b.speed)
            })
        }), e.on("progress", function (b) {
            a(".loading-percent-preview-gif, .gif-loading-percent").text(Math.ceil(100 * b) + "%")
        }), e.on("finished", function (b) {
            return a(".gif-loader").hide(), c(b)
        }), e.render()
    };
    var P = function (a) {
        this.that = a, this.onNew = !1, this.importExportSecretString = "p98kjasdnasd983/24kasdjasd"
    };
    P.prototype.init = function () {
        this.listeners()
    }, P.prototype.listeners = function () {
        var b = this;
        a(document).on("click", ".save-as", function () {
            b["export"]()
        }), a("#open-pix").click(function () {
            b.onNew = !1, b.open()
        }), a(document).on("click", ".open-pix-callout", function () {
            b.onNew = !0, b.open()
        }), a("#file-open").change(function () {
            var c = a(this).prop("files");
            c && b.read(c)
        })
    }, P.prototype.open = function () {
        return this.that.fileDrawing ? this.that.FileController.reloadPage() : void a("#file-open")[0].click()
    }, P.prototype["export"] = function (a) {
        if (this.that.fileDrawing) return this.that.FileController.reloadPage();
        var b = (this.that.FrameController.frames.length, this.that.FrameController.currentFrame),
            c = this.that.width,
            d = this.that.height,
            e = this.that.ColorController.colorPresets,
            f = this;
        this.that.startHistory(function (g) {
            var h = {
                    application: "pixil",
                    version: f.that.version,
                    website: f.that.website,
                    author: "https://www.pixilart.com",
                    contact: "support@pixilart.com",
                    width: c,
                    height: d,
                    colors: e,
                    frames: g,
                    currentFrame: b,
                    name: f.that.fileName,
                    preview: f.that.canvas.display.dataURL()
                },
                i = JSON.stringify(h);
            if (a) return i;
            i = f.that.replaceAll(i, ";", f.importExportSecretString);
            var j = prompt("Filename", "");
            null != j && (f.that.downloadFile(j + ".pixil", i), f.that.clearAutoSave())
        })
    }, P.prototype.read = function (a) {
        var b = this,
            c = new FileReader;
        c.readAsText(a[0], "UTF-8"), c.onload = function (a) {
            b["import"](a.target.result)
        }, c.onerror = function (a) {
            console.info("There was an error loading the file.")
        }
    }, P.prototype["import"] = function (a, b) {
        var c = this,
            d = !1;
        if (b || this.onNew || (d = confirm("This will clear the current canvas. Please cancel now to prevent erasing everything.")), d || b || this.onNew) {
            var e = a;
            a = this.that.replaceAll(a, this.importExportSecretString, ";");
            try {
                var f = JSON.parse(a)
            } catch (g) {
                return console.log(g), alert("Not a valid file type.")
            }
            if (f.version >= 1.8 && e.indexOf(this.importExportSecretString) == -1) return alert("Data is tained");
            if ("object" == typeof f && "pixil" == f.application) {
                this.that.clickCount = !0, this.that.width = f.width, this.that.height = f.height, this.that.getPixelRatio(), this.that.resizeCanvases(), this.that.createGrid(), this.that.createChecker();
                var h = this.that.zoom.type;
                this.that.zoom_ratio = 1, this.that.zoom_step = 1, this.that.zoom = {
                    type: h,
                    left: 0,
                    top: 0,
                    ratio: 1,
                    pixel_size: 1
                }, this.that.ZoomController.reset(!0), this.that.ColorController.colorPresets = f.colors, this.that.ColorController.updateOptions(), this.that.ColorController.updateColors("default colors"), this.that.ColorController.getColorsFromCanvas(), this.that.HistoryController.undo = [], this.that.HistoryController.redo = [], this.that.LayerController.currentLayer = 0, this.that.FrameController.currentFrame = 0, this.that.loadHistoryData(f, function (a) {
                    c.loadFrames(a)
                }), this.that.FileController.updateDimensions()
            }
            this.that.hidePopup()
        }
    }, P.prototype.loadAppFrames = function (b) {
        var d = this,
            e = b.length,
            f = 0;
        a.each(b, function (a, g) {
            var h = d.that.decodeImage(g.src),
                i = new Image;
            i.onload = function () {
                var g = new c(0, "Background - Frame" + a, this);
                g.init(), b[a].layers = [g], b[a].src = h, b[a].active = !0, b[a].speed = 100, f++, f == e && d.loadFrames(b)
            }, i.src = h
        })
    }, P.prototype.loadFrames = function (a) {
        this.that.FrameController.frames = a, this.that.FrameController.updateList(), this.that.canvas.rendering.clear(), this.that.updateDisplayCanvas(this.that.LayerController.layers, 0), this.that.render(), this.that.HistoryController.newCanvas(), this.that.FrameController.select(0), this.that.app.isLoaded = !0, this.that.isApp && this.that.app.isGif && (this.that.canvas.rendering.clear(), this.that.canvas.display.clear(), this.that.FrameController.select(this.that.FrameController.frames.length - 1))
    };
    var Q = function (a) {
        this.that = a, this.html = !1, this.ratioLimit = 35, this["new"] = {
            width: 256,
            height: 144,
            default_width: 256,
            default_height: 144
        }
    };
    Q.prototype.init = function () {
        this.listeners(), this.updateNew(this["new"].width, this["new"].height), this.html = a("#new-menu").html(), this.resizeHtml = a("#resize-menu").html()
    }, Q.prototype.listeners = function () {
        var b = this;
        a("#new-pix, .new-pix").click(function () {
            return b.that.fileDrawing ? b.reloadPage() : void b.showPopup("new", b.html)
        }), a("#resize-pix").click(function () {
            b.showPopup("resize", b.resizeHtml)
        }), a(document).on("click", ".new-pix-link", function () {
            b.showPopup()
        }), a(".rename-image").click(function () {
            b.renameImage()
        }), a(document).on("click", ".preset-select", function () {
            return a(".preset-select").removeClass("active"), a(this).addClass("active"), "rand" == a(this).attr("data-width") || "rand" == a(this).attr("data-height") ? b.randomSize() : (b.updateNew(a(this).attr("data-width"), a(this).attr("data-height")), void b.newer())
        }), a("#open-image-toggle").click(function () {
            a("#open-image").trigger("click")
        }), a("#open-image").change(function (a) {
            b.readFile(a)
        }), a(document).on("blur", ".new-width", function (c) {
            c.preventDefault(), b.updateNew(a(this).val(), b["new"].height)
        }), a(document).on("blur", ".new-height", function (c) {
            c.preventDefault(), b.updateNew(b["new"].width, a(this).val())
        }), a(document).on("click", ".new-drawing-a", function (a) {
            b.newer()
        }), a(document).on("click", ".resize-drawing-submit", function (a) {
            b.checkResize()
        })
    }, Q.prototype.readFile = function (a) {
        var b = this,
            c = new FileReader;
        c.onload = function (c) {
            var d = new Image;
            d.onload = function () {
                b.loadFile(this, a.target.files[0])
            }, d.src = c.target.result
        }, c.readAsDataURL(a.target.files[0])
    }, Q.prototype.loadFile = function (a, b) {
        var c = this;
        this["new"].width = a.width, this["new"].height = a.height, this["new"].width > this.that.maxWidth && (this["new"].width = this.that.maxWidth), this["new"].height > this.that.maxHeight && (this["new"].height = this.that.maxHeight), this.that.getPixelRatio(), this.newer() && (this.that.loading = !0, this.that.debug || (this.that.fileDrawing = !0), this.hideFileElements(), "gif" == this.that.fileExtension(b.name) ? (this.that.edit.resize = 1, this.that.PreviewController.showLoading(), this.that.GifController.load(a.src, function () {
            c.that.PreviewController.hideLoading(), c.loadFileData(a)
        })) : this.loadFileData(a))
    }, Q.prototype.loadFileData = function (b) {
        this.that.ToolController.tool.currentImage = !1, this.that.ToolController.selectTool(a("#pencil-tool"), "Pencil", !0), this.that.canvas.layer.putSimple(b), this.that.canvas.rendering.putSimple(b), this.that.updateDisplayCanvas(this.that.LayerController.layers, 0), this.that.FrameController.updateFramePreview(0), this.that.HistoryController.newCanvas(), this.that.render(), this.that.loading = !1
    }, Q.prototype.showFileAlert = function (a) {
        var b = a ? a : "Opened files cannot be uploaded or saved.";
        alert(b)
    }, Q.prototype.hideFileElements = function () {
        this.that.debug || (this.that.autosave.status = !1, a("#save, #open-pix").hide(), this.that.SubmitController.hideSubmit(), this.that.SelectController.clearCopy())
    }, Q.prototype.restoreNoFile = function () {
        a("#save, #open-pix").show(), this.that.SubmitController.showSubmit()
    }, Q.prototype.reloadPage = function () {
        location.reload()
    }, Q.prototype.randomSize = function () {
        for (var a = [32, 64, 50, 100, 120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400, 420, 450, 480, 500], b = !0, c = 0, d = 1e3; b;) {
            var e = a[Math.floor(Math.random() * a.length)],
                f = a[Math.floor(Math.random() * a.length)];
            if (this.checkRatio(e, f, 40) || (b = !1, this.updateNew(e, f), this.newer()), c++, c > d) {
                this.error("Could not find a random size. Please try again.");
                break
            }
        }
    }, Q.prototype.checkResize = function () {
        this["new"].width = a(".new-width").val(), this["new"].height = a(".new-height").val(), this.resize(!0, this["new"].width, this["new"].height)
    }, Q.prototype.resize = function (a, b, c, d) {
        if (b != this.that.width || c != this.that.height) {
            b = b ? b : this["new"].width, c = c ? c : this["new"].height, this.that.SubmitController.defaultSubmitForm(), this.that.width = b, this.that.height = c, this.that.getPixelRatio(), this.that.resizeCanvases(!1, !1, !0), this.that.grid.data = !1, this.that.checker.data = !1, this.that.showGrid(!0), this.that.showChecker(!0);
            var e = this.that.zoom.type;
            if (this.that.zoom_ratio = 1, this.that.zoom_step = 1, this.that.zoom = {
                    type: e,
                    left: 0,
                    top: 0,
                    ratio: 1,
                    pixel_size: 1
                }, this.that.ZoomController.reset(!0), this.that.PreviewController.reset(), this.updateDimensions(), a) {
                for (var f = this.that.FrameController.frames, g = 0; g < f.length; g++) {
                    var h = f[g];
                    h.width = this.that.width, h.height = this.that.height
                }
                this.that.HistoryController.create()
            }
            return this.that.FrameController.select(this.that.FrameController.currentFrame), this.that.render(), this.hidePopup(), d ? d() : void 0
        }
    }, Q.prototype.renameImage = function () {
        var a = prompt("Rename Image", this.that.fileName);
        null != a && (this.that.fileName = a)
    }, Q.prototype.updateNew = function (b, c) {
        a(".preset-select").removeClass("active"), b = parseInt(b), c = parseInt(c), (c <= 0 || c > this.that.maxHeight) && (c = this["new"].default_height), (b <= 0 || b > this.that.maxWidth) && (b = this["new"].default_width), this["new"].width = b, this["new"].height = c, a(".new-width").val(this["new"].width), a(".new-height").val(this["new"].height)
    }, Q.prototype.showPopup = function (a, b) {
        b = b ? b : this.html, a = a ? a : "new", this.clearError(), this.that.showPopup(a, b), this.updateNew(this.that.width, this.that.height)
    }, Q.prototype.hidePopup = function () {
        this.that.hidePopup()
    }, Q.prototype.checkRatio = function (a, b, c) {
        var d = 0;
        a = a ? a : this["new"].width, b = b ? b : this["new"].height;
        var e = c ? c : this.ratioLimit;
        return d = a > b ? b / a : a / b, d = 100 * d, d <= e
    }, Q.prototype.error = function (b) {
        a(".new-file-error").slideDown(250), a(".resize-file-error").slideDown(250), b && a(".error-message-file").text(b)
    }, Q.prototype.clearError = function () {
        a(".new-file-error").hide(), a(".resize-file-error").hide()
    }, Q.prototype.appClear = function (a) {
        var b = this;
        this.that.ons.notification.confirm("Are you sure?").then(function (c) {
            c && (b.newer(!0, !0), b.that.newDrawing(a), b.that.updateAppFrames())
        })
    }, Q.prototype.newer = function (a, b) {
        var d;
        this.that.newShow || this.that.isApp || (d = confirm("This will clear the entire drawing. Okay to continue?"));
        if (this.clearError(), d || this.that.newShow || b) {
            this.that.newShow = !1, a && (this["new"].width = this.that.width, this["new"].height = this.that.height), this.checkRatio() && !this.that.isApp, this.that.SubmitController.defaultSubmitForm(), this.that.width = this["new"].width, this.that.height = this["new"].height, this.that.getPixelRatio(), this.that.resizeCanvases(), this.that.grid.data = !1, this.that.checker.data = !1, this.that.showGrid(!0), this.that.showChecker(!0), this.that.LayerController.currentLayer = 0, this.that.FrameController.currentFrame = 0, this.that.LayerController.layers = [], this.that.FrameController.frames = [];
            var e = new c(0, "Background");
            e.init(), this.that.FrameController["new"](!0), this.that.LayerController.frame = this.that.FrameController.frame(), this.that.LayerController.layers = this.that.LayerController.frame.layers, this.that.LayerController.addLayer(e), this.that.HistoryController.undo = [], this.that.HistoryController.redo = [], this.that.FrameController.select(0), this.that.FrameController.updateList(), this.that.HistoryController.newCanvas();
            var f = this.that.zoom.type;
            return this.that.zoom_ratio = 1, this.that.zoom_step = 1, this.that.zoom = {
                type: f,
                left: 0,
                top: 0,
                ratio: 1,
                pixel_size: 1
            }, this.that.ZoomController.reset(!0), this.that.PreviewController.reset(), this.updateDimensions(), this.that.render(), this.hidePopup(), this.that.isApp && this.that.updateImageStorage(), !0
        }
        return !1
    }, Q.prototype.updateDimensions = function () {
        a(".width").text(this.that.width), a(".height").text(this.that.height)
    };
    var R = function (a) {
        this.that = a, this.is_gif = !1, this.htmlLoading = "", this.submitted = !1, this.saveImage = !1, this.defaultUploadButtonText = '<i class="fa fa-star fa-small fa-fw" aria-hidden="true"></i> Save Drawing', this.loadingText = "Loading..", this.url = "", this.errorTimer, this.doTimeout = !0, this.timeoutTimer = 3e5, this.gifRatio = 1
    };
    R.prototype.init = function () {
        this.listerners(), this.htmlSmall = a("#submit-small"), a("#submit-small").remove(), this.htmlLoading = a("#submit-loading"), a("#submit-loading").remove()
    }, R.prototype.hideSubmit = function () {
        a(".submit-drawing").hide()
    }, R.prototype.showSubmit = function () {
        a(".submit-drawing").show()
    }, R.prototype.defaultSubmitForm = function () {
        a(".art-unqid-set").length >= 1 && a(".art-unqid-set").remove(), a(".save-edit-btn").length >= 1 && a(".save-edit-btn").remove(), a(".submit-new-drawing").removeClass("upload-edit-btn"), a(".title-drawing").val(""), a(".desc-art").val("")
    }, R.prototype.listerners = function () {
        var b = this;
        a(document).on("click", ".submit-drawing", function () {
            return b.that.fileDrawing ? b.that.FileController.showFileAlert() : void(b.validateSize() && (b.that.ToolController.restore(), b.that.showPopup("submit", a("#submit-drawing").html()), b.setInputValue(), b.enableUploadReplay()))
        }), a(document).on("mousedown", ".save-edit-btn", function () {
            b.saveImage = !0
        }), a(document).on("mousedown", ".submit-new-drawing", function () {
            b.saveImage = !1
        }), a(document).on("submit", ".submit-drawing-form", function (c) {
            c.preventDefault(), b.processSubmit(a(this))
        }), a(document).on("change", ".progress-check-toggle", function () {
            var c = a(this);
            c.prop("checked") ? b.that.createCookie("pixil-replay", !0) : b.that.createCookie("pixil-replay", !1)
        }), a(document).on("click", ".go-to-image-btn", function () {
            window.location.href = b.url
        })
    }, R.prototype.enableUploadReplay = function () {
        var b = this.that.readCookie("pixil-replay");
        "string" == typeof b && "false" == b || 1 == this.that.FrameController.frames.length && a(".progress-check-toggle").prop("checked", !0)
    }, R.prototype.validateSize = function () {
        return !(this.that.width < this.that.minWidth || this.that.height < this.that.minHeight) || (this.that.showPopup("submit_download", this.htmlSmall), this.that.PopupController.updateElements(), !1)
    }, R.prototype.processSubmit = function (b) {
        var c = this,
            d = this.that.getScaleUpRatio();
        if (this.that.FileController.checkRatio() && !this.that.isApp) return void this.error("Images cannot be too tall or too wide. Please crop your image before uploading.");
        this.disableSubmit(), this.that.mouse.closeHook = !1;
        var e = {};
        a.each(b.serializeArray(), function (a, b) {
            e[b.name] = b.value
        });
        var f = 1 == e.upload_progress;
        this.that.downloadProgressGif(!1, !1, function (e) {
            c.that.FrameController.frames.length > 1 ? (c.is_gif = !0, a(".submit-drawing-butn").html(c.loadingText + ' Creating Animation. <span class="gif-loading-percent"></span>'), c.that.GifController.download(d, d, function (d) {
                a(".submit-drawing-butn").text(c.loadingText + " Uploading Animation."), c.submitDrawing(b, d, !1)
            })) : c.submitDrawing(b, !1, e)
        }, f)
    }, R.prototype.setInputValue = function () {
        var b = this.that.FrameController.frame(0),
            c = this.that.LayerController.flatten(b.layers);
        a(".frame-0").val(c), this.getColorTree(c)
    }, R.prototype.submitDrawing = function (b, c, d) {
        if (!this.that.isApp) {
            var e = this,
                f = document.getElementById("submit-form"),
                g = new FormData(f),
                h = this.that.backgroundImage.image;
            if (g.append("app_set", "true"), this.hideError(), this.that.clickCount || e.enableSubmit(), d && (g.append("has_progress", "true"), g.append("progress_name", "pixil-progress.gif"), g.append("progress_blob", d)), c) {
                if (g.append("is_gif", "true"), g.append("fname", "pixil-image.gif"), g.append("gif_blob", c), c.size > 4e7) return e.enableSubmit(), void e.showError("Image is too large in file size. Please contact support.");
                e.is_gif = !0
            }
            if (this.saveImage && g.append("save_image", "true"), "" != h.trim() && h.toLowerCase().match(/\.(jpg|png|gif|bmp)/g) && g.append("is_traced", "true"), e.that.fileDrawing) return e.that.FileController.showFileAlrt();
            if (a(".submit-drawing-butn").html("Uploading.."), !this.submitted && g) {
                if (this.submitted = !0, this.download(), this.hideError(), this.that.validateImageData(a(".frame-0").val())) return a.ajax({
                    type: "POST",
                    url: "/draw/new",
                    data: g,
                    cache: !1,
                    processData: !1,
                    contentType: !1,
                    timeout: e.timeoutTimer,
                    success: function (a) {
                        "object" == typeof a && a.url && (e.that.clearAutoSave(), e.showLink(a.url, a))
                    },
                    fail: function (a) {
                        JSON.parse(a.responseText);
                        e.error("Server failed to respond. Please save a local copy to your device and try again later.")
                    },
                    error: function (a, b, c) {
                        if (e.error("There was an error. Please save a local copy to your device and try again later."), "timeout" === a.statusText) e.error("Server failed to respond. Please save a local copy to your device and try again later.");
                        else {
                            var d = JSON.parse(a.responseText);
                            e.error(d.message)
                        }
                    }
                }), !1;
                e.error("Image data not valid. Please contact support for more information.")
            }
        }
    }, R.prototype.error = function (b) {
        this.enableSubmit(), this.showError(b), a(".submit-drawing-butn").html(this.defaultUploadButtonText)
    }, R.prototype.showLink = function (b, c) {
        if (this.that.hidePopup(), this.that.showPopup("getting-link", this.htmlLoading, !0, !0, !0), this.url = b, this.that.ads.status) {
            try {
                this.is_gif ? this.appendAd() : this.shopAd(c.art_id, c.data, c.art_url)
            } catch (d) {
                console.log("There was an error getting the ad.")
            }
            setTimeout(function () {
                a(".pre-getting-text").hide(), a(".go-to-image-btn").addClass("active")
            }, 3500)
        } else window.location.href = b
    }, R.prototype.appendAd = function () {
        var b = '<ins class="adsbygoogle" style="display:inline-block;width:336px;height:280px" data-ad-client="ca-pub-3237025594850465" data-ad-slot="7026167230"></ins>';
        a(".ad-video-placement").html(b), (adsbygoogle = window.adsbygoogle || []).push({})
    }, R.prototype.shopAd = function (b, c, d) {
        function e(c) {
            var d = "";
            return a.each(c, function (a, c) {
                d += "<a href='/shop/custom/" + b + "' class='slide-slot'><div class='product-card-wrap'><div class='product-image-render'><canvas class='render_shop_canvas image-popup-image' id='product_" + c.id + "_img' width='100%' height='100%' data-startImage='" + c.image_url + "' data-topImage='" + c.above_image_url + "' data-cords='" + c.cords + "' data-moveable='" + c.is_moveable + "' data-resizeable='" + c.is_resizeable + "' data-constraints='" + c.use_constraints + "' data-fullsize='" + c.use_fullsize + "' data-crop='" + c.use_crop + "'></canvas><img src='" + c.image_url + "' id='product_image_" + c.id + "' width='100%'></div></div></a>"
            }), d
        }

        function f() {
            return ""
        }
        var g = '<div class="shop-product-placement">' + f(b) + '<div class="rotate-slide-wrapper">' + e(c) + '</div><a href="/shop/custom/' + b + '?ref=drawing-page" style="color: #000; text-align: center; font-size: 16px; line-height: normal;"><div style=" font-weight: bold; margin-bottom: 5px; font-size: 22px;">Pixilart Shop</div>Create shirts, phone-cases, mugs and more!</a></div>';
        a(".ad-text").addClass("product hide-mobile"), a(".ad-text").html(""), a(".ad-video-placement").html(g), a(".ad-video-placement"), this.loadPixilShop(d)
    }, R.prototype.loadPixilShop = function (b) {
        function c() {
            for (var a = 0; a < e.length; a++) {
                var b = e[a],
                    c = document.getElementById(b.id),
                    f = c.getContext("2d"),
                    g = {
                        resizeable: b.resizeable,
                        moveable: b.moveable,
                        constraints: b.constraints,
                        fullsize: b.fullsize,
                        use_crop: b.use_crop
                    },
                    h = new product(c, f, b.startImage, d, b.topImage, b.cords, g);
                h.start()
            }
        }
        var d = b,
            e = [];
        a(".image-popup-image").each(function () {
            var b = {
                id: a(this).attr("id"),
                startImage: a(this).attr("data-startImage"),
                moveable: !1,
                resizeable: !1,
                constraints: !1,
                cords: a(this).attr("data-cords"),
                topImage: a(this).attr("data-topImage"),
                fullsize: a(this).attr("data-fullsize"),
                use_crop: a(this).attr("data-crop")
            };
            e.push(b), e.length == a(".image-popup-image").length && c()
        });
        var f = 0,
            g = 0,
            h = 0,
            i = function () {
                f = a(".slide-slot").length;
                var b = new Image;
                b.onload = function () {
                    a(".rotate-slide-wrapper").width(a(".slide-slot").width()).height(a(".slide-slot").height()), g = a(".slide-slot").width(), j()
                }, b.src = a(".rotate-slide-wrapper .slide-slot:first img").attr("src")
            },
            j = function () {
                k(), window.timer = setTimeout(function () {
                    j()
                }, 2500)
            },
            k = function () {
                var b = h * g;
                h++, h == f && (h = 0), a(".rotate-slide-wrapper").animate({
                    scrollLeft: b
                }, 50)
            };
        i()
    }, R.prototype.showError = function (b) {
        this.hideError(), a(".error-submitting").show(), a(".error-message-submit").text(b)
    }, R.prototype.hideError = function () {
        a(".error-submitting").hide(), a(".error-message-submit").text("")
    }, R.prototype.disableSubmit = function () {
        a(".save-edit-btn").length >= 1 && a(".save-edit-btn").hide(), a(".submit-drawing-butn").text(this.loadingText).prop("disabled", !0)
    }, R.prototype.enableSubmit = function () {
        this.submitted = !1, a(".save-edit-btn").length >= 1 && a(".save-edit-btn").show(), a(".submit-drawing-butn").html(this.defaultUploadButtonText).removeAttr("disabled")
    }, R.prototype.getTitle = function (b) {
        var c = a(".drawing-title-submit").val();
        return c = c.replace(/\s+/g, "-").toLowerCase(), c = "" == c.trim() ? "pixilart-drawing." + b : c + "-pixilart." + b
    }, R.prototype.download = function () {
        if (!(this.that.settings.disableDownloadSubmit || this.that.isMobile || this.that.isIpad)) {
            var b = this.that.FrameController.frames;
            if (this.that.downloadSizes.frame = 1, this.that.downloadSizes.gif = 1, b.length > 1) {
                var c = this.getTitle("gif");
                this.that.GifController.download(1, 1, function (b) {
                    var d = URL.createObjectURL(b);
                    a("#dowmnload-a").attr("href", d), a("#dowmnload-a").attr("download", c), a("#dowmnload-a")[0].click()
                })
            } else {
                var c = this.getTitle("png");
                this.that.FrameController.download(0, c)
            }
        }
    }, R.prototype.getColorTree = function (a) {
        this.that.canvas.data.clear();
        var b = (new Image, "{image:true,data:set,method:upload,token:__this}");
        return b
    };
    var S = function (a) {
        this.that = a, this.html = ""
    };
    S.prototype.init = function () {
        this.listeners(), this.html = a("#info-container").html(), a("#info-container").remove(), this.html_about = a("#about-information").html(), a("#about-information").remove(), this.html_mobile = a("#mobile-information").html(), a("#mobile-information").remove()
    }, S.prototype.listeners = function () {
        var b = this;
        a(".show-information").click(function () {
            b.that.showPopup("info", b.html)
        }), a(".mobile-information").click(function () {
            b.that.showPopup("mobile", b.html_mobile)
        }), a(".about-information").click(function () {
            b.that.showPopup("about", b.html_about)
        })
    };
    var T = function (a) {
        this.that = a
    };
    T.prototype.init = function () {
        this.listeners()
    }, T.prototype.listeners = function () {
        var b = this;
        a(document).keydown(function (a) {
            b.use(a.which)
        }), a(document).keyup(function (a) {
            b.end(a.which)
        })
    }, T.prototype.use = function (b) {
        if ("Text" == this.that.tool || this.that.keyEvent.ctrlKey && "pencil" == this.that.tool && !this.that.keyEvent.shiftKey || this.that.preventShortcut || this.that.developer) return void(this.that.mouse.active = !1);
        if (!this.that.online.status || 84 != b)
            if (this.that.keyEvent.shiftKey && !this.that.keyEvent.ctrlKey) {
                var c = this.that.FrameController.currentFrame;
                switch (b) {
                    case 65:
                        return this.that.FrameController.add();
                    case 68:
                        return this.that.FrameController.duplicate(parseInt(c));
                    case 88:
                        return this.that.SettingsController.toggleDithering();
                    default:
                        return this.that.ToolController.shft(!0)
                }
            } else if (this.that.keyEvent.ctrlKey && !this.that.keyEvent.shiftKey) switch (b) {
            case 187:
                return this.that.ZoomController["in"](!0);
            case 189:
                return this.that.ZoomController.minus(!0)
        } else if (this.that.keyEvent.ctrlKey && this.that.keyEvent.shiftKey) switch (b) {
            case 187:
                return this.that.ZoomController["in"](!0);
            case 189:
                return this.that.ZoomController.minus(!0)
        } else switch (this.that.mouse.active = !1, b) {
            case 80:
                return this.that.ToolController.selectTool(a("#pencil-tool"), "Pencil");
            case 69:
                return this.that.ToolController.selectTool(a("#eraser-tool"), "Eraser");
            case 76:
                return this.that.ToolController.selectTool(a("#line-tool"), "Line");
            case 81:
                return this.that.ToolController.selectTool(a("#square-tool"), "Square");
            case 67:
                return this.that.ToolController.selectTool(a("#circle-tool"), "Circle");
            case 66:
                return this.that.ToolController.selectTool(a("#bucket-tool"), "Bucket");
            case 78:
                return this.that.ToolController.selectTool(a("#bucket-color-tool"), "BucketColor");
            case 86:
                return this.that.ToolController.selectTool(a("#color-picker-tool"), "ColorPicker");
            case 77:
                return this.that.ToolController.selectTool(a("#move-tool"), "Move");
            case 83:
                return this.that.ToolController.selectTool(a("#select-tool"), "Select");
            case 84:
                return this.that.ToolController.selectTool(a("#text-tool"), "Text");
            case 68:
                return this.that.ToolController.selectTool(a("#lighten-darken-tool"), "LightenDarken");
            case 75:
                return this.that.ToolController.selectTool(a("#dithering-tool"), "Dithering");
            case 32:
                return this.that.PreviewController.previewFrames();
            case 88:
                return this.that.ColorController["switch"]();
            case 82:
                return this.that.ToolController.selectTool(a("#brush-tool"), "Brush")
        }
    }, T.prototype.end = function (a) {
        this.that.ToolController.shft(!1)
    };
    var U = function (a) {
        this.that = a, this.ratio = 1, this.dragging = !1, this.scrolling = !1, this.active = !1
    };
    U.prototype.init = function () {
        this.listeners(), this.set()
    }, U.prototype.set = function () {
        !this.that.settings.navigation, a(".navigation-scroller").height("auto"), this.that.height > this.that.width && this.that.height > 200 && a(".navigation-scroller").height(200)
    }, U.prototype.listeners = function () {
        var b = this;
        if (!this.that.isApp) {
            var c = a("#nav-placement").draggable({
                containment: "parent",
                drag: function () {
                    b.dragging = !0, b.updatePlacement()
                },
                stop: function () {
                    b.dragging = !1
                }
            });
            a("#drawing-canvas-conatiner").on("scroll", function () {
                b.dragging || (b.scrolling = !0, b.placement())
            }), a(document).on("mouseup", function () {
                b.scrolling && (b.scrolling = !1)
            }), a(".nav-canvas-img").mousedown(function (d) {
                var e = a(this).parent().offset(),
                    f = d.pageX - e.left,
                    g = d.pageY - e.top;
                b.clickPosition(f, g), c.trigger(d)
            }), a(".nav-canvas-img").bind("touchstart", function (d) {
                var e = d.originalEvent.touches[0],
                    f = a(this).parent().offset(),
                    g = e.pageX - f.left,
                    h = e.pageY - f.top;
                e.type = "mousedown.draggable", b.clickPosition(g, h), c.trigger(e)
            }), a(".nav-canvas-img").bind("touchmove", function (d) {
                if (!b.dragging) {
                    var e = d.originalEvent.touches[0],
                        f = a(this).parent().offset(),
                        g = e.pageX - f.left,
                        h = e.pageY - f.top;
                    e.type = "mousedown.draggable", b.clickPosition(g, h), c.trigger(e)
                }
            })
        }
    }, U.prototype.clickPosition = function (b, c) {
        var d = a("#nav-placement"),
            e = a(".navigation-scroller"),
            f = d.width(),
            g = d.height();
        b -= f / 2, c -= g / 2;
        var h = b + f / 2 + f,
            i = c + g / 2 + g;
        b < 0 && (b = 0), c < 0 && (c = 0), h > e.width() && (b = e.width() - f), i > e.height() && (c = e.height() - g), a(".nav-placement").css({
            top: c,
            left: b
        }), this.updatePlacement()
    }, U.prototype.updatePlacement = function () {
        if (!this.that.isApp) {
            var b = a("#drawing-canvas-conatiner"),
                c = a("#canvas-layers-container"),
                d = a("#nav-placement").position(),
                e = a(".nav-placement"),
                f = d.left * this.ratio,
                g = d.top * this.ratio,
                h = Math.abs(e.width()),
                i = Math.abs(e.height());
            e.width(h).height(i);
            var j = (c.width() / (this.that.ZoomController.phase + 1), c.height() / (this.that.ZoomController.phase + 1), f / this.that.ZoomController.phase),
                k = g / this.that.ZoomController.phase,
                l = c.width() / b.width(),
                m = c.height() / b.height();
            j = (Math.ceil(j) + l / 2) / this.that.pixel_size, k = (Math.ceil(k) + m / 2) / this.that.pixel_size, this.that.ZoomController.last_x = j, this.that.ZoomController.last_y = k, b.scrollLeft(f).scrollTop(g)
        }
    }, U.prototype.placement = function () {
        if (!this.that.isApp) {
            var b = a("#drawing-canvas-conatiner"),
                c = b.width(),
                d = b.height(),
                e = a("#canvas-layers-container"),
                f = e.width(),
                g = e.height(),
                h = a("#nav-canvas-img"),
                i = h.width(),
                j = h.height();
            f > g ? this.ratio = f / i : this.ratio = g / j;
            var k = c / this.ratio,
                l = d / this.ratio,
                m = b.scrollLeft(),
                n = b.scrollTop(),
                o = m / this.ratio,
                p = n / this.ratio;
            k -= 3, l -= 3, a(".nav-placement").show().css({
                top: p,
                left: o
            }).width(k).height(l), k > i && l > j && a(".nav-placement").hide()
        }
    }, U.prototype.update = function (b) {
        return !!this.that.settings.navigation && void a("#nav-canvas-img").show().attr("src", b)
    };
    var V = function (a) {
        this.that = a
    };
    V.prototype.init = function () {
        this.listeners()
    }, V.prototype.listeners = function () {
        var b = this;
        a("#align-left").click(function () {
            b.that.alignLeft()
        }), a("#align-right").click(function () {
            b.that.alignRight()
        }), a("#align-top").click(function () {
            b.that.alignTop()
        }), a("#align-bottom").click(function () {
            b.that.alignBottom()
        }), a("#align-center").click(function () {
            b.that.alignCenter()
        })
    };
    var W = function (a) {
        this.that = a, this.owner = !1, this.config = !1, this.database = null, this.pingTimer = !1, this.whosOnlineTimer = !1
    };
    W.prototype.init = function () {
        this.that.online && (this.create(), this.activate(), this.that.HistoryController.undo = [], this.initLayers(), this.listen(), this.ping(), this.whosOnlineCheck())
    }, W.prototype.ping = function () {
        var a = this;
        this.pingTimer = setTimeout(function () {
            a.updateOnlineStatus()
        }, 3e5)
    }, W.prototype.whosOnlineCheck = function () {
        var a = this;
        this.whosOnlineTimer = setTimeout(function () {
            a.updateWhosOnline()
        }, 12e4)
    }, W.prototype.updateWhosOnline = function () {
        var b = this,
            c = this.that.online.database,
            d = "room_id=" + c;
        a.ajax({
            type: "GET",
            url: "/online/whos-online/" + c,
            data: d,
            cache: !1,
            processData: !1,
            contentType: !1,
            success: function (c) {
                "success" == c.status && (clearTimeout(b.whosOnlineTimer), b.whosOnlineCheck(), a(".online-users-append").html(c.data))
            },
            fail: function () {
                console.info("Status not updated.")
            },
            error: function () {
                console.info("Status not updated.")
            }
        })
    }, W.prototype.updateOnlineStatus = function () {
        var b = this,
            c = this.that.online.database,
            d = "room_id=" + c;
        a.ajax({
            type: "GET",
            url: "/online/status/" + c,
            data: d,
            cache: !1,
            processData: !1,
            contentType: !1,
            success: function (a) {
                "success" == a.status && (clearTimeout(b.pingTimer), b.ping())
            },
            fail: function () {
                console.info("Status not updated.")
            },
            error: function () {
                console.info("Status not updated.")
            }
        })
    }, W.prototype.create = function () {
        this.config = {
            apiKey: "AIzaSyDMqjJEFfQSFQ9wD1wQ3iF-4Y6C5JoZ2Vk",
            authDomain: "pixilart-drawing.firebaseapp.com",
            databaseURL: "https://pixilart-drawing.firebaseio.com"
        }, firebase.initializeApp(this.config), this.database = firebase.database()
    }, W.prototype.activate = function () {
        this.removeElements(), this.that.autosave.status = !1, a("#drawing-canvas-conatiner").addClass("full")
    }, W.prototype.removeElements = function () {
        a("#frames-placement").remove(), a("#delete-layer, #duplicate-layer, #move-layer.merge, #add-layer, #rename-layer, .online-remove").remove(), a(".online-hidden").addClass("hidden")
    }, W.prototype.listen = function () {
        var b = this,
            c = this.database.ref(this.that.online.database + "/layers");
        c.on("child_changed", function (c) {
            function d(a, d) {
                var e = new Image;
                return e.onload = function () {
                    b.that.LayerController.layers[a].src = this, b.that.LayerController.layers[a].opacity = parseFloat(d), b.that.updateDisplayCanvas(b.that.LayerController.layers, b.that.LayerController.currentLayer), b.that.render()
                }, e.src = c.val().src, !1
            }
            c.val().name != b.that.online.layer_id && a.each(b.that.LayerController.layers, function (a, b) {
                if (c.val().name == b.name) return d(a, c.val().opacity)
            })
        })
    }, W.prototype.initLayers = function () {
        function a() {
            b.on("child_added", function (a) {
                var b = new Image;
                d.that.online.layer_id == a.val().name && (b.tag = !0, e = !0), b.onload = function () {
                    d.that.LayerController.addLayer(!1, a.val().name, this, a.val().opacity), d.that.LayerController.select(), c.push("null"), this.tag && !f && (d.that.LayerController.currentLayer = c.length, d.that.LayerController.select(), f = !0), d.that.FrameController.updateFramePreview()
                }, b.src = a.val().src
            }), setTimeout(function () {}, 3e3)
        }
        var b = this.database.ref(this.that.online.database + "/layers"),
            c = [],
            d = this,
            e = !1,
            f = !1;
        this.database.ref(this.that.online.database + "/layers/" + this.that.online.layer_id).once("value").then(function (b) {
            b.hasChildren() ? a() : (d.writeLayer(), a())
        })
    }, W.prototype.write = function (a, b) {
        if (this.that.online.status) {
            this.that.online.database;
            this.database.ref(this.that.online.database + "/" + a).set(b)
        }
    }, W.prototype.writeLayer = function () {
        if (this.that.online.status) {
            var a = this.that.canvas.layer.dataURL(),
                b = "layers/" + this.that.online.layer_id,
                c = this.that.LayerController.layers[this.that.LayerController.currentLayer],
                d = {
                    name: this.that.online.layer_id,
                    src: a,
                    opacity: c.opacity
                };
            this.write(b, d)
        }
    };
    var X = function (a) {};
    X.prototype.buildButton = function () {};
    var Y = {
            version: 1.8,
            theme: {
                white: !1
            },
            ons: !1,
            id: !1,
            isAuth: !1,
            name: "pixil_art_drawing_app",
            website: "pixilart.com",
            fileName: "Untitled",
            drawingName: !1,
            debug: !1,
            developer: !1,
            loading: !1,
            layers: [],
            canvas: {},
            current_layer: 1,
            current_frame: 1,
            width: 100,
            height: 100,
            minWidth: 8,
            minHeight: 8,
            maxWidth: 700,
            maxHeight: 700,
            edit: {
                status: !1,
                image_src: !1,
                image: !1,
                resize: !1,
                force: !1
            },
            isWindowsIE: !1,
            pixel_size: 1,
            zoom_ratio: 1,
            zoom_step: 1,
            zoom: {
                type: "CSS",
                left: 0,
                top: 0,
                ratio: 1,
                pixel_size: 1
            },
            pixelDrawingSize: 1,
            previewSize: 1,
            maxLayers: 15,
            panX: 0,
            panY: 0,
            element: null,
            mouseEvent: !1,
            keyEvent: !1,
            tool: "Pencil",
            tools: {},
            pixelPerfect: {
                status: !1,
                last: {
                    x: 0,
                    y: 0
                },
                set: 0,
                direction: "",
                previous: !1,
                history: [],
                preHistory: []
            },
            backgroundImage: {
                status: !0,
                image: "",
                init: !1
            },
            onionSkin: {
                status: !0,
                image: !1,
                opacity: .2
            },
            grid: {
                status: !1,
                data: !1,
                opacity: .2,
                canvas: !1
            },
            checker: {
                status: !0,
                data: !1,
                opacity: .15
            },
            downloadSizes: {
                layer: 1,
                frame: 1,
                gif: 1
            },
            autosave: {
                status: !0,
                timer: 6e4,
                cookieName: "pas",
                timeout: !0,
                loaded: !1
            },
            renderAfter: [],
            mirror: {
                x: !1,
                y: !1,
                tools: ["Pencil", "LightenDarken", "Line", "Eraser"]
            },
            finished: !1,
            layerAboveCache: !1,
            layerBelowCache: !1,
            closePopup: !0,
            ads: {
                startTime: 5e3,
                autloadTime: 15e4,
                bottomPlacement: !1,
                adElementWidth: !1,
                status: !0,
                show: !0,
                timer: !1
            },
            isMobile: !1,
            isTablet: !1,
            isIpad: !1,
            isApp: !1,
            isCustomSize: !1,
            preventShortcut: !1,
            newShow: !0,
            rainbow: {
                status: !1,
                color: !1,
                turn: "r",
                direction: "up",
                current: 0,
                r: "up",
                g: "up",
                b: "up",
                h: !1
            },
            randomColor: {
                status: !1
            },
            fullscreen: {
                status: !1,
                text: "Full Screen",
                exit: "Exit Full Screen"
            },
            settings: {
                showHue: !1,
                whiteIsTransparent: !1,
                dithering: !1,
                extras: !0,
                navigation: !0,
                extrasColors: !1,
                isoLines: !1,
                canvasZoomDefault: !1,
                disableDownloadSubmit: !1,
                disableScrollZoom: !1,
                lockFrames: !1,
                framesLeft: !1,
                controllersLoaded: !1,
                spacing: 10,
                brush: {
                    status: !0,
                    fill: !0,
                    image: !1,
                    mouse: !1,
                    solid: !1,
                    height: 0,
                    width: 0,
                    spacing: 0,
                    alpha: 1,
                    track: !0
                },
                bucket: {
                    allColors: !1,
                    clear: !1
                },
                lightendarken: {
                    light: !1,
                    strengh: 1
                }
            },
            clickCount: !1,
            isChrome: !1,
            chromeVersion: 0,
            online: {
                status: !1,
                database: "",
                layer_id: "null-false-aksjdasdjok34908weduaadjlsdaasdsadasd",
                send: !1
            },
            alert: {
                s: !1
            },
            fileDrawing: !1,
            antiAliasingLog: [],
            options: {
                skipNew: !1
            },
            app: {
                ready: !1,
                hideMouse: !1,
                fingerToDraw: !1,
                resizeOnNew: !1,
                edit_id: !1,
                frameSpeed: 100,
                isLoaded: !1,
                isGif: !1,
                callback: !1,
                frames: !1,
                speed: 100
            },
            init: function (d, e, f, g, h) {
                var i = a("#online");
                this.id = Date.now(), i.length >= 1 && (this.online.status = !0, this.online.database = i.attr("data-online-id"), this.online.layer_id = i.attr("data-layer-id")), g && (this.app.callback = g), a("body").data("user") && (this.isAuth = !0), h && (this.ons = h), this.FileController = new Q(this), this.FileController.init();
                var j = new c(0, "Background");
                if (j.init(), d && (this.width = parseInt(d)), e && (this.height = parseInt(e)), this.FileController.checkRatio(this.width, this.height) && (this.width = 256, this.height = 144), "object" == typeof f && ("string" == typeof f.image && ["gif", "png"].indexOf(this.fileExtension(f.image)) != -1 && (this.edit.status = !0), "boolean" == typeof f.skipNew && (this.options.skipNew = !0), f.isApp && (this.app.ready = !1, this.customSize = !0, f.name && (this.drawingName = f.name), f.image && (this.edit.status = !0, this.id = f.id), f.art_id && (this.app.edit_id = f.art_id), f.frames ? this.app.frames = f.frames : this.app.frames = !1, this.app.speed = f.speed ? f.speed : 100)), this.checkMobile(h), this.checkTablet(), this.checkUserAgent(), this.checkCanvasZoom(), this.validateSize(this.width, this.height), this.isWindowsIE && !this.edit.status && (this.width = 256, this.height = 144), setTimeout(function () {
                        a(".older-version-text").show()
                    }, 5e3), this.settings.controllersLoaded || (this.HistoryController = new A(this), this.HistoryController.init(), this.FrameController = new D(this), this.FrameController.init(), this.LayerController = new C(this), this.LayerController.init(j), this.ColorController = new E(this), this.ColorController.init(), this.SelectController = new H(this), this.SelectController.init(), this.ToolController = new y(this), this.ToolController.init(), this.PreviewController = new G(this), this.PreviewController.init(), this.KeyboardController = new I(this), this.KeyboardController.init(), this.TextController = new J(this), this.TextController.init(), this.PopupController = new N(this), this.PopupController.init(), this.SettingsController = new K(this), this.SettingsController.init(), this.StampController = new M(this), this.StampController.init(), this.GifController = new O(this), this.GifController.init(), this.HueController = new L(this), this.HueController.init(), this.ExportImportController = new P(this), this.ExportImportController.init(), this.SubmitController = new R(this), this.SubmitController.init(), this.InfoController = new S(this), this.InfoController.init(), this.ShortcutController = new T(this), this.ShortcutController.init(), this.AlignController = new V(this), this.AlignController.init(), this.AdController = new z(this), this.AdController.init()), this.getPixelRatio(), this.canvas.layer = new b(this.width, this.height, "layer", (!0), (!1), (!1), this), this.canvas.layer.ctx = this.canvas.layer.context(), this.canvas.layer.empty = this.canvas.layer.clear(!0), this.canvas.top = new b(this.width, this.height, "top", (!0), (!1), (!1), this), this.canvas.top.ctx = this.canvas.top.context(), this.canvas.top.empty = this.canvas.top.clear(!0), this.canvas.bottom = new b(this.width, this.height, "bottom", (!0), (!1), (!1), this), this.canvas.bottom.ctx = this.canvas.bottom.context(), this.canvas.bottom.empty = this.canvas.bottom.clear(!0), this.canvas.select = new b(this.width, this.height, "select", (!0), (!1), (!1), this), this.canvas.select.ctx = this.canvas.select.context(), this.canvas.select.empty = this.canvas.select.clear(!0), this.canvas.rendering = new b(this.width, this.height, "rendering", (!0), (!1), (!1), this), this.canvas.rendering.ctx = this.canvas.rendering.context(), this.canvas.rendering.empty = this.canvas.rendering.clear(!0), this.canvas.data = new b(this.width, this.height, "data", (!0), (!1), (!1), this), this.canvas.data.ctx = this.canvas.data.context(), this.canvas.data.empty = this.canvas.data.clear(!0), this.canvas.display = new b(this.width, this.height, "display", (!1), this.pixel_size, "canvas-layers-appened", this), this.canvas.display.ctx = this.canvas.display.context(), this.OnlineController = new W(this), this.NavigationController = new U(this), this.NavigationController.init(), this.ZoomController = new F(this, this.canvas.display, this.zoom.type), this.ZoomController.init(), this.resizeCanvases(), this.element = document.getElementById("canvas-layers-appened"), this.mouse = new B(this), this.mouse.listeners(), this.begin(), document.getElementsByTagName("img").ondragstart = function () {
                        return !1
                    }, "object" == typeof f && "string" == typeof f.image) this.clickCount = !0, this.edit.status ? (this.newShow = !1, this.edit.image_src = f.image, f.resize && (this.edit.resize = f.resize), this.getEditImage()) : this.ready();
                else {
                    this.ready();
                    var k = "tipHelper";
                    if (!this.readCookie(k) && !this.isMobile && !this.isTablet) {
                        this.hidePopup(), a("#ad-popup-content").hide();
                        var l = this,
                            m = new tipStepper(k, function () {
                                l.newShow = !1, l.clickCount || l.online.status || l.FileController.showPopup()
                            });
                        m.init()
                    }
                }
                if (this.online.status) {
                    var m = new tipStepper(k, function () {}, "#forced-step", (!0));
                    m.init()
                }
            },
            checkUserAgent: function () {
                var b = navigator.userAgent.toLowerCase();
                b.indexOf("safari") == -1 || this.isMobile || this.isTablet || b.indexOf("chrome") > -1 || b.indexOf("opera") > -1 || b.indexOf("opr") > -1 || a("body").append("<style> #drawing-container #drawing-canvas-conatiner { height: calc(100% - 75px); } </style>"), /MSIE 10/i.test(navigator.userAgent) && this.isIE(), (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) && (a("body").addClass("ie"), this.isIE()), /Edge\/\d./i.test(navigator.userAgent) && this.isIE()
            },
            isIE: function () {
                this.isWindowsIE = !0, this.zoom.type = "Canvas", a("#resize-pix, .navigation-scroller").hide()
            },
            checkScreenSize: function () {
                var b = a(window).height() - a("#toolbar").height() - a("#frames-placement").height();
                a(".screen-sizer").height(b)
            },
            begin: function () {
                a(".older-version-text").remove(), this.checkScreenSize(), this.checkSmoothing(), this.listerners(), this.showChecker(!0), this.showGrid(!0), this.settings.controllersLoaded = !0, this.ToolController.showOptions()
            },
            ready: function () {
                if (this.finished = !0, this.app.ready = !0, this.finishLoading(), this.PreviewController.close(), a(".app-start-section").remove(), a(".after-app-ready-show").show(), this.FrameController.updateFramePreview(!1, !0), this.HistoryController.newCanvas(), this.online.status && this.OnlineController.init(), this.checkConditions(), this.edit.status || this.isMobile || this.autosave.loaded || this.online.status || this.options.skipNew || this.FileController.showPopup(), a("#debug").length && (this.enableDebug(), this.ads.status = !1), a(".no-ads").length && (this.ads.status = !1), this.FileController.updateDimensions(), this.checkSettings(), this.checkTheme(), this.loadAds(), this.doFinal(), this.app.callback) return this.app.callback(this)
            },
            doFinal: function () {
                setTimeout(function () {
                    a(".ui-helper-hidden-accessible").remove()
                }, 3e3)
            },
            enableDebug: function () {
                a(".hidden-canvas").removeClass("hidden-canvas"), this.debug = !0
            },
            checkConditions: function () {
                if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
                    this.isChrome = !0;
                    var a = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                    this.chromeVersion = !!a && parseInt(a[2], 10)
                }
            },
            getPixelRatio: function (b, c) {
                var d = a("#drawing-canvas-conatiner"),
                    e = !!b,
                    f = b ? b : 75,
                    g = 10,
                    h = 1;
                !e && this.height >= 500 && (f = 75);
                var i = d.height(),
                    j = d.width(),
                    k = 0,
                    l = parseInt(i - f) / this.height;
                this.width > this.height && (k = parseInt(j - f) / this.width), h = l, l > k && k > 0 && (h = k), h = this.height == this.width && this.width <= 200 && !this.isMobile ? Math.floor(h) : this.round(h, .25), this.isMobile && !this.isTablet && (h = i > a(window).width() || this.isApp && !c ? parseInt(a(window).width() - g) / this.width : parseInt(i - g) / this.width, this.isApp || (this.pixelPerfect.status = !0), this.isApp && c), h = h <= 0 ? 1 : h, this.previewSize = h, this.pixel_size = h
            },
            render: function () {
                this.loading = !0, this.canvas.display.clear(), this.draw(), this.checkSmoothing(), this.startData(), this.LayerController.render(), this.endData(), this.loading = !1
            },
            mouseEnded: function () {
                this.updateImageStorage()
            },
            checkSmoothing: function () {
                "CSS" != this.zoom.type && (this.canvas.display.ctx.imageSmoothingEnabled && (this.canvas.display.ctx.imageSmoothingEnabled = !1), this.canvas.display.ctx.mozImageSmoothingEnabled && (this.canvas.display.ctx.mozImageSmoothingEnabled = !1), this.canvas.display.ctx.webkitImageSmoothingEnabled && (this.canvas.display.ctx.webkitImageSmoothingEnabled = !1), this.canvas.display.ctx.msImageSmoothingEnabled && (this.canvas.display.ctx.msImageSmoothingEnabled = !1))
            },
            draw: function () {
                this.ToolController.use()
            },
            debugParse: function (a) {
                Y.debug && console.log(a)
            },
            listerners: function () {
                function b() {
                    a("#frames-container").stop().slideUp(500), d = !1
                }
                var c = this,
                    d = !1,
                    e = a("#frames-placement");
                this.commonListeners(), this.debug && a(".hidden-canvas").css({
                    visibility: "visible"
                }), a(".prevent-a").click(function (a) {
                    a.preventDefault()
                }), this.isMobile && !this.isTablet || (a(".panel-frames-header").on("pointerdown", function (e) {
                    if (!c.settings.lockFrames) {
                        var f = e.target.id;
                        null != f && "" != f.trim() && f || (f = e.target.parentNode.id), ["preview"].indexOf(f) > -1 || (!d || ["duplicate-frame", "add-frame", "preview-size-change", "toggle-frame-panel"].indexOf(f) > -1 ? (a("#frames-container").stop().slideDown(500), d = !0) : b())
                    }
                }), a(document).on("pointerdown", function (a) {
                    d && (e.is(a.target) || 0 !== e.has(a.target).length || b())
                })), a("#full-screen").click(function (b) {
                    var d = document.body,
                        e = a("#full-screen-text");
                    c.fullscreen.status = !0, a("#drawing-wrapper").addClass("fullscreen"), c.requestFullScreen(d, e)
                }), a(".toggle-sub").click(function () {
                    a(this).toggleClass("active")
                }), a(".header-app-button").mouseleave(function () {
                    a(this).removeClass("active")
                }), a(".ad-close").click(function () {
                    c.loadAdsWrapper()
                }), a(".alert-close").click(function () {
                    a(".alert-response-container").removeClass("active")
                }), a(".outlinks-menu .sub-menu-link").click(function () {
                    var b = a(this).attr("href");
                    window.location.href = b
                }), this.isMobile ? (a("#tools-toggle").mouseup(function () {
                    a("#left-sidebar").toggleClass("active")
                }), a("#layers-toggle").mouseup(function () {
                    a("#right-sidebar").toggleClass("active")
                }), a("#frames-toggle").mouseup(function () {
                    a("#frames-placement").hasClass("active") ? a("#frames-placement").removeClass("active") : a("#frames-placement").addClass("active")
                }), a(document).bind("mousedown", function (b) {
                    var c = a("#frames-toggle");
                    a("#left-sidebar").removeClass("active"), a("#right-sidebar").removeClass("active"), c.is(b.target) || 0 !== c.has(b.target).length || a("#frames-placement").removeClass("active")
                }), a("canvas").bind("touchstart", function () {
                    a("#frames-placement").removeClass("active")
                })) : a(document).ready(function () {
                    a(".ttip").tooltipJQ({
                        track: !0
                    })
                }), a(".dragable").draggable({
                    handle: ".drag-handle"
                })
            },
            checkSettings: function () {
                var a = this.readCookie("pixil-prevent-download-submit"),
                    b = this.readCookie("pixil-disable-scroll-zoom");
                a && "true" == a && (this.settings.disableDownloadSubmit = !0), b && "true" == b && (this.settings.disableScrollZoom = !0)
            },
            checkCanvasZoom: function () {
                var b = this.readCookie("pixil-canvas-zoom");
                b && "true" == b && (this.zoom.type = "Canvas", this.settings.canvasZoomDefault = !0, a(".frames-lock-wrapper").remove())
            },
            checkTheme: function () {
                var a = this.readCookie("pixil-theme");
                a && "true" == a && (this.theme.white = a, this.changeTheme())
            },
            changeTheme: function () {
                this.theme.white ? (a("#header-logo").attr("src", "/images/public/logo_pixilart_simple_black.png"), a("#drawing-wrapper").addClass("lighter")) : (a("#header-logo").attr("src", "/images/public/logo_pixilart_simple_full.png"), a("#drawing-wrapper").removeClass("lighter"))
            },
            updateImageStorage: function () {
                if (this.isApp) {
                    var a = "app-drawings",
                        b = this.getStorage(a),
                        c = this.FrameController.currentFrame,
                        d = new Date;
                    d.setSeconds(0, 0), d.toISOString(), b ? b = JSON.parse(b) : (b = {}, this.putStorage(a, JSON.stringify(b))), b[this.id] || (b[this.id] = {
                        id: this.id,
                        name: this.drawingName ? this.drawingName : this.id,
                        image: null,
                        width: this.width,
                        height: this.height,
                        updated_at: d,
                        created_at: d,
                        art_edit_id: this.app.edit_id,
                        speed: 100,
                        frames: [""]
                    }), "undefined" == typeof b[this.id].frames && (b[this.id].frames = [""]);
                    var e = this.canvas.layer.dataURL();
                    return b[this.id].image = e, b[this.id].frames[c] = e, b[this.id].updated_at = d, this.putStorage(a, JSON.stringify(b)), b[this.id]
                }
            },
            updateAppFrames: function () {
                var b = this;
                if (this.isApp && this.app.ready) {
                    var c = "app-drawings",
                        d = this.getStorage(c);
                    d = JSON.parse(d), d[this.id] && (d[this.id].frames = [], this.FrameController.flattenAll(!1, 1, function (e) {
                        var f = 0;
                        d[b.id].image = e[e.length - 1].src, a.each(e, function (a) {
                            d[b.id].frames.push(e[a].src), f++, f == e.length && b.putStorage(c, JSON.stringify(d))
                        })
                    }))
                }
            },
            updateFrameSpeed: function (a) {
                var b = "app-drawings",
                    c = this.getStorage(b);
                c = JSON.parse(c), c[this.id] && (c[this.id].speed = a, this.putStorage(b, JSON.stringify(c)))
            },
            setAppSettings: function () {
                this.app.hideMouse && a(".pixel-trace").addClass("hide-mouse"), this.app.fingerToDraw && a(".pixel-trace").hide()
            },
            layPixel: function (a, b, c, d, e, f, g) {
                c || (a = a ? a : this.mouse.x_0, b = b ? b : this.mouse.y_0);
                var h = this.pixelDrawingSize;
                return e = e ? e : "layer", d = d ? d : this.getDrawingcolor(), 1 == this.pixelDrawingSize || f || (a -= this.pixelDrawingSize / 2, b -= this.pixelDrawingSize / 2), f && (h = f), !(this.settings.dithering && this.isOdd(a) && this.isOdd(b) || this.settings.dithering && !this.isOdd(a) && !this.isOdd(b)) && void this.drawPixel(e, a, b, d, h, g)
            },
            drawPixel: function (a, b, c, d, e, f) {
                if ("Brush" == this.tool && this.settings.brush.image && !f) {
                    var g = Math.floor(b - this.settings.brush.width / 2),
                        h = Math.floor(c - this.settings.brush.height / 2),
                        i = this.settings.brush.fill ? this.settings.brush.solid : this.settings.brush.image;
                    1 !== this.settings.brush.alpha && this.canvas[a].setAlpha(this.settings.brush.alpha), this.canvas[a].putSimple(i, g, h), 1 !== this.settings.brush.alpha && this.canvas[a].restoreAlpha()
                } else this.canvas[a].ctx.fillStyle = d, this.canvas[a].ctx.fillRect(b, c, e, e)
            },
            getDrawingcolor: function () {
                var a = this.ColorController.color;
                return this.rainbow.status && (a = this.getRainbowColor()), this.randomColor.status && (a = this.getRandomColorPallet()), a
            },
            renderPixel: function (a, b, c, d, e, f) {
                c || (a = a ? a : this.mouse.x_0, b = b ? b : this.mouse.y_0), e = e ? e : "rendering", f = f ? f : this.pixelDrawingSize;
                var g = this.mouse.absPosition(a, b),
                    h = this.mouse.absPosition(this.pixelPerfect.last.x, this.pixelPerfect.last.y);
                if (d = d ? d : this.getDrawingcolor(), this.pixelPerfect.preHistory.indexOf(g) === -1 && this.pixelPerfect.history.indexOf(g) === -1 && this.pixelPerfect.preHistory.push(g), this.pixelPerfect.preHistory.length > 3) {
                    var i = this.pixelPerfect.preHistory[0];
                    this.pixelPerfect.preHistory.shift(), this.pixelPerfect.history.indexOf(g) === -1 && this.pixelPerfect.history.push(i)
                }
                if (this.pixelPerfect.status && 1 == f) {
                    var j = this.pixelPerfect.direction;
                    this.pixelPerfect.last.x, this.pixelPerfect.last.y;
                    this.pixelPerfect.last.x == a && this.pixelPerfect.last.y == b || this.pixelPerfect.set++, (this.pixelPerfect.last.x == a && this.pixelPerfect.last.y != b && "left" == this.pixelPerfect.direction && this.pixelPerfect.set > 1 || this.pixelPerfect.last.x != a && this.pixelPerfect.last.y == b && "top" == this.pixelPerfect.direction && this.pixelPerfect.set > 1) && this.pixelPerfect.history.indexOf(h) === -1 && (this.canvas[e].ctx.clearRect(this.pixelPerfect.last.x, this.pixelPerfect.last.y, 1, 1), this.pixelPerfect.set = 0), this.pixelPerfect.last.x != a && this.pixelPerfect.last.y != b && (this.pixelPerfect.set = 0), this.pixelPerfect.last.x != a && (this.pixelPerfect.last.y == b && (j = "left"), this.pixelPerfect.last.x = a), this.pixelPerfect.last.y != b && (this.pixelPerfect.last.x == a && (j = "top"), this.pixelPerfect.last.y = b), j != this.pixelPerfect.direction && (this.pixelPerfect.set > 1 && (this.pixelPerfect.set = 0), this.pixelPerfect.direction = j)
                }
                return 1 != f && (a -= f / 2, b -= f / 2), !(this.settings.dithering && this.isOdd(a) && this.isOdd(b) || this.settings.dithering && !this.isOdd(a) && !this.isOdd(b)) && void this.drawPixel(e, a, b, d, this.pixelDrawingSize)
            },
            ditheringLayPixel: function (a, b, c, d) {
                var a = a ? a : this.mouse.x_0,
                    b = b ? b : this.mouse.y_0,
                    c = c ? c : this.ColorController.color;
                (this.isOdd(a) && this.isOdd(b) || !this.isOdd(a) && !this.isOdd(b)) && (d && "rendering" == d ? this.renderPixel(a, b) : this.layPixel(a, b))
            },
            getPixelHex: function (a, b, c) {
                var d = a.getImageData(b, c, 1, 1);
                return this.rgbaToHex(d[0], d[1], d[2])
            },
            clearPixel: function (a, b, c) {
                var d = this.pixelDrawingSize;
                c || (a = a ? a : this.mouse.x_0, b = b ? b : this.mouse.y_0), c && (d = 1), 1 != d && (a -= d / 2, b -= d / 2), this.canvas.layer.ctx.clearRect(a, b, d, d)
            },
            mouseDistance: function () {
                var a = 2 * this.mouse.err;
                return a > -this.mouse.dy && (this.mouse.err = this.mouse.err - this.mouse.dy, this.mouse.x_0 = this.mouse.x_0 + this.mouse.sx), a < this.mouse.dx && (this.mouse.err = this.mouse.err + this.mouse.dx, this.mouse.y_0 = this.mouse.y_0 + this.mouse.sy), this.mouse.x0 = this.mouse.x_0, this.mouse.x1 = this.mouse.x_0, [this.mouse.x_0, this.mouse.x_0]
            },
            mirrorDrawing: function (a, b, c, d, e) {
                if (this.mirror.tools.indexOf(this.tool) !== -1) {
                    var f = !1;
                    if (this.keyEvent && this.keyEvent.ctrlKey && ["Pencil"].indexOf(this.tool) !== -1 && (f = !0), this.mouse.active) {
                        d = d ? d : this.mouse.x_0, e = e ? e : this.mouse.y_0;
                        var g = this.width - (d + 1),
                            h = this.height - (e + 1);
                        this.mirror.x && (f ? this.ditheringLayPixel(g, this.mouse.y_0, a) : b && "rendering" == b ? this.renderPixel(g, this.mouse.y_0, !1, a) : (this.layPixel(g, this.mouse.y_0, !1, a), c && this.clearPixel(g, this.mouse.y_0))), this.mirror.y && (f ? this.ditheringLayPixel(this.mouse.x_0, h, a) : b && "rendering" == b ? this.renderPixel(this.mouse.x_0, h, !1, a) : (this.layPixel(this.mouse.x_0, h, !1, a), c && this.clearPixel(this.mouse.x_0, h))), this.mirror.x && this.mirror.y && (f ? this.ditheringLayPixel(g, h, a) : b && "rendering" == b ? this.renderPixel(g, h, !1, a) : (this.layPixel(g, h, !1, a), c && this.clearPixel(g, h)))
                    }
                }
            },
            rgbaToHex: function (a, b, c) {
                return (a > 255 || b > 255 || c > 255) && (a > 255 && (a = 255), b > 255 && (b = 255), c > 255 && (c = 255)), (a << 16 | b << 8 | c).toString(16)
            },
            trim: function (a) {
                return a.replace(/^\s+|\s+$/gm, "")
            },
            realRgbaToHex: function (a) {
                var b = a.substring(a.indexOf("(")).split(","),
                    c = parseInt(this.trim(b[0].substring(1)), 10),
                    d = parseInt(this.trim(b[1]), 10),
                    e = parseInt(this.trim(b[2]), 10),
                    f = parseFloat(this.trim(b[3].substring(0, b[3].length - 1))).toFixed(2);
                return c.toString(16) + d.toString(16) + e.toString(16) + (255 * f).toString(16).substring(0, 2)
            },
            hexToRgb: function (a) {
                var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
                return b ? {
                    r: parseInt(b[1], 16),
                    g: parseInt(b[2], 16),
                    b: parseInt(b[3], 16)
                } : null
            },
            HSVtoRGB: function (a, b, c) {
                var d, e, f, g, h, i, j, k;
                switch (1 === arguments.length && (b = a.s, c = a.v, a = a.h), g = Math.floor(6 * a), h = 6 * a - g, i = c * (1 - b), j = c * (1 - h * b), k = c * (1 - (1 - h) * b), g % 6) {
                    case 0:
                        d = c, e = k, f = i;
                        break;
                    case 1:
                        d = j, e = c, f = i;
                        break;
                    case 2:
                        d = i, e = c, f = k;
                        break;
                    case 3:
                        d = i, e = j, f = c;
                        break;
                    case 4:
                        d = k, e = i, f = c;
                        break;
                    case 5:
                        d = c, e = i, f = j
                }
                return {
                    r: Math.round(255 * d),
                    g: Math.round(255 * e),
                    b: Math.round(255 * f)
                }
            },
            RGBtoHSV: function (a, b, c) {
                1 === arguments.length && (b = a.g, c = a.b, a = a.r);
                var d, e = Math.max(a, b, c),
                    f = Math.min(a, b, c),
                    g = e - f,
                    h = 0 === e ? 0 : g / e,
                    i = e / 255;
                switch (e) {
                    case f:
                        d = 0;
                        break;
                    case a:
                        d = b - c + g * (b < c ? 6 : 0), d /= 6 * g;
                        break;
                    case b:
                        d = c - a + 2 * g, d /= 6 * g;
                        break;
                    case c:
                        d = a - b + 4 * g, d /= 6 * g
                }
                return {
                    h: d,
                    s: h,
                    v: i
                }
            },
            displayCanvasLocation: function () {
                var a = this.pixel_size,
                    b = a * this.zoom_step,
                    c = this.mouse.x_1 - Math.abs(this.zoom.left / b),
                    d = this.mouse.y_1 - Math.abs(this.zoom.top / b);
                "CSS" == this.zoom.type && (b = 1, c = this.mouse.x_1, d = this.mouse.y_1);
                var e = c * b,
                    f = d * b,
                    g = this.pixelDrawingSize;
                return ["BucketClear", "Bucket", "BucketColor", "Select", "Text", "ColorPicker", "Move", "Dithering", "Stamp", "LightenDarken", "Brush"].indexOf(this.tool) != -1 && (g = 1), 1 != g && (b = g * b, e -= b / 2, f -= b / 2), {
                    x: e,
                    y: f,
                    pixelSize: b
                }
            },
            createGrid: function (a) {
                a = a ? a : "display", this.canvas[a].clear();
                for (var b = this.canvas[a].ctx, c = this.width * this.pixel_size, d = this.height * this.pixel_size, e = 0; e <= c * this.pixel_size; e += this.pixel_size) b.moveTo(e, 0), b.lineTo(e, d);
                for (var f = 0; f <= d * this.pixel_size; f += this.pixel_size) b.moveTo(0, f), b.lineTo(c, f);
                b.strokeStyle = "#000000", b.stroke(), this.grid.data = this.canvas[a].image(), "grid" != a && this.canvas[a].clear()
            },
            createCssDisplayGrid: function () {
                var c = this.width * this.pixel_size,
                    d = this.height * this.pixel_size;
                this.canvas.grid = new b(c, d, "grid", (!1), "force", "canvas-layers-appened", this), this.canvas.grid.ctx = this.canvas.grid.context(), this.canvas.grid.canvas.width = c, this.canvas.grid.canvas.height = d, this.createGrid("grid"), this.grid.canvas = !0, a("#canvas_grid").width("100%").height("100%")
            },
            createChecker: function () {
                for (var a = this.canvas.rendering.ctx, b = (this.width * this.pixel_size, this.height * this.pixel_size, 0), c = 0, d = 0, e = 0; e <= this.width; e++)
                    for (var f = 0; f <= this.height; f++) d = e + f, this.isOdd(d) || (b = e, c = f, a.fillRect(b, c, 1, 1));
                this.checker.data = this.canvas.rendering.image(), this.canvas.rendering.clear()
            },
            isOdd: function (a) {
                return a % 2
            },
            offImageSmoothing: function (a) {
                this.canvas[a].ctx.imageSmoothingEnabled = !1, this.canvas[a].ctx.msImageSmoothingEnabled = !1, this.canvas[a].ctx.mozImageSmoothingEnabled = !1, this.canvas[a].ctx.webkitImageSmoothingEnabled = !1
            },
            sizeUp: function (a, b, c) {
                var d = this;
                a.onload = function () {
                    var a = this.width * b,
                        e = this.height * b;
                    d.canvas.data.clear(), d.canvas.data.canvas.width = a, d.canvas.data.canvas.height = e, d.offImageSmoothing("data"), d.canvas.data.ctx.drawImage(this, 0, 0, a, e), c(d.canvas.data.image())
                }
            },
            canvasToSolid: function (a, b, c, d, e) {
                var f = this,
                    g = [];
                b = b ? b : this.ColorController.color, c = c ? c : 1, f.canvas.data.clear(), f.canvas.data.setSmoothing(), f.canvas.data.canvas.width = a.width, f.canvas.data.canvas.height = a.height, f.canvas.data.ctx.drawImage(a, 0, 0);
                for (var h = f.canvas.data.ctx.getImageData(0, 0, a.width, a.height), i = this.hexToRgb(b), j = 0, k = 0, l = 0; l < h.data.length; l += 4) {
                    j >= a.width && (j = 0, k++);
                    var m = [h.data[l], h.data[l + 1], h.data[l + 2], h.data[l + 3]];
                    h.data[l + 3] > 0 && (m[0] = i.r, m[1] = i.g, m[2] = i.b);
                    var n = {
                        d: m,
                        x: j,
                        y: k
                    };
                    g.push(n), j++
                }
                f.canvas.data.clear(), f.canvas.data.canvas.width = a.width, f.canvas.data.canvas.height = a.height;
                for (var j = 0; j <= g.length - 1; j += 1) {
                    var o = g[j],
                        p = o.d[3] / 225 * c,
                        q = "rgba(" + o.d[0] + "," + o.d[1] + "," + o.d[2] + "," + p + ")";
                    if (f.layPixel(o.x, o.y, !0, q, "data", !0, d), j == g.length - 1) return e ? e(f.canvas.data.dataURL()) : f.canvas.data.image()
                }
            },
            resizeImage: function (a, b, c, d, e) {
                var f = this,
                    g = !1;
                "object" == typeof a && (g = a, a = a.image);
                var h = new Image;
                h.crossOrigin = "Anonymous";
                var i = [],
                    j = this.hexToRgb(this.ColorController.color);
                h.onload = function () {
                    f.canvas.data.clear(), f.canvas.data.canvas.width = this.width, f.canvas.data.canvas.height = this.height, f.canvas.data.ctx.drawImage(this, 0, 0);
                    var a = f.canvas.data.ctx.getImageData(0, 0, this.width, this.height),
                        h = 0,
                        k = 0;
                    f.canvas.data["default"]();
                    for (var l = 0; l < a.data.length; l += 4 * b) {
                        h >= this.width && (h = 0, k++);
                        var m = [a.data[l], a.data[l + 1], a.data[l + 2], a.data[l + 3]];
                        e && 255 == m[0] && 255 == m[1] && 255 === m[2] && (m[3] = 0), a.data[l + 3] > 0 && d && (m[0] = j.r, m[1] = j.g, m[2] = j.b);
                        var n = {
                            d: m,
                            x: h,
                            y: k
                        };
                        i.push(n), h++
                    }
                    f.canvas.data.canvas.width = this.width / b, f.canvas.data.canvas.height = this.height / b;
                    for (var h = 0; h <= i.length - 1; h += 1) {
                        var o = i[h],
                            p = o.d[3] / 225,
                            q = "rgba(" + o.d[0] + "," + o.d[1] + "," + o.d[2] + "," + p + ")";
                        f.layPixel(o.x, o.y, !0, q, "data", !0)
                    }
                    if ("function" != typeof c) switch (c) {
                        case "TextTool":
                            f.ToolController["do"]("callback")
                    }
                    "function" == typeof c && c(f.canvas.data.image(), g)
                }, h.src = a
            },
            isPrime: function (a) {
                for (var b = 2; b < a; b++)
                    if (a % b === 0) return !1;
                return 1 !== a && 0 !== a
            },
            fileExtension: function (a) {
                var b = a;
                return b.indexOf("?") >= 0 && (b = b.substr(0, b.indexOf("?"))), b.split(".").pop()
            },
            showPopup: function (b, c, d, e, f) {
                a("#popup-container, .p-content-sidebar-head").show(), a(".error-submitting").hide(), a(".p-content").removeClass("blueBackground"), a(".p-content").removeClass("white").removeClass("mobile"), a(".p-content, .p-content-sidebar-head").removeClass("g"), a(".popup-wrapper").removeClass("stampWidth"), a(".popup-wrapper").removeClass("autoWidth");
                var g = "",
                    h = !1,
                    i = !1,
                    j = !1,
                    k = !1,
                    l = !1,
                    m = !1,
                    n = !1,
                    o = !1;
                switch (b) {
                    case "settings":
                        g = '<i class="fa fa-cogs" aria-hidden="true"></i> Settings', i = !0, j = !0;
                        break;
                    case "settings":
                        g = '<i class="fa fa-cogs" aria-hidden="true"></i> Settings', i = !0, j = !0;
                        break;
                    case "download":
                        g = '<i class="fa fa-download" aria-hidden="true"></i> Settings', i = !0, k = !0;
                        break;
                    case "stamp":
                        g = '<i class="fa fa-motorcycle" aria-hidden="true"></i> New Stamp', l = !0;
                        break;
                    case "new":
                        g = '<i class="fa fa-file-image-o" aria-hidden="true"></i> New Drawing', h = !0;
                        break;
                    case "resize":
                        g = '<i class="fa fa-crop" aria-hidden="true"></i> Resize Drawing';
                        break;
                    case "submit":
                        g = '<i class="fa fa-flag" aria-hidden="true"></i> Save Drawing', i = !0;
                        break;
                    case "info":
                        g = '<i class="fa fa-keyboard-o" aria-hidden="true"></i> Key Bindings', i = !0;
                        break;
                    case "about":
                        g = '<i class="fa fa-info-circle" aria-hidden="true"></i> About Pixilart', i = !0;
                        break;
                    case "submit_download":
                        g = '<i class="fa fa-download" aria-hidden="true"></i> Download Drawing';
                        break;
                    case "bad-browser":
                        g = '<i class="fa fa-info-circle" aria-hidden="true"></i> Bad Browser';
                        break;
                    case "auto-save-loaded":
                        g = '<i class="fa fa-life-ring" aria-hidden="true"></i> Autosave Loaded';
                        break;
                    case "select-information":
                        g = '<i class="fa fa-question-circle" aria-hidden="true"></i> Select Information';
                        break;
                    case "custom-text":
                        g = '<i class="fa fa-font" aria-hidden="true"></i> Custom Font', l = !0;
                        break;
                    case "brushes":
                        g = '<i class="fa fa-brush" aria-hidden="true"></i> Brushes', l = !0;
                        break;
                    case "colors":
                        g = '<i class="fa fa-eyedropper" aria-hidden="true"></i> Colors';
                        break;
                    case "getting-link":
                        g = '<i class="fa fa-flag" aria-hidden="true"></i> Getting Drawing..', m = !0, n = !0;
                        break;
                    case "new-letter":
                        g = '<i class="fa fa-font" aria-hidden="true"></i> Assign Font', l = !0, m = !0;
                        break;
                    case "progress":
                        g = '<i class="fa fa-font" aria-hidden="true"></i> Current Progress', i = !0;
                        break;
                    case "mobile":
                        g = '<i class="fa fa-mobile" aria-hidden="true"></i> Mobile App', i = !0, o = !0;
                        break;
                    case "developer":
                        g = "Developer";
                        break;
                    default:
                        i = !0
                }
                a(".p-content-btn").removeClass("active"), a(".p-" + b).addClass("active"), a(".p-content").html(c), this.preventShortcut = !0, f && (this.closePopup = !1), (j || k) && this.downloadOptions(), "submit" == b && this.FrameController.frames.length > 1 && a(".upload-replay-toggle").remove(), e && a(".popup-wrapper").addClass("autoWidth"), d ? a(".popup-close-button").hide() : a(".popup-close-button").show(), g ? a(".p-header").show().html(g) : a(".p-header").hide(), i && a(".p-content").addClass("white"), o && a(".p-content").addClass("mobile"), l && a(".p-content, .p-content-sidebar-head").addClass("g"), m && a(".p-content-sidebar-head").hide(), n && a(".popup-wrapper").width(410), this.toggleNewFileElements(b)
            },
            downloadOptions: function () {
                a(".hidden-gif-download").addClass("hide"), this.FrameController.frames.length > 1 && (a(".hidden-gif-download").removeClass("hide"), a(".frames-text-change").text("Frames")), this.fileDrawing && a(".submit-drawing-hideable, .autosave-wrapper").hide()
            },
            toggleNewFileElements: function (b) {
                this.newShow && "new" == b ? a(".header-new").hide() : a(".old-version-access").hide()
            },
            hidePopup: function () {
                this.closePopup && (a(".popup-close-button").show(), a(".p-header").show(), a(".popup-wrapper").removeClass("autoWidth"), a("#popup-container").hide(), this.TextController.canAssignLetter = !1, this.preventShortcut = !1, this.progress.doPreview = !1, this.newShow = !1)
            },
            round: function (a, b) {
                b || (b = 1);
                var c = 1 / b;
                return Math.round(a * c) / c
            },
            validateImageData: function (a, b) {
                var c = "-px199113-";
                if ("string" != typeof a || "string" == typeof a && a.length > 1350462) return console.info("Image upload failed due to size restrictions. Please contact support for information. Data size: " + a.length), !1;
                if (b) {
                    var d = a.substr(-c.length);
                    if (d != c) return !1
                }
                return a.slice(0, -c.length)
            },
            validateSize: function (a, b) {
                a > this.maxWidth && (this.width = 500), a <= 8 && (this.width = 8), b > this.maxHeight && (this.height = 500), b <= 8 && (this.height = 8)
            },
            detectIE: function () {
                var a = window.navigator.userAgent,
                    b = a.indexOf("MSIE ");
                if (b > 0) return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10);
                var c = a.indexOf("Trident/");
                if (c > 0) {
                    var d = a.indexOf("rv:");
                    return parseInt(a.substring(d + 3, a.indexOf(".", d)), 10)
                }
                var e = a.indexOf("Edge/");
                return e > 0 && parseInt(a.substring(e + 5, a.indexOf(".", e)), 10)
            },
            downloadFile: function (a, b) {
                var c = new Blob([b], {
                    type: "text/plain;charset=utf-8"
                });
                saveAs(c, a)
            },
            requestFullScreen: function (a, b) {
                var c = document.fullscreenElement && null !== document.fullscreenElement || document.webkitFullscreenElement && null !== document.webkitFullscreenElement || document.mozFullScreenElement && null !== document.mozFullScreenElement || document.msFullscreenElement && null !== document.msFullscreenElement;
                c ? (document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen(), b.text(this.fullscreen.text)) : (a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullScreen ? a.webkitRequestFullScreen() : a.msRequestFullscreen && a.msRequestFullscreen(), b.text(this.fullscreen.exit))
            },
            repositionScreen: function (a) {
                this.checkScreenSize(), this.getPixelRatio(a), this.ZoomController.reset(!0)
            },
            resizeCanvases: function (b, c, d) {
                var e = this,
                    b = b ? b : this.width;
                c = c ? c : this.height, a.each(this.canvas, function (d, f) {
                    var g = 1,
                        h = e.canvas[f.name];
                    "display" == h.name && (g = e.pixel_size), "CSS" == e.zoom.type && (a("#canvas-layers-container").width(b * g), a("#canvas-layers-container").height(c * g), g = 1), h.canvas.width = b * g, h.canvas.height = c * g, h.setDefault(h.canvas.width, h.canvas.height), h.clear()
                }), this.NavigationController.set()
            },
            readCookie: function (a) {
                var b = document.cookie.match("(^|;)\\s*" + a + "\\s*=\\s*([^;]+)");
                return b ? b.pop() : ""
            },
            getCookie: function (a) {
                var b = this.readCookie(a);
                return b ? JSON.parse(b) : {}
            },
            createCookie: function (a, b, c, d) {
                var e = "";
                if (c) {
                    var f = new Date;
                    f.setTime(f.getTime() + 24 * c * 60 * 60 * 1e3), e = "; expires=" + f.toUTCString()
                }
                d && (b = JSON.stringify(b)), document.cookie = a + "=" + b + e + "; path=/"
            },
            eraseCookie: function (a) {
                this.createCookie(a, "", -1)
            },
            putStorage: function (a, b) {
                "object" == typeof b && (b = JSON.stringify(b)), b = this.encodeImage(b), localStorage.setItem(a, b)
            },
            encodeImage: function (a) {
                return this.replaceAll(a, ";", "--.--")
            },
            decodeImage: function (a) {
                return this.replaceAll(a, "--.--", ";")
            },
            getStorage: function (a) {
                return localStorage.getItem(a)
            },
            replaceAll: function (a, b, c) {
                return a.replace(new RegExp(b, "g"), c)
            },
            removeTips: function () {
                a("body").append("<style> .ui-tooltip, .ui-tooltip:last-child, .ui-tooltip.ui-widget { display: none !important; } </style>")
            },
            getRandomColor: function () {
                for (var a = "2523456789ABADEF", b = "#", c = 0; c < 6; c++) b += a[Math.floor(16 * Math.random())];
                return b
            },
            getRandomColorPallet: function () {
                var a = this.ColorController.colorPresets[this.ColorController.currentSelection],
                    b = a[Math.floor(Math.random() * a.length)];
                return "#" + b
            },
            toRaingbow: function () {
                var a, b, c;
                return this.rainbow.color || (this.rainbow.color = this.ColorController.color), a = this.hexToRgb(this.rainbow.color), b = this.RGBtoHSV(a.r, a.g, a.b), b.h = 100 * b.h, b.h++, b.h = b.h / 100, c = this.HSVtoRGB(b.h, b.s, b.v), c = this.rgbaToHex(c.r, c.g, c.b), c = "000000" + c, c = c.slice(-6), this.rainbow.color = c, "#" + this.rainbow.color
            },
            getRainbowColor: function () {
                var a;
                this.rainbow.color || (this.rainbow.color = this.ColorController.color, a = this.hexToRgb(this.rainbow.color)), a = this.hexToRgb(this.rainbow.color), null != a && null != a.r || (a = this.hexToRgb(this.rainbow.color));
                var b = ["r", "g", "b"];
                "up" == this.rainbow.direction ? this.rainbow.current++ : this.rainbow.current--;
                var c = b[this.rainbow.current];
                this.rainbow.current > 2 ? this.rainbow.direction = "down" : this.rainbow.current <= 0 && (this.rainbow.direction = "up"), "up" == this.rainbow[c] ? a[c]++ : a[c]--, a.r <= -1 && (a.r = 0, this.rainbow.r = "up"), a.g <= -1 && (a.g = 0, this.rainbow.g = "up"), a.b <= -1 && (a.b = 0, this.rainbow.b = "up"), a.r > 255 && (this.rainbow.r = "down"), a.g > 255 && (this.rainbow.g = "down"), a.b > 255 && (this.rainbow.b = "down");
                var d = this.rgbaToHex(a.r, a.g, a.b);
                return d = "000000" + d, d = d.slice(-6), this.rainbow.color = d, "#" + this.rainbow.color
            },
            randomArray: function (a) {
                return a[Math.floor(Math.random() * a.length)]
            },
            getDrawnPixels: function (a) {
                for (var b = this.canvas.layer.ctx.getImageData(0, 0, this.width, this.height), c = 0, d = 0, e = "0", f = 0, g = "0", h = 0, i = 0, j = 0, k = 0; k < b.data.length; k += 4)
                    if (i >= this.width && (i = 0, j++), b.data[k + 3] > 0 && (i >= f && (f = i), j >= h && (h = j), ("0" === e || "0" !== e && i < e) && (e = i), ("0" === g || "0" !== g && j < g) && (g = j)), i++, i >= this.width && j >= this.height - 1) return c = f - (e - 1), d = h - (g - 1), a(b, c, d, e, g, f, h)
            },
            showAlert: function (b) {
                clearTimeout(this.alert.s), a(".alert-response-container").addClass("active"), a(".alert-response").text(b), this.alert.s = setTimeout(function () {
                    a(".alert-response-container").removeClass("active")
                }, 3e3)
            },
            getScaleUpRatioDecimal: function (a) {
                var b = a ? a : 1400,
                    c = b / this.width,
                    d = b / this.height;
                return Math.min(c, d)
            },
            getScaleUpRatio: function (a) {
                var b = a ? a : 1200,
                    c = Math.floor(b / this.width),
                    d = Math.floor(b / this.height),
                    e = Math.floor(1400 / this.width),
                    f = Math.floor(1400 / this.height),
                    g = Math.min(c, d);
                return 1 != g || a || (g = Math.min(e, f)), g
            },
            arrangeImages: function (a, b) {
                function c(a, b) {
                    return a.data_id < b.data_id ? -1 : a.data_id > b.data_id ? 1 : 0
                }
                return a.sort(c), b(a)
            },
            b64toBlob: function (a, b, c) {
                b = b || "", c = c || 512;
                for (var d = atob(a), e = [], f = 0; f < d.length; f += c) {
                    for (var g = d.slice(f, f + c), h = new Array(g.length), i = 0; i < g.length; i++) h[i] = g.charCodeAt(i);
                    var j = new Uint8Array(h);
                    e.push(j)
                }
                var k = new Blob(e, {
                    type: b
                });
                return k
            },
            customLog: function (b, c) {
                c = c ? c : "debug-log-container", a(".debug-log-container").prepend("<p>" + b + "</p>")
            },
            newDrawing: function (b) {
                var d = this.zoom.type;
                this.zoom_ratio = 1, this.zoom_step = 1, this.zoom = {
                    type: d,
                    left: 0,
                    top: 0,
                    ratio: 1,
                    pixel_size: 1
                }, this.HistoryController.undo = [], this.HistoryController.redo = [], this.LayerController.layers = [], this.FrameController.frames = [];
                var e = new c(0, "Background");
                e.init(), this.FrameController.init(), this.LayerController.init(e), this.LayerController.currentLayer = 0, this.FrameController.currentFrame = 0, this.app.frames = !1, b || (a(document).off("click", ".select-frame"), a(document).off("click", ".frame-delete"), a(document).off("mousedown", ".add-frame"), this.FrameController.listeners(), this.ToolController.listeners(), this.HistoryController.listeners())
            },
            startData: function (a) {
                this.showChecker(), this.showOnionSkin(), this.canvas.display.putImageData(this.canvas.bottom.canvas, 1, this.zoom)
            },
            endData: function () {
                this.canvas.display.putImageData(this.canvas.top.canvas, 1, this.zoom);
                for (var a = 0; a < this.renderAfter.length; a++) {
                    var b = this.renderAfter[a];
                    this.canvas.display.putImageData(b, 1, this.zoom)
                }
                this.renderAfter = [], this.showGrid()
            },
            setOnionSkin: function (a) {
                if (this.FrameController.frames.length >= 1) {
                    var b = this.FrameController.currentFrame,
                        c = this.FrameController.frames[b - 1],
                        d = "CSS" == this.zoom.type ? 1 : this.pixel_size;
                    if (0 != b) {
                        var e = new Image;
                        e.src = this.LayerController.flatten(c.layers, !1, d), this.onionSkin.image = e
                    }
                }
            },
            showOnionSkin: function (a, b) {
                if (this.FrameController.frames.length > 1 && this.onionSkin.status && 0 != this.FrameController.currentFrame)
                    if (a) {
                        var c = this;
                        this.onionSkin.image.onload = function () {
                            c.canvas.display.putImageData(this, c.onionSkin.opacity, c.zoom), c.render()
                        }
                    } else this.canvas.display.putImageData(this.onionSkin.image, this.onionSkin.opacity, this.zoom)
            },
            showGrid: function (a) {
                if (this.grid.data || this.createGrid(), this.grid.status) {
                    if ("CSS" == this.zoom.type && a && this.resetGrid(), "CSS" == this.zoom.type) return;
                    if (a) {
                        var b = this;
                        this.grid.data.onload = function () {
                            b.canvas.display.putImageData(this, b.grid.opacity, b.zoom)
                        }
                    } else this.canvas.display.putImageData(this.grid.data, this.grid.opacity, this.zoom)
                }
            },
            resetGrid: function () {
                this.grid.status = !1, this.grid.canvas = !1, a("#canvas_grid").remove()
            },
            showChecker: function (a, b) {
                if (this.checker.data && !b || this.createChecker(), this.checker.status)
                    if (a) {
                        var c = this;
                        this.checker.data.onload = function () {
                            c.canvas.display.putImageData(this, c.checker.opacity, c.zoom), c.render()
                        }
                    } else this.canvas.display.putImageData(this.checker.data, this.checker.opacity, this.zoom)
            },
            tracing: function () {
                this.backgroundImage.status && this.backgroundImage.image && "" != this.backgroundImage.image.trim() ? a("#canvas_display").css("background-image", 'url("' + this.backgroundImage.image + '")') : a("#canvas_display").css("background-image", "none")
            },
            renderEditImage: function (a) {
                this.edit.image = a, this.putEditImage(a)
            },
            getEditImage: function () {
                var a = this;
                if ("gif" == this.fileExtension(this.edit.image_src)) return this.GifController.load(this.edit.image_src);
                if (this.app.frames) return this.GifController.loadAppDrawing();
                var b = new Image;
                b.crossOrigin = "Anonymous", b.onload = function () {
                    a.edit.resize ? a.resizeImage(this.src, a.edit.resize, function (b) {
                        a.renderEditImage(b)
                    }) : a.renderEditImage(this.src)
                }, b.src = this.edit.image_src
            },
            putEditImage: function (a) {
                var b = this;
                a.onload = function () {
                    b.canvas.layer.putSimple(this), b.ToolController.tool.currentImage = this, b.ready(), b.render()
                }
            },
            updateDisplayCanvas: function (a, b) {
                this.finished && (this.layerAboveCache = !1, this.layerBelowCache = !1, this.renderLocationLayers(a, b))
            },
            renderLocationLayers: function (a, b) {
                this.canvas.top["default"](), this.canvas.bottom["default"]();
                for (var c = (a[this.LayerController.currentLayer], 0); c < a.length; c++) {
                    var d = a[c];
                    c != b && d.active && 0 !== d.opacity && (c > b ? this.canvas.top.putImageData(d.src, d.opacity) : this.canvas.bottom.putImageData(d.src, d.opacity))
                }
            },
            stampsTemplate: function (a, b) {
                return a.resize = "1", a.stamp_favorites_id = a.stamp_favorites_id ? a.stamp_favorites_id : "false", '<div class="stamp-pre selectable-stamp smp-' + a.id + '" title="' + a.username + '"><div class="stamp-data">' + this.addDeleteStampButton(b, a) + this.addApproveStampButton(b, a) + this.favoriteIcon(a) + '<div class="stamp-pre-image" data-favorite-id="' + a.stamp_favorites_id + '" data-id="' + a.id + '" data-resize="' + a.is_old + '" data-image="' + a.imageData + '-px199113-"><img src="' + a.imageData + '" /></div><div class="stamp-pre-title">' + this.lockIcon(a.is_private) + a.title + "</div></div></div>"
            },
            addDeleteStampButton: function (a, b) {
                if (a && "object" == typeof a) return a.user || a.admin ? '<span class="delete-stamp-btn" data-id="' + b.id + '" title="Delete Stamp"><i class="fa fa-trash fa-fw" aria-hidden="true"></i></span>' : ""
            },
            lockIcon: function (a) {
                return a ? '<span class="private-stamp-icon" title="Stamp is Private"><i class="fa fa-lock" aria-hidden="true"></i></span> ' : ""
            },
            favoriteIcon: function (a) {
                var b = a.favorite ? "active" : "";
                return this.isAuth ? '<span class="stamp-btn favorite-stamp-btn ' + b + '" data-id="' + a.id + '" title="Star Stamp"><i class="fa fa-star fa-fw" aria-hidden="true"></i></span>' : ""
            },
            addApproveStampButton: function (a, b) {
                if (a && "object" == typeof a) return a.admin && !b.is_approved ? '<span class="approve-stamp-btn" data-id="' + b.id + '" title="Approve Stamp"><i class="fa fa-check fa-fw" aria-hidden="true"></i></span>' : ""
            },
            timerAutoSave: function () {
                var a = this;
                this.autosave.status && !this.fileDrawing && this.createAutoSaveData(function (b) {
                    a.putStorage(a.autosave.cookieName, b), a.autosave.timeout = setTimeout(function () {
                        a.timerAutoSave()
                    }, a.autosave.timer)
                })
            },
            createAutoSaveData: function (a) {
                var b = this;
                this.startHistory(function (c) {
                    var d = {
                            frames: c,
                            currentFrame: b.FrameController.currentFrame,
                            width: b.width,
                            height: b.height
                        },
                        e = JSON.stringify(d);
                    return a(e)
                })
            },
            startAutoSave: function () {
                this.timerAutoSave(), this.createCookie("pixil-asc", !0, 31)
            },
            stopAutoSave: function () {
                this.putStorage(this.autosave.cookieName, ""), this.createCookie("pixil-asc", !1, 31), clearTimeout(this.autosave.timeout)
            },
            clearAutoSave: function () {
                this.putStorage(this.autosave.cookieName, "")
            },
            setupAutoSave: function () {
                var b = this.readCookie("pixil-asc");
                if (!this.isApp && !this.online.status)
                    if (b && "" != b && " " != b.trim() && (this.autosave.status = b), "false" == this.autosave.status) this.autosave.status = !1, a("#autosave-toggle").prop("checked", !0);
                    else {
                        var c = this.getStorage(this.autosave.cookieName);
                        c && "" != c.trim() && !this.edit.status && (this.autosave.loaded = !0, this.newShow = !1, c = this.replaceAll(c, "--.--", ";"), this.loadAutoSave(c), this.showPopup("auto-save-loaded", a("#auto-save-loaded").html())), this.preAutoSave()
                    }
            },
            preAutoSave: function () {
                var a = this;
                setTimeout(function () {
                    a.timerAutoSave()
                }, this.autosave.timer)
            },
            loadAutoSave: function (a) {
                this.loading = !0;
                var b = this;
                a = JSON.parse(a), this.width = a.width, this.height = a.height, this.getPixelRatio(), this.resizeCanvases(), "CSS" == this.zoom.type && this.ZoomController.align(), this.createGrid(), this.createChecker(), this.FileController.updateDimensions(), this.loadHistoryData(a, function (c) {
                    b.HistoryController.loadFrames(c, a.currentFrame), b.HistoryController.undo = [], b.HistoryController.redo = [], b.HistoryController.create()
                })
            },
            loadAds: function () {
                if (this.debug, this.ads.status && !this.isMobile) {
                    var a = this;
                    setTimeout(function () {
                        a.loadData()
                    }, this.ads.startTime)
                }
            },
            loadData: function () {
                if (a(".ad-append-placement").length >= 1) {
                    var b = Math.floor(1 * Math.random() + 1);
                    if (2 == b) {
                        var c = this.manualAd("warerepair");
                        a(".ad-append-placement").html(c)
                    } else if (3 == b) {
                        var c = this.manualAd("waredesigns");
                        a(".ad-append-placement").html(c)
                    } else this.getAdSense();
                    a("#simple-ad").addClass("show").css({
                        bottom: this.ads.bottomPlacement
                    }), this.autoLoadMoreAds()
                }
            },
            loadAdsWrapper: function () {
                this.ads.show ? this.loadAdsWrapperClose() : this.loadAdsWrapperOpen()
            },
            loadAdsWrapperClose: function () {
                this.ads.show = !1, this.ads.adElementWidth = this.ads.adElementWidth ? this.ads.adElementWidth : a("#simple-ad").width() + 20, a("#simple-ad").addClass("hidden-ad").css({
                    right: -this.ads.adElementWidth
                }), a(".ad-close").html('<span class="ad-text">ads</span>')
            },
            loadAdsWrapperOpen: function () {
                this.ads.show = !0, a("#simple-ad").removeClass("hidden-ad").css({
                    right: 0
                }), a(".ad-close").html('<i class="fa fa-times fa-fw" aria-hidden="true"></i>')
            },
            autoLoadMoreAds: function () {
                var a = this;
                clearTimeout(this.ads.timer), this.ads.timer = setTimeout(function () {
                    a.loadAdsWrapperOpen(), a.loadData()
                }, this.ads.autloadTime)
            },
            manualAd: function (a) {
                switch (a) {
                    case "warerepair":
                        return this.wareRepairAd();
                    case "waredesigns":
                        return this.wareDesignsAd()
                }
            },
            getAdSense: function () {
                this.ads.bottomPlacement = this.ads.bottomPlacement ? this.ads.bottomPlacement : a("#frames-placement .panel-header").height();
                var b = '<ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-3237025594850465" data-ad-slot="5200313233"></ins>';
                a(".ad-append-placement").html(b);
                try {
                    (adsbygoogle = window.adsbygoogle || []).push({})
                } catch (c) {
                    console.log(c)
                }
            },
            wareRepairAd: function () {
                return '<iframe src="https://warerepair.net" title="fargo computer & phone repair - ware repair" height="90px" width="728px" frameborder="0"></iframe>'
            },
            wareDesignsAd: function () {
                return '<iframe src="https://waredesigns.net" title="fargo web design & development - ware repair" height="90px" width="728px" frameborder="0"></iframe>'
            },
            checkMobile: function (b) {
                (1 == a("#is-app").length || b) && (this.isApp = !0), (a(window).width() <= 768 || b) && this.setMobile()
            },
            setMobile: function () {
                if (this.isMobile = !0, this.progress.status = !1, !("object" == typeof _ && this.width == this.height || "object" == typeof _ && this.width < 50 || "object" == typeof _ && this.height < 50 || this.online.status && this.width == this.height))
                    if (768 != a(window).width() || this.isApp)
                        if (this.isApp) {
                            if (this.customSize) return;
                            this.width = 32, this.height = 32
                        } else this.width = 32, this.height = 32, this.formatScreen();
                else this.width = 100, this.height = 100
            },
            formatScreen: function () {
                var b = a("#toolbar").height(),
                    c = a(".mobile-header").height(),
                    d = a(".footer-mobile-buttons").height(),
                    e = a(window).height(),
                    f = Math.abs(e - (b + c + d));
                a("#drawing-container").height(f)
            },
            checkTablet: function () {
                var b = navigator.userAgent;
                this.isApp || (b.indexOf("iPad") > -1 && (this.isIpad = !0), a(window).width() <= 1024 && a(window).width() > 768 && b.indexOf("iPad") > -1 && this.setTablet())
            },
            setTablet: function () {
                this.isApp || (this.isMobile = !0, this.isTablet = !0, this.edit.status || (this.width = 125, this.height = 100), this.pixelPerfect.status = !0, a(".perfect-toggle").prop("checked", !0), this.settings.extras = !1)
            },
            setApp: function () {
                if ("" == a(".added-styles").html().trim() || this.app.resizeOnNew) {
                    var b = a("#drawing-canvas-conatiner"),
                        c = b.height() - this.height * this.pixel_size;
                    if (c >= 30) {
                        var d = c - 4,
                            e = b.height() - d;
                        a(".added-styles").html("<style>.colors-bar-wrapper .color-select { height: " + d + "px; } </style>"), this.ZoomController.align(!1, !1, !1, e + 5)
                    } else if (c < 0) {
                        var f = 4 + Math.abs(c),
                            g = 30 - f,
                            e = b.height() + f;
                        g < 0 && (g = 5, this.app.resizeOnNew = !0), a(".added-styles").html("<style>.mouse-down-function { padding: " + g + "px 0 !important; } </style>"), this.app.resizeOnNew && (this.getPixelRatio(!1, !0), this.ZoomController.reset(!0)), this.ZoomController.align(!1, !1, !1, e - 1)
                    }
                    this.mouse.render()
                }
            },
            startHistory: function (a) {
                for (var b = this.FrameController.frames, c = [], d = 0; d < b.length; d++) this.loopHistoryFrames(d, function (d) {
                    if (c.push(d), c.length == b.length) return a(c)
                })
            },
            loopHistoryFrames: function (a, b) {
                var c = this;
                this.FrameController.cloneSingleFrame(a.toString(), function (a) {
                    c.loopFrameLayers(a.layers, function (c) {
                        return a.layers = c, b(a)
                    })
                })
            },
            loopFrameLayers: function (a, b) {
                for (var c = [], d = 0; d < a.length; d++) {
                    var e = jQuery.extend(!0, {}, a[d]),
                        f = {
                            id: e.id,
                            src: e.src.src,
                            name: e.name,
                            opacity: e.opacity,
                            active: e.active,
                            unqid: e.unqid
                        };
                    if (c.push(f), c.length == a.length) return b(c)
                }
            },
            loadHistoryData: function (a, b) {
                var c = a.frames,
                    a = [],
                    d = this;
                if ("undefined" != typeof c[0].width && c[0].width != this.width && !this.isApp || "undefined" != typeof c[0].height && c[0].height != this.height && !this.isApp) this.resizeHistoryCanvas(c[0].width, c[0].height, function () {
                    for (var e = 0; e < c.length; e++) d.loopLoadFrames(c[e], function () {
                        if (a.push(e), a.length == c.length) return b(c)
                    })
                });
                else
                    for (var e = 0; e < c.length; e++) this.loopLoadFrames(c[e], function () {
                        if (a.push(e), a.length == c.length) return b(c)
                    })
            },
            resizeHistoryCanvas: function (a, b, c) {
                this.FileController.resize(!1, a, b, function () {
                    return c()
                })
            },
            loopLoadFrames: function (a, b) {
                for (var d = a.layers, e = [], f = 0; f < d.length; f++) {
                    var g = new Image;
                    g.src = d[f].src, g.pos_x = f, g.onload = function () {
                        var a = new c(d[this.pos_x].id, d[this.pos_x].name);
                        if (a.src = this, a.active = d[this.pos_x].active, a.opacity = parseFloat(d[this.pos_x].opacity), a.unqid = d[this.pos_x].unqid, d[this.pos_x] = a, e.push(f), e.length == d.length) return b(d)
                    }
                }
            },
            simpleListeners: function () {
                var b = this;
                a(document).on("click", ".tab-item", function () {
                    var b = a(this).attr("data-for"),
                        c = a(this).attr("data-activate");
                    a(b + " .tab-content-selection").removeClass("active"), a(b).find(c).addClass("active"), a(this).parent().children(".tab-item").removeClass("active"), a(this).addClass("active")
                }), a(document).on("click", ".download-progress-preview", function () {
                    b.downloadProgressGif(!1, !0, !1, !0)
                }), a("#draw-online-others").click(function () {
                    window.location.href = "/online/"
                }), a(".clear-new").click(function () {
                    return b.isApp && b.ons ? b.FileController.appClear(!0) : void b.FileController.newer(!0)
                })
            },
            commonListeners: function () {
                this.extraToolDropDown(), this.simpleListeners()
            },
            extraToolDropDown: function () {
                function b(b) {
                    var c = b.find(".activate-switch-wrapper").attr("data-current");
                    e = b, b.find(".selectable-switch-wrapper").toggleClass("active"), a(".activate-switch-wrapper").show(), b.find(".selectable-switch-wrapper").hasClass("active") && (d = b, a(".activate-switch-wrapper").hide(), b.find(".select-able-switch").each(function () {
                        var b = a(this).attr("data-selection");
                        a(this).show(), b == c && a(this).hide()
                    }))
                }
                var c = this,
                    d = !1,
                    e = !1;
                a(".activate-switch-wrapper").click(function () {
                    b(a(this))
                }), a(".activate-switch-wrapper").click(function () {
                    b(a(this))
                }), a(".sidebar-tabs").click(function (b) {
                    var c = a(this).attr("data-toggle");
                    a(".sidebar-content").removeClass("active"), a(".sidebar-tabs").removeClass("active"), a(this).addClass("active"), a(c).addClass("active")
                }), a(".p-progress").mousedown(function (b) {
                    c.stopProgress(), c.progress.doPreview = !0, c.showProgress(".progress-images"), c.showPopup("progress", a("#progress-content").html())
                }), a(".select-able-switch, .switch-change").click(function (b) {
                    if (3 != b.which && e) {
                        e.find(".switch-change").addClass("active");
                        var c = a(this).attr("data-selection"),
                            d = a(this).attr("data-title"),
                            f = a(this).attr("data-type");
                        e.attr("title", d), a(".activate-switch-wrapper").attr("data-current", c), a(".switch-change").html(a(this).html()).attr("data-title", d).attr("data-selection", c).attr("title", d).attr("data-type", f), a(".selectable-switch-wrapper").removeClass("active"), a(".activate-switch-wrapper").show()
                    }
                }), a(document).mouseup(function (b) {
                    if (d) {
                        var c = d;
                        c.is(b.target) || 0 !== c.has(b.target).length || (a(".selectable-switch-wrapper").removeClass("active"), a(".activate-switch-wrapper").show(), d = !1)
                    }
                })
            },
            runGenerator: function (a) {
                this.loading = !0;
                for (var b = a.replace(/[^a-zA-Z0-9 ]/g, ""), c = b.split(""), d = 0, e = 0, f = 0, g = this.width * this.height, h = 0; h < g; h++) {
                    e >= this.width && (e = 0, f++), d >= c.length && (d = 0);
                    var i = c[d];
                    i = i.toLowerCase();
                    var j = this.getGenerateKey("keys", i);
                    j = j ? "#" + j : "rgba(0,0,0,0.0)", this.layPixel(e, f, !0, j, !1, 1), d++, e++, h == g - 1 && (this.FrameController.updateFramePreview(), this.render(), this.loading = !1)
                }
            },
            getGenerateKey: function (a, b) {
                var c = {
                        81: "368045",
                        87: "f97496",
                        69: "78a3f5",
                        82: "ab3c74",
                        84: "d71e1e",
                        89: "4e257b",
                        85: "914cd6",
                        73: "e89a8b",
                        79: "8a9b73",
                        80: "c5d866",
                        65: "f0eea9",
                        83: "136c6f",
                        68: "3db769",
                        70: "6e2753",
                        71: "5c6f8e",
                        72: "468399",
                        74: "39f2ed",
                        75: "8cffea",
                        76: "3d5d1c",
                        90: "5ce873",
                        88: "248a01",
                        67: "c4428d",
                        86: "2aa69e",
                        66: "391d11",
                        78: "278690",
                        77: "9cea9e",
                        49: "f6e5a3",
                        50: "e6201c",
                        51: "e0df38",
                        52: "99a031",
                        53: "42c29e",
                        54: "d77183",
                        55: "78e7c5",
                        56: "66297b",
                        57: "adad6c",
                        48: "CCCCCC"
                    },
                    d = {
                        q: "368045",
                        w: "f97496",
                        e: "78a3f5",
                        r: "ab3c74",
                        t: "d71e1e",
                        y: "4e257b",
                        u: "914cd6",
                        i: "e89a8b",
                        o: "8a9b73",
                        p: "c5d866",
                        a: "f0eea9",
                        s: "136c6f",
                        d: "3db769",
                        f: "6e2753",
                        g: "5c6f8e",
                        h: "468399",
                        j: "39f2ed",
                        k: "8cffea",
                        l: "3d5d1c",
                        z: "5ce873",
                        x: "248a01",
                        c: "c4428d",
                        v: "2aa69e",
                        b: "391d11",
                        n: "278690",
                        m: "9cea9e",
                        1: "f6e5a3",
                        2: "e6201c",
                        3: "e0df38",
                        4: "99a031",
                        5: "42c29e",
                        6: "d77183",
                        7: "78e7c5",
                        8: "66297b",
                        9: "adad6c",
                        0: "CCCCCC"
                    };
                return "keys" == a ? d[b] : c[b]
            },
            textData: {
                current: "default",
                Darkstar_2: {
                    resize: !1,
                    height: 10,
                    spacing_top: 11,
                    spacing_left: 9,
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAPElEQVQoU2NkQID/SGwQkxFOMDAwoEvC1DKCVCFLgnUhiyErgEnCdIM1opuA5gwSFRC0gnwFMG9hM4ERAHiZEAQ0pZuCAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAOUlEQVQoU2NkgID/UBqZYgRxQAQ2SZhCRmQFYB3oJuJSALeWZCvQ3YPTDVitIOhILEHBALYCb0ABAO/GDwdz5z7GAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALUlEQVQYV2NkgID/UBpGMTJiEQRLokuA+BgScEF0HVSUgBmN1VVw78AsxPAgADRBCglCLNugAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAALklEQVQoU2NkgID/UBqZYgRxQAQ2SZhCRmQFYB3oJuJSALd2ABXAfUaUN/EGFACMxhAFX3dHJQAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2NkgID/UBpGMTJiEQRLokuA+BgScEFsOmBiGEZhlcBrFFbLUbwCU4HhQQA0MQoJgR+LjwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkgID/UBpGMTJiEQRLokuA+BgScEFsOmBiFBqF0w4MCZgHUSQANGsKCn3k73EAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAOklEQVQoU2NkgID/UBqZYmTEIQFWhC4J4sMBsiSKBLpOmCTcfnSdKA7DZSxYES4HYZVE8S6GI5B9AgDFeQ4FCQOfPQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAMElEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBDApgAsSD0FaE5A2AuzgqACGjoSb0ABALbKEgMMM6NNAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAFElEQVQYV2NkgID/jCACxKISgxEAw5YKAu3knXIAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJ0lEQVQYV2NkwAT/GRgYGBlxSDAMKgmQU8EA5Co4B9npMOeiSzICALnBCgPHFOz/AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAN0lEQVQYV2NkYGD4z8DAwMiACv6DBEASIACTBPOJloDpRtGBbAsjslE4JVAUEW05yDgU52J4EADlxRIDOl3KLQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkgID/DAwMjFA2mAJxQIIwNlxu0EiguAzZVcjegHsK5heYJCMANSYKClL0VTkAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAARklEQVQoU2NkgID/DAwMjFA2OgWWA0mCGDCArhguh64QpAGmGNkAsCCKAA7rURTiMh1sELIkupUofGwKsfkaq4mUKyQqwAG61RUDc5+tPwAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAARUlEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBhAVgQWR1cAE4OZilUBikZkE7CZhmICzH5kN2FVALcf3ZHYvInTBBRf4A0oAAHYFAPgON9kAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAM0lEQVQoU2NkgID/UBqdYmTEIwlWjK4AxEcxEVkBTBJmDdhaOiuAWYnTkViDAsNbaKoYAYuLEAPYtXDuAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMElEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdREmgWIPLDhTLYXbgtJywBMyJKEYBAIGlDAenwGauAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAO0lEQVQoU2NkgID/UBqdYmTEIwlWjK4AxEcxEVkBTBJmDdhakhXAHAvXiG4Cum8wfIHhK6K8iS2g4BoBNekSA+cAhDsAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMElEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdREvA7cJlB1bLwXYRpQNFEbITUZwLAC59DwVBz+bFAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAM0lEQVQYV2NkgID/UBpGMTJiEQRLokuA+BgScEFsOlDswGY52A50AHYhugTc2Xidi9WDABNRCgbvjleAAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJ0lEQVQoU2NkgID/UBoXxchIhCKwZpBCdAAzHUVuVCEsmEDBgxEaACwYCgoQcgdNAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAM0lEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBDApgAsOKQUIPsE5nAUX6AFA6rf4TrQVDECAMLREgNP77PAAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAO0lEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBDApgAsOEAKYNZidQNcEt0XaL6E+ArmNWRdKF5G9jtW7wIAfKYRBhzGp8EAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAPklEQVQoU2NkgID/DAwMjFA2OgWWA0mCGCCATyFYkvYK0W0A87FZTT2F2GyAmQ4PErgAjrAEhyMMYHUbLHwBcyEXBAc6So0AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAOUlEQVQYV2NkgID/DAwMjMhsEAckCALIEmAOURIwRajaoUaCjUUxF10Crh3qADCfaMthfkL1FLIHAdqoEgXHmUHCAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAAP0lEQVQoU2NkgID/DAwMjFA2jAKLgQRBDBDApgAsSLQCZFNgmuDGwgXQ3AF2A7KjkOXBcugOg/kILkc7BXCTAZrHDghvVKN9AAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAM0lEQVQYV2NkYGD4z4AFMELFMCRhEjA9MAWMREnAVYO0I+vAKoEiiKwDqwQ2f4BdhdWDAAd8Cghbtf+SAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMklEQVQYV2NkQID/UCYjiAYTDAwMMEG4GEgCWZA4CZgtWO1AtgfFctIlMFyGzblgxwAADSsKCtxhVEcAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMklEQVQYV2NkgID/UBpGMTJiEQRLgiTQAVg3URIo9sB0ELQcbjSyq1Dsw+tcdPPBrgUACngKBldb/zEAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2NkgID/UBpGMTJiEQRLgiTQAVg3URLI9oDtgAGcEigK8NqB7gcU52J4EADifAoFhfIAGQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAARElEQVQoU32PSQ4AIAgDy/8fLSkRwqJ4Ip2RFMF8B4B4HMMNCAvLQoaUjLnQ4VfgB5djQwk24XHQ3sF69DMZjg59dREU6c4MCosk97kAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMklEQVQYV2NkYGD4z4AJGBlxSDAgS4DYcECUBIoGmHYMB6CYC9UCVoRXAps/4DrQJRkBE1UKBoO/LfYAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAYAAAB4zEQNAAAAM0lEQVQoU2NkgID/UBpGMYIYIAJdAq4AWRKsGhkQLYmuiXQ7YQ5kxGYnVkkMx8KcjzUQALULDAukvfWwAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANElEQVQYV2NkgID/UBpOMWITBMmCJNABWDfREnC70HXAJBiRJZBdhlUCrBibDgwJmEfBEgDZyQoG1sJZ8QAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdeCVw2kHQcuLtQPcD3LlY7QAAAIEOBc8LaAcAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAM0lEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdREmgWIOiHVkGJoEsBnYhXgl0P8Cdi9WDAFybDANVXhK2AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJklEQVQYV2NkgID/UBpGMTJiEQRLIkuA2HDdg0YCxSsoTkSSYQQA8qYQA2mevikAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAHUlEQVQYV2NkgID/jCACxCKFwQhSDAYwXWARsDkArNIJBMuc9PwAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAFUlEQVQYV2NkgAJGyhn/QUaAzAEzABU2Agls+2mEAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAGElEQVQYV2NkgAJGyhn/GRgYGEHmgBgMABVAAgogF271AAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANklEQVQYV2NkgID/UBpGMTJiEQRLgiSQAVwnugTcWKJ0IDsAbDkMwCTAYtjswHAVSAdcIU6jAKevCQfmOOLwAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAIElEQVQYV2NkYGD4z8DAwMAIIkAcGAMuQoiBqR0kwggAxoUFB1CoJVAAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAKCAYAAACe5Y9JAAAAG0lEQVQYV2NkYGD4z8DAwMAIIkAcGAMuQiYDAKCqAglJxe2oAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    s222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAKCAYAAAB8OZQwAAAAJUlEQVQYV2NkYGD4zwABjDA2iAECIAk4G8aAyiG0oAjAzBk4QQDx/AQJlvcoDAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    }
                },
                Heleela: {
                    resize: !1,
                    height: 7,
                    spacing_top: 8,
                    spacing_left: 6,
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAJ0lEQVQYV2NkgID/UBpOMaJJgPhgRcgSMDbYBLgKfEZh6IBZTpwEAL5EDAEMU2EGAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAK0lEQVQYV2NkgID/UBpGMTIiSaCw0SVgOsE60I0BG4LNKLCduOxA0YHiMADKqgsEaDqRqAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAIUlEQVQYV2NkYGD4z4AEGJEEQGwGmACYQ5oATDXcDLg9AMHGBwYKo9yjAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAI0lEQVQYV2NkYGD4z4AGGKF8kASIDVaALggS+0++INxMDNsBZRAMAUwiOtwAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAI0lEQVQYV2NkYGD4z4AEGJEEQGwGmACYgywA5+NVgWIG3B4Awb4HBk9dTEUAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJ0lEQVQYV2NkgID/UBpMMaIJgvnIgjA2WBBFK0ghTpUwi1C0YwgCABpKBwdpHO+uAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKUlEQVQYV2NkYGD4z4AKGBmRBEFsMIAJwgWIEoSZDTcTph0kgWIR3A0Af7gJByhwwvgAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAHklEQVQYV2NkgID/DAwMjDA2nEGUIEgrCiBNO4btAJkkDQG9HqVlAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAHCAYAAADNufepAAAAGUlEQVQYV2NkYGD4zwAFjFAaJMBILgduGgA9YgcGXO/GXQAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKUlEQVQYV2NkgID/UBpMMSJzoJKMpAmCzIPpALNBHJggzDK4mci2MwIAU0YJB9xS0lkAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJ0lEQVQYV2NkgID/DAwMjDA2nIFPEKQDrAXMQAKMyNrh4kSZCXYJAHJYDAKZwxxaAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAIUlEQVQYV2NkYGD4z8DAwMgABSAGtQRARoINhhkKs4QBAMI5Bwd6rkx5AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALUlEQVQYV2NkYGD4z8DAwMiAAP9BHJAgCMDZyIJwtTBBFBqZA1MJNxOrRSiCAOgYDgF0D026AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALElEQVQYV2NkYGD4z8DAwMiAAP9BHJAgCMAk8AvCdIBpZA7ICLBRRAmCVQMAQSsPAe5drGkAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAI0lEQVQYV2NkYGD4z4AGGJEE4WwYA0TDwH/SBUFaMcxEsR8AeQgMAYZLnh0AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKElEQVQYV2NkYGD4z4AGGKF8kASIDVaALggS+48sCDcEm0qs2rELAgDcSwkEYMMnowAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAALklEQVQYV2NkYGD4z4AJGBmRJFDYMA6IhgGQCXAdeCXAKqFGY+iAOQTFchS3AQB6Rg0HDPsx3gAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKElEQVQYV2NkYGD4z4AGGKF8kASIDVaALggS+48sCDcEmyAjQe1wBQDzLAsCEgmQ6gAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAALElEQVQYV2NkYGD4z4AEGJEEQGwGmACYAxMA0XBtcBmogv/IAmBVyIaCFQEAqWEHAzfTKn8AAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAIUlEQVQYV2NkYGD4z4ADMCKJIysCiyNLgvggBXCxgZAEAM8uBwelxUp+AAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAIklEQVQYV2NkYGD4z8DAwMiAAP9BHFoJgqyBmY9gINnOAAD0HA0BOdJE2AAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJ0lEQVQYV2NkYGD4z8DAwMiAAP9BHAoFQaaBjIABRpgFWAVhqsGKAJ9iCwQRUQNVAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAMElEQVQYV2NkYGD4z8DAwMiAHfwHSVBXAcg0EIBZCbYCBGAS6C5hJFoBzBRkDWA2AEU3DQS9dtv1AAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAANElEQVQYV2NkYGD4z8DAwMiACv6DBNAlQHy4SjAHykeRAAkiS4J1YKgG6USXgDkBq+VgYwFt1g0Dhf5oVgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALklEQVQYV2NkYGD4z8DAwMiAAP9BHJyCIHUwBQgGknYUs2DiGGaCzIerBHNgAAB5FAsBOAqAeAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKklEQVQYV2NkYGD4z4AGGNH4YAXogiCx/yBBdO2MMEEUHcgq4RLYtDMAABV+BwRhYNY0AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAJUlEQVQYV2NkYGD4z4AEGKECMJoBWQCk7j/xAiDlYNVww2AWAQDI0QwBWzx8wgAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAL0lEQVQYV2NkQID/DAwMjCAumGBgYAAJwPkgQZgAiiDMAAztMCNQzMQQRDYTbBQADsgHB363RM0AAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAALUlEQVQYV2NkYGD4z4AJGBmhEiAaBGCKwBLoACRJnATcGJARGGbDzIVZjmERAP08CAcowyckAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKklEQVQYV2NkYGD4z4AGGKGCIBoEwApgHGS1/5EFYcYw4lQJUoFhJobtAJFFCQICBG1BAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALUlEQVQYV2NkYGD4z8DAwMgAAWA2iEOaIEgrXBeMATUSQsEsgAnCLUJWBRYEAKilCwc7KHSXAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAKElEQVQYV2NkgID/UBpMMSIJwtj4BVGMgGtBMvM/SBBkCbLZqByYagAjzAgDWzep5gAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAHCAYAAAAvZezQAAAAJklEQVQYV2NkgID/UJqBEcoB0WAJdAG4CpgO3FpAKsDaYWbAtQAASBYKAtS1FdgAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAJUlEQVQYV2NkYGD4z4AGGNH4YAXogiCx/9hUMiILgrSC+cQLAgDxjAcFwADvUgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAALklEQVQYV2NkYGD4z4AGGJEEQWwQ+A8ThAnABcEMJBMYcaoEqYKbB9KBbBHcBAAxSAsCJzk2mAAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAK0lEQVQYV2NkYGD4z4AGGKGCIBoEwArQBcESMEEUA2DakAXhKpElsWpnBAD5/goCIRqEfgAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    }
                },
                Darkstar_3: {
                    resize: !1,
                    height: 12,
                    spacing_top: 13,
                    spacing_left: 11,
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAO0lEQVQoU2NkgID/UBoXxciIRRFIDEMzukJkPoocWQpxOQPsfpxWQd0JlydbIbbgoZPV6DGE4hmiohAAre0eA2qMPasAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpAjERgdwA9AVopsMl6efQph7iXIjsrMY6OdGWHjiDB68AU5UFAIAMQgeA50LZ2UAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMklEQVQoU2NkgID/UBoXxciIRRFIDBmADUFXiE0jWBOyBE5Fw1ohtuCChydJAU5UFAIA5GQWA2QTZlAAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMklEQVQoU2NkgID/UBoXxciIpAjERgYomtEVIksiyzHgUwgyHS4/YhTiDR68AU5UFAIAOPweA2TznIYAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAANklEQVQoU2NkgID/UBoXxciIpgjERwdgQ5AVomtC0UB7hTDrMDxHe6txhidZVsPCFWeAExWFAOR0FgMDpOeuAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMUlEQVQoU2NkgID/UBoXxciIpgjERwdgQ5AVomtC0UB7hTDrMDxHe6txhidtrCYqCgH4ZBYD4fD3zgAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAPUlEQVQoU2NkgID/UBoXxciIRRFIDBmADUFXiE0jWBOyBE5F9FWI7CEMz+AKAfIV4g0uQgEOjzGYowlGIQA6pRoDzeJ4egAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALElEQVQoU2NkgID/UBoXxciIpAiZDdMAFxtECrF5BuzRQeRG9IAnLxyJikIABwsfA8Lwq48AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALElEQVQoU2NkgID/UBoXxciIpgjEhwEUzegKQYqwiWEVHFUID1SSApyoKAQAvFwWA+b+U7IAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMElEQVQoU2NkgID/UBoXxciIQxFIHAbAhuBSiCE3qhA9sFFCBD14MAIaphsmQTAKAXRcFgOUS7hiAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpAiZDdKAwh9ECmEeQ3cvioNBkjCAEQq4PEPQRJhJRCukLByJikIAaAMfA84/NH4AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAKklEQVQoU2NkgID/UBoXxciIpAiZjaFhVCH1gwcUyCBT0QE41mASBKMQAABrFgPiUB3GAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAANklEQVQoU2NkgID/UBoXxciIpAiZDdMAFyNbIbIzQIbA+egmEq0Q5Clkkyh3I3owDRYTiYpCABExIQN9zS/KAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAQ0lEQVQoU2NkgID/UBoXxciIpAiZDdMAFyNbIbozcJpItEKQp7A6B5sg0QpB1sMUE/Q10QphpsI9hy8cQXIoComKQgAsVyQDGACA8gAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALklEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCLjSokOnhg4YYzwImKQgAo/B4D2akYVgAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMklEQVQoU2NkgID/UBoXxciIpgjEhwEUzcgKsWmCKx5ECpF9TbRnUIIKn2fooJCoKAQA7rsaA7z5S2AAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCLDVWFWN2NyzMwcaJ8DQtTcFiSFOBERSEAZhcgAxCAmNAAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMElEQVQoU2NkgID/UBoXxciIpgjEhwEUzcgKsWmCKx5ECpF9TZRn0D3GMMCeISoKAbDpHgOf8AySAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpgjERwdgQ5AVomtC0UBbhTCnIFsJ9yRedyH7YZAoxBnYyL4kGIUAkHgWA65XgEsAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAKklEQVQoU2NkgID/UBoXxciIpAjExgbAhiArhCnCJjaqEB6ElAcPUVEIALhgFgMWuMBlAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALElEQVQoU2NkgID/UBoXxciIpAiZDdMAFxtVSP3gAQUyyFRkAI8xmATBKAQA2AMfA1Tnx30AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAM0lEQVQoU2NkgID/UBoXxciIpAiZDdMAFxskCkHuwukUdA8MoEKYOzEiAVcgY1VIVBQCAHj7HgOyqdUWAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIpAiZDdMAFxtkCkHOgXkQrxupqxA5TJFNZkAPHqIVoscQimeIikIAnFAjAyRvX04AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOUlEQVQoU2NkgID/UBoXxciIpAiZDdMAFyNLIcgUnBrRrSNaIcxUDA/i8gBBhURbTZRC6oUjUVEIADDsHgP1QpZeAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMUlEQVQoU2NkgID/UBoXxciIpAiZDdMAFxskCkHuAjkFGcA9ic0DMA0oITFUFBIVhQBOwhoDdrNy6AAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAPElEQVQoU2NkgID/UBoXxciIpAjExgbAhiArxKYILo9PIYocxQoxDMBmIlZb0AVxOoUshXiDiqQAJyoKAZx0FgMI89SmAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAOElEQVQoU2NkgID/UBoXxciIQxGGODaFIDEMW8hWCDONKBNBiohy42BXiOxrWCyBYw1r4GKJR0YAlGwWA5MfJ2EAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAR0lEQVQoU2NkgID/UBoXxciIRRFIDAbgBqArxMlHlsBlOthUbJLI7oTL41OIIkexQgwD8HoAq2Ohgjidgh482GIGHjxERSEAY50YA/9QoxAAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAPUlEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCLYZNENpF6CmFuxepGdB+jOIu2biQpePAGOFFRCABRjhgDxlLwTAAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAP0lEQVQoU2NkgID/UBoXxciIRxGKHC6FIHEUmyhSCNNM0GqiFCKbgtdEohTCfIoeluAwpjgcMQzBCFgcccgIAEK0GgNze/cgAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAO0lEQVQoU2NkgID/UBoXxciIpAjExgbAhqArxGky7RWiuxHuFGSrsXkELk9bhdhMx2k1eqCjeIaoKAQA+4AXA+SK6+MAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAPUlEQVQoU2NkgID/UBoXxciIRxGKHC6FGOLYFGLVjC6I0ylkKQRpQgfw0EA2Ea97aasQ5D50d6K4kagoBABIkhkD7DiHPwAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAN0lEQVQoU2NkgID/UBoXxciIpAjExgbAhiArxKYILo9PIYocxQoxDMBlIlEKsWrGJkhHhURFIQCUYBYDYexYVwAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAMUlEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCL0VYhzKrB7Eaig4egZ4iKQgAd9R0DAJhezAAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAQUlEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCL0VYhzCp0D4Hdic1dyAqxuhFb0FCmkOjgweYZlAAnKgoB4sAaA1kzD70AAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAALklEQVQoU2NkgID/UBoXxciIpgjERwZwA5AVomsCaYCLjSokOnhg4YYzwImKQgAo/B4D2akYVgAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    }
                },
                Lava4267: {
                    resize: 1,
                    height: 5,
                    spacing_top: 6,
                    spacing_left: 4,
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV2NkYGD4zwAFjCDO////GRgZGRnAHNwyMGUAikAOAcrF+3AAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4zwAi/v9nYITQ/xkYGRkhHMIyAHlWE/huZ7j8AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGklEQVQYV2NkYGD4zwAFjCDO//8QPgEOTA8A1zsN+K0XLxQAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4zwAi/v9nYITQ/xkYGRkJcWB6AIWhE/vKrfqbAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4zwAFjCDO//8QPpgDYoAEsMuAZAHLRw34EqdRrwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4zwAFjCDO//8QPpgDYoAEMGVgygDgMhD1cjfJQgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4zwAFjCDO//8QPnYOIyMjRAamBwDXaw37eCOlbgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4////fwZGRkYGRgwOAxRgysD0AAA7QxEBmOp70AAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV33LoQEAAAiAMPj/aCwGk7QFBGKzSqXiwX0GAFkW+NftOzUAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIUlEQVQYV32LsQkAMAyA9P+jDYF0rZugAnFYpVLxkfdsNglQGfWtm0nlAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4////fwZGRkYGRgwOA0QEiwxMDwCR7BP+0bKa4wAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGUlEQVQYV2NkYGD4////fwYQYCSBA9YABACHmRD1bb59ggAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAKklEQVQYV4WKQQoAMAyD9P+Pzsig3XEXE0SBUCSovZQZMbvyJq30lV95AEQ4FwG0JrxXAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJ0lEQVQYV2NkYGD4////fwYQYGRkZGAECYA4IEG4AIwDVoVVC7IZAII2FAFREIYzAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJElEQVQYV2NkYGD4zwAFjCDO////GRgZGRnAHAwZkABcGYgDAIoHDftrKQwJAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV2NkYGD4zwAFjCDO////GRgZGRkIcEBaQEoB4TcQ/lbzSGIAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJElEQVQYV2NkYGD4zwAFjCDO////GRgZGRnAHJAEWABDBqYMAODpEP6s9Dt1AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIUlEQVQYV2NkYGD4zwAFjCDO//8QPpgDl4EJMzIyosoAAIDCCv7LbuG1AAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV43HMQEAAAyDMPAvmj4TsHwRiGOVSsUzAypEHPXXJqZoAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAG0lEQVQYV2NkYGD4////fwZGRkYGRhI4DFAAAIlDEQHMmbdoAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4////fwZGRkYGRiI5IA0g9SB9ALMuFv6A7rCZAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJklEQVQYV2NkYGD4////fwYYYGRkZGAkXRCkDWQMXDvIPJgAiA0AxikXAdqxzMcAAAAASUVORK5CYII=",
                        spacing_left: 6
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIElEQVQYV2NkYGD4////fwZGRkYGRhQOSBgkCpbFqQwAAO8W/syQxWUAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4////fwZGRkYGRhALxAALEMcBANs4H/WskRtEAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJklEQVQYVzWLxxEAMAzCpP2HJodj80IUgbAyyYDKQE0zO9vyw30eRrwQ++h++G4AAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAHklEQVQYV2XIoREAAAyEMNh/aN7V1OVilYpAAN48DIQgEQEWfGzSAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJklEQVQYV2NkYGD4zwAFjP///wdzGBkZGcAcEAMsAFIGlYRwYHoA8AQN/oYYrfMAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJklEQVQYV2NkYGD4zwAi/v9nYPwPIhkYGBgZGSEcEAMsgCKDrAcAqYkT+6GeNpMAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAI0lEQVQYV2NkYGD4////fwZGRkYGRgwOAxQwgtUwMECUIXMAUysRASi4GZgAAAAASUVORK5CYII=",
                        spacing_left: 4
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAIklEQVQYV2NkYGD4zwAFjCDO//8QPpgDl4EJMzIyImRASgGJuQ37SO3wUAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2NkYGD4zwAFjCDO//8QPpiDIcPIyIgqAwB0zgr+8u3z+QAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQYV2NkYGD4zwAFjP///wdzGBkZGYjkAAAdExEB/JZkggAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4zwAFjCDO////GRgZGRnAHMIyAHVMCwGqDo0PAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJUlEQVQYV03JwQ0AMAzCQHv/oalKo6j8DguEmRdJUCm29IZXfhyiKA4Bu3ymkAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAH0lEQVQYV2P8////f0ZGRgYQAJEgPgNIgAAHpB6kFACeOhP+HucMMwAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAHUlEQVQYV2NkYGD4z8DAwMD4/////4yMjGgMFCkAaPwQ/rlJqWUAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAGElEQVQYV2P8////fwYGBgZGAgxGRkYGAOjiE/XIhZVzAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAHUlEQVQYV2P8////fwYGBgZGTAYDAwNCipGRkQEAuRIQ+EwHUMcAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAJUlEQVQYV2NkYGD4zwAFjP///wdzGBkZGcAcEAMkBpcByyLLAAB8mxb43Bdv6gAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAHElEQVQYV2P8////f0ZGRgZGEIOBgQGNAZcCMQDpexP7PVUR8QAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAFCAYAAABvsz2cAAAAG0lEQVQYV2P8////f0ZGRgZGFAYDAwNEBIUBAOmoE/h3QASpAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    s51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHklEQVQYV2NkYGD4////fwZGRkYGRhCHAQrAHMIyANhADgESNXizAAAAAElFTkSuQmCC",
                        spacing_left: 4
                    }
                },
                AaronLightning: {
                    resize: 1,
                    height: 10,
                    spacing_top: 11,
                    spacing_left: 7,
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANklEQVQYV2P8////fwYGBgZGRkYQxQDlMjDilAApQlEJ1QnSj18CbAESgOvAKQF3DdF2EK0DAHyHJ/tw1pLMAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJUlEQVQYV2NkYGD4z4AE/v+HcBkJSsBVMoLUIunAKQGzZlDYAQCReCfv3j7FzwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAKUlEQVQYV2P8////fwYGBgZGRkYQBQeMOCUYGBjAOqAaEToGVIJkfwAAgPcn7wEFxioAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJUlEQVQYV2NkYGD4z4AE/v+HcBkJSsBVMoLUIukYUAmYVwj6AwDEFSf1cp1NBgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAIElEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JdGsG1A4ALM0V9V8Z4nwAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAKElEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JmDUwBRh2YEiQbgfROgCbiCHpnJK4awAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAK0lEQVQYV2NkYGD4z4AFMBKU+P8fVSNcBw0kGBlBpjMwYNiBIYHuFZz+AAAonhv1TKHPvwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJUlEQVQYV2NkYGD4zwAi/oMpBkZGRghNAwmwwUgAbgdOCRq6CgAsYSIBNiQjQAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJ0lEQVQYV2NkYGD4z4AFMOKU+P//P1gHIyNIDQMDlMvAOKASJPsDAB6ELe9+k+6aAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2P8////fwYGBgZGRkYQBQeMBCVgSmE64ToGRIKBgQHsDxiAeosB5CusEgC4iSf77KcjzAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMElEQVQYV2NkYGD4zwAi/oMpBkZGRghNUAKsDFknTAdOCZgdMAUYdmBIkG8HQX8AAMFIJ+9xKMrGAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAIUlEQVQYV2NkYGD4zwAi/oMpOGAcohIonmBgYID7A10CAHbzIenjALCeAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAPElEQVQoU2NkYGD4zwAi/oMpDMDIyAgWA5GkKYQZBTMZZhJMHG4i0QrRTULnY7gRZiVBhejeJt/XVAtHAGa8LgGBZGHUAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAANUlEQVQoU2NkYGD4zwAi/oMpOGBkZASzQSS9FMAsh7kFww0EFaDrhGnA8AXMaJwK4BLEhgMA2XgoAaJ0T8MAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJklEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuY0Al0L2C0x8AL2QcAbryXgoAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuA6cEujXE2wHTiWEH+RIA1SEb9V+gqK8AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAYAAACJxx+AAAAALElEQVQoU2NkYGD4z4AF/P8PEWYkWgFcByNIDwMDhglDQgEsKNAdixEO6AoAWDE56f/4wu8AAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALklEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuA6cEzBq4AnQ7MCRIt4NoHQChlyH7ObyMXQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JdGtw2/EfzQxGRpBaBgZGnBIEnYtuOQBePhX7Zt24dAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJElEQVQYV2NkYGD4z4AFMOKU+P//P1gHIyNIDQMDlMvAOLQkAGfuOenclfG2AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAI0lEQVQYV2NkYGD4zwAi/oMpBkZGRgg9RCXAjkcCcH+gSwAAhH8iAWCP9b8AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJElEQVQYV2NkYGD4zwAi/oMpBkZGRgg9xCT+Qz0Acz/cP7gkAM3pLftu5+D4AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAMElEQVQoU2NkYGD4zwAi/oMpDMDIyAgWA5HDVyHMl7BQwOlrnAr/Q7XiUgA3mViFAIPnOfuj2iLDAAAAAElFTkSuQmCC",
                        spacing_left: 11
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAKUlEQVQYV2NkYGD4zwAi/oMpBkZGRghNRYn/UMNhZsPtwilBRctxGQUAI74t++x+nnAAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJElEQVQYV2NkYGD4zwAi/oMpBkZGRghNRYn/UMNhZsPtGkgJAJfGOe8JHmrvAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAN0lEQVQYV4WPSQ4AIAgDp/9/dI0HSEQbuU4XKsA8ThHYPhzS1oK+oJQV0I4LVPmoor+KYE6JOxZX8yH1+rXysgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV8WNMQ4AIBDCyv8fjTkjTDrLwtAUZNsAkqYaPQGwjSPWHP8OMpXxfPXjB1jozigBqj8/pAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAN0lEQVQYV4WPQQ4AIAzCyv8fjfGwJU6JuxbSIcA8ThHYPhrSzoK+oJKl68YFSj5U9FcRzClxxwKNkxv71dECOQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAMUlEQVQYV2NkYGD4z4AFMOKU+P//P4oORkaQWgYGRoISMJUw6+A6cErAVRK0g2R/AAC/BBwBXttm/AAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALElEQVQYV2NkYGD4zwAi/oMpBkZGRghNAwmwwUgAbgeGxH+Yc6AycFdRTwIAjAEiAYnkD0QAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANUlEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JmDUwBRh2wCX+o5nByAhSy8DAiFOCoHPR/QgAKJ4b9RtbCKAAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAALUlEQVQYV2NkYGD4z4AFMBKU+P8fVSNcB04JdGuIt4OREaSWgQHDDgwJou0AAC5uFftdKga1AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAKklEQVQYV2NkYGD4z4AFMOKU+P//P4oORkaQWgYGRhpIwMyGWQm3g3IJAKfrLfXudqbRAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJklEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuA6cEujUDagcAMmcWAUt13poAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAANklEQVQYV4WOQQ4AMAjC4P+PxiwbHMyMXktBAhA+xxVIVyRPFogxgj4zb8gdT8nGCpzMEzY6KKuhIfsLVDWRAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAJklEQVQYV2NkYGD4z4AFMBKU+P8fopGREaSWgQGuY0Al0L2C0x8AL2QcAbryXgoAAAAASUVORK5CYII=",
                        spacing_left: 7
                    }
                },
                "default": {
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGklEQVQYV2NkgID/UJqREcoB0WAJ4gRQzAAATN4IA/yXnoQAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQYV2NkgID/DAwMjIxQBkgAzEGRwaqMAQCj5wUFBf2pmgAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2NkgID/UJqREcoB0WAJGAOmCqwCzgExYFqg4gwMABAOBgTA2bPJAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkgID/UJqREcoB0WAJGAOmCrcKuBkAIgEHBJhT9BsAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJUlEQVQYV2NkQID/DAwMjIxQPogDAmABsAyMhjHgGmFaQAJglQD/HgYFRxqNXQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkYGD4z4AEGKECIBoMYAJwPlwGKvIfQwUA39UFBAG4wloAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkgID/UJqREcoB0WAAE4Dz0VX8hymFmwEA9h4GBZZ2+8YAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHklEQVQYV2NkYGD4z4AAjIxIHBDzP14BkFYULWABAMPpBQS6CdR+AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGUlEQVQYV2NkgID/UJqREcoB0WAJOIN4FQAl/QcEOvQMUAAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAI0lEQVQYV2NkgID/UJqREcoB0WAJOAMqwAATgPHhKmDmMAIAA+IGA5WzvzgAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAH0lEQVQYV2NkgID/UJqREcoB0WAJmACUz8CAUwVcCwAu2QgC/bjjowAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHklEQVQYV2NkYGD4z4AAjIxQARANAv9hAjA1RKgAADHxBwTmLpwaAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkgID/UJqREcoB0WAJdAEGrCpQzAAAKgEHBLNsDBwAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkYGD4z4AAjIxQARANAv+JF4CZwggAVNYIA3NWX2YAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHElEQVQYV2NkYGD4z4AEGKECIBoMYAJwPkEVDADr4gUEb0NJSQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHUlEQVQYV2NkYGD4z4AEGKECIBoMYAJwPk4VcC0A6+sFBXovt7YAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIElEQVQYV2NkgID/UJqREcoB0WCALABWha7iP0wp3AwAHQ4HBO/WInkAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAH0lEQVQYV2NkYGD4z8DAwMgAAf9BDKwCUAUQpfi1AAB3mAkBgHdxVwAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGUlEQVQYV2NkYGD4zwAFjFAaJMCInwPXAwCjsgUEYh/r8QAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHElEQVQYV2NkQAX/GYkS+M/AwABTCdcCEgQBRgDVmgYC9JzoZgAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJElEQVQYV2NkYGD4z8DAwMgAAf9BDJgAmIYJgGTBqnCqgJsBAH/9CQQFQ+vaAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGklEQVQYV2NkYGD4z8DAwMgABSAGmQIwIxgA7DcFBQWEkdsAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJ0lEQVQYV2NkYGD4z8DAwMiAAP9BHJAgCMDZMAYKjcyBGQDXjmImADXLCwEJA7D+AAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAJUlEQVQYV2NkYGD4z8DAwMgAAf9BDJAACIDZMAG4BLIAiha4GQCemAoBcKVkawAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAGklEQVQYV2NkgID/UJqREcoB0WAJ4gRQzAAATN4IA/yXnoQAAAAASUVORK5CYII=",
                        spacing_left: 5
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2NkYGD4z4AAjIxQARANAv9hAjA1GCoY0LUwAAAgCwYFQczmVQAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAH0lEQVQYV2NkgID/UJqREcoB0WAJvAIgbWAtMDPAqgFR7wkD3HH35AAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2NkYGD4z4AAjIxQARANAv9hAjA1KCpAWjG1AAA3BggELZAzJAAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2NkgID/UJqBEcoB0WAAY8BUMMJlYFphWuA6ANfdBQRKqEj9AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAGElEQVQYV2NkYGD4z4AGGJH4IEkwn0JBAAg+BQW0w4yUAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAHklEQVQYV2NkYGD4z8DAwMgAAf9BDDIEwHqhZjACAJWdCQJA96l2AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJUlEQVQYV2NkYGD4z8DAwMiAAP9BHKyCIDUwCTAN04ZVEFk1AwD2AgkEPab4CwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJElEQVQYV2NkYGD4z8DAwMiAAP9BHLyCMEm4SpBmmC44A8VMADXLCwGcFtUcAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2NkYGD4z8DAwMgAAf9BDAwBsAxUBSNWFShaAHO/CQJBNAo/AAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJUlEQVQYV2NkYGD4z8DAwMiAAP9BHKyCIDUgCRhgRNEGMwarIACpAgcEc9qTqwAAAABJRU5ErkJggg==",
                        spacing_left: 6
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIklEQVQYV2NkYGD4z4AEGJHYIAlGmACYA5IEEXAOsgBcJwDf6gUE3zmQOgAAAABJRU5ErkJggg==",
                        spacing_left: 5
                    },
                    s49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAF0lEQVQYV2NkgID/DAwMjIwEOWAFKMoAifQEBsIKtpQAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    190: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAFElEQVQYV2NkQAKMpHH+MzAwMAIABgABBkf5UEcAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    188: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAF0lEQVQYV2NkQAKMBDn/GRgYGGHKwBwAF/wCBjcn4hwAAAAASUVORK5CYII=",
                        spacing_left: 3
                    },
                    s191: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAFCAYAAABirU3bAAAAIUlEQVQYV2NkYGD4z4AAjIxIHBDzP0wArgpdBQOyCjAbALnlBAS711XBAAAAAElFTkSuQmCC",
                        spacing_left: 5
                    },
                    s186: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAG0lEQVQYV2NkQAKMUPZ/BgYGRhgHLIaVA1YGADH8AgaodaxbAAAAAElFTkSuQmCC",
                        spacing_left: 3
                    },
                    222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAGUlEQVQYV2NkgID/DAwMjIzYOGAxmAwmBwBl/AIGnkPsiwAAAABJRU5ErkJggg==",
                        spacing_left: 3
                    },
                    s222: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQYV2NkYGD4z8DAwAiiwQQyhwEGQDLYOQDKnwQE8rYkdAAAAABJRU5ErkJggg==",
                        spacing_left: 4
                    },
                    s51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAG0lEQVQYV2NkgID/DAwMjDAaxoDKQSiQIAUqAaklCASmABIBAAAAAElFTkSuQmCC",
                        spacing_left: 6
                    },
                    resize: !1,
                    height: 5,
                    spacing_top: 6,
                    spacing_left: 2
                },
                "Art Deco": {
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAHUlEQVQYV2NkgID/UBpGMTJCBUE0Mvg/4BJYnQsAcUwOA3q1iz0AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJElEQVQYV2NkQID/UCYjiAYRyAIgNlwCSRNYEV0lYK5CdgQDAMM8CQiY5S+uAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAANElEQVQYV2NkgID/UBpGMTJCBUE0MviPVwJNMcRoDCOgqsB2wADIAXA+jIEiCDMK3algEwBltwsEdbBpEwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALUlEQVQYV2NkgID/UBpGMTJCBUE0MviPIQCVBevABjB0wBThlwC5CKflGM4FAMe0CgT8rlbIAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAK0lEQVQYV2NkgID/DAwMjFA2mA/jkCaBrhrDKCQrUC1EloBbjqIa2VUYEgBDswwBBumLvAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAL0lEQVQYV2NkYGD4z4AFMEIlQDQKgElgiGOohKr4j1cCZDm6ArAOnBIgY9GdzAgAh4cKBIDzw9AAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALklEQVQYV2NkQID/SGxGRigHJAhjg4VAHAxBoiSQjIeYhMuo/3glQFqRnQo2CgCk6AoHBfWQhAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAANElEQVQYV2NkYGD4z4AFMEIlQDQy+I8uAJNEkQAZCTcBwwioJFgFXDsuHTCjwAqx6QBLAABdjwsGC5GHMwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJUlEQVQYV2NkgID/UBpGMTJCBUE0MvgPEyBNB0g1VqNIl8DqXADvrw0EH3F/qgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALklEQVQYV2NkgID/UBpGMTJCBUE0MvhPngQ2OxjQzYbZA7YDHYBcCHYVulFgMQCwUwsEL9X5YAAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAK0lEQVQYV2NkQID/UCYjiAYTDAwMIEEUNl4JZNUwg/+DdJAngeQ4CBOnUQBZXA4E4VcM5gAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJUlEQVQYV2NkYGD4z4AJGBmhEiAaGfyHSaDrIawDp1GkS2BYDgD7ow0EsknJggAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJElEQVQYV2NkgID/UBpGMTJCBUE0MviPS4KBZB04jcIvgdW5APO7DQQZvjmxAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJ0lEQVQYV2NkYGD4z4AKGEFcEAGSAHOgAMzHJgGS/09PCTQXMzACAH3bDgSjTa9aAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAIUlEQVQYV2NkYGD4z4AFMEIlQDQKoIEEsvlg+wjageFgAGd8CAfUe3L/AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAH0lEQVQYV2NkYGD4z4AFMEIlQDQKoIEEzHy4XaTbAQBnkQgICb1/BwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJUlEQVQYV2NkgID/UBpGMTJCBUE0MvhPPQkGdKPgjsBrB1bnAgAtkA0EfmxgCgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAIElEQVQYV2NkYGD4z8DAwMiACv6DBAZcAs1REGdidRUAD7IPAfvTYBMAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAG0lEQVQYV2NkYGD4z4AFMKKJgRSBxQZcAqtzAR+ICAcDZ/2UAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAJElEQVQYV2NkgID/UBpOMaILQBUx0ksC5CJku8B8mACyc8FiAC2RCQg7FxboAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAIElEQVQYV2NkYGD4z8DAwMiACv6DBOglgWY3AyPplgMA9tYPAnlNQ4QAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAG0lEQVQYV2NkYGD4z8DAwMiABkACg1cC3bUMAGhICAjplMR9AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAKUlEQVQYV2NkYGD4zwABjMhsGAdFEKQAWQKkC6QbLEZDCagDMe2ASwAAV2wVAl+bVB8AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAMklEQVQYV2NkYGD4z8DAwMiACv6DBEASIIAsSYEEzEiYcXCj8EqAHABzIYoOmIPBrgQA5qYTAfamXtAAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAHUlEQVQYV2NkgID/UBpGMTJCBUE0Mvg/4BJYnQsAcUwOA3q1iz0AAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAI0lEQVQYV2NkYGD4z4AJGBmhEiAaGfyngQS69TgtZ8BlOQMALJEMBQSUP3wAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAKUlEQVQYV2NkgID/UBpGMTJCBUE0MvhPQwmQI8DGY7MD7EKYa9CdywAAsEMPAqnFMlMAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAH0lEQVQYV2NkYGD4z4AJGBmhEiAaGfyngQS69WRYDgBHdg4DkHAESQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAK0lEQVQYV2NkgID/UBpGMTJCBUE0MviPS4IBphKrUWimQOwk2Q6wDqzOBQArGAsF6pMEbQAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAGUlEQVQYV2NkYGD4z4AFMKKJgRSBxQanBAATmQgIVtYshwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAIElEQVQYV2NkYGD4z8DAwMiACv6DBAanBMihIJchA0YAJLcPAtg2aHIAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAKUlEQVQYV2NkYGD4z8DAwMiACv6DBOghAbIW2R4wG+YanBIwXSAarBgAIQQPBKHiWEIAAAAASUVORK5CYII=",
                        spacing_left: 7
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAK0lEQVQYV2NkYGD4z8DAwMiACv6DBIiSgCnC0EElCZAxIAB2EMyZyC4DswHRthUCZ4dymwAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAMElEQVQYV2NkYGD4z8DAwMiACv6DBKgoATId2TgwG2YpTgmYLhANVgxzFVwAaiwDAAxHDwQvIdchAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALUlEQVQYV2NkYGD4z8DAwMiACv6DBHBKgNQiS4LZMCNwSsB0gWiwYgxLyZcAAGUkDAfv8mklAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAALklEQVQYV2NkYGD4z4AFMEIlQDQy+I8hAJVlhEnAjIMrxGUUA147QMZgtRyrcwE6qwsE2AB23gAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    resize: !1,
                    height: "8",
                    spacing_top: 9,
                    spacing_left: "4"
                },
                "Old English": {
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAeUlEQVQ4T82TQRLAIAgD4f+PbgdGnABBD73UG7JGhKjS17O2FFMpEJGAgtn5G2gHnEHQ1Cymqgw0gQYHyB6AsCJY603KWNMncKveFP8G1knFvL2fdWRTi1LDm2PWhnugjpBdP4IIh6OazYjhux+pvabCET7+GexdAl+w3SUP19ZsSwAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAWCAYAAADjGu3TAAAARUlEQVQoU2NkQID/DAwMjDAujAESRBEDSSALgiTBimESyArgEjAjYDpHJeChSqUgQY+o/9hiEGwpPI7RYpIRWQKkEJ4gAPsLGBUM3p7lAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAeUlEQVQ4T62TSw4AIQhD4f6HnolkMNAW42LcWV74FHXj85iZo4zCgvK0WL1UiOAEEVp6asFUAbO0NhCcWvFa+jgY2VCmptLCypD+BcmuqcfmYfqIPco1qoyUTWWUEIIjVMEjhKB6IJuZgrStWzBej/JNbkZ+pq/2jr1IIB0WLlbutgAAAABJRU5ErkJggg==",
                        spacing_left: 11
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAdElEQVQ4T62SWQ7AIAhEh/sfugZTCctgU1v/lOcMm6Ce634SHwoXAAsqjAczpDFTXyCDVNXeO8UiwHKknzOYe0CtWwiAdIq+uMk89dHix4o+z2D/S9XbyTCHmQKbNe2E35Bu/VpF6vR6H0OFaejfR6jJlzYNlgofDWHLFKAAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAWCAYAAAD5Jg1dAAAAaElEQVQ4T72T7Q4AEAhF8/4PzTIl6YPN9M/uKXNvCthVAaBIaTkMASEq1jUoIYRDEEVq+ATKl4ZXH4HaN3fiEbil4NlzBTqRzyhlCiF8BVqT0qyp6S2oF7fbl204b7oForh9Bw8kmPUGq+IgFVDXDosAAAAASUVORK5CYII=",
                        spacing_left: 11
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAWCAYAAAASEbZeAAAAd0lEQVQ4T62SSQ7AIAwDk/8/ulWQcBPHLIf2hMQwjQ1u3/ekdVn6X5DfmBqUD2ESNm2hSCaB0M0NhmYdY58h1RUGXxYZomxic0unBod9mcjMrqD43QB3pgaVXvhlhInjt0tXUKuCe1KP8/ieyt0hSVJhNq5ApnwB+VQdDULsTtAAAAAASUVORK5CYII=",
                        spacing_left: 10
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAXCAYAAADZTWX7AAAAfklEQVQ4T6WTUQ6AMAhDy/0PrYEMBGzAxH2Z8NYWZAJ+LgDipfhIrAKl3qEMBPgFenwBeI6XWlYqYc8ltRSH/DazLxDr1MJrYVSZoDIrpkS7y3Z0DFnJ7X3SobgFX7tTwNQmu38QDd/t8rLFaPoP7sts9b4qKxTdHHJ9CGVtbgY9Jg54aDZfAAAAAElFTkSuQmCC",
                        spacing_left: 10
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAWCAYAAAASEbZeAAAAa0lEQVQ4T6VSQQ7AIAiT/z96C2ZokTa6zYMRLKUNWJvngnd62hNJgP+fgOwYFK2iIPR4vuf8GsEiPIGYqcS+tiit0B2yFY2MaQuiTpntIgNBOJpU/BlUzDCmfyApWu2TbPeKiQ4cN1NtRLsBgxwYFZtzvLcAAAAASUVORK5CYII=",
                        spacing_left: 10
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAWCAYAAAASEbZeAAAAcElEQVQ4T82SUQ7AIAhDx/0PvQWyNoJF9jk/TNBHlaZ25XWX2ryO7V0VwLl9gajkKmuDq1AZFwoi6BA6qpKE6iCA4uNqqvRCB3F8yHf+bD4dwZ+ZGV5Njm+QclxCMmOT49G0RqUkN8oxvjS6S2M6fwBpdCEL1kx+1gAAAABJRU5ErkJggg==",
                        spacing_left: 10
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAXCAYAAADZTWX7AAAAfklEQVQ4T6WTUQ7AIAhD6/0PvQWTkoIgH/onvnRAu4XzfACWlsMFgAE8/qaQAgGcIIMXIarY/VDUYqvaQfYZV3yGXC03Wu7tBpU96QJpzQbLvYh3DoVxk7kBItg2XqTFS7s39a6LTWkwZTx8t+lGiOvZqjlPZbS7DI0/Qp4SPxTRJg0gR8DVAAAAAElFTkSuQmCC",
                        spacing_left: 10
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAo0lEQVQ4T62UUQ7AIAhD5/0P7QIZppaixmx/Y3tQkNqe/HQRaxCz7w0D9k1Bwdi/DlmAM4liKTSBWGmnQoIMKfkDjGoVFL1hr97j7+CYIE17K/UKRIgHtKx4BGLGmOwVyFApNc5ntae4d2lXd0ueFgCzKZlHUtXaHYFsNdV/aaupl+8l2Q7PTZkYXY9m6NN1sLg62FrSVnyeSpVfVpUfqw3yRC/BBzgWUzsU0AAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAAA0klEQVQ4T51VWxLEIAhb73/o3dEpNoTELe0XykMIgY7P/X1BnuK4znE/zygvNRtRjH1E57hcvkrBQcKGbVOAyCScOW3UY6kDo+PL00jWDDisCvjleXkEjYDdIPLrjI8tsZNBlJWyfBMgceHEAwaRibZBVAqFgbTjNqYei44U4ikeuDYqEFtttCUoDjgMCuiO4+0AzP1WF4JZmN4TOS0UN4lc4hED5PjTzVTG2bFSbalSQlmYPPvXOQ2gAkul74KnraxG22GR1jWvsb9OaKB+Hq0APx58UBGc5NkPAAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAk0lEQVQ4T+2UUQ7AIAhDx/0PvQUzTClFTfa7fYHjWYKAXfvvhhALexrEe7D/QwhDTIE7aFzAYCiEWqeaFBmKiyMD96eNiipFVE5lCFCpKcUJfwL5nZRfqs9V6/wfpMbGp9oWR00NtlxqAB4d1fjljDvnRHEIcZOnYX0dno7BrcDVUikboFsVJZNudXRqR8uK4STyAIB4ORWtj1AwAAAAAElFTkSuQmCC",
                        spacing_left: 15
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAAl0lEQVQ4T91UQQ7AIAjD/z96i2aQ0tUEFk/zZDQtBQrDzC4zG/bhTNAEV08K0gXPIEHgl070IEAZbYJdobyITqgUDgVGoNdEKmQwRmIS70ik93OwdOCRnNkg2CIenFRt5SwFZuMsk78eH/Mrl6VAR3Jm95RzxjYoX+N/mn9l+PKC4FErA30j8CSV99lOtiLANi0cym6v3xtXikYKmtxPEAAAAABJRU5ErkJggg==",
                        spacing_left: 16
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAmklEQVQ4T82UQRKAMAgD7f8frdMqTAhh4KinokmXCmVd/XODZNnaF+Tf4v0NTShZytiZzgZsNILRKmogssk2tgx27BokqhSRbMbjMaOiMRHJY2MqGh++i72MnVD9VT8jd4aKU72nxJ8bscZtqurWhMKjgK+Oavz0jltuQjwgbvJwWb9gdDv6QfIq0gSoRkXKpBodFXk0rNgcIA/sUTsUMtRyJwAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAAAn0lEQVQ4T+1UQQ7AIAib/3+0BiekYgW3szu5BEpbtOU5/yqUlnGuejiBQQCrPwWgzYKSAWwbB4USAWiz1Hj98t97/wKkHrCJ2jQN9QyYZi8BN7Z48AVg8QBNkyk7EycpKMGc1VumqyJbSE2MGIQmokHRPbgMSDCwPLgmvm+Bhcnkl38LGDIegIaPxbNbA04OczMKiyzy+kwF8EyytDbCDWPuNBh6LJa1AAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAYAAADUUxW8AAAAqklEQVQ4T52UURKEMAhD7f0PrdMOdCAkWN2/LTwQAoyr/91mHsyNPpqjg5FL/gpmICYff+HFMThmdTt7KzB+bgw+bbLmrkFt5igJOsqgWNP8f9Lp1S90VjB7P4KxaVvvk8wo5y4rwkxTNgufYAxAYXdig0IV6Gp2m6q57XaE2RAV2GVgwzNtafqo+GFxyzJYgLSSapsQTmdJTo+tX4TLPevg15snR4+Q5eo8U3I4E0jt04QAAAAASUVORK5CYII=",
                        spacing_left: 16
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAbCAYAAAB1NA+iAAAAxklEQVQ4T6VUWw6AMAjb7n9ozczADssr+rU46KC0zPF+1z5O5x+7HxIsl5CrxxVDk1cEXraTEaBVNr4kFXQAVjsaj4kLGLlgvdv7F2mX1QF4KOhUIKUfE6sCCOHCn4Iw8iTIjpjGRkKKBHRU4KkwE9lTqdVBNoWQg4oOfgGgoX5NgeqAEVmegvRuE9wdgJ6JlGjVRx/KANIlE0k5TfYMUvHHZ6EcW4Y8jVY+2kYzWT4sTmmtRyC0SmvnDAB3hbqRse39+7RxAxqwTBGLmi7MAAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAiElEQVQ4T9VT0Q7AMATU///oNWTsKK0se1mfJNzhrgY974I4hoOIJM+BvgpgxVyvAC3GpBIikQNk3Rx7HAnnzjoKIbK+BriZVR0lzzp8BpAVTj4sMkcfSofvROpDtcMy0knWNoALzciOcX8CxANKv3tlXBTDqbQ7zXi+4vTu+NFMOyAGdD6hgCfQTjAXP4TfDAAAAABJRU5ErkJggg==",
                        spacing_left: 13
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAnUlEQVQ4T9WUUQ7AIAhD5/0P7aIJScFWgts+tp9F46OA0nadfb0FrpM49AxuMkjl0ww0aKyzAJNBUKVtwfDvQAyEKY4MMJNFkYGshHdA1j3VMKf4GFQPAPcXRXV/8W63qUaFrWK8O1uXFAdU6uoPm1OukXW23FVTXUZKzV86i5+B8QE4a8lczvkM1hBdjs1lNLF5JrNDCiEoDyhHvgHHPTgbiWheDAAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAAAt0lEQVQ4T7VVQQ7AIAjD/z96i0twpRQxS+ZlhpBSW+uGveuC/dwOM/Oa7+c3LS8yADZuAXiaGoI9kkXXgOwQYNYDYEW10gLri3lFUYEo4R+gX0D8vMwEByatWDB2SGmWdOnuSQWS3OHpTBctTfZ+FTaZceoOxyCwPxX2CKQKICa5BFLHqYStsiRvbJcbZ7QI7JjsLlpwlkG6l0yGULmzE1M+oZ3FKkuzFkTusnMMIl8r8RdQ+j21GwoGQRcQOIzFAAAAAElFTkSuQmCC",
                        spacing_left: 18
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAnUlEQVQ4T91UwRaAIAzS///oevM5I8amh051yVqwBGZvz3XNZZ93fPa1lUadPwKesbQ6E4YCg46A3tnB1iXthowILPfmzNzJ3v8ZiCazFej58hEFQS/RjhSIgE9VDbYp49FjmdNdyLeR43DzHlW61lgpcYKSLLnq6L8puylGDoEa7FcAcA7VQIdgVHaUBNkAZ0ovj/GwSoUAFj9S2g1l5y4WD+bC6gAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAxklEQVRIS92VSRKFIAxE5f6H1oIiVBM7A4ob/zI/PDN0knLkfmd3K8q92iebdmB4gcl/8gbt1dbgEVDDKnQ87hAMwgVimh44BdQ1o+l10uRrpbwVqKOpgbyK8BMgdnJLhJ8CmWRQ5G6XI+1Nmotkk+mknhSsb5Mgm0vv0RJQGrEFiLWRlYSrKVOOKeV/ArHWo8Fs20Q1tDZ3a2oWqOfZlBwCra0sEbEtdFsclrB1Wgj1shoHh1276IDRA2ytqUcwNmL0qyvGCyvqYxlREFs8AAAAAElFTkSuQmCC",
                        spacing_left: 21
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAAwklEQVRIS8WVUQ6AIAxD5f6H1kAyUkphI6D6Y6LjDdqNpWv9uWFJ4uXdhwkfQRjWMKLAEczAlRMBGoxjOUn57wHzohxjb1akg+4Cc4LGpE+ASpvRkd0dKjdNQ6X5koboLprDNfifhlgur2iIWmKHhI/MGnqmuJ2iTFF3R9OaqrBH7nqxJZnX8Bbj9XLotokcuUu008vqWrtPABujTgMTAnn4zDQczhcDejODK4L1q+aodlLFq04i5VLzYjp3J/OlbOQB6tZJGOnV7OoAAAAASUVORK5CYII=",
                        spacing_left: 21
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAArklEQVQ4T72UUQ6AMAxC3f0PrZkJC6NgE2P0T22ftDLG0V8nlQwtLw+kgJvxaut5ArjmAnEAlTzvZ50C714FuCIAZn15z4A0LwMUMgBI80J6VKoAnfUzAO9rU8sK3DisAI2bSr7pAOyxpeI3AH89joBFJScCUpboGnTrr3zg/pCqiE5UiyfLW4CT6wDlNKbkcadxAZ9Oo+6Anbh+a5cHbQR2iaQGKhGcMtHGlwvwC+86Qw8ohstcAAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAbCAYAAAB1NA+iAAAAw0lEQVQ4T7WU2w7AIAhD9f8/eotmsFI7xSXuCZUduVRqid8Fy/rYbQ/ttm3r1yil4M/GaY4G4PMOUWSOQoH9Ag/lIxWMoLkMsBUAUzE7QFYAjmCAHAGoIvJF7qMOLGzrkjmjrwSgI9sIDQ1jHVA3u05QicsiKrVtAVgs2xHMAFLSWR2EF4iSzgLSOuAq/6oB1oH7P7RdpbAzD9ITiQXm66wSvwB1leNsIvlMnElVdSH4/9XBUAPOUT1nWYfjEaipHCK5AdcmTAvn6h+zAAAAAElFTkSuQmCC",
                        spacing_left: 17
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAYAAAAcYhYyAAAAtklEQVQ4T72U2wqAMAxD3f9/tLJBR5YmLYjom7M7preMq39uCBkqXB5CIALiON2pIAogQQrC8uf7jGPovssQFRiQqUKCEOLyRwiD1v2AuPwjjUrxYAjn/imkUn0oUamhkkg5qcWDDoLDeozBrxBUUaYTxXMTG6A0cK6l3I3Xc4KFdpByYnkd3HpYiPqrgsgtdg7mtriFqMJal+v8pHPg1V2GKONhS0yKFMQ6mDHwvcWdbPV9F/wBg0hHF7OZFEMAAAAASUVORK5CYII=",
                        spacing_left: 18
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAAAsElEQVQ4T71U7RKAIAjL93/oOrywMYcf3VW/lGQOHCvH852wtmWhvf/neDvIAJ7vCcML8JBKsJi6ILDpqN0UMmZYYctdBVGMlkE8eVjWjAmCWCmywQoED45A0nIMAKlnIOnrOADSViBLYsuYTBWrmubS3xab6v42CDN69Tq/gPDL1VnaVaxi+g3IzJzcCoJmsJyZh6iJrrHM/shew7azBQ5wozNvDZPOYlIMsplpA3sBYplAFixVicIAAAAASUVORK5CYII=",
                        spacing_left: 18
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAAsElEQVQ4T61UWw6AMAhz9z+0ZkQWKGUMo18ORx+AjIs/N4THe55xfZeQO5gkBNC7RwAsWbEDIVNgWTIrSywCBInGO7XcAaD1YgCMKVPmurArHjZ7Edv+JiOxDQ8ckI4KscomrGqd+44WsqLiIC2QrzWYeQLyG8AE6xQwKGC9YsOjJCXAyT8hd6oa2K5YdrUsAF3vK9lumdMxVkL3L6A0BcuU0Z2IRWPncqFYxmzZBqsPlWswEig/SVkAAAAASUVORK5CYII=",
                        spacing_left: 17
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAAAl0lEQVQ4T+2USxKAIAxD5f6HhoGxGFNCYWSpKz/htXaapOvblROdzwEP9U3rXuw2ZICosuImBuBzvZ+BmxZFI5gBTMczcwA8UAssA2a/gp0OO7ABcfXlDo4AcNqj3ZgOEVtVy/UDno117lVmUmst7cymUR5x4CgP+PsRwGvpdiMNg6XnAafNSjr1ws6eNy1MIquqAOwPqS9vYj8UaGf9CwAAAABJRU5ErkJggg==",
                        spacing_left: 17
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAYAAAAcYhYyAAAAtUlEQVQ4T71UWw7AIAib9z/0Fo2wWnloZuaXQS3QYsv1rrtvC8TqtsY5NlyRQwHAw3pmAU+geJEKSJPJ2/IFRLIoCPYctcZJ2zstqcMiBwjmJTkLIr1ZVXClIrnyIe0cA+F58KoKK8lAvFFQYhGdJ3iZE0tKbmdJ4oFt+jPW8E3q/FZJ2s4RYi3tt4n1QFDurXZYJbZHVsocNrZHBPF8ZjDgaB4i65xcPAOy/lCzR14ekEVuiz3g8VAY3h7/CgAAAABJRU5ErkJggg==",
                        spacing_left: 18
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAl0lEQVQ4T8VUSRLAIAir/390HTuFsiSgp3pygCQo0XF96363w8ToVooEJIUMrOQMuAgi2JKPlYxqURXlFYiULWnKS3K3ZVWvzlGeE92eu4QwD6q46v4Fts6xBcetwkF3l9O5R/DJqzGBzuacdDLHZPLIzt6li1eKzI5PfBeYumDAUq1SRA/ckSFm9iu0QDZDF2eK1hDwx5vSkDAQN4wqHAAAAABJRU5ErkJggg==",
                        spacing_left: 15
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAuklEQVRIS91VSRKAMAiz/3+0Do5UihAi3vTUKSVsIY7t/vbrOMxd66gACqggGTAKPG0ZqIB7YBsY2sTos/TZRnaYjIJGj2xApqIZHIFG/UW9X0DthKuBUX2Npkw5okH+B/TTRmXDai2AdUIk16DUEBGpu6s6UHm+n9VKPwSF6SlVuvAX8TSrovQpH5AivugsC0qJM1J4AWiXHlFG7hSUkrnovxZlxFLHMmbBecPTTAcec8kyjXjLvD39Dh6rRRBHKMMIAAAAAElFTkSuQmCC",
                        spacing_left: 22
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAXCAYAAAA7kX6CAAAAnElEQVQ4T9WUSw7AIAhE6/0P3QZS6IjDZ1tXRHwKA7iub91gL7DNFL/vm4GQHUQ4+pc4GSRwBaoTQzhufp+nL8Z0WK52ufk01A7cRGECoHroH4MCZbl6dCzUCNIzcTMrTdRhE2cKaY3LIhPFvTGyHNs8p2Bswa0fMbLYKT8AU5GyQc7K1P4AFajCZT9A14q0cyYzetSRzh58H37pAzJKKheuaIo1AAAAAElFTkSuQmCC",
                        spacing_left: 15
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAcCAYAAAC+lOV/AAAAtElEQVQ4T7VV0RKAIAjT///oOks8mEzwrF48jQGOgbW839VXWSrs3W0zQiA6oI4xgjYMHXvpsUjT+QoskbWNyWwXrMmtJ+ASkdLSZGnzHx3kkTfOMqWiNsdgSUMc6b3cGc8eFSJAa1iT6dpRJhVh7GpTnT1tp8FGQb3jPgMbcnfkiVVZKsybHiaYLkFq9Hi13AaKSLBzMrNvKOwXcDiOQ/1CX1O2V6VB2Zquil6NEByxPBF7A5KcQhaquecgAAAAAElFTkSuQmCC",
                        spacing_left: 16
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAh0lEQVQ4T5VT0RLAIAiq///o7fLmTgnMeqsgCWWOvJ5vO8X5iBcOBmzaTie0wIsaCYy8zpJMRogaYmXD4udQ/2ZCRdheP1W4IlAwVmhZq/6gOk5dknKwcdVI/FgmScphtpZyKoJsqJr7FqHU7o6wAJXzhRmI889svkqcmYQvyvB7dpzQCZJhXqSTHxbTVZurAAAAAElFTkSuQmCC",
                        spacing_left: 13
                    },
                    resize: !1,
                    height: "28",
                    spacing_top: 29,
                    spacing_left: "6"
                },
                "Darkstar K": {
                    48: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAKUlEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIECpsySbx2whyJ4VoA5toPBdmEdywAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    49: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAYAAADaxo44AAAAM0lEQVQYV2NkQID/UCYjiAYTDAwMyIIgNiNIAkUllA+WwKmDaKPACtGNgrkRbgeSqyFMAEQUDAiY2jJCAAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    50: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAOElEQVQYV22OUQoAMAhC9f6HbhjUnKyPUMxHxJ0yTeleACZwTxkPHp3Noemom4nddmLtJ9QPOwc8REsNBgxKi50AAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    51: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAL0lEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEChtdJ8w0kCLSdGLYCXMkhmsBgzIOBn+vwDgAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    52: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANElEQVQYV2NkQAX/oVxGEA0moABZAsRmhEmi6GBgYIBLYujAJYnsgv/oxsLcgWInNkcxAAAXtw0Hgst6CQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    53: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAALUlEQVQYV2NkgID/UBqZYmREkgCxkcF/dElkE3DqBCkCS2KzE2wiLjsJ6mQAANL+DAbdaB5QAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    54: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAMklEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEiiJ0SZjJIEV4df4naCeyUTA2WBMAEqsNB73m46UAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    55: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANUlEQVQYV2NkgID/UBpGMYIYIAImARZAUswIE8Cm8z+yamTjwSaiG4VsFdxYDF0g9+AzlgEApxIMBjELQgkAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    56: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJ0lEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIECpuGOmGOxHAtAIM2DgbIIJFqAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    57: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANUlEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEChuXTrBpMElko2HWYZWEWQW2ExmgOAwAJ+oNBVk/zDoAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    65: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAL0lEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEChtdEslkhv8k6cQwFt1BcAUAubwQBL+AHrQAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    66: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJUlEQVQYV2NkgID/UBpGMYIYIAImARZAUsyILoms8D8NdeJ0LQCXLg4GdV8AyAAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    67: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAKklEQVQYV2NkQID/SGxGRigHJgjngxjIgnA2NgmwLrw6QAqw2gFzDIqrAB67DAatII32AAAAAElFTkSuQmCC",
                        spacing_left: 7
                    },
                    68: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJ0lEQVQYV2NkgID/UBpGMYIYIAImARZAUsyILoms8D/1JDHsxOlaAPbSDwWboH7hAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    69: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAALElEQVQYV2NkgID/UBqZYmREkgCxkcF/dElkE3DqBCnCkCRKJ9iRMEdgdS0A3xcMBuQ4SIgAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    70: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAMUlEQVQYV2NkgID/UBqZYmREkgCxkcF/dElkE3DqBCnCkITpBFuBzVi43TAGig6YqwDrQQwHGRSilgAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    71: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAL0lEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIEim5sknDduHSCxQnaCXMkhmsBck8OBgSaMscAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    72: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJUlEQVQYV2NkgID/UJoRmY3CQVdEkiTUdIhVJOlEcRhIJ07XAgASQBIDcclj6gAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    73: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAK0lEQVQYV2NkgID/UBpGMTIiCYLYMPAfxoHpgCkE60A2ijgJZGNw2gF3FQAWuwwG3l84RgAAAABJRU5ErkJggg==",
                        spacing_left: 7
                    },
                    74: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANklEQVQYV2NkwAT/oUKMjGhycAkGBob/REnCdMAMAmkC60QxCmYfsrHICkDyID6Kg5CNBrsFAN1JDQRk4J2PAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    75: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAKklEQVQYV2NkgID/UJoRmY3CQVeETRImxoguCbMCJM5Akk4Uh4G143ItACNEEgbE1zTZAAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    76: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAALElEQVQYV2NkgID/UJoRSoMpEAdZAsSGK6CuJMxaRnRjkd3zH2Y5zFEojgUA87kMBw73nekAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    77: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAALklEQVQYV2NkgID/UJoRnQ8SQJaEsUHqwHLoCmCmwU3CZgJMDKsJBK3AqgCvLwDyjxQDEBtREgAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    78: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAKklEQVQYV2NkgID/UJoRmY3CQVeELgkzBSyOTSdIDKyIJGNRHAY3AptrAXJAEwN596S6AAAAAElFTkSuQmCC",
                        spacing_left: 8
                    },
                    79: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAKUlEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIECpsySbx2whyJ4VoA5toPBdmEdywAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    80: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAALklEQVQYV2NkgID/UBpGMYIYIAImARZAUsyILoms8D/ZOjHsBBkLtxvGwOYoBgBkcQ0Hk096UQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    81: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANElEQVQYV2NkQID/SGxGEBtMMDAwwCSQ+YwgDrIECptkSZgGsLHodoKMBiuASSIrgDmaEQANAhAFHL+frQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    82: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAK0lEQVQYV2NkgID/UBpGMYIYIAImARZAUsyILoms8D/JOmEaCBuL7FoUawDKRxAGlJdzRQAAAABJRU5ErkJggg==",
                        spacing_left: 8
                    },
                    83: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAMklEQVQYV2NkQID/SGwQk5ERKgCTgPFBwv9BHGQJZN04dYIUYUjCrAWbiG4sTJKgTgYAxwIMBhEUIsYAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    84: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAALUlEQVQYV2NkgID/UBqdYmREkgSx0cF/mCCyCSiakHXBFMEUgOWoqwDZN3CTAWvIDAfp08kqAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    85: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAJklEQVQYV2NkgID/UJoRmY3CQVdEQ0l0B8H4jCA7YQDmYhAfLA4AP14RBIYzIXEAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    86: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAANElEQVQYV2NkgID/UJoRnQ8SQJaEsUHqwHJEKUC3AmQKTCMjhp1QKzEU4DIFbBQyQPcNAwBAZBEGxEMZeQAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    87: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAK0lEQVQYV2NkgID/UJoRnQ8SQJaEsUHqwHJkKYBpwmoCzD1wtxBlBV5fAADyjxQDZoogOgAAAABJRU5ErkJggg==",
                        spacing_left: 9
                    },
                    88: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAKUlEQVQYV2NkgID/UBpEMSLxGVE4SIpB4mCNRClAtgKmEyZGAyswfAEABwcSBBoYe6EAAAAASUVORK5CYII=",
                        spacing_left: 9
                    },
                    89: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAYAAAA1WQxeAAAAOUlEQVQYV2NkgID/UJoRSsPEGEECyJIwNkgBWA5dAVwnzGSYkXitgFmLbhVYM7qj4HbD5JAVYPUNAHlpDwZ6dUrXAAAAAElFTkSuQmCC",
                        spacing_left: 9
                    },
                    90: {
                        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAANUlEQVQYV2NkgID/UBpGMYIYIAImARZAUswIE8Cm8z+6JDIfrBPZWGQTMIxFsRfdEciOZgQAxzwMBrOs+pwAAAAASUVORK5CYII=",
                        spacing_left: 8
                    },
                    resize: !1,
                    height: "7",
                    spacing_top: 8,
                    spacing_left: "2"
                },
                custom: {}
            },
            alignLeft: function () {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function (b, c, d, e, f, g, h) {
                        a.canvas.layer.clear(), a.canvas.layer.ctx.putImageData(b, -e, 0), a.render(), a.alignRestore()
                    })
                }
            },
            alignRight: function () {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function (b, c, d, e, f, g, h) {
                        a.canvas.layer.clear();
                        var i = a.width - 1 - g;
                        a.canvas.layer.ctx.putImageData(b, i, 0), a.render(), a.alignRestore()
                    })
                }
            },
            alignTop: function () {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function (b, c, d, e, f, g, h) {
                        a.canvas.layer.clear(), a.canvas.layer.ctx.putImageData(b, 0, -f), a.render(), a.alignRestore()
                    })
                }
            },
            alignBottom: function () {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function (b, c, d, e, f, g, h) {
                        a.canvas.layer.clear();
                        var i = a.height - 1 - h;
                        a.canvas.layer.ctx.putImageData(b, 0, i), a.render(), a.alignRestore()
                    })
                }
            },
            alignCenter: function () {
                if (!this.alignCheck()) {
                    var a = this;
                    this.getDrawnPixels(function (b, c, d, e, f, g, h) {
                        a.canvas.layer.clear();
                        var i = a.width / 2 - c / 2;
                        i -= e, i = Math.floor(i);
                        var j = a.height / 2 - d / 2;
                        j -= f, j = Math.floor(j), a.canvas.layer.ctx.putImageData(b, i, j), a.render(), a.alignRestore()
                    })
                }
            },
            alignRestore: function () {
                this.LayerController.updateLayer(), this.FrameController.updateFramePreview(), this.HistoryController.create(), this.online.status && this.OnlineController.writeLayer()
            },
            alignCheck: function () {
                var a = this.LayerController.currentLayer;
                return !(!this.online.status || this.LayerController.layers[a].name == this.online.layer_id) && (this.showAlert("You can only edit your layer while online drawing"), !0)
            },
            finishLoading: function () {
                this.setupAutoSave(), "Canvas" == this.zoom.type && a(".navigation-scroller").hide()
            },
            progress: {
                status: !0,
                startStep: 2,
                step: 0,
                lap: 0,
                current: 1,
                max: 600,
                maxUploadFrames: 30,
                speed: 500,
                images: [],
                max_width: 0,
                max_height: 0,
                timer: !1,
                doPreview: !1
            },
            setProgressImage: function (a) {
                this.isMobile || !this.progress.status || this.online.status || this.fileDrawing || this.FrameController.frames.length > 1 || ((this.width > 500 || this.height > 500) && (this.progress.max = 300), 0 == this.progress.step && (this.progress.step = this.progress.startStep), (this.width > this.progress.max_width || this.height > this.progress.max_height) && (this.progress.max_width = this.width, this.progress.max_height = this.height), this.progress.images.length >= this.progress.max && (this.progress.lap > 20 && (this.progress.lap = 0), this.progress.current > this.progress.max && (this.progress.current = this.progress.startStep, this.progress.lap++), this.progress.images.splice(this.progress.current, 1), this.progress.current += this.progress.step + this.progress.lap), this.progress.images.push(a))
            },
            toggleProgressSetting: function (a) {
                a ? this.progress.status = !1 : (this.progress.status = !1, this.prgoress.images = [])
            },
            stopProgress: function () {
                this.progress.doPreview = !1, clearTimeout(this.progress.timer)
            },
            showProgress: function (b) {
                var c = 0,
                    d = this,
                    e = this.renderProgressFrames(),
                    f = function () {
                        return d.progress.doPreview ? (c >= e.length && (c = 0), a(b).attr("src", e[c]), c++, void(d.progress.timer = setTimeout(function () {
                            f()
                        }, d.progress.speed))) : void clearTimeout(d.progress.timer)
                    };
                f()
            },
            downloadProgressGif: function (b, c, d, e) {
                var f = this,
                    b = b ? b : this.getScaleUpRatioDecimal(this.maxWidth, !0);
                return !this.progress.status || this.FrameController.frames.length > 1 || !e ? d(!1) : (a(".submit-drawing-butn").html('Creating replay. <span class="gif-loading-percent"></span>'), a(".download-progress-preview").html('Loading.. <span class="loading-percent-preview-gif"></span>'), this.downloadProgressGifPrepare(b, function (b) {
                    if (a(".submit-drawing-butn").html(f.SubmitController.defaultUploadButtonText), !c) return d(b);
                    var e = URL.createObjectURL(b);
                    a("#dowmnload-a").attr("href", e), a("#dowmnload-a").attr("download", "pixil-progress-gif-drawing.gif"), a("#dowmnload-a")[0].click(), a(".download-progress-preview").html("Download")
                }), void 0)
            },
            renderProgressFrames: function (a) {
                var b = [];
                if (0 == this.progress.images.length) return b;
                for (var c = Math.ceil(this.progress.images.length / this.progress.maxUploadFrames), d = 0; d < this.progress.images.length; d += c) b.push(this.progress.images[d]);
                return 1 != c && b.push(this.progress.images[this.progress.images.length - 1]), a && b.unshift(this.progress.images[this.progress.images.length - 1]), b
            },
            downloadProgressGifPrepare: function (a, b) {
                var c = this,
                    d = [];
                this.downloadProgressSize(a, function (a) {
                    for (var e = 0; e < a.length; e++) {
                        var f = new Image;
                        f.data_id = e;
                        c.progress.speed;
                        f.onload = function () {
                            d.push({
                                src: this,
                                speed: this.data_id == a.length - 1 ? 3e3 : c.progress.speed,
                                data_id: this.data_id
                            }), d.length === a.length && c.arrangeImages(d, function (a) {
                                c.downloadProgressGifProcess(a, b)
                            })
                        }, f.src = a[e].src
                    }
                })
            },
            downloadProgressSize: function (b, c) {
                var d = this,
                    e = [],
                    f = {},
                    g = this.width * b,
                    h = this.height * b;
                this.canvas.rendering.canvas.width = g, this.canvas.rendering.canvas.height = h, this.canvas.rendering.ctx.mozImageSmoothingEnabled = !1, this.canvas.rendering.ctx.imageSmoothingEnabled = !1;
                var i = this.renderProgressFrames(!0),
                    j = new Image,
                    k = a("#made-with").attr("src");
                j.onload = function () {
                    for (var a = this.width, j = this.height, k = this, l = 0; l < i.length; l++) {
                        var m = new Image;
                        m.data_id = l, f[l] = "", m.onload = function () {
                            var l = this.width * b,
                                m = this.height * b,
                                n = g - a,
                                o = h - j;
                            d.canvas.rendering.ctx.drawImage(this, 0, 0, l, m), d.canvas.rendering.ctx.drawImage(k, n - 15, o - 15), f[this.data_id] = d.canvas.rendering.dataURL(), d.canvas.rendering.clear(), e.push({
                                src: f[this.data_id],
                                data_id: this.data_id
                            }), e.length == i.length && d.arrangeImages(e, function (a) {
                                c(a)
                            })
                        }, m.src = i[l]
                    }
                }, j.src = k
            },
            downloadProgressGifProcess: function (b, c) {
                var d = new GIF({
                    workers: 3,
                    quality: 1,
                    workerScript: "/js/dist/gif.worker.js"
                });
                a.each(b, function (a, b) {
                    d.addFrame(b.src, {
                        delay: parseInt(b.speed)
                    })
                }), d.on("progress", function (b) {
                    a(".loading-percent-preview-gif, .gif-loading-percent").text(Math.ceil(100 * b) + "%")
                }), d.on("finished", function (a) {
                    return c(a)
                }), d.render()
            }
        },
        Z = a("#width-image").text(),
        $ = a("#height-image").text(),
        _ = !1;
    return 1 == a("#edit-image").length && (_ = {
        image: a("#edit-image").attr("data-image"),
        resize: a("#edit-image").attr("data-size")
    }), a("#sk").length >= 1 && ("object" != typeof _ && (_ = {}), _.skipNew = !0), "boolean" == typeof pixilMobileApp ? Y : void Y.init(Z, $, _)
}(jQuery);