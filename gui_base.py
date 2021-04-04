import pyautogui
import time

DEFAULT_INTERVAL=0.25

def press_tab(presses:int,interval:float=DEFAULT_INTERVAL):
    return pyautogui.press("tab",presses,interval)

def press_shift_tab(presses:int,interval:float=DEFAULT_INTERVAL):
    for i in range(presses):
        pyautogui.hotkey("shift","tab")
        time.sleep(interval)