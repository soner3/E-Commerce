# Generated by Django 5.0.7 on 2024-07-20 16:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_remove_review_product_product_reviews"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="product",
            name="reviews",
        ),
        migrations.AddField(
            model_name="review",
            name="product",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="reviews",
                to="api.product",
            ),
        ),
    ]