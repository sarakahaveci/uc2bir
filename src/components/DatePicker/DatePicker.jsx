import React from 'react';
import styled, { css } from 'styled-components/macro';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { tr } from 'react-date-range/dist/locale';

export default function CustomDatePicker(props) {
  return (
    <StyledDatePicker hideToday={props.hideToday}>
      <DatePicker {...props} locale={tr} />
    </StyledDatePicker>
  );
}

const StyledDatePicker = styled.div`
  .react-datepicker {
    width: 100%;

    &__month {
      width: 100%;
      margin: unset;
      padding: 0.6rem;
    }

    &__month-container {
      width: 100%;
    }

    &__week {
      display: flex;
      justify-content: space-between;
    }

    &__day {
      &-names {
        display: flex;
        justify-content: space-around;
      }

      &--highlighted {
        border: 1px solid ${(p) => p.theme.colors.blue};
        border-radius: 50%;
        background-color: white;
        color: black;
      }

      &--selected,
      &--keyboard-selected,
      &--in-range {
        border-radius: 0.3rem;
        color: white;
        background-color: ${(p) => p.theme.colors.blue};
      }

      &--disabled {
        cursor: default;
        color: #ccc;
        border: none;
      }

      ${(p) =>
        p.hideToday &&
        css`
          &--today {
            background-color: white;
            color: black;
            font-weight: normal;
          }
        `}
    }
  }
`;
