import {
  MiniProfileCard,
  Material,
  WorkAreaCard,
  PaymentCard,
  Accordion,
  Svg,
} from 'components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { device } from 'utils';
import {
  //setReservation,
  // getCitiesAndDistict,
  getPtGymList,
  getUserBranchList,
  getPtWorkingHomePlace,
  getTemplates,
  getPtReservationCalendar,
} from 'actions';
import { space } from 'styled-system';
import GoogleMap from 'components/GoogleMaps/GoogleMap';
//
const uri = `${process.env.REACT_APP_API_URL}/regions`;

import { AwesomeIcon } from 'components';
import axios from 'axios';
import { getWallet } from 'actions/userProfileActions/walletActions';

const dateOption = true;

const Home = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);
  const { reservation } = useSelector((state) => state.reservation);
  const [toggleState, setToggleState] = useState(false);
  const [formData, setFormData] = useState({});
  const [city, setCity] = useState(false);
  const [town, setTown] = useState([]);
  const [district, setDistrict] = useState([]);
  const [sessionType, setSessionType] = useState(undefined);
  const [sessionTypes, setSessionTypes] = useState(undefined);

  const { branches: branchList } = useSelector(
    (state) => state.userProfile.branch
  );
  const gymList = useSelector((state) => state.userProfile.ptGymList);
  const homePlaces = useSelector(
    (state) => state.userProfile.workPlace.ptHomePlace
  );
  //const wallet = useSelector((state) => state.userProfile.wallet);
  useEffect(() => {
    var items = userInfo.session.map((item) => ({
      name: item.title,
      id: item.type,
    }));
    setSessionTypes([...items, { id: 'b', name: 'Belirttiğim Adres' }]);
    dispatch(getUserBranchList(userInfo.id));
    dispatch(getPtGymList(userInfo.id));
    dispatch(getPtWorkingHomePlace(userInfo.id));
    dispatch(getWallet());
    dispatch(getTemplates());
    dispatch(getPtReservationCalendar(userInfo.id, '27.04.2021'));
  }, [userInfo]);
  useEffect(() => {
    if (!city) {
      axios
        .post(uri)
        .then((res) => res.data)
        .then((data) => data.data)
        .then((data) => {
          const new_data = data.map((val) => {
            return {
              id: val.id,
              val: val.id,
              name: val.name,
            };
          });
          return setCity(new_data);
        })
        .catch((err) =>
          toast.error(err, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
  }, [city]);

  function WorkAreaSelect() {
    switch (sessionType) {
      case 'gym':
        return gymList?.data?.map((item) => (
          <>
            <Text>{'Spor Alanı Seçiniz:'}</Text>
            <CardGroup>
              <WorkAreaCard
                stars={item.rating}
                capacity={item.capacity}
                title={item.title}
                area_measure={item.area_measure}
                city={item.city}
                district={item.district}
                price={item.price}
              />
              <GreenCheckbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                //checked={checked.includes(data?.id)}
                // onChange={() => handleChange(data?.id)}
              />
            </CardGroup>
          </>
        ));
      case 'home_park':
        return homePlaces.data?.home_park?.map((item) => (
          <>
            <Accordion>
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
                    {toggleState ? <Svg.ArrowDownIcon /> : <Svg.ArrowUpIcon />}
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
          </>
        ));
      case 'online':
        return <></>;
      case 'b':
        return (
          <>
            <>
              <Material.SimpleSelect
                required
                label="İl Seçiniz"
                items={city}
                name="city"
                changeValue={formData?.city || ''}
                onChange={(e) => {
                  axios
                    .post(uri, { city_id: e.target.value })
                    .then((res) => res.data)
                    .then((data) => data.data)
                    .then((data) => {
                      const new_data = data.map((val) => {
                        return {
                          id: val.id,
                          val: val.id,
                          name: val.name,
                        };
                      });
                      return setTown(new_data);
                    });
                  return setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Material.SimpleSelect
                required
                label={town ? 'Önce İl Seçiniz' : 'İlçe Seçiniz'}
                items={town ? town : []}
                name="district"
                changeValue={formData?.district || ''}
                onChange={(e) => {
                  axios
                    .post(uri, { district_id: e.target.value })
                    .then((res) => res.data)
                    .then((data) => data.data)
                    .then((data) => {
                      const new_data = data.map((val) => {
                        return {
                          id: val.id,
                          val: val.id,
                          name: val.name,
                        };
                      });
                      return setDistrict(new_data);
                    });
                  return setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <Material.SimpleSelect
                required
                label={district ? 'Önce İlçe Seçiniz' : 'Mahalle Seçiniz'}
                items={district ? district : []}
                name="town"
                changeValue={formData?.town || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Material.TextField
                required
                label="Açık Adres"
                name="address_detail"
                icon={AwesomeIcon.Map}
                changeValue={formData.address_detail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </>
          </>
        );
      default:
        return <></>;
    }
  }
  function CreditCard() {
    return (
      <>
        <InfoContainer>
          <DataContainer>
            <Info borderDisable>
              <Text style={{ fontWeight: 800 }}>Kart Bilgileri</Text>
            </Info>
            <Material.TextField
              label="Kart Üzerindeki İsim"
              type="text"
              name="name"
            />

            <Material.TextField
              label="Kart Numarası"
              type="text"
              name="cardNo"
            />
            <Info borderDisable>
              <Material.TextField label="SKT" type="text" name="skt" />
              <Material.TextField label="CVV" type="text" name="cvv" />
            </Info>
            <Material.TextField
              label="Yükelenecek Tutarı Giriniz"
              type="text"
              name="cvv"
            />
          </DataContainer>
          <div style={{ padding: '10px' }}>
            <text>
              Güvenliğiniz sebebi ile bu işleminiz 3D secure ile
              gerçekleştirilecektir.
            </text>
          </div>
        </InfoContainer>
      </>
    );
  }
  function _renderLeftArea() {
    switch (reservation?.paymentType) {
      case 'wallet':
        return (
          <>
            <InfoContainer>
              <DataContainer>
                <Info>
                  <Text style={{ fontWeight: 800 }}>Cüzdanım</Text>
                  <Text style={{ fontWeight: 800 }}>900</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>İşlem Tutarı</Text>
                  <Text style={{ fontWeight: 800 }}>700</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>Kalan Tutar</Text>
                  <Text style={{ fontWeight: 800 }}>200</Text>
                </Info>
              </DataContainer>
              <div style={{ padding: '10px' }}>
                <text>
                  Yapacağınız işlem sonrası cüdanınızda kalacak olan toplam
                  tutar 200 TL’dir
                </text>
              </div>
            </InfoContainer>
            {true && <CreditCard />}
          </>
        );
      case 'creditCard':
        return <CreditCard />;
      default:
        return (
          <>
            <MiniProfileCard
              photo={userInfo.photo}
              name={userInfo.name}
              rating={userInfo.rating}
              type_id={userInfo.type_id}
              price={userInfo.price}
            />
            <SelectionContainer>
              {!dateOption && (
                <>
                  <Text>{'Tarih ve Saat Seçiniz:'}</Text>
                  <Material.SimpleSelect
                    required
                    name="city"
                    forHtml="city"
                    label="Tarih ve Saat Seçiniz"
                  />
                </>
              )}
              <Text>{'Branş Seçiniz:'}</Text>
              <Material.SimpleSelect
                items={branchList.branches}
                name="branch"
                // action={actionSetData}
                //state={detail}
              />
              <Text>{'Oturum Türü Seçiniz:'}</Text>
              <Material.SimpleSelect
                items={sessionTypes}
                name="sessionType"
                onChange={(e) => setSessionType(e.target.value)}
                state={sessionType}
              />

              <WorkAreaSelect />
            </SelectionContainer>
          </>
        );
    }
  }

  return (
    <Container>
      <LeftWrapper>{_renderLeftArea()}</LeftWrapper>
      <RightWrapper>
        <PaymentCard dateOption={dateOption} />
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

//

const InfoContainer = styled.div`
  margin-top: 40px;
  width: 586px;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const DataContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #c6c6c6;
  padding: 5px 20px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  border-style: ${(p) => (p.borderDisable ? 'none' : 'solid')};
  border-color: rgba(144, 144, 144, 0.5);
  border-width: 0 0 1px 0;
  padding: 10px 5px;
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

const ParkInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const ParkHeader = styled.text`
  font-weight: 600;
  font-size: 1.1rem;
`;
const ParkAdress = styled.text`
  font-weight: 300;
  font-size: 1rem;
`;

const MapWrapper = styled.div`
  width: 80%;
  border-radius: 30px;
  overflow: hidden;
`;
export default Home;
