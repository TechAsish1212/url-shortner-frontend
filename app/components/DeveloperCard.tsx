// components/DeveloperCard.tsx

import Image from "next/image";


export function DeveloperCard() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-sm">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Photo */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-blue-100/60 shadow-md">
            <Image
              src=""
              alt="Developer photo"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-green-400 border-2 border-white rounded-full w-5 h-5"></span>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
            <h3 className="text-xl font-bold text-slate-800">Alex River</h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              Full-stack Developer
            </span>
          </div>
          <p className="text-slate-500 text-sm mb-3">
            Building products that make the web simpler & more connected.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start text-sm">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="text-blue-500">📧</span>
              <a href="mailto:alex@snapshort.dev" className="hover:text-blue-600 transition-colors">
                alex@snapshort.dev
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="text-blue-500">🐦</span>
              <a href="#" className="hover:text-blue-600 transition-colors">
                @alexriver
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="text-blue-500">💼</span>
              <a href="#" className="hover:text-blue-600 transition-colors">
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">React</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Next.js</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">TypeScript</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Tailwind</span>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs text-slate-500">
        <div>
          <span className="block font-semibold text-slate-700 text-sm">4+</span>
          years building
        </div>
        <div>
          <span className="block font-semibold text-slate-700 text-sm">12</span>
          shipped products
        </div>
        <div>
          <span className="block font-semibold text-slate-700 text-sm">🚀</span>
          Passion for UX
        </div>
        <div>
          <span className="block font-semibold text-slate-700 text-sm">🌍</span>
          Remote-first
        </div>
      </div>
    </div>
  );
}