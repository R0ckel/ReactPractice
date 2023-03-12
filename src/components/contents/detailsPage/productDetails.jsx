import React from 'react';
import { KeyValueTable } from '../../dataTable/keyValueTable';
import { CommentForm } from './commentForm';
import { PriceConverter } from './priceConverter';

export class ProductDetails extends React.Component{
  constructor(props){
    super(props)

    this.item = props.item
  }

  render(){
    return(
      <main>
        <button
          className='btn white'
          onClick={()=>this.props.showProductList(this.item.category)}>
            &larr; Back to category
        </button>

        <h1>{this.item.mark} {this.item.model}</h1>
        <h3>Details:</h3>
        <KeyValueTable 
          item={this.item}
        />
        
        <h2>PriceConverter</h2>
        <PriceConverter price={this.item.price}/>

        <br/>
        <CommentForm/>
      </main>
    )
  }
}