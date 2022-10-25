import axios from "axios";
async function toggleStatus(id) {
  let response = await axios.post(
    "https://realinfluence.io/admins/status", { id: id },
  );

  return response.data.influencer;
}

export default toggleStatus;