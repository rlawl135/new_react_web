package kr.co.iei;

import org.springframework.http.HttpStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Schema(description = "응답데이터 형식")
public class ResponseDTO {	
	@Schema(description = "응답코드", type = "number")
	private int code;
	@Schema(description = "응답 객체", type = "HttpStatus")
	private HttpStatus httpStatus;
	@Schema(description = "응답메세지", type = "String")
	private String message;
	@Schema(description = "응답 데이터", type = "object")
	private Object data;
	
}
