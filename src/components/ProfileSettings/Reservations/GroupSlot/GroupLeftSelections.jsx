import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from 'react-redux';

import SelectPictureModal from './SelectPictureModal';
import { Svg, Text, Box, CalendarCell, PlusButton, Material } from 'components';
import { PAIR_HOURS, PERSONAL_TRAINER, DIETITIAN } from 'constants/index';
import {
  getGymList,
  getSessionTypes,
  getWorkPlaceCapacity,
  setGroupSelectionData,
  getGroupImages,
  getUserPTBranchList, getDietitianClinics,
} from 'actions';

export default function GroupLeftSelections() {
  const { type_id: userTypeId } = useSelector((state) => state.auth.user);

  const {
    workPlaceCapacity: { data: workPlaceCapacity },
    groupImages: { data: groupImages },
    branchSelection,
    sessionSelection,
    locationSelection,
    classSelection,
    selectedHour,
    dtSessionSelection,
    selectedDate,
  } = useSelector((state) => state.profileSettings2.reservationGroupSlot);

  const { clinics } = useSelector((state) => state.userProfile.dietitianClinic);
  const {
    get: sessionTypes,
    gymList: { data: gymList },
  } = useSelector((state) => state.profileSettings2.sessionType);

  const { data } = useSelector(
    (state) => state?.profileSettings?.ptBranchList
  );

  const {
    ptHomePlace: { data: ptHomePlace },
  } = useSelector((state) => state.userProfile.workPlace);

  const [selectedImageId, setSelectedImageId] = useState();

  const selectPicModalRef = useRef();

  const dispatch = useDispatch();

  const openSelectPicModal = () => selectPicModalRef.current.openModal();

  useEffect(() => {
    if (userTypeId === PERSONAL_TRAINER) {
      dispatch(getSessionTypes());

      // dispatch(getMyBranches());

      dispatch(getUserPTBranchList());

      dispatch(getGroupImages());

      dispatch(getGymList());
    }
    if (userTypeId === DIETITIAN) {
      dispatch(getSessionTypes());
      dispatch(getDietitianClinics());
      dispatch(getGroupImages());
    }
  }, []);

  useEffect(() => {
    selectDataHandler('group_slot_image_id', selectedImageId?.id);
  }, [selectedImageId]);

  useEffect(() => {
    if (branchSelection && locationSelection && userTypeId === PERSONAL_TRAINER) {
      dispatch(
        getWorkPlaceCapacity(
          branchSelection.id,
          locationSelection.id,
          selectedHour,
          selectedDate
        )
      );
    }
  }, [branchSelection, locationSelection]);

  const selectDataHandler = (name, value) =>
    dispatch(setGroupSelectionData(name, value));



  return (
    <div>
      <Box row justifyContent="center" position="relative">
        <UploadPic
          onClick={openSelectPicModal}
          img={selectedImageId && selectedImageId?.image_url}
        >
          {/*{selectedImageId?*/}
          {/*  <img src={selectedImageId.image_url} style={{ width:'140px'}} />:*/}
          {/*  <Svg.MockImageIcon /> }*/}

          {!selectedImageId && <Svg.MockImageIcon />}
          {!selectedImageId && (
            <Text textAlign="center" color="gray8" fontWeight="300" mt="15px">
              FOTOĞRAF SEÇİNİZ
            </Text>
          )}
        </UploadPic>

        <Plus type="dark" onClick={openSelectPicModal} />
      </Box>

      {userTypeId !== DIETITIAN && (
        <>
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
        </>
      )}

      {userTypeId !== DIETITIAN && (
        <>
          <FormControl className="w-100 mt-2">
            <InputLabel>Branş Seçiniz</InputLabel>

            <Select
              value={branchSelection}
              input={<Input />}
              onChange={(e) =>
                selectDataHandler('branchSelection', e.target.value)
              }
            >
              {data?.branches?.map((branch) => (
                branch?.status_id === 2 &&
                <MenuItem key={branch.id} value={branch}>
                  {branch.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {userTypeId === DIETITIAN && (
        <>
          <FormControl className="w-100 mt-2">
            <Material.TextField
              label="Başlık giriniz"
              name="title"
              required
              //value={data.blog.title}
              onChange={(e) => selectDataHandler('title', e.target.value)}
            />
          </FormControl>
        </>
      )}
      <Text color="gray10" fontWeight="600" fontSize="1.1rem" mt="20px">
        {userTypeId === DIETITIAN
          ? 'Paket İçeriği Giriniz'
          : 'Ders İçeriği Giriniz'}
      </Text>

      <TextArea
        rows={6}
        onBlur={(e) => selectDataHandler('courseDetails', e.target.value)}
      />

      {userTypeId !== DIETITIAN && (
        <FormControl className="w-100 mt-2">
          <InputLabel>Oturum Türlerini Seçiniz</InputLabel>

          <Select
            value={sessionSelection}
            input={<Input />}
            onChange={(e) =>
              selectDataHandler('sessionSelection', e.target.value)
            }
          >
            {sessionTypes?.data?.data?.map(
              (sessionType) =>
                sessionType.type !== 'online' && (
                  <MenuItem key={sessionType.id} value={sessionType}>
                    {sessionType.title}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      )}
      {userTypeId === DIETITIAN && (
        <FormControl className="w-100 mt-2">
          <InputLabel>Oturum Türlerini Seçiniz</InputLabel>

          <Select
            multiple
            value={dtSessionSelection}
            input={<Input />}
            onChange={(e) =>
              selectDataHandler('dtSessionSelection', e.target.value)
            }
          >
            {sessionTypes?.data?.data?.map(
              (sessionType) =>
                sessionType.type !== 'online' && (
                  <MenuItem key={sessionType.id} value={sessionType}>
                    {sessionType.title}
                  </MenuItem>
                )
            )}
          </Select>
        </FormControl>
      )}
      {userTypeId === DIETITIAN && (
        <FormControl className="w-100 mt-2">
          <InputLabel>Klinik Seçiniz</InputLabel>

          <Select
            value={locationSelection}
            input={<Input />}
            onChange={(e) => selectDataHandler('locationSelection', e.target.value)}>
            {clinics?.clinic?.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
      }
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

      {sessionSelection.type === 'gym' && (
        <FormControl className="w-100 mt-2">
          <InputLabel>Sınıf Seçiniz</InputLabel>

          <Select
            value={classSelection}
            input={<Input />}
            onChange={(e) =>
              selectDataHandler('classSelection', e.target.value)
            }
          >
            {workPlaceCapacity?.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.name} {item.capacity} Kişilik
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/*{userTypeId !== DIETITIAN && (*/}
      {/*  <>*/}
      {/*    <FormControl className="w-100 mt-2">*/}
      {/*      <InputLabel>Sınıf Seçiniz</InputLabel>*/}

      {/*      <Select*/}
      {/*        value={classSelection}*/}
      {/*        input={<Input />}*/}
      {/*        onChange={(e) =>*/}
      {/*          selectDataHandler('classSelection', e.target.value)*/}
      {/*        }*/}
      {/*      >*/}
      {/*        {workPlaceCapacity?.map((item) => (*/}
      {/*          <MenuItem key={item.id} value={item}>*/}
      {/*            {item.name} {item.capacity} Kişilik*/}
      {/*          </MenuItem>*/}
      {/*        ))}*/}
      {/*      </Select>*/}
      {/*    </FormControl>*/}
      {/*  </>*/}
      {/*)}*/}

      <SelectPictureModal
        ref={selectPicModalRef}
        selectedImageId={selectedImageId}
        setSelectedImageId={setSelectedImageId}
        images={groupImages}
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
  width: 100%;
  font-size: 0.9rem;
  margin-top: 10px;

  &::placeholder {
    font-size: 0.9rem;
  }
`;

const UploadPic = styled.div`
  width: 250px;
  height: 200px;
  border-radius: 8px;
  background: '${(props) => !props.img && '#fff'}';
  border: 1px solid #363636;
  padding: 45px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  cursor: pointer;
  background-image: url('${(props) => props.img}');
  background-repeat: '${(props) => props.img && 'no-repeat'}';
  background-size: cover;
`;
