import { create } from "zustand";
import { PaymentStatus, Transaction } from "@/types/payment";

interface PaymentStore {
  status: PaymentStatus;
  transactions: Transaction[];

  setStatus: (status: PaymentStatus) => void;

  addTransaction: (transaction: Transaction) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  status: "idle",

  transactions: [],

  setStatus: (status) => set({ status }),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
}));