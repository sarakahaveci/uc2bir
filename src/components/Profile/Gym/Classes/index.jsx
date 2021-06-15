import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { Accordion, Box } from 'components';
import { getGymClassList } from 'actions';
import BranchCardHeader from '../../../BranchRow/BranchRowToggler';
import BranchCardBody from '../../../BranchRow/BranchRowCollapser';

const GymClass = ({ userId }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userProfile.gymClass);

  useEffect(() => {
    dispatch(getGymClassList(userId));
  }, []);
  const history = useHistory();

  const handleClick = () => {
    history.push('/myprofile/settings/activity');
  };
  return (
    <div>
      <div className="d-flex">
        <strong className="mx-auto my-2">
          Sınıf eklemek ve düzenlemek için{' '}
          <Click onClick={handleClick}>burayı</Click> tıklayınız.
        </strong>
      </div>
      {data ? (
        <Accordion>
          {data?.class?.map((item, index) => {
            return (
              <StyledRow key={index}>
                <Order>{index + 1}.</Order>

                <AccordionItem>
                  <Accordion.Item>
                    <Accordion.Toggle>
                      <BranchCardHeader data={item} />
                    </Accordion.Toggle>

                    <Accordion.Collapse>
                      <BranchCardBody speciality={item?.branches} />
                    </Accordion.Collapse>
                  </Accordion.Item>
                </AccordionItem>
              </StyledRow>
            );
          })}
        </Accordion>
      ) : (
        <div className="d-flex">
          <strong className="mx-auto">
            İş Yerine kayıtlı herhangi bir sınıf bulunmamaktadır.
          </strong>
        </div>
      )}
    </div>
  );
};

export default GymClass;

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
const Click = styled.span`
  color: #00b2a9;
  cursor: pointer;
`;
