import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: '10 Tips Membuat CV yang Dilirik HRD di 2026',
    excerpt: 'Pelajari cara menyusun CV yang menarik perhatian rekruter dengan format ATS-friendly dan kata kunci yang tepat untuk industri teknologi.',
    content:
      'Membuat CV yang menarik di tahun 2026 membutuhkan strategi yang lebih cerdas karena persaingan semakin ketat. Pertama, gunakan format ATS-friendly dengan layout sederhana tanpa kolom atau tabel kompleks agar sistem rekrutmen dapat membaca data Anda dengan benar. Kedua, cantumkan kata kunci relevan dari deskripsi lowongan — misalnya jika melamar sebagai Data Scientist, pastikan kata "Python", "Machine Learning", dan "SQL" muncul secara natural di pengalaman Anda.\n\nKetiga, tonjolkan dampak kuantitatif dari pekerjaan Anda sebelumnya. Alih-alih menulis "bertanggung jawab atas penjualan", tuliskan "meningkatkan penjualan sebesar 30% dalam 6 bulan melalui optimasi campaign digital". Keempat, batasi CV Anda maksimal 2 halaman — rekruter hanya menghabiskan rata-rata 6-8 detik untuk scan pertama. Kelima, sesuaikan CV untuk setiap lamaran dengan menyoroti pengalaman yang paling relevan.\n\nTips tambahan: tambahkan link portofolio atau GitHub yang aktif, gunakan angka dan data untuk memperkuat pencapaian, dan jangan lupa sertakan skill teknis terkini yang sesuai dengan industri teknologi 2026 seperti AI tools, cloud computing, atau data analytics.',
    category: 'Tips CV',
    author: 'Andi Wijaya',
    date: '24 Juni 2026',
    readTime: '5 menit',
    image: 'CV',
  },
  {
    id: '2',
    title: 'Persiapan Wawancara Kerja untuk Posisi Data Scientist',
    excerpt: 'Panduan lengkap menghadapi interview data science: dari pertanyaan teknis SQL/ML hingga studi kasus bisnis yang sering muncul.',
    content:
      'Wawancara untuk posisi Data Scientist biasanya terbagi dalam tiga tahap: screening HR, technical test, dan final interview dengan user/CTO. Pada tahap teknis, Anda akan diuji kemampuan SQL (window functions, CTE, query optimasi), statistik (probability, hypothesis testing, A/B testing), dan machine learning (algoritma, overfitting, evaluation metrics).\n\nPersiapkan diri dengan mempelajari studi kasus bisnis yang umum seperti: prediksi churn pelanggan, sistem rekomendasi produk, atau fraud detection. Rekruter ingin melihat cara Anda berpikir — mulai dari memahami masalah, mengeksplorasi data, memilih model, hingga menginterpretasikan hasil. Latih kemampuan storytelling data Anda agar insight yang disampaikan mudah dipahami oleh pemangku kepentingan non-teknis.\n\nJangan lupa siapkan portofolio proyek end-to-end yang mendemonstrasikan siklus data science lengkap. Perusahaan seperti GoTo, Traveloka, dan Bank Mandiri sangat menghargai kandidat yang bisa menunjukkan dampak bisnis nyata dari proyek data science mereka. Pastikan juga Anda bisa menjelaskan mengapa memilih algoritma tertentu dan bagaimana cara mengevaluasi performanya.',
    category: 'Interview',
    author: 'Siti Rahma',
    date: '18 Juni 2026',
    readTime: '8 menit',
    image: 'DS',
  },
  {
    id: '3',
    title: 'Tren Gaji Industri Teknologi 2026 di Indonesia',
    excerpt: 'Data terbaru rentang gaji untuk posisi Software Engineer, Data Analyst, UI/UX Designer, dan lainnya di pasar Indonesia.',
    content:
      'Berdasarkan survei pasar yang dirilis awal 2026, gaji profesional teknologi di Indonesia terus mengalami kenaikan rata-rata 10-15% per tahun. Posisi Software Engineer dengan pengalaman 3-5 tahun kini berada di rentang Rp 15-25 juta, sementara Senior Engineer (5+ tahun) bisa mencapai Rp 30-45 juta per bulan. Untuk posisi Data Scientist, fresh graduate mulai dari Rp 10-15 juta dan senior level bisa menembus Rp 50 juta.\n\nSektor fintech dan e-commerce masih menjadi pembayar tertinggi, dengan perusahaan seperti GoTo, Shopee, dan DANA menawarkan kompensasi di atas rata-rata industri. Sementara itu, posisi UI/UX Designer mengalami peningkatan permintaan signifikan seiring digitalisasi sektor tradisional seperti perbankan dan logistik. Gaji UI/UX Designer level menengah berkisar Rp 12-22 juta.\n\nKota dengan gaji tertinggi masih didominasi Jakarta dan Tangerang Selatan, namun Bandung dan Yogyakarta mulai menawarkan paket kompensasi kompetitif seiring pertumbuhan hub teknologi di kota-kota tersebut. Tren remote work juga memungkinkan profesional teknologi mendapatkan gaji setara Jakarta sambil bekerja dari kota dengan biaya hidup lebih rendah.',
    category: 'Tren Industri',
    author: 'Bambang Prasetyo',
    date: '15 Juni 2026',
    readTime: '6 menit',
    image: 'ID',
  },
  {
    id: '4',
    title: 'Cara Beralih Karir ke Bidang UI/UX Design Tanpa Latar Belakang IT',
    excerpt: 'Panduan step-by-step bagi non-IT yang ingin menjadi UI/UX Designer. Dari bootcamp, portofolio, hingga strategi networking.',
    content:
      'Beralih karir ke UI/UX Design dari latar belakang non-IT sangat mungkin dilakukan, dan banyak designer sukses justru berasal dari psikologi, desain grafis, atau bahkan akuntansi. Langkah pertama adalah memahami dasar-dasar desain: prinsip hierarchy, typography, color theory, dan user research. Anda bisa memulainya dengan mengikuti kursus online seperti Google UX Design Certificate atau bootcamp UI/UX intensif selama 3-4 bulan.\n\nLangkah kedua adalah membangun portofolio. Anda tidak perlu pengalaman profesional — cukup buat proyek fiktif atau redesign aplikasi yang sudah ada. Dokumentasikan proses desain Anda mulai dari riset, wireframe, prototype, hingga user testing. Rekruter ingin melihat cara berpikir Anda, bukan hanya hasil akhir. Pastikan portofolio Anda accessible online, misalnya melalui Behance, Dribbble, atau website pribadi.\n\nLangkah ketiga adalah networking. Bergabunglah dengan komunitas desain seperti Jakarta UX Meetup, Figma Indonesia Community, atau grup Discord desain. Ikuti challenge desain seperti Daily UI untuk mengasah skill. Jangan ragu untuk meminta feedback dari designer senior. Untuk fresh graduate non-IT, targetkan magang atau posisi junior di startup kecil yang lebih terbuka terhadap kandidat lintas jurusan.',
    category: 'Karir',
    author: 'Dinda Amalia',
    date: '12 Juni 2026',
    readTime: '7 menit',
    image: 'UX',
  },
  {
    id: '5',
    title: 'Skill Wajib Frontend Developer di 2026: React, TypeScript & AI Tools',
    excerpt: 'Frontend developer masa depan harus menguasai lebih dari sekadar framework. Simak skill yang paling dicari perusahaan teknologi.',
    content:
      'Dunia frontend development terus berevolusi, dan di tahun 2026 ada beberapa skill yang menjadi wajib dimiliki. Pertama, penguasaan React atau Next.js masih menjadi standar industri, namun kini dikombinasikan dengan TypeScript sebagai keharusan — bukan lagi optional. Perusahaan seperti Traveloka dan GoTo sudah mewajibkan TypeScript di semua codebase frontend mereka.\n\nKedua, pemahaman tentang AI tools dan integrasi AI di frontend menjadi pembeda utama. Kemampuan menggunakan GitHub Copilot, Cursor, atau Claude tidak lagi dianggap curang — justru menjadi ekspektasi. Developer yang bisa memanfaatkan AI untuk mempercepat development sambil tetap menjaga kualitas kode akan jauh lebih produktif.\n\nKetiga, penguasaan performa web (Core Web Vitals, lazy loading, code splitting) dan pemahaman tentang testing (Jest, Cypress, Playwright) sangat penting. Perusahaan kini mencari T-shaped developer — yang memiliki satu keahlian utama namun cukup paham area terkait seperti backend, desain, dan infrastruktur. Jangan lupa untuk selalu update dengan teknologi baru seperti React Server Components, Tailwind CSS v4, dan bundler modern seperti Vite.',
    category: 'Skill',
    author: 'Ahmad Fauzi',
    date: '10 Juni 2026',
    readTime: '4 menit',
    image: 'FE',
  },
  {
    id: '6',
    title: 'Tips Negosiasi Gaji untuk Fresh Graduate',
    excerpt: 'Jangan takut menegosiasikan gaji pertamamu. Pelajari strategi dan kata-kata yang tepat untuk mendapatkan penawaran terbaik.',
    content:
      'Banyak fresh graduate merasa tidak berhak menegosiasikan gaji pertama mereka. Padahal, riset menunjukkan bahwa kandidat yang melakukan negosiasi mendapatkan kenaikan 10-25% dari penawaran awal. Kuncinya adalah persiapan dan penyampaian yang tepat. Sebelum negosiasi, lakukan riset gaji pasar untuk posisi dan industri Anda. Gunakan situs seperti Glints, LinkedIn Salary, atau tanyakan di komunitas.\n\nSaat menerima penawaran, jangan langsung menjawab. Ucapkan terima kasih dan minta waktu 1-2 hari untuk mempertimbangkan. Ini memberi Anda kesempatan untuk membandingkan dengan penawaran lain dan menyusun argumen. Saat negosiasi, gunakan pendekatan kolaboratif dengan menunjukkan antusiasme terhadap posisi tersebut.\n\nSelain gaji pokok, perhatikan komponen lain seperti bonus tahunan, THR, asuransi kesehatan, stock options, dan tunjangan lainnya. Terkadang lebih menguntungkan mendapat paket kompensasi yang lebih seimbang daripada gaji pokok tinggi tapi tanpa tunjangan. Ingat, negosiasi adalah hal yang wajar dalam proses rekrutmen.',
    category: 'Tips CV',
    author: 'Eka Purnama',
    date: '8 Juni 2026',
    readTime: '3 menit',
    image: 'NG',
  },
  {
    id: '7',
    title: 'Remote Work VS WFO: Mana yang Lebih Produktif untuk Developer?',
    excerpt: 'Studi komparatif produktivitas developer yang bekerja remote vs WFO. Temukan pola kerja yang paling cocok untuk Anda.',
    content:
      'Perdebatan antara remote work dan WFO masih terus berlangsung di industri teknologi Indonesia. Berdasarkan survei terhadap 500 developer di Jakarta dan Bandung, 67% merasa lebih produktif bekerja remote, sementara 33% lainnya lebih menyukai WFO. Produktivitas remote sangat bergantung pada lingkungan rumah yang kondusif, disiplin diri, dan kualitas koneksi internet.\n\nKeuntungan remote work antara lain: fleksibilitas waktu, tidak ada waktu commuting (bisa menghemat 1-3 jam per hari), dan kemampuan untuk fokus tanpa gangguan rekan kerja. Namun, tantangannya meliputi: komunikasi tim yang lebih kompleks, risiko burnout karena sulit memisahkan waktu kerja dan pribadi, serta kesempatan mentoring yang lebih terbatas. Banyak perusahaan kini mengadopsi model hybrid — 2-3 hari WFO dan sisanya remote — sebagai solusi terbaik.\n\nTips untuk tetap produktif saat remote: buat jadwal rutin harian, pisahkan ruang kerja dan istirahat, gunakan tools kolaborasi seperti Slack, Notion, dan Jira secara efektif, serta pastikan Anda tetap aktif berkomunikasi dengan tim melalui daily standup dan pair programming virtual. Pilihlah perusahaan yang memiliki budaya remote yang matang.',
    category: 'Tren Industri',
    author: 'Bambang Prasetyo',
    date: '5 Juni 2026',
    readTime: '5 menit',
    image: 'RW',
  },
  {
    id: '8',
    title: 'Portofolio Data Science: Proyek Apa yang Paling Dilirik Rekruter?',
    excerpt: 'Jenis proyek data science yang wajib ada di portofolio Anda agar dilirik perusahaan seperti GoTo, Traveloka, dan Bank digital.',
    content:
      'Portofolio data science yang kuat bisa membuka pintu karir meskipun Anda tidak memiliki pengalaman kerja formal. Berdasarkan wawancara dengan 20 hiring manager di perusahaan teknologi Indonesia, ada tiga jenis proyek yang paling dilirik. Pertama, proyek end-to-end yang mendemonstrasikan siklus data science lengkap: dari pengumpulan data, pembersihan, eksplorasi, modeling, hingga deployment.\n\nKedua, proyek yang memiliki dampak bisnis yang jelas. Misalnya, bukan sekadar "memprediksi harga rumah", tetapi "membangun model prediksi harga rumah yang membantu agen properti menentukan harga kompetitif". Rekruter ingin melihat bahwa Anda memahami konteks bisnis dan bisa menerjemahkan insight data menjadi rekomendasi aksi.\n\nKetiga, proyek yang menggunakan tools dan teknologi yang relevan dengan industri. Sertakan proyek menggunakan SQL untuk ekstraksi data, Python untuk analisis, dan dashboard visualisasi menggunakan Tableau atau Looker. Hosting kode Anda di GitHub dengan README yang rapi dan dokumentasi yang jelas.',
    category: 'Karir',
    author: 'Rina Wijaya',
    date: '2 Juni 2026',
    readTime: '6 menit',
    image: 'DS',
  },
  {
    id: '9',
    title: 'Cara Lolos Magang Jalur Virtual Internship di Perusahaan Tech Ternama',
    excerpt: 'Panduan lengkap mendaftar dan lolos seleksi virtual internship di startup decacorn seperti GoTo dan Shopee. Dari CV screening hingga final interview online.',
    content:
      'Virtual internship semakin populer di kalangan perusahaan teknologi Indonesia, terutama pasca-pandemi. Program magang jarak jauh memberikan fleksibilitas bagi mahasiswa dari berbagai kota untuk mendapatkan pengalaman di perusahaan ternama tanpa harus pindah ke Jakarta. Program seperti GoTo Impact Internship, Shopee Campus, atau Telkom Digital Talent membuka ribuan posisi setiap tahunnya.\n\nLangkah pertama untuk lolos adalah menyiapkan CV yang menyoroti proyek-proyek relevan yang pernah Anda kerjakan, bukan hanya nilai akademik. Sertakan link portofolio atau GitHub yang aktif. Pastikan Anda mengisi formulir pendaftaran dengan lengkap dan menjawab pertanyaan esai dengan spesifik.\n\nTahap seleksi biasanya meliputi: screening administrasi, technical test (bisa berupa coding challenge, studi kasus, atau analisis data), dan wawancara final dengan tim. Persiapkan diri dengan belajar dari platform seperti HackerRank atau LeetCode untuk technical test. Pada wawancara, tunjukkan antusiasme untuk belajar dan kemampuan beradaptasi — ini adalah kualitas yang paling dicari dari peserta magang.',
    category: 'Tips CV',
    author: 'Dinda Amalia',
    date: '28 Mei 2026',
    readTime: '7 menit',
    image: 'VI',
  },
  {
    id: '10',
    title: 'Panduan Menyusun Portofolio Data Science Tanpa Pengalaman Profesional',
    excerpt: 'Tidak punya pengalaman kerja? Pelajari cara membuat portofolio data science dari proyek open-source, kompetisi Kaggle, dan studi kasus pribadi yang tetap profesional.',
    content:
      'Tidak memiliki pengalaman kerja formal bukan berarti Anda tidak bisa memiliki portofolio data science yang mengesankan. Banyak data scientist memulai karir mereka dengan proyek-proyek mandiri yang didokumentasikan dengan baik. Kuncinya adalah menunjukkan bahwa Anda mampu mengerjakan siklus data science secara lengkap dan menghasilkan insight yang bermakna.\n\nMulailah dengan proyek menggunakan dataset publik dari Kaggle, Data.gov, atau portal data Indonesia. Pilih topik yang Anda minati — misalnya analisis data COVID-19, prediksi harga properti, atau analisis sentimen ulasan aplikasi. Yang terpenting adalah bagaimana Anda menceritakan prosesnya: mulai dari pertanyaan bisnis yang ingin dijawab, eksplorasi data, visualisasi, hingga kesimpulan dan rekomendasi.\n\nDokumentasikan setiap proyek dalam format yang rapi: buat repository GitHub dengan struktur folder yang jelas, README yang informatif, dan notebook yang bersih dengan markdown penjelasan. Sertakan visualisasi yang menarik dan insight yang actionable. Dengan portofolio yang solid, Anda bisa bersaing dengan kandidat yang sudah memiliki pengalaman kerja.',
    category: 'Karir',
    author: 'Rina Wijaya',
    date: '25 Mei 2026',
    readTime: '8 menit',
    image: 'DS',
  },
  {
    id: '11',
    title: 'Pertanyaan Jebakan saat Interview di Bank Syariah & Cara Menjawabnya',
    excerpt: 'Simulasi wawancara kerja di Bank Muamalat dan bank syariah lainnya. Pelajari cara menjawab pertanyaan seputar ekonomi syariah, riba, dan etika kerja Islami.',
    content:
      'Wawancara di bank syariah memiliki keunikan tersendiri karena selain kemampuan teknis, Anda juga akan diuji pemahaman tentang prinsip perbankan syariah. Pertanyaan jebakan yang sering muncul adalah "Apa perbedaan utama antara bank syariah dan bank konvensional?" Jawablah dengan percaya diri: bank syariah beroperasi berdasarkan prinsip bagi hasil (mudharabah), jual beli (murabahah), dan kerjasama (musyarakah), serta menghindari riba, gharar, dan maisir.\n\nPertanyaan lain yang sering membuat kandidat gugup adalah "Bagaimana pendapat Anda tentang bunga bank?" Jawab dengan bijak: sampaikan bahwa Anda memahami fatwa MUI yang menyatakan bunga bank termasuk riba, dan bank syariah menawarkan alternatif berbasis akad yang sesuai syariah. Tunjukkan bahwa Anda tidak menghakimi, tetapi memiliki pemahaman yang baik tentang kedua sistem tersebut.\n\nUntuk posisi IT di bank syariah, Anda juga perlu menunjukkan bagaimana teknologi bisa mendukung layanan keuangan yang sesuai syariah. Misalnya, pengembangan aplikasi mobile banking yang transparan tentang akad dan bagi hasil, atau sistem deteksi dini untuk memastikan kepatuhan syariah.',
    category: 'Interview',
    author: 'Ahmad Fauzi',
    date: '22 Mei 2026',
    readTime: '5 menit',
    image: 'IS',
  },
  {
    id: '12',
    title: 'Tips Negosiasi Gaji Pertama untuk Fresh Graduate IT',
    excerpt: 'Strategi negosiasi gaji pertama yang efektif untuk lulusan baru bidang IT. Simulasi dialog, kisaran gaji pasar, dan hal yang tidak boleh Anda katakan.',
    content:
      'Negosiasi gaji pertama sebagai fresh graduate IT membutuhkan pendekatan yang cerdas. Banyak lulusan baru takut ditolak jika meminta lebih, padahal perusahaan sudah mengalokasikan budget untuk posisi tersebut — dan biasanya ada ruang negosiasi 10-20% dari penawaran awal. Langkah pertama adalah riset: cari tahu kisaran gaji untuk posisi serupa di industri yang sama menggunakan Glints, LinkedIn, atau bertanya di komunitas.\n\nSiapkan argumen yang kuat sebelum negosiasi. Soroti nilai yang Anda bawa: proyek-proyek yang sudah dikerjakan selama kuliah, skill teknis yang relevan, sertifikasi, atau pengalaman magang. Hindari menyebutkan angka pasti terlalu awal — biarkan HR yang menyebut pertama. Yang tidak boleh dilakukan: membandingkan dengan tawaran perusahaan lain secara agresif, mengancam akan mundur, atau berbohong tentang penawaran yang tidak ada.\n\nJangan hanya fokus pada gaji pokok — pertimbangkan total kompensasi seperti bonus, asuransi, THR, dan benefit lainnya. Jika perusahaan tidak bisa menaikkan gaji, negosiasikan benefit lain seperti training budget, perangkat kerja, atau flexible working hours.',
    category: 'Tips CV',
    author: 'Yusuf Maulana',
    date: '19 Mei 2026',
    readTime: '4 menit',
    image: 'NG',
  },
  {
    id: '13',
    title: 'Daftar Sertifikasi Data Analyst yang Paling Dicari Perusahaan Tahun Ini',
    excerpt: 'Sertifikasi Google Data Analytics, Microsoft PL-300, Tableau Desktop Specialist — mana yang paling worth it untuk karir data analyst di Indonesia pada 2026?',
    content:
      'Sertifikasi menjadi salah satu cara untuk memvalidasi kemampuan data analyst Anda di mata rekruter. Di tahun 2026, ada tiga sertifikasi yang paling dicari perusahaan di Indonesia. Pertama, Google Data Analytics Professional Certificate — sertifikasi level pemula yang mencakup dasar-dasar analisis data menggunakan spreadsheet, SQL, dan Tableau. Cocok untuk fresh graduate yang ingin membangun pondasi yang kuat.\n\nKedua, Microsoft Certified PL-300 (Power BI Data Analyst) — sertifikasi yang sangat dihargai di perusahaan korporat dan perbankan di Indonesia. Power BI adalah tools visualisasi yang paling banyak digunakan di sektor keuangan dan manufaktur. Sertifikasi ini menguji kemampuan Anda dalam mempersiapkan data, membuat model, dan membangun dashboard interaktif menggunakan Power BI.\n\nKetiga, Tableau Desktop Specialist — sertifikasi untuk profesional yang menggunakan Tableau. Sangat relevan untuk posisi di perusahaan teknologi dan e-commerce seperti GoTo, Traveloka, dan Blibli. Tableau unggul dalam visualisasi data yang interaktif dan storytelling data. Tips: pilih sertifikasi yang sesuai dengan tools yang paling banyak digunakan di industri target Anda.',
    category: 'Skill',
    author: 'Bambang Prasetyo',
    date: '16 Mei 2026',
    readTime: '6 menit',
    image: 'DA',
  },
  {
    id: '14',
    title: 'Survey Gaji Developer 2026: Berapa Standar Gaji di 5 Kota Besar Indonesia?',
    excerpt: 'Data lengkap rentang gaji developer di Jakarta, Bandung, Surabaya, Yogyakarta, dan Medan. Cocok untuk referensi negosiasi atau pertimbangan relokasi.',
    content:
      'Berdasarkan survei gaji developer 2026 yang melibatkan lebih dari 2.000 responden, berikut adalah gambaran gaji di 5 kota besar Indonesia. Jakarta masih menjadi kota dengan gaji tertinggi — untuk posisi Software Engineer mid-level (3-5 tahun pengalaman) berkisar Rp 18-30 juta per bulan. Tangerang Selatan, sebagai hub teknologi, menawarkan gaji yang hampir setara dengan Jakarta.\n\nBandung menawarkan gaji 10-20% lebih rendah dari Jakarta, namun biaya hidup yang jauh lebih murah membuat daya belinya kompetitif. Gaji developer mid-level di Bandung berkisar Rp 12-22 juta. Surabaya sebagai kota terbesar kedua mulai menunjukkan pertumbuhan gaji yang signifikan — developer berpengalaman bisa mendapatkan Rp 12-20 juta per bulan. Yogyakarta dan Medan berada di kisaran Rp 8-15 juta untuk level yang sama.\n\nFaktor yang mempengaruhi gaji antara lain: skala perusahaan (startup vs korporat), industri (fintech vs logistik vs edukasi), stack teknologi yang dikuasai, dan kemampuan negosiasi. Tren remote work juga mengubah peta persaingan — developer di Yogyakarta kini bisa mendapatkan gaji setara Jakarta dengan bekerja remote untuk perusahaan di ibukota.',
    category: 'Tren Industri',
    author: 'Bambang Prasetyo',
    date: '13 Mei 2026',
    readTime: '7 menit',
    image: 'ID',
  },
  {
    id: '15',
    title: 'Cara Membangun Personal Branding sebagai Web Developer di LinkedIn',
    excerpt: 'Optimasi profil LinkedIn, strategi konten, dan networking untuk web developer. Bangun personal branding yang menarik perhatian headhunter perusahaan teknologi.',
    content:
      'LinkedIn adalah platform utama untuk personal branding profesional, khususnya bagi web developer. Dari 100 headhunter yang disurvei, 85% mengaku mencari kandidat di LinkedIn terlebih dahulu sebelum memasang iklan lowongan. Oleh karena itu, profil LinkedIn yang dioptimasi bisa menjadi magnet karir yang sangat efektif. Mulailah dengan foto profesional, headline yang jelas, dan ringkasan profil yang menonjolkan pencapaian.\n\nStrategi konten adalah kunci untuk membangun personal branding. Posting secara konsisten tentang proyek yang sedang dikerjakan, tutorial singkat, atau insight yang Anda dapatkan dari pengalaman kerja. Tidak perlu panjang — 2-3 paragraf dengan screenshot atau code snippet sudah cukup. Gunakan hashtag relevan seperti #ReactJS, #WebDeveloper, #CareerTips untuk menjangkau audiens yang tepat.\n\nNetworking juga sangat penting. Jangan hanya menunggu dihubungi — jangkau rekruter atau professional di perusahaan target Anda. Kirim koneksi dengan pesan personal yang sopan, bukan template otomatis. Dengan personal branding yang kuat, Anda tidak perlu lagi mencari kerja — pekerjaanlah yang akan mencari Anda.',
    category: 'Skill',
    author: 'Rian Hidayat',
    date: '10 Mei 2026',
    readTime: '5 menit',
    image: 'LB',
  },
];

