import Ads from "../Home/Ads/Ads"
import AlsoRead from "./AlsoRead"
import Categories from "./Categories"
import NewsLetter from "./NewsLetter"
import SocialMedia from "./SocialMedia"



const BlogAside = () => {
    return <div>
        <SocialMedia />
        <Categories />
        <NewsLetter />
        <AlsoRead />
        <Ads />


    </div>
}

export default BlogAside