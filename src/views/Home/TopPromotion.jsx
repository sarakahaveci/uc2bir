import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import cx from 'classnames';
import { useSelector } from 'react-redux'
import { Title, DefBackground } from 'components';
import AsNavFor from 'components/sliders/AsNavFor';
//import img0 from 'assets/slider/top-promotion/img-0.jpg';
//import img1 from 'assets/slider/top-promotion/img-1.jpg';
//import img2 from 'assets/slider/top-promotion/img-2.jpg';
//import img3 from 'assets/slider/top-promotion/img-3.jpg';

//? sliderItems will change with content from "cms"
/*const sliderItems = [
  { title: "Başarmak İçİn sen de hemen başla!", desc: "Spor için tutku, özgürlük, motivasyon, enerji; Forma Girmek için heves, istikrar, profesyonel destek; Grup Motivasyonu için ortak   hedefler, beraberlikten gelen itici güç! Unutma hedeflerini ancak  başlayanlar başarabilir.", file: {path:img0,type:'image'} },
  { title: "Lorem Ipsum 1", desc: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but becau", file: {path:img1,type:'image'}  },
  { title: "Lorem Ipsum 2", desc: "At vero eosds et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est ", file: {path:img2,type:'image'}  },
  { title: "Lorem Ipsum 3", desc: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of wil", file: {path:img3,type:'image'}  }
];*/

const TopPromotion = ({ className, background, children }) => {
  const sliders = useSelector((state) => state.home?.content?.data?.slider) || []
  const [sliderItems, setSliderItems] = useState([]);

  const [title, setTitle] = useState(sliderItems[0]?.title);
  const [desc, setDesc] = useState(sliderItems[0]?.description);
  function onChangeSlideHandler(slide) {
    setTitle(sliderItems[slide]?.title)
    setDesc(sliderItems[slide]?.desc)

  }

  useEffect(() => {
    var tempArr = sliders?.filter((elm) => elm?.web == 'active').map((element) => (
      { title: element?.name, desc: element?.description, file: element?.file }
    ));
    setDesc(tempArr[0]?.desc)
    setTitle(tempArr[0]?.title)
    setSliderItems(tempArr)
  }, [sliders])
  return (
    <section className={cx('top-promotion', { [`${className}`]: className })}>
      {background && (
        <div
          className="background-element"
          style={{ backgroundImage: `url(${DefBackground.elementBackground})` }}
        ></div>
      )}
      <Container>
        <div className="row">
          <div className="col-lg-6 mt-5">
            <Title
              variant="h3"
              component="h3"
              lineDisable={false}
              textLeft
              fontWeight="600"
            >
              {title}
            </Title>
            <p className="mb-5">
              {desc}
            </p>
          </div>
          <div className="slider-p0 col-lg-6 d-flex">
            <AsNavFor onChangeSlideHandler={onChangeSlideHandler} sliderItems={sliderItems} />
          </div>
        </div>
        {children}
      </Container>
    </section>
  );
};

export default TopPromotion;
