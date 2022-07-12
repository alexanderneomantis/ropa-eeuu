import createImageUrlBuilder from '@sanity/image-url';
import {config} from "./config";

const builder = createImageUrlBuilder(config);

function urlForThumbnail(source) {
  return builder.image(source).width(300).url();
}

function urlFor(source) {
  return builder.image(source).width(500).url();
}

function urlForBanner(source) {
  return builder.image(source).url();
}

export { urlFor, urlForThumbnail, urlForBanner }
