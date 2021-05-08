import { HTTP_REQUEST, GENERATE_TWILIO_TOKEN } from '../constants';

export const generateTwilioToken = () => async (
  dispatch
) => {
  const url = '/twilio/generate-token';

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: GENERATE_TWILIO_TOKEN,
      body: { device:'web' },
      transformData: (data) => data.data,
      // callBack: (callBack) => console.log(callBack),
      // errorHandler: (error) =>console.log(error),
    },
  });
};
