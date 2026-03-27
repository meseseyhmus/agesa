import type { LearningModule, FinancialTrap, LatteFactorItem, Scenario, Level3Challenge } from '@/types';

export interface CsvModule {
  content_id: string;
  module_id: string;
  module_title: string;
  content_type: string;
  title: string;
  body_text: string;
  estimated_time_min: number;
  order_in_module: number;
  tags: string[];
  xpReward: number;
  coinReward: number;
  icon: string;
}

export const csvModules: CsvModule[] = [
  {
    content_id: 'L0001',
    module_id: 'M1',
    module_title: 'Bütçe Temelleri',
    content_type: 'text',
    title: 'Para Nereye Gidiyor?',
    body_text: `Ay sonunda paran bitiyorsa sorun her zaman az kazanmak değildir. Küçük ama sık harcamalar bütçeyi fark edilmeden eritir.

İlk adım, harcamalarını kategorilere ayırmak ve "ihtiyaç" ile "keyfi" ayrımını yapmaktır.

Basit bir kural: Önce zorunluları öde, sonra hedefin kadar birikim ayır, kalanla keyfi harcamayı yönet.`,
    estimated_time_min: 2,
    order_in_module: 1,
    tags: ['bütçe', 'ihtiyaç_keyfi', 'farkındalık'],
    xpReward: 25,
    coinReward: 12,
    icon: '💰',
  },
  {
    content_id: 'L0003',
    module_id: 'M2',
    module_title: 'Harcama Davranışı & Farkındalık',
    content_type: 'text',
    title: 'Küçük Harcamalar Büyük Etki Yaratır',
    body_text: `Günde 2–3 küçük harcama masum görünür; ancak ay sonunda ciddi bir toplam oluşturabilir.

Özellikle kahve, atıştırmalık, uygulama içi satın alma ve taksi gibi kalemler "fark edilmeden" artabilir.

Hedefin: En sık tekrar eden harcamayı bul ve bir hafta boyunca küçük bir iyileştirme dene.`,
    estimated_time_min: 2,
    order_in_module: 1,
    tags: ['harcama', 'alışkanlık', 'abonelik'],
    xpReward: 25,
    coinReward: 12,
    icon: '☕',
  },
  {
    content_id: 'L0005',
    module_id: 'M3',
    module_title: 'Birikime Giriş',
    content_type: 'text',
    title: 'Birikim: Az Ama Düzenli',
    body_text: `Birikim yapmak için büyük paralar gerekmez. Önemli olan düzenli bir alışkanlık oluşturmak ve hedef belirlemektir.

Önce acil durum fonunu düşün: Beklenmedik giderler için küçük bir yastık, stresini azaltır.

Kural: Her ay küçük bir tutarı otomatik ayırmak, "canım isterse biriktiririm"den çok daha etkilidir.`,
    estimated_time_min: 2,
    order_in_module: 1,
    tags: ['birikim', 'acil_durum', 'hedef'],
    xpReward: 30,
    coinReward: 15,
    icon: '🏦',
  },
  {
    content_id: 'L0007',
    module_id: 'M4',
    module_title: 'Enflasyon & Faiz (Basit)',
    content_type: 'text',
    title: 'Enflasyon ve Faiz Neden Önemli?',
    body_text: `Enflasyon, fiyatların genel seviyesinin artmasıdır; yani aynı parayla zamanla daha az şey alırsın.

Faiz/getiri ise paranın zaman içinde artmasıdır. Birikimini değerlendirirken enflasyon etkisini de düşünmelisin.

Basit fikir: Paranın "değerini" korumak için birikiminin getirisi, enflasyonun üzerinde olmalıdır.`,
    estimated_time_min: 2,
    order_in_module: 1,
    tags: ['enflasyon', 'faiz', 'getiri'],
    xpReward: 35,
    coinReward: 18,
    icon: '📈',
  },
  {
    content_id: 'L0009',
    module_id: 'M5',
    module_title: 'BES & Uzun Vadeli Düşünme',
    content_type: 'text',
    title: 'Uzun Vade ve BES Mantığı',
    body_text: `Uzun vadeli birikimde en güçlü etki "zaman"dır. Küçük tutarlar bile uzun vadede büyüyebilir.

BES (Bireysel Emeklilik Sistemi), düzenli birikimi teşvik eder ve devlet katkısı gibi avantajlar sunar.

Önemli ders: Erken başlamak, aylık tutarı artırmaktan bile daha büyük fark yaratabilir.`,
    estimated_time_min: 2,
    order_in_module: 1,
    tags: ['bes', 'uzun_vade', 'bileşik'],
    xpReward: 40,
    coinReward: 20,
    icon: '🚀',
  },
];

