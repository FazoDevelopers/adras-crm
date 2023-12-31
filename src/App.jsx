import { useEffect, useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Banner,
  Categories,
  Delivery,
  Home,
  Login,
  Orders,
  Products,
  Stock,
  StockProducts,
  Subcategories,
  Utm,
} from "./pages";
import {
  Home as LandingHome,
  Category as LandingCategory,
  Subcategory as LandingSubcategory,
  BuyProduct as LandingBuyProduct,
} from "./landing";
import {
  setMainBanners,
  setMostSold,
  setNewProducts,
  setStockBanners,
} from "./redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCategories } from "./redux/data";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [adminBlock, setAdminBlock] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  async function getAllDataForLanding() {
    try {
      let main_banners = await axios.get("/main-page-news/get");
      dispatch(setMainBanners(main_banners?.data?.data));
      let news_banners = await axios.get("/news/get");
      dispatch(setStockBanners(news_banners?.data?.news?.data));
      let new_products = await axios.get("/get-product-uz-new");
      dispatch(setNewProducts(new_products?.data?.product?.data));
      let most_sold = await axios.get("/product/get-ten");
      dispatch(setMostSold(most_sold?.data?.data));
      let { data: cat } = await axios.get("/parent-category/get");
      dispatch(setCategories(cat?.data));
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    let token = sessionStorage.getItem("adras-token");
    if (token) setIsLoggedIn(true);
    if (isLoggedIn === false && location.pathname.startsWith("/admin")) {
      setAdminBlock(true);
    } else {
      setAdminBlock(false);
    }
    if (location.pathname.startsWith("/admin") === false) {
      getAllDataForLanding();
    }
  }, [location.pathname, adminBlock]);

  useEffect(() => {
    if (searchParams.get("utm_source")) {
      axios
        .post(`/utm-source/${searchParams.get("utm_source")}/addCount`)
        .catch(() => false);
    }
  }, []);

  if (adminBlock) {
    return <Login />;
  }

  return (
    <>
      {window.location.pathname.startsWith("/admin") ? (
        <Layout className="min-h-screen">
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="grid place-items-center bg-white m-2 rounded-lg">
              <img src="../logo.png" alt="logo" className="w-[150px]" />
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <span className="fa-solid fa-home" />,
                  label: "Bosh sahifa",
                  onClick: () => navigate("/admin/"),
                },
                {
                  key: "2",
                  icon: <span className="fa-solid fa-box" />,
                  label: "Kategoriyalar",
                  onClick: () => navigate("/admin/categories"),
                },
                {
                  key: "3",
                  icon: <span className="fa-solid fa-boxes-stacked" />,
                  label: "Subkategoriyalar",
                  onClick: () => navigate("/admin/subcategories"),
                },
                {
                  key: "5",
                  icon: <span className="fa-solid fa-bullseye" />,
                  label: "Mahsulotlar",
                  onClick: () => navigate("/admin/products"),
                },
                {
                  key: "7",
                  icon: <span className="fa-solid fa-ticket" />,
                  label: "Chegirma",
                  onClick: () => navigate("/admin/discount"),
                },
                {
                  key: "4",
                  icon: <span className="fa-solid fa-newspaper" />,
                  label: "Banner",
                  onClick: () => navigate("/admin/banner"),
                },
                {
                  key: "6",
                  icon: <span className="fa-solid fa-newspaper" />,
                  label: "Aksiya banner",
                  onClick: () => navigate("/admin/stock"),
                },
                {
                  key: "8",
                  icon: <span className="fa-solid fa-bell-concierge" />,
                  label: "Buyurtmalar",
                  onClick: () => navigate("/admin/orders"),
                },
                {
                  key: "9",
                  icon: <span className="fa-solid fa-truck" />,
                  label: "Yetkazib berish",
                  onClick: () => navigate("/admin/delivery"),
                },
                {
                  key: "10",
                  icon: <span className="fa-solid fa-globe" />,
                  label: "UTM source",
                  onClick: () => navigate("/admin/utm"),
                },
              ]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
              className="flex items-center justify-between mr-3"
            >
              <Button
                type="text"
                icon={
                  collapsed ? (
                    <span className="fa-solid fa-chevron-right" />
                  ) : (
                    <span className="fa-solid fa-chevron-left" />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Button
                type="primary"
                danger
                onClick={() => {
                  sessionStorage.removeItem("adras-token");
                  window.location.reload();
                }}
              >
                Log out
              </Button>
            </Header>
            <Content className="p-5">
              <Routes>
                <Route path="/admin/" element={<Home />} />
                <Route path="/admin/categories" element={<Categories />} />
                <Route path="/admin/*" element={<Categories />} />
                <Route
                  path="/admin/subcategories"
                  element={<Subcategories />}
                />
                <Route path="/admin/products" element={<Products />} />
                <Route path="/admin/discount" element={<StockProducts />} />
                <Route path="/admin/banner" element={<Banner />} />
                <Route path="/admin/stock" element={<Stock />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/delivery" element={<Delivery />} />
                <Route path="/admin/utm" element={<Utm />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<LandingHome />} />
          <Route path="/category/:id" element={<LandingCategory />} />
          <Route path="/subcategory/:id" element={<LandingSubcategory />} />
          <Route path="/buy/:product" element={<LandingBuyProduct />} />
        </Routes>
      )}
    </>
  );
};
export default App;
