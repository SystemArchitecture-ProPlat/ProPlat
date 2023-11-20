package architecture.lesserpanda.repository;

import architecture.lesserpanda.dto.ClubDto;
import architecture.lesserpanda.dto.TechStackDto.TechStackInfoDto;
import architecture.lesserpanda.entity.*;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static architecture.lesserpanda.dto.ReplyDto.*;
import static architecture.lesserpanda.dto.MemberDto.*;

import static architecture.lesserpanda.entity.QClub.*;
import static architecture.lesserpanda.entity.QClubStack.clubStack;
import static architecture.lesserpanda.entity.QMember.*;
import static architecture.lesserpanda.entity.QReply.reply;
import static architecture.lesserpanda.entity.QTechStack.techStack;
import static architecture.lesserpanda.entity.QUserStack.userStack;
import static java.util.stream.Collectors.*;
import static java.util.stream.Collectors.toList;

@Repository
public class FindNoSearchRepositoryImpl extends QuerydslRepositorySupport implements FindNoSearchRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public FindNoSearchRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        super(Reply.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    //댓글, 대댓글 뽑아오기
    @Override
    public Page<ReplyGetResponseDto> findPostReplies(Long postId, Pageable pageable) {
        List<Tuple> replyTuples = jpaQueryFactory
                .select(reply, member.name)
                .from(reply)
                .join(reply.member, member)
                .where(reply.post.id.eq(postId))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(
                        reply.date.asc()
                )
                .fetch();
        Map<Long, ReplyGetResponseDto> replyDtoMap = new HashMap<>();
        for(Tuple tuple : replyTuples){
            Reply replyTmp = tuple.get(reply);
            String username = tuple.get(member.name);
            //댓글
            if(replyTmp.getParent() == null){
                ReplyGetResponseDto replyGetResponseDto =
                        ReplyGetResponseDto.toReplyGetResponseDto(replyTmp.getId(), username, replyTmp.getContent(), replyTmp.getDate());
                replyDtoMap.put(replyTmp.getId(), replyGetResponseDto);
            }
            //대댓글
            else{
                ReplyGetResponseDto parent = replyDtoMap.get(replyTmp.getParent().getId());
                ReReplyGetResponseDto child =
                        ReReplyGetResponseDto.toReReplyGetResponseDto(replyTmp.getId(), username, replyTmp.getContent(), replyTmp.getDate());
                parent.getChild_replies().add(child);
            }
        }

        List<ReplyGetResponseDto> parentReplies = new ArrayList<>(replyDtoMap.values());

        return new PageImpl<>(parentReplies, pageable, parentReplies.size());
    }

    //동아리 정보 전부 가져오기
    @Override
    public Page<ClubDto> clubListResponseDtoPage(Pageable pageable){
        List<ClubDto> content = new ArrayList<>(
                jpaQueryFactory
                .select(club.id, club.name, club.dDay, club.title, club.content, club.url, club.nextDday, techStack.name, techStack.type)
                .from(club)
                .innerJoin(club.clubStackList, clubStack)
                .innerJoin(clubStack.techStack, techStack)
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                .stream()
                .collect(groupingBy(
                        tuple -> tuple.get(club.id), // Club ID로 그룹화
                        mapping(tuple -> tuple, // Club ID별로 그룹화된 결과를 ClubDto로 변환
                                collectingAndThen(
                                        toList(), tuples -> ClubDto.builder()
                                                .name(tuples.get(0).get(club.name))
                                                .dDay(tuples.get(0).get(club.dDay))
                                                .title(tuples.get(0).get(club.title))
                                                .content(tuples.get(0).get(club.content))
                                                .url(tuples.get(0).get(club.url))
                                                .nextDday(tuples.get(0).get(club.nextDday))
                                                .clubStackList(tuples.stream()
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

    //유저 정보 꺼내오기
    @Override
    public UserInfoDto findUserInfo(Long userId){
        Member findMember = jpaQueryFactory
                .selectFrom(member)
                .leftJoin(member.userStackList, userStack).fetchJoin()
                .leftJoin(userStack.techStack, techStack).fetchJoin()
                .where(member.id.eq(userId))
                .fetchOne();
        assert findMember != null;
        List<TechStackInfoDto> techStackPostInfoDtoList = findMember.getUserStackList().stream()
                .map(userStack -> TechStackInfoDto.toTechStackPostInfoDto(userStack.getTechStack()))
                .collect(Collectors.toList());
        return UserInfoDto.toUserInfoDto(findMember, techStackPostInfoDtoList);
    }
}
