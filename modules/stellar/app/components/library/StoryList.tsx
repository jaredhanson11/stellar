import {faBook, faEllipsisH} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import React, {ComponentProps} from "react"
import {Pressable, StyleSheet, View} from "react-native"
import theme from "../../theme"
import IconButton from "../base/IconButton"
import Typography from "../base/Typography"

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    borderBottomColor: theme.color.text.secondary,
    borderBottomWidth: 2,
    flexWrap: "nowrap",
    gap: 8,
  },
  rowDetails: {
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  rowActions: {flexGrow: 0, flexShrink: 0, marginLeft: "auto"},
})

function StoryList(props: ComponentProps<typeof View>) {
  return (
    <View {...props} style={[styles.root, props.style]}>
      {props.children}
    </View>
  )
}

StoryList.Row = (
  props: ComponentProps<typeof Pressable> & {title: string; subtitle: string},
) => {
  let {title, subtitle, ...otherProps} = props
  return (
    <Pressable {...otherProps} style={[styles.row, otherProps.style]}>
      <FontAwesomeIcon
        icon={faBook}
        color={theme.color.text.secondary}
        size={20}
      />
      <View style={styles.rowDetails}>
        <Typography variant="sm" plus>
          {title}
        </Typography>
        <Typography variant="sm" color="secondary">
          {subtitle}
        </Typography>
      </View>
      <View style={styles.rowActions}>
        <IconButton icon={faEllipsisH} size="md" />
      </View>
    </Pressable>
  )
}

export default StoryList
