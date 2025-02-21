const Card = (props) => {
    console.log(props);
    return(
        <>
        <div className="text-black text-center text-xl bg-white rounded p-5 ml-5 mt-5 mr-7 w-1/4  h-full inline-block">
        <pre>
        <h1>{props.photo}</h1>
        <h1> Product :  {props.product}</h1>
        <h1>  Flavor  :  {props.flavor}</h1>
        <h1> Price  :  {props.price}</h1>
       </pre>

        <button className="text-white bg-red-800 mt-5 ml-20>Buy rounded w-20 h-10 mt-4 ml-100">Buy</button>
      
        </div>
        </>
    )
}

export default Card