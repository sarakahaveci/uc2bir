// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Text from '../../../components/typography/Text';
import Button from '../../../components/buttons/button';

import { navigate } from 'gatsby';
import AwesomeIcon from '../../../statics/icon';

const StepFinish = (props) => {
    return (
        <>
            <span style={{marginBottom: 30, width: "100%", height: "auto", textAlign: "center"}}><AwesomeIcon.Succsess style={{fontSize: "4em", color: "#00b2a9"}}/></span>
            <Text style={{ marginBottom: 5 }} children="Aramıza Hoş Geldin." blue textAlign="center"/>
            <Text style={{ marginBottom: 25 }} fontSize="11pt" children="Sistem onayın için ilgili arkadaşlarımız en kısa zamanda seninle iletişime geçecek." textAlign="center"/>
            <Button onClick={() => navigate("/")} text={`Anasayfa`} blue />
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch,
        ...bindActionCreators({  }, dispatch),
    }
}

const mapStateToProps = ({ loginReducers }) => ({ loginReducers });

export default connect(mapStateToProps, mapDispatchToProps)(StepFinish);