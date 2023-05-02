import Header from './components/layout/header/header'
import Footer from './components/layout/footer';
import {Navigate, Route, Routes} from "react-router-dom";
import React from 'react';
import ProductDetails from "./components/contents/detailsPage/productDetails";
import {ProductsPage} from "./components/contents/categoryProductList/productsPage";
import styles from './css/app.module.css';
import {AdminProductsPage} from "./components/contents/adminProductsView/adminProductsPage";
import {useDispatch} from "react-redux";
import {setBaseUrl, setCardViewFields, setLoggedInValue, setProducts} from "./contexts/reduxStore";

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

const App = ({isLoggedInProp = false}) => {
  const dispatch = useDispatch()
  dispatch(setLoggedInValue({value: isLoggedInProp, username: ''}))
  dispatch(setCardViewFields(['mark', 'model', 'price']))
  dispatch(setProducts(allItems.map(item => {
    return {
      ...item,
      selected: false
    };
  })))

  function ProductsPageWrapper() {
    dispatch(setBaseUrl('/productCategories'));
    return (
      <ProductsPage/>
    );
  }

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <Header key={'header'}/>
        <div className={styles.pageContent}>
          <Routes>
            <Route path={`productCategories/:categoryName`} element={<ProductsPageWrapper/>}/>
            <Route path={`productCategories`} element={<ProductsPageWrapper/>}/>

            <Route path={`admin/products`} element={<AdminProductsPage/>}/>

            <Route path={'products/:id'} element={<ProductDetails/>}/>
            <Route path={"*"} element={<Navigate to={'/productCategories'}/>}/>
          </Routes>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

