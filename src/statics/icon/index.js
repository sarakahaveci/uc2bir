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
} from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

const AwesomeIcon = {
    facebook: props => <FontAwesomeIcon icon={faFacebookF} {...props}/>,
    twitter: props => <FontAwesomeIcon icon={faTwitter} {...props}/>,
    youtube: props => <FontAwesomeIcon icon={faYoutube} {...props}/>,
    instagram: props => <FontAwesomeIcon icon={faInstagram} {...props}/>,
    whatsapp: props => <FontAwesomeIcon icon={faWhatsapp} {...props}/>,
    linkedin: props => <FontAwesomeIcon icon={faLinkedin} {...props}/>,
    faHistory: props => <FontAwesomeIcon icon={faHistory} {...props}/>,
    faExcel: props => <FontAwesomeIcon icon={faFileExcel} {...props}/>,
    faPlus: props => <FontAwesomeIcon icon={faPlus} {...props}/>,
    faChevronRight: props => <FontAwesomeIcon icon={faChevronRight} {...props}/>,
    faChevronDown: props => <FontAwesomeIcon icon={faChevronDown} {...props}/>,
    faFilePdf: props => <FontAwesomeIcon icon={faFilePdf} {...props}/>,
    faEnvelope: props => <FontAwesomeIcon icon={faEnvelope} {...props}/>,
    faInfo: props => <FontAwesomeIcon icon={faInfo} {...props}/>,
    faClose: props => <FontAwesomeIcon icon={faTimesCircle} {...props}/>,
    faAngleUp: props => <FontAwesomeIcon icon={faAngleDoubleUp} {...props}/>,
}

export default AwesomeIcon;
