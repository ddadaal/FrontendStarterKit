import React from "react"

interface Props {
  filePath: string;
  height?: number;
  width?: number;
  className?: string;
}

export function SvgImg(props: Props) {
  const Svg = require(`svg-react-loader?name=Svg!../../../../assets/svg/${props.filePath}`);
  return <Svg className={props.className} width={props.width} height={props.height}/>;
}
