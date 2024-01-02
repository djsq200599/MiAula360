import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service'; 
import { Profesor, Curso, CursoID, ProfesorID } from 'src/app/model/profesor';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  profesor!: ProfesorID;
  formularioCurso: FormGroup;
  mostrandoFormulario = false;
  idProfesor!: number;
  private usedIds = new Set<number>(); // Agrega tus IDs existentes aquí
  private lastId = Math.max(...Array.from(this.usedIds), 0);

  constructor(private fb: FormBuilder, private apiService: ApiService,  private http: HttpClient) {
    this.formularioCurso = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.idProfesor = parseInt(localStorage.getItem('idProfesor') || '0');
    if (this.idProfesor > 0) {
      console.log(`Cargando información del profesor con ID: ${this.idProfesor}`);
      this.cargarProfesor();
    } else {
      console.error('ID de profesor no válido o usuario no autenticado');
    }
  }

  cargarProfesor() {
    this.apiService.obtenerProfesorPorId(this.idProfesor).subscribe(
      (profesor: ProfesorID) => {
        console.log('Información del profesor cargada', profesor);
        this.profesor = profesor;
        this.loadExistingIds();
      },
      (error: any) => {
        console.error('Error al cargar la información del profesor', error);
      }
    );
  }

  private loadExistingIds(): void {
    this.http.get<Array<CursoID>>(this.apiService['apiUrl'])
      .subscribe((curso: any[]) => {
        curso.forEach(curso => {
          if (curso.id !== undefined) {
            this.usedIds.add(curso.id);
            this.lastId = Math.max(this.lastId, curso.id);
          }
        });
      });
  }

  private generateId(): number {
    let newId = this.lastId + 1;
    while (this.usedIds.has(newId)) {
      newId++;
    }
    this.usedIds.add(newId);
    this.lastId = newId;
    return newId;
  }

  mostrarFormularioAgregarCurso() {
    console.log('Mostrando formulario para agregar curso');
    this.mostrandoFormulario = true;
  }

  agregarCurso() {
    if (this.formularioCurso.valid) {
      const nuevoCursoId = this.generateId();
  
      const nuevoCurso: Curso = {
        id: nuevoCursoId,
        nombre: this.formularioCurso.value.nombre,
        secciones: []
      };
  
      console.log('Formulario de curso válido, agregando curso:', nuevoCurso);
      this.profesor.cursos.push(nuevoCurso);
      this.apiService.actualizarProfesor(this.profesor).subscribe(
        () => {
          console.log('Curso agregado con éxito');
          this.mostrandoFormulario = false;
          this.formularioCurso.reset();
        },
        (error: any) => {
          console.error('Error al agregar el curso', error);
        }
      );
    } else {
      console.error('Formulario de curso no es válido');
    }
  }

  // ... Otros métodos que puedas necesitar ...
}