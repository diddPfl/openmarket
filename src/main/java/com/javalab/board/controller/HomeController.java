package com.javalab.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	@GetMapping(value = {"/", "/{path:^(?!api|static|login|signup).*}/**"})
	public String forward() {
		return "forward:/index.html";
	}

	@GetMapping("/login")
	public String login() {
		return "login";  // This should return the name of your login view
	}

	@GetMapping("/signup")
	public String signup() {
		return "signup";  // This should return the name of your signup view
	}
}