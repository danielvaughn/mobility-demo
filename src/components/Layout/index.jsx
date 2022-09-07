import { any } from 'prop-types'

const Layout = ({ children }) => {
  return (
    <div className="h-full max-w-3xl mx-auto px-5">
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: any,
}

Layout.defaultProps = {
  children: null,
}

export default Layout
