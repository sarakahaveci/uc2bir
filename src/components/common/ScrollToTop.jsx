import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTop = ({ children }) => {
  let location = useLocation();

  useEffect(() => {
    scroll.scrollToTop();
  }, [location]);

  return children;
};

export default ScrollToTop;
