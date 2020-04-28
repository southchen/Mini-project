let timer = null;
let mode = 'day';
const add = document.querySelector('.add');
const countbtn = document.querySelector('#countdown');
const togglebtn = document.querySelector('#hide');
const stopbtn = document.querySelector('#stop');
const modes = document.querySelectorAll('.link');

function toggleStyle(mode) {
    document.body.className = mode;
    const btnStyle = mode === 'night' ? 'inverted' : 'basic';
    const btns = document.querySelectorAll('.ui.button');
    btns.forEach((b) => {
        const color = b.className.split(' ')[1];
        b.className = `ui ${color} ${btnStyle} button`;
    });
    document.querySelector('header').className = mode;
}

modes.forEach((btn) => {
    btn.addEventListener('click', function () {
        modes.forEach((item) => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        mode = btn.id;
        toggleStyle(mode);
    });
});








countbtn.addEventListener('click', () => {
    const countdowninput = document.querySelector('#countdowntime');
    const time = countdowninput.value * 60;

    if (!Number.isNaN(time)) {
        countdowninput.value = '';
        if (timer) {
            timer.clear();
            timer.countdown = time;
        } else {
            timer = new Timer(time);
        }

        timer.count();
    } else {
        countdowninput.setAttribute('placeholder', 'Please input a number');
    }
    togglebtn.addEventListener('click', () => {
        timer.toggle();
        // console.log(timer.element.querySelector('h1').className)
        togglebtn.textContent = timer.element.querySelector('h1').className.includes('hide') ?
            'Show the timer' :
            'Hide the timer';
    });
    stopbtn.addEventListener('click', () => {
        timer.clear();
        timer.display(0);
    });
});

function Timer(sec) {
    Timer.instance = 1;
    this.countdown = sec;
    this.element = document.querySelector('.timer');
    this.id = 0;
}
Timer.prototype.update = function (sec) {
    this.countdown = sec;
};

Timer.prototype.count = function () {
    const now = Date.now();
    const then = now + this.countdown * 1000;
    this.display(this.countdown);
    this.id = setInterval(() => {
        const left = Math.round((then - Date.now()) / 1000);
        if (left < 0) {
            clearInterval(this.id);
            return;
        }
        this.display(left);
    }, 1000);
};
Timer.prototype.clear = function () {
    clearInterval(this.id);
};
Timer.prototype.display = (sec) => {
    const hour = Math.floor(sec / 3600);
    const min = Math.floor((sec % 3600) / 60);
    const s = Math.floor((sec % 3600) % 60);
    const count = `${hour ? `${hour}:` : ''}${min}:${s < 10 ? '0' : ''}${s}`;
    const timerDisplay = document.querySelector('.displaytime');
    timerDisplay.textContent = count;
};
Timer.prototype.toggle = function () {
    this.element.querySelector('h1').classList.toggle('hide');
};

class View {
    constructor(el) {
        this.lists = JSON.parse(localStorage.getItem('todolists')) || [];
        this.currentOrder = 0;
        this.element = document.querySelector(el);
    }

    bind() {
        this.element.addEventListener('click', (e) => {
            if (e.target.matches('[type="checkbox"]')) {
                const {
                    index
                } = e.target.parentNode.dataset;
                this.lists[index].done = !this.lists[index].done;
                this.render();
                return;
            }
            if (e.target.matches('a')) {
                const {
                    index
                } = e.target.parentNode.dataset;
                this.lists.splice(index, 1);
                localStorage.setItem('todolists', JSON.stringify(this.lists));
                this.render();
            }
        });
        this.element.addEventListener('dblclick', (e) => {
            if (e.target.matches('span')) {
                const {
                    index
                } = e.target.parentNode.dataset;
                this.edit(index);
            }
        });
    }

    edit(i) {
        // const cache = this.lists[i];
        // console.log(cache)
        const editing = this.element.querySelectorAll('li')[i].querySelector('span');
        editing.innerHTML = `<input id='edit'><button class="ui pink basic button" id='save'>save</button><button class="ui grey basic button" id='cancel'>cancel</button>`;
        const savebtn = this.element.querySelector('#save');
        const input = this.element.querySelector('#edit');
        const cancel = this.element.querySelector('#cancel');
        cancel.addEventListener('click', () => {
            this.render();
        });
        savebtn.addEventListener('click', () => {
            this.lists.splice(i, 1, new Todo(input.value, i));
            localStorage.setItem('todolists', JSON.stringify(view.lists));
            this.render();
        });

        // console.log(editing)
    }

    render() {
        if (localStorage.getItem('todolists') && this.lists === '') {
            this.element.innerHTML = `<li> ✅All ticked, well done! </li>`;
            return;
        }
        this.element.innerHTML = '';
        let html = '';
        this.lists
            .map((li, index) => {
                html += `<li  data-index=${index}><input type="checkbox" ${
          li.done ? 'checked' : ''
        } class="item"><span style="text-decoration:${li.done ? 'line-through' : ''}" >${
          li.text
        }</span><a class="x"></a></li>`;
            })
            .join('');
        this.element.innerHTML = html;
    }

    init() {
        this.bind();
        this.render();
    }
}
let view = new View('#list');
view.init();

class Todo {
    constructor(text, o) {
        this.text = text;
        this.done = false;
        this.order = o;
    }
}
add.addEventListener('submit', function (e) {
    const input = this.querySelector('input');
    e.preventDefault();
    if (!input.value.trim()) return;
    view.lists.push(new Todo(input.value, view.currentOrder));
    localStorage.setItem('todolists', JSON.stringify(view.lists));
    view.currentOrder++;
    input.value = '';
    // console.log(lists);
    view.render();
});

function getWeekDate(day) {
    const weeks = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const week = weeks[day];
    return week;
}
let now = new Date();
now = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${getWeekDate(now.getDay())}`;
const time = document.querySelector('#time');
time.textContent = now;

mode = new Date().getHours() > 17 ? 'night' : 'day';
toggleStyle(mode);