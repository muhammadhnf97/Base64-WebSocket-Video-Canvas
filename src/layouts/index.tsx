import { Link, Outlet } from 'umi';
import styles from './index.less';
import '../pages/style.css'

export default function Layout() {
  return (
    <div className="background">
      <Outlet />
    </div>
  );
}
