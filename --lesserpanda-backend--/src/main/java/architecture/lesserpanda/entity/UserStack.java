package architecture.lesserpanda.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@RequiredArgsConstructor
public class UserStack {

    @Id
    @GeneratedValue
    @Column(name = "user_stack_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tech_stack_id")
    private TechStack techStack;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public UserStack(Long id, TechStack techStack, Member member) {
        this.id = id;
        this.techStack = techStack;
        this.member = member;
    }

    public static UserStack createUserStack(TechStack techStack, Member member){
        return UserStack.builder().techStack(techStack).member(member).build();
    }

    public void setMember(Member member){
        this.member = member;
    }
}
