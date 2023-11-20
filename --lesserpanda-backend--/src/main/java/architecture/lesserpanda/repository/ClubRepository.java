package architecture.lesserpanda.repository;

import architecture.lesserpanda.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long>, FindNoSearchRepository {

}
