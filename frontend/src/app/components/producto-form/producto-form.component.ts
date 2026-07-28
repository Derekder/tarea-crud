import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {

  producto: any = {
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidadStock: 0,
    categoriaId: null
  };
  categorias: any[] = [];
  esEdicion: boolean = false;
  id: number = 0;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.esEdicion = true;
      this.productoService.findById(this.id).subscribe({
        next: (data) => {
          this.producto = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            cantidadStock: data.cantidadStock,
            categoriaId: data.categoria?.id
          };
        },
        error: (err) => console.error(err)
      });
    }
  }

  cargarCategorias(): void {
    this.categoriaService.findAll().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error(err)
    });
  }

  guardar(): void {
    if (this.esEdicion) {
      this.productoService.update(this.id, this.producto).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err) => console.error(err)
      });
    } else {
      this.productoService.save(this.producto).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err) => console.error(err)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/productos']);
  }
}
