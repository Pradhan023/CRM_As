import { LayoutDashboard, Menu, ShoppingBasket } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor, type AppDispatch } from "@/lib/store";
import { logout } from "@/pages/login/LoginSlice";
import storage from 'redux-persist/lib/storage'

const SideBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { token } = useSelector((state:any) => state.login);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async()=>{
    dispatch(logout());
    await persistor.flush();
    await persistor.purge();
    storage.removeItem('persist:root'); 
  }

  return (
    <div className="lg:h-screen lg:w-1/6 w-full bg-blue-400 text-white px-4 py-6 flex lg:flex-col justify-between">
      <div className="flex lg:flex-col gap-8 cursor-pointer w-full  justify-between">
        <h1 className="text-2xl font-extrabold">CRM</h1>
        <div className="hidden lg:mt-4 lg:mx-auto md:flex lg:flex lg:flex-col gap-4 text-lg font-medium pr-4 ">
          <Link to={"/dashboard"} className="flex items-center gap-1 hover:text-slate-200">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link to={"/product"} className="flex items-center gap-1 hover:text-slate-200">
            <ShoppingBasket size={18} />
            Products
          </Link>
        </div>
      </div>
      <div className="hidden md:flex justify-center">
          {
            !token ? (
              <Button variant={"secondary"} className="lg:w-1/2">
                <Link to={"/login"}>Login</Link>
              </Button>
            ) : (
            <Button variant={"secondary"} className="lg:w-1/2" onClick={handleLogout}>
              Logout
              </Button>)
          }
      </div>

      {/* humburger menu */}
      <div className="flex flex-col md:flex-row justify-center relative md:hidden">
        <Menu size={30} onClick={() => setOpen(!open)} />
        {open && (
          <div className="absolute right-0 z-50 top-10 py-4 px-4 rounded-lg bg-slate-50 text-black flex flex-col gap-2">
            <Link to={"/dashboard"} className="flex items-center gap-1 ">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link to={"/product"} className="flex items-center gap-1 ">
              <ShoppingBasket size={18} />
              Products
            </Link>
            <Button variant={"outline"} className="lg:w-1/2" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
