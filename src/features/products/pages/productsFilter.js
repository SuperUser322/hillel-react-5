
export const productsFilter = (
  findValue, priceValue, ratingValue,
  isNewSaleStockValues,
  isCategoryValues,
  title, price, rating, isNew, isSale, isInStock, categories) => {

  let minPrice = priceValue[0], maxPrice = priceValue[1],
    minRating = ratingValue[0], maxRating = ratingValue[1],
    newCheck = isNewSaleStockValues.new,
    saleCheck = isNewSaleStockValues.sale,
    inStockCheck = isNewSaleStockValues.inStock,

    ErgonomicCheck = isCategoryValues.Ergonomic,//1
    UnbrandedCheck = isCategoryValues.Unbranded,//2
    IntelligentCheck = isCategoryValues.Intelligent,//3
    FantasticCheck = isCategoryValues.Fantastic,//4
    GorgeousCheck = isCategoryValues.Gorgeous,//5
    RusticCheck = isCategoryValues.Rustic,//7
    HandmadeCheck = isCategoryValues.Handmade,//8
    RefinedCheck = isCategoryValues.Refined,//10
    SmallCheck = isCategoryValues.Small,//12
    IncredibleCheck = isCategoryValues.Incredible,//14
    PracticalCheck = isCategoryValues.Practical,//17
    GenericCheck = isCategoryValues.Generic,//18
    SleekCheck = isCategoryValues.Sleek,//21
    LicensedCheck = isCategoryValues.Licensed,//22
    AwesomeCheck = isCategoryValues.Awesome,//32
    HandcraftedCheck = isCategoryValues.Handcrafted;//33

  const mainFilterPart = () => {
    return (findValue !== '' || findValue === '') ?
    ((title.includes(findValue) || title.includes(findValue[0].toUpperCase() + findValue.slice(1))) ?
      ((price >= minPrice && price <= maxPrice) &&
        ((rating >= minRating && rating <= maxRating) &&
          ((isNew === newCheck || newCheck === false) &&
            ((isSale === saleCheck || saleCheck === false) &&
              ((isInStock === inStockCheck || inStockCheck === false) && true
              )
            )
          )
        )
      ): false
    ): true;
  };

  const categoriesFilterPart = (categories) => {
    return (categories.includes("1") === false || ErgonomicCheck === false) ?
      ((categories.includes("2") === false || UnbrandedCheck === false) ?
       ((categories.includes("3") === false || IntelligentCheck === false) ?
        ((categories.includes("4") === false || FantasticCheck === false) ?
         ((categories.includes("5") === false || GorgeousCheck === false) ?
          ((categories.includes("6") === false || RusticCheck === false) ?
           ((categories.includes("7") === false || HandmadeCheck === false) ?
            ((categories.includes("8") === false || RefinedCheck === false) ?
             ((categories.includes("9") === false || SmallCheck === false) ?
              ((categories.includes("10") === false || IncredibleCheck === false) ?
               ((categories.includes("11") === false || PracticalCheck === false) ?
                ((categories.includes("12") === false || GenericCheck === false) ?
                 ((categories.includes("13") === false || SleekCheck === false) ?
                  ((categories.includes("14") === false || LicensedCheck === false) ?
                   ((categories.includes("15") === false || AwesomeCheck === false) ?
                    ((categories.includes("16") === false || HandcraftedCheck === false) ? false : true
                    ): true
                   ): true
                  ): true
                 ): true
                ): true
               ):	true
              ): true
             ): true
            ): true
           ): true
          ): true
         ): true
        ): true
       ): true
      ): true;
  };

  let totallyResult = (mainFilterPart()=== true && categoriesFilterPart(categories)=== true) ? true : false;
  return totallyResult;
}
