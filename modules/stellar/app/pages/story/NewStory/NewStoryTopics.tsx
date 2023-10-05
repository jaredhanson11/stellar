import {NativeStackScreenProps} from "@react-navigation/native-stack"
import React from "react"
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native"
import {useMutation, useQuery, useQueryClient} from "react-query"
import {NewStoryStackParamsList} from "."
import {
  TopicModel,
  deleteStoryTopic,
  getStory,
  getTopics,
  postStoryTopic,
} from "../../../api/stories"
import PageHeader from "../../../components/PageHeader"
import Button from "../../../components/base/Button"
import {styles} from "../../styles"

const pageStyles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 8,
  },
  row: {display: "flex", gap: 8, flexWrap: "nowrap", flexDirection: "row"},
  button: {
    flex: 1,
  },
})

export default function NewStoryTopics(
  props: NativeStackScreenProps<NewStoryStackParamsList, "Topics">,
) {
  let queryClient = useQueryClient()
  let storyQuery = useQuery({
    queryKey: ["stories", props.route.params.storyId],
    queryFn: () => getStory(props.route.params.storyId),
  })
  let topicsQuery = useQuery({
    queryKey: ["topics"],
    queryFn: getTopics,
  })
  let postStoryTopicMutation = useMutation({
    mutationFn: (args: {topicId: string}) =>
      postStoryTopic(props.route.params.storyId, args.topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories", props.route.params.storyId],
      })
    },
  })
  let deleteStoryTopicMutation = useMutation({
    mutationFn: (args: {topicId: string}) =>
      deleteStoryTopic(props.route.params.storyId, args.topicId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories", props.route.params.storyId],
      })
    },
  })
  function hasTopic(topic: TopicModel) {
    return (
      storyQuery.data &&
      storyQuery.data.topics.map(_topic => _topic.id).includes(topic.id)
    )
  }
  return (
    <View style={styles.root}>
      <PageHeader>
        <PageHeader.Header variant="base">
          Select topics for your story
        </PageHeader.Header>
      </PageHeader>
      <View style={[styles.body, styles.bodyPadded]}>
        <ScrollView>
          <View style={pageStyles.container}>
            {topicsQuery.isLoading && <ActivityIndicator />}
            {topicsQuery.isSuccess &&
              topicsQuery.data.map((topic, i, topics) => {
                if (i % 2 !== 0) {
                  return
                } else {
                  let topic2 = topics[i + 1]
                  return (
                    <View style={pageStyles.row} key={topic.id}>
                      <Button
                        variant={hasTopic(topic) ? "filled" : "outlined"}
                        onPress={
                          hasTopic(topic)
                            ? () =>
                                deleteStoryTopicMutation.mutate({
                                  topicId: topic.id,
                                })
                            : () =>
                                postStoryTopicMutation.mutate({
                                  topicId: topic.id,
                                })
                        }
                        style={pageStyles.button}
                        typographyProps={{variant: "sm"}}>
                        {topic.topic}
                      </Button>
                      {topic2 && (
                        <Button
                          variant={hasTopic(topic2) ? "filled" : "outlined"}
                          onPress={
                            hasTopic(topic2)
                              ? () =>
                                  deleteStoryTopicMutation.mutate({
                                    topicId: topic2!.id,
                                  })
                              : () =>
                                  postStoryTopicMutation.mutate({
                                    topicId: topic2!.id,
                                  })
                          }
                          style={pageStyles.button}
                          typographyProps={{variant: "sm"}}>
                          {topic2.topic}
                        </Button>
                      )}
                    </View>
                  )
                }
              })}
          </View>
        </ScrollView>
      </View>
      <View style={[styles.footer, styles.footerPadded]}>
        <Button
          onPress={() => {
            props.navigation.push("Context", {
              storyId: props.route.params.storyId,
            })
          }}>
          Next
        </Button>
      </View>
    </View>
  )
}
