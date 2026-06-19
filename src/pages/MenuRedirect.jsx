import { useEffect } from 'react'
import { SITE } from '../config/seo'

const MenuRedirect = () => {
  useEffect(() => {
    window.location.replace(SITE.digitalMenu)
  }, [])

  return null
}

export default MenuRedirect
