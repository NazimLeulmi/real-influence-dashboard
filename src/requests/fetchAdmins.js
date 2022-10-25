import axios from "axios";

async function fetchAdmins() {
  let response = await axios.get("https://realinfluence.io/admins");
  return response.data.admins;
}


export default fetchAdmins;