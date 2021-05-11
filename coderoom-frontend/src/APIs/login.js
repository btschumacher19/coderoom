import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const loginAPI = async (body) => {

  try {
    const res = await axios(
      {
        method: "post",
        url: `${ BASE_URL }api/token-auth/`,
        headers: {
          "Content-Type": "application/json"
        },
        data: body
      }
    )
    return res;
  } catch( error ) {
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    return errorObject;
  }
  
};


const signupUser = (userObject) => {
  return fetch(`${BASE_URL}api/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  }).then((res) => res);
};

export { loginAPI, signupUser };
