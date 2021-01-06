import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFacebookF,
    faTwitter,
    faYoutube,
    faInstagram,
    faWhatsapp,
    faLinkedin,
    
 } from '@fortawesome/free-brands-svg-icons';

 import {
     faHistory,
     faFileExcel,
     faPlus,
     faChevronRight,
     faChevronCircleDown,
     faFilePdf,
     faEnvelope,
     faChevronDown,
     faInfo,
     faClosedCaptioning,
     faTimesCircle,
     faAngleDoubleUp,
     faPhone,
     faSearch,
     faLiraSign,
     faMapMarked,
     faMap,
     faMapMarker,
     faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

const AwesomeIcon = {
    Facebook: props => <FontAwesomeIcon icon={faFacebookF} {...props}/>,
    Twitter: props => <FontAwesomeIcon icon={faTwitter} {...props}/>,
    Youtube: props => <FontAwesomeIcon icon={faYoutube} {...props}/>,
    Instagram: props => <FontAwesomeIcon icon={faInstagram} {...props}/>,
    Whatsapp: props => <FontAwesomeIcon icon={faWhatsapp} {...props}/>,
    Linkedin: props => <FontAwesomeIcon icon={faLinkedin} {...props}/>,
    FaHistory: props => <FontAwesomeIcon icon={faHistory} {...props}/>,
    FaExcel: props => <FontAwesomeIcon icon={faFileExcel} {...props}/>,
    FaPlus: props => <FontAwesomeIcon icon={faPlus} {...props}/>,
    FaChevronRight: props => <FontAwesomeIcon icon={faChevronRight} {...props}/>,
    FaChevronDown: props => <FontAwesomeIcon icon={faChevronDown} {...props}/>,
    FaFilePdf: props => <FontAwesomeIcon icon={faFilePdf} {...props}/>,
    FaEnvelope: props => <FontAwesomeIcon icon={faEnvelope} {...props}/>,
    FaInfo: props => <FontAwesomeIcon icon={faInfo} {...props}/>,
    FaClose: props => <FontAwesomeIcon icon={faTimesCircle} {...props}/>,
    FaAngleUp: props => <FontAwesomeIcon icon={faAngleDoubleUp} {...props}/>,
    Envolope: props => <FontAwesomeIcon icon={faEnvelope} {...props}/>,
    Phone: props => <FontAwesomeIcon icon={faPhone} {...props}/>,
    Search: props => <FontAwesomeIcon icon={faSearch} {...props}/>,
    Tl: props => <FontAwesomeIcon icon={faLiraSign} {...props}/>,
    Map: props => <FontAwesomeIcon icon={faMapMarkerAlt} {...props}/>
}

export default AwesomeIcon;
