import subprocess
import time

import pyautogui

import gui_base

def enter_copies(copies:int):
    pyautogui.typewrite(str(copies))
    time.sleep(gui_base.DEFAULT_INTERVAL)

PATH_TO_ACROBAT_EXE = "C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat\Acrobat.exe"

def print_pdf_color(pdfFile:str,copies:int, path_to_Acrobat_exe:str=PATH_TO_ACROBAT_EXE):

    command = f"{path_to_Acrobat_exe} /P {pdfFile}"
    a=subprocess.Popen(command)

    time.sleep(2)
    
    gui_base.press_tab(4)
    enter_copies(copies)#印刷数を入力
    
    pyautogui.hotkey("ctrl","enter")#印刷ボタン

    time.sleep(10)
    
    a.kill()
    
    



if __name__ == "__main__":
    pdfFile = "../download/a.pdf"
    print_pdf_color(pdfFile,100)
