import axios from "axios";

async function fetchUsers() {
  let response = await axios.get("https://realinfluence.io/admins/users");
  return response.data.users;
}


export default fetchUsers;