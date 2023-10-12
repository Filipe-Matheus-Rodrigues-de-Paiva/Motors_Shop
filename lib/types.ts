import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().max(150),
    email: z.string().email().max(100),
    cpf: z.string().max(17),
    phone_number: z.string().max(15),
    date_birth: z
      .string()
      .max(10)
      .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/),
    description: z.string().max(400),
    address: z.object({
      cep: z.string().max(9),
      state: z.string().max(2),
      city: z.string().max(50),
      street: z.string().max(200),
      number: z.number(),
      complement: z.string().max(70),
    }),
    account_type: z.enum(["anunciante", "comprador"]),
    password: z
      .string()
      .max(150)
      .min(8, "A senha necessita de 8 digitos no mínimo")
      .regex(/(?=.*?[A-Z])/, "É preciso pelo menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É preciso pelo menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É preciso pelo menos um número")
      .regex(/(?=.*?[\W])/, "É preciso pelo menos um caractere especial"),
    confirm: z.string(),
  })
  .refine(({ password, confirm }) => confirm === password, {
    message: "As senhas não estão em conformidade",
    path: ["confirm"],
  });

export const updateUserSchema = z.object({
  name: z.string().max(150).optional().or(z.undefined()),
  email: z.string().email().max(100).optional().or(z.undefined()),
  cpf: z.string().max(17).optional().or(z.undefined()),
  phone_number: z.string().max(15).optional().or(z.undefined()),
  date_birth: z
    .string()
    .max(10)
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
    .optional()
    .or(z.undefined()),
  description: z.string().max(500).optional().or(z.undefined()),
  password: z
    .string()
    .max(150)
    .min(8, "A senha necessita de 8 dígitos no mínimo")
    .regex(/(?=.*?[A-Z])/, "É preciso pelo menos uma letra maiúscula")
    .regex(/(?=.*?[a-z])/, "É preciso pelo menos uma letra minúscula")
    .regex(/(?=.*?[0-9])/, "É preciso pelo menos um número")
    .regex(/(?=.*?[\W])/, "É preciso pelo menos um caractere especial")
    .optional()
    .or(z.undefined()),
});

export const updateAddressSchema = z.object({
  cep: z.string().max(9).optional().or(z.undefined()),
  state: z.string().max(2).optional().or(z.undefined()),
  city: z.string().max(50).optional().or(z.undefined()),
  street: z.string().max(200).optional().or(z.undefined()),
  number: z.number().positive().optional().or(z.undefined()),
  complement: z.string().max(70).optional().or(z.undefined()),
});

export const createAnnouncementSchema = z.object({
  brand: z.string().max(50),
  model: z.string().max(100),
  year: z.number().positive(),
  fueling: z.enum(["gasolina", "etanol"]),
  kilometers: z.number().nonnegative(),
  color: z.string().max(20),
  fipe_price: z.string().max(50),
  description: z.string(),
  coverImage: z.string(),
  images: z.array(z.object({ imageUrl: z.string() })).or(z.undefined()),
});

export const updateAnnouncementSchema = z.object({
  brand: z.string().max(50).optional().or(z.undefined()),
  model: z.string().max(100).optional().or(z.undefined()),
  year: z.number().positive().optional().or(z.undefined()),
  fueling: z.enum(["gasolina", "etanol"]).optional().or(z.undefined()),
  kilometers: z.number().nonnegative().optional().or(z.undefined()),
  color: z.string().max(20).optional().or(z.undefined()),
  fipe_price: z.string().max(50).optional().or(z.undefined()),
  description: z.string().optional().or(z.undefined()),
  coverImage: z.string().optional().or(z.undefined()),
  images: z
    .array(z.object({ imageUrl: z.string() }))
    .optional()
    .or(z.undefined()),
});

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://ecommerce-api-04zs.onrender.com"
    : "http://localhost:3000";
