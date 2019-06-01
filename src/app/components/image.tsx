import * as React from 'react';

interface IOwnProps {
  src: string;
  [key: string]: any;
}

const Image = ({ src, ...props }: IOwnProps) => <img src={src} {...props} />;

export default Image;
