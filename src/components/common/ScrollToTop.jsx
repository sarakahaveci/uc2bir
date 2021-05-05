import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import ReactGA from 'react-ga';

const ScrollToTop = ({ children }) => {
  let location = useLocation();

  useEffect(() => {
    scroll.scrollToTop();
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [location]);

  return children;
};

export default ScrollToTop;
