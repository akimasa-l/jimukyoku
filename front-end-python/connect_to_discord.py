import aiohttp
import discord

import download_pdf
import print_pdf

with open("../discord/token.txt") as f:
    token = f.read().rstrip()

print(token)

client = discord.Client()


@client.event
async def on_message(message):
    url = message.content.rstrip()
    path = download_pdf.download_pdf(url)
    print_pdf.print_pdf(path)

client.run(token)
