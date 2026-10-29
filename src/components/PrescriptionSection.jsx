import React, { useState, useRef, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/business';
import { 
  Camera, 
  Upload, 
  X, 
  CheckCircle2, 
  FileText, 
  MessageCircle, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  User, 
  Phone,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';

export default function PrescriptionSection() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [copySuccessMsg, setCopySuccessMsg] = useState("");
  const fileInputRef = useRef(null);

  // Check if browser supports Web Share API with files
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.canShare) {
      try {
        const testFile = new File(["test"], "test.txt", { type: "text/plain" });
        if (navigator.canShare({ files: [testFile] })) {
          setCanNativeShare(true);
        }
      } catch (e) {
        setCanNativeShare(false);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null); // For PDF
      }
      // Auto-copy image to clipboard if possible for instant paste in WhatsApp
      copyImageToClipboard(selectedFile, false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    setIsCopied(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Helper to copy image to system clipboard as PNG
  const copyImageToClipboard = async (targetFile, showToast = true) => {
    const fileToCopy = targetFile || file;
    if (!fileToCopy) return false;

    if (!fileToCopy.type.startsWith('image/')) {
      if (showToast) {
        setCopySuccessMsg("PDF document clipboard me copy nahi hota. Kripya WhatsApp me attach karein.");
        setTimeout(() => setCopySuccessMsg(""), 4000);
      }
      return false;
    }

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        // Convert image to PNG blob via canvas for universal browser support
        const img = new Image();
        const objectUrl = URL.createObjectURL(fileToCopy);
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = objectUrl;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(objectUrl);

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setIsCopied(true);
          if (showToast) {
            setCopySuccessMsg("Prescription photo clipboard me copy ho gayi! WhatsApp me Ctrl+V (Paste) karein.");
            setTimeout(() => setCopySuccessMsg(""), 4500);
          }
          return true;
        }
      }
    } catch (err) {
      console.warn("Clipboard copy error:", err);
    }
    return false;
  };

  // Helper to download the prescription image/file
  const handleDownloadFile = () => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name || 'flora-pharmacy-prescription.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Build clean formatted order text for WhatsApp
  const buildOrderMessage = () => {
    let message = `Hello Flora Pharmacy,\nI am submitting a doctor's prescription for medicine verification & delivery:`;
    
    if (patientName.trim()) {
      message += `\n\n👤 *Patient Name:* ${patientName.trim()}`;
    }
    if (patientPhone.trim()) {
      message += `\n📞 *Contact Phone:* ${patientPhone.trim()}`;
    }
    if (deliveryAddress.trim()) {
      message += `\n📍 *Delivery Address:* ${deliveryAddress.trim()}`;
    }
    if (notes.trim()) {
      message += `\n📝 *Notes:* ${notes.trim()}`;
    }

    if (file) {
      message += `\n\n📎 *Prescription File:* ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      message += `\n\n👉 *Note:* Maine ye prescription photo website par upload ki hai aur WhatsApp chat me bhi share kar raha hoon. Kripya medicines verify karke bill aur delivery time confirm karein.`;
    }

    return message;
  };

  // Option 1: Mobile Web Share API (attaches the actual image file directly into WhatsApp!)
  const handleNativeShare = async () => {
    if (!file) {
      alert("Kripya pehle apne prescription ki photo ya file upload karein!");
      return;
    }

    const message = buildOrderMessage();

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Doctor Prescription - Flora Pharmacy",
          text: message
        });
        setShowGuideModal(true);
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn("Native share failed, falling back to direct WhatsApp chat:", err);
        }
      }
    }

    // Fallback to standard chat open
    handleOpenWhatsAppChat();
  };

  // Option 2: Open direct WhatsApp Chat with Flora Pharmacy (+91 86570 90405)
  const handleOpenWhatsAppChat = (e) => {
    if (e) e.preventDefault();
    if (!file) {
      alert("Kripya pehle apne prescription ki photo ya file upload karein!");
      return;
    }

    // Try copying photo to clipboard so user can instantly press Ctrl+V in WhatsApp
    copyImageToClipboard(file, false);

    const message = buildOrderMessage();
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Show instructional modal on screen
    setShowGuideModal(true);
  };

  return (
    <section id="prescription" className="py-14 sm:py-20 bg-gradient-to-b from-white via-emerald-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flora-100 text-flora-800 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-flora-700" />
            <span>Prescription Upload & Delivery</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Doctor Ki Parchi (Prescription) Upload Karein
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Website par photo upload karein aur 1-click me WhatsApp par Pharmacist ko send karein.
          </p>
        </div>

        {/* Upload Container Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-emerald-200/90 shadow-soft-lg overflow-hidden p-6 sm:p-8">
          
          <form onSubmit={handleOpenWhatsAppChat} className="space-y-6">
            
            {/* STEP 1: Upload Dropzone */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Step 1: Prescription Photo Ya File Select Karein *
                </label>
                {file && (
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> File Selected
                  </span>
                )}
              </div>

              {/* Hidden native input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
                id="prescription-file-upload"
              />

              {!file ? (
                /* Unselected State: Click to snap photo or upload */
                <label
                  htmlFor="prescription-file-upload"
                  className="w-full border-2 border-dashed border-emerald-300 hover:border-flora-600 bg-emerald-50/40 hover:bg-emerald-50 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-emerald-100 text-flora-700 flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                    <Camera className="w-7 h-7" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-flora-700 text-center">
                    Click Karke Photo Kheecho Ya File Upload Karo
                  </span>
                  <span className="text-xs text-slate-500 mt-1 text-center">
                    Camera se photo le sakte hain ya Gallery / PDF se select kar sakte hain (JPG, PNG, PDF up to 15MB)
                  </span>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-flora-700 text-white text-xs font-bold shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Prescription</span>
                  </div>
                </label>
              ) : (
                /* Selected File Preview State */
                <div className="border-2 border-emerald-500/80 bg-emerald-50/70 rounded-2xl p-4 sm:p-5 relative flex flex-col sm:flex-row items-center gap-4">
                  
                  {/* Image Thumbnail Preview */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-white border border-emerald-200 shadow-sm shrink-0 flex items-center justify-center relative group">
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Uploaded prescription preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-slate-500 p-2 text-center">
                        <FileText className="w-8 h-8 text-emerald-600 mb-1" />
                        <span className="text-[10px] font-bold">PDF File</span>
                      </div>
                    )}
                  </div>

                  {/* File Information */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Prescription Uploaded Successfully</span>
                    </div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm truncate">
                      {file.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Size: {(file.size / 1024).toFixed(1)} KB • {file.type || 'Document'}
                    </p>

                    {/* Quick helper action badges */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => copyImageToClipboard(file, true)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition border ${
                          isCopied 
                            ? 'bg-emerald-600 text-white border-emerald-600' 
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                        title="Copy photo to clipboard so you can paste in WhatsApp"
                      >
                        {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? "Photo Copied!" : "Copy Photo"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadFile}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition"
                        title="Download photo to your device"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download Photo</span>
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-2 rounded-xl bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 transition shadow-xs"
                    title="Remove and select another photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Toast for copy status */}
              {copySuccessMsg && (
                <div className="mt-2 p-2.5 rounded-xl bg-emerald-600 text-white text-xs font-medium flex items-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{copySuccessMsg}</span>
                </div>
              )}
            </div>

            {/* STEP 2: Optional Patient & Delivery Details */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                Step 2: Delivery Details (Optional - Fast delivery ke liye)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Patient Name */}
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Patient Name (e.g. Ramesh Patel)"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-flora-600 transition"
                  />
                </div>

                {/* Patient Phone */}
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Your Phone Number (e.g. 98200XXXXX)"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-flora-600 transition"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  rows="2"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Delivery Address / Flat / Building / Landmark in Borivali East (e.g. Flat 302, Samarpan, near Magathane Metro)"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-flora-600 transition"
                ></textarea>
              </div>

              {/* Notes */}
              <div>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific note? (e.g. Please send 1 month supply / Call before delivering)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-flora-600 transition"
                />
              </div>
            </div>

            {/* STEP 3: Action Buttons */}
            <div className="pt-2 space-y-3">
              
              {/* If Mobile Web Share is available, offer direct 1-tap photo attachment */}
              {canNativeShare && file && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full py-3.5 px-6 rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-flora-700 hover:from-emerald-700 hover:to-flora-800 text-white shadow-lg shadow-emerald-700/20 transition transform hover:-translate-y-0.5"
                >
                  <Share2 className="w-5 h-5 shrink-0" />
                  <span>📲 WhatsApp Par Photo Ke Saath Share Karein (Direct Attach)</span>
                </button>
              )}

              {/* Primary / Fallback WhatsApp Button */}
              <button
                type="submit"
                disabled={!file}
                className={`w-full py-3.5 px-6 rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 transition shadow-md ${
                  file
                    ? 'bg-wa hover:bg-wa-dark text-slate-950 hover:text-white cursor-pointer shadow-glow transform hover:-translate-y-0.5'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>
                  {file 
                    ? "💬 Flora Pharmacy WhatsApp Par Send Karein (+91 86570 90405)" 
                    : "Pehle Prescription Photo Upload Karein (Step 1)"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {file && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs flex items-start gap-2.5">
                  <div className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-emerald-950">
                      💡 WhatsApp me photo kaise send hogi:
                    </p>
                    <p className="text-emerald-800 leading-relaxed text-[11px]">
                      WhatsApp open hote hi aapki saari details pre-fill ho jayengi. WhatsApp chat khulne par bas <strong>Paste (Ctrl+V)</strong> karein ya WhatsApp ke <strong>📎 (Paperclip / Camera)</strong> icon se photo send kar dein!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Compliance Note */}
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Govt Regulatory Compliance:</strong> Schedule H & H1 prescription medicines are dispensed strictly against a valid doctor's prescription issued by a registered medical practitioner.
              </span>
            </div>

          </form>

        </div>

      </div>

      {/* GUIDANCE MODAL: Explains how to complete the prescription send in WhatsApp */}
      {showGuideModal && file && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-emerald-200 space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                    Prescription WhatsApp Ready!
                  </h3>
                  <p className="text-xs text-slate-500">
                    Flora Pharmacy (+91 86570 90405)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prescription Preview Snippet */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 flex items-center justify-center">
                {filePreview ? (
                  <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-6 h-6 text-emerald-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{file.name}</p>
                <p className="text-[11px] text-slate-500">{(file.size / 1024).toFixed(1)} KB • {patientName ? `Patient: ${patientName}` : 'Prescription Order'}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Ready to attach
                </span>
              </div>
            </div>

            {/* 2 Easy Options to Send the Photo */}
            <div className="space-y-3">
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                WhatsApp Me Photo Send Karne Ke 2 Aasan Tareeqe:
              </p>

              {/* Method 1: Clipboard Paste (Ctrl+V) */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-emerald-950">
                    Direct Paste Karein (Ctrl + V)
                  </h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                    Humne photo aapke clipboard me copy kar di hai. WhatsApp chat me jaakar bas <strong>Right Click &rarr; Paste</strong> (ya <strong>Ctrl + V</strong>) dabayein!
                  </p>
                  <button
                    type="button"
                    onClick={() => copyImageToClipboard(file, true)}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{isCopied ? "Photo Copied!" : "Photo Dobara Copy Karein"}</span>
                  </button>
                </div>
              </div>

              {/* Method 2: Attachment Icon (Paperclip) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900">
                    WhatsApp Me 📎 Paperclip / Camera Icon Se Attach Karein
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    WhatsApp ke bottom me bane <strong>📎 icon</strong> par click karke apni gallery ya saved files se ye photo select kar lein.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadFile}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Photo Download Karein (Galley/Files Me Save)</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Action Buttons inside modal */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(buildOrderMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-wa hover:bg-wa-dark text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Chat Kholein</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition"
              >
                Samajh Gaya / Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}