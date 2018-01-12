class Stopwatch {
  constructor(display, results) {
      this.running = false;
      this.display = display;
      this.reset();
      this.print(this.times);
      this.results = results;
  }
  
  reset() {
    this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
    };
  }
 
  time() {
    let time = this.format(this.times);
    return time;
  }

  print() {
   this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  start() {
    if (!this.running) {
        this.running = true;
        this.watch = setInterval(() => this.step(), 10);
    }
  }  

  step() {
    if (!this.running) return;
      this.calculate();
      this.print();
    return this.time();
  }

  calculate() {
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

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  addResult() {
    let listItem = document.createElement('li');
    listItem.innerHTML = `<p>${this.time()}</p>`;
    results.appendChild(listItem);
  }

  resetTable() {
    results.innerHTML ='';
  }

  resetTime () {
    this.reset();
    this.display.innerText = this.format(this.times);   
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
      result = '0' + result;
  }
  return result;
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), results);

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('resetTable');
resetButton.addEventListener('click', () => stopwatch.resetTable());

const addResultButton = document.getElementById('record');
addResultButton.addEventListener('click', () => stopwatch.addResult());

const resetTimeButton = document.getElementById('resetTimer');
resetTimeButton.addEventListener('click', () => stopwatch.resetTime());

const results = document.querySelector('.results');