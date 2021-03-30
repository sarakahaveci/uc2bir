import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components/macro';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { addDays, startOfWeek, format } from 'date-fns';
import { tr } from 'react-date-range/dist/locale';

import { Text, Title, Button, Modal, DatePicker, Span } from 'components';
import { getTemplates, applyTemplateToCalendar } from 'actions';
import { toast } from 'react-toastify';

const ApplyTemplateModal = forwardRef(
  ({ openSuccessReservationModal }, ref) => {
    const { data: myTemplates } = useSelector(
      (state) => state.profileSettings2.reservationTemplate.myTemplates
    );

    const [selectedTemplateId, setSelectedTemplateId] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getTemplates());
    }, []);

    const handleSelect = (date) => {
      if (date.getDay() === 1) {
        handleDateChange(date);
      } else {
        toast.error('Şablon seçiminiz pazartesiden başlamalıdır.', {
          position: 'bottom-right',
        });
      }
    };

    const startOfWeeksArr = [...Array(10)].map((_, index) =>
      startOfWeek(addDays(new Date(), index * 7), {
        weekStartsOn: tr.options.weekStartsOn,
      })
    );

    const applyTemplateSuccessCallback = () => {
      openSuccessReservationModal();

      ref.current.closeModal();
    };

    const completeApplyTemplateHandler = () =>
      dispatch(
        applyTemplateToCalendar(
          startDate,
          selectedTemplateId,
          applyTemplateSuccessCallback
        )
      );

    const formatDay = (date) => format(date, 'd LLLL', { locale: tr });

    const handleDateChange = (date) => {
      setStartDate(date);

      setEndDate(addDays(date, 6));
    };

    const sameStartAndEndDate =
      new Date().getDay() === startDate.getDay() &&
      new Date().getDay() === endDate.getDay();

    return (
      <StyledModal ref={ref}>
        <Title component="h5" style={{ marginBottom: '30px' }}>
          Şablonu Takvimime Uygula
        </Title>

        <DatePicker
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onSelect={handleSelect}
          selectsRange
          inline
          highlightDates={[
            {
              'react-datepicker__day--highlighted': startOfWeeksArr,
            },
          ]}
          minDate={new Date()}
          hideToday
        />
        <Text color="dark">Tarih Seçiminiz</Text>

        <div>
          {sameStartAndEndDate ? (
            <Text color="red">Şablon seçiminiz pazartesiden başlamalıdır.</Text>
          ) : (
            <>
              {formatDay(startDate)}

              <Span mx="4px">-</Span>

              {formatDay(endDate)}
            </>
          )}
        </div>

        <FormControl>
          <InputLabel>Şablon Seçiniz</InputLabel>

          <Select
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            input={<Input />}
            style={{ width: '100%' }}
          >
            {myTemplates.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          className="blue"
          text="Tamamla"
          mt="30px"
          onClick={completeApplyTemplateHandler}
          disabled={!selectedTemplateId || sameStartAndEndDate}
        />

        <Text
          color="blue"
          textAlign="center"
          my="10px"
          cursor="pointer"
          onClick={() => ref.current.closeModal()}
        >
          Vazgeç
        </Text>
      </StyledModal>
    );
  }
);

export default ApplyTemplateModal;

const StyledModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }
`;
