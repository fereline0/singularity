import { z } from "zod";

export default z.object({
  value: z.string().trim().min(2).max(1024),
});
