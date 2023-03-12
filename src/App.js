import './css/App.css';
import Header from './components/layout/header/header'
import Footer from './components/layout/footer';
import ProductList from './components/contents/productList';
import Menu from './components/layout/menu';
import React from 'react';
import { ProductDetails } from './components/contents/detailsPage/productDetails';

var allItems = [
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
  },{
    id: 3,
    category: "GPU",
    mark: "GIGABYTE GeForce",
    model: "GTX1660 6144Mb",
    price: 315
  },{
    id: 4,
    category: "Laptops",
    mark: "Acer",
    model: "Aspire 3 A315-58G (NX.ADUEP.005)",
    price: 670
  },{
    id: 5,
    category: "Smartphones",
    mark: "Samsung",
    model: "SM-A536E/256",
    price: 545
  },{
    id: 6,
    category: "Smartphones",
    mark: "POCO",
    model: "X3 Pro",
    price: 270
  },{
    id: 7,
    category: "GPU",
    mark: "GIGABYTE GeForce",
    model: "RTX3060Ti 8Gb EAGLE OC 2.0 LHR",
    price: 780
  },{
    id: 8,
    category: "CPU",
    mark: "AMD",
    model: "RYZEN 7 5800X",
    price: 410
  },{
    id: 9,
    category: "GPU",
    mark: "GIGABYTE RADEON",
    model: "RX 6650 XT 8GB GAMING OC",
    price: 685
  },{
    id: 10,
    category: "CPU",
    mark: "INTEL",
    model: "CORE™ I7 12700KF",
    price: 600
  },{
    id: 11,
    category: "GPU",
    mark: "MSI",
    model: "GEFORCE RTX3060 12GB GAMING Z TRIO",
    price: 740
  }
]

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      items: allItems
        .filter(x => x.category === 
          this.getItemsCategoryList(allItems)[0].name),
      isLoggedIn: props.isLoggedIn !== undefined? props.isLoggedIn:false,
      contentType: "productList",
      lastCategory: this.getItemsCategoryList(allItems)[0].name
    }

    this.updateContent=this.showProductList.bind(this);
    this.changeIsLoggedIn=this.changeIsLoggedIn.bind(this);
    this.showProductList = this.showProductList.bind(this);
    this.showProductDetails = this.showProductDetails.bind(this);
  }

  getItemsCategoryList(eList){
    let i = 0;
    var categories = [];
    for (const el of eList) {
      if (categories.filter(x => x.name === el.category).length === 0){
        categories.push({
          name: el.category,
          id: `${el.category}_id${i}${i===0?"T":"F"}`, 
          index: i,
          chosen: i === 0});
        i++;
      }
    }
    return categories;
  }

  showProductDetails(id){
    this.setState(() => ({
      items: allItems
        .filter(x => x.id === id),
      contentType: "productDetails",
      lastCategory: allItems
        .filter(x => x.id === id).category
    }))
  }

  showProductList(category){
    if (category === null){
      category = this.state.lastCategory
    }
    this.setState(() => ({
      items: allItems
        .filter(x => x.category === category),
      contentType: "productList"
    }))
  }

  changeIsLoggedIn(value){
    this.setState(() => ({
      isLoggedIn: value
    }))
  }
  
  render(){
    var content = "";
    switch(this.state.contentType){
      case "productList": 
        content = <ProductList items={this.state.items}
        showProductDetails = {this.showProductDetails}
        key={this.state.items[0].category}/>
        break;
        
      case "productDetails": 
        content = <ProductDetails item={this.state.items[0]}
        showProductList = {this.showProductList}
        key={this.state.items[0].id}/>
        break;

      default:
        content = <div>No content</div>
    }

    return (
      <div className="app">
        <div className="wrapper">
          <Header isLoggedIn={this.state.isLoggedIn}
            changeIsLoggedIn={this.changeIsLoggedIn}
            key={this.state.isLoggedIn}/>
          <div className="pageContent">
            <Menu items={this.getItemsCategoryList(allItems)}
              contentUpdater={this.showProductList}/>
            
            {content}

          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
