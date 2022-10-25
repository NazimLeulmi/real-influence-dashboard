import axios from "axios";

async function deleteAdmin(id) {
  let response = await axios.post(
    "https://realinfluence.io/admins/delete", { id: id },
  );
  return response.data.success;
}

export default deleteAdmin;