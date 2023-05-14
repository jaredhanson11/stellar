import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.orderinglist import ordering_list
from sqlalchemy.orm import relationship

from . import base


class Story(base.Base):
    __tablename__ = "stories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    title = Column(String)
    # user_id = Column(UUID, ForeignKey("users.id"))
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(tz=timezone.utc)
    )

    themes = association_proxy(
        "_themes", "theme", creator=lambda theme: StoryToTheme(theme=theme)
    )
    _themes = relationship(
        "StoryToTheme",
        order_by="StoryToTheme.order",
        collection_class=ordering_list("order", reorder_on_append=True),
    )

    topics = association_proxy(
        "_topics", "topic", creator=lambda topic: StoryToTopic(topic=topic)
    )
    _topics = relationship(
        "StoryToTopic",
        order_by="StoryToTopic.order",
        collection_class=ordering_list("order", reorder_on_append=True),
    )

    additional_context = Column(String)

    pages = relationship(
        "Page",
        order_by="Page.page_number",
        collection_class=ordering_list(
            "page_number", reorder_on_append=True, count_from=1
        ),
    )


class Page(base.Base):
    __tablename__ = "pages"

    story_id = Column(UUID(as_uuid=True), ForeignKey("stories.id"), primary_key=True)
    page_number = Column(Integer, primary_key=True)

    input = Column(String)
    output = Column(String)

    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(tz=timezone.utc)
    )


class StoryToTheme(base.Base):
    __tablename__ = "stories_to_themes"
    story_id = Column(UUID(as_uuid=True), ForeignKey("stories.id"), primary_key=True)
    story = relationship("Story")
    theme_id = Column(UUID(as_uuid=True), ForeignKey("themes.id"), primary_key=True)
    theme = relationship("Theme")
    order = Column(Integer, primary_key=True)


class Theme(base.Base):
    __tablename__ = "themes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    theme = Column(String, nullable=False)


class StoryToTopic(base.Base):
    __tablename__ = "stories_to_topics"
    story_id = Column(UUID(as_uuid=True), ForeignKey("stories.id"), primary_key=True)
    story = relationship("Story")
    topic_id = Column(UUID(as_uuid=True), ForeignKey("topics.id"), primary_key=True)
    topic = relationship("Topic")
    order = Column(Integer, primary_key=True)


class Topic(base.Base):
    __tablename__ = "topics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    topic = Column(String, nullable=False)
