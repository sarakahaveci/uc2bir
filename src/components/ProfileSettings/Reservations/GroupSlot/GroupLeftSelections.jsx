import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from 'react-redux';

import SelectPictureModal from './SelectPictureModal';
import { Svg, Text, Box, CalendarCell, PlusButton } from 'components';
import { PAIR_HOURS, PERSONAL_TRAINER } from 'constants/index';
import {
  getMyBranches,
  getGymList,
  getSessionTypes,
  getWorkPlaceCapacity,
  setGroupSelectionData,
} from 'actions';

export default function GroupLeftSelections() {
  const { type_id: userTypeId } = useSelector((state) => state.auth.user);

  const { data: myBranches } = useSelector(
    (state) => state.profileSettings2.profileBranches.myBranches
  );

  const {
    workPlaceCapacity: { data: workPlaceCapacity },
    branchSelection,
    sessionSelection,
    locationSelection,
    classSelection,
    selectedHour,
  } = useSelector((state) => state.profileSettings2.reservationGroupSlot);

  const {
    get: sessionTypes,
    gymList: { data: gymList },
  } = useSelector((state) => state.profileSettings2.sessionType);

  const {
    ptHomePlace: { data: ptHomePlace },
  } = useSelector((state) => state.userProfile.workPlace);

  const [selectedImageId, setSelectedImageId] = useState([]);

  const selectPicModalRef = useRef();

  const dispatch = useDispatch();

  const openSelectPicModal = () => selectPicModalRef.current.openModal();

  useEffect(() => {
    if (userTypeId === PERSONAL_TRAINER) {
      dispatch(getSessionTypes());

      dispatch(getMyBranches());

      dispatch(getGymList());
    }
  }, []);

  useEffect(() => {
    if (branchSelection && locationSelection) {
      dispatch(getWorkPlaceCapacity(branchSelection.id, locationSelection.id));
    }
  }, [branchSelection, locationSelection]);

  const selectDataHandler = (name, value) =>
    dispatch(setGroupSelectionData(name, value));

  return (
    <div>
      <Box row justifyContent="center" position="relative">
        <UploadPic onClick={openSelectPicModal}>
          <Svg.MockImageIcon />

          <Text textAlign="center" color="gray8" fontWeight="300" mt="15px">
            FOTOĞRAF SEÇİNİZ
          </Text>
        </UploadPic>

        <Plus type="dark" />
      </Box>

      <Text color="gray10" fontWeight="600" fontSize="1.1rem" mt="20px">
        Saat Seçiniz
      </Text>

      <Box row flexWrap="wrap">
        {PAIR_HOURS.map((item) => (
          <CalendarCell
            key={item}
            onClick={() => selectDataHandler('selectedHour', item)}
            type="time"
            size="large"
            isActive={selectedHour === item}
          >
            {item}
          </CalendarCell>
        ))}
      </Box>

      <FormControl className="w-100 mt-2">
        <InputLabel>Branş Seçiniz</InputLabel>

        <Select
          value={branchSelection}
          input={<Input />}
          onChange={(e) => selectDataHandler('branchSelection', e.target.value)}
        >
          {myBranches.map((branch) => (
            <MenuItem key={branch.id} value={branch}>
              {branch.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Text color="gray10" fontWeight="600" fontSize="1.1rem" mt="20px">
        Ders İçeriği Giriniz
      </Text>

      <TextArea
        rows={6}
        onBlur={(e) => selectDataHandler('courseDetails', e.target.value)}
      />

      <FormControl className="w-100 mt-2">
        <InputLabel>Oturum Türlerini Seçiniz</InputLabel>

        <Select
          value={sessionSelection}
          input={<Input />}
          onChange={(e) =>
            selectDataHandler('sessionSelection', e.target.value)
          }
        >
          {sessionTypes?.data?.data?.map((sessionType) => (
            <MenuItem key={sessionType.id} value={sessionType}>
              {sessionType.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {sessionSelection.type === 'gym' && (
        <FormControl className="w-100 mt-2">
          <InputLabel>Spor Alanı Seçiniz</InputLabel>

          <Select
            value={locationSelection}
            input={<Input />}
            onChange={(e) =>
              selectDataHandler('locationSelection', e.target.value)
            }
          >
            {gymList?.gym?.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {sessionSelection.type === 'home_park' && (
        <FormControl className="w-100 mt-2">
          <InputLabel>Ev / Park Seçiniz</InputLabel>

          <Select
            value={locationSelection}
            input={<Input />}
            onChange={(e) =>
              selectDataHandler('locationSelection', e.target.value)
            }
          >
            {ptHomePlace?.home_park?.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl className="w-100 mt-2">
        <InputLabel>Sınıf Seçiniz</InputLabel>

        <Select
          value={classSelection}
          input={<Input />}
          onChange={(e) => selectDataHandler('classSelection', e.target.value)}
        >
          {workPlaceCapacity?.map((item) => (
            <MenuItem key={item.id} value={item}>
              {item.name} {item.capacity} Kişilik
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <SelectPictureModal
        ref={selectPicModalRef}
        selectedImageId={selectedImageId}
        setSelectedImageId={setSelectedImageId}
      />
    </div>
  );
}

const Plus = styled(PlusButton)`
  position: absolute;
  bottom: -27px;
  left: 50%;
  transform: translate(-50%);
`;

const TextArea = styled.textarea`
  padding: 15px;
  border-radius: 15px;
  width: 100%
  font-size: 0.9rem;
  margin-top: 10px;

  &::placeholder {
    font-size: 0.9rem;
  }
`;

const UploadPic = styled.div`
  width: 250px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #363636;
  padding: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
