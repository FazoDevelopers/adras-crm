import { useEffect, useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
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
} from "./pages";
const { Header, Sider, Content } = Layout;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    let token = localStorage.getItem("adras-token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Layout className="min-h-screen">
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="grid place-items-center">
              <img src="logo.png" alt="logo" className="w-[150px]" />
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                // {
                //   key: "1",
                //   icon: <span className="fa-solid fa-home" />,
                //   label: "Bosh sahifa",
                //   onClick: () => navigate("/"),
                // },
                {
                  key: "2",
                  icon: <span className="fa-solid fa-box" />,
                  label: "Kategoriyalar",
                  onClick: () => navigate("/categories"),
                },
                {
                  key: "3",
                  icon: <span className="fa-solid fa-boxes-stacked" />,
                  label: "Subkategoriyalar",
                  onClick: () => navigate("/subcategories"),
                },
                {
                  key: "5",
                  icon: <span className="fa-solid fa-bullseye" />,
                  label: "Mahsulotlar",
                  onClick: () => navigate("/products"),
                },
                {
                  key: "7",
                  icon: <span className="fa-solid fa-ticket" />,
                  label: "Chegirma",
                  onClick: () => navigate("/discount"),
                },
                {
                  key: "4",
                  icon: <span className="fa-solid fa-newspaper" />,
                  label: "Banner",
                  onClick: () => navigate("/banner"),
                },
                {
                  key: "6",
                  icon: <span className="fa-solid fa-newspaper" />,
                  label: "Aksiya banner",
                  onClick: () => navigate("/stock"),
                },
                {
                  key: "8",
                  icon: <span className="fa-solid fa-bell-concierge" />,
                  label: "Buyurtmalar",
                  onClick: () => navigate("/orders"),
                },
                {
                  key: "9",
                  icon: <span className="fa-solid fa-truck" />,
                  label: "Yetkazib berish",
                  onClick: () => navigate("/delivery"),
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
                  localStorage.removeItem("adras-token");
                  window.location.reload();
                }}
              >
                Log out
              </Button>
            </Header>
            <Content className="p-5">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/*" element={<Categories />} />
                <Route path="/subcategories" element={<Subcategories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/discount" element={<StockProducts />} />
                <Route path="/banner" element={<Banner />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/delivery" element={<Delivery />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
};
export default App;
