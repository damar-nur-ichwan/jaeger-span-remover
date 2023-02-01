import axios from "axios";
import { HOST } from "../../constants/elasticsearch.constant";

export default async (index: string) => {
  try {
    await axios.post(`${HOST}/${index}/_forcemerge?only_expunge_deletes=true`);
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};
