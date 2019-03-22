const c = console.log;
const clear = console.clear;
const dir = console.dir;
const error = console.error;
const info = console.info;
const warn = console.warn;

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

export {
  c,
  clear,
  consoleUserWarning,
  dir,
  error,
  group,
  groupEnd,
  info,
  table,
  time,
  timeEnd,
  warn,
}
