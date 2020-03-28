import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class LoginModule { }
