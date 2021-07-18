const discordWebHookURL = "https://discord.com/api/webhooks/827360751797927947/lAbnLiyBVPfm7Zy8m8uBh5RrgH73vFyBfJQ7wSbK4zsDL4BBIf9e36VSzkrHwgBmqN9F";

const prefill = "https://docs.google.com/forms/d/e/1FAIpQLSfs-LTaJbRqFXuYmoNom6bo9HhJHNlOO8Q44aGlDA2DmDPguw/viewform?usp=pp_url&entry.1928492133=%E4%BD%93%E8%82%B2%E7%A5%AD&entry.1363242740=%E4%BA%8B%E5%8B%99%E5%B1%80%E9%95%B7&entry.2140653895=%E8%87%AA%E5%8B%95%E5%8D%B0%E5%88%B7%EF%BC%81%EF%BC%81%EF%BC%81%EF%BC%81&entry.1082838798=%E4%BA%86%E8%A7%A3%EF%BC%81w&entry.1178389818=%E6%9D%A5%E5%A0%B4%E8%80%85%E3%81%B8%E9%85%8D%E5%B8%83%E3%81%99%E3%82%8B%E7%94%A8&entry.393848602=A4&entry.1307258958=%E6%96%B0%E3%81%97%E3%81%8F%E3%81%A6%E3%82%AB%E3%83%A9%E3%83%BC%E5%AF%BE%E5%BF%9C%E3%81%A7%E9%81%85%E3%81%84%E3%82%84%E3%81%A4&entry.1696286731=%E3%82%AB%E3%83%A9%E3%83%BC&entry.174280693=%E7%89%87%E9%9D%A2&entry.749378447=1&entry.652485658=a";

const unicodeEscape = function (str) {
  var code, pref = { 1: '\\u000', 2: '\\u00', 3: '\\u0', 4: '\\u' };
  return str.replace(/\W/g, function (c) {
    return pref[(code = c.charCodeAt(0).toString(16)).length] + code;
  });
};

const databasesheetid = "1wBwdMFFCS6h17pYPlpYA_QgqHydbQPUCHJdwgDhCD0c"
const databaseURL = "https://docs.google.com/spreadsheets/d/1wBwdMFFCS6h17pYPlpYA_QgqHydbQPUCHJdwgDhCD0c/edit#gid=0"

function registerDataBase(stringPrintObject) {
  const sheet = SpreadsheetApp.openById(databasesheetid).getSheets()[0]
  const date = new Date();
  const values = [
    [Utilities.formatDate(date, "JST", "yyyy/MM/dd (E) HH:mm:ss Z"), stringPrintObject],
  ];
  const cache = PropertiesService.getScriptProperties();
  const printobjects = JSON.parse(cache.getProperty("printobjects"));
  printobjects.push(JSON.parse(stringPrintObject));
  cache.setProperty("printobjects", JSON.stringify(printobjects));
  sheet.insertRows(2, 1);
  sheet.getRange(2, 1, 1, 2).setValues(values);
}


function makeDownloadURLfromGoogleDriveFileId(id) {
  return `https://drive.google.com/uc?id=${id}&export=download`
}

const autoprint = {
  keyword_title: "提出形式",
  keyword_answer: "自動印刷！！！！",
}

const autoPrintObjectMaker = {
  "使用用途を教えて下さい。": "isHighQuality",
  "サイズを教えて下さい。": "size",
  "原稿ファイルをアップロードしてください。": "googleDriveId",
  "印刷面数": "isRyoumen",
  "印刷部数": "copies",
  "受け取り希望日時・場所": "place",
  "その他ご要望": "comment"
}

const exampleAutoPrintObject = {
  email: "61229liu@seiko.ac.jp",
  isHighQuality: "来場者へ配布する用",
  googleDriveId: "14bjN6vlQTRikec1zw2uzlLLveErwtYZt",
  googleDriveDownloadURL: "https://drive.google.com/uc?id=14bjN6vlQTRikec1zw2uzlLLveErwtYZt&export=download",
  size: "A4",
  isRyoumen: "両面",
  copies: 1000,
  place: "おうち",
  comment: "ご当地研究会"
}

