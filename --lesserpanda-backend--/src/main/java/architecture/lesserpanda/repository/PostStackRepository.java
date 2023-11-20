package architecture.lesserpanda.repository;

import architecture.lesserpanda.entity.Post;
import architecture.lesserpanda.entity.PostStack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostStackRepository extends JpaRepository<PostStack, Long> {
    List<PostStack> findByPost(Post post);
}
