import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

import { NavComponent } from '.././website/components/nav/nav.component';
import { HomeComponent } from '.././website/pages/home/home.component';
import { MycartComponent } from '.././website/pages/mycart/mycart.component';
import { LoginComponent } from '.././website/pages/login/login.component';
import { RegisterComponent } from '.././website/pages/register/register.component';
import { RecoveryComponent } from '.././website/pages/recovery/recovery.component';
import { ProfileComponent } from '.././website/pages/profile/profile.component';
import { ProductDetailComponent } from '.././website/pages/product-detail/product-detail.component';
import { LayoutComponent } from '.././website/components/layout/layout.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
})
export class WebsiteModule {}
