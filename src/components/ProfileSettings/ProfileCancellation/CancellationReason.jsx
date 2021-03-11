import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { useSelector, useDispatch } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';

import {
  CancellationFinalize,
  Text,
  Button,
  Box,
  Modal,
  Svg,
  Span,
  Spinner,
} from 'components';
import { getCancellationReasons, cancelProfile } from 'actions';

const CancellationReason = ({ setIsProfileCancellationPage }) => {
  const {
    reasons: { data: reasons, isLoading: reasonsLoading },
    cancelProfile: { isLoading: cancelLoading },
  } = useSelector((state) => state.profileSettings2.cancellation);

  console.log('cancelLoading: ', cancelLoading);

  const { name } = useSelector((state) => state.auth.user);

  const [reason, setReason] = useState('');
  const [otherReasonValue, setOtherReasonValue] = useState('');

  const cancellationFinalizeRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCancellationReasons());
  }, []);

  const cancelSuccessHandler = () =>
    cancellationFinalizeRef.current.openModal();

  const cancellationHandler = () => {
    let finalReason = reason === 'Other' ? otherReasonValue : reason;

    dispatch(cancelProfile(finalReason, cancelSuccessHandler));
  };

  const reasonChangeHandler = (e) => setReason(e.target.value);

  const inputChangeHandler = (e) => setOtherReasonValue(e.target.value);

  if (reasonsLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Box
        row
        cursor="pointer"
        onClick={() => setIsProfileCancellationPage(false)}
      >
        <Svg.ArrowLeftIcon />

        <Span
          ml="10px"
          color="softDark"
          fontWeight="600"
          fontSize="1.2rem"
          mb="30px"
        >
          Üyelik İptali
        </Span>
      </Box>

      <Text fontSize="1.5rem" color="softDark" fontWeight="500">
        Merhaba <Span textTransform="capitalize">{name}</Span>,
      </Text>

      <Text fontSize="1.5rem" color="softDark" fontWeight="500" mb="20px">
        Gittiğini Görmek Çok Üzücü!
      </Text>

      <Text color="softDark" fontWeight="500" fontSize="1.1rem">
        Hesabını silmek istediğine emin misin?
      </Text>

      <Text
        color="softDark"
        mb="10px"
        pb="20px"
        borderBottom="0.5px solid"
        borderColor="gray7"
      >
        Hesabı silerseniz, profil bilgileriniz beraberinde silinecektir.
      </Text>

      <Text color="softDark" fontSize="1.1rem" fontWeight="500" mb="10px">
        Lütfen üyelik iptal nedeninizi bizimle paylaşın.
      </Text>

      <MaterialWrapper>
        <RadioGroup value={reason} onChange={reasonChangeHandler}>
          {reasons.map((item) => (
            <FormControlLabel
              value={item.reason}
              label={item.reason}
              control={<Radio />}
            />
          ))}
          <Box col bg="gray6">
            <FormControlLabel value="Other" control={<Radio />} label="Diğer" />

            <TextArea
              rows={6}
              placeholder="Lütfen üyeliğinizi neden iptal etmek istediğinizi kısaca belirtin"
              onChange={inputChangeHandler}
            />
          </Box>
        </RadioGroup>
      </MaterialWrapper>

      <Box row justifyContent="flex-end" mt="15px">
        <Button
          className="blue"
          width="300px"
          text="Üyeliğimi İptal Et"
          disabled={!reason || (reason === 'Other' && !otherReasonValue)}
          onClick={cancellationHandler}
          isLoading={cancelLoading}
        />
      </Box>

      <FinalizeModal
        ref={cancellationFinalizeRef}
        closeIcon={false}
        backdrop="static"
      >
        <CancellationFinalize />
      </FinalizeModal>
    </div>
  );
};

export default CancellationReason;

const TextArea = styled.textarea`
  padding: 15px;
  border-radius: 15px;
  margin: 0 20px 20px;
  flex: 1;
  width: auto;
  min-width: unset;

  &::placeholder {
    font-size: 0.9rem;
  }
`;

const FinalizeModal = styled(Modal)`
  .modal-content {
    width: 550px;
    padding: 0;
  }
`;

const MaterialWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin: 0;

    &:nth-child(odd) {
      background: ${(p) => p.theme.colors.gray6} !important;
    }
  }
`;
