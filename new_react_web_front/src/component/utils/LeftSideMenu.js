import { NavLink } from "react-router-dom";

const LeftSideMenu = (props) => {
  const menus = props.menus;
  return (
    <div className="side-menu">
      {menus.map((menu, i) => {
        return (
          <li key={"side-menu" + i}>
            <NavLink
              to={menu.url}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <span>{menu.text}</span>
            </NavLink>
          </li>
        );
      })}
    </div>
  );
};

export default LeftSideMenu;
