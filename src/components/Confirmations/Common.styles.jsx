import styled from 'styled-components/macro';

export const Container = styled.div`
  h5 {
    margin: 0 0 15px 35px;
  }

  fieldset {
    max-width: 25px;
  }
`;

export const ConfirmationTitle = styled.h5`
  font-weight: 600;
  color: ${(p) => p.theme.colors.softDark};
`;

export const InfoField = styled.div`
  display: flex;
  align-items: center;

  fieldset {
    height: 30px;
    margin-right: 10px;
  }
`;

export const TextArea = styled.div`
  max-height: 100px;
  font-size: 0.9rem;
  overflow-y: scroll;
  letter-spacing: 0.01em;
  color: var(--black3);
  padding: 10px;

  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    height: 62px;
    border-radius: 3px;
    background: rgba(155, 155, 155, 0.4);
  }
`;

export const TextAreaWrapper = styled.div`
  border-radius: 20px;
  background: #fff;
  border: 1px solid #c6c6c6;
  padding: 5px;
  letter-spacing: 0.01em;
  color: var(--black3);
  margin-bottom: 15px;
`;
