from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings

from .services.property.property_service import PropertyService
from .services.property.property_provider_config import PropertyProviderConfig

def property_view(request):
    address = request.GET.get('address')

    if not address:
        return JsonResponse({"error": "Address is required"}, status=400)

    provider_config = PropertyProviderConfig()
    service = PropertyService(provider_config)
    data = service.query_providers(address)
    
    return JsonResponse(data)

# Create your views here.
