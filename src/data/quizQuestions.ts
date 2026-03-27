import type { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Maaşın yattığı gün kendini nasıl hissedersin?',
    options: [
      { id: 'q1-a', text: 'Harika! Şimdi o istediğim ayakkabıyı alabilirim!', character: 'yolo', score: 3 },
      { id: 'q1-b', text: 'Neyin pointi ki? Zaten ekonomi kötü, birikmeyecek...', character: 'doom', score: 3 },
      { id: 'q1-c', text: 'Güzel, bir kısmını biriktiririm, bir kısmıyla harcarım', character: 'balanced', score: 3 },
      { id: 'q1-d', text: 'Hemen harcamalıyım, yarın ne olacağı belli değil', character: 'present-bias', score: 3 },
    ],
  },
  {
    id: 'q2',
    question: 'Arkadaşların "Kafeye gidelim" dediğinde...',
    options: [
      { id: 'q2-a', text: 'Hemen giderim, sosyal hayat önemli!', character: 'yolo', score: 2 },
      { id: 'q2-b', text: 'Gitsem mi? Zaten param yetmiyor...', character: 'doom', score: 2 },
      { id: 'q2-c', text: 'Bütçeme bakıp karar veririm', character: 'balanced', score: 2 },
      { id: 'q2-d', text: 'Bugün keyfim yerinde, gidelim!', character: 'present-bias', score: 2 },
    ],
  },
  {
    id: 'q3',
    question: '%50 indirimli bir ürün görünce...',
    options: [
      { id: 'q3-a', text: 'İndirim kaçmaz! Hemen almalıyım', character: 'yolo', score: 2 },
      { id: 'q3-b', text: 'İndirim de olsa, zaten param yok...', character: 'doom', score: 2 },
      { id: 'q3-c', text: 'Gerçekten ihtiyacım var mı diye düşünürüm', character: 'balanced', score: 2 },
      { id: 'q3-d', text: 'Şimdi almazsam kaçırırım!', character: 'present-bias', score: 2 },
    ],
  },
  {
    id: 'q4',
    question: 'Gelecek için bir planın var mı?',
    options: [
      { id: 'q4-a', text: 'Hayat kısa, plan yapmanın anlamı yok', character: 'yolo', score: 3 },
      { id: 'q4-b', text: 'Plan yapmak boş, zaten hiçbir şey değişmeyecek', character: 'doom', score: 3 },
      { id: 'q4-c', text: 'Evet, kısa ve uzun vadeli hedeflerim var', character: 'balanced', score: 3 },
      { id: 'q4-d', text: 'Şu an iyiyim, gelecek kendiliğinden çözülür', character: 'present-bias', score: 3 },
    ],
  },
  {
    id: 'q5',
    question: 'Bir arkadaşın yeni telefon aldığında...',
    options: [
      { id: 'q5-a', text: 'Ben de almalıyım, geride kalmamalıyım', character: 'yolo', score: 2 },
      { id: 'q5-b', text: 'Keşke benim de param olsa... ama olmayacak', character: 'doom', score: 2 },
      { id: 'q5-c', text: 'İhtiyacı varsa güzel, benimki hala iş görüyor', character: 'balanced', score: 2 },
      { id: 'q5-d', text: 'Hemen kredi çekip almalıyım', character: 'present-bias', score: 2 },
    ],
  },
  {
    id: 'q6',
    question: 'Ay sonunda paran bittiğinde...',
    options: [
      { id: 'q6-a', text: 'Önemli değil, önümüzdeki ay yine alırım', character: 'yolo', score: 2 },
      { id: 'q6-b', text: 'Her zaman böyle oluyor, bu benim kaderim', character: 'doom', score: 2 },
      { id: 'q6-c', text: 'Bir sonraki ay için plan yaparım', character: 'balanced', score: 2 },
      { id: 'q6-d', text: 'Kredi kartı var ya, sorun değil', character: 'present-bias', score: 2 },
    ],
  },
  {
    id: 'q7',
    question: 'Biri "Tasarruf etmelisin" dediğinde...',
    options: [
      { id: 'q7-a', text: 'Hayatı yaşamalıyım, tasarruf sıkıcı', character: 'yolo', score: 2 },
      { id: 'q7-b', text: 'Ne tasarrufu? Zaten hiçbir şey kalmıyor', character: 'doom', score: 2 },
      { id: 'q7-c', text: 'Haklısın, küçük birikimler bile önemli', character: 'balanced', score: 2 },
      { id: 'q7-d', text: 'Gelecekte düşünürüm, şimdi keyfim yerinde', character: 'present-bias', score: 2 },
    ],
  },
  {
    id: 'q8',
    question: 'Online alışverişte sepetin toplamını görünce...',
    options: [
      { id: 'q8-a', text: 'Önemli değil, hepsini almalıyım', character: 'yolo', score: 2 },
      { id: 'q8-b', text: 'Zaten alamayacağım, boşuna bakıyorum', character: 'doom', score: 2 },
      { id: 'q8-c', text: 'Bazılarını çıkarıp gerçek ihtiyaçlarıma odaklanırım', character: 'balanced', score: 2 },
      { id: 'q8-d', text: 'Taksitlere bölerim, sorun olmaz', character: 'present-bias', score: 2 },
    ],
  },
];

export const characterDescriptions: Record<string, { title: string; description: string; advice: string }> = {
  yolo: {
    title: 'YOLO Harcamacı',
    description: '"You Only Live Once" (Sadece bir kez yaşıyoruz) felsefesiyle hareket ediyorsun. Anın keyfini çıkarmak istiyorsun ama geleceği göz ardı ediyor olabilirsin.',
    advice: 'Hayatın tadını çıkarmak güzel, ama küçük tasarruflar da gelecekte özgürlük sağlar. Dengeli ol!',
  },
  doom: {
    title: 'Doom Spending Mağduru',
    description: 'Ekonomik kaygılar seni pasifize etmiş durumda. "Ne yapsam boş" hissiyle harcamalar yapıyor veya tamamen kısıyor olabilirsin.',
    advice: 'Durumun ne kadar zor olursa olsun, küçük adımlarla bile olsa kontrolü ele alabilirsin. Umutsuzluğa kapılma!',
  },
  'present-bias': {
    title: 'Bugün Yanılgısı Tutsağı',
    description: 'Gelecekteki ödüller yerine anlık tatminleri tercih ediyorsun. "Şimdi al, sonra düşünürüz" yaklaşımın uzun vadede sorun yaratabilir.',
    advice: 'Bir anlık keyif yerine, gelecekteki kendine hediye vermeyi düşün. Zamanla alışkanlık değişir!',
  },
  balanced: {
    title: 'Dengeli Harcamacı',
    description: 'Harika! Hem bugünün keyfini çıkarıyor hem de geleceği düşünüyorsun. Finansal okuryazarlık yolunda ilerliyorsun.',
    advice: 'Böyle devam et! Küçük iyileştirmelerle finansal özgürlüğe ulaşabilirsin.',
  },
};
