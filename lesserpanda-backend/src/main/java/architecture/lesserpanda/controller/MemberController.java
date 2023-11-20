package architecture.lesserpanda.controller;

import architecture.lesserpanda.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static architecture.lesserpanda.dto.MemberDto.*;

@CrossOrigin("http://43.202.247.199:3000")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final UserService userService;
    /**
     * DB에 유저 정보가 있는지 확인
     */

    //마이페이지
    @GetMapping("/my-page")
    public ResponseEntity<UserInfoDto> showUserInfo(){
        return ResponseEntity.ok(userService.getUserInfo());
    }

    //업데이트
    @PutMapping("/update")
    public ResponseEntity<UserInfoDto> updateUser(@RequestBody UpdateInfoDto updateUserInfo){
        return ResponseEntity.ok(userService.updateUser(updateUserInfo));
    }
}
