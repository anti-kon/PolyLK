package ru.polylk.apigateway;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import ru.polylk.apigateway.config.LoggingFilter;

@SpringBootApplication
public class ApiGatewayApplication {
//    @Bean
//    public GlobalFilter customFilter() {
//        return new LoggingFilter();
//    }

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
