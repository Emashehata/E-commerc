import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { WhishlistComponent } from './pages/whishlist/whishlist.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';

export const routes: Routes = [
  // {
  //   path:'',
  //   redirectTo:'home',
  //   pathMatch:'full'

  // },
  {
    path:'home',
    component:HomeComponent,
    title:'home'

  },
  {
    path:'products',
    component:ProductsComponent,
    title:'products'
  },
  {
    path:'categories',
    component:CategoriesComponent,
    title:'categories'
  },
  {
    path:'brands',
    component:BrandsComponent,
    title:'brands'
  },
  {
    path:'cart',
    component:CartComponent,
    title:'cart',

  },
  {
    path:'whishlist',
    component:WhishlistComponent,
    title:'whishlist',
    canActivate:[authGuard]
  },
  {
    path:'myOrders',
    component:MyOrdersComponent,
    title:'myOrders',
    canActivate:[authGuard]
  },
  {
    path:'myAccount',
    component:MyAccountComponent,
    title:'myAccount',
    canActivate:[authGuard]
  },
  {
    path:'login',
    component:LoginComponent,
    title:'login'
  },
  {
    path:'register',
    component:RegisterComponent,
    title:'register'
  },
  {
    path:'**',
    component:NotfoundComponent,
    title:'notfound'
  },
];
