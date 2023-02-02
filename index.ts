import {
  deleteSpanApi,
  getAllJaegerSpanIndicesApi,
  getSpanApi,
  optimizeOnlyExplugDeletesApi,
} from "./api/elasticsearch";
import { SPAN_TARGET } from "./constants/index-target.constant";

(async () => {
  try {
    let i = 0;
    console.info("get all jaeger span indices");
    const spanIndices = await getAllJaegerSpanIndicesApi();
    if (!spanIndices) return;
    for (let i = 0; i < spanIndices.length; i++) {
      const index = spanIndices[i];
      console.info(`checking SPAN_TARGET: ${SPAN_TARGET} on index: ${index}`);
      const found = await getSpanApi(index);
      if (!found) continue;
      if (!found.total) continue;
      console.info(`deleting SPAN_TARGET: ${SPAN_TARGET}  on index: ${index}`);
      await deleteSpanApi(index);
      await optimizeOnlyExplugDeletesApi(index);
      i--;
    }
  } catch (err) {
    console.error(err);
  }
  process.exit(1);
})();
