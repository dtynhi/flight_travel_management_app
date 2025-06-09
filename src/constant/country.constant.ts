const countries = [
  {
    countryCode: 'AW',
    countryName: 'Aruba',
    flagUrl: 'https://flagcdn.com/w320/aw.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+297',
    examplePhone: '+297 560 1234'
  },
  {
    countryCode: 'AF',
    countryName: 'Afghanistan',
    flagUrl: 'https://flagcdn.com/w320/af.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+93',
    examplePhone: '+93 70 123 4567'
  },
  {
    countryCode: 'AO',
    countryName: 'Angola',
    flagUrl: 'https://flagcdn.com/w320/ao.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+244',
    examplePhone: '+244 923 123 456'
  },
  {
    countryCode: 'AI',
    countryName: 'Anguilla',
    flagUrl: 'https://flagcdn.com/w320/ai.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 264-235-1234'
  },
  {
    countryCode: 'AX',
    countryName: 'Åland Islands',
    flagUrl: 'https://flagcdn.com/w320/ax.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+358',
    examplePhone: '+358 41 2345678'
  },
  {
    countryCode: 'AL',
    countryName: 'Albania',
    flagUrl: 'https://flagcdn.com/w320/al.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+355',
    examplePhone: '+355 67 212 3456'
  },
  {
    countryCode: 'AD',
    countryName: 'Andorra',
    flagUrl: 'https://flagcdn.com/w320/ad.png',
    phoneRegex: '\\d{6}',
    phonePrefix: '+376',
    examplePhone: '+376 312 345'
  },
  {
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    flagUrl: 'https://flagcdn.com/w320/ae.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+971',
    examplePhone: '+971 50 123 4567'
  },
  {
    countryCode: 'AR',
    countryName: 'Argentina',
    flagUrl: 'https://flagcdn.com/w320/ar.png',
    phoneRegex: '\\d{11}',
    phonePrefix: '+54',
    examplePhone: '+54 9 11 2345-6789'
  },
  {
    countryCode: 'AM',
    countryName: 'Armenia',
    flagUrl: 'https://flagcdn.com/w320/am.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+374',
    examplePhone: '+374 77 123456'
  },
  {
    countryCode: 'AS',
    countryName: 'American Samoa',
    flagUrl: 'https://flagcdn.com/w320/as.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 684-733-1234'
  },
  {
    countryCode: 'AG',
    countryName: 'Antigua and Barbuda',
    flagUrl: 'https://flagcdn.com/w320/ag.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 268-464-1234'
  },
  {
    countryCode: 'AU',
    countryName: 'Australia',
    flagUrl: 'https://flagcdn.com/w320/au.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+61',
    examplePhone: '+61 412 345 678'
  },
  {
    countryCode: 'AT',
    countryName: 'Austria',
    flagUrl: 'https://flagcdn.com/w320/at.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+43',
    examplePhone: '+43 664 123456'
  },
  {
    countryCode: 'AZ',
    countryName: 'Azerbaijan',
    flagUrl: 'https://flagcdn.com/w320/az.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+994',
    examplePhone: '+994 40 123 45 67'
  },
  {
    countryCode: 'BI',
    countryName: 'Burundi',
    flagUrl: 'https://flagcdn.com/w320/bi.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+257',
    examplePhone: '+257 79 56 12 34'
  },
  {
    countryCode: 'BE',
    countryName: 'Belgium',
    flagUrl: 'https://flagcdn.com/w320/be.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+32',
    examplePhone: '+32 470 12 34 56'
  },
  {
    countryCode: 'BJ',
    countryName: 'Benin',
    flagUrl: 'https://flagcdn.com/w320/bj.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+229',
    examplePhone: '+229 90 01 12 34'
  },
  {
    countryCode: 'BQ',
    countryName: 'Bonaire, Sint Eustatius and Saba',
    flagUrl: 'https://flagcdn.com/w320/bq.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+599',
    examplePhone: '+599 318 1234'
  },
  {
    countryCode: 'BF',
    countryName: 'Burkina Faso',
    flagUrl: 'https://flagcdn.com/w320/bf.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+226',
    examplePhone: '+226 70 12 34 56'
  },
  {
    countryCode: 'BD',
    countryName: 'Bangladesh',
    flagUrl: 'https://flagcdn.com/w320/bd.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+880',
    examplePhone: '+880 1812-345678'
  },
  {
    countryCode: 'BG',
    countryName: 'Bulgaria',
    flagUrl: 'https://flagcdn.com/w320/bg.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+359',
    examplePhone: '+359 43 012 345'
  },
  {
    countryCode: 'BH',
    countryName: 'Bahrain',
    flagUrl: 'https://flagcdn.com/w320/bh.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+973',
    examplePhone: '+973 3600 1234'
  },
  {
    countryCode: 'BS',
    countryName: 'Bahamas',
    flagUrl: 'https://flagcdn.com/w320/bs.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 242-359-1234'
  },
  {
    countryCode: 'BA',
    countryName: 'Bosnia and Herzegovina',
    flagUrl: 'https://flagcdn.com/w320/ba.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+387',
    examplePhone: '+387 61 123 456'
  },
  {
    countryCode: 'BL',
    countryName: 'Saint Barthélemy',
    flagUrl: 'https://flagcdn.com/w320/bl.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+590',
    examplePhone: '+590 690 00 12 34'
  },
  {
    countryCode: 'BY',
    countryName: 'Belarus',
    flagUrl: 'https://flagcdn.com/w320/by.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+375',
    examplePhone: '+375 29 491-19-11'
  },
  {
    countryCode: 'BZ',
    countryName: 'Belize',
    flagUrl: 'https://flagcdn.com/w320/bz.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+501',
    examplePhone: '+501 622-1234'
  },
  {
    countryCode: 'BM',
    countryName: 'Bermuda',
    flagUrl: 'https://flagcdn.com/w320/bm.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 441-370-1234'
  },
  {
    countryCode: 'BO',
    countryName: 'Bolivia, Plurinational State of',
    flagUrl: 'https://flagcdn.com/w320/bo.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+591',
    examplePhone: '+591 71234567'
  },
  {
    countryCode: 'BR',
    countryName: 'Brazil',
    flagUrl: 'https://flagcdn.com/w320/br.png',
    phoneRegex: '\\d{11}',
    phonePrefix: '+55',
    examplePhone: '+55 11 96123-4567'
  },
  {
    countryCode: 'BB',
    countryName: 'Barbados',
    flagUrl: 'https://flagcdn.com/w320/bb.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 246-250-1234'
  },
  {
    countryCode: 'BN',
    countryName: 'Brunei Darussalam',
    flagUrl: 'https://flagcdn.com/w320/bn.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+673',
    examplePhone: '+673 712 3456'
  },
  {
    countryCode: 'BT',
    countryName: 'Bhutan',
    flagUrl: 'https://flagcdn.com/w320/bt.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+975',
    examplePhone: '+975 17 12 34 56'
  },
  {
    countryCode: 'BW',
    countryName: 'Botswana',
    flagUrl: 'https://flagcdn.com/w320/bw.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+267',
    examplePhone: '+267 71 123 456'
  },
  {
    countryCode: 'CF',
    countryName: 'Central African Republic',
    flagUrl: 'https://flagcdn.com/w320/cf.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+236',
    examplePhone: '+236 70 01 23 45'
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    flagUrl: 'https://flagcdn.com/w320/ca.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 506-234-5678'
  },
  {
    countryCode: 'CC',
    countryName: 'Cocos (Keeling) Islands',
    flagUrl: 'https://flagcdn.com/w320/cc.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+61',
    examplePhone: '+61 412 345 678'
  },
  {
    countryCode: 'CH',
    countryName: 'Switzerland',
    flagUrl: 'https://flagcdn.com/w320/ch.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+41',
    examplePhone: '+41 78 123 45 67'
  },
  {
    countryCode: 'CL',
    countryName: 'Chile',
    flagUrl: 'https://flagcdn.com/w320/cl.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+56',
    examplePhone: '+56 2 2123 4567'
  },
  {
    countryCode: 'CN',
    countryName: 'China',
    flagUrl: 'https://flagcdn.com/w320/cn.png',
    phoneRegex: '\\d{11}',
    phonePrefix: '+86',
    examplePhone: '+86 131 2345 6789'
  },
  {
    countryCode: 'CI',
    countryName: "Côte d'Ivoire",
    flagUrl: 'https://flagcdn.com/w320/ci.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+225',
    examplePhone: '+225 01 23 45 6789'
  },
  {
    countryCode: 'CM',
    countryName: 'Cameroon',
    flagUrl: 'https://flagcdn.com/w320/cm.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+237',
    examplePhone: '+237 6 71 23 45 67'
  },
  {
    countryCode: 'CD',
    countryName: 'Congo, The Democratic Republic of the',
    flagUrl: 'https://flagcdn.com/w320/cd.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+243',
    examplePhone: '+243 991 234 567'
  },
  {
    countryCode: 'CG',
    countryName: 'Congo',
    flagUrl: 'https://flagcdn.com/w320/cg.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+242',
    examplePhone: '+242 06 123 4567'
  },
  {
    countryCode: 'CK',
    countryName: 'Cook Islands',
    flagUrl: 'https://flagcdn.com/w320/ck.png',
    phoneRegex: '\\d{5}',
    phonePrefix: '+682',
    examplePhone: '+682 71 234'
  },
  {
    countryCode: 'CO',
    countryName: 'Colombia',
    flagUrl: 'https://flagcdn.com/w320/co.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+57',
    examplePhone: '+57 321 1234567'
  },
  {
    countryCode: 'KM',
    countryName: 'Comoros',
    flagUrl: 'https://flagcdn.com/w320/km.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+269',
    examplePhone: '+269 321 23 45'
  },
  {
    countryCode: 'CV',
    countryName: 'Cabo Verde',
    flagUrl: 'https://flagcdn.com/w320/cv.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+238',
    examplePhone: '+238 991 12 34'
  },
  {
    countryCode: 'CR',
    countryName: 'Costa Rica',
    flagUrl: 'https://flagcdn.com/w320/cr.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+506',
    examplePhone: '+506 8312 3456'
  },
  {
    countryCode: 'CU',
    countryName: 'Cuba',
    flagUrl: 'https://flagcdn.com/w320/cu.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+53',
    examplePhone: '+53 5 1234567'
  },
  {
    countryCode: 'CW',
    countryName: 'Curaçao',
    flagUrl: 'https://flagcdn.com/w320/cw.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+599',
    examplePhone: '+599 9 518 1234'
  },
  {
    countryCode: 'CX',
    countryName: 'Christmas Island',
    flagUrl: 'https://flagcdn.com/w320/cx.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+61',
    examplePhone: '+61 412 345 678'
  },
  {
    countryCode: 'KY',
    countryName: 'Cayman Islands',
    flagUrl: 'https://flagcdn.com/w320/ky.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 345-323-1234'
  },
  {
    countryCode: 'CY',
    countryName: 'Cyprus',
    flagUrl: 'https://flagcdn.com/w320/cy.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+357',
    examplePhone: '+357 96 123456'
  },
  {
    countryCode: 'CZ',
    countryName: 'Czechia',
    flagUrl: 'https://flagcdn.com/w320/cz.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+420',
    examplePhone: '+420 601 123 456'
  },
  {
    countryCode: 'DE',
    countryName: 'Germany',
    flagUrl: 'https://flagcdn.com/w320/de.png',
    phoneRegex: '\\d{11}',
    phonePrefix: '+49',
    examplePhone: '+49 1512 3456789'
  },
  {
    countryCode: 'DJ',
    countryName: 'Djibouti',
    flagUrl: 'https://flagcdn.com/w320/dj.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+253',
    examplePhone: '+253 77 83 10 01'
  },
  {
    countryCode: 'DM',
    countryName: 'Dominica',
    flagUrl: 'https://flagcdn.com/w320/dm.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 767-225-1234'
  },
  {
    countryCode: 'DK',
    countryName: 'Denmark',
    flagUrl: 'https://flagcdn.com/w320/dk.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+45',
    examplePhone: '+45 34 41 23 45'
  },
  {
    countryCode: 'DO',
    countryName: 'Dominican Republic',
    flagUrl: 'https://flagcdn.com/w320/do.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 809-234-5678'
  },
  {
    countryCode: 'DZ',
    countryName: 'Algeria',
    flagUrl: 'https://flagcdn.com/w320/dz.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+213',
    examplePhone: '+213 551 23 45 67'
  },
  {
    countryCode: 'EC',
    countryName: 'Ecuador',
    flagUrl: 'https://flagcdn.com/w320/ec.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+593',
    examplePhone: '+593 99 123 4567'
  },
  {
    countryCode: 'EG',
    countryName: 'Egypt',
    flagUrl: 'https://flagcdn.com/w320/eg.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+20',
    examplePhone: '+20 10 01234567'
  },
  {
    countryCode: 'ER',
    countryName: 'Eritrea',
    flagUrl: 'https://flagcdn.com/w320/er.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+291',
    examplePhone: '+291 7 123 456'
  },
  {
    countryCode: 'EH',
    countryName: 'Western Sahara',
    flagUrl: 'https://flagcdn.com/w320/eh.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+212',
    examplePhone: '+212 650-123456'
  },
  {
    countryCode: 'ES',
    countryName: 'Spain',
    flagUrl: 'https://flagcdn.com/w320/es.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+34',
    examplePhone: '+34 612 34 56 78'
  },
  {
    countryCode: 'EE',
    countryName: 'Estonia',
    flagUrl: 'https://flagcdn.com/w320/ee.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+372',
    examplePhone: '+372 5123 4567'
  },
  {
    countryCode: 'ET',
    countryName: 'Ethiopia',
    flagUrl: 'https://flagcdn.com/w320/et.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+251',
    examplePhone: '+251 91 123 4567'
  },
  {
    countryCode: 'FI',
    countryName: 'Finland',
    flagUrl: 'https://flagcdn.com/w320/fi.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+358',
    examplePhone: '+358 41 2345678'
  },
  {
    countryCode: 'FJ',
    countryName: 'Fiji',
    flagUrl: 'https://flagcdn.com/w320/fj.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+679',
    examplePhone: '+679 701 2345'
  },
  {
    countryCode: 'FK',
    countryName: 'Falkland Islands (Malvinas)',
    flagUrl: 'https://flagcdn.com/w320/fk.png',
    phoneRegex: '\\d{5}',
    phonePrefix: '+500',
    examplePhone: '+500 51234'
  },
  {
    countryCode: 'FR',
    countryName: 'France',
    flagUrl: 'https://flagcdn.com/w320/fr.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+33',
    examplePhone: '+33 6 12 34 56 78'
  },
  {
    countryCode: 'FO',
    countryName: 'Faroe Islands',
    flagUrl: 'https://flagcdn.com/w320/fo.png',
    phoneRegex: '\\d{6}',
    phonePrefix: '+298',
    examplePhone: '+298 211234'
  },
  {
    countryCode: 'FM',
    countryName: 'Micronesia, Federated States of',
    flagUrl: 'https://flagcdn.com/w320/fm.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+691',
    examplePhone: '+691 350 1234'
  },
  {
    countryCode: 'GA',
    countryName: 'Gabon',
    flagUrl: 'https://flagcdn.com/w320/ga.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+241',
    examplePhone: '+241 06 03 12 34'
  },
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    flagUrl: 'https://flagcdn.com/w320/gb.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+44',
    examplePhone: '+44 7400 123456'
  },
  {
    countryCode: 'GE',
    countryName: 'Georgia',
    flagUrl: 'https://flagcdn.com/w320/ge.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+995',
    examplePhone: '+995 555 12 34 56'
  },
  {
    countryCode: 'GG',
    countryName: 'Guernsey',
    flagUrl: 'https://flagcdn.com/w320/gg.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+44',
    examplePhone: '+44 7781 123456'
  },
  {
    countryCode: 'GH',
    countryName: 'Ghana',
    flagUrl: 'https://flagcdn.com/w320/gh.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+233',
    examplePhone: '+233 23 123 4567'
  },
  {
    countryCode: 'GI',
    countryName: 'Gibraltar',
    flagUrl: 'https://flagcdn.com/w320/gi.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+350',
    examplePhone: '+350 57123456'
  },
  {
    countryCode: 'GN',
    countryName: 'Guinea',
    flagUrl: 'https://flagcdn.com/w320/gn.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+224',
    examplePhone: '+224 601 12 34 56'
  },
  {
    countryCode: 'GP',
    countryName: 'Guadeloupe',
    flagUrl: 'https://flagcdn.com/w320/gp.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+590',
    examplePhone: '+590 690 00 12 34'
  },
  {
    countryCode: 'GM',
    countryName: 'Gambia',
    flagUrl: 'https://flagcdn.com/w320/gm.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+220',
    examplePhone: '+220 301 2345'
  },
  {
    countryCode: 'GW',
    countryName: 'Guinea-Bissau',
    flagUrl: 'https://flagcdn.com/w320/gw.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+245',
    examplePhone: '+245 955 012 345'
  },
  {
    countryCode: 'GQ',
    countryName: 'Equatorial Guinea',
    flagUrl: 'https://flagcdn.com/w320/gq.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+240',
    examplePhone: '+240 222 123 456'
  },
  {
    countryCode: 'GR',
    countryName: 'Greece',
    flagUrl: 'https://flagcdn.com/w320/gr.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+30',
    examplePhone: '+30 691 234 5678'
  },
  {
    countryCode: 'GD',
    countryName: 'Grenada',
    flagUrl: 'https://flagcdn.com/w320/gd.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 473-403-1234'
  },
  {
    countryCode: 'GL',
    countryName: 'Greenland',
    flagUrl: 'https://flagcdn.com/w320/gl.png',
    phoneRegex: '\\d{6}',
    phonePrefix: '+299',
    examplePhone: '+299 22 12 34'
  },
  {
    countryCode: 'GT',
    countryName: 'Guatemala',
    flagUrl: 'https://flagcdn.com/w320/gt.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+502',
    examplePhone: '+502 5123 4567'
  },
  {
    countryCode: 'GF',
    countryName: 'French Guiana',
    flagUrl: 'https://flagcdn.com/w320/gf.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+594',
    examplePhone: '+594 694 20 12 34'
  },
  {
    countryCode: 'GU',
    countryName: 'Guam',
    flagUrl: 'https://flagcdn.com/w320/gu.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 671-300-1234'
  },
  {
    countryCode: 'GY',
    countryName: 'Guyana',
    flagUrl: 'https://flagcdn.com/w320/gy.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+592',
    examplePhone: '+592 609 1234'
  },
  {
    countryCode: 'HK',
    countryName: 'Hong Kong',
    flagUrl: 'https://flagcdn.com/w320/hk.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+852',
    examplePhone: '+852 5123 4567'
  },
  {
    countryCode: 'HN',
    countryName: 'Honduras',
    flagUrl: 'https://flagcdn.com/w320/hn.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+504',
    examplePhone: '+504 9123-4567'
  },
  {
    countryCode: 'HR',
    countryName: 'Croatia',
    flagUrl: 'https://flagcdn.com/w320/hr.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+385',
    examplePhone: '+385 92 123 4567'
  },
  {
    countryCode: 'HT',
    countryName: 'Haiti',
    flagUrl: 'https://flagcdn.com/w320/ht.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+509',
    examplePhone: '+509 34 10 1234'
  },
  {
    countryCode: 'HU',
    countryName: 'Hungary',
    flagUrl: 'https://flagcdn.com/w320/hu.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+36',
    examplePhone: '+36 20 123 4567'
  },
  {
    countryCode: 'ID',
    countryName: 'Indonesia',
    flagUrl: 'https://flagcdn.com/w320/id.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+62',
    examplePhone: '+62 812-345-678'
  },
  {
    countryCode: 'IM',
    countryName: 'Isle of Man',
    flagUrl: 'https://flagcdn.com/w320/im.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+44',
    examplePhone: '+44 7924 123456'
  },
  {
    countryCode: 'IN',
    countryName: 'India',
    flagUrl: 'https://flagcdn.com/w320/in.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+91',
    examplePhone: '+91 81234 56789'
  },
  {
    countryCode: 'IO',
    countryName: 'British Indian Ocean Territory',
    flagUrl: 'https://flagcdn.com/w320/io.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+246',
    examplePhone: '+246 380 1234'
  },
  {
    countryCode: 'IE',
    countryName: 'Ireland',
    flagUrl: 'https://flagcdn.com/w320/ie.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+353',
    examplePhone: '+353 85 012 3456'
  },
  {
    countryCode: 'IR',
    countryName: 'Iran, Islamic Republic of',
    flagUrl: 'https://flagcdn.com/w320/ir.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+98',
    examplePhone: '+98 912 345 6789'
  },
  {
    countryCode: 'IQ',
    countryName: 'Iraq',
    flagUrl: 'https://flagcdn.com/w320/iq.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+964',
    examplePhone: '+964 791 234 5678'
  },
  {
    countryCode: 'IS',
    countryName: 'Iceland',
    flagUrl: 'https://flagcdn.com/w320/is.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+354',
    examplePhone: '+354 611 1234'
  },
  {
    countryCode: 'IL',
    countryName: 'Israel',
    flagUrl: 'https://flagcdn.com/w320/il.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+972',
    examplePhone: '+972 50-234-5678'
  },
  {
    countryCode: 'IT',
    countryName: 'Italy',
    flagUrl: 'https://flagcdn.com/w320/it.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+39',
    examplePhone: '+39 312 345 6789'
  },
  {
    countryCode: 'JM',
    countryName: 'Jamaica',
    flagUrl: 'https://flagcdn.com/w320/jm.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 876-210-1234'
  },
  {
    countryCode: 'JE',
    countryName: 'Jersey',
    flagUrl: 'https://flagcdn.com/w320/je.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+44',
    examplePhone: '+44 7797 712345'
  },
  {
    countryCode: 'JO',
    countryName: 'Jordan',
    flagUrl: 'https://flagcdn.com/w320/jo.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+962',
    examplePhone: '+962 7 9012 3456'
  },
  {
    countryCode: 'JP',
    countryName: 'Japan',
    flagUrl: 'https://flagcdn.com/w320/jp.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+81',
    examplePhone: '+81 90-1234-5678'
  },
  {
    countryCode: 'KZ',
    countryName: 'Kazakhstan',
    flagUrl: 'https://flagcdn.com/w320/kz.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+7',
    examplePhone: '+7 771 000 9998'
  },
  {
    countryCode: 'KE',
    countryName: 'Kenya',
    flagUrl: 'https://flagcdn.com/w320/ke.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+254',
    examplePhone: '+254 712 123456'
  },
  {
    countryCode: 'KG',
    countryName: 'Kyrgyzstan',
    flagUrl: 'https://flagcdn.com/w320/kg.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+996',
    examplePhone: '+996 700 123 456'
  },
  {
    countryCode: 'KH',
    countryName: 'Cambodia',
    flagUrl: 'https://flagcdn.com/w320/kh.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+855',
    examplePhone: '+855 91 234 567'
  },
  {
    countryCode: 'KI',
    countryName: 'Kiribati',
    flagUrl: 'https://flagcdn.com/w320/ki.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+686',
    examplePhone: '+686 72001234'
  },
  {
    countryCode: 'KN',
    countryName: 'Saint Kitts and Nevis',
    flagUrl: 'https://flagcdn.com/w320/kn.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 869-765-2917'
  },
  {
    countryCode: 'KR',
    countryName: 'Korea, Republic of',
    flagUrl: 'https://flagcdn.com/w320/kr.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+82',
    examplePhone: '+82 10-2000-0000'
  },
  {
    countryCode: 'KW',
    countryName: 'Kuwait',
    flagUrl: 'https://flagcdn.com/w320/kw.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+965',
    examplePhone: '+965 500 12345'
  },
  {
    countryCode: 'LA',
    countryName: "Lao People's Democratic Republic",
    flagUrl: 'https://flagcdn.com/w320/la.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+856',
    examplePhone: '+856 20 23 123 456'
  },
  {
    countryCode: 'LB',
    countryName: 'Lebanon',
    flagUrl: 'https://flagcdn.com/w320/lb.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+961',
    examplePhone: '+961 71 123 456'
  },
  {
    countryCode: 'LR',
    countryName: 'Liberia',
    flagUrl: 'https://flagcdn.com/w320/lr.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+231',
    examplePhone: '+231 77 012 3456'
  },
  {
    countryCode: 'LY',
    countryName: 'Libya',
    flagUrl: 'https://flagcdn.com/w320/ly.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+218',
    examplePhone: '+218 91-2345678'
  },
  {
    countryCode: 'LC',
    countryName: 'Saint Lucia',
    flagUrl: 'https://flagcdn.com/w320/lc.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 758-284-5678'
  },
  {
    countryCode: 'LI',
    countryName: 'Liechtenstein',
    flagUrl: 'https://flagcdn.com/w320/li.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+423',
    examplePhone: '+423 660 234 567'
  },
  {
    countryCode: 'LK',
    countryName: 'Sri Lanka',
    flagUrl: 'https://flagcdn.com/w320/lk.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+94',
    examplePhone: '+94 71 234 5678'
  },
  {
    countryCode: 'LS',
    countryName: 'Lesotho',
    flagUrl: 'https://flagcdn.com/w320/ls.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+266',
    examplePhone: '+266 5012 3456'
  },
  {
    countryCode: 'LT',
    countryName: 'Lithuania',
    flagUrl: 'https://flagcdn.com/w320/lt.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+370',
    examplePhone: '+370 612 34567'
  },
  {
    countryCode: 'LU',
    countryName: 'Luxembourg',
    flagUrl: 'https://flagcdn.com/w320/lu.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+352',
    examplePhone: '+352 628 123 456'
  },
  {
    countryCode: 'LV',
    countryName: 'Latvia',
    flagUrl: 'https://flagcdn.com/w320/lv.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+371',
    examplePhone: '+371 21 234 567'
  },
  {
    countryCode: 'MO',
    countryName: 'Macao',
    flagUrl: 'https://flagcdn.com/w320/mo.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+853',
    examplePhone: '+853 6612 3456'
  },
  {
    countryCode: 'MF',
    countryName: 'Saint Martin (French part)',
    flagUrl: 'https://flagcdn.com/w320/mf.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+590',
    examplePhone: '+590 690 00 12 34'
  },
  {
    countryCode: 'MA',
    countryName: 'Morocco',
    flagUrl: 'https://flagcdn.com/w320/ma.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+212',
    examplePhone: '+212 650-123456'
  },
  {
    countryCode: 'MC',
    countryName: 'Monaco',
    flagUrl: 'https://flagcdn.com/w320/mc.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+377',
    examplePhone: '+377 6 12 34 56 78'
  },
  {
    countryCode: 'MD',
    countryName: 'Moldova, Republic of',
    flagUrl: 'https://flagcdn.com/w320/md.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+373',
    examplePhone: '+373 621 12 345'
  },
  {
    countryCode: 'MG',
    countryName: 'Madagascar',
    flagUrl: 'https://flagcdn.com/w320/mg.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+261',
    examplePhone: '+261 32 12 345 67'
  },
  {
    countryCode: 'MV',
    countryName: 'Maldives',
    flagUrl: 'https://flagcdn.com/w320/mv.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+960',
    examplePhone: '+960 771-2345'
  },
  {
    countryCode: 'MX',
    countryName: 'Mexico',
    flagUrl: 'https://flagcdn.com/w320/mx.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+52',
    examplePhone: '+52 222 123 4567'
  },
  {
    countryCode: 'MH',
    countryName: 'Marshall Islands',
    flagUrl: 'https://flagcdn.com/w320/mh.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+692',
    examplePhone: '+692 235-1234'
  },
  {
    countryCode: 'MK',
    countryName: 'North Macedonia',
    flagUrl: 'https://flagcdn.com/w320/mk.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+389',
    examplePhone: '+389 72 345 678'
  },
  {
    countryCode: 'ML',
    countryName: 'Mali',
    flagUrl: 'https://flagcdn.com/w320/ml.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+223',
    examplePhone: '+223 65 01 23 45'
  },
  {
    countryCode: 'MT',
    countryName: 'Malta',
    flagUrl: 'https://flagcdn.com/w320/mt.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+356',
    examplePhone: '+356 9696 1234'
  },
  {
    countryCode: 'MM',
    countryName: 'Myanmar',
    flagUrl: 'https://flagcdn.com/w320/mm.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+95',
    examplePhone: '+95 9 212 3456'
  },
  {
    countryCode: 'ME',
    countryName: 'Montenegro',
    flagUrl: 'https://flagcdn.com/w320/me.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+382',
    examplePhone: '+382 67 622 901'
  },
  {
    countryCode: 'MN',
    countryName: 'Mongolia',
    flagUrl: 'https://flagcdn.com/w320/mn.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+976',
    examplePhone: '+976 8812 3456'
  },
  {
    countryCode: 'MP',
    countryName: 'Northern Mariana Islands',
    flagUrl: 'https://flagcdn.com/w320/mp.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 670-234-5678'
  },
  {
    countryCode: 'MZ',
    countryName: 'Mozambique',
    flagUrl: 'https://flagcdn.com/w320/mz.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+258',
    examplePhone: '+258 82 123 4567'
  },
  {
    countryCode: 'MR',
    countryName: 'Mauritania',
    flagUrl: 'https://flagcdn.com/w320/mr.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+222',
    examplePhone: '+222 22 12 34 56'
  },
  {
    countryCode: 'MS',
    countryName: 'Montserrat',
    flagUrl: 'https://flagcdn.com/w320/ms.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 664-492-3456'
  },
  {
    countryCode: 'MQ',
    countryName: 'Martinique',
    flagUrl: 'https://flagcdn.com/w320/mq.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+596',
    examplePhone: '+596 696 20 12 34'
  },
  {
    countryCode: 'MU',
    countryName: 'Mauritius',
    flagUrl: 'https://flagcdn.com/w320/mu.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+230',
    examplePhone: '+230 5251 2345'
  },
  {
    countryCode: 'MW',
    countryName: 'Malawi',
    flagUrl: 'https://flagcdn.com/w320/mw.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+265',
    examplePhone: '+265 991 23 45 67'
  },
  {
    countryCode: 'MY',
    countryName: 'Malaysia',
    flagUrl: 'https://flagcdn.com/w320/my.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+60',
    examplePhone: '+60 12-345 6789'
  },
  {
    countryCode: 'YT',
    countryName: 'Mayotte',
    flagUrl: 'https://flagcdn.com/w320/yt.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+262',
    examplePhone: '+262 639 01 23 45'
  },
  {
    countryCode: 'NA',
    countryName: 'Namibia',
    flagUrl: 'https://flagcdn.com/w320/na.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+264',
    examplePhone: '+264 81 123 4567'
  },
  {
    countryCode: 'NC',
    countryName: 'New Caledonia',
    flagUrl: 'https://flagcdn.com/w320/nc.png',
    phoneRegex: '\\d{6}',
    phonePrefix: '+687',
    examplePhone: '+687 75.12.34'
  },
  {
    countryCode: 'NE',
    countryName: 'Niger',
    flagUrl: 'https://flagcdn.com/w320/ne.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+227',
    examplePhone: '+227 93 12 34 56'
  },
  {
    countryCode: 'NF',
    countryName: 'Norfolk Island',
    flagUrl: 'https://flagcdn.com/w320/nf.png',
    phoneRegex: '\\d{6}',
    phonePrefix: '+672',
    examplePhone: '+672 3 81234'
  },
  {
    countryCode: 'NG',
    countryName: 'Nigeria',
    flagUrl: 'https://flagcdn.com/w320/ng.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+234',
    examplePhone: '+234 802 123 4567'
  },
  {
    countryCode: 'NI',
    countryName: 'Nicaragua',
    flagUrl: 'https://flagcdn.com/w320/ni.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+505',
    examplePhone: '+505 8123 4567'
  },
  {
    countryCode: 'NU',
    countryName: 'Niue',
    flagUrl: 'https://flagcdn.com/w320/nu.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+683',
    examplePhone: '+683 888 4012'
  },
  {
    countryCode: 'NL',
    countryName: 'Netherlands',
    flagUrl: 'https://flagcdn.com/w320/nl.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+31',
    examplePhone: '+31 6 12345678'
  },
  {
    countryCode: 'NO',
    countryName: 'Norway',
    flagUrl: 'https://flagcdn.com/w320/no.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+47',
    examplePhone: '+47 40 61 23 45'
  },
  {
    countryCode: 'NP',
    countryName: 'Nepal',
    flagUrl: 'https://flagcdn.com/w320/np.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+977',
    examplePhone: '+977 984-1234567'
  },
  {
    countryCode: 'NR',
    countryName: 'Nauru',
    flagUrl: 'https://flagcdn.com/w320/nr.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+674',
    examplePhone: '+674 555 1234'
  },
  {
    countryCode: 'NZ',
    countryName: 'New Zealand',
    flagUrl: 'https://flagcdn.com/w320/nz.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+64',
    examplePhone: '+64 21 123 4567'
  },
  {
    countryCode: 'OM',
    countryName: 'Oman',
    flagUrl: 'https://flagcdn.com/w320/om.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+968',
    examplePhone: '+968 9212 3456'
  },
  {
    countryCode: 'PK',
    countryName: 'Pakistan',
    flagUrl: 'https://flagcdn.com/w320/pk.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+92',
    examplePhone: '+92 301 2345678'
  },
  {
    countryCode: 'PA',
    countryName: 'Panama',
    flagUrl: 'https://flagcdn.com/w320/pa.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+507',
    examplePhone: '+507 6123-4567'
  },
  {
    countryCode: 'PE',
    countryName: 'Peru',
    flagUrl: 'https://flagcdn.com/w320/pe.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+51',
    examplePhone: '+51 912 345 678'
  },
  {
    countryCode: 'PH',
    countryName: 'Philippines',
    flagUrl: 'https://flagcdn.com/w320/ph.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+63',
    examplePhone: '+63 905 123 4567'
  },
  {
    countryCode: 'PW',
    countryName: 'Palau',
    flagUrl: 'https://flagcdn.com/w320/pw.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+680',
    examplePhone: '+680 620 1234'
  },
  {
    countryCode: 'PG',
    countryName: 'Papua New Guinea',
    flagUrl: 'https://flagcdn.com/w320/pg.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+675',
    examplePhone: '+675 7012 3456'
  },
  {
    countryCode: 'PL',
    countryName: 'Poland',
    flagUrl: 'https://flagcdn.com/w320/pl.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+48',
    examplePhone: '+48 512 345 678'
  },
  {
    countryCode: 'PR',
    countryName: 'Puerto Rico',
    flagUrl: 'https://flagcdn.com/w320/pr.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 787-234-5678'
  },
  {
    countryCode: 'KP',
    countryName: "Korea, Democratic People's Republic of",
    flagUrl: 'https://flagcdn.com/w320/kp.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+850',
    examplePhone: '+850 192 123 4567'
  },
  {
    countryCode: 'PT',
    countryName: 'Portugal',
    flagUrl: 'https://flagcdn.com/w320/pt.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+351',
    examplePhone: '+351 912 345 678'
  },
  {
    countryCode: 'PY',
    countryName: 'Paraguay',
    flagUrl: 'https://flagcdn.com/w320/py.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+595',
    examplePhone: '+595 961 456789'
  },
  {
    countryCode: 'PS',
    countryName: 'Palestine, State of',
    flagUrl: 'https://flagcdn.com/w320/ps.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+970',
    examplePhone: '+970 599 123 456'
  },
  {
    countryCode: 'PF',
    countryName: 'French Polynesia',
    flagUrl: 'https://flagcdn.com/w320/pf.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+689',
    examplePhone: '+689 87 12 34 56'
  },
  {
    countryCode: 'QA',
    countryName: 'Qatar',
    flagUrl: 'https://flagcdn.com/w320/qa.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+974',
    examplePhone: '+974 3312 3456'
  },
  {
    countryCode: 'RE',
    countryName: 'Réunion',
    flagUrl: 'https://flagcdn.com/w320/re.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+262',
    examplePhone: '+262 692 12 34 56'
  },
  {
    countryCode: 'RO',
    countryName: 'Romania',
    flagUrl: 'https://flagcdn.com/w320/ro.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+40',
    examplePhone: '+40 712 034 567'
  },
  {
    countryCode: 'RU',
    countryName: 'Russian Federation',
    flagUrl: 'https://flagcdn.com/w320/ru.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+7',
    examplePhone: '+7 912 345-67-89'
  },
  {
    countryCode: 'RW',
    countryName: 'Rwanda',
    flagUrl: 'https://flagcdn.com/w320/rw.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+250',
    examplePhone: '+250 720 123 456'
  },
  {
    countryCode: 'SA',
    countryName: 'Saudi Arabia',
    flagUrl: 'https://flagcdn.com/w320/sa.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+966',
    examplePhone: '+966 51 234 5678'
  },
  {
    countryCode: 'SD',
    countryName: 'Sudan',
    flagUrl: 'https://flagcdn.com/w320/sd.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+249',
    examplePhone: '+249 91 123 1234'
  },
  {
    countryCode: 'SN',
    countryName: 'Senegal',
    flagUrl: 'https://flagcdn.com/w320/sn.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+221',
    examplePhone: '+221 70 123 45 67'
  },
  {
    countryCode: 'SG',
    countryName: 'Singapore',
    flagUrl: 'https://flagcdn.com/w320/sg.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+65',
    examplePhone: '+65 8123 4567'
  },
  {
    countryCode: 'SH',
    countryName: 'Saint Helena, Ascension and Tristan da Cunha',
    flagUrl: 'https://flagcdn.com/w320/sh.png',
    phoneRegex: '\\d{5}',
    phonePrefix: '+290',
    examplePhone: '+290 51234'
  },
  {
    countryCode: 'SJ',
    countryName: 'Svalbard and Jan Mayen',
    flagUrl: 'https://flagcdn.com/w320/sj.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+47',
    examplePhone: '+47 41 23 45 67'
  },
  {
    countryCode: 'SB',
    countryName: 'Solomon Islands',
    flagUrl: 'https://flagcdn.com/w320/sb.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+677',
    examplePhone: '+677 74 21234'
  },
  {
    countryCode: 'SL',
    countryName: 'Sierra Leone',
    flagUrl: 'https://flagcdn.com/w320/sl.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+232',
    examplePhone: '+232 25 123456'
  },
  {
    countryCode: 'SV',
    countryName: 'El Salvador',
    flagUrl: 'https://flagcdn.com/w320/sv.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+503',
    examplePhone: '+503 7012 3456'
  },
  {
    countryCode: 'SM',
    countryName: 'San Marino',
    flagUrl: 'https://flagcdn.com/w320/sm.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+378',
    examplePhone: '+378 66 66 12 12'
  },
  {
    countryCode: 'SO',
    countryName: 'Somalia',
    flagUrl: 'https://flagcdn.com/w320/so.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+252',
    examplePhone: '+252 7 1123456'
  },
  {
    countryCode: 'PM',
    countryName: 'Saint Pierre and Miquelon',
    flagUrl: 'https://flagcdn.com/w320/pm.png',
    phoneRegex: '\\d{6}',
    phonePrefix: '+508',
    examplePhone: '+508 55 12 34'
  },
  {
    countryCode: 'RS',
    countryName: 'Serbia',
    flagUrl: 'https://flagcdn.com/w320/rs.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+381',
    examplePhone: '+381 60 1234567'
  },
  {
    countryCode: 'SS',
    countryName: 'South Sudan',
    flagUrl: 'https://flagcdn.com/w320/ss.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+211',
    examplePhone: '+211 977 123 456'
  },
  {
    countryCode: 'ST',
    countryName: 'Sao Tome and Principe',
    flagUrl: 'https://flagcdn.com/w320/st.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+239',
    examplePhone: '+239 981 2345'
  },
  {
    countryCode: 'SR',
    countryName: 'Suriname',
    flagUrl: 'https://flagcdn.com/w320/sr.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+597',
    examplePhone: '+597 741-2345'
  },
  {
    countryCode: 'SK',
    countryName: 'Slovakia',
    flagUrl: 'https://flagcdn.com/w320/sk.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+421',
    examplePhone: '+421 912 123 456'
  },
  {
    countryCode: 'SI',
    countryName: 'Slovenia',
    flagUrl: 'https://flagcdn.com/w320/si.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+386',
    examplePhone: '+386 31 234 567'
  },
  {
    countryCode: 'SE',
    countryName: 'Sweden',
    flagUrl: 'https://flagcdn.com/w320/se.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+46',
    examplePhone: '+46 70 123 45 67'
  },
  {
    countryCode: 'SZ',
    countryName: 'Eswatini',
    flagUrl: 'https://flagcdn.com/w320/sz.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+268',
    examplePhone: '+268 7612 3456'
  },
  {
    countryCode: 'SX',
    countryName: 'Sint Maarten (Dutch part)',
    flagUrl: 'https://flagcdn.com/w320/sx.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 721-520-5678'
  },
  {
    countryCode: 'SC',
    countryName: 'Seychelles',
    flagUrl: 'https://flagcdn.com/w320/sc.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+248',
    examplePhone: '+248 2 510 123'
  },
  {
    countryCode: 'SY',
    countryName: 'Syrian Arab Republic',
    flagUrl: 'https://flagcdn.com/w320/sy.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+963',
    examplePhone: '+963 944 567 890'
  },
  {
    countryCode: 'TC',
    countryName: 'Turks and Caicos Islands',
    flagUrl: 'https://flagcdn.com/w320/tc.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 649-231-1234'
  },
  {
    countryCode: 'TD',
    countryName: 'Chad',
    flagUrl: 'https://flagcdn.com/w320/td.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+235',
    examplePhone: '+235 63 01 23 45'
  },
  {
    countryCode: 'TG',
    countryName: 'Togo',
    flagUrl: 'https://flagcdn.com/w320/tg.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+228',
    examplePhone: '+228 90 11 23 45'
  },
  {
    countryCode: 'TH',
    countryName: 'Thailand',
    flagUrl: 'https://flagcdn.com/w320/th.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+66',
    examplePhone: '+66 81 234 5678'
  },
  {
    countryCode: 'TJ',
    countryName: 'Tajikistan',
    flagUrl: 'https://flagcdn.com/w320/tj.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+992',
    examplePhone: '+992 91 712 3456'
  },
  {
    countryCode: 'TK',
    countryName: 'Tokelau',
    flagUrl: 'https://flagcdn.com/w320/tk.png',
    phoneRegex: '\\d{4}',
    phonePrefix: '+690',
    examplePhone: '+690 7290'
  },
  {
    countryCode: 'TM',
    countryName: 'Turkmenistan',
    flagUrl: 'https://flagcdn.com/w320/tm.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+993',
    examplePhone: '+993 66 123456'
  },
  {
    countryCode: 'TL',
    countryName: 'Timor-Leste',
    flagUrl: 'https://flagcdn.com/w320/tl.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+670',
    examplePhone: '+670 7721 2345'
  },
  {
    countryCode: 'TO',
    countryName: 'Tonga',
    flagUrl: 'https://flagcdn.com/w320/to.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+676',
    examplePhone: '+676 771 5123'
  },
  {
    countryCode: 'TT',
    countryName: 'Trinidad and Tobago',
    flagUrl: 'https://flagcdn.com/w320/tt.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 868-291-1234'
  },
  {
    countryCode: 'TN',
    countryName: 'Tunisia',
    flagUrl: 'https://flagcdn.com/w320/tn.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+216',
    examplePhone: '+216 20 123 456'
  },
  {
    countryCode: 'TR',
    countryName: 'Türkiye',
    flagUrl: 'https://flagcdn.com/w320/tr.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+90',
    examplePhone: '+90 501 234 56 78'
  },
  {
    countryCode: 'TV',
    countryName: 'Tuvalu',
    flagUrl: 'https://flagcdn.com/w320/tv.png',
    phoneRegex: '\\d{6}',
    phonePrefix: '+688',
    examplePhone: '+688 90 1234'
  },
  {
    countryCode: 'TW',
    countryName: 'Taiwan, Province of China',
    flagUrl: 'https://flagcdn.com/w320/tw.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+886',
    examplePhone: '+886 912 345 678'
  },
  {
    countryCode: 'TZ',
    countryName: 'Tanzania, United Republic of',
    flagUrl: 'https://flagcdn.com/w320/tz.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+255',
    examplePhone: '+255 621 234 567'
  },
  {
    countryCode: 'UG',
    countryName: 'Uganda',
    flagUrl: 'https://flagcdn.com/w320/ug.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+256',
    examplePhone: '+256 712 345678'
  },
  {
    countryCode: 'UA',
    countryName: 'Ukraine',
    flagUrl: 'https://flagcdn.com/w320/ua.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+380',
    examplePhone: '+380 50 123 4567'
  },
  {
    countryCode: 'UY',
    countryName: 'Uruguay',
    flagUrl: 'https://flagcdn.com/w320/uy.png',
    phoneRegex: '\\d{8}',
    phonePrefix: '+598',
    examplePhone: '+598 94 231 234'
  },
  {
    countryCode: 'US',
    countryName: 'United States',
    flagUrl: 'https://flagcdn.com/w320/us.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 201-555-0123'
  },
  {
    countryCode: 'UZ',
    countryName: 'Uzbekistan',
    flagUrl: 'https://flagcdn.com/w320/uz.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+998',
    examplePhone: '+998 91 234 56 78'
  },
  {
    countryCode: 'VA',
    countryName: 'Holy See (Vatican City State)',
    flagUrl: 'https://flagcdn.com/w320/va.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+39',
    examplePhone: '+39 312 345 6789'
  },
  {
    countryCode: 'VC',
    countryName: 'Saint Vincent and the Grenadines',
    flagUrl: 'https://flagcdn.com/w320/vc.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 784-430-1234'
  },
  {
    countryCode: 'VE',
    countryName: 'Venezuela, Bolivarian Republic of',
    flagUrl: 'https://flagcdn.com/w320/ve.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+58',
    examplePhone: '+58 412-1234567'
  },
  {
    countryCode: 'VG',
    countryName: 'Virgin Islands, British',
    flagUrl: 'https://flagcdn.com/w320/vg.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 284-300-1234'
  },
  {
    countryCode: 'VI',
    countryName: 'Virgin Islands, U.S.',
    flagUrl: 'https://flagcdn.com/w320/vi.png',
    phoneRegex: '\\d{10}',
    phonePrefix: '+1',
    examplePhone: '+1 340-642-1234'
  },
  {
    countryCode: 'VN',
    countryName: 'Viet Nam',
    flagUrl: 'https://flagcdn.com/w320/vn.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+84',
    examplePhone: '+84 912 345 678'
  },
  {
    countryCode: 'VU',
    countryName: 'Vanuatu',
    flagUrl: 'https://flagcdn.com/w320/vu.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+678',
    examplePhone: '+678 591 2345'
  },
  {
    countryCode: 'WF',
    countryName: 'Wallis and Futuna',
    flagUrl: 'https://flagcdn.com/w320/wf.png',
    phoneRegex: '\\d{6}',
    phonePrefix: '+681',
    examplePhone: '+681 82 12 34'
  },
  {
    countryCode: 'WS',
    countryName: 'Samoa',
    flagUrl: 'https://flagcdn.com/w320/ws.png',
    phoneRegex: '\\d{7}',
    phonePrefix: '+685',
    examplePhone: '+685 72 12345'
  },
  {
    countryCode: 'YE',
    countryName: 'Yemen',
    flagUrl: 'https://flagcdn.com/w320/ye.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+967',
    examplePhone: '+967 712 345 678'
  },
  {
    countryCode: 'ZA',
    countryName: 'South Africa',
    flagUrl: 'https://flagcdn.com/w320/za.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+27',
    examplePhone: '+27 71 123 4567'
  },
  {
    countryCode: 'ZM',
    countryName: 'Zambia',
    flagUrl: 'https://flagcdn.com/w320/zm.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+260',
    examplePhone: '+260 95 5123456'
  },
  {
    countryCode: 'ZW',
    countryName: 'Zimbabwe',
    flagUrl: 'https://flagcdn.com/w320/zw.png',
    phoneRegex: '\\d{9}',
    phonePrefix: '+263',
    examplePhone: '+263 71 234 5678'
  }
] as const;

export type Country = (typeof countries)[0];

export default countries;