export const level1Modules: LearningModule[] = [
  {
    id: 'l1-m1',
    title: 'Davranışsal Finans 101',
    content: `Davranışsal finans, insanların finansal kararlarını psikolojik ve duygusal faktörlerin nasıl etkilediğini inceler.

Geleneksel ekonomi teorileri, insanların her zaman rasyonel kararlar aldığını varsayar. Ancak gerçek hayatta duygularımız, önyargılarımız ve sosyal baskılar kararlarımızı şekillendirir.

Bu modülde öğreneceklerin:
- Beynimizin finansal kararları nasıl verdiği
- Yaygın bilişsel önyargılar
- Duygusal harcama tetikleyicileri`,
    type: 'text',
    xpReward: 20,
    coinReward: 10,
    matrixCode: 'FINANCE_101',
  },
  {
    id: 'l1-m2',
    title: 'YOLO Spending: Anın Tutsağı',
    content: `"You Only Live Once" (Sadece bir kez yaşıyoruz) felsefesi, özellikle gençler arasında yaygın.

Belirtileri:
- "Hayat kısa" diyerek yapılan gereksiz harcamalar
- Gelecek kaygısı olmadan yaşamak
- Anlık tatmin önceliği
- Sosyal medya baskısıyla harcama

Örnek: "Bu tatil için kredi çekeyim, önemli değil, yaşamalıyım!"

Çözüm: 24 saat kuralı - Büyük harcamalardan önce 24 saat bekle.`,
    type: 'interactive',
    xpReward: 30,
    coinReward: 15,
    matrixCode: 'YOLO_TRAP',
  },
  {
    id: 'l1-m3',
    title: 'Doom Spending: Umutsuzluk Döngüsü',
    content: `Ekonomik kaygılar ve gelecek endişesi, tüketicileri "ne yapsam boş" psikolojisine sürükleyebilir.

Belirtileri:
- "Ev de alamayacağım, bari telefon alayım" düşüncesi
- Uzun vadeli hedeflerden vazgeçme
- Anlık teselli harcamaları
- Kontrol duygusunu kaybetme

Örnek: "Zaten ekonomi kötü, birikim yapsam ne olacak?"

Çözüm: Kontrol edebildiğin alanlara odaklan. Küçük adımlar bile fark yaratır.`,
    type: 'scenario',
    xpReward: 30,
    coinReward: 15,
    matrixCode: 'DOOM_LOOP',
  },
  {
    id: 'l1-m4',
    title: 'Present Bias: Bugün Yanılgısı',
    content: `Gelecekteki ödüller yerine anlık tatminleri tercih etme eğilimidir.

Deney: 
- Seçenek A: Bugün 100 TL
- Seçenek B: 1 ay sonra 150 TL

Çoğu insan A'yı seçer, ancak mantıklı olan B'dir.

Finansal etkisi:
- Kredi kartı borçları
- Erken emeklilik fırsatının kaçırılması
- Birikim yapamama

Çözüm: Gelecekteki kendine mektup yaz. Hedeflerini görselleştir.`,
    type: 'interactive',
    xpReward: 40,
    coinReward: 20,
    matrixCode: 'PRESENT_BIAS',
  },
];

export const financialTraps: FinancialTrap[] = [
  {
    id: 'trap-1',
    name: 'Sosyal Kanıt Tuzağı',
    description: 'Başkalarının yaptığını görünce sen de yapmak istiyorsun.',
    icon: '👥',
    examples: ['Arkadaş aldı, ben de almalıyım', 'Herkes gidiyor, ben de gitmeliyim'],
    solution: 'Kendi ihtiyaçlarını ve bütçeni önceliklendir.',
    agentSmithTactic: 'Herkes yapıyor, sen neden yapmayasın?',
  },
  {
    id: 'trap-2',
    name: 'İndirim İllüzyonu',
    description: '%50 indirim etiketi, ihtiyacın olmayan şeyi "gerekli" gösterir.',
    icon: '🏷️',
    examples: ['İndirimli diye 3 ayakkabı almak', 'Black Friday çılgınlığı'],
    solution: 'İndirim öncesi fiyatı kontrol et. Gerçekten ihtiyacın var mı?',
    agentSmithTactic: 'Bu fiyat bir daha olmaz!',
  },
  {
    id: 'trap-3',
    name: 'Abonelik Tuzağı',
    description: 'Küçük aylık ödemeler, zamanla büyük toplamlara dönüşür.',
    icon: '🔄',
    examples: ['Netflix, Spotify, Gym, Xbox Game Pass... Hepsi "sadece 50 TL"'],
    solution: 'Tüm aboneliklerini listeleyip kullanmadıklarını iptal et.',
    agentSmithTactic: 'Sadece küçük bir ücret...',
  },
  {
    id: 'trap-4',
    name: 'Taksit Yanılgısı',
    description: '12 taksit, pahalı şeyleri "uygun" gösterir.',
    icon: '💳',
    examples: ['3000 TL telefonu "aylık 250 TL" diye düşünmek'],
    solution: 'Toplam tutara odaklan. Faizleri hesaba kat.',
    agentSmithTactic: 'Aylık sadece 250 TL!',
  },
];

