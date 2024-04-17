package com.bus_tracker.backend.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @Size(max = 50)
    private String name;

    @Size(max = 50)
    private String email;

    private Set<String> role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    public SignupRequest(String username, String name, String email, Set<String> role, String password) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
    }
}
