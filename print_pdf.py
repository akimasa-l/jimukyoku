import subprocess

def print_pdf(pdfFile,path_to_Acrobat_exe="C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat\Acrobat.exe"):
    
    command=f"{path_to_Acrobat_exe} /N /T {pdfFile}"
    
    return subprocess.run(command)

if __name__ == "__main__":
    pdfFile="./a.pdf"
    print_pdf(pdfFile)