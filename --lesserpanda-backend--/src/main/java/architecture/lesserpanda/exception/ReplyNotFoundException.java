package architecture.lesserpanda.exception;

public class ReplyNotFoundException extends RuntimeException{
    public ReplyNotFoundException() {
    }

    public ReplyNotFoundException(String s) {
        super(s);
    }
}
