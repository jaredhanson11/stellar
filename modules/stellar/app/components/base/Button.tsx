import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import React, {ComponentProps} from "react"
import {Pressable, StyleSheet} from "react-native"
import theme from "../../theme"
import Typography from "./Typography"

export const buttonStyles = StyleSheet.create({
  base: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    gap: 10,
  },

  fullWidth: {width: "100%"},

  outlined: {
    borderColor: theme.color.primary,
    borderWidth: 1,
    borderStyle: "solid",
  },
  outlinedTypography: {
    color: theme.color.primary,
  },
  filled: {
    color: theme.color.text.default,
    backgroundColor: theme.color.primary,
  },
  filledTypography: {
    color: theme.color.text.default,
  },
})

type ButtonProps = {
  fullWidth?: boolean
  variant?: "outlined" | "filled"
  startIcon?: ComponentProps<typeof FontAwesomeIcon>["icon"]
  typographyProps?: ComponentProps<typeof Typography>
} & Omit<ComponentProps<typeof Pressable>, "children"> & {children?: string}

export default function Button(props: ButtonProps) {
  let {fullWidth, variant, startIcon, typographyProps, ...otherProps} = props
  let variantStyle = buttonStyles[variant!]
  let variantTypographyStyle = buttonStyles[`${variant}Typography`]
  return (
    <Pressable
      {...otherProps}
      style={[
        buttonStyles.base,
        fullWidth && buttonStyles.fullWidth,
        variantStyle,
        props.style,
      ]}>
      {startIcon ? (
        <FontAwesomeIcon
          size={20}
          icon={startIcon}
          style={variantTypographyStyle}
        />
      ) : undefined}
      <Typography
        {...typographyProps}
        style={[variantTypographyStyle, typographyProps?.style]}>
        {props.children}
      </Typography>
    </Pressable>
  )
}

Button.defaultProps = {
  variant: "filled",
}
