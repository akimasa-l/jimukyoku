import json

import requests

downloadFolder = "../download/"


def getFileNameFromHeaders(headers: requests.structures.CaseInsensitiveDict):
    return "a.pdf"


def download_pdf(url):
    response = requests.get(url)
    print(response.status_code)
    print(response.headers['Content-Disposition'])  # TODO:ここからファイル名を取り出す方法
    path = downloadFolder+getFileNameFromHeaders(response.headers)
    with open(path, mode="wb") as f:
        f.write(response.content)
    return path


if __name__ == '__main__':
    url = "https://drive.google.com/uc?id=1to7aAGQ7hmZseactjOiXwDTHl2Dgfhze&export=download"
    download_pdf(url)


# 例："Content-Disposition": "attachment;filename=\"__ - AtCoder Beginner Contest 194 - ___.pdf\";filename*=UTF-8''%E8%A7%A3%E8%AA%AC%20-%20AtCoder%20Beginner%20Contest%20194%20-%20%E5%8A%89%E6%98%8E%E6%AD%A3.pdf",
