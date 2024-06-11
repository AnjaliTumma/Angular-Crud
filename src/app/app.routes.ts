import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'categories', component:CategoriesComponent},
    {path:'services',component:ServicesComponent},
    {path:'contact',component:ContactComponent},
    {path:'login',component:LoginComponent},
    {path:'admin', component:AdminComponent}
];
