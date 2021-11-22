import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Button } from 'components';
import { device } from 'utils';
import { isMobile, isIOS, isAndroid } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MobileAppOpen = () => {
  const { t } = useTranslation();
  const { infoData } = useSelector((state) => state.footer);
  const [visibity, setVisibity] = useState(true);

  useEffect(() => {}, []);

  return (
    <>
      {isMobile  && (
        <Container style={{ display: visibity ? 'flex' : 'none' }}>
          <div style={{ width: '90%', height: '50px' }}>
            <text style={{ color: 'white', marginRight: '15px' }}>
              Mobil uygulamamızı açın.
            </text>
            {
              isAndroid && infoData?.android_app_link && (
                <StyledButton
                  text={t('open')}
                  fontWeight="500"
                  onClick={() => {
                    window.location.href = infoData?.android_app_link;
                  }}
                />
              )
              //   isLoading={loading}
              //   disabled={loading}
            }
            {
              isIOS && infoData?.ios_app_link && (
                <StyledButton
                  text={t('open')}
                  fontWeight="500"
                  onClick={() => {
                    window.location.href = infoData?.ios_app_link;
                  }}
                />
              )
              //   isLoading={loading}
              //   disabled={loading}
            }
          </div>
          <div
            style={{
              display: 'flex',
              height: '100px',
              justifyContent: 'center',
              color: 'white',
              paddingTop: '10px',
            }}
            onClick={() => {
              setVisibity(false);
            }}
          >
            x
          </div>
        </Container>
      )}
    </>
  );
};

const StyledButton = styled(Button)`
  color: var(--blue);
  background: white !important;
  width: 80px;
  margin-top: 7px;
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100px;
  background: red;
  position: fixed;
  z-index: 99999999999999999999999;
  top: 0;
  justify-content: center;
  align-items: center;
  background: #00b2a9;
  flex-direction: row;
  @media ${device.sm} {
    padding: 2px;
  }
`;

export default MobileAppOpen;
