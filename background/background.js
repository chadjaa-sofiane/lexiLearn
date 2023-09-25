chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
  switch (message.type) {
    case "fetch":
      try {
        const response = await fetch(message.url, {
          method: message.method,
          headers: message.headers,
          body: message.body,
        });
        const data = await response.json();
        sendResponse(data);
        break;
      } catch (error) {
        console.log(error);
      }
  }
});
