import React from "react";
import PropTypes from "prop-types";
import { FlexBoxType } from "./FlexBox.d";

const styleLine = (key: string, value: any, isStringOrNumber: boolean) => {
  const type = isStringOrNumber ? typeof value : "string";

  if (type !== "string") {
    return value ? `"${key}" : ${value},` : "";
  } else {
    return value ? `"${key}" : "${value}",` : "";
  }
};

function FlexBox({
  alignContent,
  alignItems,
  alignSelf,
  display,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  height,
  justifyContent,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  order,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  width,
  children,
  style,
  ...props
}: FlexBoxType.FlexBoxProps) {
  const styleStr = `{
    ${styleLine("alignContent", alignContent, false)}
    ${styleLine("alignItems", alignItems, false)}
    ${styleLine("alignSelf", alignSelf, false)}
    ${styleLine("display", display, false)}
    ${styleLine("flex", flex, true)}
    ${styleLine("flexBasis", flexBasis, true)}
    ${styleLine("flexDirection", flexDirection, false)}
    ${styleLine("flexGrow", flexGrow, true)}
    ${styleLine("flexShrink", flexShrink, true)}
    ${styleLine("flexWrap", flexWrap, false)}
    ${styleLine("height", height, true)}
    ${styleLine("justifyContent", justifyContent, false)}
    ${styleLine("margin", margin, true)}
    ${styleLine("marginBottom", marginBottom, true)}
    ${styleLine("marginLeft", marginLeft, true)}
    ${styleLine("marginRight", marginRight, true)}
    ${styleLine("marginTop", marginTop, true)}
    ${styleLine("maxHeight", maxHeight, true)}
    ${styleLine("maxWidth", maxWidth, true)}
    ${styleLine("minHeight", minHeight, true)}
    ${styleLine("minWidth", minWidth, true)}
    ${styleLine("order", order, true)}
    ${styleLine("padding", padding, true)}
    ${styleLine("paddingBottom", paddingBottom, true)}
    ${styleLine("paddingLeft", paddingLeft, true)}
    ${styleLine("paddingRight", paddingRight, true)}
    ${styleLine("paddingTop", paddingTop, true)}
    ${styleLine("width", width, true)}
    "":""
  }`;

  return (
    <div style={{ ...JSON.parse(styleStr), ...style }} {...props}>
      {children}
    </div>
  );
}

FlexBox.propTypes = {
  alignContent: PropTypes.oneOf([
    "center",
    "flex-end",
    "flex-start",
    "space-around",
    "space-between",
    "stretch"
  ]),
  alignItems: PropTypes.oneOf([
    "baseline",
    "center",
    "flex-end",
    "flex-start",
    "stretch"
  ]),
  alignSelf: PropTypes.oneOf([
    "baseline",
    "center",
    "flex-end",
    "flex-start",
    "stretch"
  ]),
  children: PropTypes.node,
  display: PropTypes.oneOf(["flex", "inline-flex"]),
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexBasis: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexDirection: PropTypes.oneOf([
    "column-reverse",
    "column",
    "row-reverse",
    "row"
  ]),
  flexGrow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexShrink: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexWrap: PropTypes.oneOf(["nowrap", "wrap-reverse", "wrap"]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  justifyContent: PropTypes.oneOf([
    "center",
    "flex-end",
    "flex-start",
    "space-around",
    "space-between"
  ]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  order: PropTypes.number,
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object
};

FlexBox.defaultProps = {
  display: "flex"
};

export default FlexBox;
