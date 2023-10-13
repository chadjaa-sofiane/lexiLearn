const recieveData = async (message, callback) => {
  try {
    const response = await fetch(message.url, {
      method: message.method,
      headers: message.headers,
      body: message.body,
    });
    const data = await response.json();
    callback({ succeed: true, data });
  } catch (error) {
    callback({ succeed: false, error });
  }
};

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.type) {
    case "fetch":
      recieveData(message, sendResponse);
      return true;
  }
});
