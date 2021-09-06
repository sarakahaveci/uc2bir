import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';
import { DatePicker, Modal } from 'components';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const ChooseDateModal = ({
  open,
  cancel,
  setDateFilterText,
  setStartDateToApi,
  setEndDateToApi,
}) => {
  const { t } = useTranslation();

  useEffect(() => {}, []);
  const [type, setType] = useState('oneday');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOnOneDaySearch, setIsOnOneDaySearch] = useState(true);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleChangeSearchType = (type) => {
    setType(type);
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(new Date());
    setStartDateToApi(null);
    setEndDateToApi(null);
    if (type == 'oneday') {
      setIsOnOneDaySearch(true);
    }
    if (type == 'rangedays') {
      setIsOnOneDaySearch(false);
    }
  };

  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  const handleSubmit = () => {
    if (type == 'oneday') {
      setDateFilterText(formatDate(selectedDate));
      setStartDateToApi(moment(selectedDate).format('DD.MM.YYYY'));
      setEndDateToApi(moment(selectedDate).format('DD.MM.YYYY'));
    }
    if (type == 'rangedays') {
      setDateFilterText(formatDate(startDate) + '-' + formatDate(endDate));
      setStartDateToApi(moment(startDate).format('DD.MM.YYYY'));
      setEndDateToApi(moment(endDate).format('DD.MM.YYYY'));
    }
    cancel();
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(new Date());
  };

  useEffect(() => {
    if (open) openChooseDateModal();
    if (!open) chooseDateModalRef.current.closeModal();
  }, [open]);
  const chooseDateModalRef = useRef();

  const openChooseDateModal = () => chooseDateModalRef.current.openModal();

  return (
    <ChooseDateModalContainer ref={chooseDateModalRef}>
      <MainContainer>
        <>
          <ChooseSearchType>
            <SearchType
              onClick={() => {
                handleChangeSearchType('oneday');
              }}
              isChoosen={isOnOneDaySearch}
            >
              <div className="checkbox"></div>
              <div className="text">{t('single day search')}</div>
            </SearchType>
            <SearchType
              onClick={() => {
                handleChangeSearchType('rangedays');
              }}
              isChoosen={!isOnOneDaySearch}
            >
              <div className="checkbox"></div>
              <div className="text">{t('range search')}</div>
            </SearchType>
          </ChooseSearchType>

          <DateContainer>
            {isOnOneDaySearch ? (
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                }}
                inline
                startDate={!isOnOneDaySearch ? startDate : null}
                endDate={!isOnOneDaySearch ? endDate : null}
                highlightDates={'react-datepicker__day--in-range'}
                minDate={new Date()}
              />
            ) : (
              <DatePicker
                onChange={onChange}
                selectsRange
                inline
                startDate={startDate}
                endDate={endDate}
                highlightDates={'react-datepicker__day--in-range'}
                minDate={new Date()}
              />
            )}
          </DateContainer>
        </>
        <ModalFooter>
          <FooterButton
            onClick={() => {
              handleSubmit();
            }}
          >
            {t('ok')}
          </FooterButton>
        </ModalFooter>
      </MainContainer>
    </ChooseDateModalContainer>
  );
};

const ChooseDateModalContainer = styled(Modal)`
  .modal-content {
    width: 500px;
  }
`;

const ChooseSearchType = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin: 5px;
`;
const SearchType = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 45%;
  border: ${(p) =>
    p.isChoosen ? '2px solid var(--blue)' : '0.5px solid var(--blue)'};
  padding: 20px;
  border-radius: 18px;
  .checkbox {
    padding-right: 5px;
    display: flex;
    border-radius: 100%;
    padding: 5px;
    background-color: ${(p) => (p.isChoosen ? 'var(--blue)' : 'white')};
    width: 25px;
    height: 25px;
  }
  .text {
    font-size: 14px;
  }
`;

const DateContainer = styled.div`
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: transparent;
  .close-icon {
    align-self: flex-end;

    svg {
      cursor: pointer;
    }
  }
  @media ${device.sm} {
    width: 95vw;
    height: 95vh;
    overflow: scroll;
  }
`;
const ModalFooter = styled.div`
  display: flex;
  width: 100%;
`;
const FooterButton = styled.button`
  border-radius: 5px;
  font-size: 1.2rem;
  color: white;
  text-align: center;
  display: block;
  width: 100%;
  background: var(--blue);
  padding: 10px;
  text-transform: uppercase;
`;
export default ChooseDateModal;
