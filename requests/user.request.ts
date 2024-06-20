import { z } from "zod";

export default z.object({
  name: z.string().trim().min(2).max(18),
  email: z.string().email(),
});
