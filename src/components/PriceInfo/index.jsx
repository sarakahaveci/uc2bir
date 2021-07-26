import { AwesomeIcon } from 'components'
import styled from 'styled-components/macro';
import React from 'react';
const PriceInfo = ({ price }) => {
    return (
        <Wrapper>
            <InfoIcon />
            <div>
                <text> Saatlik ücret <text style={{color:'var(--blue)'}}>{price} TL den </text>başlamaktadır.Seçilen branşa göre farklılık gösterebilir.</text>
            </div>
        </Wrapper>
    )
}
export default PriceInfo;
const Wrapper = styled.span`
div{
    display:none;
}
 &:hover{
    div {
        display:flex;
        position:absolute;
        overflow:hidden;
        width:200px;
        height:100px;
        top:40px;
        left:25%;
        background:whitesmoke;
        border-radius:10px;
        border-color:var(--blue);
        border-style:solid;
        box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
        -webkit-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
        padding:10px;
        text{
            font-size:12px;
        }
    }
 }
`
const InfoIcon = styled(AwesomeIcon.FaInfoCircele)`
    

`
