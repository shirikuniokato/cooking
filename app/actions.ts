"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";

const schema = z.object({
  name: z.string({
    invalid_type_error: "Invalid Name",
  }),
  type: z.string({
    invalid_type_error: "Invalid Type",
  }),
});

export default async function search(formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Mutate data
  return { status: "ok" };
}
