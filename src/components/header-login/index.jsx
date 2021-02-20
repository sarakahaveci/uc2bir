import React from 'react';
import PropTypes from 'prop-types';

import Individual from './distribution/Individual';
import styled from 'styled-components/macro';

const HeaderLogin = ({
  type_id,
  user,
}) => {
  return (
    <Section>
      <Individual
        user_name={user.name}
        user_img={user.img}
      />
    </Section>
  )
}

const Section = styled.section`
  display: flex;
  padding: 0 30px;
  width: 100%;
  flex-wrap: wrap;
`;

HeaderLogin.propTypes = {
  info: PropTypes.object.isRequired,
  type_id: PropTypes.number
}

export default HeaderLogin
