import { getHours, getMinutes } from 'date-fns';
import format from 'date-fns/format';
import tr from 'date-fns/locale/tr';

export const ISOToTimeConverter = (createdDate) => {
  const hours = getHours(new Date(createdDate));
  const minutes = getMinutes(new Date(createdDate));

  return `${hours}:${minutes}`;
};

export const ISOToDateConverter = () =>
  format(new Date(), 'd MMMM', {
    locale: tr,
  });
