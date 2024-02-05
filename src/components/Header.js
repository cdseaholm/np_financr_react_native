import PropTypes from 'prop-types'
import logo from '../images/nplogo.png'

const Header = ({title, subheader, headClassName, subheadClassName, appLogoClassName}) => {

    return (
        <header className={headClassName}>
            <div>
            <img src={logo} className={appLogoClassName} alt="logo" />
                </div>
            <p>
                {title}
            </p>
            <p className={subheadClassName}>
                {subheader}
            </p>
        </header>
    )
}

Header.defaultProps = {
    title: 'New Progress Financr',
    subheader: 'Enter Username and Password to Sign in',
    headClassName: '',
}

Header.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string.isRequired,
    headClassName: PropTypes.string.isRequired,
    subheadClassName: PropTypes.string.isRequired,
    appLogoClassName: PropTypes.string.isRequired
}

export default Header

