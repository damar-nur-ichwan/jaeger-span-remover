import {
  deleteAllTracesDotBnimfApi,
  getAllJaegerSpanIndicesApi,
  getAllTracesDotBnimfApi,
  optimizeOnlyExplugDeletesApi,
} from "./api/elasticsearch";
import { SERVICE_NAME_TARGET } from "./constants/index-target.constant";

(async () => {
  try {
    let i = 0;
    console.info("get all jaeger span indices");
    const spanIndices = await getAllJaegerSpanIndicesApi();
    if (!spanIndices) return;
    for (let i = 0; i < spanIndices.length; i++) {
      const index = spanIndices[i];
      console.info(
        `checking service_name: ${SERVICE_NAME_TARGET} on index: ${index}`
      );
      const found = await getAllTracesDotBnimfApi(index);
      if (!found) continue;
      if (!found.total) continue;
      console.info(
        `deleting  service_name: ${SERVICE_NAME_TARGET} on index: ${index}`
      );
      await deleteAllTracesDotBnimfApi(index);
      await optimizeOnlyExplugDeletesApi(index);
      i--;
    }
    return process.exit();
  } catch (err) {
    console.error(err);
    return process.exit();
  }
})();
