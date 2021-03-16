import React from 'react'
import styled from 'styled-components/macro'
import { Row, Col } from 'react-bootstrap'

import Notifications from './Notifications'
import NotificationImg from 'assets/notifications.png'

export default function RegularNotifications() {
    return (
        <Row>
            <Col lg={4}>
                <img src={NotificationImg} width="100%" />
            </Col>

            <ContentCol lg={8}>
                <Notifications />
            </ContentCol>
        </Row>
    )
}

const ContentCol = styled(Col)`
  padding-left: 15px;
`;