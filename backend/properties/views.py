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


    # data = {
    #    "providers": {
    #         "Provider 1": {
    #             "Normalized Address":address,
    #             "Square Footage": 2165,
    #             "Lot Size (Acres)": 0.43,
    #             "Year Built": 1975,
    #             "Property Type": "Townhouse",
    #             "Bedrooms": 2,
    #             "Bathrooms": 2,
    #             "Room Count": 5,
    #             "Septic System": "Yes",
    #             "Sale Price": 350000,
    #         },
    #         "Provider 2": {
    #             "Normalized Address":address,
    #             "Square Footage": 2165,
    #             "Lot Size (Acres)": 0.43,
    #             "Year Built": 1975,
    #             "Property Type": "Townhouse",
    #             "Bedrooms": 2,
    #             "Bathrooms": 2,
    #             "Room Count": 5,
    #             "Septic System": "Yes",
    #             "Sale Price": 350000
    #         }
    #     }
    # }
    
    return JsonResponse(data)

# Create your views here.
