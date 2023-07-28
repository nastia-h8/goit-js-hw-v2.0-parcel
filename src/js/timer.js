const timerOutput = document.querySelector('.js-clockface');
const startBtn = document.querySelector('button[data-action-start]');
const stopBtn = document.querySelector('button[data-action-stop]');

class Timer {
    constructor({onTick}) {
        this.timerId = null;
        this.isActive = false;
        this.onTick = onTick;
        this.init();
    }

    init() {
        const time = this.getTimeComponents(0);
        this.onTick(time);    
    }

    start() {
        const startTime = Date.now();

        if (this.isActive) {
            return;
        }

        this.timerId = setInterval(() => {
            const currentTime = Date.now();
            this.isActive = true;
            const deltaTime = currentTime - startTime;
            const time = this.getTimeComponents(deltaTime);

            this.onTick(time);

        }, 1000)
    }

    stop() {
        clearInterval(this.timerId);
        this.isActive = false;
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor(time % (1000 * 60 * 60) / (1000 * 60)));
        const secs = this.pad(Math.floor(time % (1000 * 60) / 1000));

        return { days, hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
}

}

const timer = new Timer({
    onTick: updateTimerOutput,
});


// const timer = {
//     timerId: null,
//     isActive: false,
    
//     start() {
//         const startTime = Date.now();

//         if (this.isActive) {
//             return;
//         }

//         this.timerId = setInterval(() => {
//             const currentTime = Date.now();
//             this.isActive = true;
//             const deltaTime = currentTime - startTime;
//             const time = getTimeComponents(deltaTime);
//             updateTimerOutput(time);

//         }, 1000)
//     },

//     stop() {
//         clearInterval(this.timerId);
//         this.isActive = false;
//         updateTimerOutput();
//     },
// }


startBtn.addEventListener('click', timer.start.bind(timer))
stopBtn.addEventListener('click', timer.stop.bind(timer))


function updateTimerOutput({ days, hours, mins, secs }) {
    return timerOutput.textContent = `${days}:${hours}:${mins}:${secs}`
}




