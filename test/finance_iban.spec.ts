import validator from 'validator';
import { describe, expect, it } from 'vitest';
import { faker } from '../src';
import ibanLib from '../src/iban';

const NON_SEEDED_BASED_RUN = 25;

describe('finance_iban', () => {
  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('specific IBAN country checks', () => {
        it('IBAN for Georgia is correct', () => {
          // Georgia
          // https://transferwise.com/fr/iban/georgia
          // Length 22
          // BBAN 2c,16n
          // GEkk bbcc cccc cccc cccc cc
          // b = National bank code (alpha)
          // c = Account number

          // example IBAN GE29 NB00 0000 0101 9049 17

          const iban = faker.finance.iban(false, 'GE');

          expect(iban).satisfy(validator.isIBAN);

          const ibanFormated = iban.match(/.{1,4}/g).join(' ');
          const bban = iban.substring(4) + iban.substring(0, 4);

          expect(
            22,
            `GE IBAN would be 22 chars length, given is ${iban.length}`
          ).toBe(iban.length);

          expect(
            iban.substring(0, 2),
            iban.substring(0, 2) +
              ' must contains only characters in GE IBAN ' +
              ibanFormated
          ).match(/^[A-Z]{2}$/);
          expect(
            iban.substring(2, 4),
            iban.substring(2, 4) +
              ' must contains only digit in GE IBAN ' +
              ibanFormated
          ).match(/^\d{2}$/);
          expect(
            iban.substring(4, 6),
            iban.substring(4, 6) +
              ' must contains only characters in GE IBAN ' +
              ibanFormated
          ).match(/^[A-Z]{2}$/);
          expect(
            iban.substring(6, 24),
            iban.substring(6, 24) +
              ' must contains only characters in GE IBAN ' +
              ibanFormated
          ).match(/^\d{16}$/);

          expect(
            ibanLib.mod97(ibanLib.toDigitString(bban)),
            'the result should be equal to 1'
          ).toBe(1);
        });

        it('IBAN for Pakistan is correct', () => {
          // https://transferwise.com/fr/iban/pakistan
          // Example IBAN Pakistan
          // PK36SCBL0000001123456702
          // IBAN en format imprimé
          // PK36 SCBL 0000 0011 2345 6702
          // Code pays 2 alpha
          // PK
          // Key 2 digits
          // Bank Code 4 alpha
          // Account Code 16 digits
          // Total Length 24 chars

          const iban = faker.finance.iban(false, 'PK');

          expect(iban).satisfy(validator.isIBAN);

          const ibanFormated = iban.match(/.{1,4}/g).join(' ');
          const bban = iban.substring(4) + iban.substring(0, 4);

          expect(
            24,
            `PK IBAN would be 24 chars length, given is ${iban.length}`
          ).toBe(iban.length);

          expect(
            iban.substring(0, 2),
            iban.substring(0, 2) +
              ' must contains only characters in PK IBAN ' +
              ibanFormated
          ).match(/^[A-Z]{2}$/);
          expect(
            iban.substring(2, 4),
            iban.substring(2, 4) +
              ' must contains only digit in PK IBAN ' +
              ibanFormated
          ).match(/^\d{2}$/);
          expect(
            iban.substring(4, 8),
            iban.substring(4, 8) +
              ' must contains only characters in PK IBAN ' +
              ibanFormated
          ).match(/^[A-Z]{4}$/);
          expect(
            iban.substring(8, 24),
            iban.substring(8, 24) +
              ' must contains only digits in PK IBAN ' +
              ibanFormated
          ).match(/^\d{16}$/);

          expect(
            ibanLib.mod97(ibanLib.toDigitString(bban)),
            'the result should be equal to 1'
          ).toBe(1);
        });

        it('IBAN for Turkish is correct', () => {
          // https://transferwise.com/fr/iban/turkey
          // Un IBAN en Turquie est constitué de 26 caractères :
          //
          //   Code pays à 2 lettres
          //   Clé de contrôle à 2 chiffres
          //   5 caractères du SWIFT/BIC de la banque
          //   Code à 1 chiffres pour le code national
          //   Code à 16 chiffres pour le numéro de compte bancaire
          //   Vous avez déjà un code IBAN ?
          //
          //   Exemple d'IBAN en Turquie	TR330006100519786457841326
          //   IBAN en format imprimé	TR33 0006 1005 1978 6457 8413 26
          //   Code pays	TR
          //   Clé de contrôle	33
          //   Code banque	00061
          //   Chiffre d'indicatif national	0
          //   Numéro de compte bancaire	0519786457841326

          const iban = faker.finance.iban(false, 'TR');

          expect(iban).satisfy(validator.isIBAN);

          const ibanFormated = iban.match(/.{1,4}/g).join(' ');
          const bban = iban.substring(4) + iban.substring(0, 4);

          expect(
            26,
            `PK IBAN would be 26 chars length, given is ${iban.length}`
          ).toBe(iban.length);

          expect(
            iban.substring(0, 2),
            'Country Code:' +
              iban.substring(0, 2) +
              ' must contains only characters in PK IBAN ' +
              ibanFormated
          ).match(/^[A-Z]{2}$/);
          expect(
            iban.substring(2, 4),
            'Control key:' +
              iban.substring(2, 4) +
              ' must contains only digit in PK IBAN ' +
              ibanFormated
          ).match(/^\d{2}$/);
          expect(
            iban.substring(4, 9),
            'Swift Bank Code:' +
              iban.substring(4, 9) +
              ' must contains only digits in PK IBAN ' +
              ibanFormated
          ).match(/^\d{5}$/);
          expect(
            iban.substring(9, 10),
            'National Digit:' +
              iban.substring(9, 10) +
              ' must contains only digits in PK IBAN ' +
              ibanFormated
          ).match(/^\d{1}$/);
          expect(
            iban.substring(10, 26),
            'Account Code:' +
              iban.substring(10, 26) +
              ' must contains only digits in PK IBAN ' +
              ibanFormated
          ).match(/^\d{16}$/);

          expect(
            iban.substring(2, 26),
            'No character after TR ' + ibanFormated
          ).match(/^\d{24}$/);

          expect(
            ibanLib.mod97(ibanLib.toDigitString(bban)),
            'the result should be equal to 1'
          ).toBe(1);
        });

        it('IBAN for Azerbaijan is correct', () => {
          // Azerbaijan
          // https://transferwise.com/fr/iban/azerbaijan
          // Length 28
          // BBAN 4c,20n
          // GEkk bbbb cccc cccc cccc cccc cccc
          // b = National bank code (alpha)
          // c = Account number

          // example IBAN AZ21 NABZ 0000 0000 1370 1000 1944

          const iban = faker.finance.iban(false, 'AZ');

          expect(iban).satisfy(validator.isIBAN);

          const ibanFormated = iban.match(/.{1,4}/g).join(' ');
          const bban = iban.substring(4) + iban.substring(0, 4);

          expect(
            28,
            `AZ IBAN would be 28 chars length, given is ${iban.length}`
          ).toBe(iban.length);

          expect(
            iban.substring(0, 2),
            iban.substring(0, 2) +
              ' must contains only characters in AZ IBAN ' +
              ibanFormated
          ).match(/^[A-Z]{2}$/);
          expect(
            iban.substring(2, 4),
            iban.substring(2, 4) +
              ' must contains only digit in AZ IBAN ' +
              ibanFormated
          ).match(/^\d{2}$/);
          expect(
            iban.substring(4, 8),
            iban.substring(4, 8) +
              ' must contains only characters in AZ IBAN ' +
              ibanFormated
          ).match(/^[A-Z]{4}$/);
          expect(
            iban.substring(8, 28),
            iban.substring(8, 28) +
              ' must contains 20 characters in AZ IBAN ' +
              ibanFormated
          ).match(/^\d{20}$/);

          expect(
            ibanLib.mod97(ibanLib.toDigitString(bban)),
            'the result should be equal to 1'
          ).toBe(1);
        });

        it('IBAN for Costa Rica is correct', () => {
          // Costa Rica
          // https://wise.com/us/iban/costa-rica
          // Length 22
          // BBAN 1n,3n,14n
          // CRkk xbbb cccc cccc cccc cccc cccc
          // x = reserve digit
          // b = National bank code (digits)
          // c = Account number (digits)

          // example IBAN CR05 0152 0200 1026 2840 66

          const iban = faker.finance.iban(false, 'CR');

          expect(iban).satisfy(validator.isIBAN);

          const ibanFormated = iban.match(/.{1,4}/g).join(' ');
          const bban = iban.substring(4) + iban.substring(0, 4);

          expect(
            22,
            `CR IBAN would be 22 chars length, given is ${iban.length}`
          ).toBe(iban.length);

          expect(
            iban.substring(0, 2),
            iban.substring(0, 2) +
              "must start with 'CR' in CR IBAN " +
              ibanFormated
          ).to.eq('CR');

          expect(
            iban.substring(2, 22),
            iban.substring(2, 22) +
              ' must contains only digit in AZ IBAN ' +
              ibanFormated
          ).match(/^\d{20}$/);

          expect(
            ibanLib.mod97(ibanLib.toDigitString(bban)),
            'the result should be equal to 1'
          ).toBe(1);
        });
      });
    }
  });
});
