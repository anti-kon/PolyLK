package ru.aipikon.eurakaclient.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class EurekaClientController {
    @CrossOrigin
    @GetMapping(name = "/", value = "/")
    public String sayGoodbye() {
        return "Goodbye from here!";
    }


    @CrossOrigin
    @GetMapping(name = "/say", value = "/say")
    public String sayHello() {
        return "Hello from here!";
    }
}
