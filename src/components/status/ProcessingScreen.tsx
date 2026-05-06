"use client";

import { LoaderCircle } from "lucide-react";

export default function ProcessingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[32px] bg-white p-10 shadow-2xl">
        <div className="flex flex-col items-center justify-center text-center">
          {/* LOADER */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
            <LoaderCircle className="h-12 w-12 animate-spin text-indigo-600" />
          </div>

          {/* TITLE */}
          <h2 className="text-3xl font-bold text-slate-900">
            Processing Payment
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Please wait while we securely
            process your transaction.
          </p>

          {/* LOADING BAR */}
          <div className="mt-8 h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-indigo-600" />
          </div>

          {/* FOOTER */}
          <p className="mt-5 text-sm text-slate-400">
            Do not close this window
          </p>
        </div>
      </div>
    </div>
  );
}