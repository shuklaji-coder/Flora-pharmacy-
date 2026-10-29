import React, { useState } from 'react';

/**
 * High-definition, realistic product packshot component.
 * Renders authentic Indian pharmacy packaging visuals with real brand styling,
 * 3D gradients, iconic colors, and form factors.
 */
export default function ProductPackshot({ product }) {
  const [imgError, setImgError] = useState(false);

  // If a real image exists and has not errored, we can show it with packshot styling
  // But for the iconic products, render the authentic realistic Indian packshot illustration!
  const id = product.id || "";

  // 1. VICKS VAPORUB (Blue tub, green cap, Vicks triangle)
  if (id === "otc-vicks-rub") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-3 relative overflow-hidden select-none">
        <div className="relative flex flex-col items-center">
          {/* Green Ribbed Cap */}
          <div className="w-24 h-7 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 rounded-t-xl shadow-md border-b-2 border-emerald-800 flex items-center justify-center">
            <div className="w-full h-full flex justify-around items-center px-2 opacity-40">
              <span className="w-0.5 h-3 bg-white rounded-full"></span>
              <span className="w-0.5 h-3 bg-white rounded-full"></span>
              <span className="w-0.5 h-3 bg-white rounded-full"></span>
              <span className="w-0.5 h-3 bg-white rounded-full"></span>
              <span className="w-0.5 h-3 bg-white rounded-full"></span>
            </div>
          </div>
          {/* Cobalt Blue Tub */}
          <div className="w-28 h-20 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 rounded-b-2xl shadow-xl p-2 flex flex-col items-center justify-between border-t border-blue-400/30">
            {/* Green Vicks Triangle */}
            <div className="w-9 h-7 bg-emerald-500 rounded-sm flex items-center justify-center shadow-inner mt-0.5">
              <span className="text-[9px] font-black tracking-tighter text-white">VICKS</span>
            </div>
            {/* VapoRub Text */}
            <div className="text-center leading-none mb-1">
              <span className="text-xs font-black tracking-tight text-white block drop-shadow-sm">VapoRub</span>
              <span className="text-[7.5px] font-bold text-emerald-300 uppercase tracking-widest block mt-0.5">Relief Balm</span>
            </div>
          </div>
          {/* 50g Net Weight Pill */}
          <span className="absolute -bottom-1 text-[8.5px] font-extrabold bg-blue-950 text-blue-200 px-2 py-0.5 rounded-full border border-blue-800 shadow">
            50g Jar
          </span>
        </div>
      </div>
    );
  }

  // 2. VICKS INHALER (White & Green pocket cylinder stick)
  if (id === "otc-vicks-inhaler") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-emerald-50 flex items-center justify-center p-3 relative overflow-hidden select-none">
        <div className="relative flex items-center justify-center rotate-[-15deg] hover:rotate-0 transition-transform duration-300">
          <div className="flex flex-col items-center shadow-xl rounded-full">
            {/* Green Top Cap */}
            <div className="w-8 h-10 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 rounded-t-full border-b border-emerald-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300/60"></div>
            </div>
            {/* White Inhaler Body */}
            <div className="w-8 h-20 bg-gradient-to-r from-slate-100 via-white to-slate-200 rounded-b-full p-1 flex flex-col items-center justify-between border-t border-slate-300">
              <div className="w-6 h-5 bg-emerald-600 rounded-xs flex items-center justify-center mt-1">
                <span className="text-[6.5px] font-black text-white">VICKS</span>
              </div>
              <span className="text-[7px] font-black text-emerald-800 uppercase tracking-tighter rotate-[-90deg] my-auto">
                INHALER
              </span>
              <span className="text-[6px] text-slate-500 font-bold mb-1">0.5ml</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. DOLO 650 (Iconic Yellow & White Blister Strip)
  if (id === "otc-dolo") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-yellow-100/60 flex items-center justify-center p-3 relative select-none">
        <div className="w-36 h-24 bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-400 rounded-xl shadow-lg border-2 border-amber-400/80 p-2 flex flex-col justify-between relative transform hover:scale-105 transition-transform">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-500/50 pb-1">
            <span className="text-[11px] font-black tracking-tight text-blue-900 bg-white px-1.5 py-0.5 rounded shadow-xs">
              Dolo-650
            </span>
            <span className="text-[8px] font-bold text-emerald-950 uppercase">MICRO LABS</span>
          </div>
          {/* 6 Embossed Tablets */}
          <div className="grid grid-cols-5 gap-1.5 my-1 justify-items-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-inner border border-amber-400/60 flex items-center justify-center">
                <div className="w-2.5 h-0.5 bg-slate-300 rounded-full"></div>
              </div>
            ))}
          </div>
          {/* Subtext */}
          <div className="flex items-center justify-between text-[7.5px] font-bold text-blue-950">
            <span>Paracetamol IP 650 mg</span>
            <span className="bg-amber-500 text-white px-1 rounded">15 Tabs</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. VOLINI SPRAY (Tall Metallic Blue Aerosol Can)
  if (id === "pain-volini") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-2 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform">
          {/* Spray Nozzle */}
          <div className="w-6 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg shadow"></div>
          {/* Metallic Blue Can Body */}
          <div className="w-16 h-28 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800 rounded-b-2xl shadow-xl p-1.5 flex flex-col items-center justify-between border-t-2 border-orange-400">
            <span className="text-[7px] font-extrabold text-orange-300 uppercase tracking-wider">SUN PHARMA</span>
            {/* Bold Volini Logo */}
            <div className="text-center my-auto">
              <span className="text-base font-black italic tracking-tighter text-white block drop-shadow-md">
                VOLINI
              </span>
              <span className="text-[7px] font-black text-orange-300 uppercase tracking-tight block">
                MAX SPRAY
              </span>
            </div>
            <div className="w-full bg-blue-950/70 rounded py-0.5 text-center">
              <span className="text-[7.5px] font-bold text-white">100g • Fast Relief</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. MOOV OINTMENT (White Tube with Red MOOV)
  if (id === "pain-moov") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center p-3 relative select-none">
        <div className="w-36 h-18 bg-white rounded-xl shadow-lg border border-slate-200 p-2 flex items-center justify-between transform rotate-[-8deg] hover:rotate-0 transition-transform">
          <div className="w-6 h-8 bg-red-600 rounded-l-md border-r-2 border-red-800 flex items-center justify-center">
            <span className="w-1 h-4 bg-white/40 rounded-full"></span>
          </div>
          <div className="flex-1 px-2 text-center">
            <span className="text-lg font-black tracking-tight text-red-600 block leading-tight">
              MOOV
            </span>
            <span className="text-[8px] font-bold text-emerald-700 block uppercase">
              Pain Specialist • 50g
            </span>
          </div>
          <div className="w-4 h-12 bg-gradient-to-r from-slate-200 to-slate-100 rounded-r-lg border-l border-slate-300"></div>
        </div>
      </div>
    );
  }

  // 6. DIGENE CHEWABLE TABLETS (Iconic Hot Pink Strip)
  if (id === "dig-digene") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-36 h-24 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 rounded-xl shadow-lg border-2 border-pink-400 p-2 flex flex-col justify-between transform hover:scale-105 transition-transform text-white">
          <div className="flex items-center justify-between border-b border-pink-300/40 pb-1">
            <span className="text-xs font-black tracking-tight bg-white text-pink-600 px-1.5 py-0.5 rounded shadow-xs">
              Digene
            </span>
            <span className="text-[8px] font-bold text-pink-100 uppercase">Abbott</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 my-1 justify-items-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200 shadow-md border border-pink-300 flex items-center justify-center">
                <span className="text-[6px] font-bold text-pink-600">D</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[7.5px] font-bold text-pink-100">
            <span>Antacid & Antigas (Mint)</span>
            <span className="bg-pink-700 px-1 rounded">15 Chewables</span>
          </div>
        </div>
      </div>
    );
  }

  // 7. ENO FRUIT SALT (Bright Yellow / Lime Sachet)
  if (id === "dig-eno") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-lime-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-24 h-28 bg-gradient-to-br from-yellow-400 via-lime-400 to-yellow-500 rounded-xl shadow-lg border-2 border-lime-500/80 p-2 flex flex-col justify-between items-center text-center transform hover:scale-105 transition-transform">
          <div className="w-full flex justify-between items-center text-[7px] font-bold text-emerald-950">
            <span>GSK</span>
            <span className="bg-lime-600 text-white px-1 rounded">LEMON</span>
          </div>
          <div className="my-auto">
            <span className="text-2xl font-black tracking-tighter text-blue-900 block drop-shadow-sm leading-none">
              ENO
            </span>
            <span className="text-[7.5px] font-extrabold text-emerald-950 uppercase block mt-1">
              Fruit Salt • 6 Secs
            </span>
          </div>
          <span className="text-[8px] font-bold text-blue-900 bg-white/70 px-2 py-0.5 rounded-full">
            Pack of 6 Sachets
          </span>
        </div>
      </div>
    );
  }

  // 8. BECOSULES Z (Iconic Green & Red Capsule Blister)
  if (id === "vit-becosules") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-yellow-50 flex items-center justify-center p-3 relative select-none">
        <div className="w-36 h-24 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-xl shadow-lg border-2 border-emerald-500 p-2 flex flex-col justify-between transform hover:scale-105 transition-transform text-white">
          <div className="flex items-center justify-between border-b border-emerald-400/40 pb-1">
            <span className="text-[11px] font-black tracking-tight text-white bg-yellow-500 px-1.5 py-0.5 rounded text-slate-950 shadow-xs">
              Becosules Z
            </span>
            <span className="text-[8px] font-bold text-emerald-200 uppercase">Pfizer</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 my-1 justify-items-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-5 h-2.5 rounded-full bg-gradient-to-r from-red-600 via-amber-400 to-yellow-300 shadow-md border border-white/50"></div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[7.5px] font-bold text-emerald-100">
            <span>B-Complex + Vit C + Zinc</span>
            <span className="bg-emerald-900 px-1 rounded">20 Caps</span>
          </div>
        </div>
      </div>
    );
  }

  // 9. SHELCAL 500 (White Bottle with Blue Label)
  if (id === "vit-shelcal") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform">
          <div className="w-10 h-5 bg-blue-700 rounded-t-lg shadow border-b border-blue-900"></div>
          <div className="w-18 h-24 bg-white rounded-b-2xl shadow-xl border border-slate-200 p-1.5 flex flex-col items-center justify-between">
            <span className="text-[7px] font-black text-blue-900 uppercase">TORRENT</span>
            <div className="text-center">
              <span className="text-sm font-black text-blue-800 block leading-tight">Shelcal</span>
              <span className="text-[10px] font-black text-emerald-600 block">500</span>
              <span className="text-[6.5px] font-bold text-slate-500">Calcium + D3</span>
            </div>
            <span className="text-[7.5px] font-extrabold bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full">
              15 Tablets
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 10. ELECTRAL WHO-ORS (Blue and White Sachet)
  if (id === "otc-electral") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-28 h-26 bg-white rounded-xl shadow-lg border-2 border-sky-400 p-2 flex flex-col justify-between items-center text-center transform hover:scale-105 transition-transform">
          <div className="w-full flex justify-between items-center text-[7.5px] font-black text-blue-900">
            <span>FDC</span>
            <span className="bg-sky-600 text-white px-1 rounded">WHO-ORS</span>
          </div>
          <div className="my-auto">
            <span className="text-lg font-black tracking-tight text-blue-800 block leading-tight">
              Electral
            </span>
            <span className="text-[7px] font-bold text-slate-600 block mt-0.5">
              Oral Rehydration Salts IP
            </span>
          </div>
          <span className="text-[7.5px] font-bold text-blue-950 bg-sky-100 px-2 py-0.5 rounded-full">
            21.8g Sachet (1L)
          </span>
        </div>
      </div>
    );
  }

  // 11. DETTOL ANTISEPTIC LIQUID (Amber Bottle with White Sword)
  if (id === "pc-dettol-liquid") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform">
          <div className="w-8 h-4 bg-white rounded-t-md shadow border border-slate-300"></div>
          <div className="w-18 h-26 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 rounded-b-2xl shadow-xl p-1.5 flex flex-col items-center justify-between border-t border-amber-500">
            <span className="text-[6.5px] font-bold text-amber-200 uppercase">RECKITT</span>
            <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center p-1 shadow-inner border border-emerald-600">
              <span className="text-[7.5px] font-black text-emerald-700 leading-none">Dettol</span>
              <div className="w-1 h-4 bg-emerald-600 rounded-full my-0.5"></div>
            </div>
            <span className="text-[7px] font-bold text-white bg-emerald-800 px-1.5 py-0.5 rounded-full">
              550ml Bottle
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 12. OMRON BP MONITOR (White Digital Monitor with Cuff)
  if (id === "hd-omron-bp") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-emerald-50 flex items-center justify-center p-2 relative select-none">
        <div className="flex items-center gap-2 transform hover:scale-105 transition-transform">
          {/* Machine */}
          <div className="w-24 h-24 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[7px] font-black text-blue-900 border-b pb-0.5">
              <span>OMRON</span>
              <span className="text-slate-400">HEM-7120</span>
            </div>
            {/* LCD Screen */}
            <div className="bg-slate-100 border border-slate-300 rounded p-1 text-center font-mono leading-none">
              <span className="text-xs font-black text-slate-800 block">120 <span className="text-[7px]">SYS</span></span>
              <span className="text-xs font-black text-slate-800 block">80 <span className="text-[7px]">DIA</span></span>
              <span className="text-[8px] font-bold text-emerald-600 block">72 BPM</span>
            </div>
            <div className="w-5 h-2 bg-blue-600 rounded-full mx-auto"></div>
          </div>
          {/* Cuff */}
          <div className="w-10 h-20 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl shadow-md border-l-2 border-blue-500 flex items-center justify-center text-white">
            <span className="text-[7px] font-bold rotate-[-90deg] uppercase tracking-wider text-slate-300">
              CUFF
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 13. ACCU-CHEK ACTIVE TEST STRIPS (Green & White Box)
  if (id === "diab-accuchek-strips") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-24 h-28 bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 rounded-xl shadow-xl border-2 border-emerald-500 p-2 flex flex-col justify-between text-white transform hover:scale-105 transition-transform">
          <div className="flex justify-between items-center text-[7.5px] font-bold text-emerald-200">
            <span>Roche</span>
            <span className="bg-white text-emerald-900 px-1 rounded font-black">50</span>
          </div>
          <div className="my-auto text-center">
            <span className="text-[11px] font-black tracking-tight text-white block leading-tight">
              ACCU-CHEK
            </span>
            <span className="text-[9px] font-black text-yellow-300 block uppercase">
              Active
            </span>
            <div className="w-3 h-8 bg-yellow-400 mx-auto my-1 rounded-xs border border-white/60"></div>
          </div>
          <span className="text-[7px] font-bold text-emerald-200 bg-emerald-950 py-0.5 text-center rounded">
            50 Blood Sugar Strips
          </span>
        </div>
      </div>
    );
  }

  // 14. DABUR CHYAWANPRASH (Red and Gold 1kg Jar)
  if (id === "ayur-chyawanprash") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-red-50 to-amber-100 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform">
          <div className="w-18 h-5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-t-xl shadow border-b border-amber-600"></div>
          <div className="w-22 h-24 bg-gradient-to-br from-red-700 via-red-800 to-rose-950 rounded-b-2xl shadow-xl p-1.5 flex flex-col items-center justify-between border-t border-amber-400">
            <span className="text-[8px] font-black text-yellow-300 uppercase">DABUR</span>
            <div className="text-center">
              <span className="text-[11px] font-black text-white block leading-tight">
                Chyawanprash
              </span>
              <span className="text-[7px] font-bold text-amber-300 block mt-0.5">
                2X Immunity • 40+ Herbs
              </span>
            </div>
            <span className="text-[7.5px] font-black bg-amber-400 text-red-950 px-2 py-0.5 rounded-full">
              1 kg Jar
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 15. BETADINE 5% OINTMENT (Purple & White Tube)
  if (id === "fa-betadine") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-36 h-18 bg-white rounded-xl shadow-lg border border-slate-200 p-2 flex items-center justify-between transform rotate-[-6deg] hover:rotate-0 transition-transform">
          <div className="w-6 h-8 bg-purple-700 rounded-l-md border-r-2 border-purple-900 flex items-center justify-center">
            <span className="w-1 h-4 bg-white/40 rounded-full"></span>
          </div>
          <div className="flex-1 px-2 text-center">
            <span className="text-sm font-black tracking-tight text-purple-900 block leading-tight">
              BETADINE
            </span>
            <span className="text-[8px] font-extrabold text-amber-600 block uppercase">
              5% Microbicide • 20g
            </span>
          </div>
          <div className="w-4 h-12 bg-gradient-to-r from-purple-100 to-purple-200 rounded-r-lg border-l border-purple-300"></div>
        </div>
      </div>
    );
  }

  // 16. PAMPERS ALL ROUND PROTECTION (Teal & Yellow Pack)
  if (id === "baby-pampers") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-26 h-28 bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700 rounded-2xl shadow-xl border-2 border-teal-300 p-2 flex flex-col justify-between items-center text-center text-white transform hover:scale-105 transition-transform">
          <div className="w-full flex justify-between items-center text-[7px] font-bold">
            <span className="text-yellow-300">P&G</span>
            <span className="bg-yellow-400 text-teal-950 px-1 rounded font-black">M / L</span>
          </div>
          <div className="my-auto">
            <span className="text-base font-black tracking-tight text-white block leading-none">
              Pampers
            </span>
            <span className="text-[7.5px] font-bold text-yellow-200 uppercase block mt-1">
              All Round Protection
            </span>
          </div>
          <span className="text-[7.5px] font-bold text-teal-950 bg-white px-2 py-0.5 rounded-full">
            34 Diaper Pants
          </span>
        </div>
      </div>
    );
  }

  // 17. HANSAPLAST BAND-AIDS (Yellow & Blue Box)
  if (id === "fa-hansaplast") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-28 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-lg border-2 border-amber-300 p-2 flex flex-col justify-between items-center text-center transform hover:scale-105 transition-transform">
          <div className="w-full flex justify-between items-center text-[7px] font-black text-blue-900">
            <span>Beiersdorf</span>
            <span className="bg-blue-800 text-white px-1 rounded">30s</span>
          </div>
          <div className="my-auto">
            <span className="text-sm font-black tracking-tight text-blue-900 block leading-tight">
              Hansaplast
            </span>
            <span className="text-[7.5px] font-bold text-slate-800 block">
              Washproof Medicated
            </span>
          </div>
          <span className="text-[7.5px] font-bold text-white bg-blue-900 px-2 py-0.5 rounded-full">
            Pack of 30 Strips
          </span>
        </div>
      </div>
    );
  }

  // 18. PULSE OXIMETER (Fingertip OLED Monitor)
  if (id === "hd-oximeter") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-sky-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-24 h-24 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl border-2 border-sky-400 p-2 flex flex-col justify-between items-center text-white transform hover:scale-105 transition-transform">
          <span className="text-[7px] font-bold text-sky-300 uppercase">Dr. Trust USA</span>
          <div className="w-full bg-black/80 rounded-lg p-1.5 text-center font-mono leading-none border border-sky-500/40">
            <span className="text-sm font-black text-sky-400 block">98 <span className="text-[7px] text-white">%SpO2</span></span>
            <span className="text-[9px] font-bold text-amber-400 block mt-0.5">PR 72 bpm</span>
          </div>
          <div className="w-4 h-1.5 bg-sky-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  // 19. COMBIFLAM (Magenta & White Blister)
  if (id === "rx-combiflam") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-36 h-24 bg-gradient-to-br from-rose-600 to-pink-700 rounded-xl shadow-lg border-2 border-rose-400 p-2 flex flex-col justify-between transform hover:scale-105 transition-transform text-white">
          <div className="flex items-center justify-between border-b border-rose-300/40 pb-1">
            <span className="text-[11px] font-black tracking-tight text-rose-900 bg-white px-1.5 py-0.5 rounded shadow-xs">
              Combiflam
            </span>
            <span className="text-[8px] font-bold text-rose-200 uppercase">Sanofi</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 my-1 justify-items-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-white shadow-md border border-rose-200 flex items-center justify-center">
                <div className="w-2 h-0.5 bg-rose-400 rounded-full"></div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[7px] font-bold text-rose-100">
            <span>Ibuprofen + Paracetamol</span>
            <span className="bg-rose-900 px-1 rounded">20 Tabs</span>
          </div>
        </div>
      </div>
    );
  }

  // 20. PAN-D (Gold & Purple Capsule Strip)
  if (id === "rx-pand") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-36 h-24 bg-gradient-to-br from-purple-700 to-indigo-800 rounded-xl shadow-lg border-2 border-purple-400 p-2 flex flex-col justify-between transform hover:scale-105 transition-transform text-white">
          <div className="flex items-center justify-between border-b border-purple-300/40 pb-1">
            <span className="text-[11px] font-black tracking-tight text-purple-950 bg-amber-400 px-1.5 py-0.5 rounded shadow-xs">
              Pan-D
            </span>
            <span className="text-[8px] font-bold text-purple-200 uppercase">Alkem</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 my-1 justify-items-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-5 h-2.5 rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-200 shadow-md border border-purple-300"></div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[7px] font-bold text-purple-100">
            <span>Pantoprazole + Domperidone</span>
            <span className="bg-purple-950 px-1 rounded">15 Caps</span>
          </div>
        </div>
      </div>
    );
  }

  // 21. SENSODYNE (White & Blue Toothpaste Tube)
  if (id === "pc-sensodyne") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-36 h-18 bg-white rounded-xl shadow-lg border border-slate-200 p-2 flex items-center justify-between transform rotate-[-6deg] hover:rotate-0 transition-transform">
          <div className="w-6 h-8 bg-blue-700 rounded-l-md border-r-2 border-blue-900 flex items-center justify-center">
            <span className="w-1 h-4 bg-white/40 rounded-full"></span>
          </div>
          <div className="flex-1 px-2 text-center">
            <span className="text-sm font-black tracking-tight text-blue-900 block leading-tight">
              SENSODYNE
            </span>
            <span className="text-[7.5px] font-extrabold text-emerald-600 block uppercase">
              Rapid Relief • 80g
            </span>
          </div>
          <div className="w-4 h-12 bg-gradient-to-r from-sky-100 to-sky-200 rounded-r-lg border-l border-sky-300"></div>
        </div>
      </div>
    );
  }

  // DEFAULT FALLBACK: Distinct packaging card tailored to product category
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-3 relative overflow-hidden select-none">
      <div className="w-32 h-24 bg-white rounded-xl shadow-md border border-slate-200 p-2 flex flex-col justify-between items-center text-center">
        <span className="text-[7.5px] font-black text-flora-800 uppercase tracking-wider truncate max-w-full">
          {product.brandInfo ? product.brandInfo.split('•')[0].trim() : product.category}
        </span>
        <div className="my-auto px-1">
          <span className="text-xs font-black text-slate-800 block line-clamp-2 leading-tight">
            {product.name.split('/')[0].split('(')[0].trim()}
          </span>
          <span className="text-[8px] font-bold text-emerald-600 block mt-0.5">
            {product.tag || "Genuine Medicine"}
          </span>
        </div>
        <span className="text-[7.5px] font-extrabold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
          {product.form || "1 Pack"}
        </span>
      </div>
    </div>
  );
}
