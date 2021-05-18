
// @ts-nocheck
import React from 'react';

import styled from 'styled-components/macro';
import LongUserCard from 'components/UserCards/LongUserCard';
import { device } from 'utils';

// import {
//     Pagination,
// } from 'components';
const GymTab = ({ gyms, }) => {


    return (
        <div>
            {gyms?.length > 0 ? <GymListWrapper>
                {gyms?.map((professional) => (
                    <LongUserCard
                        favoriteId={professional?.user_id}
                        showHeartBg
                        key={professional?.id || professional?.user_id}
                        data={professional}
                        city={professional?.city}
                        district={professional?.district}
                    />
                ))}
            </GymListWrapper> :
                <span style={{ marginLeft: 8, color: "var(--blue)" }} >Aramanız ile ilgili spor salonu bulunamadı.</span>}

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
export default GymTab;
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