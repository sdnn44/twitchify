export default function languageFromPrefix(prefix) {
  const languageMap = {
    "pl": "Polish",
    "en": "English",
    "en-gb": "English",
    "it": "Italian",
    "fr": "French",
    "de": "German",
    "tr": "Turkish",
  };

  return languageMap[prefix] || "Languages"; 
}
