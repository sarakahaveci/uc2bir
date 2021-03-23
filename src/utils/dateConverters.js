import { getHours, getMinutes } from 'date-fns';
import format from 'date-fns/format';
import tr from 'date-fns/locale/tr';

export const ISOToTimeConverter = (value) => {
  let hours = `0${getHours(new Date(value))}`.slice(-2);
  let minutes = `0${getMinutes(new Date(value))}`.slice(-2);

  return `${hours}:${minutes}`;
};

export const ISOToDateConverter = (value) =>
  format(new Date(value), 'd MMMM', {
    locale: tr,
  });
