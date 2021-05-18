// @ts-nocheck
import React from 'react'; 

import styled from 'styled-components/macro';
import BlogCard from 'components/UserCards/BlogCard';
import { device } from 'utils';

// import {
//     Pagination,
// } from 'components';
const BlogsTab = ({ blogs, }) => {

    return (
        <div>
            {blogs?.length>0?<GymListWrapper>
                {blogs?.map((professional) => (
                    <BlogCard
                        favoriteId={professional?.user_id}
                        showHeartBg
                        key={professional?.id || professional?.user_id}
                        data={professional}
                        city={professional?.city}
                        district={professional?.district}
                    />
                ))}
            </GymListWrapper>:
            <span style={{marginLeft:8,color:"var(--blue)"}} >Aramanız ile ilgili blog yazısı bulunamadı.</span>
            }

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

export default BlogsTab;

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

