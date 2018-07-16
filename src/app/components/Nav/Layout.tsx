import styled from "styled-components";
import { CSSProperties } from "react";
import { CONTENT_SIDE_PADDING } from "../../stores/UiStore";

const breakpoint = 997;
const navbarHeight = 64;

export const NavItem = styled.div`
    float: right;
    display: inline-flex;
    align-items: center;
    height: ${navbarHeight}px;
    margin-left: 8px;
    margin-right: 8px;
`;

export const LogoContainer = styled.div`
  padding-top: 16px;
  padding-left: 24px;
  span {
    color: #ffffff;
  }
  img {
    margin-right: 8px;
    width: 45px;
    height: 41px;
  }
`;


export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${navbarHeight}px;
    background: #ffffff;
    padding: ${CONTENT_SIDE_PADDING}px ${CONTENT_SIDE_PADDING}px;
   
`;

export const LeftDiv = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: ${breakpoint}px) {
        width: 100%;
        justify-content: space-between;
    }
    
`;

export const DropdownContainer = styled.div`
    &:hover {
        cursor: pointer;
    }
    .ant-popover-inner-content {
      padding: 0 !important;
    }

`;

export const MobileNavContainer = styled.div`
    //display: inline;
    &> * {
    margin-right: 24px;
    display: inline;
    }
    @media (min-width: ${breakpoint}px) {
      display: none;
    }
`;

export const SvgImgContainer = styled.div`
    height: ${navbarHeight}px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
   
`;

export const RightDiv = styled.div`
    @media (max-width: ${breakpoint}px) {
        display: none;
    }
`;

export const IndicatorContainer = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const dropdownMenuStyle: CSSProperties = {
  width: '256px',
  textAlign: 'center'
};

export const horizontalMenuStyle: CSSProperties = {
  lineHeight: `${navbarHeight}px`
};

