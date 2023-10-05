import React, {ComponentProps} from "react"
import {StyleSheet} from "react-native"
import Typography from "../base/Typography"

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
  },
})

export default function StoryGroupHeader(
  props: ComponentProps<typeof Typography>,
) {
  return <Typography {...props} style={[styles.root, props.style]} />
}
