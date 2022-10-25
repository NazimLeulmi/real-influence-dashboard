import axios from "axios";

async function deleteUser(id) {
  let response = await axios.post(
    "https://realinfluence.io/users/delete", { id: id },
  );
  return response.data.success;
}

export default deleteUser;