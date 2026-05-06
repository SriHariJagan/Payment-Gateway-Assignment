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

  currency:
    | "INR"
    | "USD"
    | "EUR";
}

export interface Transaction {
  id: string;

  transactionId: string;

  cardHolder: string;

  amount: number;

  currency:
    | "INR"
    | "USD"
    | "EUR";

  cardType: CardType;

  status: PaymentStatus;

  createdAt: string;

  attempts: number;

  failureReason?: string;
}