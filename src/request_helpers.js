const getJSON = (url) => {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw response.statusText;
    }
  });
};

const postJSON = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw response.statusText;
    }
  });
};
