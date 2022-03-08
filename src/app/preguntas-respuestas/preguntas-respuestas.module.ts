import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntasRespuestasRoutingModule } from './preguntas-respuestas-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CuestionarioComponent } from './pages/cuestionario/cuestionario.component';
import { UserComponent } from './components/user/user.component';
import { SectionIngresoComponent } from './components/section-ingreso/section-ingreso.component';
import { SectionHistorialComponent } from './components/section-historial/section-historial.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    CuestionarioComponent,
    UserComponent,
    SectionIngresoComponent,
    SectionHistorialComponent
  ],
  imports: [
    CommonModule,
    PreguntasRespuestasRoutingModule,
    FormsModule
  ]
})
export class PreguntasRespuestasModule { }
