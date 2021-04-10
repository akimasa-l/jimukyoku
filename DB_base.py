import json

import requests

DBurl = "google.com"


def add_DB(id: str):
    params = {"id": id}
    requests.post(DBurl, params=params)


async def get_DB():
    response = requests.get(DBurl)
    return json.loads(response)
