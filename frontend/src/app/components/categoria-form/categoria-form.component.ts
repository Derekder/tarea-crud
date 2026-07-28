import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit {

  categoria: any = { nombre: '', descripcion: '' };
  esEdicion: boolean = false;
  id: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.esEdicion = true;
      this.categoriaService.findById(this.id).subscribe({
        next: (data) => this.categoria = data,
        error: (err) => console.error(err)
      });
    }
  }

  guardar(): void {
    if (this.esEdicion) {
      this.categoriaService.update(this.id, this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: (err) => console.error(err)
      });
    } else {
      this.categoriaService.save(this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: (err) => console.error(err)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/categorias']);
  }
}
