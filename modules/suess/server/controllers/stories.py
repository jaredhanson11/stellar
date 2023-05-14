from uuid import UUID

from flask_restful import Resource
from webargs import fields
from webargs.flaskparser import use_args

from .. import api, db
from ..managers import GPTStoryManager, StoryManager
from ..models.stories import PageSchema, StorySchema, ThemeSchema, TopicSchema
from ..web import responses
from ..web.exceptions import SuessException

story_manager = StoryManager(db.session)


class StoriesController(Resource):
    def get(self):
        stories = story_manager.get_stories()
        return responses.success(StorySchema().dump(obj=stories, many=True))

    @use_args(StorySchema, location="json")
    def post(self, post_args: dict):
        story = story_manager.create_story(**post_args)
        db.session.commit()
        return responses.success(StorySchema().dump(obj=story), 201)


api.add_resource(StoriesController, "/api/v1.0/stories")


class StoryController(Resource):
    def get(self, story_id: UUID):
        story = story_manager.get_story(story_id)
        return responses.success(StorySchema().dump(obj=story))

    @use_args(StorySchema, location="json")
    def patch(self, patch_data: dict, story_id: UUID):
        story = story_manager.get_story(story_id)
        for field in patch_data:
            setattr(story, field, patch_data[field])
        db.session.commit()
        return responses.success(StorySchema().dump(obj=story))


api.add_resource(StoryController, "/api/v1.0/stories/<uuid:story_id>")


class StoryThemesController(Resource):
    @use_args({"theme_id": fields.UUID(required=True)})
    def post(self, post_data: dict, story_id: UUID):
        theme_id = post_data["theme_id"]
        story_manager.create_story_theme(story_id, theme_id)
        db.session.commit()
        return responses.success({"message": "Successfully created"}, 201)


api.add_resource(StoryThemesController, "/api/v1.0/stories/<uuid:story_id>/themes")


class StoryThemeController(Resource):
    def delete(self, story_id: UUID, theme_id: UUID):
        story_manager.remove_story_theme(story_id, theme_id)
        db.session.commit()
        return responses.success({"message": "Successfully deleted"}, 204)


api.add_resource(
    StoryThemeController, "/api/v1.0/stories/<uuid:story_id>/themes/<uuid:theme_id>"
)


class StoryTopicsController(Resource):
    @use_args({"topic_id": fields.UUID(required=True)})
    def post(self, post_data: dict, story_id: UUID):
        topic_id = post_data["topic_id"]
        story_manager.create_story_topic(story_id, topic_id)
        db.session.commit()
        return responses.success({"message": "Successfully created"}, 201)


api.add_resource(StoryTopicsController, "/api/v1.0/stories/<uuid:story_id>/topics")


class StoryTopicController(Resource):
    def delete(self, story_id: UUID, topic_id: UUID):
        story_manager.remove_story_topic(story_id, topic_id)
        db.session.commit()
        return responses.success({"message": "Successfully deleted"}, 204)


api.add_resource(
    StoryTopicController, "/api/v1.0/stories/<uuid:story_id>/topics/<uuid:topic_id>"
)


class StoryPagesController(Resource):
    @use_args(PageSchema, location="json")
    def post(self, post_args: dict, story_id: str):
        story = story_manager.get_story(story_id)
        page_input = post_args.get("input")
        if len(story.pages) > 0 and not page_input:
            raise SuessException(400, "input is required to generate the next page")
        elif len(story.pages) == 0:
            if page_input:
                raise SuessException(
                    400, "input is forbidden to generate the first page of a story"
                )
            page_input = "Let's get started"

        gpt_manager = GPTStoryManager(story)
        gpt_output = gpt_manager.get_next_page(page_input)
        next_page = story_manager.create_page(story_id, page_input, gpt_output)
        db.session.commit()
        return responses.success(PageSchema().dump(obj=next_page))


api.add_resource(StoryPagesController, "/api/v1.0/stories/<uuid:story_id>/pages")


class ThemesController(Resource):
    def get(self):
        themes = story_manager.get_themes()
        return responses.success(ThemeSchema().dump(obj=themes, many=True))


api.add_resource(ThemesController, "/api/v1.0/themes")


class TopicsController(Resource):
    def get(self):
        topics = story_manager.get_topics()
        return responses.success(TopicSchema().dump(obj=topics, many=True))


api.add_resource(TopicsController, "/api/v1.0/topics")
