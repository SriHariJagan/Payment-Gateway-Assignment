export const getCardTypeStyles = (
  cardType: string
) => {
  switch (cardType) {
    case "visa":
      return {
        badge:
          "bg-blue-100 text-blue-700",
      };

    case "mastercard":
      return {
        badge:
          "bg-orange-100 text-orange-700",
      };

    case "amex":
      return {
        badge:
          "bg-emerald-100 text-emerald-700",
      };

    default:
      return {
        badge:
          "bg-slate-200 text-slate-600",
      };
  }
};

export const getPaymentStatusConfig = (
  status: string,
  successMessage: string,
  attemptCount: number
) => {
  if (status === "success") {
    return {
      heading:
        "Payment Successful",

      message:
        successMessage,

      wrapper:
        "border-emerald-200 bg-emerald-50",

      icon: "text-emerald-600",

      title:
        "text-emerald-700",

      description:
        "text-emerald-600",
    };
  }

  if (status === "failed") {
    return {
      heading:
        "Payment Failed",

      message: `Please try again. Attempt ${attemptCount}`,

      wrapper:
        "border-red-200 bg-red-50",

      icon: "text-red-600",

      title: "text-red-700",

      description:
        "text-red-600",
    };
  }

  return null;
};

export const formatCurrency = (
  currency: string,
  amount: number = 0
) => {
  const safeAmount = Number(amount) || 0;

  return `${currency} ${safeAmount.toLocaleString("en-IN")}`;
};