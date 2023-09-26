const recieveData = async (message, callback) => {
  const response = await fetch(message.url, {
    method: message.method,
    headers: message.headers,
    body: message.body,
  });
  const data = await response.json();
  callback(data);
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.type) {
    case "fetch":
      recieveData(message, sendResponse);
      return true;
  }
});
