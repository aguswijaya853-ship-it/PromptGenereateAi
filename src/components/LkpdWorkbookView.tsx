import React, { useState, useRef } from 'react';
import { EducationLevel } from '../types';
import {
  ALL_LKPD_TYPES,
  LKPD_PICTURE_ACTIVITIES,
  LKPD_EXERCISES,
  ILLUSTRATION_STYLES,
} from '../data/curriculumData';
import { exportToWordDoc, exportToImage, exportToPdf } from '../utils/exportUtils';
import {
  Printer,
  Copy,
  Check,
  Sparkles,
  CheckCircle2,
  Smile,
  Meh,
  Frown,
  ZoomIn,
  ZoomOut,
  Tag,
  Palette,
  Image as ImageIcon,
  CheckSquare,
  HelpCircle,
  Layers,
  ArrowRight,
  ListOrdered,
  FileText,
  Download,
  Loader2,
} from 'lucide-react';

interface LkpdWorkbookViewProps {
  topic: string;
  subject: string;
  educationLevel: EducationLevel;
  gradeClass: string;
  lkpdType?: string;
  pictureActivities?: string[];
  includeExercises?: string[];
  illustrationStyle?: string;
  onClose?: () => void;
}

export const LkpdWorkbookView: React.FC<LkpdWorkbookViewProps> = ({
  topic,
  subject,
  educationLevel,
  gradeClass,
  lkpdType = 'LKPD Eksperimen',
  pictureActivities = ['Mengamati gambar', 'Mengisi jawaban', 'Memberi label pada gambar'],
  includeExercises = ['Pilihan Ganda', 'Isian Singkat'],
  illustrationStyle = 'Kartun Edukatif',
  onClose,
}) => {
  const [activeType, setActiveType] = useState<string>(lkpdType);
  const [activeStyle, setActiveStyle] = useState<string>(illustrationStyle);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<'senang' | 'cukup' | 'bantuan'>('senang');
  const [exportingType, setExportingType] = useState<'word' | 'image' | 'pdf' | null>(null);

  const sheetRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textContent = `Anda adalah desainer pembelajaran profesional, ahli visual edukasi, dan creator LKPD interaktif modern. Tugas Anda adalah buat gambar dengan mengubah isi LKPD yang saya lampirkan menjadi LKPD bergambar yang lebih menarik, modern, estetik, dan nyaman digunakan siswa tanpa mengurangi isi materi asli sedikit pun.

Buat tampilan LKPD dalam format A4 portrait dengan desain full color yang clean, edukatif, student friendly, dan profesional seperti workbook sekolah modern. Gunakan tata letak yang rapi dengan perpaduan teks, gambar, dan ruang kosong yang seimbang agar tidak terlalu padat dan tetap mudah dibaca siswa.

Tambahkan ilustrasi edukatif yang relevan dengan materi, ikon modern, elemen visual sederhana, highlight box, header menarik, dan variasi desain pada setiap halaman agar tidak monoton. Jika terdapat soal cerita, tambahkan ilustrasi kontekstual. Jika terdapat langkah kegiatan, ubah menjadi tampilan step visual yang lebih interaktif. Jika terdapat tabel atau latihan, ubah menjadi desain yang lebih modern dan menarik namun tetap jelas dibaca.

Sesuaikan desain, ilustrasi, dan tata letak dengan jenis aktivitas pada LKPD, sehingga setiap aktivitas terlihat lebih interaktif, kontekstual, dan sesuai dengan karakter pembelajaran yang digunakan.

Gunakan gaya visual modern, fun learning, semi infografis, dan workbook edukasi premium. Hindari desain terlalu ramai, seperti poster, atau ornamen berlebihan. Pastikan hasil akhir tetap fokus sebagai media belajar yang fungsional sekaligus estetik.

Hasil akhir harus langsung berupa desain LKPD lengkap yang siap cetak, beresolusi tinggi, dan terlihat seperti workbook pendidikan profesional.

Buat Gambar
Anda berperan sebagai guru profesional, perancang LKPD, dan ilustrator pendidikan yang mampu membuat LKPD menarik, edukatif, dan sesuai dengan karakter peserta didik.
Tugas Anda adalah membuat LKPD bergambar lengkap berdasarkan materi dan jenis/bentuk LKPD yang ditentukan oleh pengguna.

SPESIFIKASI DESAIN
Ukuran kertas : A4 (21 cm × 29,7 cm)
Orientasi : Portrait
Layout : rapi, proporsional, dan siap cetak
Gaya desain : ramah anak dan menarik
Warna : cerah, pastel, dan edukatif
Sesuaikan dengan jenjang : ${gradeClass} (${educationLevel})
Sisakan ruang untuk jawaban siswa
Gunakan ilustrasi edukatif seperlunya
Mudah dibaca dan hindari desain terlalu ramai

MATERI PEMBELAJARAN
ISI MATERI DI SINI :
${topic} (Mata Pelajaran: ${subject} - ${gradeClass})

JENIS / BENTUK LKPD
Pilih atau isi sesuai kebutuhan, misalnya:
LKPD Observasi
LKPD Eksperimen
LKPD Eksplorasi
LKPD Berbasis Gambar
LKPD Cerita Bergambar
LKPD Mencocokkan
LKPD Menjodohkan
LKPD Pilihan Ganda
LKPD Benar/Salah
LKPD Isian
LKPD Studi Kasus
LKPD Investigasi
LKPD Pemecahan Masalah (HOTS)
LKPD Berbasis Proyek (PjBL)
LKPD Diskusi Kelompok
LKPD Analisis Data
LKPD Refleksi
LKPD Diagnostik
LKPD Pengayaan
LKPD Remedial
LKPD Proyek
LKPD Campuran
JENIS LKPD YANG DIINGINKAN :
${activeType}



IDENTITAS LKPD
Nama : ________________________
Kelas : ${gradeClass}
Tanggal : ________________________
Nilai : 


TUGAS ANDA
Berdasarkan materi dan jenis LKPD yang dipilih:
Menyusun kegiatan LKPD sesuai bentuk yang diminta
Membuat soal/tugas berbasis gambar atau aktivitas
Membuat ilustrasi yang relevan dengan materi
Menyesuaikan tingkat kesulitan dengan jenjang
Menggunakan bahasa sederhana, komunikatif, dan mudah dipahami siswa

TUJUAN PEMBELAJARAN (Opsional)
Peserta didik mampu memahami konsep materi "${topic}" secara aktif dan kontekstual melalui eksplorasi visual dan penyelidikan terarah.
Tuliskan tujuan pembelajaran yang:
jelas,
sesuai materi,
sederhana,
dan mudah dipahami peserta didik.

PETUNJUK PENGERJAAN
Buat petunjuk pengerjaan yang:
sederhana,
jelas,
bertahap,
dan mudah dipahami siswa.
Gunakan maksimal 3–5 langkah.

KEGIATAN BERGAMBAR
Sesuaikan dengan jenis LKPD yang dipilih (${activeType}).
Aktivitas terpilih: ${pictureActivities.join(', ')}
Contoh aktivitas:
Mengamati gambar
Mencocokkan gambar
Mengisi jawaban
Memberi label pada gambar
Mengurutkan gambar
Menghubungkan konsep dengan ilustrasi
Mewarnai (khusus jenjang tertentu)
Diskusi sederhana
Bermain sambil belajar
Setiap aktivitas harus:
interaktif,
menarik,
sesuai usia siswa,
dan memiliki ruang jawaban.

LATIHAN (Opsional)
Bentuk latihan: ${includeExercises.join(', ')}
Buat soal tambahan yang:
relevan dengan materi,
bervariasi,
tidak terlalu sulit,
dan tetap berbasis ilustrasi atau aktivitas.
Boleh berupa:
pilihan ganda,
isian,
menjodohkan,
atau uraian singkat.

REFLEKSI SISWA
Buat 2–3 pertanyaan refleksi sederhana seperti:
Apa hal baru yang kamu pelajari hari ini?
Bagian mana yang paling kamu sukai?
Apa yang masih ingin kamu pelajari?

KETENTUAN ILUSTRASI
Gunakan ilustrasi:
${activeStyle.toLowerCase()},
warna cerah dan menarik,
tidak terlalu ramai,
mendukung pemahaman materi,
dan diletakkan dekat soal atau aktivitas terkait.

OUTPUT
Hasil akhir harus:
berupa LKPD lengkap siap cetak,
full color,
rapi dan profesional,
menggunakan heading yang jelas,
memiliki perpaduan teks dan ilustrasi yang seimbang,
dan cocok digunakan dalam pembelajaran di kelas maupun tugas rumah.`;

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadWord = () => {
    try {
      setExportingType('word');
      const textContent = `
# LEMBAR KERJA PESERTA DIDIK (LKPD)
**Mata Pelajaran:** ${subject} | **Kelas/Fase:** ${gradeClass} (${educationLevel})
**Topik / Materi Pokok:** ${topic}
**Bentuk LKPD:** ${activeType} | **Gaya Ilustrasi:** ${activeStyle}

---

### 🎯 1. Capaian & Tujuan Pembelajaran
- Peserta didik mampu menelaah dan memahami konsep esensial materi **${topic}** melalui kegiatan penyelidikan aktif dan eksplorasi visual kontekstual.
- **Profil Pelajar Pancasila**: Bernalar Kritis, Kreatif, dan Bergotong Royong.

### 🔍 2. Stimulus Kasus & Ilustrasi Kontekstual (${activeStyle})
Di lingkungan sekitar, terdapat fenomena penting yang berkaitan langsung dengan materi **${topic}**. Amati gambar ilustrasi yang disajikan, catat poin-poin penting, dan diskusikan bersama teman kelompok untuk menemukan pembuktian ilmiahnya.

### 📝 3. Langkah Kegiatan & Aktivitas Siswa (${pictureActivities.join(', ')})
1. **Tahap 1 (Observasi Gambar)**: Perhatikan secara teliti ilustrasi yang disajikan, kenali bagian-bagian utamanya.
2. **Tahap 2 (Pemberian Label & Analisis)**: Tuliskan label yang sesuai pada setiap bagian diagram / gambar di lembar aktivitas.
3. **Tahap 3 (Diskusi Kolaboratif)**: Bersama kelompok 3-4 orang, diskusikan fungsi dan keterkaitan antar elemen pada materi ini.
4. **Tahap 4 (Perumusan Kesimpulan)**: Simpulkan pemahaman materi dengan bahasa sendiri secara lugas dan terstruktur.

### ✍️ 4. Latihan Soal Pemahaman & Tantangan HOTS (${includeExercises.join(', ')})
1. **Soal Analisis Konseptual**:
   - Jelaskan bagaimana hubungan antara prinsip utama ${topic} dengan kehidupan sehari-hari siswa!
   - *Jawaban Siswa*: ..........................................................................................
2. **Soal HOTS (Pemecahan Masalah Kritis)**:
   - Jika terjadi kendala pada tahapan proses ${topic}, solusi apa yang paling efektif untuk mengatasinya? Berikan argumen logis!
   - *Jawaban Siswa*: ..........................................................................................

### 📋 5. Lembar Refleksi Mandiri Siswa
- **Ekspresi Perasaan**: [ ] Sangat Paham 😊   [ ] Cukup Paham 🤔   [ ] Butuh Bantuan 🙋‍♂️
- **Hal Baru Yang Dipelajari Hari Ini**: .........................................................................
      `.trim();

      exportToWordDoc(`LKPD-${topic}-${gradeClass}`, textContent, {
        title: `LKPD: ${topic}`,
        topic,
        subject,
        gradeClass,
        categoryTitle: activeType,
      });
    } catch (e) {
      console.error(e);
      alert('Gagal mengekspor dokumen Word.');
    } finally {
      setExportingType(null);
    }
  };

  const handleDownloadImage = async () => {
    if (!sheetRef.current) return;
    try {
      setExportingType('image');
      await exportToImage(sheetRef.current, `LKPD-${topic}-${gradeClass}`, 'png');
    } catch (e) {
      console.error(e);
      alert('Gagal mengekspor foto LKPD.');
    } finally {
      setExportingType(null);
    }
  };

  const handleDownloadPdf = async () => {
    if (!sheetRef.current) return;
    try {
      setExportingType('pdf');
      await exportToPdf(sheetRef.current, `LKPD-${topic}-${gradeClass}`);
    } catch (e) {
      console.error(e);
      alert('Gagal mengekspor PDF LKPD.');
    } finally {
      setExportingType(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden during print) */}
      <div className="print:hidden bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-extrabold border border-emerald-200 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Format Cetak A4 Portrait Full-Color Modern Workbook</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">
            Pratinjau LKPD: {topic}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {subject} • {gradeClass} • {activeType} • Gaya {activeStyle}
          </p>
        </div>

        {/* Buttons & Export Options */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs font-bold text-slate-600">
            <button
              onClick={() => setZoomLevel(Math.max(75, zoomLevel - 10))}
              className="p-1.5 hover:bg-white rounded-lg transition"
              title="Perkecil"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(125, zoomLevel + 10))}
              className="p-1.5 hover:bg-white rounded-lg transition"
              title="Perbesar"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
            title="Salin teks LKPD ke clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Teks</span>
              </>
            )}
          </button>

          {/* Export 1: Document Word (.doc) */}
          <button
            onClick={handleDownloadWord}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-extrabold transition active:scale-95 disabled:opacity-50"
            title="Unduh dokumen Word yang siap diedit"
          >
            {exportingType === 'word' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-700" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-blue-700" />
            )}
            <span>Unduh Word (.doc)</span>
          </button>

          {/* Export 2: Photo / Image (PNG) */}
          <button
            onClick={handleDownloadImage}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-800 text-xs font-extrabold transition active:scale-95 disabled:opacity-50"
            title="Unduh foto/gambar berkualitas tinggi format PNG"
          >
            {exportingType === 'image' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-700" />
            ) : (
              <ImageIcon className="w-3.5 h-3.5 text-purple-700" />
            )}
            <span>Unduh Foto (PNG)</span>
          </button>

          {/* Export 3: PDF Document (.pdf) */}
          <button
            onClick={handleDownloadPdf}
            disabled={exportingType !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-extrabold transition active:scale-95 disabled:opacity-50"
            title="Unduh file dokumen PDF format A4"
          >
            {exportingType === 'pdf' ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-700" />
            ) : (
              <Download className="w-3.5 h-3.5 text-rose-700" />
            )}
            <span>Unduh PDF</span>
          </button>

          {/* Print dialog */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm hover:shadow transition active:scale-95"
            title="Cetak langsung menggunakan printer atau browser"
          >
            <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Cetak A4</span>
          </button>
        </div>
      </div>

      {/* Quick Selectors Toolbar (Hidden during print) */}
      <div className="print:hidden bg-slate-100 p-3 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700">
            <Tag className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ubah Cepat Jenis LKPD:</span>
            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500"
            >
              {ALL_LKPD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700">
            <Palette className="w-3.5 h-3.5 text-purple-600" />
            <span>Gaya Ilustrasi:</span>
            <select
              value={activeStyle}
              onChange={(e) => setActiveStyle(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500"
            >
              {ILLUSTRATION_STYLES.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.badge})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* THE A4 PORTRAIT WORKBOOK SHEET CANVAS                    */}
      {/* ======================================================== */}
      <div className="flex justify-center overflow-x-auto pb-8 print:p-0 print:overflow-visible">
        <div
          ref={sheetRef}
          id="lkpd-workbook-sheet"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
          }}
          className="w-full max-w-[800px] bg-white text-slate-800 shadow-2xl rounded-2xl print:rounded-none print:shadow-none border border-slate-200 print:border-none p-6 sm:p-10 transition-transform duration-200 relative flex flex-col justify-between space-y-5"
        >
          {/* Decorative Corner Watermark */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-emerald-100/70 to-transparent rounded-tr-2xl pointer-events-none print:opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-100/70 to-transparent rounded-bl-2xl pointer-events-none print:opacity-40"></div>

          {/* 1. TOP HEADER BANNER */}
          <div className="border-b-2 border-emerald-600 pb-3.5 relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-[10.5px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-0.8 rounded-full border border-emerald-200 mb-1">
                  <span>Lembar Kerja Peserta Didik (LKPD)</span>
                  <span>•</span>
                  <span>Kurikulum Merdeka</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {topic}
                </h1>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  Mata Pelajaran: <span className="text-emerald-700 font-bold">{subject}</span> |{' '}
                  <span className="text-slate-800 font-bold">{gradeClass}</span>
                </p>
              </div>

              {/* Badges on right */}
              <div className="text-right shrink-0 space-y-1">
                <div className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-xl shadow-xs">
                  {activeType}
                </div>
                <div className="text-[10px] text-slate-500 font-bold block">
                  Ilustrasi: <span className="text-purple-700 font-black">{activeStyle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. STUDENT IDENTITY BOX */}
          <div className="bg-[#f8faf9] rounded-2xl p-3.5 border border-emerald-200/90 grid grid-cols-1 sm:grid-cols-12 gap-3 relative z-10 shadow-xs">
            <div className="sm:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 w-28 shrink-0">
                  Nama Siswa/Regu :
                </span>
                <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[20px]"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 w-16 shrink-0">Kelas :</span>
                  <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[20px] text-xs font-semibold text-emerald-900">
                    {gradeClass}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 w-20 shrink-0">No. Absen :</span>
                  <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[20px]"></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 w-28 shrink-0">Hari / Tanggal :</span>
                <div className="flex-1 border-b-2 border-dotted border-slate-300 min-h-[20px]"></div>
              </div>
            </div>

            {/* Score & Teacher Check Box */}
            <div className="sm:col-span-4 bg-white rounded-xl p-2 border border-emerald-200 flex flex-col justify-between text-center shadow-xs">
              <span className="text-[10px] uppercase font-extrabold text-emerald-800 tracking-wider">
                Nilai / Paraf Guru
              </span>
              <div className="flex-1 flex items-center justify-center my-0.5">
                <div className="w-14 h-9 border-2 border-dashed border-emerald-300 rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs">
                  Skor
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-400 text-xs">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
          </div>

          {/* 3. HIGHLIGHT BOX: CAPAIAN & TUJUAN BELAJAR */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 rounded-2xl p-3.5 border-l-4 border-emerald-600 shadow-xs relative z-10">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-950">
                  Tujuan Pembelajaran &amp; Profil Pelajar Pancasila
                </h3>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                  Peserta didik mampu menelaah materi <strong>{topic}</strong> secara aktif,
                  berpikir kritis melalui eksplorasi visual, dan bergotong royong dalam kerja tim.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-emerald-800">
                    ✓ Bernalar Kritis
                  </span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-emerald-800">
                    ✓ Kreatif
                  </span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-emerald-800">
                    ✓ Bergotong Royong
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. STIMULUS SOAL CERITA BERGAMBAR (Ilustrasi Kontekstual) */}
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-400 text-amber-950 font-black text-[10px] uppercase">
                  Cerita Kontekstual &amp; Gambar
                </span>
                <h4 className="text-xs font-extrabold text-slate-900">
                  Misi Penyelidikan: Kasus "{topic}"
                </h4>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                Gaya {activeStyle}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              {/* Contextual Illustration Box */}
              <div className="w-full sm:w-44 h-28 bg-white rounded-xl border border-amber-200 p-2 flex flex-col items-center justify-center text-center shadow-xs shrink-0">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-1">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-700">
                  Ilustrasi Edukatif
                </span>
                <span className="text-[9px] text-slate-400">
                  Visual {activeStyle} terkait {topic}
                </span>
              </div>

              <div className="flex-1 text-xs text-slate-700 leading-relaxed italic space-y-1">
                <p>
                  "Di sebuah lingkungan sekolah, para siswa sedang mengamati fenomena unik yang berkaitan langsung
                  dengan <strong>{topic}</strong>. Mereka mencatat perubahan yang terjadi pada setiap tahapan dan ingin membuktikan
                  faktor apa saja yang paling memengaruhi proses tersebut."
                </p>
                <div className="pt-1 flex items-center gap-2 text-[11px] font-bold text-emerald-800 not-italic">
                  <span>✦ Pertanyaan Pemantik:</span>
                  <div className="flex-1 border-b border-dotted border-emerald-400 min-h-[16px]">
                    Menurut dugaanmu, apa penyebab utama fenomena pada gambar di samping?
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. KEGIATAN BERGAMBAR (Mengamati, Memberi Label, Mencocokkan, Mengurutkan) */}
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                  A
                </span>
                <span>Kegiatan Bergambar Interaktif</span>
              </h3>
              <div className="flex items-center gap-1">
                {pictureActivities.slice(0, 3).map((act) => (
                  <span
                    key={act}
                    className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Visual Activity Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Box 1: Diagram / Memberi Label */}
              <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Aktivitas 1: Beri Label &amp; Amati</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Tuliskan nama bagian</span>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex flex-col items-center justify-center min-h-[100px] text-center space-y-2">
                  <div className="grid grid-cols-2 gap-2 w-full text-xs">
                    <div className="p-1.5 bg-white border border-slate-200 rounded flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-black flex items-center justify-center">1</span>
                      <div className="flex-1 border-b border-dotted border-slate-300 h-4"></div>
                    </div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center">2</span>
                      <div className="flex-1 border-b border-dotted border-slate-300 h-4"></div>
                    </div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center">3</span>
                      <div className="flex-1 border-b border-dotted border-slate-300 h-4"></div>
                    </div>
                    <div className="p-1.5 bg-white border border-slate-200 rounded flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] font-black flex items-center justify-center">4</span>
                      <div className="flex-1 border-b border-dotted border-slate-300 h-4"></div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 italic">
                    Amati gambar di atas dan tuliskan istilah yang tepat pada kotak nomor!
                  </span>
                </div>
              </div>

              {/* Box 2: Menjodohkan / Mengurutkan */}
              <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <ListOrdered className="w-3.5 h-3.5 text-purple-600" />
                    <span>Aktivitas 2: Hubungkan Konsep</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Tarik garis penghubung</span>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex flex-col justify-between min-h-[100px] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Konsep A
                    </span>
                    <span className="text-slate-400 text-xs">• • •</span>
                    <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Definisi / Gambar 2
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Konsep B
                    </span>
                    <span className="text-slate-400 text-xs">• • •</span>
                    <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Definisi / Gambar 1
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Konsep C
                    </span>
                    <span className="text-slate-400 text-xs">• • •</span>
                    <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Definisi / Gambar 3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 6. TABEL OBSERVASI & LEMBAR ANALISIS DATA */}
          <div className="space-y-2.5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                B
              </span>
              <h3 className="text-sm font-extrabold text-slate-800">
                Tabel Observasi &amp; Pengamatan Kerja
              </h3>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-300 shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-emerald-600 text-white font-extrabold">
                    <th className="py-2 px-3 w-10 text-center border-r border-emerald-500">No</th>
                    <th className="py-2 px-3 border-r border-emerald-500">Objek / Tahap Aktivitas</th>
                    <th className="py-2 px-3 border-r border-emerald-500 w-36">Hasil Pengamatan</th>
                    <th className="py-2 px-3">Penjelasan &amp; Analisis Nalar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-700 bg-white">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400 border-r border-slate-200">
                      1
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-800">
                      Pengamatan awal kondisi {topic}
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <div className="border-b border-dotted border-slate-300 h-4"></div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="border-b border-dotted border-slate-300 h-4"></div>
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50 hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-center font-bold text-slate-400 border-r border-slate-200">
                      2
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-800">
                      Perlakuan / Uji coba yang dilakukan
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200">
                      <div className="border-b border-dotted border-slate-300 h-4"></div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="border-b border-dotted border-slate-300 h-4"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 7. LATIHAN TAMBAHAN (OPSIONAL) */}
          {includeExercises && includeExercises.length > 0 && (
            <div className="space-y-2.5 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">
                    C
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    Latihan Soal Relevan (Berbasis Gambar &amp; Aktivitas)
                  </h3>
                </div>
                <div className="flex gap-1">
                  {includeExercises.map((ex) => (
                    <span
                      key={ex}
                      className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {/* Soal 1: Pilihan Ganda */}
                {includeExercises.includes('Pilihan Ganda') && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-800 block">
                      1. Manakah dari pernyataan berikut yang paling tepat menggambarkan prinsip utama dari {topic}?
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 pl-2 text-slate-600">
                      <div>A. Pernyataan konsep dasar A</div>
                      <div>B. Pernyataan konsep perbandingan B</div>
                      <div>C. Pernyataan hasil analisis C</div>
                      <div>D. Pernyataan dampak lingkungan D</div>
                    </div>
                  </div>
                )}

                {/* Soal 2: Isian Singkat */}
                {includeExercises.includes('Isian Singkat') && (
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">
                      2. Faktor utama yang menyebabkan terjadinya fenomena pada materi ini adalah:{' '}
                      <span className="inline-block border-b-2 border-dotted border-slate-400 w-44"></span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 8. SELF-REFLECTION BOX (EMOTIKON & REFLEKSI DIRI SISWA) */}
          <div className="bg-[#f0fbf5] rounded-2xl p-3.5 border border-emerald-300 relative z-10 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">
                  D
                </span>
                <h4 className="text-xs font-extrabold text-emerald-950">
                  Refleksi Belajar Siswa (Student Self-Check)
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                Lingkari ekspresi perasaanmu hari ini!
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMood('senang')}
                className={`p-1.5 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                  selectedMood === 'senang'
                    ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <Smile className="w-4 h-4" />
                <span className="text-xs">Sangat Paham 😊</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMood('cukup')}
                className={`p-1.5 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                  selectedMood === 'cukup'
                    ? 'bg-amber-500 text-white font-bold border-amber-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <Meh className="w-4 h-4" />
                <span className="text-xs">Cukup Paham 🤔</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMood('bantuan')}
                className={`p-1.5 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                  selectedMood === 'bantuan'
                    ? 'bg-rose-500 text-white font-bold border-rose-500 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <Frown className="w-4 h-4" />
                <span className="text-xs">Butuh Bantuan 🙋‍♂️</span>
              </button>
            </div>

            <div className="pt-0.5">
              <span className="text-[11px] font-bold text-slate-700 block mb-0.5">
                Hal paling menyenangkan atau hal baru yang kupelajari hari ini:
              </span>
              <div className="border-b border-dotted border-emerald-300 h-4"></div>
            </div>
          </div>

          {/* FOOTER OF WORKBOOK (Page Number & Tagline) */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>Workbook Pembelajaran Interaktif • Format Kurikulum Merdeka</span>
            <span>Halaman 1 dari 1 (Format A4 Portrait)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
