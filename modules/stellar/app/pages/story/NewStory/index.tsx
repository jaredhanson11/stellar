import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack"
import React from "react"
import {SafeAreaView} from "react-native"
import {useMutation, useQueryClient} from "react-query"
import {StackParamsList} from "../../../App"
import {postStoryFirstPage} from "../../../api/stories"
import theme from "../../../theme"
import {styles} from "../../styles"
import NewStoryContext from "./NewStoryContext"
import NewStoryThemes from "./NewStoryThemes"
import NewStoryTopics from "./NewStoryTopics"

export type NewStoryStackParamsList = {
  Themes: {storyId: string}
  Topics: {storyId: string}
  Context: {storyId: string}
} & StackParamsList
const Stack = createNativeStackNavigator<NewStoryStackParamsList>()

export default function NewStory(
  props: NativeStackScreenProps<StackParamsList, "NewStory">,
) {
  let queryClient = useQueryClient()
  let postFirstPageMutation = useMutation({
    mutationFn: () => postStoryFirstPage(props.route.params.storyId),
    onSuccess: () => {
      queryClient.invalidateQueries(["stories", props.route.params.storyId])
      props.navigation.push("ReaderRouter", {
        storyId: props.route.params.storyId,
      })
    },
  })
  return (
    <SafeAreaView style={styles.root}>
      <Stack.Navigator
        initialRouteName="Themes"
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: theme.color.background},
        }}>
        <Stack.Screen
          name="Themes"
          component={NewStoryThemes}
          initialParams={{storyId: props.route.params.storyId}}
        />
        <Stack.Screen
          name="Topics"
          component={NewStoryTopics}
          initialParams={{storyId: props.route.params.storyId}}
        />
        <Stack.Screen
          name="Context"
          component={NewStoryContext}
          initialParams={{storyId: props.route.params.storyId}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  )
}
