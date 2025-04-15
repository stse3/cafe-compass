export default function Button ({onClick, label, type='primary' }){
    const baseStyle= ' font-sans text-md  rounded-3xl focus:outline-none '
    const typeStyles = {
        primary: 'px-4 py-2 bg-charcoal text-white hover:bg-charcoal hover:shadow-lg hover:scale-105 transition-all duration-300',
        secondary: 'px-3 text-sm py-1.5 bg-lightGreen text-darkGreen hover:bg-lightGreen hover:shadow-sm transition-all duration-300'
    };

    //if type is not recognized, default to primary
    const buttonStyles = typeStyles[type]|| typeStyles.primary;
    return (

        <button className={`${baseStyle} ${buttonStyles}`} onClick={onClick}>
            {label}
        </button>
    )

}