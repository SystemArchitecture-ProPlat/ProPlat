package architecture.lesserpanda.global;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import static architecture.lesserpanda.dto.MemberDto.*;


public class LoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 1. 세션에서 회원 정보 조회
        HttpSession session = request.getSession();
        LoginResponseDto loginInfo = (LoginResponseDto) session.getAttribute("loginInfo");

        // 2. 회원 정보 체크
        if (loginInfo == null) {
            return false;
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
