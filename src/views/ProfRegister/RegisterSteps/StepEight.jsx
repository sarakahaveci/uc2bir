import React from 'react';

import FileUpload from './FileUpload';

const StepEight = () => {
  return (
    <>
      <FileUpload
        fileTypeName="Sağlık Raporu"
        title="İlgili kurumlardan aldığınız sağlık raporunuzu ekleyin."
      >
        <div className="health-report">
          Sağlık raporunuzu 30 gün içerisinde sistemimize yüklemeniz
          gerekmektedir.
        </div>
      </FileUpload>
    </>
  );
};

export default StepEight;
