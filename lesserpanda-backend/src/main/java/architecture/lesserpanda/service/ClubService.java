package architecture.lesserpanda.service;

import architecture.lesserpanda.dto.ClubDto;
import architecture.lesserpanda.dto.TechStackDto;
import architecture.lesserpanda.entity.Club;
import architecture.lesserpanda.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static architecture.lesserpanda.dto.TechStackDto.*;

/**
 * 동아리 소개 페이지
 * 입력 x, 출력 : 동아리 정보 한번에, 9개씩 페이징
 */

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClubService {

    private final ClubRepository clubRepository;

    public Page<ClubDto> getAllClubsWithTechStack(Pageable pageable){
        return clubRepository.clubListResponseDtoPage(pageable);
    }
}
