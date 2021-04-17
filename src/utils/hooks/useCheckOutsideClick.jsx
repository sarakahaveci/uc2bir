import { useEffect } from 'react';

// Found in https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
const useCheckOutsideClick = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useCheckOutsideClick;
