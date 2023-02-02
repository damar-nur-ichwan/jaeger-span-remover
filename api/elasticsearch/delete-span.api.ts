import { Elasticsearch } from "../../constants/elasticsearch.constant";
import { SPAN_TARGET } from "../../constants/index-target.constant";
export default async (index: string) => {
  try {
    const response = await Elasticsearch.deleteByQuery({
      index,
      query: {
        regexp: JSON.parse(SPAN_TARGET),
      },
    });

    if (!response.deleted) return;
    return response.deleted;
  } catch (err) {
    return;
  }
};
