import PaymentForm from "@/components/payment/PaymentForm";
import CardPreview from "@/components/payment/CardPreview";
import TransactionHistory from "@/components/transaction/TransactionHistory";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">
          Payment Gateway
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CardPreview />
          <PaymentForm />
        </div>

        <div className="mt-10">
          
          <TransactionHistory />
        </div>
      </div>
    </main>
  );
}