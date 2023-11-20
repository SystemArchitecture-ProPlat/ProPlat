package architecture.lesserpanda.config;

import architecture.lesserpanda.entity.Authority;
import architecture.lesserpanda.global.jwt.JwtAccessDeniedHandler;
import architecture.lesserpanda.global.jwt.JwtAuthenticationEntryPoint;
import architecture.lesserpanda.global.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .cors();

        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .authorizeHttpRequests()
                .antMatchers("/test/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/main/**").permitAll()
                .antMatchers("/post/list").permitAll()
                .antMatchers(HttpMethod.GET, "/post/postId={postId}").permitAll()
                .antMatchers("/postId={postId}/reply-list").permitAll()
                .antMatchers("/tech-list").permitAll()
                .anyRequest().authenticated()

                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                .and()
                .apply(new JwtSecurityConfig(tokenProvider));
        return http.getOrBuild();
    }
}