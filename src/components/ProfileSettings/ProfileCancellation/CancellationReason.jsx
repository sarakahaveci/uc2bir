import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Link } from 'react-router-dom';

import {
  CancellationFinalize,
  Text,
  Button,
  Box,
  Modal,
  Svg,
  Span,
  Spinner,
  Material,
} from 'components';
import { getCancellationReasons, cancelProfile } from 'actions';

const CancellationReason = () => {
  const {
    reasons: { data: reasons, isLoading: reasonsLoading },
    cancelProfile: { isLoading: cancelLoading },
  } = useSelector((state) => state.profileSettings2.cancellation);

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
      <BackLink to="/myprofile/settings/profile">
        <Svg.ArrowLeftIcon />

        <Span ml="10px" color="softDark" fontWeight="600" fontSize="1.2rem">
          Üyelik İptali
        </Span>
      </BackLink>

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
        fontWeight="0.9rem"
      >
        Hesabı silerseniz, profil bilgileriniz beraberinde silinecektir.
      </Text>

      <Text color="softDark" fontSize="1.1rem" fontWeight="500" mb="10px">
        Lütfen üyelik iptal nedeninizi bizimle paylaşın.
      </Text>

      <MaterialWrapper>
        <RadioGroup value={reason} onChange={reasonChangeHandler}>
          {reasons.map((item, index) => (
            <FormControlLabel
              key={index + 'reasons'}
              value={item.reason}
              label={item.reason}
              control={<Material.RadioButton />}
            />
          ))}
          <Box col bg="gray6">
            <FormControlLabel
              value="Other"
              control={<Material.RadioButton />}
              label="Diğer"
            />

            <TextArea
              readOnly={reason !== 'Other'}
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

const BackLink = styled(Link)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  padding: 15px;
  border-radius: 15px;
  margin: 0 20px 20px;
  flex: 1;
  width: auto;
  min-width: unset;
  font-size: 0.9rem;

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
