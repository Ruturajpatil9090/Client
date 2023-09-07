
import MenuItems from "./MenuItem";
const Dropdown = ({ submenus,dropdown,depthLevel  }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
    return (
      <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
        {submenus.map((submenu, index) => (
          // <li key={index} className="menu-items">
          //   <a href={submenu.url}>{submenu.title}</a>
          // </li>
          <MenuItems items={submenu} key={index} depthLevel={depthLevel}  />
        ))}
      </ul>
    );
  };
  
  export default Dropdown;