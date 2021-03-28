import React from 'react';
import styled from 'styled-components/macro';
import { DateRange } from 'react-date-range';
import { tr } from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { theme } from 'utils';

export default function CustomCelandar(props) {
  return <StyledCalendar {...props} color={theme.colors.blue} locale={tr} />;
}

const StyledCalendar = styled(DateRange)`
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

  .rdrdDayActive {
    color: ${(p) => p.theme.colors.blue} !important;
  }

  .rdrDayStartPreview {
    color: ${(p) => p.theme.colors.blue} !important;
  }

  .rdrDayNumber {
    > span {
      &:after {
        background: ${(p) => p.theme.colors.blue};
      }
    }
  }

  .rdrStartEdge,
  .rdrEndEdge,
  .rdrInRange {
    color: ${(p) => p.theme.colors.blue} !important;
  }
`;
