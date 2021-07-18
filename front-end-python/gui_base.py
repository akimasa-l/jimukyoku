import time

import pyautogui

DEFAULT_INTERVAL = 0.25


def press_tab(presses: int, interval: float = DEFAULT_INTERVAL):
    return pyautogui.press("tab", presses, interval)


def press_shift_tab(presses: int, interval: float = DEFAULT_INTERVAL):
    for i in range(presses):
        pyautogui.hotkey("shift", "tab")
        time.sleep(interval)


def make_size_str(size: str):
    if size[0] == "B":
        return "JIS "+size
    else:
        return size
