from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin


class UserAdmin(DefaultUserAdmin):
    list_display = ('username', 'first_name', 'last_name',
                    'is_staff', 'is_superuser', 'is_active')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'first_name', 'last_name')
