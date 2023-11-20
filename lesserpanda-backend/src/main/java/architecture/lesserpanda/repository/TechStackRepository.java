package architecture.lesserpanda.repository;

import architecture.lesserpanda.entity.TechStack;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TechStackRepository extends JpaRepository<TechStack, Long> {
    TechStack findByName(@Param("name") String techName);
}
