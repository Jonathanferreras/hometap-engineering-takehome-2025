from ..api.api_service import ApiService

class PropertyService:
    def __init__(self, provider_config):
        self.api = ApiService()
        self.providers = provider_config.providers
    
    def query_providers(self, address):
        result = {}
        data_set = {}

        for index, provider in enumerate(self.providers):
            name = provider["name"]
            url = provider["url"]
            key = provider["key"]

            if not url and not key:
                continue

            response = self.api.get_request(
                url, 
                token=key,
                params={"address": address}
            )

            if response:
                data_set[name] = response["data"]

        result = self.normalize_data_set(data_set)
        
        return result

    def normalize_data_set(self, data_set):
        normalized_data_set = {}

        for provider in self.providers:
            normalized_data = {}
            provider_name = provider["name"]
            provider_data = data_set[provider_name]
            provider_mapping = provider["mapping"]

            for field, mapping in provider_mapping.items():
                if field in provider_mapping:
                    key = mapping["map_to"]

                    if "." in field:
                        nested_fields = field.split(".")
                        value = provider_data

                        for nested_field in nested_fields:
                            value = value[nested_field]
                    else:
                        value = provider_data[field]
                            
                    if "fallback" in mapping and value is None:
                        value = provider_data[mapping["fallback"]]

                    if "transform" in mapping:
                        value = mapping["transform"](value)

                    normalized_data[key] = value

            normalized_data_set[provider_name] = normalized_data

        return normalized_data_set