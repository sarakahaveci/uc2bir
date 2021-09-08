import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components/macro';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { addDays, startOfWeek, format } from 'date-fns';
import tr from 'date-fns/locale/tr';
import { useTranslation } from 'react-i18next';

import { Text, Title, Button, Modal, DatePicker, Span } from 'components';
import {
  getTemplates,
  applyTemplateToCalendar,
  getTemplateDetails,
} from 'actions';
import { toast } from 'react-toastify';

const ApplyTemplateModal = forwardRef(
  ({ openSuccessReservationModal }, ref) => {
    const {
      myTemplates: { data: myTemplates },
      templateDetails: { data: templateDetails },
    } = useSelector((state) => state.profileSettings2.reservationTemplate);

    const [selectedTemplateId, setSelectedTemplateId] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const currentDate = new Date();

    const templateDays = templateDetails?.slot?.map((slot) => slot.day) || [];

    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
      dispatch(getTemplates());
    }, []);

    const handleSelect = (date) => {
      if (date.getDay() === 1) {
        handleDateChange(date);
      } else {
        toast.error(t('Your template selection should start from Monday'), {
          position: 'bottom-right',
        });
      }
    };

    const startOfWeeksArr = [...Array(20)].map((_, index) =>
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

    const templateChangeHandler = (e) => {
      const templateId = e.target.value;

      setSelectedTemplateId(templateId);

      dispatch(getTemplateDetails(templateId));
    };

    const sameStartAndEndDate =
      new Date().getDay() === startDate.getDay() &&
      new Date().getDay() === endDate.getDay();

    return (
      <StyledModal ref={ref}>
        <Title component="h5" style={{ marginBottom: '30px' }}>
          {t('Apply Template to My Calendar')}
        </Title>

        <DatePicker
          selected={startDate}
          startDate={startDate}
          dayClassName={(date) =>
            templateDays.includes(date.getDay()) ? undefined : 'disabled-date'
          }
          endDate={endDate}
          onSelect={handleSelect}
          selectsRange
          inline
          highlightDates={[
            {
              'react-datepicker__day--highlighted': startOfWeeksArr,
            },
          ]}
          minDate={
            new Date(
              currentDate.setDate(currentDate.getDate() - currentDate.getDay())
            )
          }
        />

        <FormControl>
          <InputLabel> {t('Choose Template')}</InputLabel>

          <Select
            onChange={templateChangeHandler}
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

        <Text color="dark" mt="10px">
          {t('Your Date Selection')}
        </Text>

        <div>
          {sameStartAndEndDate ? (
            <Text color="red">
              {t('Your template selection should start from Monday')}
            </Text>
          ) : (
            <>
              {formatDay(startDate)}

              <Span mx="4px">-</Span>

              {formatDay(endDate)}
            </>
          )}
        </div>

        <Button
          className="blue"
          text={t('complete')}
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
          {t('Give Up')}
        </Text>
      </StyledModal>
    );
  }
);

export default React.memo(ApplyTemplateModal);

const StyledModal = styled(Modal)`
  .modal-content {
    width: 500px;
  }
`;
