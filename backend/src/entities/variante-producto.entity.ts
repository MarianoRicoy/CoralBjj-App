import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { ProductoEntity } from "./producto.entity.js";

@Entity({ name: "VarianteProducto" })
export class VarianteProductoEntity {
  @PrimaryColumn({ type: "text" })
  id!: string;

  @Column({ type: "text" })
  productoId!: string;

  @Column({ type: "text" })
  nombre!: string;

  @Column({ type: "text" })
  valor!: string;

  @Column({ type: "int" })
  stock!: number;

  @Column({ type: "int" })
  precio!: number;

  @CreateDateColumn({ type: "timestamptz" })
  creadoEn!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  actualizadoEn!: Date;

  @ManyToOne(() => ProductoEntity, (producto) => producto.variantes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productoId" })
  producto!: ProductoEntity;
}
