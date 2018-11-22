const calc = require('./calculator');

//get input from command line for this version
const params = ["unitPrice", "quantity", "state"]; 
const args = process.argv.slice(2);  
// const input = params.map((item, index) => ({[item] : args[index]}))
//                     .reduce((input, value) => { return Object.assign(input, value) });


// validation rules are to be checked 
var unitPrice = parseFloat(args[0])
    , quantity = parseInt(args[1])
    , state = args[2];

if (isNaN(unitPrice) || isNaN(quantity) || (state.length != 2) || (!/^[a-zA-Z][a-zA-Z]/.test(state))){
    console.log('invalid input format');
    process.exit(1);
    
} else {
    const input = {
        "unitPrice": unitPrice,
        "quantity": quantity,
        "state": state
    };
    console.log('Input:', input);
    console.log('Output:', calc(input));
}
