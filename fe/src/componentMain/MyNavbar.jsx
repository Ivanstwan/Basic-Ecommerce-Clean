import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./myNavbar.css";
import NavbarMenu from "./NavbarMenu";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/actions";

function MyNavbar({ user }) {
  // REDUX
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLogout());
  };

  return (
    <div className="main-nav">
      <div className="primary-nav">
        <div className="primary-nav__inner">
          <div className="primary-nav__logo">
            <Link to="/" className="primary-nav__logo-text">
              <i className="fas fa-arrow-up nav-logo" />
              <div className="nav-logo-text">Ecommerce Basic</div>
            </Link>
          </div>
          <div className="primary-nav__menu--left">
            <ul className="primary-nav__menu">
              {/* <li className="primary-nav__menu-item">
                <span className="menu-title">
                  Flowers
                  <i className="fas fa-chevron-down" />
                </span>
                <div className="primary-nav__lil-box"></div>
                <div className="primary-nav__menu-support">
                  <ul className="no-bullets">
                    <li>Calissia</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                  </ul>
                </div>
              </li>
              <li className="primary-nav__menu-item">
                <span className="menu-title">
                  Fruits
                  <i className="fas fa-chevron-down" />
                </span>
                <div className="primary-nav__lil-box"></div>
                <div className="primary-nav__menu-support">
                  <ul className="no-bullets">
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                  </ul>
                </div>
              </li>
              <li className="primary-nav__menu-item">
                <span className="menu-title">
                  Plants
                  <i className="fas fa-chevron-down" />
                </span>
                <div className="primary-nav__lil-box"></div>
                <div className="primary-nav__menu-support">
                  <ul className="no-bullets">
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                    <li>1</li>
                  </ul>
                </div>
              </li> */}
              <NavbarMenu />
            </ul>
          </div>
          {user.email ? (
            <div className="primary-nav__menu--right">
              {user.role === 99 ? (
                <>
                  <div className="menu--right-user-container">
                    <div className="menu--right-user">Hello, </div>
                    <div className="menu--right-user-email">{user.email}</div>
                    <i className="fas fa-chevron-down" />
                    <div className="menu--right-lil-box"></div>
                    <div className="menu--right-support">
                      <Link
                        to="/admin/lessercategory"
                        className="menu--right-support-admin-add-cat"
                      >
                        Add Category
                      </Link>
                      <Link
                        to="/admin/editproduct"
                        className="menu--right-support-admin-add-cat"
                      >
                        Edit Product
                      </Link>
                      <Link
                        to="/admin/lesserproduct"
                        className="menu--right-support-admin-add-prod"
                      >
                        Add Product
                      </Link>
                      <Link
                        to="/admin/managetransaction"
                        className="menu--right-support-admin-manage"
                      >
                        Manage User Transaction
                      </Link>
                      <div
                        to="/orderdetail"
                        onClick={() => {
                          logout();
                        }}
                        className="menu--right-support-admin-logout"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="menu--right-user-container">
                    <div className="menu--right-user">Hello, </div>
                    <div className="menu--right-user-email">{user.email}</div>
                    <i className="fas fa-chevron-down" />
                    <div className="menu--right-lil-box"></div>
                    <div className="menu--right-support">
                      <Link
                        to="/orderdetail"
                        className="menu--right-support-transcation"
                      >
                        <i className="fas fa-seedling" />
                        Transaction
                      </Link>
                      <div
                        to="/orderdetail"
                        onClick={() => {
                          logout();
                        }}
                        className="menu--right-support-logout"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                  <Link to="/cart" className="menu--right-cart">
                    <div className="fas fa-shopping-cart menu--right-cart-icon"></div>
                  </Link>
                </>
              )}
              {/* <div className="menu--right-user-container">
                <div className="menu--right-user">Hello, </div>
                <div className="menu--right-user-email">{user.email}</div>
                <i className="fas fa-chevron-down" />
                <div className="menu--right-lil-box"></div>
                <div className="menu--right-support">
                  <Link
                    to="/orderdetail"
                    className="menu--right-support-transcation"
                  >
                    <i className="fas fa-seedling" />
                    Transaction
                  </Link>
                  <div
                    to="/orderdetail"
                    onClick={() => {
                      logout();
                    }}
                    className="menu--right-support-logout"
                  >
                    Logout
                  </div>
                </div>
              </div>
              <Link to="/cart" className="menu--right-cart">
                <div className="fas fa-shopping-cart menu--right-cart-icon"></div>
              </Link> */}
            </div>
          ) : (
            <div className="primary-nav__menu--right">
              <Link to="/login" className="menu--right-login">
                Login
              </Link>
              <Link to="/register" className="menu--right-register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(MyNavbar);
