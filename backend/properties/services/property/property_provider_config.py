import os

class PropertyProviderConfig:
    def __init__(self):
        self.providers = [
            {
                "name": "Provider 1",
                "url": os.getenv("PROVIDER_1_BASE_URL", ""),
                "key": os.getenv("PROVIDER_1_API_KEY", ""),
                "mapping": {
                    "formattedAddress":{
                        "map_to": "normalizedAddress",
                    },
                    "squareFootage": {
                        "map_to": "squareFootage"
                    },
                    "lotSizeSqFt": {
                        "map_to": "lotSize",
                        "transform": lambda v: round(v / 43560, 2)
                    },
                    "yearBuilt": {
                        "map_to": "yearBuilt"
                    },
                    "propertyType": {
                        "map_to": "propertyType"
                    },
                    "bedrooms": {
                        "map_to": "bedrooms"
                    },
                    "bathrooms": {
                        "map_to": "bathrooms"
                    },
                    "features.roomCount": {
                        "map_to": "roomCount"
                    },
                    "features.septicSystem": {
                        "map_to": "septicSystem",
                        "transform": lambda v: "Yes" if v is True else "No"
                    },
                    "lastSalePrice": {
                        "map_to": "salePrice",
                        "fallback": "history"
                    }
                }
            },
            {
                "name": "Provider 2",
                "url": os.getenv("PROVIDER_2_BASE_URL", ""),
                "key": os.getenv("PROVIDER_2_API_KEY", ""),
                "mapping": {
                    "NormalizedAddress":{
                        "map_to": "normalizedAddress",
                    },
                    "SquareFootage": {
                        "map_to": "squareFootage"
                    },
                    "LotSizeAcres": {
                        "map_to": "lotSize",
                    },
                    "YearConstructed": {
                        "map_to": "yearBuilt"
                    },
                    "PropertyType": {
                        "map_to": "propertyType"
                    },
                    "Bedrooms": {
                        "map_to": "bedrooms"
                    },
                    "Bathrooms": {
                        "map_to": "bathrooms"
                    },
                    "RoomCount": {
                        "map_to": "roomCount"
                    },
                    "SepticSystem": {
                        "map_to": "septicSystem",
                        "transform": lambda v: "Yes" if v is True else "No"
                    },
                    "SalePrice": {
                        "map_to": "salePrice",
                        "fallback": "LastSalePrice"
                    }
                }
            }
        ]