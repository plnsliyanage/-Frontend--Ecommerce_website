
export default function ProductCard(props) {
    return (
        <div className="productCard">
            <h1>{props.name}</h1>
            <p>{props.price}</p>
            <img className="productImage" Src={props.image} />
            <button>Add to card</button>
        </div>
    )
}