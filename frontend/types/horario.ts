export interface BloqueHorario {
  id: string;
  dia: string;
  hora: string;
  clase: string;
  instructor: string;
  nivel: "Inicial" | "Intermedio" | "Avanzado" | "Mixto";
}
