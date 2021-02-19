// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { Button, Material } from '../../../components';

import { useSelector, useDispatch } from 'react-redux';
import { setStepFour } from '../../../actions';

const StepFour = (props) => {
  const { setSteps, registerData } = props;
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const getStepFour = useSelector((state) => state.stepFour);
  const [macro, setMacro] = useState(false);
  const [next, setNext] = useState(false);

  useEffect(() => {
    if (registerData) {
      if (registerData['par_q_testi']) {
        const new_data = registerData['par_q_testi'].map((val) => {
          return {
            type: 'radio',
            required: true,
            name: val.id,
            forHtml: val.id,
            text: val.name,
            survey_id: val.survey_id,
            id: val.id,
            items: val.options.map((item) => {
              return {
                id: item.id,
                val: item.name,
                name: item.name,
              };
            }),
          };
        });
        setMacro(new_data);
      }
    }
  }, [registerData]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (data.length === macro.length) {
      const response = await data.map((val, key) =>
        dispatch(
          setStepFour(
            { ...val },
            () =>
              toast.success(`${++key}. Soru cevabı gönderildi.`, {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => setNext(true)
              }),
            () =>
              toast.error(`${++key}. Soru cevabı gönderilemedi!`, {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => setNext(false)
              })
          )
        )
      );
      if (response) {
        if ( next ) {
          return setSteps('finish');
        }
      }
    } else {
      toast.info(`Lütfen tüm soruları cevaplayın!`, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
        {macro &&
          macro.map((val, key) => (
            <Material.RadioButtonsGroup
              key={key}
              name={val.name}
              label={`${++key}. ${val.text}`}
              items={val.items}
              required
              onChange={(e) =>
                setData([
                  ...data,
                  {
                    survey_id: val.survey_id,
                    question_id: val.id,
                    answer: val.id,
                  },
                ])
              }
            />
          ))}
        {!getStepFour.isLoading || !getStepFour.isSuccess ? (
          <Button type="submit" text={`İleri`} className="blue" />
        ) : (
          <Button
            onClick={() => {
              console.log('Lütfen Bekleyiniz...');
            }}
            text={`Yükleniyor...`}
            className="blue"
          />
        )}
      </form>
    </>
  );
};

export default StepFour;
