import {stellarAxios} from "."

type StoryModel = {
  id: string
  created_at?: string
  title?: string
  pages: PageModel[]
  themes: ThemeModel[]
  topics: TopicModel[]
  additional_context?: string
}

type PageModel = {
  id: string
  created_at?: string
  page_number: number
  input: string
  output: string
}

export type ThemeModel = {
  id: string
  theme: string
}

export type TopicModel = {
  id: string
  topic: string
}

export function getStories() {
  return stellarAxios<StoryModel[]>({
    url: "/api/v1.0/stories",
    method: "GET",
  })
}

export function postStories(init: Pick<StoryModel, "title">) {
  return stellarAxios<StoryModel>({
    url: `/api/v1.0/stories`,
    method: "POST",
    data: JSON.stringify(init),
  })
}

export function getStory(id: string) {
  return stellarAxios<StoryModel>({
    url: `/api/v1.0/stories/${id}`,
    method: "GET",
  })
}

export function patchStory(
  id: string,
  update: Pick<StoryModel, "title" | "additional_context">,
) {
  return stellarAxios<StoryModel>({
    url: `/api/v1.0/stories/${id}`,
    method: "PATCH",
    data: JSON.stringify(update),
  })
}

export function postStoryTheme(storyId: string, themeId: string) {
  return stellarAxios<string>({
    url: `/api/v1.0/stories/${storyId}/themes`,
    method: "POST",
    data: JSON.stringify({theme_id: themeId}),
  })
}

export function deleteStoryTheme(storyId: string, themeId: string) {
  return stellarAxios<string>({
    url: `/api/v1.0/stories/${storyId}/themes/${themeId}`,
    method: "DELETE",
  })
}

export function postStoryTopic(storyId: string, topicId: string) {
  return stellarAxios<string>({
    url: `/api/v1.0/stories/${storyId}/topics`,
    method: "POST",
    data: JSON.stringify({topic_id: topicId}),
  })
}
export function deleteStoryTopic(storyId: string, topicId: string) {
  return stellarAxios<string>({
    url: `/api/v1.0/stories/${storyId}/themes/${topicId}`,
    method: "DELETE",
  })
}

export function postStoryFirstPage(id: string) {
  return stellarAxios<PageModel>({
    url: `/api/v1.0/stories/${id}/pages`,
    method: "POST",
  })
}

export function postStoryNextPage(id: string, input: string) {
  return stellarAxios<PageModel>({
    url: `/api/v1.0/stories/${id}/pages`,
    method: "POST",
    data: JSON.stringify({input}),
  })
}

export function getThemes() {
  return stellarAxios<ThemeModel[]>({
    url: `/api/v1.0/themes`,
    method: "GET",
  })
}

export function getTopics() {
  return stellarAxios<TopicModel[]>({
    url: `/api/v1.0/topics`,
    method: "GET",
  })
}
