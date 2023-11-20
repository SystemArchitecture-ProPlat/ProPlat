package architecture.lesserpanda.service;

import architecture.lesserpanda.global.util.SecurityUtil;
import architecture.lesserpanda.entity.*;
import architecture.lesserpanda.exception.PostNotFoundException;
import architecture.lesserpanda.repository.PostRepository;
import architecture.lesserpanda.repository.PostStackRepository;
import architecture.lesserpanda.repository.TechStackRepository;
import architecture.lesserpanda.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static architecture.lesserpanda.dto.PostDto.*;
import static architecture.lesserpanda.dto.TechStackDto.*;
import static architecture.lesserpanda.global.ExceptionStatement.*;

/**
 * 기능
 * 1. 포스트 저장
 * 2. 포스트 불러오기
 * 3. 포스트 검색
 * 4. 포스트 수정
 */

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final TechStackRepository techStackRepository;
    private final PostStackRepository postStackRepository;

    //포스트 저장
    @Transactional
    public FindPostResponseDto save(SaveRequestDto saveRequestDto) {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member member = memberRepository.findById(currentMemberId)
                .orElseThrow(() -> new RuntimeException(USER_NOT_FOUND));
        Post post = Post.toEntity(saveRequestDto, member);

        List<String> stackList = saveRequestDto.getStackList();
        List<TechStackInfoDto> postStackList = new ArrayList<>();
        for (String name : stackList) {
            TechStack techStack = techStackRepository.findByName(name);
            PostStack postStack = PostStack.createPostStack(techStack, post);
            postStackList.add(TechStackInfoDto.toTechStackPostInfoDto(techStack));
            post.getPostStackList().add(postStack);
        }
        postRepository.save(post);
        return FindPostResponseDto.toFindPostResponseDto(post, postStackList);
    }

    //포스트 리스트
    public Page<FindPostResponseDto> findAllPost(String keyword, Pageable pageable) {
        return postRepository.postListResponseDtoPage(keyword, pageable);
    }

    //포스트 상세 보기
    public FindPostResponseDto findPostInfo(Long postId) {
        FindPostResponseDto postById = postRepository.findOnePost(postId);
        if(postById == null){
            throw new PostNotFoundException(POST_NOT_FOUND);
        }
        return postById;
    }

    //삭제
    @Transactional
    public String deletePost(Long postId) {
        Optional<Post> find = Optional.ofNullable(postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(POST_NOT_FOUND)));
        if(find.isPresent()){
            Post post = find.get();
            postRepository.delete(post);
            return "ok";
        }
        return "false";
    }

    //업데이트
    @Transactional
    public FindPostResponseDto updatePost(Long postId, SaveRequestDto saveRequestDto) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(POST_NOT_FOUND));
        List<String> techList = saveRequestDto.getStackList();
        List<PostStack> postStackList = postStackRepository.findByPost(post);
        postStackRepository.deleteAll(postStackList);

        postStackList.clear();
        for (String name : techList) {
            TechStack techStack = techStackRepository.findByName(name);
            PostStack postStack = PostStack.createPostStack(techStack, post);
            postStackList.add(postStack);
        }
        post.change(saveRequestDto, postStackList);
        return postRepository.findOnePost(postId);
    }
}
