chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
  switch (message.type) {
    case "fetch":
      const response = await fetch(message.url, {
        method: message.method,
        headers: message.headers,
        body: message.body,
      });
      sendResponse(await response.json());
      break;
  }
});
