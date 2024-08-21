package com.javalab.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	@GetMapping(value = {"/", "/login", "/signup", "/{path:^(?!api|static).*}/**"})
	public String forward() {
		return "forward:/index.html";
	}
}
