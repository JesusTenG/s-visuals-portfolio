import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

import { ImpactSnapshotRoot } from "./ImpactSnapshotRoot.client";

type Props = Readonly<{
  dict: Dictionary;
  locale: Locale;
}>;

export function ImpactSnapshotSection({ dict, locale }: Props) {
  return <ImpactSnapshotRoot dict={dict} locale={locale} />;
}
