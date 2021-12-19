import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./component/Contact";
import Artworks from "./pages/Artworks";
import Design from "./pages/Design";
import ColorPalete from "./ColorPalete";
import Footer from "./component/Footer";
import Login from "./userComponent/Login.jsx";
import Register from "./userComponent/Register";
import userReducer from "./redux/reducers/userReducer";
import RegisterDone from "./userComponent/RegisterDone";
import LandingPage from "./componentMain/LandingPage.jsx";
import MyNavbar from "./componentMain/MyNavbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userKeepLoggedIn } from "./redux/actions";
import { useHistory } from "react-router";
import AdminLesserCategory from "./componentProduct/AdminLesserCategory.js";
import HomePage from "./componentMain/HomePage";
import CombineLandingHome from "./componentMain/CombineLandingHome";
import FlowerPage from "./componentProduct/FlowerPage";
import CategoryProduct from "./componentProduct/CategoryProduct";
import MainCategory from "./componentProduct/MainCategory";
import ScrollToTop from "./componentMain/ScrollToTop";
import LesserCategory from "./componentProduct/LesserCategory";
import AdminLesserProduct from "./componentProduct/AdminLesserProduct";
import Product from "./componentProduct/Product";
import UserCart from "./componentProduct/UserCart";
import UserOrderDetails from "./componentProduct/UserOrderDetails";
import AdminManageTrans from "./componentProduct/AdminManageTrans";
import AdminEditProduct from "./componentProduct/AdminEditProduct";
import Verification from "./userComponent/Verification";

function App() {
  useEffect(() => {
    // check TOKEN in LOCALSTORAGE
    const token = localStorage.getItem("token");

    if (token) {
      keepLogin();
    }
  }, []);

  let history = useHistory();

  // REDUX
  const dispatch = useDispatch();

  // user check token and set redux state user
  const keepLogin = (e) => {
    dispatch(userKeepLoggedIn());
  };

  // data product category
  const prodCategory = ["1 cat", "2 dog", "3 something"];

  const generateRouteProduct = () => {
    prodCategory.map((e) => {
      return <p>e</p>;
    });
  };

  // // DYNAMIC ROUTE - PRODUCT
  // // 1.1 data category
  // const category = [{ category: "plant", sub: "ts" }];

  // // 1.2 Render function
  // const Category = () => {
  //   const categories = category.find((cat) => {
  //     return match.params.catId === cat.id;
  //   });
  // };

  return (
    <>
      <ScrollToTop />
      <div className="position-up">
        <MyNavbar />
      </div>
      <Switch>
        {/* <Route path="/about" component={About} /> */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/regdone" component={RegisterDone} />
        <Route path="/auth/:token" component={Verification} />

        {/* PRODUCT */}
        <Route path="/home" component={CombineLandingHome} />
        {/* PRODUCT PAGE */}
        {/* c. LESSER PRODUCT */}
        <Route path="/product/:catId/:productId/:prodId" component={Product} />
        {/* b. LESSER CATEGORY */}
        <Route path="/product/:catId/:productId" component={LesserCategory} />
        {/* a. MAIN 3 CATEGORY */}
        <Route path="/product/:catId" component={MainCategory} />
        {/* <Route path="/product/:catId/:productId" component={FlowerPage} /> */}
        {/* <Route path="/cat/:catId" component={CategoryProduct} /> */}

        {/* ADMIN */}
        <Route path="/admin/lessercategory" component={AdminLesserCategory} />
        <Route path="/admin/lesserproduct" component={AdminLesserProduct} />
        <Route path="/admin/managetransaction" component={AdminManageTrans} />
        <Route path="/admin/editproduct" component={AdminEditProduct} />

        {/* USER */}
        {/* 1. user cart */}
        <Route path="/cart" component={UserCart} />
        {/* 2. user order detail (after checkout cart) */}
        <Route path="/orderdetail" component={UserOrderDetails} />

        <Route path="/reducer" component={userReducer} />

        <Route path="/design" component={Design} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/colorpalate" component={ColorPalete} />
        <Route path="/home" component={Home} exact />
        <Route path="/" component={LandingPage} exact />
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
