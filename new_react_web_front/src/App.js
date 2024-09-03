import { Route, Routes } from "react-router-dom";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import Main from "./component/common/Main";
import Join from "./component/member/Join";
import Login from "./component/member/Login";
import MemberMain from "./component/member/MemberMain";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginIdState, memberTypeState } from "./component/utils/RecoilData";

function App() {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [memberType, setMemberType] = useRecoilState(memberTypeState);

  useEffect(() => {
    refreshLogin();
    window.setInterval(refreshLogin, 60 * 60 * 1000); //한시간이 지나면 자동으로 refresh
  }, []);

  const refreshLogin = () => {
    //최초화면에 접속하면 localStorage에 저장한 refreshToken을 가져와서 자동으로 로그인 처리
    const refreshToken = window.localStorage.getItem("refreshToken");
    if (refreshToken != null) {
      axios.defaults.headers.common["Authorization"] = refreshToken;
      axios
        .post(`${backServer}/member/refresh`)
        .then((res) => {
          console.log(res);
          setLoginId(res.data.memberId);
          setMemberType(res.data.memberType);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          console.log(err);
          setLoginId("");
          setMemberType(0);
          delete axios.defaults.headers.common["Authorization"];
          window.localStorage.removeItem("refreshToken");
        });
    }
  };
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/member/*" element={<MemberMain />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
