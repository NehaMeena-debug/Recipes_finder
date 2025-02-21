import Card from "./component/Card"

    
    const Props = () =>{
 
        // const Product = 'Cake'
        // const Fleaver = 'Choco'
        // const Price = 350

        const cakes = [
            {
                product: "Chocolate Cake",
                flavor: "Chocolate",
                price: 20.99
            },
            {
                product: "Vanilla Cake",
                flavor: "Vanilla",
                price: 18.99
            },
            {
                product: "Red Velvet Cake",
                flavor: "Red Velvet",
                price: 22.50
            },
            {
                product: "Carrot Cake",
                flavor: "Carrot",
                price: 19.99
            },
            {
                product: "Cheesecake",
                flavor: "Cream Cheese",
                price: 25.00
            }
        ];
        
        {cakes.map(function(elem){
            {/* return <h1>{elem.product}</h1> */}
            // return console.log(cakes={elem.product}/>
         })}
    // console.log(cakes={elem.product})     

return(
   <>
    <div className="p-10 bg-red-400 w-full">
    {/* <Card Product="Cake" Flavor="Choco" Price='350'/> */}
    {cakes.map(function(elem,idx){
       {/* return <h1>{elem.product}</h1> */}
       return <Card key={idx} product={elem.product}   flavor={elem.flavor}  price={elem.price}/>
    })}
    </div>
   </> 
)
}

export default Props