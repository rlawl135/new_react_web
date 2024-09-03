package kr.co.iei.util;

import java.util.Date;
import java.util.Calendar;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties.Build;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import kr.co.iei.member.model.dto.LoginMemberDTO;

@Component
public class JwrUtils {
	@Value("${jwt.secret-key}")
	public String secretKey;
	@Value("${jwt.expire-hour}")
	public int expireHour;
	@Value("${jwt.expire-hour-refresh}")
	public int expireHourRefresh;
	
	
	//1시간 짜기 토큰 생성
	public String createAccessToken(String memberId,int memberType) {
		//1.작성해둔 키값을 이용해서 암호화 코드 생성
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		//2. 토큰 생성시간 만료시간설정
		Calendar c = Calendar.getInstance();
		Date StartTime = c.getTime();
		c.add(Calendar.HOUR, expireHour);
		Date expireTime = c.getTime();
		
		String token = Jwts.builder()						//JWt생성시간
						.issuedAt(StartTime)				//토큰발행시작시간
						.expiration(expireTime)				//토큰만료시간
						.signWith(key)						//암호화 서명
						.claim("memberId", memberId)		//토큰에 포함할 회원정보 세팅(key = value)
						.claim("memberType", memberType)	//토큰에 포함할 회원정보 세팅(key = value)
						.compact();							//생성
		return token;
	}
	//8760시간(1년)짜리 토큰생성
	public String createReFreshToken(String memberId,int memberType) {
		//1.작성해둔 키값을 이용해서 암호화 코드 생성
				SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
				//2. 토큰 생성시간 만료시간설정
				Calendar c = Calendar.getInstance();
				Date StartTime = c.getTime();
				c.add(Calendar.HOUR, expireHourRefresh);
				//c.add(Calendar.SECOND, 30);
				Date expireTime = c.getTime();
				
				String token = Jwts.builder()						//JWt생성시간
								.issuedAt(StartTime)				//토큰발행시작시간
								.expiration(expireTime)				//토큰만료시간
								.signWith(key)						//암호화 서명
								.claim("memberId", memberId)		//토큰에 포함할 회원정보 세팅(key = value)
								.claim("memberType", memberType)	//토큰에 포함할 회원정보 세팅(key = value)
								.compact();							//생성
				return token;
	}
	
	//토큰을 받아서 확인
	public LoginMemberDTO checkToken(String token) {
		//1.토큰 해석을 위한 암호화 세팅
		SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
		 Claims claims = (Claims)Jwts.parser()	//토큰해석 시작
				 					.verifyWith(key)	//암호화키
		 							.build()
		 							.parse(token)
		 							.getPayload();
		 String memberId = (String)claims.get("memberId");
		 int memberType = (int)claims.get("memberType");
		LoginMemberDTO loginMember = new LoginMemberDTO();
		loginMember.setMemberId(memberId);
		loginMember.setMemberType(memberType);
		 return loginMember;
	}
	
}
