import React from 'react';
//import loading from '../../assets/2.gif';

const Banner = ({ className = '', searchBar, virtual, virtuals }) => {
  return (
    <>
      <section className={`banner-virtual ${className}`}>
        <div className="virtual-banner">
          <div className="loading">
            {/*<img src={loading} alt="" />*/}
          </div>
          <div className={`slider-item ${virtuals[virtual].className}`}>
            {virtuals[virtual].component && virtuals[virtual].component()}
          </div>
        </div>
        {searchBar.status && searchBar.element()}
      </section>
    </>
  );
};

export default Banner;
