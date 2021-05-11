const USERTOKEN = localStorage.getItem("token");
const BASE_URL = process.env.REACT_APP_BASE_URL + "api/";

const fetchAll = async (model, includeToken = true) => {
  // Accepts a string "model" that represents the data model you want to fetch from the database
  // Models in this project are ["users", "challenges", "submissions"]
  let header = {
    "Content-Type": "application/JSON",
    Authorization: `JWT ${USERTOKEN}`,
  };

  if (!includeToken) {
    header = {
      "Content-Type": "application/JSON",
    };
  }

  let requestData = {
    method: "GET",
    headers: header,
  };
  const response = await fetch(`${BASE_URL}${model}/`, requestData);
  const data = await response.json();
  return data; // Returns a promise
};

const fetchDetail = async (model, id, includeToken = true) => {
  // Accepts a string "model" that represents the data model you want to fetch from the database + specific id
  // Models in this project are ["users", "challenges", "submissions"]
  let header = {
    "Content-Type": "application/JSON",
    Authorization: `JWT ${USERTOKEN}`,
  };

  if (!includeToken) {
    header = {
      "Content-Type": "application/JSON",
    };
  }

  let requestData = {
    method: "GET",
    headers: header,
  };
  const response = await fetch(`${BASE_URL}${model}/${id}/`, requestData);
  const data = await response.json();
  return data; // Returns a promise
};

const postToServer = async (model, dataObj, includeToken = true) => {
  // Accepts a string "model" that represents the data model you wish to create and and add to the database
  // Models in this project are ["users", "challenges", "submissions"]
  // accepts the data object to be added to the database as a second parameter
  // if instructor is false, don't send JWT
  let header = {
    "Content-Type": "application/JSON",
    Authorization: `JWT ${USERTOKEN}`,
  };

  if (!includeToken) {
    header = {
      "Content-Type": "application/JSON",
    };
  }

  try {
    console.log(JSON.stringify(dataObj));
    let requestData = {
      method: "POST",
      headers: header,
      body: JSON.stringify(dataObj),
    };
    const response = await fetch(`${BASE_URL}${model}/`, requestData);
    const data = await response.json();
    return {data, response}; // Returns new database entry and response object
  } catch (err) {
    console.error("There was an issue with the data sent to the server: ", err);
  }
};

const putToServer = async (model, id, dataObj, includeToken = true) => {
  // Accepts a string "model" and number id that represents the specific data model you wish to update
  // Models in this project are ["users", "submissions", "challenges"]
  // accepts the updated data object to be updated in the database as a third parameter
  // if instructor is false, don't send JWT
  let header = {
    "Content-Type": "application/JSON",
    Authorization: `JWT ${USERTOKEN}`,
  };

  if (!includeToken) {
    header = {
      "Content-Type": "application/JSON",
    };
  }

  try {
    let requestData = {
      method: "PUT",
      headers: header,
      body: JSON.stringify(dataObj),
    };
    const response = await fetch(`${BASE_URL}${model}/${id}/`, requestData);
    const data = await response.json();
    return data; // Returns new database entry
  } catch (err) {
    console.error("There was an issue with the data sent to the server: ", err);
  }
};

const patchToServer = async (model, id, dataObj, includeToken = true) => {
  // Accepts a string "model" and number id that represents the specific data model you wish to update
  // Models in this project are ["users", "challenges", submissions"]
  // accepts the updated data object to be updated in the database as a third parameter
  // if instructor is false, don't send JWT
  let header = {
    "Content-Type": "application/JSON",
    Authorization: `JWT ${USERTOKEN}`,
  };

  if (!includeToken) {
    header = {
      "Content-Type": "application/JSON",
    };
  }

  try {
    let requestData = {
      method: "PATCH",
      headers: header,
      body: JSON.stringify(dataObj),
    };
    const response = await fetch(`${BASE_URL}${model}/${id}/`, requestData);
    const data = await response.json();
    return data; // Returns new database entry
  } catch (err) {
    console.error("There was an issue with the data sent to the server: ", err);
  }
};

const deleteFromServer = async (model, id) => {
  try {
    let requestData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: `JWT ${USERTOKEN}`,
      },
    };
    const response = await fetch(`${BASE_URL}${model}/${id}/`, requestData);
    return "item successfully deleted";
  } catch (error) {
    console.error(
      "There was an issue deleting your data from the server: ",
      error
    );
    return {};
  }
};

// User Authentication requests
const getLoggedInUser = (token) => {
  return fetch(`${BASE_URL}current_user/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  }).then((res) => res);
};

const changePassword = async (pwObj, userID) => {
  let requestData = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/JSON",
      Authorization: `JWT ${USERTOKEN}`
    },
    body: JSON.stringify(pwObj),
  };
  try {
    const response = await fetch(`${BASE_URL}change_password/${userID}/`, requestData);
    const data = await response.json();
    return {data, response}; // Returns new database entry
  } catch (err) {
    console.error("chg_pw: There was an issue with the data sent to the server: ", err);
  }
};

export {
  fetchAll,
  fetchDetail,
  postToServer,
  putToServer,
  patchToServer,
  deleteFromServer,
  getLoggedInUser,
  changePassword,
};
