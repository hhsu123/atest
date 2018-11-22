//get rates info
const {discntRates, taxRates} = require('./rates');

//get the discount rate based on the total price
const getDiscntRate = (totalPrice) => {
    var sortedBounds = Object.keys(discntRates).map(bar => parseInt(bar)).sort((a, b) => (a - b))
        , lowerBound = sortedBounds.reduce( (lowerBound, curBound, curIdx) => {
            return (curBound <= totalPrice)?curBound:lowerBound;
        },0)
    
    console.log('Debug:sortedBounds=', sortedBounds);
    console.log('Debug:lowerBound=', lowerBound);

    return discntRates[lowerBound] || 0;
}

//get the tax rate based on the state
const getTaxRate = (state) => {
    return taxRates[state.toUpperCase()] || 0;
}

//calculate the discount based on the unit price and the quantity
const calcDiscnt = (unitPrice=0, quantity=1) => {
    totalPrice = (parseFloat(unitPrice) * parseInt(quantity)).toFixed(2);

    var discntRate = getDiscntRate(totalPrice);
    console.log('Debug:discntRate=', discntRate);

    discount = (totalPrice * discntRate).toFixed(2);

    return { totalPrice, discount };
}

//calculate the tax based on the price and the state info. 
const calcTax = (price=0, state='UT') => {
    var taxRate = getTaxRate(state);
    console.log('Debug:taxRate=', taxRate);

    tax = (price * taxRate).toFixed(2);

    return tax;
}

/**
 * Retail calculator 
 * Description: Output the total price for 3 given inputs including, how many items, price per item and 2-letter state code
 *              Give a discount based on the total price, add state tax based on the state and the discounted price.
 *
 * @param {Object}  unitPrice - price per item, 
 *                  quantity - How many items, 
 *                  state - 2-letter state code
 * @return {Object} totalPrice - total price for all the items based on the unit price and the quantity, 
 *                  discount - discount price, 
 *                  tax - tax based on the state.
 */
const calculator = ({unitPrice=0, quantity=1, state='UT'}) => {
    var { totalPrice, discount } = calcDiscnt(unitPrice, quantity)
        ,tax = calcTax(( totalPrice - discount), state)
        , final = ((totalPrice - discount) + parseFloat(tax)).toString();

    return { totalPrice, discount, tax, final };
}

module.exports = calculator;