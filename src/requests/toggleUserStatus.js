import axios from "axios";
async function toggleUserStatus(id) {
  let response = await axios.post(
    "https://realinfluence.io/admins/user/status", { id: id },
  );

  return response.data.user;
}

export default toggleUserStatus;