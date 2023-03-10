"""empty message

Revision ID: 53dbe6f09ad5
Revises: b077d92975d5
Create Date: 2022-12-27 04:56:15.578299

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '53dbe6f09ad5'
down_revision = 'b077d92975d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('is_active',
               existing_type=sa.BOOLEAN(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('is_active',
               existing_type=sa.BOOLEAN(),
               nullable=False)

    # ### end Alembic commands ###
