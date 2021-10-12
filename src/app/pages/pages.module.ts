import "hammerjs";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { DemoMaterialModule } from "../demo-material-module";
import { CdkTableModule } from "@angular/cdk/table";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

import { PagesRoutes } from "./pages.routing";
import { PanelComponent } from "./panel/panel.component";
import { AreaComponent } from "./panel/panel-components/area/area.component";
import { RolComponent } from "./panel/panel-components/rol/rol.component";
import { FormUserComponent } from "./panel/panel-components/form-user/form-user.component";
import { UsersComponent } from "./panel/panel-components/users/users.component";
import { InmuebleComponent } from './inmueble/inmueble.component';
import { ListInmueblesComponent } from './inmueble/list-inmuebles/list-inmuebles.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
  ],
  providers: [],
  entryComponents: [],
  declarations: [
    PanelComponent,
    AreaComponent,
    RolComponent,
    FormUserComponent,
    UsersComponent,
    InmuebleComponent,
    ListInmueblesComponent,
  ],
})
export class PagesModule {}
