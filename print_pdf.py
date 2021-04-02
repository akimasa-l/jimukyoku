import subprocess

PATH_TO_ACROBAT_EXE = "C:\Program Files (x86)\Adobe\Acrobat DC\Acrobat\Acrobat.exe"


def print_pdf(pdfFile, path_to_Acrobat_exe=PATH_TO_ACROBAT_EXE):

    command = f"{path_to_Acrobat_exe} /N /T {pdfFile}"

    return subprocess.run(command)


if __name__ == "__main__":
    pdfFile = "../download/a.pdf"
    print_pdf(pdfFile)
