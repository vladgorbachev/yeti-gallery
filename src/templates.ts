type V = {
    s: string;
    m: number;
    h: number;
    b: number;
} & VideoType;

type VideoType = {
    type?: string;
    p?: "http" | "https";
    id?: string;
};


//@todo deprecated
export function insertStyle(v: V) {
    return `
        .fotorama${v.s} .fotorama__nav--thumbs .fotorama__nav__frame {
            padding: ${v.m}px;
            height: ${v.h}px;
        }
        
        .fotorama${v.s} .fotorama__thumb-border {
            height: ${v.h - v.b * 2}px;
            border-width: ${v.b}px;
            margin-top: ${v.m}px;
        }
        `;
}

export function setVideoIFrame(v: V) {
    return `
        <div class="fotorama__video">
            <iframe
            src=${`${
                v.p +
                (v.type === "youtube"
                    ? "youtube.com/embed/"
                    : "player.vimeo.com/video/") +
                v.id
            }?autoplay=1${v.type !== "custom" && v.s ? "&" + v.s : ""}`}
            frameborder="0"
            allowfullscreen
            ></iframe>
        </div>
    `;
}
