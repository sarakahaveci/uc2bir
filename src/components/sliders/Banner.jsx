import React from 'react';
import {default as NativeBanner} from "../../app/middleware/Banner";
import SearchBar from '../../app/middleware/SearchBar';

const Banner = () => {
    const slider_settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        lazyLoad: true,
    };

    const search_bar = {
        status: true,
        className: "search-bar",
        element: () => <SearchBar className={search_bar.className}/>
    }

    return (
        <NativeBanner
            settings={slider_settings}
            searchBar={search_bar}
        />
    );
};

export default Banner;