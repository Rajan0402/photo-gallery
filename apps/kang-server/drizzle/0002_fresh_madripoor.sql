ALTER TABLE "photo_gallery_photos" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "photo_gallery_users" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "photo_gallery_users" ALTER COLUMN "hashedRefreshToken" SET NOT NULL;