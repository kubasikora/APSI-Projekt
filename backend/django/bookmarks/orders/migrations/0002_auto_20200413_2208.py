# Generated by Django 3.0.5 on 2020-04-13 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='coord_x',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='order',
            name='coord_y',
            field=models.FloatField(default=0),
        ),
    ]
