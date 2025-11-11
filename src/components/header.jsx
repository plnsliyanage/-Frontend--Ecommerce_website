import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="w-full bg-accent h-[100px] text-white px-[40px]">
            <diV className="w-full h-full flex">

                <img src="logo.png" className=" w-[170px] h-full object-cover" />

                <div className=" h-full w-full flex items-center justify-center gap-[20px]">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">Abouts</Link>
                    <Link to="/contacts">Contacts</Link>

                </div>
            </diV>

        </header>
    )

}