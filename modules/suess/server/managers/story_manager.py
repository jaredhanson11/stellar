import typing
from uuid import UUID

from sqlalchemy.orm import Session

from ..database.stories import Page, Story, Theme, Topic
from ..web.exceptions import SuessException


class StoryManager:
    session: Session

    def __init__(self, session: Session):
        self.session = session

    def get_story(self, story_id: UUID) -> Story:
        """Get a story by it's id.
        Raises error if story doesn't exist

        Args:
            story_id (UUID): UUID
        """
        story = self.session.query(Story).get(story_id)
        if not story:
            raise SuessException(404, f"Story not found with id=<{story_id}>.")
        return story

    def get_stories(self) -> typing.List[Story]:
        """Returns list of stories"""
        stories = self.session.query(Story).all()
        return stories

    def create_story(self, title: str = None) -> Story:
        """Creates a story"""
        story = Story()
        story.title = title
        self.session.add(story)
        return story

    def create_story_theme(self, story_id: UUID, theme_id: UUID) -> None:
        """Adds a theme to a story.

        Args:
            story_id (UUID): ID of the target story
            theme_id (UUID): ID of the target theme
        """
        story = self.get_story(story_id)
        theme = self.get_theme(theme_id)
        story.themes.append(theme)

    def remove_story_theme(self, story_id: UUID, theme_id: UUID) -> None:
        """Removes a theme from a story if theme exists on story.

        Args:
            story_id (UUID): ID of the target story
            theme_id (UUID): ID of the target theme
        """
        story = self.get_story(story_id)
        theme = self.get_theme(theme_id)
        if theme in story.themes:
            story.themes.remove(theme)

    def create_story_topic(self, story_id: UUID, topic_id: UUID) -> None:
        """Adds a topic to a story.

        Args:
            story_id (UUID): ID of the target story
            topic_id (UUID): ID of the target topic
        """
        story = self.get_story(story_id)
        topic = self.get_topic(topic_id)
        story.topics.append(topic)

    def remove_story_topic(self, story_id: UUID, topic_id: UUID) -> None:
        """Removes a topic from a story if theme exists on story.

        Args:
            story_id (UUID): ID of the target story
            topic_id (UUID): ID of the target topic
        """
        story = self.get_story(story_id)
        topic = self.get_theme(topic_id)
        if topic in story.topics:
            story.topics.remove(topic)

    def get_page(self, story_id: UUID, page_number: int) -> Page:
        """Gets page for page_number and story provided

        Args:
            story_id (UUID): ID of the story
            page_number (int): page number

        Raises:
            SuessException: if page can't be found
        """
        page = self.session.query(Page).get(
            {"story_id": story_id, "page_number": page_number}
        )
        if not page:
            raise SuessException(
                404,
                f"Page not found for story_id=<{story_id}> page_number=<{page_number}>",
            )
        return page

    def create_page(self, story_id: UUID, input: str, output: str) -> Page:
        """Creates a page given user input to start the page.

        Args:
            story_id (UUID): story to create page for
            input (str): user input for the prompt of the page
            output (str): GPT generated step in the story

        Returns:
            Page: _description_
        """
        story = self.get_story(story_id)
        page = Page()
        page.input = input
        page.output = output
        story.pages.append(page)
        return page

    def get_topic(self, topic_id: UUID):
        """Get a topic by it's id.
        Raises error if topic doesn't exist

        Args:
            topic_id(UUID): UUID
        """
        topic = self.session.query(Topic).get(topic_id)
        if not topic:
            raise SuessException(404, f"Topic not found with id=<{topic_id}>.")

    def get_topics(self):
        """Gets all topics"""
        topics = self.session.query(Topic).all()
        return topics

    def get_theme(self, theme_id: UUID):
        """Get a theme by it's id.
        Raises error if theme doesn't exist

        Args:
            theme_id(UUID): UUID
        """
        theme = self.session.query(Theme).get(theme_id)
        if not theme:
            raise SuessException(404, f"Theme not found with id=<{theme_id}>.")

    def get_themes(self):
        """Gets all themes"""
        themes = self.session.query(Theme).all()
        return themes
