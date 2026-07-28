package com.tarea.crud.dto;

import lombok.Data;

@Data
public class ProductoRequest {
    private String nombre;
    private String descripcion;
    private Double precio;
    private Integer cantidadStock;
    private Long categoriaId;
}
