package architecture.lesserpanda.dto;

import architecture.lesserpanda.entity.Reply;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ReplyDto {

    @Getter
    @NoArgsConstructor
    public static class ReplySaveRequestDto{
        private String content;

        @Builder
        public ReplySaveRequestDto(String content) {
            this.content = content;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class ReplyGetResponseDto{
        private Long replyId;
        private String username;
        private String content;
        private String replyingTime;
        private List<ReReplyGetResponseDto> child_replies = new ArrayList<>();

        @Builder
        public ReplyGetResponseDto(Long replyId, String username, String replyingTime, String content) {
            this.replyId = replyId;
            this.username = username;
            this.replyingTime = replyingTime;
            this.content = content;
        }

        public static ReplyGetResponseDto toReplyGetResponseDto(Long replyId, String username, String content, LocalDateTime replyingTime){
            String dateTime = replyingTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return ReplyGetResponseDto
                    .builder()
                    .replyId(replyId)
                    .username(username)
                    .content(content)
                    .replyingTime(dateTime)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    public static class ReReplyGetResponseDto{
        private Long replyId;
        private String username;
        private String content;
        private String rereplyingTime;

        @Builder
        public ReReplyGetResponseDto(Long replyId, String username, String content, String rereplyingTime) {
            this.replyId = replyId;
            this.username = username;
            this.content = content;
            this.rereplyingTime = rereplyingTime;
        }

        public static ReReplyGetResponseDto toReReplyGetResponseDto(Long replyId, String username, String content, LocalDateTime rereplyingTime){
            String dateTime = rereplyingTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            return ReReplyGetResponseDto
                    .builder()
                    .replyId(replyId)
                    .username(username)
                    .content(content)
                    .rereplyingTime(dateTime)
                    .build();
        }
    }
}
