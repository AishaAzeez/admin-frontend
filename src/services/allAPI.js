import axios from "axios";
import SERVER_URL from "./serverUrl";

export const adminloginAPI = async (email, password) => {
  const response = await fetch(`${SERVER_URL}/adminlogin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

