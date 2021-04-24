import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { Accordion, Svg } from 'components';
import { space } from 'styled-system';
import GoogleMap from 'components/GoogleMaps/GoogleMap';

export default function ReservationAccordion({
  title,
  address,
  lat,
  lng,
  defaultOpen = false,
  ...restProps
}) {
  const [toggleState, setToggleState] = useState(defaultOpen);
  return (
    <Accordion>
      <AccordionItemWrapper {...restProps}>
        <Accordion.Item defaultOpen={defaultOpen}>
          <Accordion.Toggle
            onToggle={(state) => setToggleState(state)}
            className="accordion-toggler"
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Svg.SessionType.Clinic />

              <Info>
                <DarkTitle>{title}</DarkTitle>
                <Adress>{address}</Adress>
              </Info>
            </div>
            {toggleState ? <Svg.ArrowDownIcon /> : <Svg.ArrowUpIcon />}
          </Accordion.Toggle>
          <Accordion.Collapse>
            <MapWrapper>
              <GoogleMap
                locationFromUser={{
                  lat: lat,
                  lng: lng,
                }}
                disabled
              />
            </MapWrapper>
          </Accordion.Collapse>
        </Accordion.Item>
      </AccordionItemWrapper>
    </Accordion>
  );
}

const DarkTitle = styled.h4`
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  margin-left: 5px;
  color: ${(p) => p.theme.colors.dark};
`;

const AccordionItemWrapper = styled.div`
  border-radius: 20px;
  background: #fff;
  margin-bottom: 20px;
  width: 100%;
  ${space}

  .accordion-toggler {
    display: flex;
    background: ${(p) =>
      p.parent
        ? '#EFEFEF'
        : p.accordionBackground
        ? p.accordionBackground
        : '#F8F8F8'};
    justify-content: space-between;
    border-radius: ${(p) => (p.accordionRadius ? p.accordionRadius : '10px')};
    padding: 15px;
    margin-bottom: 10px;
  }
`;

const MapWrapper = styled.div`
  width: 80%;
  border-radius: 30px;
  overflow: hidden;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 40px;
`;

const Adress = styled.text`
  font-weight: 300;
  font-size: 1rem;
`;

/**
 * 
 * 
 * 
 *  <Accordion>
                  <AccordionItemWrapper>
                    <Accordion.Item defaultOpen={false}>
                      <Accordion.Toggle
                        onToggle={(state) => setToggleState(state)}
                        className="accordion-toggler"
                      >
                        <Svg.SessionType.Park />
                        <ParkInfo>
                          <ParkHeader>{item.title}</ParkHeader>
                          <ParkAdress>
                            {item.town + ' ' + item.district + ' ' + item.city}
                          </ParkAdress>
                        </ParkInfo>
                        {toggleState ? (
                          <Svg.ArrowDownIcon />
                        ) : (
                          <Svg.ArrowUpIcon />
                        )}
                      </Accordion.Toggle>
                      <Accordion.Collapse>
                        <MapWrapper>
                          <GoogleMap
                            locationFromUser={{
                              lat: item.lat,
                              lng: item.lng,
                            }}
                            disabled
                          />
                        </MapWrapper>
                      </Accordion.Collapse>
                    </Accordion.Item>
                  </AccordionItemWrapper>
                </Accordion>
 * 
 */
