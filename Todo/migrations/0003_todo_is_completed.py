# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Todo', '0002_todo_is_deleted'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
    ]
