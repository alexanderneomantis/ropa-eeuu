import sanityClient from '@sanity/client'
import {config} from "./config";

const client = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  useCdn: true,
})

const writeClient = sanityClient({
  projectId: config.projectId,
  dataset: config.dataset,
  token: process.env.REACT_APP_SANITY_AUTH_TOKEN,
  useCdn: false
})

export {client, writeClient};
