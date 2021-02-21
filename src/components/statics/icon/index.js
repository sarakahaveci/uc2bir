import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faInstagram,
  faWhatsapp,
  faLinkedin,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';

import {
  faHistory,
  faFileExcel,
  faPlus,
  faChevronRight,
  faFilePdf,
  faEnvelope,
  faChevronDown,
  faInfo,
  faTimesCircle,
  faAngleDoubleUp,
  faPhone,
  faSearch,
  faLiraSign,
  faMapMarkerAlt,
  faAngleRight,
  faAngleLeft,
  faAt,
  faLock,
  faUser,
  faVenusMars,
  faAddressCard,
  faCheckCircle,
  faClock,
  faClosedCaptioning,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

export default {
  Facebook: (props) => <FontAwesomeIcon icon={faFacebookF} {...props} />,
  Google: (props) => <FontAwesomeIcon icon={faGoogle} {...props} />,
  Twitter: (props) => <FontAwesomeIcon icon={faTwitter} {...props} />,
  Youtube: (props) => <FontAwesomeIcon icon={faYoutube} {...props} />,
  Instagram: (props) => <FontAwesomeIcon icon={faInstagram} {...props} />,
  Whatsapp: (props) => <FontAwesomeIcon icon={faWhatsapp} {...props} />,
  Linkedin: (props) => <FontAwesomeIcon icon={faLinkedin} {...props} />,
  FaHistory: (props) => <FontAwesomeIcon icon={faHistory} {...props} />,
  FaExcel: (props) => <FontAwesomeIcon icon={faFileExcel} {...props} />,
  FaPlus: (props) => <FontAwesomeIcon icon={faPlus} {...props} />,
  FaChevronRight: (props) => (
    <FontAwesomeIcon icon={faChevronRight} {...props} />
  ),
  FaChevronDown: (props) => <FontAwesomeIcon icon={faChevronDown} {...props} />,
  FaFilePdf: (props) => <FontAwesomeIcon icon={faFilePdf} {...props} />,
  FaEnvelope: (props) => <FontAwesomeIcon icon={faEnvelope} {...props} />,
  FaInfo: (props) => <FontAwesomeIcon icon={faInfo} {...props} />,
  FaClose: (props) => <FontAwesomeIcon icon={faTimesCircle} {...props} />,
  FaAngleUp: (props) => <FontAwesomeIcon icon={faAngleDoubleUp} {...props} />,
  Envolope: (props) => <FontAwesomeIcon icon={faEnvelope} {...props} />,
  Phone: (props) => <FontAwesomeIcon icon={faPhone} {...props} />,
  Search: (props) => <FontAwesomeIcon icon={faSearch} {...props} />,
  Tl: (props) => <FontAwesomeIcon icon={faLiraSign} {...props} />,
  Map: (props) => <FontAwesomeIcon icon={faMapMarkerAlt} {...props} />,
  StarRegular: (props) => <FontAwesomeIcon icon={faStarRegular} {...props} />,
  StarSolid: (props) => <FontAwesomeIcon icon={faStarSolid} {...props} />,
  Next: (props) => <FontAwesomeIcon icon={faAngleRight} {...props} />,
  Prev: (props) => <FontAwesomeIcon icon={faAngleLeft} {...props} />,
  At: (props) => <FontAwesomeIcon icon={faAt} {...props} />,
  Lock: (props) => <FontAwesomeIcon icon={faLock} {...props} />,
  User: (props) => <FontAwesomeIcon icon={faUser} {...props} />,
  Gender: (props) => <FontAwesomeIcon icon={faVenusMars} {...props} />,
  AddressCard: (props) => <FontAwesomeIcon icon={faAddressCard} {...props} />,
  Success: (props) => <FontAwesomeIcon icon={faCheckCircle} {...props} />,
  Clock: (props) => <FontAwesomeIcon icon={faClock} {...props} />,
  Close: (props) => <FontAwesomeIcon icon={faClosedCaptioning} {...props} />
};
