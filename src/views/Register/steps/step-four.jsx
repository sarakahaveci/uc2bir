// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { Button, Material } from '../../../components';

import { useSelector, useDispatch } from 'react-redux';
import { setStepFour, getQuiz } from '../../../actions';

const StepFour = (props) => {
  const { setSteps, registerData } = props;
  const dispatch = useDispatch();

  const [servey_id, _servey_id] = useState([]);
  const [question, _question] = useState([]);
  const [answer, _answer] = useState([]);

  const getStepFour = useSelector((state) => state.stepFour);
  const quiz = useSelector((state) => state.quizGet);
  const [macro, setMacro] = useState(false);

  useEffect(() => {
    if (registerData) {
      if (registerData['par_q_testi']) {
        const new_data = registerData['par_q_testi'].map((val) => {
          return {
            type: val.answer_type,
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

  const succsess = () => {
    toast.success(`Soru cevapları gönderildi.`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
			toast.info('Lütfen Bekleyiniz! Yönlendiriliyorsunuz...', {
				position: 'bottom-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				onClose: () => setSteps('finish'),
			});
		}, 1000);
  };

  const err = () => {
    toast.error(`Soru cevapları gönderilemedi!`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    return dispatch(
      setStepFour({servey_id: [...servey_id], question: [...question], answer: [...answer]}, succsess, err)
    );
  };
  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
        {macro.length &&
          macro.map((val, key) => {
            if (val.type === "radio") {
              return (
                <Material.RadioButtonsGroup
                  required={true}
                  key={key}
                  name={val.name}
                  label={`${++key}. ${val.text}`}
                  items={val.items}
                  onChange={(e) => 
                    {
                      _servey_id([...servey_id, val.survey_id]);
                      _question([...question, val.id]);
                      _answer([...answer, val.id]);
                    }
                  }
                />
              );
            } else if ( val.type === "string" ) {
              return (
                <div style={{marginTop: 15, marginBottom: 30}}>
                  <div style={{fontSize: "11pt"}} className="label">{`${++key}. ${val.text}`}</div>
                  <Material.TextField
                    required={true}
                    key={key}
                    name={val.name}
                    onChange={(e) => 
                      {
                        _servey_id([...servey_id, val.survey_id]);
                        _question([...question, val.id]);
                        _answer([...answer, e.target.value]);
                      }
                    }
                  />
                </div>
              )
            }
          })}
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
