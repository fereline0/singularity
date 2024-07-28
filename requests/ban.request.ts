import { z } from "zod";

const now = new Date();
const minDate = new Date(now.getTime() + 5 * 60 * 1000);
const maxDate = new Date(now.getTime() + 30 * 365 * 24 * 60 * 60 * 1000);

export default z.object({
  reason: z.string().trim().max(512),
  expires: z.date().min(minDate).max(maxDate),
});
