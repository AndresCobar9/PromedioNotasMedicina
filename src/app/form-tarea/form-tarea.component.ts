import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-tarea',
  templateUrl: './form-tarea.component.html',
  styleUrls: ['./form-tarea.component.css']
})


export class FormTareaComponent {
  
  constructor(public dialogRef: MatDialogRef<FormTareaComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private builder: FormBuilder,private service: AuthService, private toastr: ToastrService) {
    
}

NotaForm = this.builder.group({

  descripcion: this.builder.control('',Validators.required),
  NotaO: this.builder.control('',Validators.required),
  NotaT: this.builder.control('',Validators.required)
 
})
info : any;
add() {
  
  this.info = {
    ...this.NotaForm.value,
    clase: this.data.option,
    usuario: sessionStorage.getItem('username'),
    fecha: new Date().toISOString().split('T')[0]
  };

  console.log(this.info);
  if (this.NotaForm.valid) {
    this.service.addNota(this.info).subscribe(
      res => {
        console.log(res);
        this.dialogRef.close();
        this.toastr.success('Nota agregada');
      },
      error => {
        console.error(error);
        this.toastr.error('Error al agregar la nota');
      }
    );
  } else {
    for (const field in this.NotaForm.controls) {
      const control = this.NotaForm.get(field);
      if (control && control.errors) {
        console.log(`Campo ${field} inválido: `, control.errors);
      }
    }
    this.toastr.warning('Rellena todos los datos', '');
  }
}


}
