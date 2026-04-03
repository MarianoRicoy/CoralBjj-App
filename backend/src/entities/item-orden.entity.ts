import { randomUUID } from "node:crypto";

import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { OrdenEntity } from "./orden.entity.js";

@Entity({ name: "ItemOrden" })
export class ItemOrdenEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  ordenId!: string;

  @Column({ type: "text" })
  productoId!: string;

  @Column({ type: "text" })
  varianteId!: string;

  @Column({ type: "text" })
  nombreProducto!: string;

  @Column({ type: "text" })
  detalleVariante!: string;

  @Column({ type: "int" })
  precioUnitario!: number;

  @Column({ type: "int" })
  cantidad!: number;

  @Column({ type: "int" })
  subtotal!: number;

  @CreateDateColumn({ type: "timestamptz" })
  creadoEn!: Date;

  @ManyToOne(() => OrdenEntity, (orden: OrdenEntity) => orden.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ordenId" })
  orden!: OrdenEntity;

  @BeforeInsert()
  ensureId() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
