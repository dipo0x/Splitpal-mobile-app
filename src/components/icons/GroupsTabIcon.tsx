import React from "react";
import Svg, { ClipPath, Defs, G, Mask, Path, Rect } from "react-native-svg";

type GroupsTabIconProps = {
  width?: number;
  height?: number;
  fill?: string;
  style?: object;
};

export default function GroupsTabIcon({
  width = 20,
  height = 20,
  fill = "#000",
  style,
}: GroupsTabIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      style={style}
    >
      <G clipPath="url(#clip0)">
        <Mask
          id="mask0"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <Path d="M20 0H0V20H20V0Z" fill="white" />
        </Mask>
        <G mask="url(#mask0)">
          <Path
            d="M10.0001 10.8333C11.6569 10.8333 13.0001 9.48993 13.0001 7.83325C13.0001 6.17657 11.6569 4.83325 10.0001 4.83325C8.3433 4.83325 7.00002 6.17657 7.00002 7.83325C7.00002 9.48993 8.3433 10.8333 10.0001 10.8333Z"
            fill={fill}
          />
          <Path
            d="M16.4833 17.5C16.4583 17.1583 16.3583 16.8166 16.1917 16.5083C15.9333 15.9833 15.5583 15.525 15.0917 15.1583C13.05 13.5666 10.0333 13.5583 7.99166 15.1583C7.525 15.525 7.15002 15.9833 6.89169 16.5083C6.72502 16.8166 6.62502 17.1583 6.60002 17.5C6.55835 18.0666 6.78335 18.2333 7.18335 18.2333H15.9083C16.3083 18.2333 16.5333 18.0666 16.4833 17.5Z"
            fill={fill}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
