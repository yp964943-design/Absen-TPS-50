export interface Voter {
  no: number;
  nama: string;
  jk: "L" | "P" | string;
  alamat: string;
  rt: string;
  absensi?: string;
  hadirAt?: string | null;
  petugas?: string | null;
  catatan?: string | null;
}

export const INITIAL_VOTERS: Voter[] = [
  {
    "no": 1,
    "nama": "DESNITA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": "HADIR (19.56)"
  },
  {
    "no": 2,
    "nama": "YULIUS",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 3,
    "nama": "ISTINGANAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 4,
    "nama": "MUHAMMAD ALFAN BADRI SALAM",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 5,
    "nama": "CARINI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 6,
    "nama": "NAHROWI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 7,
    "nama": "MIRI YULIANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 8,
    "nama": "RHEISKYANA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": "HADIR (19.32)"
  },
  {
    "no": 9,
    "nama": "MOH IRKHAM ZAMANI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 10,
    "nama": "PRIANDO LUMBAN RAJA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 11,
    "nama": "LELY KRISNA RISWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 12,
    "nama": "ABDURRAHMAN NAJIB HAKIM",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 13,
    "nama": "GINANJAR LUKMAN HAKIM",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 14,
    "nama": "PIPIH NURSIPAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 15,
    "nama": "NADA SALSABILA HAKIM",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 16,
    "nama": "MIA YENNIATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 17,
    "nama": "AGUNG BASUKI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 18,
    "nama": "BILQIS TRIAJI MAHEWARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 19,
    "nama": "SABRIYAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 20,
    "nama": "TRIYONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 21,
    "nama": "HEVY KURNIANINGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 22,
    "nama": "JAENAL PANANI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 23,
    "nama": "MUHAMMAD ZAYN AL MUBAAROK",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 24,
    "nama": "SITI MASRUFIN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 25,
    "nama": "UTAMI DIAN PERTIWI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 26,
    "nama": "SITI RAHMAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 27,
    "nama": "TASYA AULIYA ARIFANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 28,
    "nama": "SAIRUN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 29,
    "nama": "AYUNDA NAFISA SYAFA HUMAIRO",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 30,
    "nama": "NIA INDAH KARUNIAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 31,
    "nama": "NOVALIA INDAH PERTIWI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 32,
    "nama": "ENY YULIATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 33,
    "nama": "SUGITO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 34,
    "nama": "THARIQ ABIDURRAHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 35,
    "nama": "ARIF RAHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 36,
    "nama": "ATIK DIAN ASTUTY",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 37,
    "nama": "AGUS BUDIONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 38,
    "nama": "NURUN CHAYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 39,
    "nama": "JULIANA ARIANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 40,
    "nama": "IPUK TU SETYOWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 41,
    "nama": "SURYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 42,
    "nama": "ALOYSIUS NGGAWI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 43,
    "nama": "LANUCI FIRSTA AMARTA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 44,
    "nama": "WAHYU MARYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 45,
    "nama": "AGUS MARWANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 46,
    "nama": "THEGAR PUTRA RAHAYU",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 47,
    "nama": "PENI YULI RAHMADANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 48,
    "nama": "SRI RAHAYU",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 49,
    "nama": "SURITA PURNAMA SARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 50,
    "nama": "IBNU HARIS SETIAWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 51,
    "nama": "GALIH SATRIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 52,
    "nama": "RISWANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 53,
    "nama": "BUDIYONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 54,
    "nama": "SUMARSIH SRENGGIANAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 55,
    "nama": "HAFIZ",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 56,
    "nama": "EDI SYURYA KESUMA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 57,
    "nama": "SANOVAL",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 58,
    "nama": "HELEN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 59,
    "nama": "DAFA AJI EKO NUGROHO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 60,
    "nama": "HERI PURNOMO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 61,
    "nama": "SUSILOWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 62,
    "nama": "KANTHI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 63,
    "nama": "JARWATIK",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 64,
    "nama": "AMIR ZUFAR",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 65,
    "nama": "ULFA KARLINA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 66,
    "nama": "YAYAN PERMANA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 67,
    "nama": "UUN YUNINGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 68,
    "nama": "ALFIYAH FATIKA RAKHMAN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 69,
    "nama": "SITI FATONAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 70,
    "nama": "NURROHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 71,
    "nama": "HERI SETIAWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 72,
    "nama": "NIKA FIRASTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 73,
    "nama": "RINI LESTARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 74,
    "nama": "DIDIK WAHYU HARNADI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 75,
    "nama": "FAREZAH IKSAN ADILI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 76,
    "nama": "YULITA SARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 77,
    "nama": "SUBARJO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 78,
    "nama": "PIPIN FITRIANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 79,
    "nama": "USEP SUYANDI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 80,
    "nama": "LILIS RIYANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 81,
    "nama": "DIDI JUNEDI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 82,
    "nama": "BERLIANA DIVA RAMADHANY",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 83,
    "nama": "BERLIN WAHYU HARDINTA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 84,
    "nama": "SUHAIDAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 85,
    "nama": "FAUZY AZIS",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 86,
    "nama": "MUNARIAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 87,
    "nama": "HERU KOESDIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 88,
    "nama": "RICKI FIRMANSYAH",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 89,
    "nama": "RETNO ASTRIA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 90,
    "nama": "HENDRA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 91,
    "nama": "KRISNIA PUSPITASARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 92,
    "nama": "BUMI ALIF AZZURRO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 93,
    "nama": "NUR FATMIKASARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 94,
    "nama": "SYAMSUL JAFRI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 95,
    "nama": "INDAH SUCI LESTARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 96,
    "nama": "DEVI WIDIAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 97,
    "nama": "IRWAN ANDI ARSAH",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 98,
    "nama": "KHORIYAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 99,
    "nama": "ABUSERI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 100,
    "nama": "CASMININGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 101,
    "nama": "DENY SUKIRNO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 102,
    "nama": "AMELIA ALPHABENITA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 103,
    "nama": "ISMAN JUMAEDI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 104,
    "nama": "MARLIN FADILA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 105,
    "nama": "M.BRILIANDI TSUYOSA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 106,
    "nama": "ATIK SITI ATIKAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 107,
    "nama": "KHAERULLOH",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 108,
    "nama": "PANCA WIDI SUSANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 109,
    "nama": "SRI MULYANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 110,
    "nama": "LILI SUPIKA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 111,
    "nama": "KUSBIANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 112,
    "nama": "YENI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 113,
    "nama": "MAILINDA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 114,
    "nama": "DICKI ANDRIANUS TINAMBUNAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 115,
    "nama": "MUSTOFA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 116,
    "nama": "SURYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 117,
    "nama": "GANY BANI ISNANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 118,
    "nama": "DESMAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 119,
    "nama": "SUTOJO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 120,
    "nama": "FANDY SETIAWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 121,
    "nama": "MUHAMAD SAIFUL",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 122,
    "nama": "NURUL FITDIYAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 123,
    "nama": "VENTY KARMIATY",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 124,
    "nama": "YUDI WIDIARTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 125,
    "nama": "TUGIYONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 126,
    "nama": "WARYANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 127,
    "nama": "MUHAMMAD FAWWAZ ALIFIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 128,
    "nama": "MUTMAINAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 129,
    "nama": "EDY YUNANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 130,
    "nama": "EKA HEDIYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 131,
    "nama": "FEBRIADI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 132,
    "nama": "APRILIA RESTI INDAH RACHMAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 133,
    "nama": "MUHAMMAD RIDWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 134,
    "nama": "REGINA LYDIA DELLA AYUNINGTYAS",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 135,
    "nama": "LISNAWATY MARIA SIHOMBING",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 136,
    "nama": "ANITA YULIANA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 137,
    "nama": "SANDRA IRAWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 138,
    "nama": "MOHAMAD SYUKUR",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 139,
    "nama": "SRI SULARMI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 140,
    "nama": "NIHLA SYAFIRA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 141,
    "nama": "URFA INSAINI SADIDA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 142,
    "nama": "BINTANG ARI WIBOWO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 143,
    "nama": "BUNGA DWIANA PUTRI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 144,
    "nama": "HENING SETIANINGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 145,
    "nama": "GUNTUR SATRIA DARMAWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 146,
    "nama": "SUTIYEM",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 147,
    "nama": "SUHARYO HADI WIBOWO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 148,
    "nama": "RETNO INDRIYANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 149,
    "nama": "SARWANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 150,
    "nama": "NGATINI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 151,
    "nama": "KRISYANTA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 152,
    "nama": "ANNELIESE PUTRILIA YUDIANA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 153,
    "nama": "YULIATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 154,
    "nama": "YADI YUDIANA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 155,
    "nama": "SUTARMI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 156,
    "nama": "JARUM LESTARI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 157,
    "nama": "MURIDATIN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 158,
    "nama": "SUWIYAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 159,
    "nama": "WINDA ENDARWIYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 160,
    "nama": "SUYATNO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 161,
    "nama": "IZZUDDIN FAIQURRAHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 162,
    "nama": "ZAHRA ZAIZAFA SALSABILA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 163,
    "nama": "DZAKI FATAN HUDA AZKIYA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 164,
    "nama": "AHMAD IQBAL BURHANUDDIN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 165,
    "nama": "SILKY SEPTIAN AZZAHRA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 166,
    "nama": "MAULANA SYARIEF",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 167,
    "nama": "FATIMAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 168,
    "nama": "ASNI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 169,
    "nama": "ROHANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 170,
    "nama": "NANDA APRILIANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 171,
    "nama": "MARIA LOUISE ARNRTA YESHAJI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 172,
    "nama": "RUFAIDAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 173,
    "nama": "RASYDAN SHIDIQ AZIZI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 174,
    "nama": "RISKA LUTHFI ARDINI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 175,
    "nama": "RAFIF RASYAD RISQULLAH",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 176,
    "nama": "ARIEF RACHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 177,
    "nama": "DISYA THALIA SARMAN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 178,
    "nama": "FAHRUR ROZI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 179,
    "nama": "RAUDHEA ARUM IRHAMI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 180,
    "nama": "RIZAL RISKANA YUNANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 181,
    "nama": "KURNIA WIJIASIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 182,
    "nama": "RAFI ARSY ZAMZAMI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 183,
    "nama": "ZAHRA NURUL AZKIA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 184,
    "nama": "MUHMMAD ALIF ALFARIZI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 185,
    "nama": "ALMAS FAIRUZ MUDZAKKIR",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 186,
    "nama": "LUTHFIA DINI AZZAHRA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 187,
    "nama": "SYAFIQ IBADURRAHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 188,
    "nama": "HADZIQ SHOFIYYURRAHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 189,
    "nama": "SORKAM",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 190,
    "nama": "NURHAPSIA POHAN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 191,
    "nama": "PAJRA AMALIA BATUBARA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 192,
    "nama": "MAZAYA AIKA YUDIANA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 193,
    "nama": "KESSY AUNEZA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 194,
    "nama": "AZKI RHEISYVA KAILANIY",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 195,
    "nama": "ADLY ARIC RIYANDI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 196,
    "nama": "BASUKI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 197,
    "nama": "ISLAMIYAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 198,
    "nama": "SAYID ISHAK",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 199,
    "nama": "NURAINI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "5",
    "absensi": ""
  },
  {
    "no": 200,
    "nama": "DEDEN ALFARIZI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 201,
    "nama": "NINING SUHARNI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 202,
    "nama": "ERNAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 203,
    "nama": "IMAM DWI WARDANA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 204,
    "nama": "NOFAN BUDIARTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 205,
    "nama": "RONNY",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 206,
    "nama": "ERY SUHERTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 207,
    "nama": "ANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 208,
    "nama": "SUGIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 209,
    "nama": "IMAM TAJRI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 210,
    "nama": "SITI AISAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 211,
    "nama": "FAIZ RAFIQI RAHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 212,
    "nama": "RAHMAN YANDHI WILUJENG",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 213,
    "nama": "FETRIA NORA AFRIYUNI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 214,
    "nama": "LIVIA NUNGKI SAPUTRI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 215,
    "nama": "SUPRIYANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 216,
    "nama": "SAYUTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 217,
    "nama": "EKO SUSANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 218,
    "nama": "ROSMAWATY SARAGIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 219,
    "nama": "OJAK PARLINTONGAN SINAGA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 220,
    "nama": "NAFIIS RAWIANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 221,
    "nama": "PUJI KUSWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 222,
    "nama": "WINARTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 223,
    "nama": "DWI LESTARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 224,
    "nama": "BENY UTOMO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 225,
    "nama": "EMMA MARLIANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 226,
    "nama": "RONI SOMANTRI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 227,
    "nama": "JUMARI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 228,
    "nama": "RINA SUSWANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 229,
    "nama": "TUTI IRI YANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 230,
    "nama": "PURWANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 231,
    "nama": "MUHAMMAD ILHAM ARHAB",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 232,
    "nama": "MUHAMMAD NAUFAL ADILLA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 233,
    "nama": "MUHAMMAD YUSRIZAL MAHENDRA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 234,
    "nama": "IRIANI SYAM",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 235,
    "nama": "MUHAMMAD YUSUF",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 236,
    "nama": "RIZWAR ACHMAD KHAIRUSYAFIQ",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 237,
    "nama": "RIKI SUHENDI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 238,
    "nama": "MUGIYARTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 239,
    "nama": "SUMARTA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 240,
    "nama": "SOLIHAH DWI SUPRIHANINGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 241,
    "nama": "WAHYU WIBOWO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 242,
    "nama": "MUHAMAD RAFLY AULIA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 243,
    "nama": "ERI RAHAYU",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 244,
    "nama": "SRI WIDAYAT",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 245,
    "nama": "HENI PURWANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 246,
    "nama": "TUKARDI EKO SURYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 247,
    "nama": "TRIA OKTAFIYANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 248,
    "nama": "DIAHAYU PUTRI PUSPITASARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 249,
    "nama": "SUPARTIN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 250,
    "nama": "BUDIONO REKAFAUZI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 251,
    "nama": "MUNTAMAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 252,
    "nama": "WINDY NERISSA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 253,
    "nama": "SUYADI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 254,
    "nama": "SINDY KARLISTA NINGTIAS",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 255,
    "nama": "ENDANG SUWARSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 256,
    "nama": "ATIRAH SHAFA RAMADHANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 257,
    "nama": "SITTI HAERANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 258,
    "nama": "ROMI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 259,
    "nama": "JOHANES MARSEL LUMBAN TUNGKUP",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 260,
    "nama": "JULIANA SIAHAAN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 261,
    "nama": "SUPARMAN LUMBAN TUNGKUP",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 262,
    "nama": "SUSI SRI MARYANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 263,
    "nama": "FAUZI PURNOMO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 264,
    "nama": "FERI SANTRIANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 265,
    "nama": "SUMARTINAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 266,
    "nama": "SURYA HADI JAYA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 267,
    "nama": "NUR AZIZAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 268,
    "nama": "IWAN KURNIAWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 269,
    "nama": "ABID BIAGGI AYYASI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 270,
    "nama": "FITRIA AGUSTIN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 271,
    "nama": "ADI CATUR NUGROHO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 272,
    "nama": "SRI SISKA YANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 273,
    "nama": "MILKI SUJIANA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 274,
    "nama": "FIRMAN GIANTORO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 275,
    "nama": "DEYASTARI FERALDA AISYAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 276,
    "nama": "ABDULAH SATAR",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 277,
    "nama": "AJENG SARASWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 278,
    "nama": "MELA IMAS ADAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 279,
    "nama": "AD TOHA ISKANDAR",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 280,
    "nama": "SUPITRI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 281,
    "nama": "SUSANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 282,
    "nama": "DEWI TRI PURWANINGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 283,
    "nama": "KOMARUDIN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 284,
    "nama": "MUHAMMAD DIAZ NUGROHO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 285,
    "nama": "THOBIE RHEZA SUNDORO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 286,
    "nama": "DENI SURYANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 287,
    "nama": "IKA ROSMALA DEWI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 288,
    "nama": "IRFAN FAJAR TRESNADI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 289,
    "nama": "LITA STEVIYANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 290,
    "nama": "IKA ROMAN NURHIDAYAT",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 291,
    "nama": "AMALIA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 292,
    "nama": "BUDI SANTOSO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 293,
    "nama": "AMINAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 294,
    "nama": "LISTIYOWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 295,
    "nama": "SUMARDI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 296,
    "nama": "IDA YULIATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 297,
    "nama": "DESTI APRILIA SUDARTO",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 298,
    "nama": "SUDARTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 299,
    "nama": "RAFFY ALEXANDER",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 300,
    "nama": "NUROKHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 301,
    "nama": "TITIN SUMARNI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 302,
    "nama": "RIDWAN KATON TEGAR WICAKSANA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 303,
    "nama": "ARGA NURSETYA PRADANA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 304,
    "nama": "HARYANA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 305,
    "nama": "ENDAH RAHAYU",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 306,
    "nama": "AMELIA VEGA SEPTIANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 307,
    "nama": "ZANI ABDUL ROCHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 308,
    "nama": "ROCHMAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 309,
    "nama": "LIA ANI UTAMI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 310,
    "nama": "SUBIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 311,
    "nama": "NADIA BERLIANI ARDIYANTO",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 312,
    "nama": "WARDIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 313,
    "nama": "ALINDA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 314,
    "nama": "ALAN SETIYAWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 315,
    "nama": "SUPRAYITNO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 316,
    "nama": "MUDIANAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 317,
    "nama": "ALLINGGA NURWANDA WULANDARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 318,
    "nama": "ENDAH SULISTIANINGRUM",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 319,
    "nama": "JARWONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 320,
    "nama": "SRI RETNO SARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 321,
    "nama": "HERLAMBANG",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 322,
    "nama": "MUHAMMAD AKHDAN RIFQI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 323,
    "nama": "MUHAMMAD MUHAJIRIN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 324,
    "nama": "YOSHI LISNIAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 325,
    "nama": "RATNA YUITA SIAGIAN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 326,
    "nama": "HENRI SIPANGKAR",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 327,
    "nama": "RAMADHAN EKA PRASETYO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 328,
    "nama": "SRI HARTATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 329,
    "nama": "SARYONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 330,
    "nama": "KURNIASIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 331,
    "nama": "ROHITA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 332,
    "nama": "ABDUL ROZAK FIRMANI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 333,
    "nama": "RAHMADANI SYAH FITRI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 334,
    "nama": "ETI KUSMIATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 335,
    "nama": "MAIMUN SYAHRIL",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 336,
    "nama": "CANDENI SILVIA ROSA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 337,
    "nama": "MUH NURHUDA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 338,
    "nama": "MUJININGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 339,
    "nama": "AGUS SUGIYANTO B. JUNAEDI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 340,
    "nama": "WATI RAHMAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 341,
    "nama": "SURYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 342,
    "nama": "ARWAN YUSUF",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 343,
    "nama": "SAIFUL BAHRI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 344,
    "nama": "YUSTINA LIA WARDANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 345,
    "nama": "SEMIATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 346,
    "nama": "RACHMA MIATI ANGELIE DAMAYANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 347,
    "nama": "RATNO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 348,
    "nama": "AGUS KURNIAWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 349,
    "nama": "SUMIYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 350,
    "nama": "NUR CAHYANI WATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 351,
    "nama": "HARIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 352,
    "nama": "ELGA DWI RENGGANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 353,
    "nama": "FATMANINGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 354,
    "nama": "SLAMET RIYONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 355,
    "nama": "ALIFFIA MEIFANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 356,
    "nama": "MUHTAR BIN KADAM",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 357,
    "nama": "SURYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 358,
    "nama": "ZAMRONI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 359,
    "nama": "SITI NUR ALIYAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 360,
    "nama": "DWI RAHMAYANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 361,
    "nama": "NURBUDI AGUSMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 362,
    "nama": "IMELDA TRI ANGGRAENI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 363,
    "nama": "VANNESA CLAODIA PUTRI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 364,
    "nama": "SRI HARTATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 365,
    "nama": "NADIA ZAHRA CHAIRUNNISA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 366,
    "nama": "FAIRUZ AZHARI AZMI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 367,
    "nama": "TARISA NATANINGTYAS",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 368,
    "nama": "RINI EVITASARI SINAGA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 369,
    "nama": "ALMA SAFIRA MAHARANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 370,
    "nama": "TSANI SALSABILA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 371,
    "nama": "ATHIFA LANA ESTA LUTHFI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 372,
    "nama": "MUHAMMAD FIKRI FAKHRIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 373,
    "nama": "AMIRAH HANDAYANI PUTRI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 374,
    "nama": "KIARA SANDHITA PRAMESWARI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 375,
    "nama": "DAFFA AZKA KHAIZURIAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 376,
    "nama": "MAYLANI PUTRI NUR AFIFAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 377,
    "nama": "FATHAN AZKA HIDAYAT",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 378,
    "nama": "FADHEL ACHMAD PUTRA MAYESTA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 379,
    "nama": "OBBY PANJI SATRIA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 380,
    "nama": "NATHAN DWI CANDRA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 381,
    "nama": "RAIZYAH DWI OKTAVIANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 382,
    "nama": "SANDA NOVAYANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 383,
    "nama": "BARIQ NABIL RAHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 384,
    "nama": "ANIS WAHYUNINGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 385,
    "nama": "ALIF RIZQI FADHU RAHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 386,
    "nama": "ADITYA PUTRA ARDIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 387,
    "nama": "BINTANG AJI PAMUNGKAS",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 388,
    "nama": "JASONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 389,
    "nama": "SUDARMI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 390,
    "nama": "FITRI KRUNIATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 391,
    "nama": "VERI SUSENO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 392,
    "nama": "MUSLICHATUN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 393,
    "nama": "NEETTY VERA SINAGA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 394,
    "nama": "RINI EVITASARI SINAGA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "6",
    "absensi": ""
  },
  {
    "no": 395,
    "nama": "SUBARI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 396,
    "nama": "PRIMA SARI KARTIKA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 397,
    "nama": "MH. SOLECHUDIN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 398,
    "nama": "WIWIT HIDAYATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 399,
    "nama": "KOMARUDIN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 400,
    "nama": "RIHATUN",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 401,
    "nama": "WIDIYAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 402,
    "nama": "KRISNANTO ARIBOWO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 403,
    "nama": "SAFRIZAL ARDIANSYAH",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 404,
    "nama": "IMAM SUBARI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 405,
    "nama": "ISTIQOMAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 406,
    "nama": "SLAMET PRIYONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 407,
    "nama": "YULI BUDIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 408,
    "nama": "SALIMAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 409,
    "nama": "SUPRIADI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 410,
    "nama": "ATIEK WAHYUNI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 411,
    "nama": "ARYANTO SAYUTI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 412,
    "nama": "ROSIDAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 413,
    "nama": "SUGIYATNO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 414,
    "nama": "IKA LINDIANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 415,
    "nama": "RIA NURDIANA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 416,
    "nama": "RAHMANA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 417,
    "nama": "DIMAS ZAKIAN RAMADHAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 418,
    "nama": "NOVIA MADA GABRELLA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 419,
    "nama": "YESSA SHIFA FADHILAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 420,
    "nama": "ACHMAD WISNU NUGRAHA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 421,
    "nama": "TATI SUGIARTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 422,
    "nama": "ABDUL ROHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 423,
    "nama": "IRFAN NURDIN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 424,
    "nama": "DINI MARDIANA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 425,
    "nama": "VAHMI ALIAMIN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 426,
    "nama": "NUR DRAMESTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 427,
    "nama": "ZAINAL ARIFIN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 428,
    "nama": "SUMIATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 429,
    "nama": "MUHAMMAD RAFLI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 430,
    "nama": "TITO HENDRATU",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 431,
    "nama": "PUSPA NINGSIH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 432,
    "nama": "FAUZAN FADUHLURRAHMAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 433,
    "nama": "MUHAMMAD ARVA ARYAGUNA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 434,
    "nama": "NANANG MARDIYANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 435,
    "nama": "NURUL KHOIRIAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 436,
    "nama": "AGUNG RAHAYU",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 437,
    "nama": "IKHTIAR GUNO PRASETYO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 438,
    "nama": "LUSSY PAMILA PERANTINI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 439,
    "nama": "MOH TAUFAN PRASETYO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 440,
    "nama": "FITRI ADRILIYANI. S",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 441,
    "nama": "FIKRI HAFIZ FADILLAH",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 442,
    "nama": "ANI FITRI AMALIYA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 443,
    "nama": "DODYK RIA HERMAWAN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 444,
    "nama": "KUNI AZIZAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 445,
    "nama": "ANWAR",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 446,
    "nama": "NURJANAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 447,
    "nama": "HASYIM",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 448,
    "nama": "FATIMAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 449,
    "nama": "SYARIFFAH SALMAH NAJIHA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 450,
    "nama": "BAYU HENDRI PRIYONO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 451,
    "nama": "DINA RIZKY AMALA.S.H",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 452,
    "nama": "RAGIL SUBEKTI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 453,
    "nama": "SITI METTA PRATIWI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 454,
    "nama": "CAHYO ADY SAPUTRO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 455,
    "nama": "NIA FITRIANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 456,
    "nama": "FADLY PERMANA",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 457,
    "nama": "ROHANAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 458,
    "nama": "IMAM SUBARI",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 459,
    "nama": "ALVINTARDIYANSAH",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 460,
    "nama": "TRIYASMI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 461,
    "nama": "SAIPUL ANWAR",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 462,
    "nama": "TUTI IRMAYANTI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 463,
    "nama": "EKO PUJIARTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 464,
    "nama": "ELIAWATI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 465,
    "nama": "ROID LABIB",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 466,
    "nama": "ROIS FITRI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 467,
    "nama": "ROIK IMLEK",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 468,
    "nama": "BAYU OKTARIANSYAH",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 469,
    "nama": "DEWI SULASTRI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 470,
    "nama": "KARNO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 471,
    "nama": "MAYA",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 472,
    "nama": "NURWANTO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 473,
    "nama": "WARISAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 474,
    "nama": "OKI SAEPUDIN",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 475,
    "nama": "NANI SURYANI",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 476,
    "nama": "WAHYU NUGROHO",
    "jk": "L",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  },
  {
    "no": 477,
    "nama": "NUR KARIMAH",
    "jk": "P",
    "alamat": "PESONA GADING CIBITUNG",
    "rt": "9",
    "absensi": ""
  }
];
