import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Button, Material } from '../../../components';

import { useSelector, useDispatch } from 'react-redux';
import { setStepFour } from '../../../actions';

const StepFour = (props) => {
  const { t } = useTranslation();

  const { setSteps, registerData } = props;
  const dispatch = useDispatch();

  const [survey_id, setSurveyId] = useState(0);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState({});

  const getStepFour = useSelector((state) => state.stepFour);
  const [macro, setMacro] = useState(false);

  useEffect(() => {
    if (registerData) {
      if (registerData['par_q_testi']) {
        const new_data = registerData['par_q_testi'].map((val) => {
          return {
            type: val.answer_type,
            required: val.is_required ? true : false,
            name: val.id,
            forHtml: val.id,
            text: val.name,
            survey_id: val.survey_id,
            id: val.id,
            items: val.options.map((item) => {
              return {
                id: item.id,
                val: `${item.id}`,
                name: item.name,
              };
            }),
          };
        });
        setMacro(new_data);
      }
    }
  }, [registerData]);

  const success = () => {
    toast.success(t(`Question answers have been sent`), {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      toast.info(t('Please wait! You are redirected...'), {
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

  const error = () => {
    toast.error(t(`Question answers could not be sent!`), {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    return dispatch(
      setStepFour(
        {
          survey_id: survey_id,
          answer: answer,
        },
        success,
        error
      )
    );
  };

  return (
    <>
      <Text>
        *
        {t(
          'For your health, we ask you to take 5 minutes of your time and solve our test'
        )}
      </Text>
      <form onSubmit={onSubmit} autoComplete="off">
        {macro.length &&
          macro.map((val, index) => {
            if (val.type === 'radio') {
              return (
                <Material.RadioButtonsGroup
                  key={index}
                  required={val.required}
                  name={val.name}
                  label={`${index + 1}. ${val.text}`}
                  items={val.items}
                  onChange={(e) => {
                    setSurveyId(val.survey_id);
                    setQuestion([...question, val.id]);
                    setAnswer({ ...answer, [e.target.name]: [e.target.value] });
                  }}
                />
              );
            } else if (val.type === 'string') {
              return (
                <div key={index} style={{ marginTop: 15, marginBottom: 30 }}>
                  <div style={{ fontSize: '11pt' }} className="label">
                    {`${index + 1}. ${val.text}`}
                  </div>
                  <Material.TextField
                    key={index}
                    required={val.required}
                    name={val.name}
                    onChange={(e) => {
                      setSurveyId(val.survey_id);
                      setQuestion([...question, val.id]);
                      setAnswer({ ...answer, [e.target.name]: [e.target.value] });
                    }}
                  />
                </div>
              );
            } else if (val.type === 'checkbox') {
              return (
                <div key={index} style={{ marginTop: 15, marginBottom: 30 }}>
                  <div style={{ fontSize: '11pt' }} className="label">
                    {`${index + 1}. ${val.text}`}
                  </div>
                  <div style={{ margin: '15px 20px 0' }}>
                    {val?.items?.map((item, idx) => {
                      return (
                        <Material.CheckBoxGroup
                          key={`${index}-${idx}`}
                          style={{ color: 'red' }}
                          name={val.name}
                          label={item.name}
                          onChange={(e) => {
                            setSurveyId(val.survey_id);
                            setQuestion([...question, val.id]);
                            setAnswer({
                              ...answer,
                              [e.target.name]: [item.id],
                            });
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }
            return null; // Added to satisfy React's requirement for returning a value from map
          })}
          {!getStepFour.isLoading || !getStepFour.isSuccess ? (
            <Button
              type="submit"
              text={t('Complete Registration')}
              className="blue"
            />
          ) : (
            <Button text={t('Loading')} className="blue" />
          )}
        </form>
      </>
    );
  };
  
  export default StepFour;
  
  const Text = styled.div`
    font-family: 'Poppins', sans-serif;
    font-size: 11pt;
    color: #181818;
    line-height: 175%;
    color: #00b2a9;
    margin-bottom: 15px;
  `;
  
  export { StepFour };

