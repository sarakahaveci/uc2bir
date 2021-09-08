// @ts-nocheck
import React from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components/macro';
import { device } from 'utils';
import DtPacketCard from 'components/UserCards/DtPacketCard';

// import {
//     Pagination,
// } from 'components';
const DtPackagesTab = ({ packages }) => {
  const { t } = useTranslation();

  return (
    <div>
      {packages?.length > 0 ? (
        <GymListWrapper>
          {packages?.map((packet) => (
            <DtPacketCard
              showHeartBg
              key={packet?.id || packet?.user_id}
              data={packet}
              city={packet?.city}
              district={packet?.district}
            />
          ))}
        </GymListWrapper>
      ) : (
        <span style={{ marginLeft: 8, color: 'var(--blue)' }}>
          {' '}
          {t('No blog posts related to your search were found')}
        </span>
      )}

      {/*     <div className="d-flex w-100 mt-3">
                    <Pagination
                        className="mx-auto"
                        mt="50px"
                        count={totalPage}
                        page={page}
                        onChange={handleChangePage}
                    /> 
                </div>*/}
    </div>
  );
};
export default DtPackagesTab;
const GymListWrapper = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 300px 300px 300px 300px;
  grid-row-gap: 20px;
  padding: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: auto auto;
  }
  @media ${device.sm} {
    grid-template-columns: auto;
  }
`;
