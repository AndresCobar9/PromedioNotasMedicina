import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent {
  constructor(public dialogRef: MatDialogRef<FormEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private builder: FormBuilder,private service: AuthService, private toastr: ToastrService) {
    this.info = this.cargarInfo(this.data.id);



  }
  
  
  
  NotaForm = this.builder.group({

    descripcion: this.builder.control('',Validators.required),
    NotaO: this.builder.control('',Validators.required),
    NotaT: this.builder.control('',Validators.required)
   
  })

  info : any;

cargarInfo(id:any){
  this.service.Nota(id).subscribe( res => {
    this.info = res;
    console.log(this.info);
    this.NotaForm.controls['descripcion'].setValue(this.info.Tarea);
    this.NotaForm.controls['NotaO'].setValue(this.info['Nota Obtenida']);
    this.NotaForm.controls['NotaT'].setValue(this.info['Nota Objetivo']);
  }
  )
}

edit() {
  this.info = {
    ...this.NotaForm.value,
    id: this.data.id}
  if (this.NotaForm.valid) {
    this.service.editNota(this.info).subscribe(
      res => {
        console.log(res);
        this.dialogRef.close();
        this.toastr.success('Nota Editada');
      },
      error => {
        console.error(error);
        this.toastr.error('Error al Editar');
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


