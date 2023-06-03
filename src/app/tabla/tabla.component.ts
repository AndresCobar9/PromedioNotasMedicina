import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {
  constructor(private dialog:MatDialog){  
    
  }
  dataSource: any
  
  loadNotas(){

  }

  displayedColumns: string[] = ['Tarea','Fecha','Nota','Editar']

}
