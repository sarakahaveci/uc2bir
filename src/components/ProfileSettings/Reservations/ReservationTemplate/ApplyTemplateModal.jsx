import React, { useEffect, forwardRef } from 'react';
import styled from 'styled-components/macro';
// import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch } from 'react-redux';
import { addDays } from 'date-fns';
// import { tr } from 'react-date-range/dist/locale';

import { Calendar, Text, Title, Button, Modal } from 'components';
import { getTemplates } from 'actions';
import { toast } from 'react-toastify';

const ApplyTemplateModal = forwardRef(
  ({ openSuccessReservationModal }, ref) => {
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getTemplates());
    }, []);

    const onChangeHandler = (item) => {
      if (item.selection.startDate.getDay() !== 1) {
        toast.error('Şablon seçme pazartesinden başlamalıdır.', {
          position: 'bottom-right',
        });

        setDate(initialDate);

        return;
      } else {
        setDate([
          {
            startDate: item.selection.startDate,
            endDate: addDays(item.selection.startDate, 6),
            key: 'selection',
          },
        ]);

        return;
      }
    };

    return (
      <StyledModal ref={ref}>
        <Title component="h5" mb="20px">
          Şablonu Takvimime Uygula
        </Title>

        <Calendar
          onChange={onChangeHandler}
          ranges={date}
          // preview={{
          //   startDate: defineds.startOfLastWeek,
          //   endDate: defineds.startOfLastWeek,
          // }}
        />

        <FormControl>
          <InputLabel>Tarih Seçiniz</InputLabel>

          <Select input={<Input />} style={{ width: '100%' }}></Select>
        </FormControl>

        <FormControl>
          <InputLabel>Şablon Seçiniz</InputLabel>

          <Select id="asd" input={<Input />} style={{ width: '100%' }}></Select>
        </FormControl>

        <Button
          className="blue"
          text="Tamamla"
          mt="30px"
          onClick={openSuccessReservationModal}
        />

        <Text color="blue" textAlign="center" mt="10px" cursor="pointer">
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
    max-width: 100%;
  }
`;
