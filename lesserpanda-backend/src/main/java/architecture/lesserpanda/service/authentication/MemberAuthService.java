package architecture.lesserpanda.service.authentication;

import architecture.lesserpanda.entity.Member;
import architecture.lesserpanda.exception.UserNotFoundException;
import architecture.lesserpanda.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class MemberAuthService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return memberRepository.findByLoginId(email)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UserNotFoundException(email + "을 찾을 수 없습니다."));
    }

    private UserDetails createUserDetails(Member member){
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getAuthority().toString());

        return new User(
                String.valueOf(member.getId()),
                member.getLoginPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}
