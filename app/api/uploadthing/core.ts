import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  // Jalur 1: Untuk Berita (Sudah ada)
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload Berita Sukses:", file.url);
      return { uploadedBy: "admin" };
    }),

  // --- TAMBAHKAN JALUR INI (Jalur 2: Untuk Poster) ---
  posterImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } }) // Bisa set size lebih besar
    .onUploadComplete(async ({ file }) => {
      console.log("Upload Poster Sukses:", file.url);
      return { uploadedBy: "admin" };
    }),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;