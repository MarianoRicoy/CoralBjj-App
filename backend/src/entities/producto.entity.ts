import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { VarianteProductoEntity } from "./variante-producto.entity.js";

@Entity({ name: "Producto" })
export class ProductoEntity {
  @PrimaryColumn({ type: "text" })
  id!: string;

  @Column({ type: "text", unique: true })
  slug!: string;

  @Column({ type: "text" })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "int" })
  precioBase!: number;

  @Column({ type: "text", default: "ARS" })
  moneda!: string;

  @Column({ type: "int" })
  stockTotal!: number;

  @Column({ type: "text" })
  imagen!: string;

  @Column({ type: "text" })
  categoria!: string;

  @Column({ type: "boolean", default: false })
  destacado!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  creadoEn!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  actualizadoEn!: Date;

  @OneToMany(() => VarianteProductoEntity, (variante) => variante.producto, {
    cascade: true,
  })
  variantes!: VarianteProductoEntity[];
}
