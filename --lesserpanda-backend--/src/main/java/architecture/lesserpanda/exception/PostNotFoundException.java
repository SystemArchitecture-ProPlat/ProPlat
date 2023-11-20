package architecture.lesserpanda.exception;

public class PostNotFoundException extends RuntimeException{
    public PostNotFoundException() {
    }

    public PostNotFoundException(String s) {
        super(s);
    }
}
