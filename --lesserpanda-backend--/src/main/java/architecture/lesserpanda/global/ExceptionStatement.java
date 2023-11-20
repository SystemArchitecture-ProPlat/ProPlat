package architecture.lesserpanda.global;

public interface ExceptionStatement {
    String POST_NOT_FOUND = "존재하지 않는 포스트입니다.";
    String USER_NOT_FOUND = "존재하지 않는 유저입니다.";
    String WRONG_PASSWORD = "비밀번호가 틀립니다.";
    String LOGIN_PLEASE = "로그인이 필요한 컨텐츠입니다.";
    String NOT_OWNER = "작성자만 컨트롤할 수 있습니다.";
    String REPLY_NOT_FOUND = "댓글이 존재하지 않습니다.";
    String DUPLICATION_USER = "이미 존재하는 아이디입니다.";
}
