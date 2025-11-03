import { Routes } from '@angular/router';
import { register } from 'node:module';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { LoginComponent } from './components/login/login.component';
import { UserOrderHistoryComponent } from './components/user-order-history/user-order-history.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageOrdersDashComponent } from './components/manage-orders-dash/manage-orders-dash.component';
import { ManageCakesComponent } from './components/manage-cakes/manage-cakes.component';
import { AddCakesComponent } from './components/add-cakes/add-cakes.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactRetComponent } from './components/contact-ret/contact-ret.component';
import { TotalOrdersComponent } from './components/total-orders/total-orders.component';

export const routes: Routes = [

     { path: '', component: HomeComponent },
     { path: 'home', component: HomeComponent },

   //  { path: 'pages', component: PagesComponent },
//   { path: 'portfolio', component: PortfolioComponent },
     { path: 'shop', component: ShopComponent },
//   { path: 'blog', component: BlogComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'login', component: LoginComponent },
     { path: 'user-order-history', component: UserOrderHistoryComponent },
     { path: 'admin-login', component: AdminLoginComponent },
     { path: 'manage-orders', component: ManageOrdersComponent },
     { path: 'admin-dashboard', component: AdminDashboardComponent },
     { path: 'manage-orders-dash', component: ManageOrdersDashComponent },
     { path: 'manage-cakes', component: ManageCakesComponent },
     { path: 'add-cakes', component: AddCakesComponent },
     { path: 'feedback', component: FeedbackComponent },
     { path: 'contact', component: ContactComponent },
     { path: 'contact-ret', component: ContactRetComponent },
     { path: 'total-orders', component: TotalOrdersComponent },

];
