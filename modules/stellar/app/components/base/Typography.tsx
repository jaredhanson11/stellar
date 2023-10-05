import React, {ComponentProps} from "react"
import {StyleSheet, Text} from "react-native"
import theme from "../../theme"

const textStyles = StyleSheet.create({
  title: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "600",
  },
  header: {
    fontSize: 32,
    lineHeight: 38,
  },
  base: {
    fontSize: 20,
    color: theme.color.text.default,
    lineHeight: 24,
    fontWeight: "400",
  },
  sm: {
    fontSize: 14,
    lineHeight: 18,
  },

  plus: {
    fontWeight: "600",
  },

  defaultColor: {},
  secondaryColor: {
    color: theme.color.text.secondary,
  },
  primaryColor: {
    color: theme.color.primary,
  },
})

type TypographyProps = {
  variant?: "sm" | "base" | "header" | "title"
  plus?: boolean
  color?: "default" | "secondary" | "primary"
} & ComponentProps<typeof Text>
function Typography(props: TypographyProps) {
  let {variant, plus, color, ...otherProps} = props
  let variantStyle = textStyles[variant!]
  let colorStyle = textStyles[`${color!}Color`]
  return (
    <Text
      {...otherProps}
      style={[
        textStyles.base,
        variantStyle,
        colorStyle,
        plus && textStyles.plus,
        props.style,
      ]}
    />
  )
}

Typography.defaultProps = {
  variant: "base",
  color: "default",
}

export default Typography
