import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, memberTypeState } from "../utils/RecoilData";
import { useEffect, useState } from "react";
import LeftSideMenu from "../utils/LeftSideMenu";
import { Route, Routes, useNavigate } from "react-router-dom";
import MemberInfo from "./MemberInfo";
import ChangePw from "./ChangePw";
import Swal from "sweetalert2";

const MemberMain = () => {
  const [member, setMember] = useState([]);
  const navigate = useNavigate();
  const [memberType, setMemberType] = useRecoilState(memberTypeState);
  const isLogin = useRecoilValue(isLoginState);
  if (!isLogin) {
    Swal.fire({
      title: "로그인 후 이용 가능합니다.",
      icon: "info",
    });
    navigate("/");
  }
  const [menus, setMenus] = useState([
    { url: "info", text: "내 정보" },
    { url: "changePw", text: "비밀번호 변경" },
  ]);
  console.log(memberType);

  useEffect(() => {
    if (memberType === 1) {
      setMenus(() => [...member, { url: "/admin", text: "관리자 페이지" }]);
    }
  }, [memberType]);

  console.log(menus);

  return (
    <div className="mypage-wrap">
      <div className="mypage-side">
        <section className="section account-box">
          <div className="account-info">
            <span>마이페이지</span>
          </div>
        </section>
        <section className="section">
          <LeftSideMenu menus={menus} />
        </section>
      </div>
      <div className="mypage-content">
        <section className="section">
          <Routes>
            <Route path="info" element={<MemberInfo />} />
            <Route path="changePw" element={<ChangePw />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default MemberMain;