export const latteFactorItems: LatteFactorItem[] = [
  {
    id: 'latte-1',
    name: 'Günlük Kahve',
    dailyCost: 60,
    yearlyCost: 21900,
    tenYearCost: 219000,
    alternative: 'Evde demleme: Yıllık 3.000 TL',
  },
  {
    id: 'latte-2',
    name: 'Abonelikler (Netflix, Spotify vb.)',
    dailyCost: 25,
    yearlyCost: 9125,
    tenYearCost: 91250,
    alternative: 'Sadece ihtiyaç duyulanları tut: Yıllık 2.000 TL',
  },
  {
    id: 'latte-3',
    name: 'Günlük Atıştırmalık',
    dailyCost: 40,
    yearlyCost: 14600,
    tenYearCost: 146000,
    alternative: 'Marketten alışveriş: Yıllık 5.000 TL',
  },
  {
    id: 'latte-4',
    name: 'Sigara (1 paket)',
    dailyCost: 70,
    yearlyCost: 25550,
    tenYearCost: 255500,
    alternative: 'Sağlıklı yaşam + birikim',
  },
  {
    id: 'latte-5',
    name: 'Taksi/Uber',
    dailyCost: 100,
    yearlyCost: 36500,
    tenYearCost: 365000,
    alternative: 'Toplu taşıma + araç: Yıllık 10.000 TL',
  },
];

export const level2Scenarios: Scenario[] = [
  {
    id: 'sc-1',
    title: 'Ayın Sonu Şoku',
    description: 'Maaşın 15.000 TL. Ayın 25\'inde 500 TL\'n kaldı. Ne yaparsın?',
    income: 15000,
    expenses: [
      { category: 'Kira', amount: 6000, isNecessary: true },
      { category: 'Faturalar', amount: 1500, isNecessary: true },
      { category: 'Yemek', amount: 3000, isNecessary: true },
      { category: 'Ulaşım', amount: 1000, isNecessary: true },
      { category: 'Eğlence', amount: 2000, isNecessary: false },
      { category: 'Alışveriş', amount: 1500, isNecessary: false },
    ],
    unexpectedEvents: [
      { id: 'ev-1', title: 'Arkadaş Doğum Günü', description: 'Hediye alman gerekiyor', cost: 300, type: 'expense', agentSmith: true },
      { id: 'ev-2', title: 'Ek Gelir', description: 'Freelance iş', cost: 2000, type: 'income' },
    ],
    matrixLocation: 'Nebuchadnezzar - Gerçek Dünya',
  },
  {
    id: 'sc-2',
    title: 'İndirim Tuzağı',
    description: 'Sevdiğin markada %70 indirim var. Bütçen dar ama...',
    income: 12000,
    expenses: [
      { category: 'Kira', amount: 5000, isNecessary: true },
      { category: 'Faturalar', amount: 1200, isNecessary: true },
      { category: 'Yemek', amount: 2500, isNecessary: true },
      { category: 'Ulaşım', amount: 800, isNecessary: true },
      { category: 'İndirimli Alışveriş', amount: 2500, isNecessary: false },
    ],
    unexpectedEvents: [
      { id: 'ev-3', title: 'Telefon Kırıldı', description: 'Tamir gerekli', cost: 1500, type: 'expense', agentSmith: true },
    ],
    matrixLocation: 'Mega City - Matrix İçinde',
  },
];

export const level3Challenges: Level3Challenge[] = [
  {
    id: 'ch-1',
    title: 'Yatırım Simülasyonu',
    description: '100.000 TL\'n var. Nasıl değerlendirirsin?',
    options: [
      { id: 'opt-1', text: 'Hepsini kriptoya', risk: 'high', return: 'uncertain' },
      { id: 'opt-2', text: 'Dolar/Altın', risk: 'medium', return: 'stable' },
      { id: 'opt-3', text: 'Fon/Döviz karışımı', risk: 'low', return: 'moderate' },
      { id: 'opt-4', text: 'İş kurmak', risk: 'very-high', return: 'potential-high' },
    ],
  },
  {
    id: 'ch-2',
    title: 'Acil Durum Fonu',
    description: 'Aylık gelirin 20.000 TL. Acil durum fonu ne kadar olmalı?',
    correctAnswer: 60000,
    explanation: 'Genel kural: 3-6 aylık giderler. 20.000 x 3 = 60.000 TL',
  },
];
