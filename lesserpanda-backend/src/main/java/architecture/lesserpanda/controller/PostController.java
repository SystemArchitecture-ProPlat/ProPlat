package architecture.lesserpanda.controller;

import architecture.lesserpanda.exception.UserNotFoundException;
import architecture.lesserpanda.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static architecture.lesserpanda.dto.PostDto.*;
import static architecture.lesserpanda.dto.MemberDto.*;
import static architecture.lesserpanda.global.ExceptionStatement.*;

@CrossOrigin("http://43.202.247.199:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    //저장
    @PostMapping("/save")
    public ResponseEntity<FindPostResponseDto> savePost(@RequestBody SaveRequestDto saveRequestDto){
        return ResponseEntity.ok(postService.save(saveRequestDto));
    }

    //리스트
    @GetMapping("/list")
    public Page<FindPostResponseDto> postList(@RequestParam(required = false) String keyword, Pageable pageable){
        return postService.findAllPost(keyword, pageable);
    }

    //상세 페이지
    @GetMapping("/postId={postId}")
    public ResponseEntity<FindPostResponseDto> choosePost(@PathVariable Long postId){
        return ResponseEntity.ok(postService.findPostInfo(postId));
    }

    //삭제
    @DeleteMapping("/postId={postId}")
    public String deletePost(@PathVariable Long postId){
        return postService.deletePost(postId);
    }

    //업데이트
    @PutMapping("/postId={postId}")
    public ResponseEntity<FindPostResponseDto> updatePost(@RequestBody SaveRequestDto saveRequestDto,
                                                          @PathVariable Long postId){
        return ResponseEntity.ok(postService.updatePost(postId, saveRequestDto));
    }
}
