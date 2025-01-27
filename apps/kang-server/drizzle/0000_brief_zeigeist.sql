CREATE TABLE "photo_gallery_photos" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"url" varchar(1024) NOT NULL,
	"userId" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp,
	CONSTRAINT "photo_gallery_photos_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "photo_gallery_users" (
	"id" integer PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"hashedRefreshToken" varchar,
	CONSTRAINT "photo_gallery_users_id_unique" UNIQUE("id"),
	CONSTRAINT "photo_gallery_users_email_unique" UNIQUE("email"),
	CONSTRAINT "photo_gallery_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "photo_gallery_photos" ADD CONSTRAINT "photo_gallery_photos_userId_photo_gallery_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."photo_gallery_users"("id") ON DELETE cascade ON UPDATE no action;