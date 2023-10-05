import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons"
import {NativeStackScreenProps} from "@react-navigation/native-stack"
import React, {useState} from "react"
import {ActivityIndicator, SafeAreaView, ScrollView, View} from "react-native"
import {useMutation, useQuery, useQueryClient} from "react-query"
import {StackParamsList} from "../../App"
import {getStory, postStoryNextPage} from "../../api/stories"
import IconButton from "../../components/base/IconButton"
import TextField from "../../components/base/TextField"
import Typography from "../../components/base/Typography"
import {styles} from "../styles"

export default function Reader(
  props: NativeStackScreenProps<StackParamsList, "Reader">,
) {
  let queryClient = useQueryClient()
  let storyQuery = useQuery({
    queryKey: ["stories", props.route.params.storyId],
    queryFn: () => getStory(props.route.params.storyId),
  })

  let postNextPageMutation = useMutation({
    mutationFn: (vars: {input: string}) =>
      postStoryNextPage(props.route.params.storyId, vars.input),
    onSuccess: data => {
      queryClient.invalidateQueries(["stories", props.route.params.storyId])
      props.navigation.push("Reader", {
        storyId: props.route.params.storyId,
        pageNumber: data.page_number,
      })
    },
  })
  let page = storyQuery.data
    ? storyQuery.data.pages[props.route.params.pageNumber - 1]
    : undefined
  let [userInput, setUserInput] = useState("")
  return (
    <SafeAreaView style={styles.root}>
      {storyQuery.isLoading && <ActivityIndicator />}
      {storyQuery.isSuccess && (
        <>
          <IconButton
            icon={faArrowUp}
            onPress={() => props.navigation.goBack()}
          />
          <Typography variant="header">
            {storyQuery.data!.title || "Untitled story"}
          </Typography>
          {storyQuery.data!.pages[props.route.params.pageNumber - 1] && (
            <>
              <Typography variant="base" color="secondary">
                {page.input ?? ""}
              </Typography>
              <ScrollView automaticallyAdjustKeyboardInsets style={styles.body}>
                <Typography variant="base">{page.output ?? ""}</Typography>
                <View style={{padding: 10}}>
                  <TextField
                    multiline
                    style={{fontSize: 18}}
                    onChangeText={text => {
                      setUserInput(text)
                    }}
                    value={userInput}
                    placeholder="What do you want to do?"
                  />
                </View>
              </ScrollView>
            </>
          )}
          <IconButton
            icon={faArrowDown}
            onPress={() => postNextPageMutation.mutate({input: userInput})}
          />
        </>
      )}
    </SafeAreaView>
  )
}
