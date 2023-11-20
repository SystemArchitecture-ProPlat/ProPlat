package architecture.lesserpanda.repository;

import architecture.lesserpanda.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, FindNoSearchRepository{
    Optional<Member> findByLoginId(String loginId);
    boolean existsByLoginId(String loginId);
}
