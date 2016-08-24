'use strict';

var intervalId = 0;

var sliderConfig = new function() {
    this.imagesSelector = '#sliderconfig > img';
    this.interval = document.getElementById('interval').innerHTML * 1000;
    this.defaultSwitchBackground = document.querySelector('.switch').style.background;
    this.activeSwitchBackground = 'rgba(241, 241, 241, 0.6)';
    this.hoverSwitchBackground = window.getComputedStyle //вероятно, не понадобится
            (document.querySelector('.switch'), ':hover').background;
};

function Slider() {
    this.slides = [];
    this.frame = 0;
    this.prevFrame = 0;
}
Slider.prototype.createSwitches = function() {
    var switchContainer = document.getElementById('switchContainer');
    for (var i = 0; i < this.slides.length; i++) {
        var div = document.createElement('div');
        div.className = 'switch';
        div.id = i;
        var bindedCurrent = this.current.bind(this, i);
        div.addEventListener('click', bindedCurrent);
        switchContainer.appendChild(div);
    }
};
Slider.prototype.set = function (image) {
    document.getElementById(this.prevFrame).style.background = sliderConfig.defaultSwitchBackground;
    this.prevFrame = this.frame;
    document.getElementById("scr").style.backgroundImage = "url(" + image + ")";
    document.getElementById(this.frame).style.background = sliderConfig.activeSwitchBackground;
};
Slider.prototype.init = function() {
    var images = document.querySelector(sliderConfig.imagesSelector).getAttribute('src').split(' ');

    if (!images && !images.length) {
        throw new Error('No images supplied');
    }

    this.slides = images;
    this.createSwitches();
    this.set(this.slides[this.frame]);
    document.querySelector('.left').addEventListener('click', this.left.bind(this));
    document.querySelector('.right').addEventListener('click', this.right.bind(this));
    document.querySelector('.pause').addEventListener('click', this.pause.bind(this));
    document.querySelector('#scr').addEventListener('mouseover', this.pause.bind(this));
    document.querySelector('#scr').addEventListener('mouseout', this.reset.bind(this));
};
Slider.prototype.left = function() {
    this.frame--;
    if(this.frame < 0) this.frame = this.slides.length-1;
    this.set(this.slides[this.frame]);
    this.reset();
};
Slider.prototype.right = function() {
    this.frame++;
    if(this.frame == this.slides.length) this.frame = 0;
    this.set(this.slides[this.frame]);
    this.reset();
};
Slider.prototype.current = function(id) {
    this.frame = id;
    this.set(this.slides[id]);
    this.reset();
};
Slider.prototype.reset = function() {
    clearInterval(intervalId);
    var bindedRight = this.right.bind(this);
    intervalId = setInterval(function() {
        bindedRight();
    },sliderConfig.interval);
};
Slider.prototype.pause = function() {
    clearInterval(intervalId);
};

window.onload = function() {
    var slider = new Slider();
    slider.init();
    intervalId = setInterval(function() {
        slider.right();
    },sliderConfig.interval);
};


