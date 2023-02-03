import { Client } from "@elastic/elasticsearch";

export const HOST = process.env.ELASTICSEARCH_HOST || "http://localhost:62952";
export const Elasticsearch = new Client({
  node: HOST,
  auth: {
    username: process.env.username || "",
    password: process.env.password || "",
  },
});
