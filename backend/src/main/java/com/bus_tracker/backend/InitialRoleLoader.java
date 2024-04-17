package com.bus_tracker.backend;

import com.bus_tracker.backend.models.ERole;
import com.bus_tracker.backend.models.Role;
import com.bus_tracker.backend.models.User;
import com.bus_tracker.backend.payload.request.SignupRequest;
import com.bus_tracker.backend.repository.RoleRepository;
import com.bus_tracker.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class InitialRoleLoader implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_USER));
        }

        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }

        HashSet<String> roless = new HashSet<>();
        roless.add("admin");
        SignupRequest signUpRequest = new SignupRequest("freddy", "freddy", "freddy@gmail.com", roless, "123456");

        Optional<User> userOptional= userRepository.findByUsername("freddy");
        if(userOptional.isEmpty()) {
            // Create new user's account
             User user = new User(signUpRequest.getUsername(),
                    signUpRequest.getName(),
                    encoder.encode(signUpRequest.getPassword()),
                    signUpRequest.getEmail());

            Set<String> strRoles = signUpRequest.getRole();
            Set<Role> roles = new HashSet<>();

            if (strRoles == null) {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    if (role.equals("admin")) {
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                    } else {
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                    }
                });
            }

            user.setRoles(roles);
            userRepository.save(user);
        }
    }
}
