import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';

import { ImgComponent } from '.././website/components/img/img.component';
import { ProductComponent } from '.././website/components/product/product.component';
import { ProductsComponent } from '.././website/components/products/products.component';
import { NavComponent } from '.././website/components/nav/nav.component';
import { ReversePipe } from '.././website/pipes/reverse.pipe';
import { TimeAgoPipe } from '.././website/pipes/time-ago.pipe';
import { HomeComponent } from '.././website/pages/home/home.component';
import { CategoryComponent } from '.././website/pages/category/category.component';
import { MycartComponent } from '.././website/pages/mycart/mycart.component';
import { LoginComponent } from '.././website/pages/login/login.component';
import { RegisterComponent } from '.././website/pages/register/register.component';
import { RecoveryComponent } from '.././website/pages/recovery/recovery.component';
import { ProfileComponent } from '.././website/pages/profile/profile.component';
import { ProductDetailComponent } from '.././website/pages/product-detail/product-detail.component';
import { LayoutComponent } from '.././website/components/layout/layout.component';
import { HighlightDirective } from '../website/directives/highlight.directive';
import { SwiperModule } from 'swiper/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    HomeComponent,
    CategoryComponent,
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
    MatProgressSpinnerModule,
  ],
})
export class WebsiteModule {}
