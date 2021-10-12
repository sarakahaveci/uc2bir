import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

import { useDispatch, useSelector } from 'react-redux';
import { getStaticPage } from 'actions';
import ReactHtmlParser from 'react-html-parser';
import { device } from 'utils';
import { decode } from 'html-entities';

const StaticPage = ({ match }) => {
  const staticPages = useSelector((state) => state?.staticPages);
  const dispatch = useDispatch();
  const link = match?.params?.link;
  useEffect(() => {
    dispatch(getStaticPage(link));
  }, [link]);

  return (
    <KvkkContainer>
      <ConfirmationTitle
        dangerouslySetInnerHTML={{
          __html: staticPages?.data?.[link]?.title,
        }}
      />
      <div>
        {ReactHtmlParser(
          decode(staticPages?.data?.[link]?.detail)
        )}
      </div>
    </KvkkContainer>
  );
};

export default StaticPage;

const KvkkContainer = styled.div`
  max-width: 960px;
  padding: 200px 0 100px 0;
  margin: auto;
  @media ${device.sm} {
    padding: 200px 50px 200px 50px;
    margin: auto;
  }
`;
const ConfirmationTitle = styled.h5`
  margin-bottom: 10px;
`;
