import { AfterViewInit, ViewChild, Component, OnInit,ChangeDetectorRef, Input  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

import { InmuebleService } from 'src/app/services/inmueble.service';
import { inmueble } from 'src/app/Models/inmueble.model';
import { DetalleInmuebleComponent } from '../../inmueble/detalle-inmueble/detalle-inmueble.component';
import { FormInmuebleComponent } from '../../inmueble/form-inmueble/form-inmueble.component';


@Component({
  selector: 'app-inmueble-proyecto',
  templateUrl: './inmueble-proyecto.component.html',
  styleUrls: ['./inmueble-proyecto.component.css']
})
export class InmuebleProyectoComponent implements OnInit, AfterViewInit {
  @Input() proyectoid!:string;
  dataSource = new MatTableDataSource<inmueble>();
  public displayedColumns: string[] = [
    "Manzana",
    "Casa",
    "etapa",
    "Valor_Final",
    "estado",
    "Acciones",
  ];
  readonly width:string='900px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
    private InmuebleS: InmuebleService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.QueryInmuebles(this.proyectoid);
  }
  ngAfterViewInit() {


  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  OpenDetalle(id: any){
    const dialogoRef = this.dialog.open(DetalleInmuebleComponent , { width: this.width,
      data: id, panelClass: 'my-dialog',});
      dialogoRef.afterClosed().subscribe(res=>{
        this.QueryInmuebles(this.proyectoid);
      });
  }
  OpenAdd(){
    const dialogoRef = this.dialog.open(FormInmuebleComponent, {
      width: this.width,
      data: {inmuebleid:""}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryInmuebles(this.proyectoid);
    });
  }
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormInmuebleComponent, {
      width: this.width,
      data: {inmuebleid:id }
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryInmuebles(this.proyectoid);
    });
  }
  RemoveInmueble(Inmueble: inmueble) {
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          this.InmuebleS.deleteInmueble(Inmueble).subscribe(
            (res: inmueble[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryInmuebles(this.proyectoid);
              } else {
                this.notificacion(res[0].MENSAJE!);
              }
            },
            (err) => {
              this.notificacion(
                "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
              );
            }
          );
        } catch (notificacion) {
          this.notificacion(
            "Error de aplicación, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"
          );
        }
      }
    });
  }
  QueryInmuebles(proyectoid:any) {
    try {
      this.InmuebleS.getInmuebleProyecto(proyectoid).subscribe(
        (res: inmueble[]) => {
          if (res[0] != undefined){
            if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
              this.dataSource.data = res;
              this.changeDetectorRefs.detectChanges();
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            } else {
              this.notificacion(res[0].MENSAJE!);
            }
          }
        },
        (err) => {
          this.notificacion(
            "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde!"+err
          );
        }
      );
    } catch (error) {
      this.notificacion(
        "Error de conexión, trabajamos para habilitar el servicio en el menor tiempo posible, intentelo más tarde! "+error
      );
    }
  }
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }

}
