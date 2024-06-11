import logo from './Logo.svg';
import './Logo.css';
export default function Logo() {
  return (
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
}
