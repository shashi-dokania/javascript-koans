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

      //checking for prime
      function isPrime(num){
        var prime = true;
        for(var j = 2; j <= Math.sqrt(num); j++){
          if(num % j === 0){
            prime = false; 
          }
        }
        return prime;
      }
      
      function largestPrimeFactor(compositeNum){
        
        //creating an array of prime factors of the number
        var primeFactors = [];
        for(var i = 2; i < Math.sqrt(compositeNum); i++){
          if(compositeNum % i === 0 && isPrime(i)) {
            primeFactors.push(i);
            
            if(isPrime(compositeNum/i)) {
              primeFactors.push(compositeNum/i);
            }
          }

        }
        primeFactors.sort(function(a, b){return a-b});

        //returning the largest prime factor
        return primeFactors.pop();
      };

    expect(largestPrimeFactor(10001)).toBe(137);
  
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function isPalindrome(num){
      if(num.toString() === num.toString().split("").reverse().join("")){
        return true;
      }
      return false;
    }
    
    function largestPalindrome(){
      var palindrome = [];
      
      for(var i = 999; i >= 100; i--){
        for(var j = 999; j >= 100; j--){
          if(isPalindrome(i*j)){
            palindrome.push(i*j);
          }
        }
      }
      var largest = Math.max.apply(Math, palindrome)
      return largest;
    };
  
  expect(largestPalindrome()).toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function smallestDivisibleByOneToTwenty(){
      var smallest;
      for(var i = 40; ; i+=10){
        for(var j = 20; j >= 2; j--){
          if(i % j !== 0){
            break;
          }
        }
        if (j < 2) {
          smallest = i;
          return smallest;
        }
      }
    };
  expect(smallestDivisibleByOneToTwenty()).toBe(232792560);
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function difference(num1, num2){
    var rangeArr = [], sqrArr = [];
    var sumRange = 0, sumSqr = 0;
    var result;

    // creating an array for the range of numbers
    for(var i = num1; i <= num2; i++){
        rangeArr.push(i);
    }
    
    //creating another array with the square of each num in range array
    for(var i = 0; i < rangeArr.length; i++){
        sqrArr.push(rangeArr[i] * rangeArr[i]);
    }
    
    // summing all the numbers in range array
    _.each(rangeArr, function(val){
        sumRange += val;
    })
    
    //summing the squares of each number
    _.each(sqrArr, function(val){
        sumSqr += val;
    })
    
    result = (sumRange * sumRange) - sumSqr;
    return result;
}
    
  expect(difference(1, 10)).toBe(2640);
  });

  it("should find the 10001st prime", function () {

    function nPrime(n){
      var arr = [2, 3];

      for(var i = 5; ; i+=2){
        var isPrime = true;
        for(var j = 3; j <= Math.sqrt(i); j+=2){
          if(i % j === 0){
            isPrime = false; 
          }
        }
        if(isPrime){
          arr.push(i);
        }
        if(arr.length === n){
          break;
        }
      }
      return arr[n-1];
    };

  expect(nPrime(10001)).toBe(104743);
  });
  
});
