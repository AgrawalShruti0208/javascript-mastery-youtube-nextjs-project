// SANITY CLIENT to perform all the Read operations
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, //if set to true, UI will update after 60 secs until then all the request will fetch data from cache
})
