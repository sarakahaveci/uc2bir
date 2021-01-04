import React from 'react';
import {default as NativeBanner} from "../../app/middleware/Banner";
import SearchBar from '../../app/middleware/SearchBar';

const Banner = () => {
    const slider_settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        vertical: true,
        verticalSwiping: true,
        autoplaySpeed: 7500,
        pauseOnHover: false
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