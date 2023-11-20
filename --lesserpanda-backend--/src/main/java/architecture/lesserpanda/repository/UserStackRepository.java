package architecture.lesserpanda.repository;

import architecture.lesserpanda.entity.Member;
import architecture.lesserpanda.entity.UserStack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserStackRepository extends JpaRepository<UserStack, Long> {
    List<UserStack> findByMember(Member member);
}
