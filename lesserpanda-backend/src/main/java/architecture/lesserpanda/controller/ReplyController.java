package architecture.lesserpanda.controller;

import architecture.lesserpanda.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static architecture.lesserpanda.dto.ReplyDto.*;
import static architecture.lesserpanda.dto.MemberDto.*;
import static architecture.lesserpanda.global.ExceptionStatement.*;

@CrossOrigin("http://43.202.247.199:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/postId={postId}")
public class ReplyController {

    private final ReplyService replyService;

    //댓글 작성
    @PostMapping("/reply-save")
    public ResponseEntity<ReplyGetResponseDto> replySave(@PathVariable Long postId,
                                                        @RequestBody ReplySaveRequestDto replySaveRequestDto){
        return ResponseEntity.ok(replyService.saveReply(postId, replySaveRequestDto));
    }

    //댓글 리스트
    @GetMapping("/reply-list")
    public Page<ReplyGetResponseDto> replyList(@PathVariable Long postId, Pageable pageable){
        return replyService.findAll(postId, pageable);
    }

    //대댓글 작성
    @PostMapping("/rereply-save")
    public ResponseEntity<ReReplyGetResponseDto> reReplySave(@RequestParam("replyId") Long replyId,
                                           @RequestBody ReplySaveRequestDto replySaveRequestDto){
        return ResponseEntity.ok(replyService.saveReReply(replyId, replySaveRequestDto));
    }

    //삭제
    @DeleteMapping("/replyId={replyId}/")
    public String deleteReply(@PathVariable Long replyId){
        return replyService.deleteReply(replyId);
    }

    //수정
    @PutMapping("/replyId={replyId}/")
    public ResponseEntity<ReplyGetResponseDto> updateReply(@PathVariable(value = "replyId") Long replyId,
                            @RequestBody ReplySaveRequestDto replySaveRequestDto){
        return ResponseEntity.ok(replyService.updateReply(replyId, replySaveRequestDto));
    }
}
