from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static  # <-- required for media

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('cakes/', include('cake.urls')),
    path('api/feedback/', include('feedback.urls')),  # 👈 Properly routes /api/feedback/ requests
    path('api/contact/', include('contact.urls')),  # Add contact URLs here
    path('orders/', include('orders.urls')),
    path('cake-orders/', include('cake_orders.urls')),


]

# 👇 Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
