import Resizer from 'react-image-file-resizer';

const resizeFile = (file) =>
  new Promise((resolve) => {
    if (file?.type?.includes('image')) {
      //Only İmage Formats
      Resizer?.imageFileResizer(
        file,
        800,
        800,
        'JPEG',
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        'file'
      );
    } else {
      resolve(file);
    }
  });

export default resizeFile;
