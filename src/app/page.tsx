import PaymentForm from "@/components/payment/PaymentForm";
import CardPreview from "@/components/payment/CardPreview";
import TransactionHistory from "@/components/transaction/TransactionHistory";

import { ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#eef2ff]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* TOP HEADER */}
        <div className="mb-10 flex items-center gap-4">
          {/* ICON */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>

          {/* TEXT */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Payment Gateway Demo
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              A demo payment gateway · Test mode
            </p>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[520px_1fr]">
          {/* LEFT SIDE */}
          <div className="space-y-8">
            {/* CARD */}
            <CardPreview />

            {/* HISTORY */}
            <div>
              <h2 className="mb-4 text-lg font-semibold uppercase tracking-wide text-slate-600">
                Transaction History
              </h2>

              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
                <TransactionHistory />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {/* FORM */}
            <PaymentForm />
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-14 text-center">
          <p className="text-sm text-slate-500">
            Demo gateway · No real card data is
            sent. Use any valid test card number
            (e.g. 4242 4242 4242 4242).
          </p>
        </div>
      </div>
    </main>
  );
}