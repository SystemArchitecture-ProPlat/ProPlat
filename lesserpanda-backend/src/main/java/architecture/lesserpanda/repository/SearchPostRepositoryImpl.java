package architecture.lesserpanda.repository;

import architecture.lesserpanda.entity.Post;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static architecture.lesserpanda.dto.PostDto.*;
import static architecture.lesserpanda.dto.TechStackDto.*;
import static architecture.lesserpanda.entity.QPost.*;
import static architecture.lesserpanda.entity.QPostStack.*;
import static architecture.lesserpanda.entity.QTechStack.*;
import static com.querydsl.core.group.GroupBy.groupBy;
import static java.util.stream.Collectors.*;

@Repository
public class SearchPostRepositoryImpl extends QuerydslRepositorySupport implements SearchPostRepository {

    private final JPAQueryFactory jpaQueryFactory;
    public SearchPostRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        super(Post.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    //프로젝트 구인 글 리스트
    @Override
    public Page<FindPostResponseDto> postListResponseDtoPage(String keyword, Pageable pageable){
        List<FindPostResponseDto> content = new ArrayList<>(jpaQueryFactory
                .select(post.id, post.title, post.content, post.complete, post.date, techStack.name, techStack.type)
                .from(post)
                .innerJoin(post.postStackList, postStack)
                .innerJoin(postStack.techStack, techStack)
                .where(containTitle(keyword), containContent(keyword))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(
                        post.date.asc()
                )
                .stream()
                .collect(groupingBy(
                        tuple -> tuple.get(post.id), // Post ID로 그룹화
                        mapping(tuple -> tuple, // Post ID별로 그룹화된 결과를 FindPostResponseDto로 변환
                                collectingAndThen(
                                        toList(), tuples -> FindPostResponseDto.builder()
                                        .postId(tuples.get(0).get(post.id))
                                        .title(tuples.get(0).get(post.title))
                                        .content(tuples.get(0).get(post.content))
                                                .postingTime(tuples.get(0).get(post.date))
                                        .complete(Boolean.TRUE.equals(tuples.get(0).get(post.complete)))
                                        .postStackList(tuples.stream()
                                                .map(t ->
                                                        new TechStackInfoDto(
                                                                t.get(techStack.name),
                                                                t.get(techStack.type)
                                                        )
                                                )
                                                .collect(toList()))
                                        .build())
                        )
                ))
                .values());
        return new PageImpl<>(content, pageable, content.size());
    }

    //프로젝트 구인글 상세 정보 가져오기
    @Override
    public FindPostResponseDto findOnePost(Long postId){
        Post findPost = jpaQueryFactory
                .selectFrom(post)
                .leftJoin(post.postStackList, postStack).fetchJoin()
                .leftJoin(postStack.techStack, techStack).fetchJoin()
                .where(post.id.eq(postId))
                .fetchOne();
        assert findPost != null;
        List<TechStackInfoDto> techStackPostInfoDtoList = findPost.getPostStackList().stream()
                .map(postStack -> TechStackInfoDto.toTechStackPostInfoDto(postStack.getTechStack()))
                .collect(Collectors.toList());
        return FindPostResponseDto.toFindPostResponseDto(findPost, techStackPostInfoDtoList);
    }

    BooleanExpression containContent(String keyword){
        if(keyword == null || keyword.isEmpty())
            return null;
        else return post.content.contains(keyword);
    }

    BooleanExpression containTitle(String keyword){
        if(keyword == null || keyword.isEmpty())
            return null;
        else return post.title.contains(keyword);
    }
}
