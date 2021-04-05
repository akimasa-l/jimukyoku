import json

import aiohttp
import discord

import download_pdf
import gui_base
import print_pdf
import print_pdf_gui

with open("../discord/token.txt") as f:
    token = f.read().rstrip()

print(token)

client = discord.Client()


@client.event
async def on_message(message):
    print_object = json.loads(message.content)
    path = download_pdf.download_pdf(print_object["googleDriveDownloadURL"])
    # print_pdf.print_pdf(path)
    print_pdf_gui.print_pdf_color(
        path,
        print_object["copies"],
        print_object["size"]
    )

client.run(token)
