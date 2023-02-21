interface IFullScreenApi {
    ok: boolean;
    prefix: string;
    event: string;
    isFullScreen(): boolean;
    requestFullScreen(el: any): void;
    cancelFullScreen(): void;
}

export class FullScreenApi implements IFullScreenApi{
    ok: boolean;
    prefix: string;
    event: string;

    constructor() {
        this.ok = false;
        this.prefix = "";
        this.event = "";

        const browserPrefixes = ["webkit", "moz", "o", "ms", "khtml"];

        if (typeof document.exitFullscreen !== "undefined") {
            this.ok = true;
        } else {
            for (let i = 0; i < browserPrefixes.length; i++) {
                const prefix = browserPrefixes[i];
                //@ts-ignore
                if (typeof document[`${prefix}CancelFullScreen`] !== "undefined") {
                this.ok = true;
                this.prefix = prefix;
                break;
                }
            }
        }

        if (this.ok) {
            this.event = `${this.prefix}fullscreenchange`;
        }
    }

    isFullScreen(): boolean {
        switch (this.prefix) {
            case "":
                return document.fullscreenElement !== null;
            case "webkit":
                //@ts-ignore
                return document.webkitIsFullScreen;
            default:
                //@ts-ignore
                return document[`${this.prefix}FullScreen`];
        }
    }

    requestFullScreen(el: any): void {
        console.log(this.prefix);
        
        return this.prefix === ""
        ? el.requestFullscreen()
        : el[`${this.prefix}RequestFullScreen`]();
    }

    cancelFullScreen(): void {
        return this.prefix === ""
        ? document.exitFullscreen()
        //@ts-ignore
        : document[`${this.prefix}CancelFullScreen`]();
    }
}
