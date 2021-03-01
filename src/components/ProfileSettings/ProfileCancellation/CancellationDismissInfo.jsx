import React from 'react';
import styled from 'styled-components/macro';

import { Svg, Title, Text, redBackground } from 'components';

const CancellationInformation = () => {
  return (
    <div>
      <RedBackground>
        <Svg.SadFaceIcon />
      </RedBackground>

      <Title component="h5">
        Üyelik iptali işlemini şuanda gerçekleştiremiyoruz.
      </Title>

      <Text>Rezervasyon takvimime git</Text>

      <Text>Cüzdanıma Git</Text>
    </div>
  );
};

export default CancellationInformation;

const RedBackground = styled.div`
  ${redBackground}
`;
