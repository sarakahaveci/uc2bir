import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { useDispatch, useSelector } from 'react-redux';
import { getStaticPage } from 'actions';
import ReactHtmlParser from 'react-html-parser';
import { device } from 'utils';
import { decode } from 'html-entities';

const UyeOnBilgilendirmeFormu = () => {
  const staticPages = useSelector((state) => state?.staticPages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStaticPage('uye-on-bilgilendirme-formu'));
  }, []);

  return (
    <KvkkContainer>
      <ConfirmationTitle
        dangerouslySetInnerHTML={{
          __html: staticPages?.data?.['uye-on-bilgilendirme-formu']?.title,
        }}
      />
      <div>
        {ReactHtmlParser(
          decode(staticPages?.data?.['uye-on-bilgilendirme-formu']?.detail)
        )}
      </div>
    </KvkkContainer>
  );
};

export default UyeOnBilgilendirmeFormu;

const KvkkContainer = styled.div`
  max-width: 960px;
  padding: 200px 0 100px 0;
  margin: auto;
  @media ${device.sm} {
    padding: 200px 50px 200px 50px;
    margin: auto;
  }
`;
const ConfirmationTitle = styled.h5`
  margin-bottom: 10px;
`;
