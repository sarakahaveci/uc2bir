import {
  MiniProfileCard,
  Material,
  WorkAreaCard,
  PaymentCard,
} from 'components';
import React from 'react';
//import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { device } from 'utils';
const Home = () => {
  // const dispatch = useDispatch();

  return (
    <Container>
      <LeftWrapper>
        <MiniProfileCard />
        <SelectionContainer>
          <Text>{'Tarih ve Saat Seçiniz:'}</Text>
          <Material.SimpleSelect
            required
            name="city"
            forHtml="city"
            label="Tarih ve Saat Seçiniz"
          />
          <Text>{'Branş Seçiniz:'}</Text>
          <Material.SimpleSelect
            required
            name="city"
            forHtml="city"
            label="Branş Seçiniz"
          />
          <Text>{'Oturum Türü Seçiniz:'}</Text>
          <Material.SimpleSelect
            required
            name="city"
            forHtml="city"
            label="Oturum Türü Seçiniz"
          />
          <Text>{'Spor Alanı Seçiniz:'}</Text>
          <CardGroup>
            <WorkAreaCard
              stars={5}
              capacity={200}
              title={'salam'}
              area_measure={'sd'}
              city={'izmir'}
              district={'bornova'}
              price={'300'}
            />
            <GreenCheckbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
              //checked={checked.includes(data?.id)}
              // onChange={() => handleChange(data?.id)}
            />
          </CardGroup>
          <CardGroup>
            <WorkAreaCard
              stars={5}
              capacity={200}
              title={'salam'}
              area_measure={'sd'}
              city={'izmir'}
              district={'bornova'}
              price={'300'}
            />
            <GreenCheckbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<RadioButtonCheckedIcon />}
              //checked={checked.includes(data?.id)}
              // onChange={() => handleChange(data?.id)}
            />
          </CardGroup>
        </SelectionContainer>
      </LeftWrapper>
      <RightWrapper>
        <PaymentCard />
      </RightWrapper>
    </Container>
  );
};
const GreenCheckbox = withStyles({
  root: {
    color: '#00b3a8',
    width: 50,
    '&$checked': {
      color: '#00b3a8',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const Container = styled.div`
  display: flex;
  width: 100%;
  @media ${device.sm} {
    flex-direction: column;
  }
`;
const LeftWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  @media ${device.sm} {
    width: 100%;
  }
`;
const RightWrapper = styled.div`
  width: 50%;
  @media ${device.sm} {
    width: 100%;
  }
`;
const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border-top-style: solid;
  border-weight: 1px;
  border-color: gray;
  padding: 30px;
  @media ${device.sm} {
    padding: 0;
  }
`;
const Text = styled.text`
  font-weight: bold;
  margin-top: 20px;
`;
const CardGroup = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 10px;
  padding-right: 95px;
  position: relative;
  justify-content: center;
  align-items: center;
`;
export default Home;
