import {
  faFileArchive,
  faHome,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className=" w-full flex items-center space-x-6">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/ItemFormPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
        <Link href="/browse">
          <FontAwesomeIcon icon={faFileArchive} className="icon" />
        </Link>
      </div>
      <div>
        <p className="text-default-text">john@doemail.com</p>
      </div>
    </nav>
  );
};

export default Nav;
