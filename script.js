const gameDurationInMinutes = 10;

// var socket = io.connect('http://localhost:7777');

new Vue({
    el: '.time',
    data: {
        message: '00:00',
        dateEnd: null,
        remainingTime: 0,
        timer: ''
    },
    created: function () {
        this.reset();
        this.timer = setInterval(this.showUncounter, 10)

    },
    methods: {
        startOrPause: function () {
            if(this.dateEnd === null) {
                if(this.remainingTime === 0) {
                    this.dateEnd = this.calcDateEnd(gameDurationInMinutes * 60 * 1000)
                }
                else {
                    this.dateEnd = this.calcDateEnd(this.remainingTime * 10)
                }
            }
            else {
                this.remainingTime = this.calcRemainingTime();
                this.dateEnd = null;
            }
        },

        reset: function() {
            let minutes = gameDurationInMinutes < 10 ? '0' + gameDurationInMinutes : gameDurationInMinutes;
            this.message = `${minutes}:00`;
            this.dateEnd = null;
            this.remainingTime = 0;
        },

        showUncounter: function() {
            if(this.dateEnd !== null) {
                let milliseconds = this.calcRemainingTime();
                let seconds = Math.trunc(milliseconds / 100 % 60);
                seconds = seconds < 10 ? '0' + seconds : seconds;
                let minutes = Math.trunc(milliseconds / 6000 % 60);
                minutes = minutes < 10 ? '0' + minutes : minutes;
                if(minutes === '00') {
                    milliseconds = Math.trunc(milliseconds % 100);
                    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
                    if((seconds === '00') && (milliseconds === '00')) {
                        this.reset();
                    }
                    else {
                        this.message = `${seconds}:${milliseconds}`;
                    }
                }
                else {
                    this.message = `${minutes}:${seconds}`;
                }
            }
        },

        cancelAutoUpdate: function() { clearInterval(this.timer) },

        calcRemainingTime: function(date) {
            return (this.dateEnd - (new Date().getTime())) / 10
        },

        calcDateEnd: function(remainingTime) {
            // let dateEndInMinute = new Date();
            // dateEndInMinute.(dateEndInMinute.getMinutes() + remainingTime);
            // return dateEndInMinute.getTime();
            return new Date().getTime() + remainingTime;
        }
    },
    beforeDestroy: function() {
        this.cancelAutoUpdate()
    }
});

let upAndDown = function (el) {
    new Vue({
        el: el,
        data: {
            count: 0,
        },
        methods: {
            up: function() {
                this.count += 1
            },
            down: function() {
                this.count = Math.max(0, this.count -1)
            },
        }
    });
};

upAndDown('.score-a');
upAndDown('.score-b');
upAndDown('.faults-a');
upAndDown('.faults-b');
upAndDown('.to-a');
upAndDown('.to-b');