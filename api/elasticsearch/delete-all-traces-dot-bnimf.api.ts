import { Elasticsearch } from "../../constants/elasticsearch.constant";
import { SERVICE_NAME_TARGET } from "../../constants/index-target.constant";
export default async (index: string) => {
  try {
    const response = await Elasticsearch.deleteByQuery({
      index,
      query: {
        regexp: {
          "process.serviceName": SERVICE_NAME_TARGET,
        },
      },
    });

    if (!response.deleted) return;
    return response.deleted;
  } catch (err) {
    console.error(err);
    return false;
  }
};
