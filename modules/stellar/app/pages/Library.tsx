import {faUser} from "@fortawesome/free-regular-svg-icons"
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import {NativeStackScreenProps} from "@react-navigation/native-stack"
import React from "react"
import {ActivityIndicator, SafeAreaView, ScrollView} from "react-native"
import {useMutation, useQuery} from "react-query"
import * as timeago from "timeago.js"
import {StackParamsList} from "../App"
import {getStories, postStories} from "../api/stories"
import PageHeader from "../components/PageHeader"
import Button from "../components/base/Button"
import IconButton from "../components/base/IconButton"
import StoryList from "../components/library/StoryList"
import {styles} from "./styles"

export default function Library(
  props: NativeStackScreenProps<StackParamsList, "Library">,
) {
  let storiesQuery = useQuery({queryKey: ["stories"], queryFn: getStories})
  let postNewStoryMutation = useMutation({
    mutationFn: () => postStories({}),
    onSuccess: data =>
      props.navigation.navigate("NewStory", {storyId: data.id}),
  })
  return (
    <SafeAreaView style={styles.root}>
      <PageHeader>
        <PageHeader.Header>Library</PageHeader.Header>
        <IconButton onPress={() => alert("hell")} icon={faUser} size="lg" />
      </PageHeader>
      <ScrollView style={styles.body}>
        <StoryList>
          {storiesQuery.isLoading && <ActivityIndicator />}
          {storiesQuery.isSuccess &&
            storiesQuery.data.map(story => (
              <StoryList.Row
                onPress={() =>
                  props.navigation.navigate("ReaderRouter", {storyId: story.id})
                }
                key={story.id}
                title={story.title ?? ""}
                subtitle={timeago.format(
                  story.created_at ? new Date(story.created_at) : "",
                )}
              />
            ))}
        </StoryList>
      </ScrollView>
      <Button
        startIcon={faPlus}
        onPress={() => {
          postNewStoryMutation.mutate()
        }}>
        New Story
      </Button>
    </SafeAreaView>
  )
}
