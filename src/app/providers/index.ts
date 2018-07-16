import apiProviders from "./apiProviders";
import createStoreProviders from "./storeProviders";

export default async function(history) {
  return [
    ...apiProviders,
    ...await createStoreProviders(history)
  ]

}
