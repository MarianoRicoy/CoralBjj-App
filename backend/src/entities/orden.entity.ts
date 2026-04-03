import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { EstadoOrden } from "./estado-orden.js";
import { ItemOrdenEntity } from "./item-orden.entity.js";

@Entity({ name: "Orden" })
export class OrdenEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  nombreCompleto!: string;

  @Column({ type: "text" })
  email!: string;

  @Column({ type: "text" })
  telefono!: string;

  @Column({ type: "text" })
  direccion!: string;

  @Column({ type: "text" })
  ciudad!: string;

  @Column({ type: "text" })
  provincia!: string;

  @Column({ type: "text" })
  codigoPostal!: string;

  @Column({ type: "enum", enum: EstadoOrden, default: EstadoOrden.PENDIENTE })
  estado!: EstadoOrden;

  @Column({ type: "int" })
  total!: number;

  @Column({ type: "text", default: "ARS" })
  moneda!: string;

  @Column({ type: "text", nullable: true })
  proveedorPago!: string | null;

  @Column({ type: "text", nullable: true, unique: true })
  referenciaExterna!: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  creadoEn!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  actualizadoEn!: Date;

  @OneToMany(() => ItemOrdenEntity, (item) => item.orden, { cascade: true })
  items!: ItemOrdenEntity[];
}
