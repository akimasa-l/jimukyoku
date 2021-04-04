import subprocess

PRINTER_IP_ADDRESS = ""


def print_pdf(pdfFile, printer_ip_address=PRINTER_IP_ADDRESS):

    command = f"lpr -P lp -S {printer_ip_address} {pdfFile}"#できない

    return subprocess.run(command,stdout=subprocess.PIPE,stderr=subprocess.PIPE)


if __name__ == "__main__":
    pdfFile = "../download/a.pdf"
    print_pdf(pdfFile)
