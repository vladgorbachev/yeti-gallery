const MARGIN = 2;

export const FIFTYFIFTY = '50%';
export const TRANSITION_DURATION = 300;
const THUMB_SIZE = 64;


export const OPTIONS = {
    width: null, // 500 || '100%'
    minwidth: null,
    maxwidth: '100%', // '100%'
    height: null,
    minheight: null,
    maxheight: null,

    ratio: null, // '16/9' || 500/333 || 1.5

    margin: MARGIN,
    glimpse: 0,

    fit: 'contain', // 'cover' || 'scaledown' || 'none'

    position: FIFTYFIFTY,
    thumbposition: FIFTYFIFTY,

    // navigation, thumbs
    nav: 'dots', // 'thumbs' || false
    navposition: 'bottom', // 'top'
    navwidth: null,
    thumbwidth: THUMB_SIZE,
    thumbheight: THUMB_SIZE,
    thumbmargin: MARGIN,
    thumbborderwidth: MARGIN,
    thumbfit: 'cover', // 'contain' || 'scaledown' || 'none'

    allowfullscreen: false, // true || 'native'

    transition: 'slide', // 'crossfade' || 'dissolve'
    clicktransition: null,
    transitionduration: TRANSITION_DURATION,

    captions: true,

    hash: false,
    startindex: 0,

    loop: false,

    autoplay: false,
    stopautoplayontouch: true,

    keyboard: false,

    arrows: true,
    click: true,
    swipe: true,
    trackpad: false,

    enableifsingleframe: false,

    controlsonstart: true,

    shuffle: false,

    direction: 'ltr', // 'rtl'

    shadows: true,
    spinner: null
}