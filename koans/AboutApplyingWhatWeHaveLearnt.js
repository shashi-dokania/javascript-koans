var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
    var productsICanEat = [];

    //using _.filter and _.all

    productsICanEat = _.filter(products, function(pizza){
      return _.all(pizza, function(){
        var noMushrooms = true;
        _.each(pizza.ingredients, function(item){
          if (item === "mushrooms"){
            noMushrooms = false;
          }
        })
        return noMushrooms && !pizza.containsNuts;
      })

    })
        //console.log(productsICanEat);
        
        /* solve using filter() & all() / any() */

    expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = 0;    /* try chaining range() and reduce() */
    function range(a, b){
      var arr = [];
      for(var i = a; i < b; i++){
        arr.push(i);
      }
      return arr;
    }
    
    expect(233168).toBe(range(1, 1000).reduce(function(a, c){
      if(c % 3 === 0 || c % 5 === 0){
        a = a + c;
      }
      return a;
    }, 0));
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = {};

    Array.prototype.flatten = function flatten(){
      return _.reduce(this, function(a, c){
        return a.concat(c);
      }, [])
    }
// chaining map flatten & reduce
    products.map(function(pizza){
      return pizza.ingredients;
    }).flatten().reduce(function(a, c){
      if(a[c] === undefined){
        a[c] = 1;
      }
      else{
        a[c]++;
      }
      return a;
    }, ingredientCount);

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

    largestPrimeFactor = function(compositeNum){
      //finding the factors of composite number
      var factors = [];
      for(var i = 2; i < compositeNum; i++){
        if(compositeNum % i === 0){
          factors.push(i);
        }
      }
      //filtering the factors for prime number
      var prime = [];
      _.each(factors, function(val){
        var isPrime = true;
        for(var i = 2; i < val; i++){
          if(val % i === 0) {
            isPrime = false;
          }
        }
        if(isPrime){
          prime.push(val);
        }
      })
    // returning the largest prime factor
      return prime.pop();
    }
    expect(largestPrimeFactor(10001)).toBe(137);
  
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  
});
