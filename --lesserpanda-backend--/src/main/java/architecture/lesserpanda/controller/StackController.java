package architecture.lesserpanda.controller;

import architecture.lesserpanda.dto.TechStackDto;
import architecture.lesserpanda.repository.TechStackRepository;
import architecture.lesserpanda.service.TechStackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static architecture.lesserpanda.dto.TechStackDto.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/tech-list")
@RequiredArgsConstructor
public class StackController {

    private final TechStackService techStackService;

    @GetMapping
    public List<TechStackInfoDto> findAllTech(){
        return techStackService.findAllTech();
    }
}
