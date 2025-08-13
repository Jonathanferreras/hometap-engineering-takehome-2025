import requests
from typing import Optional, Mapping, Any

class ApiService:
    def get_request(self, url: str, *, 
        # utilized ChatGPT to figure out to these properties from typing module in order to allow for flexible parameters
        # the idea is so that this api service can be used throughout the project and fit different use cases
        token: Optional[str] = None, 
        params: Optional[Mapping[str, Any]] = None
    ):
        data = None
        headers = {}
        params = {}

        if token:
            headers["X-API-KEY"] = token

        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
        except Exception as e:
                print(f"Something went wrong during GET request to {url}: {e}")


        return data