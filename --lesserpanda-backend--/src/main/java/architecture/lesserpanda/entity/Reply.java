package architecture.lesserpanda.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static architecture.lesserpanda.dto.ReplyDto.*;

@Entity
@Getter
@RequiredArgsConstructor
public class Reply {

    @Id
    @GeneratedValue
    @Column(name = "reply_id")
    private Long id;

    private String content;
    private LocalDateTime date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Reply parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<Reply> child = new ArrayList<>();

    //==연관 관계 생성 메서드==//
    /**
     * 대댓글 작성
     */
    public void addRereply(Reply parent){
        this.parent = parent;
        parent.getChild().add(this);
    }

    /**
     * Post에 댓글 추가
     */
    public void setPost(Post post){
        this.post = post;
        post.getReplyList().add(this);
    }

    @Builder
    public Reply(Long id, String content, LocalDateTime date, Post post, Member member, Reply parent, List<Reply> child) {
        this.id = id;
        this.content = content;
        this.date = date;
        this.post = post;
        this.member = member;
        this.parent = parent;
        this.child = child;
    }

    public void change(ReplySaveRequestDto replySaveRequestDto){
        this.content = replySaveRequestDto.getContent();
    }

    public static Reply toReplyEntity(ReplySaveRequestDto replySaveRequestDto, Post post, Member member){
        return Reply
                .builder()
                .content(replySaveRequestDto.getContent())
                .date(LocalDateTime.now())
                .post(post)
                .member(member)
                .build();
    }

    public static Reply toReReplyEntity(Post post, ReplySaveRequestDto replySaveRequestDto, Reply parent, Member member){
        return Reply
                .builder()
                .post(post)
                .content(replySaveRequestDto.getContent())
                .date(LocalDateTime.now())
                .parent(parent)
                .member(member)
                .build();
    }
}
