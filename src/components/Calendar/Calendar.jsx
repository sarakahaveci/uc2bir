import React from 'react';
import styled from 'styled-components/macro';
import { Calendar } from 'react-date-range';
import { tr } from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function CustomCelandar(props) {
  return <StyledCalendar {...props} locale={tr} />;
}

const StyledCalendar = styled(Calendar)`
  .rdrDateDisplayWrapper {
    display: none;
  }

  &.rdrCalendarWrapper {
    width: 100%;
  }

  .rdrMonths {
    width: 100%;
  }

  .rdrMonth {
    width: 100%;
  }
`;
