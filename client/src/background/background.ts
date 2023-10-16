const recieveData = async (
  message: {
    url: string;
    method: string;
    headers: any;
    body: string;
  },
  callback: ({
    succeed,
    data,
  }: {
    succeed: boolean;
    data?: any;
    error?: any;
  }) => void
) => {
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
