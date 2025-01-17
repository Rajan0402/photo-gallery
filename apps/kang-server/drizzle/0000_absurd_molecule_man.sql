CREATE TABLE "photo_gallery_photo" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"url" varchar(1024) NOT NULL,
	"userId" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "photo_gallery_user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "photo_gallery_user_id_unique" UNIQUE("id"),
	CONSTRAINT "photo_gallery_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "photo_gallery_photo" ADD CONSTRAINT "photo_gallery_photo_userId_photo_gallery_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."photo_gallery_user"("id") ON DELETE cascade ON UPDATE no action;