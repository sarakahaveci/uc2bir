// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getTest, getTestDetail } from 'actions';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Spinner, Title } from 'components';

import search from '../../../statics/svg/images/player.svg';

const ComputedTest = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.profileSettings);
  const { testDetail } = useSelector((state) => state.profileSettings);
  const [testName, setTestName] = useState('');

  const fullWidth = true;
  const maxWidth = 'sm';
  const [modal, setModal] = useState(false);

  const getImage = (image) => {
    const Youtube = (function () {
      let video, results;

      const getThumb = function (url, size) {
        if (url === null) {
          return '';
        }
        size = size === null ? 'big' : size;
        results = url.match('[\\?&]v=([^&#]*)');
        video = results === null ? url : results[1];

        if (size === 'small') {
          return 'http://img.youtube.com/vi/' + video + '/2.jpg';
        }
        return 'http://img.youtube.com/vi/' + video + '/0.jpg';
      };

      return {
        thumb: getThumb,
      };
    })();

    var thumb = Youtube.thumb(image, 'small');

    return thumb;
  };

  const AnswerText = ({ answer, photo, youtube }) => {
    if (youtube) {
      return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <A target="_blank" href={youtube}>
          <img
            src={`${getImage(youtube)}`}
            style={{ width: '100%', display: 'block' }}
          />
        </A>
      );
    }

    if (photo) {
      return (
        <A>
          <img src={`${photo}`} style={{ width: '100%', display: 'block' }} />
        </A>
      );
    }

    if (answer) {
      return answer;
    }

    return <></>;
  };

  const actionGetData = async () => {
    await dispatch(
      getTest(
        () => {},
        () =>
          toast.error('Profil Bilgileri Getirilemedi.', {
            position: 'bottom-right',
            autoClose: 2000,
          })
      )
    );
  };

  const testDetailHandler = async (id, name) => {
    await dispatch(
      getTestDetail(
        id,
        () => {
          setTestName(name);
          setModal(true);
        },
        () =>
          toast.error('Profil Bilgileri Getirilemedi.', {
            position: 'bottom-right',
            autoClose: 2000,
          })
      )
    );
  };

  useEffect(() => {
    actionGetData();
  }, []);

  return (
    <section>
      {test.isSuccsess && (
        <div className="text-field__Materials-sc-1sjbx6i-0 KPGYc materials">
          <div
            className="MuiFormControl-root MuiTextField-root material-inputs null  "
            maxLength=""
          >
            <label
              className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled"
              data-shrink="true"
            >
              Başlık
            </label>
            <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
              {test.data.length > 0 &&
                test.data.map((val) => (
                  <a
                    key={val?.name}
                    style={{
                      cursor: 'pointer',
                      color: 'var(--black2)',
                      fontWeight: '500',
                      marginBottom: 5,
                      paddingTop: 5,
                    }}
                    className="MuiInputBase-input MuiInput-input"
                    onClick={() => testDetailHandler(val?.id, val?.name)}
                  >
                    {val?.name}
                    {testDetail.isLoading && <Spinner />}
                  </a>
                ))}
            </div>
          </div>
          <div className="input-right-node"></div>
        </div>
      )}
      <React.Fragment>
        <Dialog
          className="material-dialog"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={modal}
        >
          <DialogTitle className="text-center">
            <Title textAlign="left" variant="h5" component="h5">
              {testName}
            </Title>
            <span
              style={{
                position: 'absolute',
                right: '5px',
                top: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                padding: '5px 15px',
              }}
              onClick={() => setModal(false)}
            >
              x
            </span>
          </DialogTitle>
          <DialogContent>
            <Table>
              <table>
                <tbody>
                  {testDetail?.data?.map((val) => {
                    return (
                      <>
                        <tr>
                          <th>{val.title}</th>
                        </tr>
                        <tr>
                          <td>
                            <AnswerText
                              answer={val.answer}
                              photo={val.photo}
                              youtube={val.youtube}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </Table>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </section>
  );
};

const Table = styled.div`
  width: 100%;
  height: 450px;
  margin-top: 15px;
  margin-bottom: 30px;
  overflow: hidden auto;
  box-shadow: 5px 5px 11px -5px rgba(0, 0, 0, 0.3);

  table {
    tr {
      th {
        background: var(--gray8);
        padding: 15px;
      }
      td {
        padding: 15px;
        font-size: 11pt;
        font-weight: 500;
      }
    }
  }
`;

const A = styled.a`
  display: flex;
  border-radius: 30px;
  overflow: hidden;
  position: relative;

  &:hover {
    &:before {
      content: '';
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 3em;
      background: rgba(255, 255, 255, 0.7);
      background-image: url(${search});
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
`;

export default ComputedTest;
