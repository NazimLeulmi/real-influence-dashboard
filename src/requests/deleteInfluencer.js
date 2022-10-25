import axios from "axios";

async function deleteInfluencer(id) {
  let response = await axios.post(
    "https://realinfluence.io/influencers/delete", { id: id },
  );
  return response.data.success;
}

export default deleteInfluencer;