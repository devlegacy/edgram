// const FG_BLACK = '\x1b[30m';
// const BRIGHT = '\x1b[1m';
// const BG_RESET = '\x1b[0m';
// const BG_WHITE = `\x1b[47m${FG_BLACK}${BRIGHT}`;
// const GB_GREY = '#7e8b8c';
// const BG_BLUE = '#039be5';
const BG_GREEN = '#3dca77';
const BG_YELLOW = '#f09c32';
const BG_RED = '#bc3f32';

const logStyle = (bg) => `color:#fff; background-color: ${bg}; font-weight: bolder; border-radius: 5px; padding: 2px;`;

const levelToColor = {
  log: logStyle(BG_GREEN),
  warn: logStyle(BG_YELLOW),
  error: logStyle(BG_RED),
  // debug: BG_WHITE,
  // groupCollapsed: BG_BLUE,
};

const logType = (type = 'log', args) => {
  let title = args.length > 1 ? args.shift() : '[Dvx]:';
  console.log(`%c${title}`, levelToColor[type], ...args);
};

const c = console.log;
const clear = console.clear;
const dir = console.dir;
// const error = console.error;
const info = console.info;
// const warn = console.warn;

const time = console.time;          // console.time(label);
const timeEnd = console.timeEnd;    // console.timeEnd(label);

const group = console.group;        // console.group([label]);
const groupEnd = console.groupEnd;

const table = console.table;

const consoleUserWarning = () => {
  c(`%c¡Alto! \n%c[Advertencia] - Esta característica del navegador es recomendada solo para desarrolladores`,
    'color:red; font-size: 60px; text-shadow: 0px 2px 3px #000;',
    'font-size: 35px;');
}

const log = (...args) => {
  logType('log', args);
};

const warn = (...args) => {
  logType('warn', args);
};

const error = (...args) => {
  logType('error', args);
};

export {
  c,
  clear,
  consoleUserWarning,
  dir,
  error,
  group,
  groupEnd,
  info,
  log,
  table,
  time,
  timeEnd,
  warn,
};
