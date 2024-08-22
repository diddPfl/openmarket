package com.javalab.board.security;

import com.javalab.board.exception.EntityNotFoundException;
import com.javalab.board.repository.MemberRepository;
import com.javalab.board.security.dto.MemberSecurityDTO;
import com.javalab.board.vo.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@Transactional
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Attempting to load user: " + username);
        Member member = memberRepository.findByEmail(username);
        if (member == null) {
            System.out.println("No member found with email: " + username);
            throw new UsernameNotFoundException("No member found with email: " + username);
        }
        System.out.println("Member found: " + member);

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + member.getRole().name()));

        return new MemberSecurityDTO(
                member.getMemberId(),
                member.getEmail(),
                member.getPassword(),
                member.getRole().name(),
                authorities,
                member.getDel(),
                member.getSocial()
        );
    }

    public Member saveMember(Member member) {
        validateDuplicateMember(member);
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        int result = memberRepository.save(member);
        if (result > 0) {
            return member;
        } else {
            throw new RuntimeException("Failed to save member");
        }
    }

    private void validateDuplicateMember(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        if (findMember != null) {
            throw new IllegalStateException("Member already exists");
        }
    }

    public Member getMember(Long id) throws EntityNotFoundException {
        Member member = memberRepository.findById(id);
        if (member == null) {
            throw new EntityNotFoundException("Member not found with ID: " + id);
        }
        return member;
    }

    @Transactional
    public void modifyPasswordAndSocialStatus(String email, String rawPassword) {
        String encodedPassword = passwordEncoder.encode(rawPassword);
        int result = memberRepository.updatePasswordAndSocial(email, encodedPassword);
        if (result == 0) {
            throw new RuntimeException("Failed to update password and social status");
        }
    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Transactional
    public void updateMember(Member member) {
        if (member.getPassword() != null && !member.getPassword().isEmpty()) {
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }
        int result = memberRepository.update(member);
        if (result == 0) {
            throw new RuntimeException("Failed to update member");
        }
    }

    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    @Transactional
    public void updateAllExistingPasswords() {
        List<Member> members = memberRepository.findAll();
        for (Member member : members) {
            if (!member.getPassword().startsWith("$2a$")) {
                String encodedPassword = passwordEncoder.encode(member.getPassword());
                member.setPassword(encodedPassword);
                memberRepository.update(member);
            }
        }
    }

    @Transactional
    public void updateMemberPassword(Long memberId, String rawPassword) {
        Member member = memberRepository.findById(memberId);
        if (member != null) {
            String encodedPassword = passwordEncoder.encode(rawPassword);
            member.setPassword(encodedPassword);
            memberRepository.update(member);
        } else {
            throw new EntityNotFoundException("Member not found with ID: " + memberId);
        }
    }
}