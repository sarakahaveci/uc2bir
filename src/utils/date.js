import {
  getDate,
  getMonth,
  getYear,
  parse,
  getHours,
  getMinutes,
} from 'date-fns';

const javaTimeFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS";

export const splitDateFromJavaTimeFormat = (value) => {
  const date = parse(value, javaTimeFormat, new Date());

  return {
    day: getDate(date),
    month: getMonth(date) + 1,
    year: getYear(date),
    hour: getHours(date),
    minutes: getMinutes(date),
  };
};

export const splitDateFromIsoDate = (value) => {
  var date = new Date(value);
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();
  const day = date.getUTCDay();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();

  return {
    day,
    month,
    year,
    hour,
    minute,
    second,
  };
};
