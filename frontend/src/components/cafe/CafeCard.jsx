// UI CARD --- displays cafe name and address
export default function CafeCard({name, address}){

    return (
        <div className="m-3 py-3 border border-gray-200 rounded rounded-xl">
            <h2 className="text-xl font-bold"></h2>
            <p className ="text-sm">{name}</p>
            <p className ="text-sm">{address}</p>

        </div>
    )
}

