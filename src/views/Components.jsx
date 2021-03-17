// @ts-nocheck
import { Main, MasonaryGallery, SessionType } from 'components';
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { ProfileCard, ProfileBanner, Material, Svg, Wallet } from 'components';
import item1 from '../assets/pt-groups/item-1/04.jpg';

const Components = () => {
  return (
    <>
      <Main style={{paddingBottom: 70}}>
        <Container>
          <Row>
            <Col>
              <ProfileCard
                img={item1}
                name="Efe Parlak"
                location="İstanbul Beşiktaş"
                user
              />
              <ProfileCard
                img={item1}
                name="Efe Parlak"
                location="İstanbul Beşiktaş"
                user
              >
                <div>Gönderdiğimiz içerik burada gözükür.</div>
              </ProfileCard>
              <ProfileCard img={item1} />
              <Material.TextField
                required
                name="name"
                label="Adınız Soyadınız"
                type="text"
                settings
                action={() => {}}
                state={{isSuccess: false, isLoading: false}}
              />
              <Material.TextField
                required
                name="phone"
                label="Telefon Numaranız"
                mask="0(999) 999 99 99"
                defaultValue="05389999999"
                type="text"
                settings
                action={() => {}}
                state={{isSuccess: false, isLoading: false}}
              />
              <Material.TextField
                required
                name="password"
                label="Şifre"
                type="password"
                password={Svg.EyeIcon}
                settings
                action={() => {}}
                state={{isSuccess: false, isLoading: false}}
              />
              <ProfileBanner
                info={{
                  team: 'A',
                  img: item1,
                  name: 'Efe Parlak',
                  category: 'Fitnes Eğitmeni',
                  price: '100',
                  stars: '3',
                  location: 'İstanbul, Beşiktaş',
                  comment: '/',
                }}
                categories={[
                  {
                    text: 'Meditasyon',
                    link: '/',
                  },
                  {
                    text: 'Plates',
                    link: '/',
                  },
                  {
                    text: 'Fitnes',
                    link: '/',
                  },
                ]}
                about={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum. dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.”`}
              >
                <div>Gönderdiğimiz child burada gözükür.</div>
              </ProfileBanner>
              
              <Wallet/>
              <SessionType/>
            </Col>
          </Row>
        </Container>
      </Main>
    </>
  );
};

export default Components;
