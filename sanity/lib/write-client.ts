// File to perform Create/Write operations on data sets using sanity via frontend
import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, //if set to true, UI will update after 60 secs until then all the request will fetch data from cache
  token,
});

if(!writeClient.config().token){
    throw new Error("Write token not found.");
}
