import {NativeStackScreenProps} from "@react-navigation/native-stack"
import React, {useEffect, useState} from "react"
import {StyleSheet, View} from "react-native"
import {useMutation, useQuery, useQueryClient} from "react-query"
import {NewStoryStackParamsList} from "."
import {getStory, patchStory} from "../../../api/stories"
import PageHeader from "../../../components/PageHeader"
import Button from "../../../components/base/Button"
import TextField from "../../../components/base/TextField"
import {styles} from "../../styles"

const pageStyles = StyleSheet.create({
  textFieldContainer: {
    paddingBottom: 400,
  },
  textField: {
    flexGrow: 1,
    height: "100%",
  },
})

export default function NewStoryContext(
  props: NativeStackScreenProps<NewStoryStackParamsList, "Themes">,
) {
  let queryClient = useQueryClient()
  let storyQuery = useQuery({
    queryKey: ["stories", props.route.params.storyId],
    queryFn: () => getStory(props.route.params.storyId),
  })
  let updateStoryContextMutation = useMutation({
    mutationFn: (args: {additionalContext: string}) =>
      patchStory(props.route.params.storyId, {
        additional_context: args.additionalContext,
      }),
    onSuccess: data => {
      queryClient.setQueryData(["stories", props.route.params.storyId], data)
      props.navigation.push("ReaderIntro", {
        storyId: props.route.params.storyId,
      })
    },
  })
  let [additionalContext, setAdditionalContext] = useState("")
  useEffect(() => {
    setAdditionalContext(storyQuery.data?.additional_context ?? "")
  }, [storyQuery.data?.additional_context])
  return (
    <View style={styles.root}>
      <PageHeader>
        <PageHeader.Header variant="base">
          Provide additional context for your story
        </PageHeader.Header>
      </PageHeader>
      <View style={[styles.body, styles.bodyPadded]}>
        <View style={pageStyles.textFieldContainer}>
          <TextField
            style={pageStyles.textField}
            placeholder="What else would you like to include in your story?"
            value={additionalContext}
            onChangeText={setAdditionalContext}
          />
        </View>
      </View>
      <View style={[styles.footer, styles.footerPadded]}>
        <Button
          onPress={() => {
            updateStoryContextMutation.mutate({additionalContext})
          }}>
          Next
        </Button>
      </View>
    </View>
  )
}
