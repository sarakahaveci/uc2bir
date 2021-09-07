// @ts-nocheck
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { makeStyles } from '@material-ui/core/styles';
import { device } from 'utils';
import LinearProgress from '@material-ui/core/LinearProgress';
import Svg from 'components/statics/svg';
import { getUserExerciseDetail } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  barColorPrimary: {
    backgroundColor: '#00B2A9',
  },
});
const ExerciseDetail = ({ setPage = () => {}, globalState }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const detailData = useSelector(
    (state) => state.myPackets?.user?.exerciseDetail?.data
  );
  const classes = useStyles();
  useEffect(() => {
    dispatch(
      getUserExerciseDetail(
        globalState?.training_id,
        globalState?.package_uuid,
        globalState?.lesson_id
      )
    );
  }, []);
  return (
    <Main>
      <BackLink onClick={() => setPage('Exercises')}>
        <Svg.ArrowLeftIcon />

        <span>{t('Exercise Detail')}</span>
      </BackLink>

      <Container>
        <Side>
          <TextContent>
            <Text bold>{t('How is it done?')}</Text>
            <LinearProgress
              classes={{ barColorPrimary: classes.barColorPrimary }}
              variant="determinate"
              value={20}
            />
            <Text>{ReactHtmlParser(decode(detailData?.detail))}</Text>
          </TextContent>
          <Info>
            <Text bold>{detailData?.title}</Text>
            <Properties>
              <PropertyContainer>
                <Svg.Difficulty></Svg.Difficulty>
                <TextWrapper>
                  <Text>{t('difficulty')}</Text>
                  <Text bold>{detailData?.level}</Text>
                </TextWrapper>
              </PropertyContainer>
              <PropertyContainer>
                <Svg.Weight></Svg.Weight>
                <TextWrapper>
                  <Text>{t('Weight')}</Text>
                  <Text bold>{detailData?.weight} kg</Text>
                </TextWrapper>
              </PropertyContainer>
              <PropertyContainer>
                <Svg.Set></Svg.Set>
                <TextWrapper>
                  <Text>Set</Text>
                  <Text bold>{detailData?.set}</Text>
                </TextWrapper>
              </PropertyContainer>
              <PropertyContainer>
                <Svg.Break></Svg.Break>
                <TextWrapper>
                  <Text>{t('break')}</Text>
                  <Text bold>{detailData?.break}</Text>
                </TextWrapper>
              </PropertyContainer>
              <PropertyContainer>
                <Svg.Repetition></Svg.Repetition>
                <TextWrapper>
                  <Text>{t('repeat')}</Text>
                  <Text bold> {detailData?.repetition}</Text>
                </TextWrapper>
              </PropertyContainer>
            </Properties>
          </Info>
        </Side>
        <Side>
          <Video
            controls="controls"
            class="video-stream"
            x-webkit-airplay="allow"
            data-youtube-id="N9oxmRT2YWw"
            src="http://v20.lscache8.c.youtube.com/videoplayback?sparams=id%2Cexpire%2Cip%2Cipbits%2Citag%2Cratebypass%2Coc%3AU0hPRVRMVV9FSkNOOV9MRllD&amp;itag=43&amp;ipbits=0&amp;signature=D2BCBE2F115E68C5FF97673F1D797F3C3E3BFB99.59252109C7D2B995A8D51A461FF9A6264879948E&amp;sver=3&amp;ratebypass=yes&amp;expire=1300417200&amp;key=yt1&amp;ip=0.0.0.0&amp;id=37da319914f6616c"
          ></Video>
        </Side>
      </Container>
    </Main>
  );
};
const Main = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
`;
const Side = styled.div`
  width: 586px;
  height: 586px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const TextContent = styled.div`
  width: 586px;
  padding: 30px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const Info = styled.div`
  width: 586px;
  height: 234px;
  padding: 30px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const Properties = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  @media ${device.sm} {
    width: 100%;
  }
`;
const PropertyContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;
const Text = styled.text`
  font-size: 1rem;
  font-weight: ${(props) => (props.bold ? 'bold' : 'initial')};
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const BackLink = styled(Text)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;

  svg {
    margin-top: 2px;
  }

  > span {
    margin-left: 10px;
    color: ${(p) => p.theme.colors.softDark};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
const Video = styled.video`
  width: 100%;
  background: red;
`;

export default ExerciseDetail;
