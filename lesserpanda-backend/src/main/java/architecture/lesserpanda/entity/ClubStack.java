package architecture.lesserpanda.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@RequiredArgsConstructor
public class ClubStack {

    @Id
    @GeneratedValue
    @Column(name = "club_stack_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tech_stack_id")
    private TechStack techStack;

    @Builder
    public ClubStack(Long id, Club club, TechStack techStack) {
        this.id = id;
        this.club = club;
        this.techStack = techStack;
    }

    //테스트용
    public static ClubStack createClubStack(TechStack techStack){
        return ClubStack.builder().techStack(techStack).build();
    }

    public void setClub(Club club){
        this.club = club;
    }
}
