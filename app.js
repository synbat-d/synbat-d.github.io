function getSettings() {
    const apiUrl = "https://7103.api.greenapi.com";
    const instanceId = document.getElementById("idInstanceField").value;
    const apiToken = document.getElementById("apiTokenField").value;
    var responseArea = document.getElementById("responseArea");
    var urlToGet = `${apiUrl}/waInstance${instanceId}/getSettings/${apiToken}`;
    fetch(urlToGet)
    .then(res => res.json()).catch(error => insertText(responseArea, error.message))
    .then(data => {
        if(data !== undefined) {
            insertText(responseArea, JSON.stringify(data, null, "\t"));
        }
    });
}

function getState() {
    const apiUrl = "https://7103.api.greenapi.com";
    const instanceId = document.getElementById("idInstanceField").value;
    const apiToken = document.getElementById("apiTokenField").value;
    var urlToGet = `${apiUrl}/waInstance${instanceId}/getStateInstance/${apiToken}`;
    fetch(urlToGet)
    .then(res => res.json()).catch(error => insertText(responseArea, error.message))
    .then(data => {
        if(data !== undefined) {
            insertText(responseArea, JSON.stringify(data, null, "\t"));
        }
    });
}

function sendMessage() {
    const apiUrl = "https://7103.api.greenapi.com";
    const instanceId = document.getElementById("idInstanceField").value;
    const apiToken = document.getElementById("apiTokenField").value;

    var urlToPost = `${apiUrl}/waInstance${instanceId}/sendMessage/${apiToken}`;

    var phoneNumber = document.getElementById("phoneNumber").value;
    phoneNumber = correctPhoneNumber(phoneNumber);
    const messageToSend = document.getElementById("message").value;

    fetch(urlToPost, {
        method: 'POST',
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            chatId: phoneNumber,
            message: messageToSend
        })
    })
    .then(res => res.json()).catch(error => insertText(responseArea, error.message))
    .then(data => {
        if(data !== undefined) {
            insertText(responseArea, JSON.stringify(data, null, "\t"));
        }
    });

}

function sendFile() {
    const apiUrl = "https://7103.api.greenapi.com";
    const instanceId = document.getElementById("idInstanceField").value;
    const apiToken = document.getElementById("apiTokenField").value;

    var urlToPost = `${apiUrl}/waInstance${instanceId}/sendFileByUrl/${apiToken}`;

    var phoneNumber = document.getElementById("phoneNumber2").value;
    phoneNumber = correctPhoneNumber(phoneNumber);
    const fileUrlPath = document.getElementById("urlFile").value;
    var nameOfFile = getNameOfFile(fileUrlPath); 
    fetch(urlToPost, {
        method: 'POST',
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({
            chatId: phoneNumber,
            urlFile: fileUrlPath,
            fileName: nameOfFile
        })
    })
    .then(res => res.json()).catch(error => insertText(responseArea, error.message))
    .then(data => {
        if(data !== undefined) {
            insertText(responseArea, JSON.stringify(data, null, "\t"));
        }
    });

} 

function insertText(myTextArea, text) {
    text = text + '\n';
    const position = myTextArea.selectionStart;

    const before = myTextArea.value.substring(0, position);
    const after = myTextArea.value.substring(position, myTextArea.value.length);

    myTextArea.value = before + text + after;

    myTextArea.selectionStart = myTextArea.selectionEnd = position + text.length;
    document.getElementById("responseArea").scrollTop = document.getElementById("responseArea").scrollHeight
}

function correctPhoneNumber(mobileNumber) {
    if(mobileNumber.charAt(0) == 8 && mobileNumber.charAt(1) == 7) {
        mobileNumber = mobileNumber.replace('8', '7');
    }
    mobileNumber = mobileNumber +'@c.us';
    return mobileNumber;
} 

function getNameOfFile(fileUrl) {
    const index = fileUrl.lastIndexOf('/');
    return fileUrl.substring(index+1);
}