CREATE TABLE "clarity_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"num_of_days" integer NOT NULL,
	"dimension1" text,
	"dimension2" text,
	"dimension3" text,
	"response_data" json NOT NULL,
	"request_date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "todo_list" CASCADE;