package architecture.lesserpanda;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.SecureRandom;
import java.util.Base64;

@SpringBootApplication
public class LesserpandaApplication {

	public static void main(String[] args) {
		SecureRandom secureRandom = new SecureRandom();
		byte[] keyBytes = new byte[64];
		secureRandom.nextBytes(keyBytes);

		String secretKey = Base64.getEncoder().encodeToString(keyBytes);
		System.out.println("Generated 64-byte JWT Secret Key: " + secretKey);
		SpringApplication.run(LesserpandaApplication.class, args);
	}

}
