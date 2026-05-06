"use client";

import { usePaymentStore } from "@/store/paymentStore";

import { CheckCircle2, Clock3, XCircle } from "lucide-react";

export default function TransactionHistory() {
  const transactions = usePaymentStore((state) => state.transactions);

  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <p className="text-base text-slate-500">
          No transactions yet. Your payment history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.transactionId}
          className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* STATUS */}
            <div>
              {transaction.status === "success" ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
              ) : transaction.status === "failed" ? (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
                  <Clock3 className="h-6 w-6 text-amber-600" />
                </div>
              )}
            </div>

            {/* INFO */}
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {transaction.cardHolder}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-right">
            <h3 className="text-lg font-bold text-slate-900">
              {transaction.currency} {transaction.amount}
            </h3>

            <div
              className={`
                mt-2
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                uppercase

                ${
                  transaction.status === "success"
                    ? "bg-emerald-100 text-emerald-700"
                    : transaction.status === "failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                }
              `}
            >
              {transaction.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
