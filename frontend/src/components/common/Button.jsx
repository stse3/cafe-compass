import googleIcon from '../../assets/google.png'

export default function Button({ onClick, label, children = null, type = 'primary' }) {
    const baseStyle = 'font-sans text-md rounded-3xl focus:outline-none'
    const typeStyles = {
        primary: 'px-4 py-1 text-sm bg-charcoal text-white hover:bg-charcoal hover:shadow-lg hover:scale-105 transition-all duration-300',
        secondary: 'px-3 text-sm py-1 bg-lightGreen text-darkGreen hover:bg-lightGreen hover:shadow-sm duration-300',
        loginGoogle: 'bg-white text-charcoal text-md px-6 py-3 rounded-3xl border border-charcoal shadow shadow-md hover:scale-105 hover:shadow-xl duration-300 transition-all',
        logOut: 'bg-white text-charcoal text-sm px-4 py-1 border border-charcoal shadow-sm hover:shadow-md hover:scale-105 duration-300 transition-all'
    };

    // If type is not recognized, default to primary
    const buttonStyles = typeStyles[type] || typeStyles.primary;

    // For loginGoogle type, wrap both the Google icon and label inside a div
    if (type === "loginGoogle") {
        children = (
            <div className="flex items-center space-x-2">
                <img src={googleIcon} alt="Google logo" className="w-6 h-6" />
                <span>{label}</span> {/* Label next to the icon */}
            </div>
        );
    } else {
        // For other types, just use the label
        children = <span>{label}</span>;
    }

    return (
        <button className={`${baseStyle} ${buttonStyles}`} onClick={onClick}>
            {children}
        </button>
    )
}
