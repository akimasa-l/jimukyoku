import subprocess

def print_pdf():
    
    path_to_Acrobat_exe="C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat\Acrobat.exe"
    
    command=f"{path_to_Acrobat_exe} /N /T "
    
    subprocess.run(command)