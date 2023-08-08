import { MatDialog } from '@angular/material/dialog';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormTareaComponent } from '../form-tarea/form-tarea.component';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { FormEditComponent } from '../form-edit/form-edit.component';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent{

  options = [
    { title: 'Farmacología', color: '#FF5964' },
    { title: 'Microbiologia', color: '#983628' },
    { title: 'Patología', color: '#20A4F3' },
    { title: 'Semiología 2', color: '#3A435E' },
    { title: 'Salud Pública 3', color: '#941C2F' },
    { title: 'Métodos de investigación', color: '#35A7FF' }
  ];

  selectedOption: number = 0;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true
  };

  onSlideChange(event: any) {
    this.selectedOption = event.currentSlide;
    this.loadNotas(this.options[this.selectedOption].title);
  }



  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.dataSource.length; i++) {
      total += this.dataSource[i].Nota;
    }
    total=100;
    return total;
  }
  

  constructor(private dialog:MatDialog, private service: AuthService, private toastr: ToastrService) {  
  this.loadNotas(this.options[this.selectedOption].title);
  }
  dataSource: any

  Promedio(){
    this.service.Promedio(sessionStorage.getItem('username'),this.options[this.selectedOption].title).subscribe(res => {
      this.toastr.success('Promedio: '+res);
    })
  }
  loadNotas(option:any){
    
    this.service.getNotas(sessionStorage.getItem('username'), option).subscribe(res => {
      console.log(res);
      this.dataSource = res;
      if (this.dataSource.error == "No hay notas registradas") {
        this.dataSource = [{ Tarea: 'No hay notas', Fecha: '', Nota: '' }];
      }
      console.log(this.dataSource);

    })
  }
  logout() {
    this.service.logout();
    this.toastr.success('Sesión cerrada');
  }
  Add(){
    this.dialog.open(FormTareaComponent, {
      data: {title: 'Agregar Nota', option: this.options[this.selectedOption].title}
    }).afterClosed().subscribe(res => {
      this.loadNotas(this.options[this.selectedOption].title);
    });
  }

  Delete(id:any){
    
    this.service.deleteNota(id).subscribe(res => {
      console.log(res);
      this.toastr.success('Nota eliminada');
      this.loadNotas(this.options[this.selectedOption].title);
    })

  }
  
  edit(id:any){
    console.log(id);
    this.dialog.open(FormEditComponent, { 
      data: {title: 'Editar Nota', id: id, option: this.options[this.selectedOption].title}
      });
  }
  displayedColumns: string[] = ['Tarea','Fecha','Nota','Editar','Borrar']

}
