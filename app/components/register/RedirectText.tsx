import Link from "next/link";


const RedirectText = () => {
    return (
        <>
            <div className="text-center">
                <p className="text-gray-600">Sudah punya akun?</p>
                <Link href="/" className="text-orange-500 hover:underline hover:text-orange-500">Login Sekarang</Link>
            </div>
        </>
    )
}

export default RedirectText;