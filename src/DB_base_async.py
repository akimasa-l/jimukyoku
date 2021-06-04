import asyncio
import json

import aiohttp

DBurl = "google.com"


async def add_DB(id: str):
    params = {"id": id}
    async with aiohttp.ClientSession() as session:
        async with session.post(DBurl, params=params) as r:
            pass


async def get_DB():
    async with aiohttp.ClientSession() as session:
        async with session.get(DBurl) as r:
            text = r.text()
    return json.loads(text)
