package architecture.lesserpanda.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@RequiredArgsConstructor
@Getter
public class PostStack {

    @Id
    @GeneratedValue
    @Column(name = "post_stack_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tech_stack_id")
    private TechStack techStack;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    public PostStack(Long id, TechStack techStack, Post post) {
        this.id = id;
        this.techStack = techStack;
        this.post = post;
    }

    public static PostStack createPostStack(TechStack techStack, Post post){
        return PostStack.builder().techStack(techStack).post(post).build();
    }

    public void setPost(Post post){
        this.post = post;
    }
}
