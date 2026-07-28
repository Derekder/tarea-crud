import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [authGuard] },
  { path: 'productos/nuevo', component: ProductoFormComponent, canActivate: [authGuard], data: { role: 'SUPER-ADMIN-ROLE' } },
  { path: 'productos/editar/:id', component: ProductoFormComponent, canActivate: [authGuard], data: { role: 'SUPER-ADMIN-ROLE' } },
  { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard] },
  { path: 'categorias/nuevo', component: CategoriaFormComponent, canActivate: [authGuard], data: { role: 'SUPER-ADMIN-ROLE' } },
  { path: 'categorias/editar/:id', component: CategoriaFormComponent, canActivate: [authGuard], data: { role: 'SUPER-ADMIN-ROLE' } },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard], data: { role: 'SUPER-ADMIN-ROLE' } },
];
