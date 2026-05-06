"use client";

import { CardType } from "@/types/payment";

import { detectCardType } from "@/utils/cardUtils";

import { Wifi } from "lucide-react";

import { usePaymentStore } from "@/store/paymentStore";

export default function CardPreview() {
  const { cardData } = usePaymentStore();

  const { cardNumber, cardHolder, expiry } = cardData;

  const cardType: CardType = detectCardType(cardNumber);

  // FORMAT CARD NUMBER
  const formattedNumber = cardNumber || "**** **** **** ****";

  const formattedName = cardHolder || "YOUR NAME";

  const formattedExpiry = expiry || "MM/YY";

  // CARD STYLES
  const getCardStyles = () => {
    switch (cardType) {
      case "visa":
        return {
          gradient: "from-[#1e3a8a] via-[#1d4ed8] to-[#0f172a]",
          glow: "shadow-blue-500/30",
          logo: "VISA",
        };

      case "mastercard":
        return {
          gradient: "from-[#ea580c] via-[#dc2626] to-[#7f1d1d]",
          glow: "shadow-orange-500/30",
          logo: "MASTERCARD",
        };

      case "amex":
        return {
          gradient: "from-[#059669] via-[#0f766e] to-[#164e63]",
          glow: "shadow-emerald-500/30",
          logo: "AMEX",
        };

      default:
        return {
          gradient: "from-[#334155] via-[#1e293b] to-[#020617]",
          glow: "shadow-slate-500/20",
          logo: "CARD",
        };
    }
  };

  const styles = getCardStyles();

  return (
    <div className="w-full">
      <div
        className={`
          relative
          w-full
          overflow-hidden
          rounded-[24px]
          bg-gradient-to-br
          ${styles.gradient}
          p-4
          text-white
          shadow-2xl
          ${styles.glow}
          transition-all
          duration-500

          sm:rounded-[28px]
          sm:p-5

          md:rounded-[32px]
          md:p-6

          lg:rounded-[34px]
          lg:p-7
        `}
      >
        {/* TOP GLOW */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl sm:h-40 sm:w-40 md:h-48 md:w-48" />

        <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-white/10 blur-3xl sm:h-44 sm:w-44 md:h-52 md:w-52" />

        {/* CARD CONTENT */}
        <div className="relative z-10">
          {/* TOP */}
          <div className="flex items-start justify-between">
            {/* CHIP */}
            <div
              className="
                flex
                h-12
                w-16
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-yellow-200
                to-yellow-500
                shadow-lg

                sm:h-14
                sm:w-20

                md:h-16
                md:w-24
              "
            >
              <div
                className="
                  h-6
                  w-10
                  rounded-md
                  border
                  border-yellow-700/30
                  bg-yellow-100/40

                  sm:h-7
                  sm:w-12

                  md:h-9
                  md:w-14
                "
              />
            </div>

            {/* CONTACTLESS */}
            <Wifi className="h-6 w-6 rotate-90 text-white/80 sm:h-7 sm:w-7 md:h-8 md:w-8" />
          </div>

          {/* CARD NUMBER */}
          <div className="mt-8 sm:mt-10 md:mt-14 lg:mt-16">
            <p
              className="
                mb-3
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-white/70

                sm:text-xs
                sm:tracking-[0.3em]

                md:tracking-[0.35em]
              "
            >
              Card Number
            </p>

            <h2
              className="
                break-words
                text-lg
                font-light
                tracking-[0.15em]
                text-white

                sm:text-[22px]

                md:text-[26px]

                lg:text-[32px]
                lg:tracking-[0.25em]
              "
            >
              {formattedNumber}
            </h2>
          </div>

          {/* DETAILS */}
          <div className="mt-8 flex items-end justify-between gap-4 sm:mt-10 md:mt-14">
            {/* HOLDER */}
            <div className="min-w-0 flex-1">
              <p
                className="
                  mb-2
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-white/60

                  sm:text-xs
                  sm:tracking-[0.25em]

                  md:tracking-[0.3em]
                "
              >
                Cardholder
              </p>

              <h3
                className="
                  truncate
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.05em]

                  sm:text-base

                  md:text-lg
                  md:tracking-[0.08em]
                "
              >
                {formattedName}
              </h3>
            </div>

            {/* EXPIRY */}
            <div className="shrink-0 text-right">
              <p
                className="
                  mb-2
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-white/60

                  sm:text-xs
                  sm:tracking-[0.25em]

                  md:tracking-[0.3em]
                "
              >
                Expires
              </p>

              <h3
                className="
                  text-sm
                  font-medium
                  tracking-[0.08em]

                  sm:text-base

                  md:text-lg
                  md:tracking-[0.1em]
                "
              >
                {formattedExpiry}
              </h3>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-8 flex items-center justify-between gap-3 sm:mt-10 md:mt-12">
            <div
              className="
                rounded-full
                border
                border-white/10
                bg-white/10
                px-3
                py-1.5
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                backdrop-blur-md

                sm:px-4
                sm:py-2
                sm:text-xs
                sm:tracking-[0.2em]

                md:tracking-[0.25em]
              "
            >
              Secure Payment
            </div>

            <div
              className="
                text-lg
                font-black
                italic
                tracking-[0.05em]

                sm:text-2xl

                md:text-3xl
                md:tracking-[0.08em]
              "
            >
              {styles.logo}
            </div>
          </div>
        </div>

        {/* GLASS OVERLAY */}
        <div className="absolute inset-0 rounded-[24px] border border-white/10 bg-white/[0.02] sm:rounded-[28px] md:rounded-[32px] lg:rounded-[34px]" />
      </div>
    </div>
  );
}
