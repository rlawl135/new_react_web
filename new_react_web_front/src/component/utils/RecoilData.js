import { atom, selector } from "recoil";

//로그인한 아이디를 저장
const loginIdState = atom({
  key: "loginIdState",
  default: "",
});

//로그인한 회원타입을 저장
const memberTypeState = atom({
  key: "memberTypeState",
  default: 0,
});

//atom으로 생성한 데이터 처리함수
const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    //저장된 데이터를 불러오는 객체
    const loginId = state.get(loginIdState);
    const memberType = state.get(memberTypeState);
    return loginId !== "" && memberType !== 0;
  },
});

export { loginIdState, memberTypeState, isLoginState };
