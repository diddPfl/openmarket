package com.javalab.board.controller;

import com.javalab.board.dto.ItemListDto;
import com.javalab.board.dto.ItemResponseDto;
import com.javalab.board.service.ItemService;
import com.javalab.board.service.MemberService;
import com.javalab.board.vo.BrandDto;
import com.javalab.board.vo.Member;
import com.javalab.board.vo.MemberDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	private final ItemService itemService;
	private final MemberService memberService;

	@Autowired
	public AdminController(ItemService itemService, MemberService memberService) {
		this.itemService = itemService;
		this.memberService = memberService;
	}

	// 상품 관리
	@GetMapping("/items")
	public ResponseEntity<List<ItemListDto>> listItems() {
		List<ItemListDto> items = itemService.findAll();
		return ResponseEntity.ok(items);
	}

	@GetMapping("/items/{id}")
	public ResponseEntity<ItemResponseDto> getItem(@PathVariable("id") long itemId) {
		ItemResponseDto item = itemService.findById(itemId);
		return item != null ? ResponseEntity.ok(item) : ResponseEntity.notFound().build();
	}

//	@DeleteMapping("/items/{id}")
//	public ResponseEntity<Void> deleteItem(@PathVariable("id") long itemId) {
//		boolean deleted = itemService.deleteItem(itemId);
//		return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
//	}

	// 회원 관리
	@GetMapping("/members")
	public ResponseEntity<List<MemberDto>> listMembers() {
		List<MemberDto> members = memberService.getAllMembers();
		return ResponseEntity.ok(members);
	}

	@GetMapping("/members/{id}")
	public ResponseEntity<MemberDto> getMember(@PathVariable("id") Long memberId) {
		Optional<Member> memberOpt = memberService.getMemberById(memberId);
		return memberOpt.map(this::convertToDto)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

//	@DeleteMapping("/members/{id}")
//	public ResponseEntity<Void> deleteMember(@PathVariable("id") Long memberId) {
//		boolean deleted = memberService.deleteMember(memberId);
//		return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
//	}

	// Helper methods
	private MemberDto convertToDto(Member member) {
		MemberDto dto = new MemberDto();
		dto.setMemberId(member.getMemberId());
		dto.setEmail(member.getEmail());
		dto.setName(member.getName());
		dto.setAddress(member.getAddress());
		dto.setDel(member.getDel());
		dto.setRole(member.getRole().name());
		dto.setSocial(member.getSocial());
		dto.setApprovedAt(member.getApprovedAt());
		dto.setRegdate(member.getRegdate());
		return dto;
	}

	// 브랜드 관리
	@GetMapping("/brands")
	public ResponseEntity<List<String>> listBrands() {
		List<String> brands = itemService.getAllBrands();
		return ResponseEntity.ok(brands);
	}

	@DeleteMapping("/brands/{brandName}")
	public ResponseEntity<Void> deleteBrandAndItems(@PathVariable("brandName") String brandName) {
		boolean deleted = itemService.deleteBrandAndRelatedItems(brandName);
		return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
	}

	@GetMapping("/brands/{brandName}")
	public ResponseEntity<BrandDto> getBrandByName(@PathVariable("brandName") String brandName) {
		BrandDto brand = itemService.getBrandByName(brandName);
		return brand != null ? ResponseEntity.ok(brand) : ResponseEntity.notFound().build();
	}
}