import {NativeStackScreenProps} from "@react-navigation/native-stack"
import React, {useEffect} from "react"
import {ActivityIndicator, SafeAreaView} from "react-native"
import {useQuery} from "react-query"
import {StackParamsList} from "../../App"
import {getStory} from "../../api/stories"
import Typography from "../../components/base/Typography"
import {styles} from "../styles"

export default function ReaderRouter(
  props: NativeStackScreenProps<StackParamsList, "ReaderRouter">,
) {
  let storyQuery = useQuery({
    queryKey: ["stories", props.route.params.storyId],
    queryFn: () => getStory(props.route.params.storyId),
  })

  useEffect(() => {
    if (storyQuery.isSuccess) {
      let lastPage = storyQuery.data.pages[-1]
      // if completed, go to intro page
      // if uncompleted & at least one page, go to last page
      // if uncompleted & no pages, go to create strory flow
      if (lastPage) {
        props.navigation.replace("Reader", {
          storyId: props.route.params.storyId,
          pageNumber: lastPage!.page_number,
        })
      } else {
        props.navigation.replace("ReaderIntro", {
          storyId: props.route.params.storyId,
        })
      }
    }
  }, [storyQuery, props.route.params.storyId, props.navigation])

  // TODO style loading and oops page
  return (
    <SafeAreaView style={styles.root}>
      {storyQuery.isLoading && <ActivityIndicator />}
      {storyQuery.isError && <Typography>Oops something went wrong</Typography>}
    </SafeAreaView>
  )
}
