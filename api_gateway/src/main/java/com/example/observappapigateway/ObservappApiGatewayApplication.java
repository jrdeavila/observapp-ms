package com.example.observappapigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ObservappApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ObservappApiGatewayApplication.class, args);
		System.out.println("API Gateway running on port 8080");
	}

}
