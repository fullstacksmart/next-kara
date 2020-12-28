import { I18n, TFunction } from 'next-i18next';

export type SupportedLanguage = 'GERMAN' | 'ENGLISH';

export interface PageProps {
  t: TFunction;
  i18n: I18n;
}
