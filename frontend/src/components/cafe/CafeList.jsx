import CafeCard from "./CafeCard";

export default function CafeList({cafes}) {
    console.log("cafelist", cafes);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {cafes.map((cafeObject)=> (
                <CafeCard
                    key={cafeObject.id}
                    cafe={cafeObject}
                />
            ))}
        </div>
    )
}