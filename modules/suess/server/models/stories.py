from datetime import timezone

from marshmallow import Schema, fields


class StorySchema(Schema):
    id = fields.UUID(dump_only=True)

    title = fields.String(allow_none=True)
    additional_context = fields.String(allow_none=True)
    created_at = fields.AwareDateTime(default_timezone=timezone.utc, dump_only=True)

    themes = fields.Nested("ThemeSchema", dump_only=True, many=True)
    topics = fields.Nested("TopicSchema", dump_only=True, many=True)
    pages = fields.Nested("PageSchema", dump_only=True, many=True)


class PageSchema(Schema):
    story_id = fields.UUID(dump_only=True)
    page_number = fields.UUID(dump_only=True)
    input = fields.String()
    output = fields.String(dump_only=True)
    created_at = fields.AwareDateTime(default_timezone=timezone.utc, dump_only=True)


class ThemeSchema(Schema):
    id = fields.UUID(dump_only=True)
    theme = fields.String()


class TopicSchema(Schema):
    id = fields.UUID(dump_only=True)
    topic = fields.String()
