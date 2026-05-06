"use client";

import { useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreditCard,
  LockKeyhole,
  Wallet,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {paymentSchema,type PaymentFormValues} from "@/utils/validators";

import { formatCardNumber, formatExpiry } from "@/utils/formatters";

import { detectCardType } from "@/utils/cardUtils";

import { usePaymentStore } from "@/store/paymentStore";

import { usePaymentProcessor } from "@/hooks/usePaymentProcessor";

import {
  getCardTypeStyles,
  getPaymentStatusConfig,
  formatCurrency,
} from "@/hooks/paymentHelpers";

export default function PaymentForm() {
  const { setCardData, status, transactionId, attemptCount } =
    usePaymentStore();

  const { processPayment, successMessage } = usePaymentProcessor();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),

    mode: "onChange",

    defaultValues: {
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      amount: 0,
      currency: "INR",
    },
  });

  // =========================================
  // WATCHED VALUES
  // =========================================

  const watchedCardNumber = watch("cardNumber");

  const watchedCardHolder = watch("cardHolder");

  const watchedExpiry = watch("expiry");

  const watchedAmount = watch("amount");

  const watchedCurrency = watch("currency");

  // =========================================
  // CARD TYPE
  // =========================================

  const cardType = useMemo(() => {
    return detectCardType(watchedCardNumber || "");
  }, [watchedCardNumber]);

  const cardStyles = getCardTypeStyles(cardType);

  // =========================================
  // UPDATE CARD PREVIEW STORE
  // =========================================

  useEffect(() => {
    setCardData({
      cardNumber: watchedCardNumber || "",

      cardHolder: watchedCardHolder || "",

      expiry: watchedExpiry || "",
    });
  }, [watchedCardNumber, watchedCardHolder, watchedExpiry, setCardData]);

  // =========================================
  // SUBMIT
  // =========================================

  const onSubmit = async (data: PaymentFormValues) => {
    const result = await processPayment({
      data,
      cardType,
    });

    if (result.success) {
      reset();

      setCardData({
        cardHolder: "",
        cardNumber: "",
        expiry: "",
      });
    }
  };

  const statusConfig = getPaymentStatusConfig(
    status,
    successMessage,
    attemptCount,
  );

  return (
    <div
      className="
        w-full
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-xl
        lg:p-8
      "
    >
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-indigo-100
            "
          >
            <Wallet className="h-7 w-7 text-indigo-600" />
          </div>

          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              Secure Payment
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Complete your payment securely
            </p>
          </div>
        </div>

        <div
          className="
            hidden
            items-center
            gap-2
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50
            px-4
            py-2
            sm:flex
          "
        >
          <ShieldCheck className="h-5 w-5 text-emerald-600" />

          <span
            className="
              text-sm
              font-semibold
              text-emerald-700
            "
          >
            SSL Secure
          </span>
        </div>
      </div>

      {/* ========================================= */}
      {/* STATUS ALERT */}
      {/* ========================================= */}

      {status !== "idle" && status !== "processing" && statusConfig && (
        <div
          className={`
              mb-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              p-4

              ${statusConfig.wrapper}
            `}
        >
          {status === "success" ? (
            <CheckCircle2
              className={`
                  mt-0.5
                  h-6
                  w-6
                  ${statusConfig.icon}
                `}
            />
          ) : (
            <XCircle
              className={`
                  mt-0.5
                  h-6
                  w-6
                  ${statusConfig.icon}
                `}
            />
          )}

          <div>
            <p
              className={`
                  font-semibold
                  ${statusConfig.title}
                `}
            >
              {statusConfig.heading}
            </p>

            <p
              className={`
                  mt-1
                  text-sm
                  ${statusConfig.description}
                `}
            >
              {statusConfig.message}
            </p>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* FORM */}
      {/* ========================================= */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* CARD HOLDER */}

        <div>
          <label
            htmlFor="cardHolder"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Cardholder Name
          </label>

          <input
            id="cardHolder"
            type="text"
            placeholder="John Doe"
            {...register("cardHolder")}
            className={`
              w-full
              rounded-2xl
              border
              bg-slate-50
              px-4
              py-3.5
              text-sm
              text-slate-900
              outline-none
              transition-all
              duration-200

              ${
                errors.cardHolder
                  ? "border-red-500 focus:ring-4 focus:ring-red-100"
                  : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              }
            `}
          />

          {errors.cardHolder && (
            <p className="mt-2 text-sm text-red-500">
              {errors.cardHolder.message}
            </p>
          )}
        </div>

        {/* CARD NUMBER */}

        <div>
          <label
            htmlFor="cardNumber"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Card Number
          </label>

          <div className="relative">
            <input
              id="cardNumber"
              type="text"
              maxLength={19}
              placeholder="4242 4242 4242 4242"
              {...register("cardNumber")}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);

                setValue("cardNumber", formatted, {
                  shouldValidate: true,
                });
              }}
              className={`
                w-full
                rounded-2xl
                border
                bg-slate-50
                px-4
                py-3.5
                pr-28
                text-sm
                text-slate-900
                outline-none
                transition-all
                duration-200

                ${
                  errors.cardNumber
                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                }
              `}
            />

            <div
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
              "
            >
              <div
                className={`
                  rounded-xl
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide

                  ${cardStyles.badge}
                `}
              >
                {cardType}
              </div>
            </div>
          </div>

          {errors.cardNumber && (
            <p className="mt-2 text-sm text-red-500">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        {/* EXPIRY + CVV */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
          "
        >
          {/* EXPIRY */}

          <div>
            <label
              htmlFor="expiry"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Expiry Date
            </label>

            <div className="relative">
              <input
                id="expiry"
                type="text"
                maxLength={5}
                placeholder="MM/YY"
                {...register("expiry")}
                onChange={(e) => {
                  const formatted = formatExpiry(e.target.value);

                  setValue("expiry", formatted, {
                    shouldValidate: true,
                  });
                }}
                className={`
                  w-full
                  rounded-2xl
                  border
                  bg-slate-50
                  px-4
                  py-3.5
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  duration-200

                  ${
                    errors.expiry
                      ? "border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  }
                `}
              />

              <CreditCard
                className="
                  absolute
                  right-4
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>

            {errors.expiry && (
              <p className="mt-2 text-sm text-red-500">
                {errors.expiry.message}
              </p>
            )}
          </div>

          {/* CVV */}

          <div>
            <label
              htmlFor="cvv"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              CVV
            </label>

            <div className="relative">
              <input
                id="cvv"
                type="password"
                maxLength={4}
                placeholder="•••"
                {...register("cvv")}
                className={`
                  w-full
                  rounded-2xl
                  border
                  bg-slate-50
                  px-4
                  py-3.5
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  duration-200

                  ${
                    errors.cvv
                      ? "border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  }
                `}
              />

              <LockKeyhole
                className="
                  absolute
                  right-4
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>

            {errors.cvv && (
              <p className="mt-2 text-sm text-red-500">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        {/* AMOUNT */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-[1fr_180px]
          "
        >
          <div>
            <label
              htmlFor="amount"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Amount
            </label>

            <input
              id="amount"
              type="number"
              min={1}
              placeholder="1000"
              {...register("amount", {
                valueAsNumber: true,
              })}
              onChange={(e) => {
                const value = e.target.value;

                setValue("amount", value === "" ? 0 : Number(value), {
                  shouldValidate: true,
                });
              }}
              onFocus={(e) => {
                if (e.target.value === "0") {
                  e.target.value = "";
                  setValue("amount", 0);
                }
              }}
              className={`
                w-full
                rounded-2xl
                border
                bg-slate-50
                px-4
                py-3.5
                text-sm
                text-slate-900
                outline-none
                transition-all
                duration-200

                ${
                  errors.amount
                    ? "border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                }
              `}
            />

            {errors.amount && (
              <p className="mt-2 text-sm text-red-500">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="currency"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Currency
            </label>

            <select
              id="currency"
              {...register("currency")}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3.5
                text-sm
                text-slate-900
                outline-none
                transition-all
                duration-200
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
              "
            >
              <option value="INR">INR ₹</option>

              <option value="USD">USD $</option>

              <option value="EUR">EUR €</option>
            </select>
          </div>
        </div>

        {/* PAYMENT SUMMARY */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            p-5
          "
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-500">Amount</span>

            <span
              className="
                text-lg
                font-bold
                text-slate-900
              "
            >
              {formatCurrency(watchedCurrency, watchedAmount)}
            </span>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-500">Transaction Fee</span>

            <span
              className="
                font-medium
                text-emerald-600
              "
            >
              Free
            </span>
          </div>

          <div className="h-px bg-slate-200" />

          <div className="mt-3 flex items-center justify-between">
            <span
              className="
                font-semibold
                text-slate-700
              "
            >
              Total
            </span>

            <span
              className="
                text-xl
                font-bold
                text-indigo-600
              "
            >
              {formatCurrency(watchedCurrency, watchedAmount)}
            </span>
          </div>
        </div>

        {/* SECURITY */}

        <div
          className="
            rounded-2xl
            border
            border-emerald-100
            bg-emerald-50
            p-4
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-emerald-700
            "
          >
            Your payment details are encrypted and securely processed.
          </p>

          {transactionId && (
            <p
              className="
                mt-2
                text-xs
                text-emerald-600
              "
            >
              Transaction ID: {transactionId.slice(0, 18)}
              ...
            </p>
          )}
        </div>

        {/* SUBMIT */}

        <button
          type="submit"
          disabled={!isValid || status === "processing"}
          className={`
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            py-4
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300

            ${
              isValid && status !== "processing"
                ? "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl"
                : "cursor-not-allowed bg-slate-300"
            }
          `}
        >
          {status === "processing" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <LockKeyhole className="h-5 w-5" />
              Pay Securely
            </>
          )}
        </button>
      </form>
    </div>
  );
}
