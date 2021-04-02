import discord
import aiohttp
import print_pdf

with open("../discord/token.txt") as f:
    token=f.read().rstrip()

print(token)

client = discord.Client()

@client.event
async def on_message(message):
    pass