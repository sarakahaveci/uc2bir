import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { Accordion, Box } from 'components';
import { getDietitionSpecialties } from 'actions';
import BranchCardHeader from '../../../BranchRow/BranchRowToggler';
import BranchCardBody from '../../../BranchRow/BranchRowCollapser';
function DietitionFacilityList({ userId }) {
  const dispatch = useDispatch();
  const { data } = useSelector(
    (state) => state.userProfile?.dietitionSpeciality
  );

  useEffect(() => {
    dispatch(getDietitionSpecialties(userId));
  }, []);

  return (
    <div>
      {
        <Accordion>
          {data?.map((item, index) => {
            return (
              <StyledRow key={index}>
                <Order>{index + 1}.</Order>

                <AccordionItem>
                  <Accordion.Item>
                    <Accordion.Toggle>
                      <BranchCardHeader data={item} />
                    </Accordion.Toggle>

                    <Accordion.Collapse>
                      <BranchCardBody speciality={item?.speciality} />
                    </Accordion.Collapse>
                  </Accordion.Item>
                </AccordionItem>
              </StyledRow>
            );
          })}
        </Accordion>
      }
    </div>
  );
}
const StyledRow = styled(Box)`
  display: flex;

  &:not(:first-child) {
    margin-top: 30px;
  }
`;

const AccordionItem = styled.div`
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  flex: 1;
`;

const Order = styled.span`
  font-weight: 600;
  color: ${(p) => p.theme.colors.white2};
  margin: 15px 10px 0 0;
`;

export default DietitionFacilityList;
