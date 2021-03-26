const colorGenerator = (color) => {
  switch (color) {
    case 'dark':
      return '#1a1818';
    case 'softDark':
      return '#181818';
    case 'blue':
      return '#00b2a9';
    case 'white':
      return '#ffff';
    case 'trunge':
      return '#ffba00';
    case 'orange2':
      return '#F77E0B';
    case 'red':
      return '#f01c62';
    case 'gray1':
      return '#909090';
    case 'gray2':
      return '#bbbbbb';
    case 'gray3':
      return '#2C2C2C';
    case 'gray4':
      return '#d3d3d3';
    default:
      return 'black';
  }
};

export default colorGenerator;
