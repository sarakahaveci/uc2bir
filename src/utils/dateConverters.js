import { getHours, getMinutes } from 'date-fns';
import format from 'date-fns/format';
import tr from 'date-fns/locale/tr';

export const ISOToTimeConverter = (value) => {
  const hours = getHours(new Date(value));
  const minutes = getMinutes(new Date(value));

  return `${hours}:${minutes}`;
};

export const ISOToDateConverter = (value) =>
  format(new Date(value), 'd MMMM', {
    locale: tr,
  });
