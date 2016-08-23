'use strict';

var slider = {
    slides: ['images/ch01.jpg','images/ch02.jpg','images/ch03.jpg','images/ch04.jpg','images/ch05.jpg'],
    frame: 0,
    prevFrame: 0,
    set: function(image) {
        document.getElementById(this.prevFrame).style.background = 'rgba(128, 128, 128, 0.6)';
        this.prevFrame = this.frame;
        document.getElementById("scr").style.backgroundImage = "url("+image+")";
        document.getElementById(this.frame).style.background = 'rgba(241, 241, 241, 0.6)';
    },
    init: function() {
        this.set(this.slides[this.frame]);
    },
    left: function() {
        this.frame--;
        if(this.frame < 0) this.frame = this.slides.length-1;
        this.set(this.slides[this.frame]);
        this.reset();
    },
    right: function() {
        this.frame++;
        if(this.frame == this.slides.length) this.frame = 0;
        this.set(this.slides[this.frame]);
        this.reset();
    },
    current: function(id) {
        this.frame = id;
        this.set(this.slides[id]);
        this.reset();
    },
    reset: function() {
        clearInterval(intervalId);
        intervalId = setInterval(function() {
            slider.right();
        },5000);
    },
    createSwitches: function() {
        var switchContainer = document.getElementById('switchContainer');
        console.log(switchContainer);

        for (var i = 0; i < this.slides.length; i++) {
            var div = document.createElement('div');
            div.className = 'switch';
            div.id = i;
            div.setAttribute('onclick', 'slider.current(' + i + ');');
            switchContainer.appendChild(div);
        }
    }
};

var intervalId = 0;
window.onload = function() {
    slider.createSwitches();
    slider.init();
    intervalId = setInterval(function() {
        slider.right();
    },5000);
};


