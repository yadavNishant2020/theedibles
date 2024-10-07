import React from 'react';
import LogoStrapi from '../../../../assets/images/logo_strapi.png';
import styled from 'styled-components';

const Img = styled.img`
  height: 80px;
`;


const Logo = () => <Img src={LogoStrapi} alt="strapi-logo" />;

export default Logo;
