// src/app/User/contact/page.js

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">HUBUNGI KAMI</h1>
      </div>

      {/* Konten Utama */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        
        {/* Deskripsi */}
        <div className="mb-8">
          <p className="text-lg leading-relaxed text-gray-700">
            Website SchoolRank percaya bahwa setiap sekolah memiliki potensi untuk berkembang, berinovasi, dan berprestasi melalui pencetakan generasi unggul bangsa. Melalui sistem rating yang akurat, objektif, dan terpercaya, kami berkomitmen untuk membantu masyarakat mendapatkan informasi sekolah yang transparan dan relevan.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mt-4">
            Kami hadir sebagai jembatan antara masyarakat dan dunia pendidikan, agar setiap orang tua, siswa, maupun pihak sekolah dapat bersama-sama mewujudkan pendidikan yang lebih berkualitas, berkarater, dan berdaya di seluruh daerah Indonesia.
          </p>
        </div>

        {/* Informasi Kontak */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informasi Kontak</h2>
          
          <div className="space-y-4">
            {/* Alamat */}
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-medium text-gray-800">Jl. Jenderal Sudirman No. 133, Purwokerto</p>
            </div>

            {/* Telepon */}
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
              </svg>
              <p className="font-medium text-gray-800">0895-3912-8549</p>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="font-medium text-gray-800">schoolrank@gmail.com</p>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.414-14.801a12.91 12.91 0 00-4.114-2.523c-2.112-1.182-4.543-1.653-7.005-1.541a13 13 0 00-1.219 25.515l.615-2.251-2.525-.666-.325-.086-.257-.067a12.94 12.94 0 00-5.283-1.518c-.205-.008-1.04.08-1.562.37-.296.163-.902.512-1.352.785-.075.045-.15.089-.225.133-.4.233-1.498.887-1.498 3.438s1.67 4.81 1.82 5.033c.149.222 2.258 3.55 5.45 4.896 3.193 1.346 3.193.75 3.193.75s-.075.448-.112.56c-.037.112-.15.187-.3.336-.149.149-1.469 1.337-1.729 1.523-.26.15-.472.176-.623.113-.15-.063-1.016-.376-1.016-.376s-.52.25-.793.408c-.272.15-.116.299-.116.299s1.442.523 2.765.82c1.323.298 2.031-.213 2.795-.623.767-.413 4.037-1.56 5.073-2.07.237-.114.502-.168.792-.168.198 0 .375.024.525.074.176.06 2.499.867 2.835.428.336-.448-.82-2.18-.968-2.429-.149-.249-.72-.286-.994-.15-.272.135-3.179 1.523-3.826 1.323-.647-.199-.86-.299-.86-.299s.164-.274.238-.423c.075-.15.113-.308.113-.308s2.22-3.043 3.366-4.114c2.286-2.143 3.224-3.17 3.56-4.045.312-.809.15-.91-.174-.91" />
              </svg>
              <p className="font-medium text-gray-800">0895-3912-8549</p>
            </div>

            {/* YouTube */}
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <p className="font-medium text-gray-800">
                <a href="https://youtube.com/@schoolrank" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  youtube.com/@schoolrank
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}