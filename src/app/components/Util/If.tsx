import React, { ReactNode } from 'react';
import { ElementClass } from 'enzyme';

interface Props {
  condition: boolean;
  children?: ElementClass;
  else?: ElementClass;
}

export function If(props: Props) {
  if (props.condition) {
    return props.children;
  } else {
    return props.else === undefined ? null : props.else;
  }
}
