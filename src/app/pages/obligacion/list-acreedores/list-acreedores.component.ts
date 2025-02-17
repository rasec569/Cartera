import { AfterViewInit, ViewChild, Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletevalidacionComponent } from 'src/app/shared/deletevalidacion/deletevalidacion.component';
import { MatDialog } from '@angular/material/dialog';

import{AcreedorService}from 'src/app/services/acreedor.service';
import { acreedor } from 'src/app/Models/acreedor.model';
import { FormAcreedorComponent } from '../form-acreedores/form-acreedor.component';

@Component({
  selector: 'app-list-acreedores',
  templateUrl: './list-acreedores.component.html',
  styleUrls: ['./list-acreedores.component.css']
})
export class ListAcreedoresComponent implements OnInit {
  public total:any;
  dataSource = new MatTableDataSource<acreedor>();
  public displayedColumns: string[] = [
    "nombres",
    "apellidos",
    "descripcion",
    "deuda",
    "Acciones"
  ];
  readonly width:string='750px';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private _snackBar: MatSnackBar,
              private changeDetectorRefs: ChangeDetectorRef,
              private AcreedorS:AcreedorService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.QueryAcreedores();
  }
  OpenAdd(){
    const dialogoRef = this.dialog.open(FormAcreedorComponent, {
      width: this.width,
      data: {acreedorid:""}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryAcreedores();
    });
  }
  OpenEdit(id: any){
    const dialogoRef = this.dialog.open(FormAcreedorComponent, {
      width: this.width,
      data: {acreedorid:id}
    });
    dialogoRef.afterClosed().subscribe(res=>{
      this.QueryAcreedores();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    var filteredData = this.dataSource.filteredData;
    this.total=filteredData.reduce((summ, v) => summ += parseInt(v.deuda), 0);
  }
  QueryAcreedores() {
    try {
      this.AcreedorS.getAcreedores().subscribe(
        (res: acreedor[]) => {
          console.log(res);
          if (res[0].TIPO == undefined && res[0].MENSAJE == undefined) {
            this.dataSource.data = res;
            this.changeDetectorRefs.detectChanges();
            this.total=res.reduce((summ, v) => summ += parseInt(v.deuda), 0);
          } else {
            this.notificacion(res[0].MENSAJE!);
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
  RemoveAcreedor(Acreedor: acreedor) {
    const dialogoRef = this.dialog.open(DeletevalidacionComponent, {
      width: "300px",
    });
    dialogoRef.afterClosed().subscribe((res) => {
      if (res) {
        try {
          console.log('esto llega al metodo',Acreedor)
          this.AcreedorS.deleteAcreedor(Acreedor).subscribe(
            (res: acreedor[]) => {
              if (res[0].TIPO == "3") {
                this.notificacion(res[0].MENSAJE!);
                this.QueryAcreedores();
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
  notificacion(Mensaje: string) {
    this._snackBar.open(Mensaje, "", {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      /* panelClass: ['mat-toolbar', 'mat-primary'], */
    });
  }

}
