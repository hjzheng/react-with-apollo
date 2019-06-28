import * as React from "react";

export as namespace FlexBoxType;

declare namespace FlexBoxType {
  type AlignContent =
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-between"
    | "stretch";

  type AlignItems =
    | "baseline"
    | "center"
    | "flex-end"
    | "flex-start"
    | "stretch";

  type FlexDisplays = "flex" | "inline-flex";

  type FlexDirections = "column-reverse" | "column" | "row-reverse" | "row";

  type FlexWraps = "nowrap" | "wrap-reverse" | "wrap";

  type JustifyContent =
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-between"
    | "space-evenly";

  // <Flexbox />
  interface FlexBoxProps extends React.HTMLAttributes<HTMLElement> {
    alignContent?: AlignContent;
    alignItems?: AlignItems;
    alignSelf?: AlignItems;
    children?: React.ReactNode;
    className?: string;
    display?: FlexDisplays;
    flex?: string | number;
    flexBasis?: string | number;
    flexDirection?: FlexDirections;
    flexGrow?: string | number;
    flexShrink?: string | number;
    flexWrap?: FlexWraps;
    height?: string | number;
    justifyContent?: JustifyContent;
    margin?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
    marginRight?: string | number;
    marginTop?: string | number;
    maxHeight?: string | number;
    maxWidth?: string | number;
    minHeight?: string | number;
    minWidth?: string | number;
    order?: number;
    padding?: string | number;
    paddingBottom?: string | number;
    paddingLeft?: string | number;
    paddingRight?: string | number;
    paddingTop?: string | number;
    style?: Object;
    width?: string | number;
  }

  export class FlexBox extends React.Component<FlexBoxProps, {}> {}
}
