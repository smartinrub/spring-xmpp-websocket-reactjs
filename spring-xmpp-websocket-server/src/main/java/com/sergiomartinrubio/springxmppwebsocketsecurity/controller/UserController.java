package com.sergiomartinrubio.springxmppwebsocketsecurity.controller;

import com.sergiomartinrubio.springxmppwebsocketsecurity.model.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    private Map<String, List<User>> users = Map.of(
            "sergio", List.of(new User("nini"), new User("john")),
            "nini", List.of(new User("sergio"), new User("john")),
            "john", List.of(new User("sergio"), new User("nini")));

    @GetMapping("/users/{username}")
    public List<User> getUsers(@PathVariable("username") String username) {
        return Optional.ofNullable(users.get(username))
                .orElse(List.of());
    }
}
