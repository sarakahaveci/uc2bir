import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTemplateItem } from 'actions';
import { Svg, Box, Span, Text } from 'components';
import ReservationAccordion from '../ReservationAccordion';
import { PERSONAL_TRAINER, WORK_PLACE } from '../../../../constants';

const TemplateSummary = () => {
  const { selectedDay } = useSelector(
    (state) => state.profileSettings2.reservationTemplate
  );

  const { type_id: userTypeId } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const selectedLocations = (sessionTypes) => {
    const locationsArr = sessionTypes.flatMap((session) => session.location);

    return locationsArr.map((item, index) => {
      if (item)
        return (
          <Span fontWeight="400" key={index}>
            {item?.title}

            {index < locationsArr.length - 1 && ', '}
          </Span>
        );
    });
  };

  const templateItems =
    selectedDay?.slice?.map((item) => (
      <TemplateInfoRow key={item.id}>
        <Svg.TrashIcon
          className="trash-icon"
          onClick={() => dispatch(deleteTemplateItem(selectedDay.day, item.id))}
        />

        <div>
          <HourWrapper>
            <Svg.ClockIcon className="clock-icon" />

            <Box row alignItems="center">
              {item.hour}
            </Box>
          </HourWrapper>

          {userTypeId === PERSONAL_TRAINER && (
            <Box>
              <Span fontWeight="600" mr="5px">
                Branşlar:
              </Span>
              {item.branch.map((branch, index) => (
                <span key={index}>
                  {branch.name}

                  {index < item.branch.length - 1 && ', '}
                </span>
              ))}
            </Box>
          )}

          {userTypeId !== WORK_PLACE && (
            <>
              <div>
                <Text fontWeight="600">
                  <Span mr="5px">Oturum Türleri:</Span>

                  {item.session_type.map((sessionType, index) => (
                    <Span key={index} fontWeight="400">
                      {sessionType.session.title}

                      {index < item.session_type.length - 1 && ', '}
                    </Span>
                  ))}
                </Text>
              </div>

              <Text fontWeight="600">
                <Span mr="5px">Seçili Yerler:</Span>

                {selectedLocations(item.session_type)}
              </Text>
            </>
          )}

          {userTypeId === WORK_PLACE && (
            <Text fontWeight="600">
              <Span mr="5px">Sınıflar:</Span>

              {item?.location?.map((location, index) => (
                <Span key={index} fontWeight="400">
                  {location.title}

                  {index < item.location.length - 1 && ', '}
                </Span>
              ))}
            </Text>
          )}
        </div>
      </TemplateInfoRow>
    )) || [];

  return (
    <ReservationAccordion title="Rezervasyonlarınız" defaultOpen={true}>
      {templateItems.length ? (
        <AccordionCollapseWrapper>{templateItems}</AccordionCollapseWrapper>
      ) : (
        <div></div>
      )}
    </ReservationAccordion>
  );
};

export default React.memo(TemplateSummary);

const HourWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;

  svg {
    margin-bottom: 5px;
  }
`;

const TemplateInfoRow = styled.div`
  border-top: 1px solid rgba(144, 144, 144, 0.2);
  padding: 15px 15px 15px 0;
  position: relative;

  .trash-icon {
    position: absolute;
    top: 15px;
    right: 0;
    cursor: pointer;
  }

  .clock-icon {
    margin-right: 10px;
  }
`;

const AccordionCollapseWrapper = styled.div`
  padding-top: 10px;
  padding: 20px;
`;
