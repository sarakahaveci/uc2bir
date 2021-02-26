export const FACE_PICTURE = 1;
export const IDENTITY_CARD = 2;
export const CRIMINAL_RECORD = 3;
export const DEGREE = 4;
export const CERTIFICATE = 5;
export const HEALTH_REPORT = 6;
export const CONTRACT = 7;
export const LICENSE = 9;

export const fileDetails = {
  [FACE_PICTURE]: 'Yüzünüzün net bir şekilde görüldüğü fotoğrafınızı ekleyin.',
  [IDENTITY_CARD]: 'Nüfus cüzdanınızın fotoğrafını ekleyin.',
  [CRIMINAL_RECORD]:
    'E-devlet üzerinden alabileceğiniz adli sicil kaydınızı ekleyin. Aşağıdaki linkten e-devlete ulaşabilirsiniz.',
  [DEGREE]: 'Diplomanızı ekleyin.',
  [CERTIFICATE]: 'Sertifikalarınızı yükleyin',
  [HEALTH_REPORT]: 'İlgili kurumlardan aldığınız sağlık raporunuzu ekleyin.',
  [CONTRACT]: 'İş Yeri Kiralama Kararını yükleyin',
  [LICENSE]: 'İş Yeri Ruhsatını yükleyin',
};

export const requiredFileCount = {
  [FACE_PICTURE]: 1,
  [IDENTITY_CARD]: 2,
  [CRIMINAL_RECORD]: 1,
  [DEGREE]: 1,
  [CERTIFICATE]: 1,
  [HEALTH_REPORT]: 1,
  [CONTRACT]: 1,
  [LICENSE]: 1,
};
