const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
const catchHtml = (html) => {
  return {
    __html: html
  }
}
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const formatDate = (date) => date.substring(0, 10)

export { addCommas, removeNonNumeric, catchHtml, capitalizeFirstLetter, formatDate }
