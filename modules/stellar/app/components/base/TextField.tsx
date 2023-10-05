import React, {ComponentProps} from "react"
import {StyleSheet, TextInput} from "react-native"
import theme from "../../theme"
import Typography from "./Typography"

const textFieldStyles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: theme.color.inputBackground,
    color: theme.color.text.default,
    borderRadius: 6,
  },
})

type TextFieldProps = ComponentProps<typeof TextInput>
function TextField(props: TextFieldProps) {
  let {value, ...otherProps} = props
  return (
    <TextInput
      {...otherProps}
      style={[textFieldStyles.root, props.style]}
      placeholderTextColor={theme.color.text.default}>
      <Typography variant="base">{value}</Typography>
    </TextInput>
  )
}

export default TextField
