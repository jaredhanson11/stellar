"""Initial migration

Revision ID: be1ccef76852
Revises: 
Create Date: 2023-05-13 20:48:39.007977

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = 'be1ccef76852'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('stories',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('additional_context', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_stories'))
    )
    op.create_table('themes',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('theme', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_themes'))
    )
    op.create_table('topics',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('topic', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_topics'))
    )
    op.create_table('pages',
    sa.Column('story_id', sa.UUID(), nullable=False),
    sa.Column('page_number', sa.Integer(), nullable=False),
    sa.Column('input', sa.String(), nullable=True),
    sa.Column('output', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], name=op.f('fk_pages_story_id_stories')),
    sa.PrimaryKeyConstraint('story_id', 'page_number', name=op.f('pk_pages'))
    )
    op.create_table('stories_to_themes',
    sa.Column('story_id', sa.UUID(), nullable=False),
    sa.Column('theme_id', sa.UUID(), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], name=op.f('fk_stories_to_themes_story_id_stories')),
    sa.ForeignKeyConstraint(['theme_id'], ['themes.id'], name=op.f('fk_stories_to_themes_theme_id_themes')),
    sa.PrimaryKeyConstraint('story_id', 'theme_id', 'order', name=op.f('pk_stories_to_themes'))
    )
    op.create_table('stories_to_topics',
    sa.Column('story_id', sa.UUID(), nullable=False),
    sa.Column('topic_id', sa.UUID(), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], name=op.f('fk_stories_to_topics_story_id_stories')),
    sa.ForeignKeyConstraint(['topic_id'], ['topics.id'], name=op.f('fk_stories_to_topics_topic_id_topics')),
    sa.PrimaryKeyConstraint('story_id', 'topic_id', 'order', name=op.f('pk_stories_to_topics'))
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('stories_to_topics')
    op.drop_table('stories_to_themes')
    op.drop_table('pages')
    op.drop_table('topics')
    op.drop_table('themes')
    op.drop_table('stories')
    # ### end Alembic commands ###
