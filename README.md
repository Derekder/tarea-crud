# Tarea CRUD - Spring Boot + Angular

## Tecnologías
- Backend: Spring Boot 3.2, Spring Security, JWT, JPA, MySQL
- Frontend: Angular 17, Bootstrap

## Credenciales de prueba
| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin | admin123 | SUPER-ADMIN-ROLE |
| usuario | user123 | USER |

## Cómo correr el proyecto

### Backend
1. Tener MySQL corriendo en puerto 3306
2. Abrir carpeta `src` en IntelliJ
3. Correr `CrudApplication.java`
4. La base de datos se crea automáticamente

### Frontend
1. Entrar a la carpeta `frontend`
2. Ejecutar `npm install`
3. Ejecutar `ng serve`
4. Abrir `http://localhost:4200`

## Colección Insomnia
Importar el archivo `insomnia_collection.json` en Insomnia para probar los endpoints del backend.
