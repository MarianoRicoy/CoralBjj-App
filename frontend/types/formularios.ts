export interface ContactoPayload {
  nombre: string;
  email: string;
  mensaje: string;
}

export interface CheckoutPayload {
  nombreCompleto: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
}
