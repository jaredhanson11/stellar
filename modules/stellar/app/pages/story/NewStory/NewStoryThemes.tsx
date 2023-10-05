import {NativeStackScreenProps} from "@react-navigation/native-stack"
import React from "react"
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native"
import {useMutation, useQuery, useQueryClient} from "react-query"
import {NewStoryStackParamsList} from "."
import {
  ThemeModel,
  deleteStoryTheme,
  getStory,
  getThemes,
  postStoryTheme,
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

export default function NewStoryThemes(
  props: NativeStackScreenProps<NewStoryStackParamsList, "Themes">,
) {
  let queryClient = useQueryClient()
  let storyQuery = useQuery({
    queryKey: ["stories", props.route.params.storyId],
    queryFn: () => getStory(props.route.params.storyId),
  })
  let themesQuery = useQuery({
    queryKey: ["themes"],
    queryFn: getThemes,
  })
  let postStoryThemeMutation = useMutation({
    mutationFn: (args: {themeId: string}) =>
      postStoryTheme(props.route.params.storyId, args.themeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories", props.route.params.storyId],
      })
    },
  })
  let deleteStoryThemeMutation = useMutation({
    mutationFn: (args: {themeId: string}) =>
      deleteStoryTheme(props.route.params.storyId, args.themeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories", props.route.params.storyId],
      })
    },
  })
  function hasTheme(theme: ThemeModel) {
    return (
      storyQuery.data &&
      storyQuery.data.themes.map(_theme => _theme.id).includes(theme.id)
    )
  }
  return (
    <View style={styles.root}>
      <PageHeader>
        <PageHeader.Header variant="base">
          Select themes for your story
        </PageHeader.Header>
      </PageHeader>
      <View style={[styles.body, styles.bodyPadded]}>
        <ScrollView>
          <View style={pageStyles.container}>
            {themesQuery.isLoading && <ActivityIndicator />}
            {themesQuery.isSuccess &&
              themesQuery.data.map((theme, i, themes) => {
                if (i % 2 !== 0) {
                  return
                } else {
                  let theme2 = themes[i + 1]
                  return (
                    <View style={pageStyles.row} key={theme.id}>
                      <Button
                        variant={hasTheme(theme) ? "filled" : "outlined"}
                        onPress={
                          hasTheme(theme)
                            ? () =>
                                deleteStoryThemeMutation.mutate({
                                  themeId: theme.id,
                                })
                            : () =>
                                postStoryThemeMutation.mutate({
                                  themeId: theme.id,
                                })
                        }
                        style={pageStyles.button}
                        typographyProps={{variant: "sm"}}>
                        {theme.theme}
                      </Button>
                      {theme2 && (
                        <Button
                          variant={hasTheme(theme2) ? "filled" : "outlined"}
                          onPress={
                            hasTheme(theme2)
                              ? () =>
                                  deleteStoryThemeMutation.mutate({
                                    themeId: theme2!.id,
                                  })
                              : () =>
                                  postStoryThemeMutation.mutate({
                                    themeId: theme2!.id,
                                  })
                          }
                          style={pageStyles.button}
                          typographyProps={{variant: "sm"}}>
                          {theme2.theme}
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
            props.navigation.push("Topics", {
              storyId: props.route.params.storyId,
            })
          }}>
          Next
        </Button>
      </View>
    </View>
  )
}
