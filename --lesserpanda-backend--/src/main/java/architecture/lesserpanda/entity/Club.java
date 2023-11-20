package architecture.lesserpanda.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@RequiredArgsConstructor
public class Club {

    @Id
    @GeneratedValue
    @Column(name = "club_id")
    private Long id;

    private String name;
    private LocalDateTime dDay;
    private String title;
    private String content;
    private String url;
    private LocalDateTime nextDday;

    @OneToMany(mappedBy = "club", cascade = CascadeType.ALL)
    private List<ClubStack> clubStackList = new ArrayList<>();

    //테스트용
    public void setClubStack(ClubStack clubStack){
        this.clubStackList.add(clubStack);
        clubStack.setClub(this);
    }

    @Builder
    public Club(Long id, String name, LocalDateTime dDay,
                String title, String content, String url,
                LocalDateTime nextDday) {
        this.id = id;
        this.name = name;
        this.dDay = dDay;
        this.title = title;
        this.content = content;
        this.url = url;
        this.nextDday = nextDday;
        this.clubStackList = new ArrayList<>();
    }
}
