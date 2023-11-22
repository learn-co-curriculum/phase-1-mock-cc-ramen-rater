const getJSON = (url) => {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw response.statusText;
    }
    return response.json();
  });
};

const postJSON = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw response.statusText;
    }
    return response.json();
  });
};

function patchJSON(url, data) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw response.statusText;
    }
    return response.json();
  });
}

function deleteJSON(url) {
  return fetch(url, { method: "DELETE" }).then((res) => {
    if (!res.ok) {
      throw "Failed to delete record";
    }
    return "Record deleted successfully";
  });
}
