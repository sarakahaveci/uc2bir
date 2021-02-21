const unMaskPhone = (phone = '') => {
  const editedPhone = phone
    .replace('(', '')
    .replace(')', '')
    .replaceAll(' ', '');

  return editedPhone;
};

export default unMaskPhone;
