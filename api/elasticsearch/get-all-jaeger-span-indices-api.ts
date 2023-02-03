import axios from "axios";
import { HOST } from "../../constants/elasticsearch.constant";

export default async () => {
  try {
    const response = await axios.get(`${HOST}/_cat/indices/jaeger-span*`);
    if (!response.data) return;
    const indices = response.data
      .split(" ")
      .filter((value: string) => value.includes("jaeger-span-"));
    return indices;
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
};
