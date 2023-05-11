import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import More from '../../Img/more.svg'
// import { SINGLE_PAGE } from '../../routes'
import './ProductCard.css'

export default function ProductCard({ props }) {
  const nav = useNavigate()
  const [showItem, setShowItem] = useState(-1)

  return (
    <>
      {showItem == -1 ? (
        <button
          onClick={() =>
            // nav(SINGLE_PAGE, {
            //   state: {
            //     product: props,
            //   },
            // })
            setShowItem(props.id)
          }
          className="ProductCard"
        >
          <img src={props.image} alt="Product" className="ProductImage" />
          <div className="ProductTexts">
            <p className="ProductName">{props.name}</p>
            <p className="ProductDescription">{props.description}</p>
          </div>
          <div className="ProductPrices">
            {props.id % 2 == 1 ? (
              <>
                <p className="ProductPriceOnSale">{props.price}₾</p>
                <p className="ProductSalePrice">{props.salePrice}₾</p>
              </>
            ) : (
              <p className="ProductPrice">{props.price}₾</p>
            )}
            <p className="ProductProduction">{props.production}</p>
          </div>
          <img src={More} alt="MoreIcon" className="MoreIcon" />
          <button className='delete-btn2' onClick={() => null}>წაშლა</button>
        </button>
      ) : (
        <button
          onClick={() =>
            // nav(SINGLE_PAGE, {
            //   state: {
            //     product: props,
            //   },
            // })
            setShowItem(-1)
          }
          className="ProductContainerOnShow"
        >
          <img src={props.image} alt="" className="ProductImageOnSingl" />
          <div className="ProductTextsContainerOnShow">
            <p className="ProductName">{props.name}</p>
            <p className="ProductDesription">{props.description}</p>
          </div>
          <div className="ProductPricesContainerOnShow">
            {props.id % 2 == 1 ? (
              <>
                <p className="ProductsPriceOnSaleSingl">{props.price}₾</p>
                <p className="ProductSalePriceSingl">{props.salePrice}₾</p>
              </>
            ) : (
              <p className="ProductPriceSingl">{props.price}₾</p>
            )}
            <p className="ProductProductionSingl">{props.production}</p>
          </div>
        </button>
      )}
    </>
  )
}
