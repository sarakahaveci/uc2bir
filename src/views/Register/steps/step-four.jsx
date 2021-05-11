// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Button, Material } from '../../../components';

import { useSelector, useDispatch } from 'react-redux';
import { setStepFour } from '../../../actions';

const StepFour = (props) => {
  const { setSteps, registerData } = props;
  const dispatch = useDispatch();

  const [survey_id, _survey_id] = useState(0);
  const [question, _question] = useState([]);
  const [answer, _answer] = useState({});

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
        succsess,
        err
      )
    );
  };
  return (
    <>
      <Text>
        *Sağlığınız için 5 dakikanızı ayırıp, testimizi çözmenizi rica ederiz.
      </Text>
      <form onSubmit={onSubmit} autoComplete="off">
        {macro.length &&
          macro.map((val, key) => {
            if (val.type === 'radio') {
              return (
                <Material.RadioButtonsGroup
                  required={val.required}
                  key={key}
                  name={val.name}
                  label={`${++key}. ${val.text}`}
                  items={val.items}
                  onChange={(e) => {
                    _survey_id(val.survey_id);
                    _question([...question, val.id]);
                    _answer({ ...answer, [e.target.name]: [e.target.value] });
                  }}
                />
              );
            } else if (val.type === 'string') {
              return (
                <div style={{ marginTop: 15, marginBottom: 30 }}>
                  <div style={{ fontSize: '11pt' }} className="label">
                    {`${++key}. ${val.text}`}
                  </div>
                  <Material.TextField
                    required={val.required}
                    key={key}
                    name={val.name}
                    onChange={(e) => {
                      _survey_id(val.survey_id);
                      _question([...question, val.id]);
                      _answer({ ...answer, [e.target.name]: [e.target.value] });
                    }}
                  />
                </div>
              );
            } else if (val.type === 'checkbox') {
              return (
                <div style={{ marginTop: 15, marginBottom: 30 }}>
                  <div style={{ fontSize: '11pt' }} className="label">
                    {`${++key}. ${val.text}`}
                  </div>
                  <div style={{ margin: '15px 20px 0' }}>
                    {val.items.map((item, key) => {
                      return (
                        <>
                          <Material.CheckBoxGroup
                            style={{ color: 'red' }}
                            key={`checkbox-key-${key}`}
                            name={val.name}
                            label={item.name}
                            onChange={(e) => {
                              _survey_id(val.survey_id);
                              _question([...question, val.id]);
                              _answer({
                                ...answer,
                                [e.target.name]: [item.id],
                              });
                            }}
                          />
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        {!getStepFour.isLoading || !getStepFour.isSuccess ? (
          <Button type="submit" text={`Kaydı Tamamla`} className="blue" />
        ) : (
          <Button text={`Yükleniyor...`} className="blue" />
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
  /* font-style: italic; */
  /* font-weight: 600; */
`;
