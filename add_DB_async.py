import asyncio
import aiohttp

DBurl="google.com"

async def add_DB(id:str):
    params={"id":id}
    async with aiohttp.ClientSession() as session:
        async with session.get(DBurl,params=params) as r:
            pass
    