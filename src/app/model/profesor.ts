export interface Clase {
    titulo: string;
    objetivo?: string; // Objetivo opcional
    actividad?: string; // Actividad opcional
    asistencia: 'presente' | 'ausente' | 'tarde' | 'retirado';
    notas?: number[];
    fecha: string; // Fecha de registro de los datos
    observacion?: string; // Observación opcional
}

export interface ClaseID extends Clase {
    id: number;
}

export interface ClasePartial extends Partial<Clase> {

}

export interface Asignatura {
    id: number;
    nombre: string;
    clases: Clase[];
}

export interface AsignaturaID extends Asignatura {
    id: number;
}

export interface AsignaturaPartial extends Partial<Asignatura> {

}

export interface Alumno {
    nombre: string;
    asignaturas: Asignatura[];
}

export interface AlumnoID extends Alumno {
    id: number;
}

export interface AlumnoPartial extends Partial<Alumno> {

}

export interface Seccion {
    nombre: 'A' | 'B';
    alumnos: Alumno[];
}

export interface SeccionID extends Seccion {
    id: number;
}

export interface SeccionPartial extends Partial<Seccion> {

}

export interface Curso {
    id: number;
    nombre: string; // De "1° básico" a "4° medio"
    secciones: Seccion[]; // Siempre son 2 secciones
}

export interface CursoID extends Curso {
    id: number;
}

export interface CursoPartial extends Partial<Curso> {

}

export interface Profesor {
    nombre: string;
    apellido: string; 
    usuario: string;
    contraseña: string;
    cursos: Curso[];
}

export interface ProfesorID extends Profesor {
    id: number;
}

export interface ProfesorPartial extends Partial<Profesor> {

}
