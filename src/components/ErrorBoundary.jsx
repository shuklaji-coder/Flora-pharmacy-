import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Flora Pharmacy Runtime Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-heading font-black text-white">
                Kuch Takneeki Kharabi Aayi Hai
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flora Pharmacy application ko load karte waqt issue aaya. Kripya refresh karein ya home par jayein.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-glow"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Page Refresh Karein</span>
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Home Page</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
              Emergency Helpline: <a href="tel:+918657090405" className="text-emerald-400 font-mono">+91 86570 90405</a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
