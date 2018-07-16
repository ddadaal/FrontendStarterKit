import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';
import { LocaleMessage } from "../../internationalization/components";
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import { LocaleStore } from "../../stores/LocaleStore";
import { Inject } from "react.di";
import styled from "styled-components";
import img from '../../../assets/svg/.png';
import { SvgImg } from "../SvgImg";

export interface FooterProps {
  isMobile?: boolean;
  id?: string;
}

const ID_PREFIX = "footer.";


@observer
export class Footer extends React.Component<FooterProps, any> {

  static defaultProps = {
    className: 'footer1',
    id: "footer_1_0",
    isMobile: false
  };


  @Inject localeStore: LocaleStore;

  getLiChildren = (data, i) => {
    const links = data.contentLink;
    const content = data.content
      .map((item, ii) => {
        const cItem = item.trim();
        const isImg = cItem.match(/\.(jpg|png|svg|bmp|jpeg)$/i);
        const link = links[ii];
        const content = isImg ? <img src={cItem} width="100%"/> : cItem;
        return (<li className={isImg ? 'icon' : ''} key={ii}>
          {link.startsWith("/")
            ? <Link to={link}>{content}</Link>
            : <a href={link} target="_blank">{content}</a>
          }
        </li>);
      });
    return (<li className={data.className} key={i} id={`${this.props.id}-block${i}`}>
      <h2>{data.title}</h2>
      <ul>
        {content}
      </ul>
    </li>);
  };

  render() {
    const props = {...this.props};
    const isMobile = props.isMobile;
    delete props.isMobile;

    const get = (id: string) => {
      return this.localeStore.get(ID_PREFIX + id);
    };

    const dataSource = [
      {
        title: get("help.title"),
        content: [
          get("help.about"),
          get("help.usage"),
          get("help.FAQ")
        ],
        contentLink: [
          '/about/about',
          '/about/usage',
          '/about/faq'
        ]
      },
      {
        title: get("madeByUs.title"),
        content: [
          get("madeByUs.NJUAdmin"),
          get("madeByUs.AstronAlice"),
          get("madeByUs.Lightx00")
        ],
        contentLink: [
          "https://github.com/trapx00/NJUAdmin",
          "#",
          "https://github.com/trapx00/Lightx00"
        ]
      },
      {
        title: get("contact"),
        content: [
          "https://zos.alipayobjects.com/rmsportal/AXtqVjTullNabao.svg"
        ],
        contentLink: [
          "https://github.com/trapx00"
        ]
      },
    ];

    const liChildrenToRender = dataSource.map(this.getLiChildren);
    return (<OverPack
      {...props}
      playScale={isMobile ? 0.5 : 0.2}
    >

      <QueueAnim type="bottom" component="ul" key="ul" leaveReverse id={`${props.id}-ul`}>
        <li key="logo" id={`${props.id}-logo`}>
          <LogoContainer>
            <SvgImg filePath={"tag_x00_logo_landscape_with_texts.svg"} height={50} width={170}/>
          </LogoContainer>
          <p><LocaleMessage id={ID_PREFIX + "productDescription"}/></p>
        </li>
        {liChildrenToRender}
      </QueueAnim>
      <TweenOne
        animation={{y: '+=30', opacity: 0, type: 'from'}}
        key="copyright"
        className="copyright"
        id={`${props.id}-content`}
      >
        <span>
          <LocaleMessage id={ID_PREFIX + "copyright"}/>
        </span>
      </TweenOne>
    </OverPack>
    );
  }
}

export const LogoContainer = styled.div`
  span {
    color: #ffffff;
    font-weight: bold;
    font-size: 21px;
  }
  img {
    margin-right: 8px;
    width: 45px;
    height: 41px;
  }
`;
