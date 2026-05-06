"use client";

import { useState } from "react";

import { PaymentFormValues } from "@/utils/validators";

import { usePaymentStore } from "@/store/paymentStore";

interface ProcessPaymentParams {
  data: PaymentFormValues;

  cardType: string;
}

export function usePaymentProcessor() {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    setStatus,
    addTransaction,
    generateTransactionId,
    incrementAttempt,
    resetAttempts,
  } = usePaymentStore();

  const processPayment = async ({ data, cardType }: ProcessPaymentParams) => {
    try {
      setSuccessMessage("");

      setStatus("processing");

      generateTransactionId();

      await new Promise((resolve) => setTimeout(resolve, 2500));

      const isSuccess = Math.random() > 0.2;

      const transaction = {
        id: crypto.randomUUID(),

        transactionId: crypto.randomUUID(),

        cardHolder: data.cardHolder,

        amount: data.amount,

        currency: data.currency,

        cardType,

        status: isSuccess ? "success" : "failed",

        createdAt: new Date().toISOString(),
      };

      addTransaction(transaction);

      if (isSuccess) {
        setStatus("success");

        resetAttempts();

        setSuccessMessage("Payment completed successfully.");

        setTimeout(() => {
          setStatus("idle");

          setSuccessMessage("");
        }, 3500);

        return {
          success: true,
        };
      }

      incrementAttempt();

      setStatus("failed");

      setTimeout(() => {
        setStatus("idle");
      }, 3000);

      return {
        success: false,
      };
    } catch (error) {
      console.log(error);

      setStatus("failed");

      return {
        success: false,
      };
    }
  };

  return {
    processPayment,
    successMessage,
  };
}
