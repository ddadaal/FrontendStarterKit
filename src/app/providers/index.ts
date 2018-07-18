import createApiProviders from "../api/apiProviders";
import createStoreProviders from "../stores/storeProviders";
import { Binding } from "react.di";
import i18nProviders from "../internationalization/i18nProviders";
import routingProviders from "../routing/routingProviders";


const useMock = false;

export default [
  ...i18nProviders,
  ...routingProviders,
  ...createApiProviders(useMock),
  ...createStoreProviders(useMock)
  ] as Binding[];
