import { z } from "zod";

export default z.object({
  title: z.string().trim().min(8).max(128),
  value: z.string().trim().min(128).max(8192),
});
