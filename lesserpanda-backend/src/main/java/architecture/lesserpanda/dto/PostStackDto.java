package architecture.lesserpanda.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PostStackDto {

    @Getter
    @NoArgsConstructor
    public static class PostStackResponseDto{
        private Long techId;
        @Builder
        public PostStackResponseDto(Long techId) {
            this.techId = techId;
        }
    }
}
