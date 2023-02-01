import { Elasticsearch } from "../../constants/elasticsearch.constant";
import { SERVICE_NAME_TARGET } from "../../constants/index-target.constant";
export default async (index: string) => {
  try {
    const response = await Elasticsearch.search({
      index,
      query: {
        regexp: {
          "process.serviceName": SERVICE_NAME_TARGET,
        },
      },
      size: 10000,
    });
    if (!response.hits.total) return;
    const traces = parseInt(JSON.stringify(response.hits.total).split(":")[1]);
    return { total: traces };
  } catch (err) {
    console.error(err);
    return false;
  }
};
