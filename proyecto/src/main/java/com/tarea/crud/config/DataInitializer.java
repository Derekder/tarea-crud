package com.tarea.crud.config;

import com.tarea.crud.entity.Rol;
import com.tarea.crud.entity.Usuario;
import com.tarea.crud.repository.RolRepository;
import com.tarea.crud.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // roles si no existen
        Rol rolAdmin = rolRepository.findByNombre("SUPER-ADMIN-ROLE")
                .orElseGet(() -> rolRepository.save(new Rol(null, "SUPER-ADMIN-ROLE")));

        Rol rolUser = rolRepository.findByNombre("USER")
                .orElseGet(() -> rolRepository.save(new Rol(null, "USER")));

        //  SUPER-ADMIN si no existe
        if (usuarioRepository.findByUsername("admin").isEmpty()) {
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRol(rolAdmin);
            usuarioRepository.save(admin);
            System.out.println("✔ Usuario SUPER-ADMIN-ROLE creado: admin / admin123");
        }

        //  USER si no existe
        if (usuarioRepository.findByUsername("usuario").isEmpty()) {
            Usuario user = new Usuario();
            user.setUsername("usuario");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRol(rolUser);
            usuarioRepository.save(user);
            System.out.println("✔ Usuario USER creado: usuario / user123");
        }
    }
}
