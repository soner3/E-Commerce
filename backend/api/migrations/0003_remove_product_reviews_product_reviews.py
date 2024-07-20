# Generated by Django 5.0.7 on 2024-07-20 16:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_alter_product_thumbnail"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="product",
            name="reviews",
        ),
        migrations.AddField(
            model_name="product",
            name="reviews",
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to="api.review"
            ),
        ),
    ]
