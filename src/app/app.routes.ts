import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { loginGuard } from './core/guards/login/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    title: 'Products'
  },
  {
    path: 'productDetails/:id',
    loadComponent: () => import('./pages/product-details/product-details.component').then(m => m.ProductDetailsComponent),
    title: 'Product Details'
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
    title: 'Categories'
  },
  {
    path: 'brands',
    loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent),
    title: 'Brands'
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
    title: 'Cart',
    canActivate: [authGuard]
  },
  {
    path: 'whishlist',
    loadComponent: () => import('./pages/whishlist/whishlist.component').then(m => m.WhishlistComponent),
    title: 'Wishlist',
    canActivate: [authGuard]
  },
  {
    path: 'allorders',
    loadComponent: () => import('./pages/my-orders/my-orders.component').then(m => m.MyOrdersComponent),
    title: 'My Orders',
    canActivate: [authGuard]
  },
  {
    path: 'myAccount',
    loadComponent: () => import('./pages/my-account/my-account.component').then(m => m.MyAccountComponent),
    title: 'My Account',
    canActivate: [authGuard]
  },
  {
    path: 'checkout/:id',
    loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: 'Checkout',
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
    canActivate: [loginGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    title: 'Register',
    canActivate: [loginGuard]
  },
  {
    path: 'forgetPassword',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
    title: 'Forget Password',
    canActivate: [loginGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: 'Not Found'
  }
];
