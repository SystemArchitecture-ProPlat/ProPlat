package architecture.lesserpanda.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

import static architecture.lesserpanda.dto.MemberDto.*;

@Entity
@Getter
@RequiredArgsConstructor
@Table(name = "Member")
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @NotBlank(message = "이름은 필수 입력 값입니다.")
    private String name;
    @NotBlank(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String loginId;
    @NotBlank(message = "비밀번호는 필수 입력 값입니다.")
    private String loginPassword;
    @NotBlank(message = "닉네임은 필수 입력 값입니다.")
    private String nickname;
    private String phoneNumber;
    private String introduce;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<UserStack> userStackList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Post> userPostList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Reply> userReplyList = new ArrayList<>();

    //==연관 관계 매핑 함수==//

    /**
     * 유저 생성 시 userStack 넣어서 생성
     */
    public void addUserStack(UserStack userStack){
        this.userStackList.add(userStack);
        userStack.setMember(this);
    }

    @Builder
    public Member(Long id, String name, String loginId, String loginPassword,
                  String nickname, String phoneNumber, String introduce, Authority authority,
                  List<UserStack> userStackList, List<Post> userPostList, List<Reply> userReplyList) {
        this.id = id;
        this.name = name;
        this.loginId = loginId;
        this.loginPassword = loginPassword;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
        this.introduce = introduce;
        this.authority = authority;
        this.userStackList = new ArrayList<>();
        this.userPostList = new ArrayList<>();
        this.userReplyList = new ArrayList<>();
    }


    public void update(UpdateInfoDto updateInfoDto, List<UserStack> userStackList){
        this.name = updateInfoDto.getName();
        this.nickname = updateInfoDto.getNickname();
        this.phoneNumber = updateInfoDto.getPhoneNumber();
        this.introduce = updateInfoDto.getIntroduce();
        this.userStackList = userStackList;
    }
    public static Member toEntity(SignUpRequestDto signUpRequestDto, String encodePassword){
        return  Member.builder()
                .name(signUpRequestDto.getName())
                .loginId(signUpRequestDto.getLoginId())
                .loginPassword(encodePassword)
                .authority(signUpRequestDto.getAuthority())
                .nickname(signUpRequestDto.getNickname())
                .phoneNumber(signUpRequestDto.getPhoneNumber())
                .introduce(signUpRequestDto.getIntroduce())
                .build();
    }
}
