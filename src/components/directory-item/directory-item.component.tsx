import './directory-item.styles.scss'
import { useNavigate } from "react-router-dom";
import { Category } from "../../interfaces/category";

type DirectoryItemProps = {
    category: Category
}

const DirectoryItem = ({category}: DirectoryItemProps) => {
    const {title, imageUrl} = category;

    const categoryNavigate = useNavigate();
    const navigateToCategory = () => {
        categoryNavigate(`shop/${title}`);
    }

    return (
        <div className="directory-item-container">
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }}/>
            <div className="body" onClick={navigateToCategory}>
                <h2>{title.toUpperCase()}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default DirectoryItem;