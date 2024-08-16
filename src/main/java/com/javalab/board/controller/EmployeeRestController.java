package com.javalab.board.controller;

import com.javalab.board.service.EmployeeService;
import com.javalab.board.vo.EmployeeCommonDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/emp")
@RequiredArgsConstructor
@Slf4j
public class EmployeeRestController {

    private final EmployeeService employeeService;

    // 사원 목록 조회
    @GetMapping
    public ResponseEntity<List<EmployeeCommonDto>> getEmployeeList(EmployeeCommonDto dto) {
        List<EmployeeCommonDto> empList = employeeService.getEmployeesList(dto);
        return new ResponseEntity<>(empList, HttpStatus.OK);
    }

    // 사원 정보 보기
    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeCommonDto> getEmployee(@PathVariable("employeeId") int id) {
        EmployeeCommonDto dto = employeeService.getEmployees(id);
        if (dto != null) {
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
