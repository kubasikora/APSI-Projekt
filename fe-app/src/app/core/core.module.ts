import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent, BasicLayoutComponent],
  imports: [CommonModule],
  exports: [BasicLayoutComponent]
})
export class CoreModule {}
