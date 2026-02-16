import { generateUploadButton } from "@uploadthing/react";
// Pastikan path ini mengarah ke core.ts yang tadi kita perbaiki
// Kalau core.ts ada di app/api/uploadthing/core.ts, maka importnya seperti ini:
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();