import { z } from "zod";

export const paymentSchema = z.object({
  cardHolder: z
    .string()
    .min(3, "Name is required"),

  cardNumber: z
    .string()
    .min(19, "Invalid card number"),

  expiry: z
  .string()
  .regex(
    /^(0[1-9]|1[0-2])\/\d{2}$/,
    "Expiry must be in MM/YY format"
  )
  .refine((value) => {
    const [month, year] = value.split("/");

    const expiryMonth = Number(month);
    const expiryYear = Number(`20${year}`);

    const currentDate = new Date();

    const currentMonth =
      currentDate.getMonth() + 1;

    const currentYear =
      currentDate.getFullYear();

    // Reject past years
    if (expiryYear < currentYear) {
      return false;
    }

    // Reject past months in current year
    if (
      expiryYear === currentYear &&
      expiryMonth < currentMonth
    ) {
      return false;
    }

    // Optional future limit (10 years)
    if (expiryYear > currentYear + 10) {
      return false;
    }

    return true;
  }, "Invalid or expired card"),

  cvv: z
    .string()
    .min(3)
    .max(4),

  amount: z.number().positive(),
});

export type PaymentFormValues  =
  z.infer<typeof paymentSchema>;