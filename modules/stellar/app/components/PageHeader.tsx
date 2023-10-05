import React, {ComponentProps} from "react"
import {StyleSheet, View} from "react-native"
import Typography from "./base/Typography"

const headerStyles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})

function PageHeader(props: ComponentProps<typeof View>) {
  return <View {...props} style={[headerStyles.root, props.style]} />
}

PageHeader.Header = (props: ComponentProps<typeof Typography>) => {
  return <Typography variant="title" plus {...props} />
}

export default PageHeader
