import React, { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { LoginContext } from "../context/context";

// Import image
import UserIcon from "../assets/icons/user-icon.png";
import IconLogout from "../assets/icons/logout-icon.png";
import IconJourney from "../assets/icons/add-journey-icon.png";
import BookmarkIcon from "../assets/icons/bookmark-icon.png";

const Dropdown = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useContext(LoginContext);
  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    setLogin(false);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <Menu as="div" className="relative z-10 flex items-center gap-4">
      <div>
        <div className="flex items-center space-x-3">
        <span>Welcome, {state.user.name}!</span>
          <Menu.Button>
            <img
              src={state.user.image} /* input here */
              alt="user"
              className="h-14 w-14 object-cover rounded-full border-2 border-brand-red"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <Link
                to="/profile"
                className="p-4 flex items-center hover:bg-gray-100"
              >
                <img src={UserIcon} className="w-5 mr-2" alt="profile" />
                Profile
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link
                to="/addJourney"
                className="p-4 flex items-center hover:bg-gray-100"
              >
                <img src={IconJourney} className="w-5 mr-2" alt="profile" />
                New Journey
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link
                to="/bookmark"
                className="p-4 flex items-center hover:bg-gray-100"
              >
                <img src={BookmarkIcon} className="w-5 mr-2" alt="profile" />
                Bookmark
              </Link>
            </Menu.Item>

            <hr />
            <Menu.Item>
              <div>
                <div
                  onClick={logout}
                  className="p-4 flex items-center hover:bg-gray-100 cursor-pointer"
                >
                  <img src={IconLogout} className="w-5 mr-2" alt="logout" />
                  Logout
                </div>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};

export default Dropdown;
