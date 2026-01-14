package com.rhis.backend;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/hello")
    public String hello(Principal principal) {
        if (principal != null) {
            return "Hello " + principal.getName();
        }
        return "Hello Anonymous";
    }
}