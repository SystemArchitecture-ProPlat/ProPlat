package architecture.lesserpanda.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@RequiredArgsConstructor
@Getter
public class TechStack {

    @Id
    @GeneratedValue
    @Column(name = "tech_stack_id")
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private TechType type;

//    @OneToMany(mappedBy = "techStack")
//    private List<ClubStack> clubStackList;
//
//    @OneToMany(mappedBy = "techStack")
//    private List<UserStack> userStackList;
//
//    @OneToMany(mappedBy = "techStack")
//    private List<PostStack> postStackList;

    //DTO로 만들었는데 이 부분 중복 사용 상관없는지 확인 필요할듯
    @Builder
    public TechStack(Long id, String name, TechType type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}
