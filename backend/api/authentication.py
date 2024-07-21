from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User

class MyShopAuthentication(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get('username')
        user = None

        # Suche nach Benutzername
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            # Suche nach E-Mail-Adresse
            try:
                user = User.objects.get(email=username)
            except User.DoesNotExist:
                return None

        if user and user.check_password(password):
            return user
        return None