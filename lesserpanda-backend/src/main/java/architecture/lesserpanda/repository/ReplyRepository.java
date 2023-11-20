package architecture.lesserpanda.repository;

import architecture.lesserpanda.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long>, FindNoSearchRepository {

}
