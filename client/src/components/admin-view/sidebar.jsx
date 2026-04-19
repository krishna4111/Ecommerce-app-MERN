import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BookA, ChartLine, Feather, PackageSearch } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const adminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <ChartLine />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BookA />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <PackageSearch />,
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <Feather />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSideBarMenuItems.map((menu) => {
        return (
          <div
            key={menu.id}
            onClick={() => {
              navigate(menu.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground "
          >
            {menu.icon}
            <span>{menu.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartLine size={30} />
                <h1 className="text-2xl font-extrabold ">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => {
            navigate("/admin/dashboard");
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartLine size={30} />
          <h1 className="text-2xl font-extrabold ">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSideBar;
