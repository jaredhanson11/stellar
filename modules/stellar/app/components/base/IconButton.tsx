import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import React, {ComponentProps} from "react"
import {Pressable, StyleSheet} from "react-native"
import theme from "../../theme"
import Button, {buttonStyles} from "./Button"

const iconButtonStyles = StyleSheet.create({
  ...buttonStyles,
  base: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 100,
  },
  ghost: {},
  ghostTypography: {
    color: theme.color.text.default,
  },
})

type IconButtonProps = ComponentProps<typeof Pressable> & {
  icon: ComponentProps<typeof FontAwesomeIcon>["icon"]
  variant?: ComponentProps<typeof Button>["variant"] | "ghost"
  size?: "sm" | "md" | "lg"
}

export default function IconButton(props: IconButtonProps) {
  let {variant, icon, size, ...otherProps} = props
  let variantStyle = iconButtonStyles[variant!]
  let variantTypographyStyle = iconButtonStyles[`${variant!}Typography`]
  let iconSize = {
    sm: 15,
    md: 20,
    lg: 25,
  }[size!]
  return (
    <Pressable
      {...otherProps}
      style={[iconButtonStyles.base, variantStyle, props.style]}>
      <FontAwesomeIcon
        icon={icon}
        size={iconSize}
        style={variantTypographyStyle}
      />
    </Pressable>
  )
}

IconButton.defaultProps = {
  variant: "ghost",
  size: "md",
}
