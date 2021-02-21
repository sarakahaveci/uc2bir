import React from 'react';

import PT from './PT';
import GYM from './GYM';
import Dietitians from './Dietitians';

export default ({
	PT: props => <PT {...props} />,
	GYM: props => <GYM {...props} />,
	Dietitians: props => <Dietitians {...props} />
});