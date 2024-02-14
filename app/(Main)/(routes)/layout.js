import SideNav from "../_components/SideNav";
import TopNav from "../_components/TopNav";

export default function HomeLayout({ children }) {
  return (
    <div>
      <div className="h-full hidden  sm:flex flex-col fixed  inset-y-0 z-50 ">
        <SideNav />
      </div>
      <TopNav />
      <div className="ml-0 sm:ml-24 md:ml-64 p-5">{children}</div>
    </div>
  );
}
