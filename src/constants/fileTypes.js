import { PERSONAL_TRAINER, WORK_PLACE, DIETITIAN } from './userTypes';

export const FACE_PICTURE = 1;
export const IDENTITY_CARD = 2;
export const CRIMINAL_RECORD = 3;
export const DEGREE = 4;
export const CERTIFICATE = 5;

export const HEALTH_REPORT = 6;
export const CONTRACT = 7;
export const GALLERY = 8;
export const LICENSE = 9;
export const CV = 10;
export const TAXPLATE = 11;


export const fileDetails = {
  [FACE_PICTURE]: 'Yüzünüzün net bir şekilde görüldüğü fotoğrafınızı ekleyin.',
  [IDENTITY_CARD]: 'Nüfus cüzdanınızın fotoğrafını ekleyin.',
  [CRIMINAL_RECORD]:
    'E-devlet üzerinden alabileceğiniz adli sicil kaydınızı ekleyin. Aşağıdaki linkten e-devlete ulaşabilirsiniz.',
  [DEGREE]: 'Diplomanızı ekleyin.',
  [CERTIFICATE]: 'Sertifikalarınızı yükleyin',
  [HEALTH_REPORT]: 'İlgili kurumlardan aldığınız sağlık raporunuzu ekleyin.',
  [CONTRACT]: 'İl Gençlik Spor Genel Müdürlüğü Çalışma Ruhsatı',
  [LICENSE]: 'İlgili Belediye İş Yeri Ruhsatını yükleyin',
  [TAXPLATE]: 'Vergi Levhası yükleyin',

};

export const trainerRequiredFileCount = {
  [FACE_PICTURE]: 1,
  [IDENTITY_CARD]: 2,
  [CRIMINAL_RECORD]: 1,
  [DEGREE]: 1,
  [CERTIFICATE]: 1,
  [HEALTH_REPORT]: 1,
  [CONTRACT]: 1,
  [LICENSE]: 1,
  [GALLERY]: 0,
};

export const dietatianRequiredFileCount = {
  [FACE_PICTURE]: 1,
  [IDENTITY_CARD]: 2,
  [CRIMINAL_RECORD]: 1,
  [DEGREE]: 1,
  [CERTIFICATE]: 1,
  [CONTRACT]: 1,
  [LICENSE]: 1,
  [GALLERY]: 0,
};

export const workPlaceRequiredFileCount = {
  [CRIMINAL_RECORD]: 1,
  [CONTRACT]: 1,
  [LICENSE]: 1,
  [TAXPLATE]: 1,

};

export const filesForProfileType = {
  [PERSONAL_TRAINER]: [1, 2, 3, 4, 5, 6, 8, 10],
  [WORK_PLACE]: [3, 7, 9, 11],
  [DIETITIAN]: [1, 2, 3, 4, 5, 8],
};
