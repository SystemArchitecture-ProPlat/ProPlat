package architecture.lesserpanda.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException() {
    }

    public UserNotFoundException(String s) {
        super(s);
    }
}
