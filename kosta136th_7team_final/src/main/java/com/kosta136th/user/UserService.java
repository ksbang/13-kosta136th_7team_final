package com.kosta136th.user;

public interface UserService {
	
	public String checkEmailDuplication(String email) throws Exception;

	public String signupEmail(User userInfo, String register_type_code) throws Exception;

	public LoginInfo signinEmail(User user) throws Exception;

	public boolean signout(User user) throws Exception;

}
