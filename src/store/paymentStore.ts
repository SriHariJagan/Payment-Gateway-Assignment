import { create } from "zustand";

import { PaymentStatus, Transaction } from "@/types/payment";

interface CardPreviewData {
  cardNumber: string;

  cardHolder: string;

  expiry: string;
}

interface PaymentStore {
  // PAYMENT
  status: PaymentStatus;

  // CARD DATA
  cardData: CardPreviewData;

  // TRANSACTIONS
  transactions: Transaction[];

  // RETRY
  attemptCount: number;

  // TXN ID
  transactionId: string;

  // ACTIONS
  setStatus: (status: PaymentStatus) => void;

  setCardData: (data: Partial<CardPreviewData>) => void;

  addTransaction: (transaction: Transaction) => void;

  incrementAttempt: () => void;

  resetAttempts: () => void;

  generateTransactionId: () => string;

  resetPayment: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  // INITIAL STATE
  status: "idle",

  cardData: {
    cardNumber: "",
    cardHolder: "",
    expiry: "",
  },

  transactions: [],

  attemptCount: 1,

  transactionId: "",

  // SET STATUS
  setStatus: (status) => set({ status }),

  // CARD DATA
  setCardData: (data) =>
    set((state) => ({
      cardData: {
        ...state.cardData,
        ...data,
      },
    })),

  // ADD TRANSACTION
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  // RETRY
  incrementAttempt: () =>
    set((state) => ({
      attemptCount: state.attemptCount + 1,
    })),

  resetAttempts: () =>
    set({
      attemptCount: 1,
    }),

  // GENERATE ID
  generateTransactionId: () => {
    const id = crypto.randomUUID();

    set({
      transactionId: id,
    });

    return id;
  },

  // RESET
  resetPayment: () =>
    set({
      status: "idle",

      attemptCount: 1,
    }),
}));
