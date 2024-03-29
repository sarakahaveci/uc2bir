import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import SelectPictureModal from './SelectPictureModal';
import { Svg, Text, Box, CalendarCell, PlusButton, Material } from 'components';
import { PERSONAL_TRAINER, DIETITIAN } from 'constants/index';
import {
  getSessionTypes,
  getWorkPlaceCapacity,
  setGroupSelectionData,
  getGroupImages,
  getUserPTBranchList,
  getDietitianClinics,
  getPtWorkingHomePlace,
  getDayOfCalendar,
  getFilteredGymList,
} from 'actions';
import { useTranslation } from 'react-i18next';

export default function GroupLeftSelections() {
  const { t } = useTranslation();

  const { type_id: userTypeId } = useSelector((state) => state.auth.user);
  const availableHours = useSelector(
    (state) => state.profileSettings2?.reservationTemplate?.availableHours?.data
  );

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
  useEffect(() => {
    dispatch(getDayOfCalendar(moment(selectedDate).format('DD.MM.YYYY')));
  }, [selectedDate]);
  const { data } = useSelector((state) => state?.profileSettings?.ptBranchList);

  const {
    ptHomePlace: { data: ptHomePlace },
  } = useSelector((state) => state.userProfile.workPlace);

  const [selectedImageId, setSelectedImageId] = useState();
  const [file, setFile] = useState();

  const selectPicModalRef = useRef();

  const dispatch = useDispatch();

  const openSelectPicModal = () => selectPicModalRef.current.openModal();

  useEffect(() => {
    if (userTypeId === PERSONAL_TRAINER) {
      dispatch(getSessionTypes());

      // dispatch(getMyBranches());
      dispatch(getPtWorkingHomePlace());

      dispatch(getUserPTBranchList());

      dispatch(getGroupImages());

      dispatch(getFilteredGymList());
    }
    if (userTypeId === DIETITIAN) {
      dispatch(getSessionTypes());
      dispatch(getDietitianClinics());
      dispatch(getGroupImages());
    }
  }, []);

  useEffect(() => {
    dispatch(
      getFilteredGymList(
        moment(selectedDate).format('DD.MM.YYYY'),
        selectedHour,
        branchSelection?.id
      )
    );
  }, [branchSelection, selectedHour, selectedDate]);
  useEffect(() => {
    if (selectedImageId) {
      selectDataHandler('group_slot_image_id', selectedImageId?.id);
    } else if (file) {
      // const resizedFile = await resizeFile(file);

      selectDataHandler('group_slot_image', file);
    }
  }, [selectedImageId, file]);

  useEffect(() => {
    if (
      branchSelection &&
      locationSelection &&
      userTypeId === PERSONAL_TRAINER
    ) {
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
              {t('SELECT PHOTO')}
            </Text>
          )}
        </UploadPic>

        <Plus type="dark" onClick={openSelectPicModal} />
      </Box>

      {userTypeId !== DIETITIAN && (
        <>
          <Text color="gray10" fontWeight="600" fontSize="1.1rem" mt="20px">
            {t('Select Time')}
          </Text>

          <Box row flexWrap="wrap">
            {availableHours?.length > 0 &&
              availableHours
                ?.filter((item) => !item.id)
                .map((item) => (
                  <CalendarCell
                    key={item}
                    onClick={() =>
                      selectDataHandler('selectedHour', item?.hour)
                    }
                    type="time"
                    size="large"
                    isActive={selectedHour === item?.hour}
                  >
                    {item?.hour}
                  </CalendarCell>
                ))}
          </Box>
        </>
      )}
      {userTypeId === PERSONAL_TRAINER && (
        <>
          <Text color="gray10" fontWeight="600" fontSize="1.1rem" mt="20px">
            {t('Enter course title')}...
          </Text>
          <TextArea
            rows={1}
            onBlur={(e) => selectDataHandler('title', e.target.value)}
          />
        </>
      )}
      {userTypeId !== DIETITIAN && (
        <>
          <FormControl className="w-100 mt-2">
            <InputLabel>{t('Select Branch')}</InputLabel>

            <Select
              value={branchSelection}
              input={<Input />}
              onChange={(e) =>
                selectDataHandler('branchSelection', e.target.value)
              }
            >
              {data?.branches?.length > 0 &&
                data?.branches?.map(
                  (branch) =>
                    branch?.status_id === 2 && (
                      <MenuItem key={branch.id} value={branch}>
                        {branch.name}
                      </MenuItem>
                    )
                )}
            </Select>
          </FormControl>
        </>
      )}
      {userTypeId === DIETITIAN && (
        <>
          <FormControl className="w-100 mt-2">
            <Material.TextField
              label={t('Enter title')}
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
          ? t('Enter Package Contents')
          : t('Enter Course Content')}
      </Text>

      <TextArea
        rows={6}
        onBlur={(e) => selectDataHandler('courseDetails', e.target.value)}
      />

      {userTypeId !== DIETITIAN && (
        <FormControl className="w-100 mt-2">
          <InputLabel>{t('Select Session Types')}</InputLabel>

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
          <InputLabel>{t('Select Session Types')}</InputLabel>

          <Select
            multiple
            value={dtSessionSelection}
            input={<Input />}
            onChange={(e) =>
              selectDataHandler('dtSessionSelection', e.target.value)
            }
          >
            {sessionTypes?.data?.data?.map((sessionType) => (
              <MenuItem key={sessionType.id} value={sessionType}>
                {sessionType.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {false &&
        userTypeId === DIETITIAN &&
        dtSessionSelection?.filter((item) => item.type == 'clinic').length >
          0 && (
          <FormControl className="w-100 mt-2">
            <InputLabel>{t('Select Clinic')}</InputLabel>

            <Select
              value={locationSelection}
              input={<Input />}
              onChange={(e) =>
                selectDataHandler('locationSelection', e.target.value)
              }
            >
              {clinics?.clinic?.map((item) => (
                <MenuItem key={item.id} value={item}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      {sessionSelection.type === 'gym' && (
        <FormControl className="w-100 mt-2">
          <InputLabel>{t('Choose Sports Field')}</InputLabel>

          <Select
            value={locationSelection}
            input={<Input />}
            onChange={(e) =>
              selectDataHandler('locationSelection', e.target.value)
            }
          >
            {gymList?.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {sessionSelection.type === 'home_park' && (
        <FormControl className="w-100 mt-2">
          <InputLabel>{t('Select Home/Park')}</InputLabel>

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
          <InputLabel>{t('Select Class')}</InputLabel>

          <Select
            value={classSelection}
            input={<Input />}
            onChange={(e) =>
              selectDataHandler('classSelection', e.target.value)
            }
          >
            {workPlaceCapacity?.map((item) => (
              <MenuItem key={item.id} value={item}>
                {item.name} {item.capacity} {t('people')}
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
        file={file}
        setFile={setFile}
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
