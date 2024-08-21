//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.javalab.board.security.handler;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ErrorController {
    private static final Logger log = LogManager.getLogger(ErrorController.class);

    public ErrorController() {
    }

    @GetMapping({"/access-denied"})
    public String accessDenied(Model model) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        model.addAttribute("username", username);
        model.addAttribute("error", "�빐�떦 �럹�씠吏��뿉 �젒洹� 沅뚰븳�씠 �뾾�뒿�땲�떎.");
        log.info("accessDenied username : " + username);
        return "error/access-denied";
    }
}
