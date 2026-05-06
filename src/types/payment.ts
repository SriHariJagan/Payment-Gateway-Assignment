export type PaymentStatus =
  | "idle"
  | "processing"
  | "success"
  | "failed"
  | "timeout";

export type CardType =
  | "visa"
  | "mastercard"
  | "amex"
  | "unknown";

export interface PaymentPayload {
  transactionId: string;
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  amount: number;
  currency: "INR" | "USD";
}

export interface Transaction {
  transactionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  timestamp: string;
  attempts: number;
  failureReason?: string;
}