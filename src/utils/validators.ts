import { z } from "zod";

export const paymentSchema = z.object({
  cardHolder: z.string().min(3, "Name is required"),

  cardNumber: z
    .string()
    .min(19, "Invalid card number"),

  expiry: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Invalid expiry"),

  cvv: z
    .string()
    .min(3)
    .max(4),

  amount: z.number().positive(),
});

export type PaymentFormData = z.infer<
  typeof paymentSchema
>;