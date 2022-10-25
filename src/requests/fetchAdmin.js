import axios from "axios";

async function fetchAdmin() {
  let response = await axios.get("https://realinfluence.io/admins/check-auth");
  return response.data.admin;
}


export default fetchAdmin;