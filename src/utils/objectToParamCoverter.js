export default (formData, baseUrl) => {
  const url = Object.keys(formData).reduce((acc, curr) => {
    if (formData[curr]) {
      return acc + `&${curr}=${formData[curr]}`;
    }

    return acc;
  }, baseUrl);

  return url;
};
