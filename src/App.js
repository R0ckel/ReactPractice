import Header from './components/layout/header/header'
import Footer from './components/layout/footer';
import {UserStatusContext} from "./contexts/userStatus.context";
import {ProductListContext} from "./contexts/productListContext";
import {Navigate, Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import ProductDetails from "./components/contents/detailsPage/productDetails";
import {CategoryPage} from "./components/contents/categoryProductList/categoryPage";
import styles from './css/app.module.css';
import {MenuItemsContext} from "./contexts/menuItemsContext";
import {AdminProductsPage} from "./components/contents/adminProductsView/adminProductsPage";

const allItems = [
  {
    id: 1,
    category: "Smartphones",
    mark: "Redmi",
    model: "Note 10",
    price: 320
  },
  {
    id: 2,
    category: "Laptops",
    mark: "ASUS",
    model: "TUF Gaming F15 FX506LHB-HN324",
    price: 1200
  }, {
    id: 3,
    category: "GPU",
    mark: "GIGABYTE GeForce",
    model: "GTX1660 6144Mb",
    price: 315
  }, {
    id: 4,
    category: "Laptops",
    mark: "Acer",
    model: "Aspire 3 A315-58G (NX.ADUEP.005)",
    price: 670
  }, {
    id: 5,
    category: "Smartphones",
    mark: "Samsung",
    model: "SM-A536E/256",
    price: 545
  }, {
    id: 6,
    category: "Smartphones",
    mark: "POCO",
    model: "X3 Pro",
    price: 270
  }, {
    id: 7,
    category: "GPU",
    mark: "GIGABYTE GeForce",
    model: "RTX3060Ti 8Gb EAGLE OC 2.0 LHR",
    price: 780
  }, {
    id: 8,
    category: "CPU",
    mark: "AMD",
    model: "RYZEN 7 5800X",
    price: 410
  }, {
    id: 9,
    category: "GPU",
    mark: "GIGABYTE RADEON",
    model: "RX 6650 XT 8GB GAMING OC",
    price: 685
  }, {
    id: 10,
    category: "CPU",
    mark: "INTEL",
    model: "CORE™ I7 12700KF",
    price: 600
  }, {
    id: 11,
    category: "GPU",
    mark: "MSI",
    model: "GEFORCE RTX3060 12GB GAMING Z TRIO",
    price: 740
  }
];

const App = ({isLoggedIn: isLoggedInProp = false}) => {
  const [items, setItems] = useState(allItems);
  const allCategories = getItemsCategoryList(items)
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const [username, setUsername] = useState("");
  const [currentCategory,] = useState(allCategories[0].name);
  const [selectedProducts, setSelectedProducts] = useState(initSelectedProducts());
  const [selectedCount, setSelectedCount] = useState(0);

  function initSelectedProducts() {
    const selected = {};
    for (let product of Object.values(allItems)) {
      selected[product.id] = false;
    }
    return { ...selected };
  }

  function handleLoginChange(value, username = "") {
    setIsLoggedIn(value);
    setUsername(username)
    setSelectedCount(0);
    setSelectedProducts(initSelectedProducts());
  }

  function getItemsCategoryList(eList) {
    let i = 0;
    const categories = [];
    for (const el of eList) {
      if (categories.filter((x) => x.name === el.category).length === 0) {
        categories.push({
          name: el.category,
          key: `${el.category}_id${i}${i === 0 ? 'T' : 'F'}`,
          index: i,
          chosen: i === 0,
        });
        i++;
      }
    }
    return categories;
  }

  function CategoryPageWrapper() {
    return (
      <MenuItemsContext.Provider value={{items: allCategories, baseUrl: "/categories"}}>
        <CategoryPage/>
      </MenuItemsContext.Provider>
    );
  }

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <UserStatusContext.Provider
          value={{
            isLoggedIn,
            setLoggedInValue: (value, username) => handleLoginChange(value, username),
            username
          }}
        >
          <Header key={isLoggedIn}/>
          <div className={styles.pageContent}>
            <ProductListContext.Provider
              value={{
                categoryName: currentCategory,
                allCategories: allCategories,
                products: items,
                setProducts: (products) => setItems(products),
                selectedProducts,
                selectedCount,
                // attrsToHide: ['category', 'price', 'id'],
                cardViewFields: ['mark', 'model'],
                setSelectedCount: setSelectedCount
              }}
            >
              <Routes>
                <Route path={`categories/:categoryName`} element={<CategoryPageWrapper/>}/>
                <Route path={`categories`} element={<CategoryPageWrapper/>}/>

                <Route path={`admin/products`} element={<AdminProductsPage/>}/>

                <Route path={'products/:id'} element={<ProductDetails/>}/>
                <Route path={"*"} element={<Navigate to={'/categories'}/>}/>
              </Routes>
            </ProductListContext.Provider>
          </div>
        </UserStatusContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default App;

