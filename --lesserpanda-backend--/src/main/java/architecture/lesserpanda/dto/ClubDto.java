package architecture.lesserpanda.dto;

import architecture.lesserpanda.dto.TechStackDto.TechStackInfoDto;
import architecture.lesserpanda.entity.Club;
import architecture.lesserpanda.entity.ClubStack;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
public class ClubDto {
    private String name;
    private LocalDateTime dDay;
    private String title;
    private String content;
    private String url;
    private LocalDateTime nextDday;
    private List<TechStackInfoDto> clubStackList = new ArrayList<>();

    public static ClubDto toClubDto(Club club) {
        return ClubDto.builder()
                .name(club.getName())
                .dDay(club.getDDay())
                .title(club.getTitle())
                .content(club.getContent())
                .url(club.getUrl())
                .nextDday(club.getNextDday())
//                .techStackList(club.getClubStackList().stream()
//                        .map(ClubStack::getTechStack)
//                        .map(techStack -> TechStackInfoDto.builder().name(techStack.getName()).build())
//                        .collect(Collectors.toList()))
                .build();
    }
}
