/*
 * This file is automatically generated.
 * Run 'pnpm run generate:locales' to update.
 */

import { Faker } from '../faker';
import de_CH from '../locales/de_CH';
import en from '../locales/en';

const faker = new Faker({
  locale: 'de_CH',
  localeFallback: 'en',
  locales: {
    de_CH,
    en,
  },
});

export = faker;
