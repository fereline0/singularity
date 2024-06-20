import { z } from "zod";

export default z.object({
  email: z.string().email(),
  password: z.string().trim().min(6).max(28),
});
