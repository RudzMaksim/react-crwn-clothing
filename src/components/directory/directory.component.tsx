import './directory.styles.scss'
import DirectoryItem from "../directory-item/directory-item.component";

const categories = [
    {
        "id": 1,
        "title": "hats",
        "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
        "items": []
    },
    {
        "id": 2,
        "title": "jackets",
        "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
        "items": []
    },
    {
        "id": 3,
        "title": "sneakers",
        "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
        "items": []
    },
    {
        "id": 4,
        "title": "womens",
        "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
        "items": []
    },
    {
        "id": 5,
        "title": "mens",
        "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
        "items": []
    }
]

export const Directory = () => {
    return (
        <div className="directory-container">
            {
                categories.map(category => (
                        <DirectoryItem key={category.id} category={category}/>
                    )
                )
            }
        </div>
    )
}