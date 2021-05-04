import React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../../components/typography/Titles';
import Svg from 'components/statics/svg';
import styled from 'styled-components';
import { default as SlickSlider } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//bunları şimdilik ekliyoruz
// @ts-ignore
import avatar1 from '../../assets/avatar/a1.jpg';
import avatar2 from '../../assets/avatar/a2.jpg';
import avatar3 from '../../assets/avatar/a3.jpg';

const Comments = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7500,
    pauseOnHover: false,
  };

  return (
    //TODO: Statik yazıldı, backend tarafından veri gelecek
    <section className={`comments ${props.className}`}>
      <Container>
        <Title variant="h3" component="h3" lineDisable={false} fontWeight={500}>
          Sizden Gelen Yorumlar
        </Title>
        <section className="comment-slider">
          <SlickSlider {...settings}>
            <div className="slider-item">
              <div className="avatar">
                <div className="img">
                  <img src={avatar1} />
                </div>
              </div>
              <QuoteWrapper>
                <Svg.Ql className="left-quote-icon" />
                <div className="text">
                  Çok nezih, çok kaliteli bir platform olmanın yanı sıra hem
                  işleyişi hem donanımlı eğitmen kadrosuyla hem de güler yüzlü
                  çalışanlarıyla harika bir deneyim. Gerek aldığım diyetisyen
                  tavsiyeleri gerekse personal trainer eğitimlerinden çok memnun
                  kaldım, herkese gözüm kapalı önerebileceğim bi yer!
                </div>
                <Svg.Qr className="right-quote-icon" />
              </QuoteWrapper>
              <div className="foot">
                <b>Beren Ç.</b> <i>Üye</i>
              </div>
            </div>
            <div className="slider-item">
              <div className="avatar">
                <div className="img">
                  <img src={avatar2} />
                </div>
              </div>
              <QuoteWrapper>
                <Svg.Ql className="left-quote-icon" />
                <div className="text">
                  Üç2Bir sayesinde farklı yerlerde yaşayan spor aşığı insanlarla
                  karşılaşma fırsatı buldum. Spor salonlarında, çeşitli
                  alanlarda, park gibi halka açık yerlerde eğitimlerimi
                  verebiliyorum. Pandemi sürecinde ise danışanlarıma özel
                  dersler verebildim. Bana bu fırsatı sunduğunuz için
                  teşekkürler Üç2Bir!
                </div>
                <Svg.Qr className="right-quote-icon" />
              </QuoteWrapper>
              <div className="foot">
                <b>Murat M.</b> <i>Eğitmen</i>
              </div>
            </div>
            <div className="slider-item">
              <div className="avatar">
                <div className="img">
                  <img src={avatar3} />
                </div>
              </div>
              <QuoteWrapper>
                <Svg.Ql className="left-quote-icon" />
                <div className="text">
                  Profesyonel olarak diyet ve beslenme danışmanlığı vermek için
                  burası mükemmel bir alan! Üç2Bir ie birlikte danışanlarımın
                  kilo, stres, düzensiz beslenme gibi olumsuz şartlardan
                  çıkmasına yardımcı oldum. Bütün bunları yapmak ise çok kolay
                  oldu. Üç2Bir ile birlikte sağlıkla kalın!
                </div>
                <Svg.Qr className="right-quote-icon" />
              </QuoteWrapper>
              <div className="foot">
                <b>Seda G.</b> <i>Diyetisyen</i>
              </div>
            </div>
          </SlickSlider>
        </section>
      </Container>
    </section>
  );
};

export default Comments;

const QuoteWrapper = styled.div`
  position: relative;

  .left-quote-icon {
    position: absolute;
    left: 5px;
    top: -50px;
    //TODO

    svg {
      @media (max-width: 992px) {
        width: 40px;
      }
    }
  }
  .right-quote-icon {
    position: absolute;
    right: 5px;
    bottom: -50px;
    //TODO
    svg {
      @media (max-width: 992px) {
        width: 40px;
      }
    }
  }
`;
