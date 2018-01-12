'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
  function Stopwatch(display, results) {
    _classCallCheck(this, Stopwatch);

    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
    this.results = results;
  }

  _createClass(Stopwatch, [{
    key: 'reset',
    value: function reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
    }
  }, {
    key: 'time',
    value: function time() {
      var time = this.format(this.times);
      return time;
    }
  }, {
    key: 'print',
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: 'format',
    value: function format(times) {
      return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    }
  }, {
    key: 'step',
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
      return this.time();
    }
  }, {
    key: 'calculate',
    value: function calculate() {
      this.times.miliseconds += 1;
      if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
      }
      if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
      }
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: 'addResult',
    value: function addResult() {
      var listItem = document.createElement('li');
      listItem.innerHTML = '<p>' + this.time() + '</p>';
      results.appendChild(listItem);
    }
  }, {
    key: 'resetTable',
    value: function resetTable() {
      results.innerHTML = '';
    }
  }, {
    key: 'resetTime',
    value: function resetTime() {
      this.times.miliseconds = 0;
      this.times.seconds = 0;
      this.times.minutes = 0;
      this.display.innerText = this.format(this.times);
    }
  }]);

  return Stopwatch;
}();

function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'), results);

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
  return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
  return stopwatch.stop();
});

var resetButton = document.getElementById('resetTable');
resetButton.addEventListener('click', function () {
  return stopwatch.resetTable();
});

var addResultButton = document.getElementById('record');
addResultButton.addEventListener('click', function () {
  return stopwatch.addResult();
});

var results = document.querySelector('.results');

var resetTimeButton = document.getElementById('resetTimer');
resetTimeButton.addEventListener('click', function () {
  return stopwatch.resetTime();
});