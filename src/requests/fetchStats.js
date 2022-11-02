import axios from "axios";

async function fetchStats() {
  let response = await axios.get("https://realinfluence.io/stats");
  return response.data;
}

export default fetchStats;