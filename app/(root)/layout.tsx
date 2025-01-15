import Navbar from "../../components/Navbar";

export default function layout({children}: Readonly <{children: React.ReactNode}>){
    return(
        <main className="font-work-sans">
            {/* Creating Navbar for Pages inside (root) Route group */}
            <Navbar />
            {children}
        </main>
    )
}