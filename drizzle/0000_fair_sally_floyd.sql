DO $$ BEGIN
 CREATE TYPE "transaction_type" AS ENUM('c', 'd');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"limite" integer NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saldos" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" integer,
	"saldo" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transacoes" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" integer,
	"valor" integer NOT NULL,
	"tipo" "transaction_type",
	"descricao" varchar(50) NOT NULL,
	"realizada_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "client_id_idx" ON "saldos" ("client_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saldos" ADD CONSTRAINT "saldos_client_id_clientes_id_fk" FOREIGN KEY ("client_id") REFERENCES "clientes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_client_id_clientes_id_fk" FOREIGN KEY ("client_id") REFERENCES "clientes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
