import React from 'react';
import navLogoIcon from '../../assets/icon/nav_logo.svg';

export default function Logo({ height }: {
  height?: string;
}) {
  return (
    <img src={navLogoIcon} height={height ?? '52px'} alt="Aries" />
  );
}