const beautifier = [
  function (r) {//idはlistで入るけど一つしかないからアンパッキングする
    r.googleDriveId = r.googleDriveId[0]
  },
  function (r) {//URLを作る
    r.googleDriveDownloadURL = makeDownloadURLfromGoogleDriveFileId(r.googleDriveId)
  },
  function (r) {//印刷部数をstringから数字に置き換える←意味ある？
    r.copies = Number(r.copies)
  },
  function (r) {//クオリティ判定
    r.isHighQuality = r.isHighQuality//TODO
  },
  function (r) {//両面片面判定
    r.isRyoumen = r.isRyoumen == "両面"
  }
]


function makeAutoPrintObject(itemResponses) {
  var r = { "date": Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd (E) HH:mm:ss Z") }
  for (const itemResponse of itemResponses) {
    for (const key in autoPrintObjectMaker) {
      if (itemResponse.getItem().getTitle() === key) {
        r[autoPrintObjectMaker[key]] = itemResponse.getResponse()
      }
    }
  }
  for (const f of beautifier) {
    f(r)
  }
  return r
}

function sendMessageToDiscord(message) {
  const url = discordWebHookURL;
  const data = {
    "content": message
  }
  const options = {
    muteHttpExceptions: true,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    payload: JSON.stringify(data)
  };
  const response = UrlFetchApp.fetch(url, options);
  return response.getContentText();
}


function searchIndex(itemResponses, keyword) {
  for (const i in itemResponses) {
    /* if (itemResponses[i]) {
      sendMessageToDiscord(i)
      sendMessageToDiscord(itemResponses[i].getItem().getTitle())
    } */
    if (itemResponses[i].getItem().getTitle() === keyword) {
      return i;
    }
  }
  return -1;
}



function isAutoprint(itemResponses) {
  return itemResponses[searchIndex(itemResponses, autoprint.keyword_title)].getResponse() === autoprint.keyword_answer
}

function isValidGoogleDriveLink(link) {
  return false;
}



function sendForm(e) {
  const itemResponses = e.response.getItemResponses();
  const email = e.response.getRespondentEmail();
  if (!isAutoprint(itemResponses)) {
    return;
  }
  //sendMessageToDiscord("うーん、これは自動印刷！w")
  const printObject = makeAutoPrintObject(itemResponses);
  printObject.email = email;
  const stringPrintObject = JSON.stringify(printObject, undefined, 4)
  sendMessageToDiscord(stringPrintObject)
  registerDataBase(stringPrintObject)
}

function doGet(e) {
  const status = e.parameters.status;
  const cache = PropertiesService.getScriptProperties();
  var printobjects = JSON.parse(cache.getProperty("printobjects"));
  if (status == "get") {
    return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON).setContent(JSON.stringify(printobjects));
  }
  if (status == "finish") {
    const date = e.parameters.date;
    const len = printobjects.length;
    if (date) {
      printobjects = printobjects.filter(printobject => date != printobject.date);
      if (printobjects.length == len) {
        return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON).setContent(JSON.stringify({
          "status": "No print object was found."
        }));
      }
      cache.setProperty("printobjects", JSON.stringify(printobjects));
      return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON).setContent(JSON.stringify(printobjects));
    }
  } else {
    return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON).setContent(JSON.stringify({
      "status": "\"date\" not in parameters."
    }));
  }
  return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON).setContent(JSON.stringify({
    "status": "\"status\" not in parameters."
  }));
}

function myFunction() {
  Logger.log(unicodeEscape("あいうえお"))
  const cache = PropertiesService.getScriptProperties();
  cache.setProperty("printobjects", "[]");
}





function f() {
  const cache = PropertiesService.getScriptProperties();
  Logger.log(cache.getProperty("printobjects"))
  const printobjects = JSON.parse(cache.getProperty("printobjects"));
  for (i of printobjects) {
    Logger.log(i)
  }
  Logger.log(printobjects);
  Logger.log(typeof printobjects);
  Logger.log(printobjects.length)
}


function test_filter() {
  a = [1, 2, 4];
  Logger.log(a.filter(d => d >= 2));
}
















