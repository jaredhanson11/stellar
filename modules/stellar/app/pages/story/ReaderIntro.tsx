import {faArrowDown} from "@fortawesome/free-solid-svg-icons"
import {NativeStackScreenProps} from "@react-navigation/native-stack"
import React from "react"
import {SafeAreaView, View} from "react-native"
import {StackParamsList} from "../../App"
import IconButton from "../../components/base/IconButton"
import Typography from "../../components/base/Typography"

export default function ReaderIntro(
  props: NativeStackScreenProps<StackParamsList, "ReaderIntro">,
) {
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
      <View></View>
      <View>
        <Typography variant="title">Jimmy's Space Adventure</Typography>
        <Typography variant="base" color="secondary">
          By: Lily Curtis
        </Typography>
        <Typography variant="base" color="secondary">
          10 pages
        </Typography>
      </View>
      <View style={{display: "flex", width: "100%", justifyContent: "center"}}>
        <View>
          <IconButton
            icon={faArrowDown}
            onPress={() =>
              props.navigation.navigate("Reader", {
                storyId: props.route.params.storyId,
                pageNumber: 1,
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
