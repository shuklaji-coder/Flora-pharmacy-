import React, { useState, useEffect, useMemo } from 'react';
import { sanitizeImageUrl } from '../utils/imageCompressor';

/**
 * Flora Pharmacy - Universal High-Definition Product Packshot & Image Renderer
 * 
 * 1. Seamlessly renders real photos (uploaded data URLs or web links).
 * 2. If an image fails to load or is not provided, renders an authentic,
 *    pixel-perfect Indian pharmacy brand packshot with realistic 3D gradients.
 * 3. Never renders a broken image or blank box.
 */
function ProductPackshotComponent({ product }) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const cleanImage = useMemo(() => {
    return sanitizeImageUrl(product?.image);
  }, [product?.image]);

  useEffect(() => {
    setImgError(false);
    setIsLoaded(false);
  }, [cleanImage]);

  // If a real image exists and has not errored, render it with studio presentation!
  if (cleanImage && !imgError) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-2 relative overflow-hidden select-none">
        <img
          src={cleanImage}
          alt={product?.name || "Medicine"}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            console.warn("Product image failed to load, switching to realistic packshot fallback:", cleanImage);
            setImgError(true);
          }}
          className={`max-h-full max-w-full object-contain filter drop-shadow-sm transition-all duration-300 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-90'
          }`}
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback: Smart brand/category identifier
  const id = (product?.id || "").toLowerCase();
  const name = (product?.name || "").toLowerCase();
  const cat = (product?.category || "").toLowerCase();

  // 1. DETTOL ANTISEPTIC LIQUID (Iconic Amber Bottle with White Sword & Green Label)
  if (id.includes("dettol") && !name.includes("handwash") && !id.includes("handwash") || name.includes("dettol antiseptic")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-emerald-50/50 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-7 h-5 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 rounded-t-md shadow-xs border-b border-emerald-900 flex items-center justify-center">
            <div className="w-4 h-1 bg-white/40 rounded-full"></div>
          </div>
          <div className="w-22 h-32 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 rounded-b-2xl shadow-xl p-2 flex flex-col items-center justify-between border border-amber-500/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"></div>
            <div className="w-16 h-18 bg-white rounded-lg shadow-inner flex flex-col items-center justify-center p-1 border border-emerald-700">
              <div className="w-7 h-7 bg-emerald-700 rounded-full flex items-center justify-center text-white font-black text-xs shadow-xs">
                +
              </div>
              <span className="text-[10px] font-black tracking-tight text-emerald-900 mt-0.5">Dettol</span>
              <span className="text-[6.5px] font-extrabold text-amber-900 uppercase">Antiseptic</span>
            </div>
            <span className="text-[8px] font-black text-amber-200 tracking-wider">250 ml</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. JOHNSON'S BABY SHAMPOO (Classic Golden Yellow Teardrop Bottle)
  if (id.includes("johnson") || name.includes("johnson") || name.includes("baby shampoo")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-yellow-50 to-amber-100/60 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-6 h-4 bg-sky-500 rounded-t-md shadow-xs flex items-center justify-center border-b border-sky-600">
            <div className="w-3 h-0.5 bg-white/60 rounded-full"></div>
          </div>
          <div className="w-20 h-32 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-500 rounded-b-3xl rounded-t-xl shadow-xl p-2 flex flex-col items-center justify-between border border-amber-300 relative overflow-hidden">
            <span className="text-[7px] font-black text-sky-800 tracking-widest uppercase">No More Tears</span>
            <div className="text-center my-auto">
              <span className="text-xs font-black tracking-tighter text-blue-900 block leading-tight">Johnson's</span>
              <span className="text-[9px] font-black text-slate-800 block">baby shampoo</span>
            </div>
            <span className="text-[8px] font-black text-amber-900 bg-white/70 px-2 py-0.5 rounded-full">200 ml</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. PAMPERS DIAPERS (Mint / Cyan Diaper Bag Pack with Golden Shield)
  if (id.includes("pampers") || name.includes("pampers") || name.includes("diaper")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-teal-50 to-cyan-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-32 h-28 bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-700 rounded-2xl shadow-xl border-2 border-teal-300 p-2 flex flex-col justify-between items-center text-white relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="w-full flex items-center justify-between">
            <span className="text-[7.5px] font-black bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full uppercase">Pants</span>
            <span className="text-[8px] font-extrabold text-teal-100">Medium</span>
          </div>
          <div className="text-center my-1">
            <span className="text-base font-black tracking-tighter block text-white drop-shadow-sm">Pampers</span>
            <span className="text-[7.5px] font-extrabold text-amber-200 block">All Round Protection</span>
          </div>
          <div className="w-full bg-white/20 backdrop-blur-xs rounded-lg py-1 px-2 flex justify-between items-center text-[7.5px] font-black">
            <span>Anti-Rash</span>
            <span className="text-amber-300">34 Pants</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. HIMALAYA BABY WIPES (White & Teal Moisture Wipe Pack)
  if (id.includes("wipes") || (name.includes("himalaya") && name.includes("wipes"))) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-3 relative select-none">
        <div className="w-34 h-22 bg-gradient-to-r from-slate-100 via-white to-teal-50 rounded-2xl shadow-lg border-2 border-teal-200 p-2.5 flex flex-col justify-between items-center relative transform hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-7 bg-teal-600 rounded-xl shadow-inner flex items-center justify-center border border-teal-500">
            <span className="text-[7.5px] font-black text-white uppercase tracking-wider">FLIP TOP</span>
          </div>
          <div className="text-center">
            <span className="text-[10px] font-black text-teal-800 block">Himalaya</span>
            <span className="text-[8px] font-bold text-slate-700 block">Gentle Baby Wipes</span>
          </div>
          <span className="text-[7.5px] font-black text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">72 Wipes</span>
        </div>
      </div>
    );
  }

  // 5. CETAPHIL GENTLE SKIN CLEANSER (White pump bottle with Blue & Green branding)
  if (id.includes("cetaphil") || name.includes("cetaphil")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-7 h-4 bg-blue-600 rounded-t-sm flex items-center justify-center shadow-xs">
            <div className="w-1 h-3 bg-blue-700 -mt-2 rounded-t-sm"></div>
          </div>
          <div className="w-20 h-30 bg-gradient-to-r from-slate-100 via-white to-slate-200 rounded-b-2xl rounded-t-lg shadow-xl p-2 flex flex-col items-center justify-between border border-slate-300">
            <span className="text-[6.5px] font-extrabold text-blue-600 uppercase tracking-widest">Galderma</span>
            <div className="text-center my-auto">
              <span className="text-xs font-black tracking-tighter text-blue-900 block leading-tight">Cetaphil</span>
              <span className="text-[7.5px] font-bold text-emerald-700 block mt-0.5">Gentle Skin Cleanser</span>
            </div>
            <span className="text-[7.5px] font-black text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full">125 ml</span>
          </div>
        </div>
      </div>
    );
  }

  // 6. NIVEA SOFT (Iconic White Tub with Deep Blue NIVEA Lettering)
  if (id.includes("nivea") || name.includes("nivea")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-sky-50 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-26 h-8 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-t-2xl shadow-md border-b-2 border-slate-300 flex items-center justify-center">
            <div className="w-12 h-1 bg-sky-400/40 rounded-full"></div>
          </div>
          <div className="w-28 h-18 bg-white rounded-b-3xl shadow-xl p-2 flex flex-col items-center justify-between border-t border-slate-200">
            <div className="w-14 h-6 bg-blue-900 rounded-sm flex items-center justify-center shadow-xs mt-1">
              <span className="text-[9px] font-black tracking-wider text-white">NIVEA</span>
            </div>
            <span className="text-[8.5px] font-black text-slate-800 tracking-wide uppercase">Soft Light</span>
            <span className="text-[7.5px] font-black text-blue-800 bg-sky-100 px-2 py-0.5 rounded-full">100 ml</span>
          </div>
        </div>
      </div>
    );
  }

  // 7. VASELINE PETROLEUM JELLY (Classic Blue Cap & Amber Jar)
  if (id.includes("vaseline") || name.includes("vaseline")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-amber-50 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-7 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 rounded-t-xl shadow-md border-b-2 border-blue-900 flex items-center justify-center">
            <span className="text-[7.5px] font-black text-white/80 uppercase tracking-widest">Vaseline</span>
          </div>
          <div className="w-26 h-18 bg-gradient-to-br from-amber-100 via-white to-amber-200 rounded-b-2xl shadow-xl p-2 flex flex-col items-center justify-between border border-amber-300/60">
            <span className="text-[10px] font-black tracking-tight text-blue-900 mt-1">Original</span>
            <span className="text-[7px] font-bold text-amber-900 uppercase">Pure Petroleum Jelly</span>
            <span className="text-[7.5px] font-black text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full">85g</span>
          </div>
        </div>
      </div>
    );
  }

  // 8. SENSODYNE TOOTHPASTE (White & Blue Tube with Rapid Relief Accent)
  if (id.includes("sensodyne") || name.includes("sensodyne") || name.includes("toothpaste")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-36 h-18 bg-white rounded-xl shadow-lg border border-slate-200 p-2 flex items-center justify-between transform rotate-[-4deg] hover:rotate-0 transition-transform duration-300">
          <div className="w-6 h-8 bg-blue-700 rounded-l-md border-r-2 border-blue-900 flex items-center justify-center">
            <span className="w-1 h-4 bg-white/40 rounded-full"></span>
          </div>
          <div className="flex-1 px-2 text-center">
            <span className="text-sm font-black tracking-tight text-blue-900 block leading-tight">
              SENSODYNE
            </span>
            <span className="text-[7.5px] font-extrabold text-emerald-600 block uppercase">
              Fresh Gel • 150g
            </span>
          </div>
          <div className="w-4 h-12 bg-gradient-to-r from-sky-100 to-sky-200 rounded-r-lg border-l border-sky-300"></div>
        </div>
      </div>
    );
  }

  // 9. WHISPER ULTRA (Emerald Green & Violet Wings Pad Pack)
  if (id.includes("whisper") || name.includes("whisper") || name.includes("sanitary") || name.includes("pad")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-purple-50 flex items-center justify-center p-3 relative select-none">
        <div className="w-32 h-26 bg-gradient-to-br from-emerald-600 via-teal-700 to-purple-800 rounded-2xl shadow-xl border-2 border-emerald-400 p-2.5 flex flex-col justify-between items-center text-white relative transform hover:scale-105 transition-transform duration-300">
          <span className="text-[7px] font-black bg-amber-400 text-purple-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
            XL Wings
          </span>
          <div className="text-center my-0.5">
            <span className="text-base font-black italic tracking-tighter text-white block">whisper</span>
            <span className="text-[8px] font-extrabold text-emerald-200 block">ULTRA CLEAN</span>
          </div>
          <span className="text-[7.5px] font-bold text-emerald-100">Lock-Away Core • 30 Pads</span>
        </div>
      </div>
    );
  }

  // 10. BAND-AID WATERPROOF (Iconic Red & White Medical Strip Box)
  if (id.includes("bandaid") || id.includes("band-aid") || name.includes("band-aid") || name.includes("bandage")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-rose-50 to-red-100 flex items-center justify-center p-3 relative select-none">
        <div className="w-28 h-32 bg-white rounded-xl shadow-xl border-2 border-red-500 p-2 flex flex-col justify-between items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-full bg-red-600 text-white text-center py-1 rounded-t-md">
            <span className="text-xs font-black tracking-tight block">BAND-AID</span>
          </div>
          <div className="w-18 h-8 bg-amber-100 rounded-full border border-amber-300 flex items-center justify-center gap-1 shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
          </div>
          <span className="text-[7.5px] font-black text-blue-900 bg-sky-100 px-2 py-0.5 rounded-full">100% Waterproof</span>
          <span className="text-[7.5px] font-black text-slate-600">20 Strips</span>
        </div>
      </div>
    );
  }

  // 11. ODOMOS MOSQUITO REPELLENT (Blue & Red Squeeze Tube)
  if (id.includes("odomos") || name.includes("odomos") || name.includes("mosquito")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform rotate-[-6deg] hover:rotate-0 transition-transform duration-300">
          <div className="w-6 h-5 bg-red-600 rounded-t-md shadow-xs border-b border-red-800"></div>
          <div className="w-16 h-28 bg-gradient-to-b from-blue-700 via-blue-800 to-blue-950 rounded-b-xl shadow-xl p-1.5 flex flex-col items-center justify-between border border-blue-600">
            <span className="text-[6.5px] font-black text-amber-300 uppercase">DABUR</span>
            <div className="text-center my-auto">
              <span className="text-sm font-black italic tracking-tighter text-white block">odomos</span>
              <span className="text-[6.5px] font-bold text-red-300 block uppercase">8Hr Protection</span>
            </div>
            <span className="text-[7px] font-black text-blue-200">100g Tube</span>
          </div>
        </div>
      </div>
    );
  }

  // 12. PROTINEX (Silver & Blue High-Protein Nutrition Jar)
  if (id.includes("protinex") || name.includes("protinex")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-6 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 rounded-t-xl shadow-md border-b-2 border-blue-950 flex items-center justify-center">
            <span className="text-[6.5px] font-black text-blue-200 uppercase tracking-widest">Danone</span>
          </div>
          <div className="w-26 h-26 bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 rounded-b-2xl shadow-xl p-2 flex flex-col items-center justify-between border-t border-sky-400">
            <span className="text-[11px] font-black tracking-tight text-white block">Protinex</span>
            <div className="bg-amber-400 text-amber-950 font-black text-[7.5px] px-2 py-0.5 rounded-full uppercase">
              34% Protein
            </div>
            <span className="text-[7.5px] font-bold text-white">Chocolate • 400g</span>
          </div>
        </div>
      </div>
    );
  }

  // 13. HORLICKS (Orange & Blue Classic Health Malt Jar)
  if (id.includes("horlicks") || name.includes("horlicks")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-blue-50 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-t-xl shadow-md flex items-center justify-center">
            <div className="w-10 h-1 bg-white/40 rounded-full"></div>
          </div>
          <div className="w-26 h-26 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 rounded-b-2xl shadow-xl p-2 flex flex-col items-center justify-between border-t-2 border-amber-400">
            <span className="text-sm font-black tracking-tighter text-amber-400 block drop-shadow-sm">Horlicks</span>
            <span className="text-[7.5px] font-black text-white uppercase tracking-wider">Classic Malt</span>
            <span className="text-[7.5px] font-black text-amber-200 bg-blue-950 px-2 py-0.5 rounded-full border border-blue-700">500g Jar</span>
          </div>
        </div>
      </div>
    );
  }

  // 14. DETTOL HANDWASH REFILL (Pink & Green Hygiene Pouch)
  if (id.includes("handwash") || (name.includes("dettol") && name.includes("handwash"))) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-50 to-emerald-50 flex items-center justify-center p-3 relative select-none">
        <div className="w-26 h-32 bg-gradient-to-b from-pink-500 via-rose-600 to-emerald-700 rounded-3xl shadow-xl border-2 border-pink-300 p-2.5 flex flex-col justify-between items-center text-white transform hover:scale-105 transition-transform duration-300">
          <div className="w-5 h-4 bg-white rounded-t-md -mt-4 shadow-xs border border-slate-300"></div>
          <div className="text-center">
            <span className="text-[9px] font-black tracking-tight block">Dettol</span>
            <span className="text-[7.5px] font-bold text-pink-100 block">Skincare Handwash</span>
          </div>
          <span className="text-[7.5px] font-black bg-white text-emerald-800 px-2 py-0.5 rounded-full">675ml Refill</span>
        </div>
      </div>
    );
  }

  // 15. HIMALAYA FACE WASH (Green Herbal Neem Tube)
  if (id.includes("facewash") || (name.includes("himalaya") && name.includes("face"))) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
          <div className="w-8 h-4 bg-emerald-800 rounded-t-md shadow-xs"></div>
          <div className="w-18 h-28 bg-gradient-to-b from-emerald-600 via-teal-700 to-emerald-800 rounded-b-2xl shadow-xl p-2 flex flex-col items-center justify-between border border-emerald-400">
            <span className="text-[7px] font-black text-amber-200 uppercase">Himalaya</span>
            <div className="text-center my-auto">
              <span className="text-xs font-black tracking-tight text-white block leading-tight">Purifying Neem</span>
              <span className="text-[6.5px] font-bold text-emerald-200 block">Face Wash</span>
            </div>
            <span className="text-[7.5px] font-black text-emerald-100 bg-emerald-950/60 px-2 py-0.5 rounded-full">150 ml</span>
          </div>
        </div>
      </div>
    );
  }

  // 16. DOLO 650 (Yellow Blister Strip)
  if (id.includes("dolo") || name.includes("dolo")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-yellow-100/60 flex items-center justify-center p-3 relative select-none">
        <div className="w-34 h-22 bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-400 rounded-xl shadow-lg border-2 border-amber-400/80 p-2 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between border-b border-amber-500/50 pb-1">
            <span className="text-[11px] font-black tracking-tight text-blue-900 bg-white px-1.5 py-0.5 rounded shadow-xs">
              Dolo-650
            </span>
            <span className="text-[7.5px] font-bold text-emerald-950 uppercase">MICRO LABS</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 my-1 justify-items-center">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-inner border border-amber-400/60 flex items-center justify-center">
                <div className="w-2.5 h-0.5 bg-slate-300 rounded-full"></div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[7.5px] font-bold text-blue-950">
            <span>Paracetamol 650mg</span>
            <span className="bg-amber-500 text-white px-1 rounded">15 Tabs</span>
          </div>
        </div>
      </div>
    );
  }

  // 17. VICKS VAPORUB (Blue tub, green cap)
  if (id.includes("vicks") && !id.includes("inhaler") && !name.includes("inhaler")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-3 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-7 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 rounded-t-xl shadow-md border-b-2 border-emerald-800 flex items-center justify-center">
            <div className="w-12 h-1 bg-white/40 rounded-full"></div>
          </div>
          <div className="w-28 h-20 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 rounded-b-2xl shadow-xl p-2 flex flex-col items-center justify-between border-t border-blue-400/30">
            <div className="w-9 h-7 bg-emerald-500 rounded-xs flex items-center justify-center shadow-inner mt-0.5">
              <span className="text-[9px] font-black tracking-tighter text-white">VICKS</span>
            </div>
            <div className="text-center leading-none mb-1">
              <span className="text-xs font-black tracking-tight text-white block">VapoRub</span>
              <span className="text-[7.5px] font-bold text-emerald-300 uppercase tracking-widest block mt-0.5">Relief Balm</span>
            </div>
          </div>
          <span className="absolute -bottom-1 text-[8.5px] font-extrabold bg-blue-950 text-blue-200 px-2 py-0.5 rounded-full border border-blue-800 shadow">
            50g Jar
          </span>
        </div>
      </div>
    );
  }

  // 18. VOLINI SPRAY (Tall Metallic Blue Aerosol Can)
  if (id.includes("volini") || name.includes("volini")) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-2 relative select-none">
        <div className="relative flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <div className="w-6 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg shadow-xs"></div>
          <div className="w-16 h-28 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800 rounded-b-2xl shadow-xl p-1.5 flex flex-col items-center justify-between border-t-2 border-orange-400">
            <span className="text-[7px] font-extrabold text-orange-300 uppercase">SUN PHARMA</span>
            <div className="text-center my-auto">
              <span className="text-base font-black italic tracking-tighter text-white block">VOLINI</span>
              <span className="text-[7px] font-black text-orange-300 uppercase tracking-tight block">Instant Pain Relief</span>
            </div>
            <span className="text-[7.5px] font-black text-white bg-blue-950/80 px-2 py-0.5 rounded-full">100g Spray</span>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT PHARMACY PRESENTATION (Crisp, High-End Card with Category Symbolism)
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 flex items-center justify-center p-3 relative overflow-hidden select-none">
      <div className="w-32 h-26 bg-white rounded-2xl shadow-md border border-slate-200/90 p-2.5 flex flex-col justify-between items-center text-center relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="w-full flex items-center justify-between border-b border-slate-100 pb-1">
          <span className="text-[7.5px] font-black text-emerald-800 uppercase tracking-wider truncate max-w-[85px]">
            {product?.brandInfo ? product.brandInfo.split('•')[0].trim() : (product?.category || "Flora Certified")}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
        <div className="my-auto px-1 py-1">
          <span className="text-[11px] font-black text-slate-900 block line-clamp-2 leading-tight">
            {product?.name ? product.name.split('/')[0].split('(')[0].trim() : "Medicine"}
          </span>
          <span className="text-[8px] font-bold text-emerald-600 block mt-0.5">
            100% Genuine Pharmacy
          </span>
        </div>
        <div className="w-full flex items-center justify-between pt-1 border-t border-slate-100">
          <span className="text-[7.5px] font-extrabold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md">
            {product?.form || "Standard Pack"}
          </span>
          <span className="text-[8px] font-black text-emerald-800">
            ₹{product?.price || 50}
          </span>
        </div>
      </div>
    </div>
  );
}

const ProductPackshot = React.memo(ProductPackshotComponent);
export default ProductPackshot;
