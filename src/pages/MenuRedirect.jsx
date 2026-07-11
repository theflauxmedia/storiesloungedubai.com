import { useEffect } from 'react'
import { SITE } from '../config/seo'

const MenuRedirect = () => {
  useEffect(() => {
    window.location.replace(SITE.digitalMenu)
  }, [])

  return (
    <main className="menu-redirect">
      <p>Opening the digital menu…</p>
      <a href={SITE.digitalMenu}>Continue to menu</a>
    </main>
  )
}

export default MenuRedirect
