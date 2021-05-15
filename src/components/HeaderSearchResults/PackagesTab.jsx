// @ts-nocheck
import React from 'react'; 

import styled from 'styled-components/macro'; 
import { device } from 'utils';
import PacketCard from 'components/UserCards/PacketCard';


// import {
//     Pagination,
// } from 'components';
const PackagesTab = ({ packages, }) => {

    return (
        <div>
            <GymListWrapper>
                {packages?.map((packet) => (
                    <PacketCard
                        showHeartBg
                        key={packet?.id || packet?.user_id}
                        data={packet}
                        city={packet?.city}
                        district={packet?.district}
                    />
                ))}
            </GymListWrapper>

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
export default PackagesTab;
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