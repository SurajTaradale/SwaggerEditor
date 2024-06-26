import Navbar from '../../../components/NavBar'
import SideBarPage from '../../../components/sidebar'

export default function Layout({ children }: any) {
  return (
    <>
      <div className="h-screen overflow-hidden bg-white">
        <Navbar />
        <div className="flex flex-col md:flex-row lg:flex-row h-full container mx-auto border-t border-solid border-gray-300">
          <SideBarPage />
          <main className="flex-1 p-10 text-gray-600 overflow-scroll mb-10">
            <div>
              {children}
            </div>
          </main>
      </div>
    </div >
    </>
  )
}