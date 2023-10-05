import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import React from "react"
import {SafeAreaView, StyleSheet} from "react-native"
import {QueryClientProvider} from "react-query"
import {queryClient} from "./api"
import Library from "./pages/Library"
import NewStory from "./pages/story/NewStory"
import Reader from "./pages/story/Reader"
import ReaderIntro from "./pages/story/ReaderIntro"
import ReaderRouter from "./pages/story/ReaderRouter"
import theme from "./theme"

const appStyles = StyleSheet.create({
  root: {
    backgroundColor: theme.color.background,
    height: "100%",
    width: "100%",
  },
})

export type StackParamsList = {
  Library: undefined
  ReaderRouter: {storyId: string}
  ReaderIntro: {storyId: string}
  Reader: {storyId: string; pageNumber: number}
  NewStory: {storyId: string}
}

const Stack = createNativeStackNavigator<StackParamsList>()

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <SafeAreaView style={appStyles.root}>
          <Stack.Navigator
            initialRouteName="Library"
            screenOptions={{
              headerShown: false,
              contentStyle: {backgroundColor: theme.color.background},
            }}>
            <Stack.Screen name="Library" component={Library} />
            <Stack.Screen name="ReaderRouter" component={ReaderRouter} />
            <Stack.Screen name="Reader" component={Reader} />
            <Stack.Screen name="ReaderIntro" component={ReaderIntro} />
            <Stack.Screen name="NewStory" component={NewStory} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

export default App
