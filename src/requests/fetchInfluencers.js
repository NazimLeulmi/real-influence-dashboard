import axios from "axios";

async function fetchInfluencers() {
  let response = await axios.get("https://realinfluence.io/admins/influencers");
  return response.data.influencers;
}


export default fetchInfluencers;