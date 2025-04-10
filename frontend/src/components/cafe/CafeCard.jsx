// UI CARD --- displays cafe name and address
export default function CafeCard({name, address}){

    return (
        <div>
            <h2 className="text-xl font-bold"></h2>
            <p className ="text-sm">{name}</p>
            <p className ="text-sm">{address}</p>

        </div>
    )
}

