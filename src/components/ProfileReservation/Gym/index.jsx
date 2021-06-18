import {
  MiniProfileCard,
  Material,
  TrainerCard,
  PaymentCard,
  MultiContract,
  CreditCard,
  Pagination,
} from 'components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { device } from 'utils';
import { Modal } from 'react-bootstrap';
import {
  setReservation,
  getStaticPage,
  getGymReservationCalendar,
  getGymDataForRes
} from 'actions';
import RadioGroup from '@material-ui/core/RadioGroup';
import { getWallet } from 'actions/userProfileActions/walletActions';

const Gym = ({ dateOption = true }) => {
  const dispatch = useDispatch();
  //Local States
  const [wantPt, setWantPt] = useState(2);
  //1 true 2false
  const [page, setPage] = useState(1);
  const [ptListState, setPtListState] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  //Redux States
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);
  const wallet = useSelector((state) => state.userProfile.wallet);
  const staticPages = useSelector((state) => state.staticPages);
  const reservation = useSelector((state) => state.reservation);
  const ptList = useSelector(
    (state) => state.reservationCalendar?.data?.location?.with_pt
  );

  //const gymList = useSelector((state) => state.userProfile.ptGymList);

  const allBranchList = useSelector(
    (state) => state.profileSettings.ptBranchList.allList
  );
  const pageChangeHandler = (event, value) => setPage(value);

  useEffect(() => {
    dispatch(getWallet());
    dispatch(setReservation({ bs_id: userInfo.id }));
    dispatch(getStaticPage('uye-mesafeli-hizmet-sozlesmesi'));
    dispatch(getStaticPage('uye-on-bilgilendirme-formu'));
  }, [userInfo]);
  useEffect(() => {
    setPage(1);
    dispatch(getGymDataForRes(userInfo.id)) // FOR START DATA --buradan branş gelecek ama daha yok
    
 
  }, []);
  useEffect(() => {
    if (!reservation?.data?.pt_id) {
      setPtListState(ptList);
    }
  }, [ptList]);
  useEffect(() => {
    if (wantPt==1) {
      setReservation({ pt_id: undefined });
    }
  }, [reservation?.data?.branch_id]);

  useEffect(() => {
    if (reservation?.data?.branch_id && reservation?.data?.date) {
      dispatch(
        getGymReservationCalendar(
          userInfo.id,
          reservation.data?.slot?.[0]?.date || reservation.data?.date,
          reservation.data?.slot?.[0]?.hour,
          reservation?.data?.branch_id,
          wantPt == 1 ? reservation?.data?.pt_id : null
        )
      );
    }
  }, [reservation?.data?.branch_id, reservation?.data?.date, wantPt]);
  useEffect(() => {
    if (reservation?.data?.pt_id) {
      dispatch(
        getGymReservationCalendar(
          userInfo.id,
          reservation.data?.date,
          reservation.data?.slot?.[0]?.hour,
          reservation?.data?.branch_id,
          wantPt == 1 ? reservation?.data?.pt_id : null
        )
      );
    }
  }, [reservation?.data?.pt_id]);

  function _renderLeftArea() {
    switch (reservation?.data?.payment_type) {
      case 'wallet':
      case 'both':
        var wallet_balance = wallet?.data?.balance || 0;
        var amount = reservation?.data?.totals_amount || 0;
        var diff = wallet_balance - amount;
        return (
          <>
            <InfoContainer>
              <DataContainer>
                <Info>
                  <Text style={{ fontWeight: 800 }}>Cüzdanım</Text>
                  <Text style={{ fontWeight: 800 }}>{wallet_balance}</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>İşlem Tutarı</Text>
                  <Text style={{ fontWeight: 800 }}>{amount}</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>Kalan Tutar</Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      color: diff < 0 ? 'red' : 'black',
                    }}
                  >
                    {diff}
                  </Text>
                </Info>
              </DataContainer>
              <div style={{ padding: '10px' }}>
                <text>
                  Yapacağınız işlem sonrası cüdanınızda kalacak olan toplam
                  tutar {diff} TL’dir
                </text>
              </div>
            </InfoContainer>
            {diff < 0 && (
              <CreditCard
                defaultCardName={reservation?.data?.holder_name}
                defaultCardNo={reservation?.data?.card_number}
                defaultSKT={
                  reservation?.data?.expiration_month +
                  '/' +
                  reservation?.data?.expiration_year
                }
                defaultCVV={reservation?.data?.cvc}
                onCardName={(val) => {
                  dispatch(setReservation({ holder_name: val }));
                }}
                onCardNo={(val) => {
                  dispatch(setReservation({ card_number: val }));
                }}
                onSKT={(month, year) => {
                  dispatch(
                    setReservation({
                      expiration_month: month,
                      expiration_year: year,
                    })
                  );
                }}
                onCVV={(val) => {
                  dispatch(setReservation({ cvc: val }));
                }}
              />
            )}
          </>
        );
      case 'credit_card':
        return (
          <CreditCard
            defaultCardName={reservation?.data?.holder_name}
            defaultCardNo={reservation?.data?.card_number}
            defaultSKT={
              reservation?.data?.expiration_month +
              '/' +
              reservation?.data?.expiration_year
            }
            defaultCVV={reservation?.data?.cvc}
            onCardName={(val) => {
              dispatch(setReservation({ holder_name: val }));
            }}
            onCardNo={(val) => {
              dispatch(setReservation({ card_number: val }));
            }}
            onSKT={(month, year) => {
              dispatch(
                setReservation({
                  expiration_month: month,
                  expiration_year: year,
                })
              );
            }}
            onCVV={(val) => {
              dispatch(setReservation({ cvc: val }));
            }}
          />
        );

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
                <InputContainer>
                  <Text color="#9B9B9B">{'Tarih ve Saat Seçiminiz'}</Text>
                  <Material.TextField
                    type="text"
                    defaultValue={
                      reservation?.data?.date +
                      ' ' +
                      reservation?.data?.slot?.[0]
                    }
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </InputContainer>
              )}
              <InputContainer disable={reservation?.data?.isSelected}>
                <Text color="#9B9B9B">{'Branş Seçiniz:'}</Text>
                <Material.SimpleSelect
                  items={allBranchList}
                  name="branch"
                  defaultValue={reservation?.data?.branch_id}
                  onChange={(e) =>
                    dispatch(setReservation({ branch_id: e.target.value }))
                  }
                />
              </InputContainer>
              <InputContainer>
                <Text color="#9B9B9B">{'Eğitmen İstiyor musunuz ?'}</Text>
                <Material.SimpleSelect
                  items={[
                    { id: 1, name: 'Evet' },
                    { id: 2, name: 'Hayır' },
                  ]}
                  name="branch"
                  defaultValue={wantPt}
                  onChange={(e) => {
                    if (e.target?.value === 2) {
                      setWantPt(2);
                    } else {
                      setWantPt(1);
                      dispatch(
                        setReservation({ pt_id: undefined, pt_price: 0 })
                      );
                    }
                  }}
                />
              </InputContainer>
              {wantPt == 1 && _renderTrainerSelections()}
            </SelectionContainer>
          </>
        );
    }
  }
  function _renderTrainerSelections() {
    return (
      <>
        <Text color="#9B9B9B">{'Egitmen Seçiniz:'}</Text>
        <RadioGroup row aria-label="workArea" name="workArea" defaultValue="0l">
          {ptListState?.map((item) => (
            <>
              <CardGroup style={{ padding: 0 }}>
                <TrainerCard
                  name={item?.name}
                  image={item?.photo}
                  stars={item?.rating}
                  category={item?.title}
                  price={item?.price}
                  classification={item?.classification}
                />

                {reservation?.data?.pt_id &&
                reservation?.data?.pt_id === item.id ? (
                  <RadioButtonCheckedIcon
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                  />
                ) : (
                  <RadioButtonUncheckedIcon
                    onClick={() => {
                      dispatch(
                        setReservation({
                          pt_id: item.id,
                          pt_price: item.price,
                        })
                      );
                    }}
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                  />
                )}
              </CardGroup>
            </>
          )) || <text>Seçimlerinize uygun eğitmen bulunmamaktadır!</text>}
        </RadioGroup>
        <Pagination
          mt="50px"
          count={ptListState?.totalPage}
          page={page}
          onChange={pageChangeHandler}
        />
      </>
    );
  }
  return (
    <Container>
      <LeftWrapper>{_renderLeftArea()}</LeftWrapper>
      <RightWrapper>
        <PaymentCard disabledPayment={(!(wantPt==2) && !reservation?.data?.pt_id)} type="gym" dateOption={!reservation?.data?.isSelected} />
      </RightWrapper>
      <StyledModal show={openModal} onHide={() => setOpenModal(false)}>
        <MultiContract
          acceptKvkk={true}
          setAccept={() => {
            dispatch(setReservation({ is_contracts_accepted: true }));
          }}
          setOpenModal={setOpenModal}
          confirmationData={staticPages.data}
          userTypeId={1}
        />
      </StyledModal>
    </Container>
  );
};
const StyledModal = styled(Modal)`
  .modal-content {
    width: 600px;
    background-color: var(--white1);
    padding: 15px 30px;
    @media ${device.sm} {
      height: 70vh;
      width: 90vw;
      overflow: scroll;
    }
  }
`;
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
  border-width: 1px;
  border-color: rgba(144, 144, 144, 0.1);
  padding: 30px;
  @media ${device.sm} {
    padding: 0;
  }
`;
const Text = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
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

const InputContainer = styled.div`
  margin-bottom: 20px;
  pointer-events: ${(p) => (p.disable ? 'none' : 'initial')};
  opacity: ${(p) => (p.disable ? '0.7' : '1')};
`;
export default Gym;
