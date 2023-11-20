package architecture.lesserpanda.dto;

import architecture.lesserpanda.dto.TechStackDto.TechStackInfoDto;
import architecture.lesserpanda.entity.*;
import lombok.*;
import org.hibernate.usertype.UserType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class MemberDto {

    @NotBlank
    @Getter
    @NoArgsConstructor
    public static class SignUpRequestDto {

        private String name;
        @Email
        private String loginId;
        private String loginPassword;
        private Authority authority;
        private String nickname;
        private String phoneNumber;
        private String introduce;
        private List<String> techList = new ArrayList<>();

        @Builder
        public SignUpRequestDto(String name, String loginId, String loginPassword,
                                Authority authority, String nickname, String phoneNumber,
                                String introduce, List<String> techList) {
            this.name = name;
            this.loginId = loginId;
            this.loginPassword = loginPassword;
            this.authority = authority;
            this.nickname = nickname;
            this.phoneNumber = phoneNumber;
            this.introduce = introduce;
            this.techList = techList;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class LoginRequestDto {
        private String loginId;
        private String loginPassword;

        @Builder
        public LoginRequestDto(String loginId, String loginPassword) {
            this.loginId = loginId;
            this.loginPassword = loginPassword;
        }

        public UsernamePasswordAuthenticationToken toAuthentication(){
            return new UsernamePasswordAuthenticationToken(loginId, loginPassword);
        }
    }

    @Getter
    @NoArgsConstructor
    public static class LoginResponseDto {
        private Long id;
        private String nickname;
        private String loginId;
        private Authority authority;

        @Builder
        public LoginResponseDto(Long id, String nickname, String loginId, Authority authority) {
            this.id = id;
            this.nickname = nickname;
            this.loginId = loginId;
            this.authority = authority;
        }

        public static LoginResponseDto of(Member member) {
            return LoginResponseDto
                    .builder()
                    .id(member.getId())
                    .nickname(member.getNickname())
                    .loginId(member.getLoginId())
                    .authority(member.getAuthority())
                    .build();
        }
    }

    @Getter
    @Builder
    public static class UserInfoDto{
        private String name;
        private String loginId;
        private String nickname;
        private String phoneNumber;
        private String introduce;
        private List<TechStackInfoDto> userStackList = new ArrayList<>();

        public static UserInfoDto toUserInfoDto(Member member, List<TechStackInfoDto> techStackInfoDtoList) {
            return UserInfoDto.builder()
                    .name(member.getName())
                    .loginId(member.getLoginId())
                    .nickname(member.getNickname())
                    .phoneNumber(member.getPhoneNumber())
                    .introduce(member.getIntroduce())
                    .userStackList(techStackInfoDtoList)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class UpdateInfoDto{
        private String name;
        private String loginId;
        private String nickname;
        private String phoneNumber;
        private String introduce;
        private List<String> userStackList = new ArrayList<>();
        
        public static UpdateInfoDto toUpdateInfoDto(Member member, List<String> techStackInfoDtoList) {
            return UpdateInfoDto.builder()
                    .name(member.getName())
                    .loginId(member.getLoginId())
                    .nickname(member.getNickname())
                    .phoneNumber(member.getPhoneNumber())
                    .introduce(member.getIntroduce())
                    .userStackList(techStackInfoDtoList)
                    .build();
        }
    }
}
