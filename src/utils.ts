//@ts-nocheck

export class WaitFor {
    private test: () => boolean;
    private fn: () => void;
    private timeout: number;
    private active: boolean;

    constructor(test: () => boolean, fn: () => void, timeout: number = 100) {
        this.test = test;
        this.fn = fn;
        this.timeout = timeout;
        this.active = true;
    }

    public start(): void {
        if (this.test()) {
            this.fn();
        } else if (this.active) {
            setTimeout(() => this.start(), this.timeout);
        }
    }

    public stop(): void {
        this.active = false;
    }
}

export function waitFor(test, fn, timeout, i) {
    if (!waitFor.i) {
        waitFor.i = 1;
        waitFor.ii = [true];
    }

    i = i || waitFor.i;

    if (typeof waitFor.ii[i] === "undefined") {
        waitFor.ii[i] = true;
    }

    if (test()) {
        fn();
    } else {
        waitFor.ii[i] &&
            setTimeout(function () {
                waitFor.ii[i] && waitFor(test, fn, timeout, i);
            }, timeout || 100);
    }

    return waitFor.i++;
}

waitFor.stop = function (i) {
    waitFor.ii[i] = false;
};
