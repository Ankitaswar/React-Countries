import useTheme from "../hooks/useTheme";

export default function Header() {
  const [isDark, setIsDark] = useTheme();

  return (
    <header className={`header ${isDark ? 'dark' : ''}`}>
      <div className="container">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <p className="para theme-change" onClick={() => {
          setIsDark(!isDark);
          localStorage.setItem('isDarkMode', !isDark)
        }}>
          <i className={`fa-regular fa-${isDark ? 'sun' : 'moon'}`} aria-hidden="true" />
          &nbsp; {isDark ? 'Light' : 'Dark'} Mode
        </p>
      </div>
    </header>
  )
}