const categoryColors: Record<string, string> = {
  'Tips CV': 'bg-blue-100 text-blue-700',
  'Interview': 'bg-purple-100 text-purple-700',
  'Tren Industri': 'bg-orange-100 text-orange-700',
  'Karir': 'bg-green-100 text-green-700',
  'Skill': 'bg-pink-100 text-pink-700',
};

export default function CareerNotesPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-brand-dark mb-2">Career Notes</h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Tips karir, panduan interview, tren industri, dan wawasan pasar kerja terkini untuk membantu Anda meraih karier impian.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white border border-brand-border rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className="h-44 bg-linear-to-br from-brand-lime to-brand-dark flex items-center justify-center">
                <span className="text-4xl font-bold text-white/80">{article.image}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[article.category] || 'bg-gray-100 text-gray-600'}`}>
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-xs">{article.readTime}</span>
                </div>
                <h2 className="font-bold text-brand-dark mb-2 group-hover:text-brand-dark/80 transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-brand-border pt-3">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Detail Artikel */}
      {selectedArticle && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="relative h-48 bg-linear-to-br from-brand-lime to-brand-dark flex items-center justify-center">
              <span className="text-5xl font-bold text-white/70">{selectedArticle.image}</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body Konten */}
            <div className="px-8 py-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[selectedArticle.category] || 'bg-gray-100 text-gray-600'}`}>
                  {selectedArticle.category}
                </span>
                <span className="text-gray-400 text-xs">{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-2xl font-bold text-brand-dark mb-3 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-gray-400 mb-5 pb-5 border-b border-brand-border">
                <span>{selectedArticle.author}</span>
                <span>{selectedArticle.date}</span>
              </div>

              <div className="text-gray-600 text-sm leading-[1.8] space-y-4 whitespace-pre-line">
                {selectedArticle.content}
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="mt-6 w-full bg-brand-dark text-white font-semibold py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
