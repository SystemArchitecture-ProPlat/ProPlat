package architecture.lesserpanda.service;

import architecture.lesserpanda.global.util.SecurityUtil;
import architecture.lesserpanda.entity.Member;
import architecture.lesserpanda.entity.Post;
import architecture.lesserpanda.entity.Reply;
import architecture.lesserpanda.exception.PostNotFoundException;
import architecture.lesserpanda.exception.ReplyNotFoundException;
import architecture.lesserpanda.exception.UserNotFoundException;
import architecture.lesserpanda.repository.PostRepository;
import architecture.lesserpanda.repository.ReplyRepository;
import architecture.lesserpanda.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static architecture.lesserpanda.dto.ReplyDto.*;
import static architecture.lesserpanda.global.ExceptionStatement.*;

/**
 * 필요 기능
 * 1. 댓글 리스트 출력
 * 2. 댓글 작성
 * 3. 댓글 삭제
 * 4. 대댓글 작성
 * 5. 대댓글 삭제
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    //댓글 저장
    @Transactional
    public ReplyGetResponseDto saveReply(Long postId, ReplySaveRequestDto replySaveRequestDto){
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(POST_NOT_FOUND));
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND));
        Reply reply = Reply.toReplyEntity(replySaveRequestDto, post, member);
        Reply save = replyRepository.save(reply);
        return ReplyGetResponseDto.toReplyGetResponseDto(save.getId(), member.getName(), save.getContent(), save.getDate());
    }

    //대댓글 작성
    @Transactional
    public ReReplyGetResponseDto saveReReply(Long replyId, ReplySaveRequestDto replySaveRequestDto){
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Reply parent = replyRepository.findById(replyId).orElseThrow(() -> new ReplyNotFoundException(REPLY_NOT_FOUND));
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND));
        Reply rereply = Reply.toReReplyEntity(parent.getPost(), replySaveRequestDto, parent, member);
        Reply save = replyRepository.save(rereply);
        return ReReplyGetResponseDto.toReReplyGetResponseDto(save.getId(), member.getName(), save.getContent(), save.getDate());
    }

    //댓글 리스트
    public Page<ReplyGetResponseDto> findAll(Long postId, Pageable pageable){
        return replyRepository.findPostReplies(postId, pageable);
    }

    //댓글 삭제
    @Transactional
    public String deleteReply(Long replyId){
        Reply reply = replyRepository.findById(replyId).orElseThrow(() -> new ReplyNotFoundException(REPLY_NOT_FOUND));
        replyRepository.delete(reply);
        return "ok";
    }

    //댓글 수정
    @Transactional
    public ReplyGetResponseDto updateReply(Long replyId, ReplySaveRequestDto replySaveRequestDto){
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member member = memberRepository.findById(currentMemberId).orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND));
        Reply reply = replyRepository.findById(replyId).orElseThrow(() -> new ReplyNotFoundException(REPLY_NOT_FOUND));
        reply.change(replySaveRequestDto);
        return ReplyGetResponseDto.toReplyGetResponseDto(replyId, member.getName(), reply.getContent(), reply.getDate());
    }
}
