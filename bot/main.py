from pyrogram import Client
from pyrogram.types import (InlineQueryResultArticle, InputTextMessageContent,
                            InlineKeyboardMarkup, ReplyKeyboardMarkup, InlineKeyboardButton)
from pyrogram import filters

from pyrogram import Client

api_id = 25616564
api_hash = "dfd746b44b9fdfc10dcad02846cc5b77"
bot_token = "7656417349:AAHJfVd4QpyNF-aj-SozQ0ySAJl3HkYzGXs"

app = Client("check_saver_bot", api_id=api_id, api_hash=api_hash, bot_token=bot_token)


@app.on_message(filters.command(["start"]))
async def send_menu_buttons(client, message):
    await message.reply(
        text="started as " + message.from_user.mention(),
        reply_markup = ReplyKeyboardMarkup(
            [
                ["add purchase"],  # First row
                # ["E", "F", "G"],  # Second row
            ],
            resize_keyboard=True  # Make the keyboard smaller
    ))

@app.on_message(filters.text(["add purchase"]))
async def start_add_purchase(client, message):
    await app.delete_messages(message.chat_id, message.id)
    await message.reply("These are inline buttons",
                        # reply_markup=InlineKeyboardMarkup(
                        #     [
                        #         [InlineKeyboardButton("Data", callback_data="callback_data")],
                        #         [InlineKeyboardButton("Docs", url="https://docs.pyrogram.org")]
                        #     ]),
                        reply_markup=ReplyKeyboardMarkup(
                            [
                                ["add purchase"],  # First row
                                # ["E", "F", "G"],  # Second row
                                # ["H", "I"],  # Third row
                                # ["J"]  # Fourth row
                            ],
                            resize_keyboard=True  # Make the keyboard smaller
                        )
                        )

app.run()  # Automatically start() and idle()