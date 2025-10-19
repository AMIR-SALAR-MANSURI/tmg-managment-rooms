import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

import translation from "./langs/fa.json";

i18next.init({
  lng: "fa",
  resources: {
    fa: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

export { z };
