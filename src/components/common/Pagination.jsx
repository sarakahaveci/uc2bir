import React from 'react';
import styled from 'styled-components/macro';

import { space } from 'styled-system';
import Pagination from '@material-ui/lab/Pagination';

const CustomPagination = (props) => {
  return <StyledPagination {...props} variant="outlined" shape="rounded" />;
};

export default CustomPagination;

const StyledPagination = styled(Pagination)`
  border-radius: 10px;
  background: rgba(220, 223, 212, 0.25);
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${space}

  .MuiPagination-ul {
    li {
      &:first-child {
        margin-right: 20px;
      }

      &:last-child {
        margin-left: 20px;
      }
    }
  }

  .MuiPaginationItem {
    &-rounded {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      background: #fff;
      border: 2px solid #dcdfd4;
    }
  }

  .Mui {
    &-selected {
      background-color: ${(p) => p.theme.colors.blue} !important;
      border: 2px solid ${(p) => p.theme.colors.blue};
      color: white;
    }
  }
`;
