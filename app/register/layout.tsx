type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">   
            {children}
        </div>
    )
}

export default Layout