package architecture.lesserpanda.service.authentication;

import architecture.lesserpanda.dto.TokenDto;
import architecture.lesserpanda.entity.Member;
import architecture.lesserpanda.entity.TechStack;
import architecture.lesserpanda.entity.UserStack;
import architecture.lesserpanda.global.jwt.TokenProvider;
import architecture.lesserpanda.repository.MemberRepository;
import architecture.lesserpanda.repository.TechStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static architecture.lesserpanda.dto.MemberDto.*;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final TechStackRepository techStackRepository;

    //회원가입
    public LoginResponseDto signup(SignUpRequestDto requestDto){
        if(memberRepository.existsByLoginId(requestDto.getLoginId())){
            throw new RuntimeException("이미 가입되어 있는 유저입니다.");
        }
        String encodePassword = passwordEncoder.encode(requestDto.getLoginPassword());
        Member member = Member.toEntity(requestDto, encodePassword);
        List<String> techList = requestDto.getTechList();
        for (String techName : techList) {
            TechStack techStack = techStackRepository.findByName(techName);
            UserStack userStack = UserStack.createUserStack(techStack, member);
            member.addUserStack(userStack);
        }
        return LoginResponseDto.of(memberRepository.save(member));
    }

    //로그인
    public TokenDto login(LoginRequestDto requestDto){
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        try{
            Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

            TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
            Member member = memberRepository.findById(Long.valueOf(authentication.getName()))
                    .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자 입니다."));
            return tokenDto;
        }catch (RuntimeException e){
            throw new RuntimeException("아이디나 비밀번호를 확인해주세요.");
        }
    }

}
