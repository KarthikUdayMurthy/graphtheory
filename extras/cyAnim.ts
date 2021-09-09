import {
  activeEdgeStyle,
  inActiveEdgeStyle,
  inActiveNodeAnimationColor,
  activeNodeAnimationColor
} from './cyStyles';

// Interfaces and Types

export interface IAnimIdWithCallback {
  id: string;
  callback: (ele) => void;
}

export type IAnimSequenceId = string | IAnimIdWithCallback;

// module level variables

let cy;
let animIds: IAnimSequenceId[] = [];
let afterAnimCB: (cy) => void = () => {};
let animDuration: number = 333;
let revertToOriginal: boolean = false;
let autoPlay: boolean = true;
let isAnimPaused: boolean = false;

// Animation controls DOM elements

const animControlsDiv = document.getElementById(
  'animControls'
) as HTMLDivElement;
const playAnimBtn = document.getElementById('playAnimBtn') as HTMLButtonElement;
const pauseAnimBtn = document.getElementById(
  'pauseAnimBtn'
) as HTMLButtonElement;
const nextAnimBtn = document.getElementById('nextAnimBtn') as HTMLButtonElement;

// Animate Recursive Function

function animRecursive() {
  if (animIds.length === 0) {
    afterAnimCB(cy);
    return;
  }

  const currentId = animIds.shift();
  const animHasCallback: boolean = typeof currentId === 'object';
  const currentIdString =
    typeof currentId === 'string' ? currentId : currentId.id;
  const currentIdCallback =
    typeof currentId === 'string'
      ? ele => {}
      : currentId.callback || (ele => {});

  const ele = cy.$('#' + currentIdString);

  const isEdge = ele.isEdge();

  const onAnimComplete = () => {
    if (animHasCallback) {
      currentIdCallback(ele);
    } else if (isEdge) {
      ele.css({ width: inActiveEdgeStyle.width });
      revertToOriginal &&
        ele.animate({
          style: inActiveEdgeStyle,
          duration: animDuration
        });
    } else {
      ele.addClass(revertToOriginal ? 'inActiveNodeStyle' : 'activeNodeStyle');
      ele.css('background-fill', 'linear-gradient');
    }
    if (!isAnimPaused) {
      animRecursive();
    }
    nextAnimBtn.disabled = false;
  };

  if (!isEdge && !animHasCallback) {
    ele.css('background-fill', 'solid');
    ele.css(inActiveNodeAnimationColor);
  }

  ele.animate({
    style: animHasCallback
      ? {}
      : isEdge
      ? { ...activeEdgeStyle, width: inActiveEdgeStyle.width * 3 }
      : activeNodeAnimationColor,
    duration: animDuration,
    queue: true,
    complete: onAnimComplete
  });
}

// Animation sequence exported function

export function animSequence(
  cyObj,
  ids: IAnimSequenceId[],
  callBack: (cy) => void = () => {}
) {
  cy = cyObj;
  animIds = ids;
  afterAnimCB = () => {
    animControlsDiv.style.display = 'none';
    callBack(cy);
  };

  animDuration = Number(
    (document.getElementById('selSpeed') as HTMLSelectElement).value
  );

  revertToOriginal = (document.getElementById(
    'revertToOriginal'
  ) as HTMLInputElement).checked;

  autoPlay = (document.getElementById('autoPlay') as HTMLInputElement).checked;

  playAnimBtn.style.display = 'none';
  pauseAnimBtn.style.display = 'none';
  nextAnimBtn.style.display = 'none';

  playAnimBtn.removeEventListener('click', playBtnFn);
  pauseAnimBtn.removeEventListener('click', pauseBtnFn);
  nextAnimBtn.removeEventListener('click', nextBtnFn);

  playAnimBtn.addEventListener('click', playBtnFn);
  pauseAnimBtn.addEventListener('click', pauseBtnFn);
  nextAnimBtn.addEventListener('click', nextBtnFn);

  if (autoPlay) {
    isAnimPaused = false;
    animControlsDiv.style.display = 'none';
    animRecursive();
  } else {
    setTimeout(() => {
      animControlsDiv.style.display = 'flex';
      playAnimBtn.style.display = 'inline';
      nextAnimBtn.style.display = 'inline';
      nextAnimBtn.disabled = false;
    }, 1);
  }
}

// Animation controls event listeners

const playBtnFn = () => {
  isAnimPaused = false;
  animRecursive();
  nextAnimBtn.style.display = 'none';
  playAnimBtn.style.display = 'none';
  pauseAnimBtn.style.display = 'inline';
};

const pauseBtnFn = () => {
  isAnimPaused = true;
  nextAnimBtn.style.display = 'inline';
  playAnimBtn.style.display = 'inline';
  pauseAnimBtn.style.display = 'none';
};

const nextBtnFn = () => {
  isAnimPaused = true;
  animRecursive();
  nextAnimBtn.disabled = true;
};
