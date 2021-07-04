import { useTranslation } from 'react-i18next';

export function useI18n () {
  const { t } = useTranslation();
  return t;
}
