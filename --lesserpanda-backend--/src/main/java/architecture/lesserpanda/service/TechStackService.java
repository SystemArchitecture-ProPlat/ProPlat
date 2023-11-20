package architecture.lesserpanda.service;

import architecture.lesserpanda.dto.TechStackDto;
import architecture.lesserpanda.entity.TechStack;
import architecture.lesserpanda.repository.TechStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static architecture.lesserpanda.dto.TechStackDto.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TechStackService {

    private final TechStackRepository techStackRepository;

    @Transactional
    public Long saveTech(RequestSave requestSave){
        TechStack techStack = requestSave.toEntity();
        techStackRepository.save(techStack);
        return techStack.getId();
    }

    public Optional<TechStack> findTech(Long id){
        return techStackRepository.findById(id);
    }

    public List<TechStackInfoDto> findAllTech(){
        System.out.println(" ============= ");
        return techStackRepository.findAll().stream()
                .map(TechStackInfoDto::toTechStackPostInfoDto)
                .collect(Collectors.toList());
    }
}
