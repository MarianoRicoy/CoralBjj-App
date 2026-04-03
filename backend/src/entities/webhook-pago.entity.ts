import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "WebhookPago" })
export class WebhookPagoEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  proveedor!: string;

  @Column({ type: "text", nullable: true })
  tipo!: string | null;

  @Column({ type: "jsonb" })
  payload!: Record<string, unknown>;

  @Column({ type: "boolean", default: false })
  procesado!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  creadoEn!: Date;
}
