package com.javalab.board.controller;

import com.javalab.board.service.ItemService;
import com.javalab.board.vo.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/list")
    public String getItemList(Model model) {
        List<Item> items = itemService.findAll();
        model.addAttribute("items", items);
        return "itemList"; // This will be the name of your Thymeleaf template
    }

    @GetMapping("/{id}")
    public String getItemById(@PathVariable("id") long itemId, Model model) {
        Item item = itemService.findById(itemId);
        if (item != null) {
            model.addAttribute("item", item);
            return "itemDetail"; // This will be the name of your Thymeleaf template
        } else {
            return "itemNotFound"; // Create this view for error handling
        }
    }
}
